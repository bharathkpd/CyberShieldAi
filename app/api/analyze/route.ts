import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { AnalyzeRequestSchema, AnalysisResultSchema } from "@/lib/schema";
import { runFallbackAnalysis } from "@/lib/fallbackAnalyzer";
import { analyzeUrlHeuristics } from "@/lib/urlHeuristics";
import { CYBER_ANALYST_SYSTEM_PROMPT, buildUserPrompt } from "@/lib/prompts";
import { AnalysisResult, ScanInputType } from "@/types";

// In-memory rate limiter: 10 requests per minute per IP
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipRequestCounts.get(ip);

  if (!record || now > record.resetTime) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + 60000 });
    return true;
  }

  if (record.count >= 100) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(req: Request) {
  try {
    // 1. IP rate limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded (10 requests/minute). Please wait 60 seconds." },
        { status: 429 }
      );
    }

    // 2. Parse & validate request body
    const body = await req.json();
    const parseResult = AnalyzeRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request payload", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { type, content, language } = parseResult.data;

    // Validate size limits
    if (type !== "image" && content.length > 5000) {
      return NextResponse.json(
        { error: "Content exceeds maximum length of 5000 characters." },
        { status: 400 }
      );
    }

    // 3. Fallback check: If no API key is provided, execute high-fidelity fallback analyzer
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey || apiKey.trim() === "" || apiKey.includes("your_anthropic_api_key")) {
      const fallbackResult = runFallbackAnalysis(content, type, language);
      return NextResponse.json(fallbackResult);
    }

    // 4. Anthropic Claude API Call with 20s timeout and 1 retry
    const anthropic = new Anthropic({ apiKey });
    let rawResponseText = "";

    try {
      let messageContent: any = [];

      if (type === "image" && content.startsWith("data:image/")) {
        const matches = content.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
        if (matches) {
          const mediaType = matches[1] as "image/jpeg" | "image/png" | "image/gif" | "image/webp";
          const base64Data = matches[2];
          messageContent = [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType,
                data: base64Data,
              },
            },
            {
              type: "text",
              text: buildUserPrompt("Inspect the attached suspicious screenshot.", type, language),
            },
          ];
        } else {
          messageContent = buildUserPrompt(content, type, language);
        }
      } else {
        messageContent = buildUserPrompt(content, type, language);
      }

      // Controller with 20s timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const response = await anthropic.messages.create(
        {
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 2000,
          system: CYBER_ANALYST_SYSTEM_PROMPT,
          messages: [{ role: "user", content: messageContent }],
        },
        { signal: controller.signal }
      );

      clearTimeout(timeoutId);

      const firstBlock = response.content[0];
      if (firstBlock.type === "text") {
        rawResponseText = firstBlock.text;
      }
    } catch (aiErr: any) {
      console.warn("Anthropic API call failed or timed out. Engaging fallback forensic engine:", aiErr?.message);
      const fallbackResult = runFallbackAnalysis(content, type, language);
      return NextResponse.json(fallbackResult);
    }

    // 5. Clean JSON response (strip markdown code blocks if any)
    const cleanedJson = rawResponseText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    let parsedAI: any;
    try {
      parsedAI = JSON.parse(cleanedJson);
    } catch (jsonErr) {
      console.warn("Failed to parse AI JSON. Falling back to rule engine.");
      const fallbackResult = runFallbackAnalysis(content, type, language);
      return NextResponse.json(fallbackResult);
    }

    // 6. Validate with Zod
    const validated = AnalysisResultSchema.safeParse(parsedAI);
    if (!validated.success) {
      console.warn("AI output did not strictly match schema. Utilizing fallback:", validated.error);
      const fallbackResult = runFallbackAnalysis(content, type, language);
      return NextResponse.json(fallbackResult);
    }

    let finalData = validated.data;

    // 7. URL scoring blend: final = 0.6 * heuristic + 0.4 * AI
    if (type === "url" || content.startsWith("http://") || content.startsWith("https://")) {
      const urlCheck = analyzeUrlHeuristics(content);
      const blendedScore = Math.round(0.6 * urlCheck.score + 0.4 * finalData.riskScore);
      finalData.riskScore = Math.min(100, Math.max(0, blendedScore));

      if (finalData.riskScore >= 65) {
        finalData.verdict = "DANGEROUS";
      } else if (finalData.riskScore >= 35) {
        finalData.verdict = "SUSPICIOUS";
      } else {
        finalData.verdict = "SAFE";
      }

      // Add heuristic flags if any found
      if (urlCheck.reasons.length > 0 && urlCheck.score > 25) {
        const hasFlag = finalData.redFlags.some((rf) => rf.phrase.includes(content.trim()));
        if (!hasFlag) {
          finalData.redFlags.unshift({
            phrase: content.trim(),
            reason: urlCheck.reasons.join(". "),
            severity: urlCheck.score >= 50 ? "danger" : "suspicious",
          });
        }
      }
    }

    // Assign ID and timestamp
    const fullResult: AnalysisResult = {
      id: `CS-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      inputType: type as ScanInputType,
      rawInput: content,
      verdict: finalData.verdict,
      riskScore: finalData.riskScore,
      confidence: finalData.confidence,
      category: finalData.category,
      scamFamily: finalData.scamFamily,
      matchPercent: finalData.matchPercent,
      redFlags: finalData.redFlags,
      explanation: finalData.explanation,
      translatedExplanation: finalData.translatedExplanation,
      actions: finalData.actions,
      reportSummary: {
        incidentDate: finalData.reportSummary?.incidentDate || new Date().toISOString().split("T")[0],
        scamType: finalData.reportSummary?.scamType || finalData.category,
        senderInfo: finalData.reportSummary?.senderInfo || "Analyzed Input",
        suspectContactOrLink: finalData.reportSummary?.suspectContactOrLink || content.slice(0, 80),
        evidenceExcerpt: content.slice(0, 300),
        estimatedLossAmount: finalData.reportSummary?.estimatedLossAmount,
      },
    };

    return NextResponse.json(fullResult);
  } catch (globalErr: any) {
    console.error("Unhandled error in /api/analyze:", globalErr);
    return NextResponse.json(
      { error: "Internal investigation engine error", message: globalErr?.message },
      { status: 500 }
    );
  }
}
