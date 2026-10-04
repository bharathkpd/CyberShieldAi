import { AnalysisResult, LanguageCode } from "@/types";

export interface DashboardStats {
  totalScans: number;
  scamsBlocked: number;
  avgRiskScore: number;
  categories: { name: string; count: number }[];
  trend: { date: string; scans: number; threats: number }[];
  stateData: { state: string; reports: number; topScam: string }[];
}

export const SEED_HISTORY: AnalysisResult[] = [
  {
    id: "CS-9812",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    inputType: "text",
    rawInput: "SBI Account Alert: Your SBI account #XXXX4021 will be BLOCKED within 12 hours due to pending KYC verification. Update PAN immediately at http://sbi-pan-kyc.top/update",
    verdict: "DANGEROUS",
    riskScore: 94,
    confidence: 96,
    category: "Banking Fraud / Fake KYC",
    scamFamily: "Banking SMS APK Phishing",
    matchPercent: 91,
    redFlags: [
      {
        phrase: "BLOCKED within 12 hours",
        reason: "Panic coercion tactic forcing hasty decision without verification",
        severity: "danger",
      },
      {
        phrase: "http://sbi-pan-kyc.top/update",
        reason: "Lookalike typosquatting domain on disposable .top TLD",
        severity: "danger",
      },
    ],
    explanation: "This message is an impersonation of State Bank of India. It attempts credential theft by creating false urgency regarding account suspension.",
    actions: [
      "Do NOT click the link or provide PAN/Aadhaar credentials.",
      "Block the sender number on your device.",
      "Report to 1930 if bank credentials were submitted.",
    ],
    reportSummary: {
      incidentDate: new Date().toISOString().split("T")[0],
      scamType: "Fake Banking KYC Phishing",
      senderInfo: "VK-SBIBNK (Spoofed SMS Header)",
      suspectContactOrLink: "http://sbi-pan-kyc.top/update",
      evidenceExcerpt: "SBI account #XXXX4021 will be BLOCKED within 12 hours...",
    },
  },
  {
    id: "CS-8420",
    timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
    inputType: "text",
    rawInput: "Congratulations! Selected for Amazon India Remote Data Specialist. Daily Rs 2,500. Pay Rs 1,499 registration bond fee via UPI to recruit-amazon@ybl.",
    verdict: "DANGEROUS",
    riskScore: 89,
    confidence: 93,
    category: "Job & Recruitment Fraud",
    scamFamily: "Work-From-Home Advance Fee Fraud",
    matchPercent: 88,
    redFlags: [
      {
        phrase: "Pay Rs 1,499 registration bond fee",
        reason: "Advance fee fraud: Demands upfront money for employment promise",
        severity: "danger",
      },
      {
        phrase: "recruit-amazon@ybl",
        reason: "Personal UPI ID instead of corporate billing payment gateway",
        severity: "suspicious",
      },
    ],
    explanation: "Classic employment advance-fee scam exploiting remote job seekers. Legitimate employers never charge candidates registration or bond fees.",
    actions: [
      "Never transfer registration fees or security deposits for jobs.",
      "Check Amazon official jobs portal (amazon.jobs).",
    ],
    reportSummary: {
      incidentDate: new Date().toISOString().split("T")[0],
      scamType: "Work-From-Home Job Scam",
      senderInfo: "WhatsApp +91-9128491023",
      suspectContactOrLink: "recruit-amazon@ybl",
      evidenceExcerpt: "Pay Rs 1,499 registration bond fee via UPI...",
      estimatedLossAmount: "1499",
    },
  },
  {
    id: "CS-7105",
    timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
    inputType: "text",
    rawInput: "Payment of Rs 1,420.00 received towards Electricity Bill for Service #882910 via BillDesk. Official portal: https://tssouthernpower.com",
    verdict: "SAFE",
    riskScore: 6,
    confidence: 95,
    category: "Legitimate Transaction",
    scamFamily: "Utility Payment Confirmation",
    matchPercent: 96,
    redFlags: [
      {
        phrase: "https://tssouthernpower.com",
        reason: "Legitimate secure state electrical utility domain",
        severity: "safe",
      },
    ],
    explanation: "This receipt matches authentic transactional utility billing patterns with valid HTTPS state distribution domain and no coercion.",
    actions: [
      "Keep standard vigilance.",
      "Verify transaction in banking statement for your records.",
    ],
    reportSummary: {
      incidentDate: new Date().toISOString().split("T")[0],
      scamType: "Legitimate Billing Notification",
      senderInfo: "TSSPDCL-OFFICIAL",
      suspectContactOrLink: "https://tssouthernpower.com",
      evidenceExcerpt: "Payment of Rs 1,420.00 received towards Electricity Bill...",
    },
  },
  {
    id: "CS-6290",
    timestamp: new Date(Date.now() - 3600000 * 28).toISOString(),
    inputType: "text",
    rawInput: "IndiaPost Alert: Consignment #IN98234190 delivery failed. Pay Rs 5 re-delivery postage fee at https://indlapost-track.xyz before 6 PM.",
    verdict: "DANGEROUS",
    riskScore: 92,
    confidence: 94,
    category: "Courier / Delivery Phishing",
    scamFamily: "Postal Consignment Re-delivery Phishing",
    matchPercent: 92,
    redFlags: [
      {
        phrase: "https://indlapost-track.xyz",
        reason: "Typosquatted domain (indlapost with 'l') on disposable .xyz TLD",
        severity: "danger",
      },
      {
        phrase: "Pay Rs 5 re-delivery",
        reason: "Micro-payment bait designed to trigger credential input form",
        severity: "danger",
      },
    ],
    explanation: "Impersonates India Post using a deceptive typosquatted domain. The small Rs 5 fee is a lure to compromise card details and intercept banking OTPs.",
    actions: [
      "Do NOT enter card details on non-gov.in sites.",
      "Track parcels strictly at https://www.indiapost.gov.in.",
    ],
    reportSummary: {
      incidentDate: new Date().toISOString().split("T")[0],
      scamType: "Postal Consignment Phishing",
      senderInfo: "+91-9840192834",
      suspectContactOrLink: "https://indlapost-track.xyz",
      evidenceExcerpt: "Pay Rs 5 re-delivery postage fee at https://indlapost-track.xyz...",
    },
  },
];

export const SEED_DASHBOARD_DATA: DashboardStats = {
  totalScans: 14820,
  scamsBlocked: 11240,
  avgRiskScore: 78,
  categories: [
    { name: "Fake KYC & Banking", count: 4620 },
    { name: "Job & Task Fraud", count: 3410 },
    { name: "Courier & Postal Phishing", count: 2150 },
    { name: "Lottery & KBC Prize", count: 1820 },
    { name: "Electricity Bill Threat", count: 1490 },
    { name: "Sextortion / Police Blackmail", count: 1330 },
  ],
  trend: [
    { date: "Mon", scans: 1420, threats: 1040 },
    { date: "Tue", scans: 1830, threats: 1390 },
    { date: "Wed", scans: 2190, threats: 1680 },
    { date: "Thu", scans: 1980, threats: 1510 },
    { date: "Fri", scans: 2540, threats: 1990 },
    { date: "Sat", scans: 2710, threats: 2140 },
    { date: "Sun", scans: 2150, threats: 1490 },
  ],
  stateData: [
    { state: "Maharashtra", reports: 3410, topScam: "Digital Arrest & Stock Trading" },
    { state: "Telangana & AP", reports: 2890, topScam: "Instant Loan & Fake KYC APK" },
    { state: "Delhi-NCR", reports: 2720, topScam: "Job Task / Part-time Review" },
    { state: "Karnataka", reports: 2430, topScam: "Courier OTP & Fedex Threat" },
    { state: "Tamil Nadu", reports: 1980, topScam: "Electricity Bill Disconnect" },
    { state: "West Bengal", reports: 1390, topScam: "Lottery & SIM Card Upgrade" },
  ],
};
