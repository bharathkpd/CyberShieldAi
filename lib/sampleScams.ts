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

export const SAMPLE_QR_DATA_URL = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 380" width="320" height="380">
  <rect width="320" height="380" fill="%23FFFDF8" stroke="%231B1B1B" stroke-width="4"/>
  <rect x="16" y="16" width="288" height="40" fill="%23D62828" stroke="%231B1B1B" stroke-width="2"/>
  <text x="160" y="42" fill="white" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">⚠️ FAKE REFUND QR TRAP</text>
  <!-- Simulated QR Pattern -->
  <g fill="%231B1B1B">
    <rect x="40" y="70" width="60" height="60" fill="none" stroke="%231B1B1B" stroke-width="8"/>
    <rect x="52" y="82" width="36" height="36"/>
    <rect x="220" y="70" width="60" height="60" fill="none" stroke="%231B1B1B" stroke-width="8"/>
    <rect x="232" y="82" width="36" height="36"/>
    <rect x="40" y="210" width="60" height="60" fill="none" stroke="%231B1B1B" stroke-width="8"/>
    <rect x="52" y="222" width="36" height="36"/>
    <!-- Matrix dots -->
    <rect x="120" y="80" width="16" height="16"/><rect x="150" y="80" width="24" height="12"/>
    <rect x="180" y="95" width="20" height="16"/><rect x="110" y="120" width="16" height="24"/>
    <rect x="136" y="115" width="48" height="24"/><rect x="190" y="130" width="24" height="24"/>
    <rect x="110" y="160" width="24" height="24"/><rect x="145" y="155" width="32" height="16"/>
    <rect x="185" y="170" width="30" height="20"/><rect x="120" y="220" width="30" height="20"/>
    <rect x="160" y="215" width="20" height="35"/><rect x="190" y="210" width="25" height="18"/>
    <rect x="225" y="220" width="35" height="30"/><rect x="270" y="180" width="15" height="40"/>
  </g>
  <rect x="120" y="140" width="80" height="40" fill="%23D62828" stroke="%231B1B1B" stroke-width="2"/>
  <text x="160" y="165" fill="white" font-family="monospace" font-size="12" font-weight="bold" text-anchor="middle">UPI PAY</text>
  <rect x="16" y="290" width="288" height="74" fill="%23EDE6D6" stroke="%231B1B1B" stroke-width="2"/>
  <text x="160" y="312" fill="%23D62828" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">DECEPTIVE UPI COLLECT REQUEST</text>
  <text x="160" y="332" fill="%231B1B1B" font-family="monospace" font-size="11" text-anchor="middle">pa: refund-agent99@oksbi | am: Rs 5,000</text>
  <text x="160" y="350" fill="%2355524B" font-family="monospace" font-size="10" text-anchor="middle">NOTE: Enter PIN to collect Rs 5000 refund</text>
</svg>`;

export const SAMPLE_SCREENSHOT_DATA_URL = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 460" width="340" height="460">
  <rect width="340" height="460" fill="%23FFFDF8" stroke="%231B1B1B" stroke-width="4"/>
  <!-- Chat App Header -->
  <rect x="12" y="12" width="316" height="52" fill="%231B1B1B"/>
  <circle cx="42" cy="38" r="16" fill="%23D62828"/>
  <text x="42" y="44" fill="white" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">POL</text>
  <text x="70" y="34" fill="white" font-family="sans-serif" font-size="13" font-weight="bold">CBI & DELHI CYBER CELL</text>
  <text x="70" y="50" fill="%23D9D0BC" font-family="monospace" font-size="10">OFFICIAL NOTICE // SENDER: +91-8800991122</text>
  <!-- Chat Bubble 1 -->
  <rect x="16" y="80" width="308" height="150" fill="%23EDE6D6" stroke="%231B1B1B" stroke-width="2" rx="4"/>
  <text x="28" y="104" fill="%23D62828" font-family="monospace" font-size="12" font-weight="bold">🚨 IMMEDIATE DIGITAL ARREST WARRANT</text>
  <text x="28" y="126" fill="%231B1B1B" font-family="sans-serif" font-size="11" font-weight="bold">CASE FILE: #CBI-NDPS-88412</text>
  <text x="28" y="146" fill="%231B1B1B" font-family="sans-serif" font-size="11">A parcel containing 16 counterfeit passports</text>
  <text x="28" y="164" fill="%231B1B1B" font-family="sans-serif" font-size="11">and 140g MDMA was seized at Delhi Airport.</text>
  <text x="28" y="184" fill="%23D62828" font-family="sans-serif" font-size="11" font-weight="bold">You are placed under immediate Digital Arrest.</text>
  <text x="28" y="204" fill="%2355524B" font-family="sans-serif" font-size="10">Do not disconnect this WhatsApp video session.</text>
  <!-- Chat Bubble 2 -->
  <rect x="16" y="246" width="308" height="110" fill="%23FFFDF8" stroke="%23D62828" stroke-width="2" rx="4"/>
  <text x="28" y="272" fill="%23D62828" font-family="monospace" font-size="12" font-weight="bold">FINANCIAL CLEARANCE DEMAND:</text>
  <text x="28" y="294" fill="%231B1B1B" font-family="sans-serif" font-size="11">Transfer Rs 2,50,000 security bond to</text>
  <text x="28" y="312" fill="%231B1B1B" font-family="monospace" font-size="11" font-weight="bold">cbi-verification@sbi</text>
  <text x="28" y="332" fill="%231B1B1B" font-family="sans-serif" font-size="11">to avoid immediate local police dispatch.</text>
  <!-- Stamp Overlay -->
  <rect x="140" y="370" width="180" height="42" fill="none" stroke="%23D62828" stroke-width="3" transform="rotate(-6 140 370)"/>
  <text x="230" y="396" fill="%23D62828" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle" transform="rotate(-6 140 370)">FAKE WARRANT</text>
</svg>`;

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
    id: "phishing-link-sample",
    title: "SBI Phishing URL (Link)",
    type: "url",
    category: "Malicious Domain / Typosquatting",
    previewSnippet: "http://sbi-pan-kyc.top/update",
    content: "http://sbi-pan-kyc.top/update",
    expectedVerdict: "DANGEROUS",
    description: "Typosquat domain with suspicious .top TLD impersonating State Bank of India login portal.",
  },
  {
    id: "indiapost-url-sample",
    title: "India Post Parcel Delay (Link)",
    type: "url",
    category: "Postal Consignment Phishing",
    previewSnippet: "https://indlapost-track.xyz/pay",
    content: "https://indlapost-track.xyz/pay",
    expectedVerdict: "DANGEROUS",
    description: "Lookalike domain (indlapost with an 'L' instead of 'I') using .xyz TLD to harvest card details for fake Rs 5 fee.",
  },
  {
    id: "safe-url-sample",
    title: "Official State Power Portal (Safe Link)",
    type: "url",
    category: "Legitimate Government Domain",
    previewSnippet: "https://www.apspdcl.in/quick-pay",
    content: "https://www.apspdcl.in/quick-pay",
    expectedVerdict: "SAFE",
    description: "Legitimate official Andhra Pradesh electricity board portal with valid HTTPS and .in ccTLD.",
  },
  {
    id: "screenshot-digital-arrest",
    title: "Digital Arrest Notice (Screenshot)",
    type: "image",
    category: "Extortion / Police Impersonation",
    previewSnippet: "CBI & Delhi Police Video Arrest Notice...",
    content: SAMPLE_SCREENSHOT_DATA_URL,
    expectedVerdict: "DANGEROUS",
    description: "Fake CBI & Delhi Police notice claiming contraband seized, placing victim under fraudulent 'Digital Arrest' to extort money.",
  },
  {
    id: "fraud-upi-qr-sample",
    title: "Fake Refund QR Code (QR / UPI)",
    type: "qr",
    category: "Deceptive UPI Collect / QR Scam",
    previewSnippet: "upi://pay?pa=refund-agent99@oksbi&pn=SBI_Customer_Refund&am=5000...",
    content: "upi://pay?pa=refund-agent99@oksbi&pn=SBI_Customer_Refund&am=5000&cu=INR&tn=ENTER_UPI_PIN_FOR_REFUND",
    expectedVerdict: "DANGEROUS",
    description: "Reverse UPI trap: Tricks victims into scanning a QR and typing their MPIN to 'receive a refund', which actually debits Rs 5,000.",
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
    title: "Telugu Bank Scam (తెలుగు బ్యాంక్ మోసం)",
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
