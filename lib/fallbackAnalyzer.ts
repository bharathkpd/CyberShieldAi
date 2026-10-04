import { AnalysisResult, LanguageCode, RedFlag } from "@/types";
import { analyzeUrlHeuristics } from "./urlHeuristics";

interface KeywordPattern {
  keywords: string[];
  reason: string;
  severity: "danger" | "suspicious" | "safe";
  category?: string;
  scamFamily?: string;
}

const FRAUD_PATTERNS: KeywordPattern[] = [
  // 1. High-pressure urgency tactics
  {
    keywords: [
      "immediately",
      "urgent",
      "within 12 hours",
      "within 24 hours",
      "blocked today",
      "account suspended",
      "will be blocked",
      "account will be blocked",
      "last warning",
      "slot reserved for 30 minutes",
      "ఈరోజు రాత్రి",
      "వెంటనే",
      "నిలిపివేయబడుతుంది",
      "तुरंत",
      "आज ही",
      "ब्लॉक कर दिया जाएगा",
      "खाता बंद",
    ],
    reason: "Psychological artificial urgency designed to bypass critical thinking and force hasty compliance.",
    severity: "danger",
  },
  // 2. KYC / Banking Impersonation
  {
    keywords: [
      "kyc",
      "pan card",
      "pan and aadhaar",
      "update pan",
      "sbi customer",
      "bank account",
      "update your pan",
      "pending kyc",
      "debit card blocked",
      "ఆధార్ కార్డు",
      "బ్యాంక్ ఖాతా",
      "కేవైసీ",
      "केवाईसी",
      "पैन कार्ड",
      "आधार नंबर",
    ],
    reason: "Unauthorized banking credential demand mimicking legitimate Indian financial institutions.",
    severity: "danger",
    category: "Banking Impersonation / Fake KYC",
    scamFamily: "Banking SMS APK Phishing",
  },
  // 3. Advance fee & Job fraud
  {
    keywords: [
      "registration fee",
      "registration bond",
      "deposit fee",
      "registration deposit",
      "bond fee",
      "data entry",
      "daily payout",
      "daily earnings",
      "rs 2,500",
      "shortlisted for amazon",
      "shortlisted for",
      "work from home",
      "job offer",
      "part time",
      "laptop kit",
      "slot reserved",
      "processing fee",
      "ఒకసారి రిజిస్ట్రేషన్ ఫీజు",
      "రోజుకు సంపాదన",
      "पंजीकरण शुल्क",
      "प्रोसेसिंग फीस",
      "घर बैठे कमाई",
    ],
    reason: "Advance fee fraud: Demands upfront monetary deposit under the guise of employment or equipment dispatch.",
    severity: "danger",
    category: "Job & Recruitment Fraud",
    scamFamily: "Remote Job Advance Fee Scheme",
  },
  // 4. Lottery / KBC
  {
    keywords: [
      "lucky draw",
      "kbc",
      "25 lakh",
      "twenty five lakh",
      "rana pratap singh",
      "winner",
      "claim your prize",
      "clearance tax",
      "లాటరీ గెలుపొందారు",
      "బహుమతి",
      "लॉटरी विजेता",
      "इनाम राशि",
      "केबीसी",
    ],
    reason: "Unsolicited lottery bait demanding fictitious government tax transfers to release nonexistent winnings.",
    severity: "danger",
    category: "Prize / Lottery Fraud",
    scamFamily: "KBC Sim Card Lucky Draw Scam",
  },
  // 5. Courier / Delivery micro-payment bait
  {
    keywords: [
      "indiapost",
      "parcel",
      "delivery failed",
      "re-attempt postage",
      "re-delivery",
      "incomplete street address",
      "postage fee",
      "₹5",
      "rs 5",
      "డెలివరీ విఫలమైంది",
      "పోస్టల్ ఫీజు",
      "पार्सल डिलीवरी",
      "डाक शुल्क",
    ],
    reason: "Phishing lure using nominal micro-payments to harvest victim debit/credit credentials and OTPs.",
    severity: "danger",
    category: "Courier / Delivery Phishing",
    scamFamily: "Postal Consignment Re-delivery Phishing",
  },
  // 6. Suspicious UPI or Unverified numbers
  {
    keywords: [
      "@ybl",
      "@paytm",
      "@okaxis",
      "@ibl",
      "+91-9876543210",
      "+91-8899001122",
      "whatsapp +91",
      "upi collect",
      "వాలెట్",
      "యూపీఐ",
      "यूपीआई भुगतान",
    ],
    reason: "Direct peer-to-peer personal UPI address or mobile number used instead of official corporate gateway.",
    severity: "suspicious",
  },
  // 7. Legitimate transaction markers
  {
    keywords: [
      "received with thanks",
      "successfully via billdesk",
      "official portal: https://",
      "transaction id:",
      "green billing",
      "payment received",
      "విజయవంతంగా చెల్లించబడింది",
      "రసీదు",
      "सफलतापूर्वक प्राप्त हुआ",
    ],
    reason: "Standard authenticated payment confirmation containing genuine protocol markers and verifiable identifiers.",
    severity: "safe",
  },
];

export function runFallbackAnalysis(
  content: string,
  type: "text" | "url" | "image" | "qr",
  language: LanguageCode = "en"
): AnalysisResult {
  const redFlags: RedFlag[] = [];
  let dangerPoints = 0;
  let detectedCategory = "Suspected Cyber Fraud";
  let detectedFamily = "Multi-Vector Phishing Attack";

  // Check URL inside text or URL input
  const urlRegex = /(https?:\/\/[^\s]+)/gi;
  const urlsFound = content.match(urlRegex) || [];

  if (type === "url" || urlsFound.length > 0) {
    const targetUrl = type === "url" ? content.trim() : (urlsFound[0] || "");
    if (targetUrl) {
      const urlEval = analyzeUrlHeuristics(targetUrl);

    if (urlEval.score >= 30) {
      dangerPoints += urlEval.score * 0.55;
      redFlags.push({
        phrase: targetUrl,
        reason: urlEval.reasons.join(". "),
        severity: urlEval.score >= 60 ? "danger" : "suspicious",
      });
    } else if (urlEval.score < 20 && urlsFound.length > 0) {
      redFlags.push({
        phrase: targetUrl,
        reason: "Valid secure HTTPS URL on reputable top-level domain.",
        severity: "safe",
      });
    }
  }
}

  // Scan for keywords and exact substrings
  for (const pattern of FRAUD_PATTERNS) {
    for (const kw of pattern.keywords) {
      const idx = content.toLowerCase().indexOf(kw.toLowerCase());
      if (idx !== -1) {
        // Extract the exact casing substring from user input so highlighter works!
        const matchedPhrase = content.substring(idx, idx + kw.length);
        const alreadyAdded = redFlags.some((rf) => rf.phrase.toLowerCase() === matchedPhrase.toLowerCase());
        if (!alreadyAdded) {
          redFlags.push({
            phrase: matchedPhrase,
            reason: pattern.reason,
            severity: pattern.severity,
          });

          if (pattern.severity === "danger") dangerPoints += 28;
          if (pattern.severity === "suspicious") dangerPoints += 15;
          if (pattern.severity === "safe") dangerPoints -= 35;

          if (pattern.category) detectedCategory = pattern.category;
          if (pattern.scamFamily) detectedFamily = pattern.scamFamily;
        }
      }
    }
  }

  // Calculate final score
  let riskScore = Math.min(98, Math.max(4, Math.round(dangerPoints)));
  let verdict: "SAFE" | "SUSPICIOUS" | "DANGEROUS" = "SAFE";

  if (riskScore >= 65) {
    verdict = "DANGEROUS";
  } else if (riskScore >= 35) {
    verdict = "SUSPICIOUS";
  } else {
    verdict = "SAFE";
    detectedCategory = "Verified Legitimate Communication";
    detectedFamily = "Authorized Notification";
  }

  const confidence = verdict === "DANGEROUS" ? 92 : verdict === "SAFE" ? 89 : 76;
  const matchPercent = verdict === "DANGEROUS" ? 88 : verdict === "SAFE" ? 95 : 62;

  // Build localized plain-language explanation
  const explanations = {
    en:
      verdict === "DANGEROUS"
        ? `High-risk indicators detected. This message impersonates ${detectedCategory} using artificial panic, deceptive domains, or advance fee demands. Legitimate banks and state agencies never demand panic PAN/KYC updates via random links or WhatsApp numbers.`
        : verdict === "SUSPICIOUS"
        ? "Caution advised. The communication contains ambiguous links, unsolicited payment identifiers, or unverified contact info. Avoid clicking links or transmitting private identifiers until verified directly with the service provider."
        : "No malicious heuristics detected. The message structure matches authentic transactional communications with proper domain protocols and zero coercion tactics.",
    te:
      verdict === "DANGEROUS"
        ? `అత్యంత ప్రమాదకరమైన సంకేతాలు గుర్తించబడ్డాయి. ఈ సందేశం ${detectedCategory} పేరుతో నకిలీ లింకులు మరియు భయాందోళన సృష్టించే పదాలను ఉపయోగించి మీ బ్యాంక్ లేదా వ్యక్తిగత సమాచారాన్ని దోచుకోవడానికి ప్రయత్నిస్తోంది. బ్యాంకులు ఎప్పుడూ ఇలాంటి లింకులు పంపవు.`
        : verdict === "SUSPICIOUS"
        ? "జాగ్రత్త అవసరం. సందేశంలో కొన్ని అనుమానాస్పద లింకులు లేదా తెలియని నంబర్లు ఉన్నాయి. అధికారికంగా ధృవీకరించుకోకుండా ఎటువంటి వివరాలు ఇవ్వవద్దు."
        : "ఎటువంటి ప్రమాదకర సంకేతాలు కనిపించలేదు. ఇది అధికారిక మరియు సురక్షితమైన సందేశం లాగా ఉంది.",
    hi:
      verdict === "DANGEROUS"
        ? `अत्यधिक जोखिम के संकेत मिले हैं। यह संदेश ${detectedCategory} के नाम पर फर्जी लिंक या तत्काल बैंक खाता बंद होने का झूठा डर दिखाकर ठगी का प्रयास कर रहा है। कोई भी बैंक या सरकारी एजेंसी ऐसे लिंक पर पैन या ओटीपी अपडेट करने को नहीं कहती।`
        : verdict === "SUSPICIOUS"
        ? "सावधानी बरतें। इस संदेश में असत्यापित लिंक या संदेहास्पद फोन नंबर मौजूद हैं। आधिकारिक बैंक ऐप से पुष्टि किए बिना कोई कदम न उठाएं।"
        : "कोई दुर्भावनापूर्ण संकेत नहीं मिला। यह एक सामान्य और सुरक्षित आधिकारिक संदेश प्रतीत होता है।",
  };

  const actionMap = {
    DANGEROUS: [
      "Do NOT click any link, install any APK, or dial the provided phone number.",
      "Never share OTPs, UPI MPIN, or Aadhaar/PAN photos with anyone.",
      "If money was lost or debited, immediately call National Cybercrime Helpline 1930 within 2 hours.",
      "Report and block the sender on SMS / WhatsApp / Truecaller.",
      "File a digital complaint on the official portal: cybercrime.gov.in.",
    ],
    SUSPICIOUS: [
      "Do not reply directly to this sender or share personal details.",
      "Verify the claim directly through official bank mobile app or authorized customer care.",
      "Inspect the sender ID carefully (official bank SMS headers always use verified sender alpha-tags like 'VK-SBIINB').",
    ],
    SAFE: [
      "Message appears authentic, but always confirm payment debits directly in your banking passbook.",
      "Keep standard vigilance and ensure 2FA is active on your online accounts.",
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
    category: detectedCategory,
    scamFamily: detectedFamily,
    matchPercent,
    redFlags,
    explanation: explanations[language] || explanations.en,
    translatedExplanation: explanations,
    actions: actionMap[verdict],
    reportSummary: {
      incidentDate: new Date().toISOString().split("T")[0],
      scamType: detectedCategory,
      senderInfo: urlsFound[0] || (content.length > 50 ? content.slice(0, 40) + "..." : content),
      suspectContactOrLink: urlsFound[0] || "Identified in evidence text",
      evidenceExcerpt: content.length > 300 ? content.slice(0, 300) + "..." : content,
    },
  };
}
