import { z } from "zod";

export const RedFlagSchema = z.object({
  phrase: z.string(),
  reason: z.string(),
  severity: z.enum(["danger", "suspicious", "safe", "info"]).default("danger"),
});

export const ReportSummarySchema = z.object({
  incidentDate: z.string().default(() => new Date().toISOString().split("T")[0]),
  scamType: z.string().default("Online Scam"),
  senderInfo: z.string().default("Unknown Sender"),
  suspectContactOrLink: z.string().default("None Identified"),
  evidenceExcerpt: z.string().default(""),
  estimatedLossAmount: z.string().optional(),
});

export const AnalysisResultSchema = z.object({
  id: z.string().optional(),
  timestamp: z.string().optional(),
  inputType: z.enum(["text", "url", "image", "qr"]).default("text"),
  rawInput: z.string().default(""),
  verdict: z.enum(["SAFE", "SUSPICIOUS", "DANGEROUS"]),
  riskScore: z.number().min(0).max(100),
  confidence: z.number().min(0).max(100),
  category: z.string(),
  scamFamily: z.string(),
  matchPercent: z.number().min(0).max(100),
  redFlags: z.array(RedFlagSchema),
  explanation: z.string(),
  translatedExplanation: z
    .object({
      en: z.string(),
      te: z.string(),
      hi: z.string(),
    })
    .optional(),
  actions: z.array(z.string()),
  reportSummary: ReportSummarySchema,
});

export const AnalyzeRequestSchema = z.object({
  type: z.enum(["text", "url", "image", "qr"]).default("text"),
  content: z.string().min(1, "Input content cannot be empty").max(5000, "Maximum length is 5000 characters"),
  language: z.enum(["en", "te", "hi"]).default("en"),
});

export type AnalyzeRequest = z.infer<typeof AnalyzeRequestSchema>;
export type AnalysisResultValid = z.infer<typeof AnalysisResultSchema>;
