export type ScanInputType = "text" | "url" | "image" | "qr";

export type VerdictType = "SAFE" | "SUSPICIOUS" | "DANGEROUS";

export type SeverityType = "danger" | "suspicious" | "safe" | "info";

export type LanguageCode = "en" | "te" | "hi";

export interface RedFlag {
  phrase: string;
  reason: string;
  severity: SeverityType;
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  inputType: ScanInputType;
  rawInput: string;
  verdict: VerdictType;
  riskScore: number; // 0 - 100
  confidence: number; // 0 - 100
  category: string; // e.g. "Fake KYC / Banking", "Job Offer Fraud", "Lottery / Prize", "Courier OTP Scam"
  scamFamily: string; // e.g. "Fake Banking SMS APK Phishing"
  matchPercent: number; // e.g. 87
  redFlags: RedFlag[];
  explanation: string;
  translatedExplanation?: {
    en: string;
    te: string;
    hi: string;
  };
  actions: string[]; // e.g. ["Do not share OTP", "Report to bank via official app", "Block sender"]
  reportSummary: {
    incidentDate: string;
    scamType: string;
    senderInfo: string;
    suspectContactOrLink: string;
    evidenceExcerpt: string;
    estimatedLossAmount?: string;
  };
}

export interface QuizQuestion {
  id: string;
  message: string;
  sender: string;
  isScam: boolean;
  type: string;
  explanation: string;
  indicators: string[];
}
