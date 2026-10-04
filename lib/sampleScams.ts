export interface SampleCase {
  id: string;
  title: string;
  type: "text" | "url" | "image" | "qr";
  category: string;
  previewSnippet: string;
  content: string;
  expectedVerdict: "SAFE" | "SUSPICIOUS" | "DANGEROUS";
  description: string;
}

export const SAMPLE_SCAMS: SampleCase[] = [
  {
    id: "fake-bank-kyc",
    title: "Fake Bank KYC SMS",
    type: "text",
    category: "Banking Fraud / Phishing",
    previewSnippet: "URGENT: SBI Account will be blocked today...",
    content:
      "URGENT ALERT: Dear SBI customer, your bank account #XXXX4021 will be BLOCKED within 12 hours due to pending KYC verification. To prevent suspension, update your PAN and Aadhaar immediately at http://sbi-pan-kyc.top/update or call Customer Desk at +91-9876543210. Do not ignore.",
    expectedVerdict: "DANGEROUS",
    description: "Classic high-pressure panic tactic with typosquatting URL and fake support number.",
  },
  {
    id: "job-offer-fee",
    title: "Work-From-Home Job Scam",
    type: "text",
    category: "Job & Recruitment Fraud",
    previewSnippet: "Selected for Amazon Remote Data Entry. Daily Rs 2,500...",
    content:
      "Congratulations! You have been shortlisted for Amazon India Remote Data Specialist. Daily earnings: Rs 2,500 - Rs 4,500 (flexible 2 hrs daily). To activate your vendor employee ID and dispatch laptop kit, send mandatory one-time registration bond fee of Rs 1,499 via UPI to recruit-amazon@ybl. Slot reserved for 30 minutes.",
    expectedVerdict: "DANGEROUS",
    description: "Advance fee fraud exploiting remote work aspirations with artificial urgency.",
  },
  {
    id: "lottery-kbc",
    title: "Lottery & KBC Prize",
    type: "text",
    category: "Prize / Lottery Fraud",
    previewSnippet: "KBC Lucky Draw 25 Lakh INR Winner...",
    content:
      "Dear Customer, you have won Rs 25,00,000/- (Twenty Five Lakh Rupees) in Amitabh Bachchan KBC Sim Card Lucky Draw 2026! File #KB-90412. To claim your prize money in your bank account, contact Manager Rana Pratap Singh immediately on WhatsApp +91-8899001122 and pay Rs 12,500 government clearance tax.",
    expectedVerdict: "DANGEROUS",
    description: "Well-known KBC prize advance-tax scam requesting fee transfers.",
  },
  {
    id: "courier-otp",
    title: "Courier / India Post OTP Scam",
    type: "text",
    category: "Delivery / Phishing",
    previewSnippet: "India Post parcel delivery failed. Pay Rs 5 re-delivery...",
    content:
      "IndiaPost Alert: Your parcel consignment #IN98234190 could not be delivered due to incomplete street address. Please update your delivery address and pay pending Rs 5.00 re-attempt postage fee at https://indlapost-track.xyz/pay before 6:00 PM today, or package will be returned to sender.",
    expectedVerdict: "DANGEROUS",
    description: "Micro-payment bait (Rs 5) leading to card credential harvesting and OTP theft.",
  },
  {
    id: "telugu-scam-sms",
    title: "Telugu Scam SMS (తెలుగు బ్యాంక్ మోసం)",
    type: "text",
    category: "Regional Phishing / AP & Telangana",
    previewSnippet: "గమనిక: మీ SBI ఖాతా ఈరోజు నిలిపివేయబడుతుంది...",
    content:
      "ముఖ్య గమనిక: ప్రియమైన వినియోగదారుడా, మీ బ్యాంక్ ఖాతా KYC గడువు ముగిసినందున ఈరోజు రాత్రి 8 గంటలకు నిలిపివేయబడుతుంది. వెంటనే ఆధార్ కార్డు నంబర్ నమోదు చేసి ఖాతాను పునరుద్ధరించండి: http://sbi-kyc-telugu.top/auth లేదంటే మీ ఖాతా శాశ్వతంగా బ్లాక్ చేయబడుతుంది.",
    expectedVerdict: "DANGEROUS",
    description: "Regional vernacular scam targeting Telugu-speaking bank customers.",
  },
  {
    id: "safe-message",
    title: "Legitimate Utility Receipt",
    type: "text",
    category: "Legitimate Transaction",
    previewSnippet: "Electricity bill Rs 1,420 received with thanks...",
    content:
      "Dear Consumer, payment of Rs 1,420.00 towards Electricity Bill for Service #882910 has been received successfully via BillDesk on 04-Oct-2026 with Transaction ID: TXN99120482. Official portal: https://tssouthernpower.com. Thank you for choosing green billing.",
    expectedVerdict: "SAFE",
    description: "Standard legitimate transaction confirmation with HTTPS and official state utility domain.",
  },
];
