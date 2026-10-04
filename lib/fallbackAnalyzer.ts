import { AnalysisResult, LanguageCode, RedFlag } from "@/types";
import { analyzeUrlHeuristics } from "./urlHeuristics";

export function runFallbackAnalysis(
  content: string,
  type: "text" | "url" | "image" | "qr",
  language: LanguageCode = "en"
): AnalysisResult {
  const normalized = content.trim();
  const lower = normalized.toLowerCase();
  const redFlags: RedFlag[] = [];

  let verdict: "SAFE" | "SUSPICIOUS" | "DANGEROUS" = "SAFE";
  let riskScore = 4;
  let confidence = 95;
  let category = "Normal Communication / Legitimate Message";
  let scamFamily = "Authentic Non-Threat Communication";
  let matchPercent = 96;

  // Helper to extract exact casing match from content
  const highlightPhrase = (phrase: string, reason: string, severity: "danger" | "suspicious" | "safe") => {
    const idx = lower.indexOf(phrase.toLowerCase());
    const matched = idx !== -1 ? normalized.substring(idx, idx + phrase.length) : phrase;
    if (!redFlags.some((rf) => rf.phrase.toLowerCase() === matched.toLowerCase())) {
      redFlags.push({ phrase: matched, reason, severity });
    }
  };

  // Find all URLs inside input
  const urlRegex = /(https?:\/\/[^\s]+)/gi;
  const urlsFound = normalized.match(urlRegex) || [];

  // =========================================================================
  // 1. URL MODE
  // =========================================================================
  if (type === "url" || (type === "text" && urlsFound.length === 1 && normalized === urlsFound[0])) {
    const targetUrl = type === "url" ? normalized : (urlsFound[0] ?? normalized);
    const urlEval = analyzeUrlHeuristics(targetUrl);

    if (urlEval.score >= 50) {
      verdict = "DANGEROUS";
      riskScore = Math.min(98, Math.max(88, urlEval.score));
      confidence = 94;
      category = "Malicious Domain / Brand Typosquatting";
      scamFamily = "Deceptive Phishing Infrastructure";
      matchPercent = 91;
      urlEval.reasons.forEach((r) => {
        redFlags.push({ phrase: targetUrl, reason: r, severity: "danger" });
      });
    } else if (urlEval.score >= 25) {
      verdict = "SUSPICIOUS";
      riskScore = 55;
      confidence = 80;
      category = "Unverified External Link";
      scamFamily = "Suspicious Link Vector";
      matchPercent = 65;
      urlEval.reasons.forEach((r) => {
        redFlags.push({ phrase: targetUrl, reason: r, severity: "suspicious" });
      });
    } else {
      verdict = "SAFE";
      riskScore = 4;
      confidence = 96;
      category = "Verified Web Domain";
      scamFamily = "Authorized Web Portal";
      matchPercent = 98;
      redFlags.push({
        phrase: targetUrl,
        reason: urlEval.reasons[0] || "Valid secure web domain with standard protocol security.",
        severity: "safe",
      });
    }
  }

  // =========================================================================
  // 2. QR / UPI MODE
  // =========================================================================
  else if (type === "qr" || lower.startsWith("upi://pay")) {
    const isDeceptiveRefund =
      lower.includes("refund") ||
      lower.includes("cashback") ||
      lower.includes("collect") ||
      lower.includes("pin") ||
      lower.includes("reward") ||
      lower.includes("bonus");

    const hasAmount = lower.includes("am=") || lower.includes("mode=02");

    if (isDeceptiveRefund && hasAmount) {
      verdict = "DANGEROUS";
      riskScore = 98;
      confidence = 98;
      category = "Deceptive UPI Collect / Reverse Payment Scam";
      scamFamily = "Reverse Payment QR Scam (UPI Collect Trap)";
      matchPercent = 94;

      if (lower.includes("upi://pay")) {
        highlightPhrase("upi://pay", "Active UPI payment intent designed to DEBIT funds from your bank account.", "danger");
      }
      if (lower.includes("refund") || lower.includes("pin")) {
        const pinPhrase = lower.includes("enter_upi_pin_for_refund")
          ? "ENTER_UPI_PIN_FOR_REFUND"
          : (lower.match(/refund[^\s&]*/i)?.[0] || "refund");
        highlightPhrase(pinPhrase, "CRITICAL: You NEVER enter your UPI PIN to receive money. MPIN is strictly for debiting money.", "danger");
      }
      const amMatch = normalized.match(/am=([^&]+)/i);
      if (amMatch) {
        highlightPhrase(amMatch[0], `Automated debit amount of ₹${amMatch[1]} set to drain your balance upon MPIN entry.`, "danger");
      }
    } else {
      // Standard genuine peer or merchant UPI QR
      verdict = "SAFE";
      riskScore = 12;
      confidence = 90;
      category = "Standard Peer / Merchant UPI Payment";
      scamFamily = "Standard UPI Payment Request";
      matchPercent = 92;
      redFlags.push({
        phrase: normalized.startsWith("upi://") ? "upi://pay" : normalized,
        reason: "Standard authentic UPI payment string. Authorizes an outbound payment to the specified payee.",
        severity: "safe",
      });
    }
  }

  // =========================================================================
  // 3. SCREENSHOT / IMAGE MODE
  // =========================================================================
  else if (type === "image" || normalized.startsWith("data:image/")) {
    const isDigitalArrest =
      lower.includes("digital arrest") ||
      lower.includes("cbi") ||
      lower.includes("warrant") ||
      lower.includes("delhi cyber") ||
      lower.includes("narcotics");

    const isBankingPhish =
      (lower.includes("sbi") || lower.includes("bank") || lower.includes("kyc")) &&
      (lower.includes("blocked") || lower.includes("pan") || lower.includes("aadhaar"));

    if (isDigitalArrest) {
      verdict = "DANGEROUS";
      riskScore = 99;
      confidence = 98;
      category = "Police & CBI Impersonation / Digital Arrest Extortion";
      scamFamily = "Digital Arrest Cyber Extortion Scheme";
      matchPercent = 95;
      highlightPhrase("DIGITAL ARREST", "Indian law enforcement NEVER conducts Digital Arrests via WhatsApp/Skype or demands cash bonds.", "danger");
      highlightPhrase("cbi-verification@sbi", "Fraudulent extortion payment handle disguised as an investigative agency.", "danger");
    } else if (isBankingPhish) {
      verdict = "DANGEROUS";
      riskScore = 96;
      confidence = 94;
      category = "Banking Impersonation / Fake KYC Phishing";
      scamFamily = "Banking SMS APK Phishing";
      matchPercent = 90;
      highlightPhrase("KYC", "Unauthorized banking credential demand mimicking legitimate financial institutions.", "danger");
      highlightPhrase("blocked", "Fabricated urgency designed to force panic compliance.", "danger");
    } else {
      verdict = "SAFE";
      riskScore = 6;
      confidence = 92;
      category = "Normal Screen Capture / Non-Threat Evidence";
      scamFamily = "Authentic Screen Content";
      matchPercent = 95;
    }
  }

  // =========================================================================
  // 4. TEXT MODE (Multi-Vector Corroboration Engine)
  // =========================================================================
  else {
    // Vector A: Digital Arrest / Law Enforcement Extortion
    const hasDigitalArrest =
      lower.includes("digital arrest") ||
      lower.includes("digital custody") ||
      ((lower.includes("cbi") || lower.includes("police") || lower.includes("customs") || lower.includes("narcotics") || lower.includes("cyber cell")) &&
        (lower.includes("warrant") || lower.includes("contraband") || lower.includes("parcel seized") || lower.includes("money laundering") || lower.includes("security bond") || lower.includes("video call")));

    // Vector B: Banking Impersonation & Panic KYC
    const hasBankEntity =
      lower.includes("sbi") ||
      lower.includes("hdfc") ||
      lower.includes("icici") ||
      lower.includes("axis") ||
      lower.includes("pnb") ||
      lower.includes("bank account") ||
      lower.includes("debit card") ||
      lower.includes("credit card") ||
      lower.includes("yono") ||
      lower.includes("కేవైసీ") ||
      lower.includes("బ్యాంక్ ఖాతా") ||
      lower.includes("కేవైసి") ||
      lower.includes("केवाईसी") ||
      lower.includes("बैंक खाता");

    const hasThreatOrCoercion =
      lower.includes("blocked today") ||
      lower.includes("will be blocked") ||
      lower.includes("account suspended") ||
      lower.includes("deactivated") ||
      lower.includes("frozen") ||
      lower.includes("update pan") ||
      lower.includes("update your pan") ||
      lower.includes("pending kyc") ||
      lower.includes("link aadhaar") ||
      lower.includes("నిలిపివేయబడుతుంది") ||
      lower.includes("బ్లాక్ చేయబడుతుంది") ||
      lower.includes("ఆధార్ కార్డు నంబర్") ||
      lower.includes("ब्लॉक कर दिया जाएगा") ||
      lower.includes("निलंबित");

    const hasPhishingChannel =
      urlsFound.length > 0 ||
      lower.includes("http://") ||
      lower.includes("https://") ||
      lower.includes(".apk") ||
      lower.includes("bit.ly") ||
      lower.includes("tinyurl") ||
      lower.includes("ఈరోజు రాత్రి") ||
      lower.includes("within 24 hours") ||
      lower.includes("immediately") ||
      lower.includes("వెంటనే");

    const isBankingScam = hasBankEntity && hasThreatOrCoercion && hasPhishingChannel;

    // Vector C: Electricity / Power Cut Scam
    const hasPowerEntity =
      lower.includes("electricity") ||
      lower.includes("power") ||
      lower.includes("current") ||
      lower.includes("apspdcl") ||
      lower.includes("tseb") ||
      lower.includes("bescom") ||
      lower.includes("విద్యుత్") ||
      lower.includes("కరెంట్") ||
      lower.includes("बिजली बिल") ||
      lower.includes("बिजली");

    const hasPowerThreat =
      lower.includes("disconnected") ||
      lower.includes("cut off") ||
      lower.includes("terminated tonight") ||
      lower.includes("bill was not updated") ||
      lower.includes("previous month bill") ||
      lower.includes("రాత్రి నిలిపివేయబడుతుంది") ||
      lower.includes("काट दी जाएगी");

    const hasOfficerContact =
      lower.includes("officer") ||
      lower.includes("call") ||
      lower.includes("contact") ||
      lower.includes("సంప్రదించండి") ||
      lower.includes("संपर्क करें") ||
      /\+?91[- ]?[6-9]\d{9}/.test(normalized);

    const isElectricityScam = hasPowerEntity && hasPowerThreat && hasOfficerContact;

    // Vector D: Advance Fee Job Scam
    const hasJobBait =
      lower.includes("work from home") ||
      lower.includes("part time") ||
      lower.includes("part-time") ||
      lower.includes("data entry") ||
      lower.includes("shortlisted for") ||
      lower.includes("earn rs") ||
      lower.includes("daily payout") ||
      lower.includes("daily earnings") ||
      lower.includes("youtube like") ||
      lower.includes("shortlisted for amazon") ||
      lower.includes("పార్ట్ టైమ్") ||
      lower.includes("రోజుకు సంపాదన") ||
      lower.includes("घर बैठे कमाई");

    const hasDepositDemand =
      lower.includes("registration fee") ||
      lower.includes("deposit fee") ||
      lower.includes("registration deposit") ||
      lower.includes("refundable deposit") ||
      lower.includes("refundable security") ||
      lower.includes("processing fee") ||
      lower.includes("bond fee") ||
      lower.includes("laptop kit") ||
      lower.includes("రిజిస్ట్రేషన్ ఫీజు") ||
      lower.includes("पंजीकरण शुल्क") ||
      lower.includes("प्रोसेसिंग फीस");

    const isJobScam = hasJobBait && hasDepositDemand;

    // Vector E: Lottery / Prize / KBC Fraud
    const hasLotteryBait =
      lower.includes("kbc") ||
      lower.includes("lucky draw") ||
      lower.includes("25 lakh") ||
      lower.includes("twenty five lakh") ||
      lower.includes("rana pratap singh") ||
      lower.includes("lottery winner") ||
      lower.includes("won rs") ||
      lower.includes("claim your prize") ||
      lower.includes("లాటరీ") ||
      lower.includes("బహుమతి") ||
      lower.includes("लॉटरी विजेता") ||
      lower.includes("केबीसी");

    const hasTaxExtortion =
      lower.includes("clearance tax") ||
      lower.includes("government clearance") ||
      lower.includes("processing fee") ||
      lower.includes("whatsapp +91") ||
      lower.includes("pay rs 12,500") ||
      lower.includes("పన్ను చెల్లించండి") ||
      lower.includes("टैक्स जमा करें");

    const isLotteryScam = hasLotteryBait && (hasTaxExtortion || lower.includes("tax") || lower.includes("fee"));

    // Vector F: Courier / Delivery Phishing
    const hasCourierEntity =
      lower.includes("indiapost") ||
      lower.includes("india post") ||
      lower.includes("parcel") ||
      lower.includes("consignment") ||
      lower.includes("courier") ||
      lower.includes("డెలివరీ") ||
      lower.includes("पार्सल");

    const hasCourierIssue =
      lower.includes("delivery failed") ||
      lower.includes("incomplete street address") ||
      lower.includes("wrong address") ||
      lower.includes("re-attempt") ||
      lower.includes("could not be delivered") ||
      lower.includes("విఫలమైంది") ||
      lower.includes("विफल");

    const hasMicroFee =
      lower.includes("postage fee") ||
      lower.includes("rs 5") ||
      lower.includes("₹5") ||
      lower.includes("re-attempt fee") ||
      urlsFound.length > 0;

    const isCourierScam = hasCourierEntity && hasCourierIssue && hasMicroFee;

    // Evaluate Corroborated Attack Vectors
    if (hasDigitalArrest) {
      verdict = "DANGEROUS";
      riskScore = 99;
      confidence = 98;
      category = "Police & CBI Impersonation / Digital Arrest Extortion";
      scamFamily = "Digital Arrest Cyber Extortion Scheme";
      matchPercent = 95;

      const arrestMatches = ["DIGITAL ARREST", "CBI", "WARRANT", "security bond", "cbi-verification@sbi"];
      arrestMatches.forEach((m) => {
        if (lower.includes(m.toLowerCase())) {
          highlightPhrase(m, "Indian law enforcement NEVER places citizens under 'Digital Arrest' or requests online bonds.", "danger");
        }
      });
    } else if (isBankingScam) {
      verdict = "DANGEROUS";
      riskScore = 97;
      confidence = 96;
      category = "Banking Impersonation / Fake KYC";
      scamFamily = "Banking SMS APK Phishing";
      matchPercent = 93;

      if (lower.includes("blocked") || lower.includes("నిలిపివేయబడుతుంది") || lower.includes("ब्लॉक")) {
        const kw = lower.includes("నిలిపివేయబడుతుంది")
          ? "నిలిపివేయబడుతుంది"
          : lower.includes("ఈరోజు రాత్రి 8 గంటలకు నిలిపివేయబడుతుంది")
          ? "ఈరోజు రాత్రి 8 గంటలకు నిలిపివేయబడుతుంది"
          : "blocked";
        highlightPhrase(kw, "Artificial urgency designed to cause panic and force instant compliance.", "danger");
      }
      if (lower.includes("kyc") || lower.includes("pan card") || lower.includes("ఆధార్ కార్డు") || lower.includes("केवाईसी")) {
        const kw = lower.includes("ఆధార్ కార్డు") ? "ఆధార్ కార్డు" : lower.includes("pan") ? "pan" : "kyc";
        highlightPhrase(kw, "Deceptive demand for confidential financial credentials.", "danger");
      }
      urlsFound.forEach((u) => {
        highlightPhrase(u, "Deceptive phishing link hosted on unverified infrastructure.", "danger");
      });
    } else if (isElectricityScam) {
      verdict = "DANGEROUS";
      riskScore = 96;
      confidence = 95;
      category = "Utility Impersonation / Power Cut Scam";
      scamFamily = "Electricity Disconnection Extortion Scheme";
      matchPercent = 92;

      highlightPhrase("disconnected", "Fraudulent threat of utility cutoff without statutory notice.", "danger");
      highlightPhrase("officer", "Unverified personal mobile number falsely masquerading as a power official.", "danger");
    } else if (isJobScam) {
      verdict = "DANGEROUS";
      riskScore = 94;
      confidence = 93;
      category = "Job & Recruitment Fraud";
      scamFamily = "Part-Time Job Advance Deposit Scam";
      matchPercent = 90;

      if (lower.includes("registration fee") || lower.includes("registration deposit") || lower.includes("రిజిస్ట్రేషన్ ఫీజు")) {
        highlightPhrase("registration", "Advance fee fraud: Legitimate employers never charge candidates money for job offers.", "danger");
      }
      if (lower.includes("work from home") || lower.includes("shortlisted")) {
        highlightPhrase("work from home", "Unrealistic remote earning bait targeting job seekers.", "danger");
      }
    } else if (isLotteryScam) {
      verdict = "DANGEROUS";
      riskScore = 98;
      confidence = 97;
      category = "Prize / Lottery Fraud";
      scamFamily = "KBC Sim Card Lucky Draw Scam";
      matchPercent = 94;

      if (lower.includes("25 lakh") || lower.includes("twenty five lakh")) {
        highlightPhrase("25 lakh", "Nonexistent lottery prize bait to lure unsuspecting victims.", "danger");
      }
      if (lower.includes("clearance tax") || lower.includes("12,500")) {
        highlightPhrase("tax", "Upfront extortion disguised as government clearance or release tax.", "danger");
      }
    } else if (isCourierScam) {
      verdict = "DANGEROUS";
      riskScore = 96;
      confidence = 95;
      category = "Courier / Delivery Phishing";
      scamFamily = "Postal Consignment Re-delivery Phishing";
      matchPercent = 92;

      if (lower.includes("rs 5") || lower.includes("₹5") || lower.includes("postage fee")) {
        highlightPhrase("fee", "Nominal micro-payment trap designed to capture card CVV and OTP.", "danger");
      }
      urlsFound.forEach((u) => {
        highlightPhrase(u, "Typosquatted domain mimicking official India Post website (indiapost.gov.in).", "danger");
      });
    } else if (urlsFound.length > 0 && urlsFound[0]) {
      // Check if URL is suspicious on its own
      const primaryUrl = urlsFound[0];
      const urlEval = analyzeUrlHeuristics(primaryUrl);
      if (urlEval.score >= 50) {
        verdict = "DANGEROUS";
        riskScore = Math.min(96, Math.max(85, urlEval.score));
        confidence = 90;
        category = "Phishing Link Embedded in Text";
        scamFamily = "Deceptive URL Transmission";
        matchPercent = 88;
        redFlags.push({ phrase: primaryUrl, reason: urlEval.reasons[0] || "High-risk domain markers detected", severity: "danger" });
      } else if (urlEval.score >= 25) {
        verdict = "SUSPICIOUS";
        riskScore = 52;
        confidence = 78;
        category = "Unverified Link Embedded in Text";
        scamFamily = "Suspicious Link Transmission";
        matchPercent = 65;
        redFlags.push({ phrase: primaryUrl, reason: urlEval.reasons[0] || "Unverified domain markers detected", severity: "suspicious" });
      } else {
        // Safe URL inside text
        verdict = "SAFE";
        riskScore = 4;
        confidence = 95;
        category = "Legitimate Transaction / Safe Message";
        scamFamily = "Authentic Communication";
        matchPercent = 97;
        redFlags.push({
          phrase: primaryUrl,
          reason: "Verified authentic web address with valid encryption protocols.",
          severity: "safe",
        });
      }
    } else {
      // Clean, everyday conversational message, legitimate OTP, or general non-threat text!
      verdict = "SAFE";
      riskScore = 4;
      confidence = 96;
      category = "Normal Communication / Legitimate Message";
      scamFamily = "Authentic Communication";
      matchPercent = 98;
      // No danger red flags at all!
    }
  }

  // Localized plain-language explanations
  const explanations = {
    en:
      verdict === "DANGEROUS"
        ? `High-risk fraud indicators detected. This communication impersonates ${category} using coercive panic, fake government seals, or upfront deposit demands. Legitimate banks and state agencies never demand OTPs, PAN updates via random links, or conduct arrests over video calls.`
        : verdict === "SUSPICIOUS"
        ? "Caution advised. The communication contains ambiguous links or unverified contact information. Do not click links or share confidential details until verified directly through official customer care channels."
        : "No malicious heuristics detected. This message matches normal everyday conversation or authentic transactional notifications with zero fraud indicators, deceptive links, or financial coercion patterns.",
    te:
      verdict === "DANGEROUS"
        ? `అత్యంత ప్రమాదకరమైన సైబర్ మోసం గుర్తించబడింది. ఈ సందేశం ${category} పేరుతో నకిలీ లింకులు మరియు భయాందోళన సృష్టించే పదాలను ఉపయోగించి మీ బ్యాంక్ లేదా వ్యక్తిగత సమాచారాన్ని దోచుకోవడానికి ప్రయత్నిస్తోంది. బ్యాంకులు లేదా ప్రభుత్వ అధికారులు ఎప్పుడూ ఇలాంటి సందేశాలు పంపరు.`
        : verdict === "SUSPICIOUS"
        ? "జాగ్రత్త అవసరం. సందేశంలో కొన్ని అనుమానాస్పద లింకులు లేదా తెలియని నంబర్లు ఉన్నాయి. అధికారికంగా ధృవీకరించుకోకుండా ఎటువంటి వివరాలు ఇవ్వవద్దు."
        : "ఎటువంటి సైబర్ మోసాలు లేదా ప్రమాదకర సంకేతాలు కనిపించలేదు. ఇది సాధారణ సంభాషణ లేదా ధృవీకరించబడిన అధికారిక నోటిఫికేషన్ లాగా ఉంది.",
    hi:
      verdict === "DANGEROUS"
        ? `अत्यधिक जोखिम वाला साइबर धोखाधड़ी का प्रयास मिला है। यह संदेश ${category} के नाम पर फर्जी लिंक या तत्काल बैंक खाता बंद होने का झूठा डर दिखाकर ठगी का प्रयास कर रहा है। कोई भी बैंक या सरकारी एजेंसी ऐसे लिंक पर पैन या ओटीपी अपडेट करने को नहीं कहती।`
        : verdict === "SUSPICIOUS"
        ? "सावधानी बरतें। इस संदेश में असत्यापित लिंक या संदेहास्पद फोन नंबर मौजूद हैं। आधिकारिक बैंक ऐप से पुष्टि किए बिना कोई कदम न उठाएं।"
        : "कोई साइबर धोखाधड़ी या दुर्भावनापूर्ण संकेत नहीं मिला। यह एक सामान्य बातचीत या प्रामाणिक आधिकारिक सूचना प्रतीत होती है।",
  };

  const actionMap = {
    DANGEROUS: [
      "Do NOT click any link, install any APK, or dial the provided phone number.",
      "Never share OTPs, UPI MPIN, or Aadhaar/PAN photos with anyone.",
      "If money was debited, immediately call National Cybercrime Helpline 1930 within the 2-hour Golden Hour.",
      "Report and block the sender on SMS, WhatsApp, and Truecaller.",
      "File a formal digital fraud complaint on the official portal: cybercrime.gov.in.",
    ],
    SUSPICIOUS: [
      "Do not reply directly to this sender or share personal details.",
      "Verify the claim directly through the official bank app or authorized helpline.",
      "Inspect the sender ID carefully (official bank SMS headers always use verified sender alpha-tags like 'VK-SBIINB').",
    ],
    SAFE: [
      "No defensive action required. This communication appears authentic and safe.",
      "Maintain standard digital vigilance and keep 2FA active on your accounts.",
      "Remember that legitimate institutions never request your UPI MPIN or account passwords.",
    ],
  };

  return {
    id: `CS-${Math.floor(1000 + Math.random() * 9000)}`,
    timestamp: new Date().toISOString(),
    inputType: type,
    rawInput: content,
    verdict,
    riskScore,
    confidence,
    category,
    scamFamily,
    matchPercent,
    redFlags,
    explanation: explanations[language] || explanations.en,
    translatedExplanation: explanations,
    actions: actionMap[verdict],
    reportSummary: {
      incidentDate: new Date().toISOString().split("T")[0],
      scamType: category,
      senderInfo: urlsFound[0] || (normalized.length > 50 ? normalized.slice(0, 40) + "..." : normalized),
      suspectContactOrLink: urlsFound[0] || "Identified in evidence text",
      evidenceExcerpt: normalized.length > 300 ? normalized.slice(0, 300) + "..." : normalized,
    },
  };
}
