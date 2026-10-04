import { LanguageCode } from "@/types";

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  fraudDesk: string;
  nav: {
    scan: string;
    dashboard: string;
    learn: string;
    history: string;
    about: string;
    helpline: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    startBtn: string;
    sampleBtn: string;
  };
  scanner: {
    title: string;
    tabText: string;
    tabLink: string;
    tabImage: string;
    tabQR: string;
    placeholderText: string;
    placeholderUrl: string;
    dragDropImage: string;
    dragDropQR: string;
    analyzeBtn: string;
    analyzingBtn: string;
    shortcuts: string;
    samplesLabel: string;
    charCount: string;
  };
  scanningStates: string[];
  verdicts: {
    safe: string;
    suspicious: string;
    dangerous: string;
  };
  report: {
    caseNumber: string;
    riskScore: string;
    confidence: string;
    scamFamily: string;
    evidenceHeading: string;
    evidenceSub: string;
    redFlagsHeading: string;
    explanationHeading: string;
    actionsHeading: string;
    familyBtn: string;
    reportBtn: string;
    downloadPdf: string;
    scanAnother: string;
  };
  familyModal: {
    title: string;
    warningHeader: string;
    subtitle: string;
    copyBtn: string;
    downloadBtn: string;
    whatsappBtn: string;
    closeBtn: string;
  };
  complaintModal: {
    title: string;
    helplineNotice: string;
    portalNotice: string;
    copyReportBtn: string;
    downloadPdfBtn: string;
    openPortalBtn: string;
    call1930Btn: string;
    guideTitle: string;
  };
  footer: {
    helplineTitle: string;
    helplineDesc: string;
    disclaimer: string;
  };
}

export const translations: Record<LanguageCode, TranslationDictionary> = {
  en: {
    appName: "CyberShield AI",
    tagline: "Forensic Scam & Cybercrime Defense Desk",
    fraudDesk: "FRAUD INVESTIGATION DESK",
    nav: {
      scan: "Investigate",
      dashboard: "Threat Intelligence",
      learn: "Learn & Drill",
      history: "Case Archives",
      about: "Forensic Protocol",
      helpline: "National Helpline: 1930",
    },
    hero: {
      badge: "ACTIVE INCIDENT MONITOR // REGION: INDIA",
      title: "Got a weird message? Let's investigate.",
      subtitle:
        "Paste any suspicious SMS, WhatsApp message, payment link, screenshot, or QR code. Our forensic engine dissects pressure tactics, typosquats, and fraud patterns in seconds.",
      startBtn: "Start Investigation",
      sampleBtn: "Inspect Sample Case",
    },
    scanner: {
      title: "EVIDENCE INTAKE TERMINAL",
      tabText: "Message",
      tabLink: "Link / URL",
      tabImage: "Screenshot",
      tabQR: "QR Code",
      placeholderText: "Paste suspicious SMS, WhatsApp message, Telegram job pitch, or email text here...",
      placeholderUrl: "Paste suspicious payment URL, apk download link, or shortened link (e.g. https://...)...",
      dragDropImage: "Drop suspicious screenshot here or click to browse (PNG, JPG up to 5MB)",
      dragDropQR: "Drop payment QR code or scam sticker image (we decode locally using jsQR)",
      analyzeBtn: "Run Forensic Analysis",
      analyzingBtn: "Analyzing Evidence...",
      shortcuts: "Press Ctrl + Enter to analyze",
      samplesLabel: "OR LOAD A KNOWN EVIDENCE SAMPLE:",
      charCount: "characters",
    },
    scanningStates: [
      "Reading the message syntax...",
      "Inspecting domain heuristics & TLDs...",
      "Spotting urgency & psychological coercion tactics...",
      "Matching against national cybercrime database...",
      "Generating forensic dossier & action protocol...",
    ],
    verdicts: {
      safe: "SAFE // NO IMMEDIATE THREAT",
      suspicious: "SUSPICIOUS // PROCEED WITH CAUTION",
      dangerous: "DANGEROUS // CONFIRMED SCAM PATTERN",
    },
    report: {
      caseNumber: "CASE FILE",
      riskScore: "THREAT INDEX",
      confidence: "AI CONFIDENCE",
      scamFamily: "SCAM FAMILY CLASSIFICATION",
      evidenceHeading: "Scanned Evidence & Marker Annotations",
      evidenceSub: "Hover or tap highlighted phrases to inspect forensic reasoning",
      redFlagsHeading: "Detected Red Flags & Threat Signals",
      explanationHeading: "Plain-Language Forensic Summary",
      actionsHeading: "What To Do Right Now (Emergency Protocol)",
      familyBtn: "Generate Family Warning Card",
      reportBtn: "Draft 1930 Cybercrime Complaint",
      downloadPdf: "Download Case PDF",
      scanAnother: "Open New Case",
    },
    familyModal: {
      title: "Emergency Warning Card for Family & Elders",
      warningHeader: "Amma / Nanna / Elder Alert: Do NOT click this message!",
      subtitle: "Plain-language card formatted for WhatsApp forward to protect vulnerable relatives.",
      copyBtn: "Copy Text",
      downloadBtn: "Download Warning Card",
      whatsappBtn: "Share on WhatsApp",
      closeBtn: "Close Card",
    },
    complaintModal: {
      title: "Draft Cybercrime Complaint (National Portal 1930)",
      helplineNotice: "Immediate Financial Loss? Call 1930 within the Golden Hour (2 hours) to freeze stolen funds.",
      portalNotice: "Formal Complaint Portal: cybercrime.gov.in (National Cyber Crime Reporting Portal)",
      copyReportBtn: "Copy Formatted Complaint",
      downloadPdfBtn: "Export Official PDF",
      openPortalBtn: "Open cybercrime.gov.in",
      call1930Btn: "Call Helpline 1930",
      guideTitle: "Step-by-Step Filing Checklist",
    },
    footer: {
      helplineTitle: "National Cybercrime Helpline: 1930",
      helplineDesc: "Operating 24/7 across all Indian States & Union Territories. Managed by I4C, Ministry of Home Affairs.",
      disclaimer:
        "Forensic Disclaimer: CyberShield AI provides rapid heuristic and AI risk evaluation. Always verify banking actions through authorized official channels. Never share OTPs or download unverified APKs.",
    },
  },
  te: {
    appName: "సైబర్ షీల్డ్ AI",
    tagline: "మోసాలు మరియు సైబర్ నేరాల విశ్లేషణ డెస్క్",
    fraudDesk: "మోసాల పరిశోధన విభాగం",
    nav: {
      scan: "పరిశోధించండి",
      dashboard: "రిస్క్ నివేదిక",
      learn: "శిక్షణ ల్యాబ్",
      history: "కేస్ ఆర్కైవ్స్",
      about: "విధానం",
      helpline: "జాతీయ హెల్ప్‌లైన్: 1930",
    },
    hero: {
      badge: "క్రియాశీల పర్యవేక్షణ // ప్రాంతం: భారతదేశం",
      title: "అనుమానాస్పద సందేశం వచ్చిందా? ఇప్పుడే తనిఖీ చేయండి.",
      subtitle:
        "మీకు వచ్చిన అనుమానాస్పద SMS, వాట్సాప్ సందేశం, లింక్, స్క్రీన్‌షాట్ లేదా QR కోడ్‌ను ఇక్కడ పేస్ట్ చేయండి. క్షణాల్లో మోసాన్ని గుర్తించండి.",
      startBtn: "పరిశోధన ప్రారంభించండి",
      sampleBtn: "నమూనా పరిశీలించండి",
    },
    scanner: {
      title: "ఆధారాల స్వీకరణ టెర్మినల్",
      tabText: "సందేశం",
      tabLink: "లింక్ / URL",
      tabImage: "స్క్రీన్‌షాట్",
      tabQR: "QR కోడ్",
      placeholderText: "అనుమానాస్పద బ్యాంక్ SMS, ఉద్యోగ ఆఫర్, లేదా లాటరీ సందేశాన్ని ఇక్కడ పేస్ట్ చేయండి...",
      placeholderUrl: "అనుమానాస్పద చెల్లింపు లింక్ లేదా వెబ్‌సైట్ లింక్‌ను ఇక్కడ పేస్ట్ చేయండి...",
      dragDropImage: "స్క్రీన్‌షాట్‌ను ఇక్కడ వేయండి లేదా ఎంచుకోండి (గరిష్టంగా 5MB)",
      dragDropQR: "చెల్లింపు QR కోడ్ చిత్రాన్ని ఇక్కడ వేయండి",
      analyzeBtn: "ఫోరెన్సిక్ విశ్లేషణ ప్రారంభించు",
      analyzingBtn: "ఆధారాలను పరిశీలిస్తున్నాము...",
      shortcuts: "విశ్లేషించడానికి Ctrl + Enter నొక్కండి",
      samplesLabel: "లేదా తెలిసిన నమూనాను ఎంచుకోండి:",
      charCount: "అక్షరాలు",
    },
    scanningStates: [
      "సందేశం వాక్యాలను చదువుతున్నాము...",
      "వెబ్‌సైట్ డొమైన్లను తనిఖీ చేస్తున్నాము...",
      "భయపెట్టే లేదా ఒత్తిడి తెచ్చే పదాలను గుర్తిస్తున్నాము...",
      "తెలిసిన సైబర్ క్రైమ్ రికార్డులతో సరిపోల్చుతున్నాము...",
      "రక్షణ నివేదికను తయారుచేస్తున్నాము...",
    ],
    verdicts: {
      safe: "సురక్షితం // ఎటువంటి ప్రమాదం లేదు",
      suspicious: "అనుమానాస్పదం // జాగ్రత్తగా ఉండండి",
      dangerous: "ప్రమాదకరం // నిర్ధారిత మోసం",
    },
    report: {
      caseNumber: "కేస్ ఫైల్",
      riskScore: "ప్రమాద స్థాయి",
      confidence: "ఖచ్చితత్వం",
      scamFamily: "మోసం వర్గం",
      evidenceHeading: "పరిశీలించిన ఆధారాలు & హెచ్చరికలు",
      evidenceSub: "కారణం చూడటానికి హైలైట్ చేసిన పదాలపై తాకండి",
      redFlagsHeading: "గుర్తించిన ప్రమాద సంకేతాలు",
      explanationHeading: "సరళమైన భాషలో వివరణ",
      actionsHeading: "వెంటనే మీరు చేయవలసిన పనులు",
      familyBtn: "కుటుంబ సభ్యులకు హెచ్చరిక కార్డు",
      reportBtn: "1930 సైబర్ క్రైమ్ ఫిర్యాదు పత్రం",
      downloadPdf: "కేస్ PDF డౌన్‌లోడ్",
      scanAnother: "కొత్త కేస్ నమోదు",
    },
    familyModal: {
      title: "కుటుంబ సభ్యుల కోసం హెచ్చరిక కార్డు",
      warningHeader: "అమ్మా / నాన్న / కుటుంబ సభ్యులకు గమనిక: ఈ లింక్ క్లిక్ చేయకండి!",
      subtitle: "వాట్సాప్‌లో పంపడానికి వీలుగా సరళమైన తెలుగులో రూపొందించిన హెచ్చరిక.",
      copyBtn: "కాపీ చేయండి",
      downloadBtn: "కార్డు డౌన్‌లోడ్",
      whatsappBtn: "వాట్సాప్‌లో పంపండి",
      closeBtn: "మూసివేయండి",
    },
    complaintModal: {
      title: "సైబర్ క్రైమ్ ఫిర్యాదు వివరాలు (1930)",
      helplineNotice: "ఆర్థిక నష్టం జరిగితే వెంటనే 2 గంటల్లో 1930 కు కాల్ చేయండి.",
      portalNotice: "అధికారిక వెబ్‌సైట్: cybercrime.gov.in",
      copyReportBtn: "ఫిర్యాదు కాపీ చేయండి",
      downloadPdfBtn: "అధికారిక PDF డౌన్‌లోడ్",
      openPortalBtn: "cybercrime.gov.in కి వెళ్లండి",
      call1930Btn: "1930 కి కాల్ చేయండి",
      guideTitle: "ఫిర్యాదు చేసే విధానం",
    },
    footer: {
      helplineTitle: "జాతీయ సైబర్ క్రైమ్ హెల్ప్‌లైన్: 1930",
      helplineDesc: "భారత ప్రభుత్వ హోం వ్యవహారాల మంత్రిత్వ శాఖ (I4C) ఆధ్వర్యంలో 24 గంటలూ అందుబాటులో ఉంటుంది.",
      disclaimer: "గమనిక: ఇది AI ద్వారా అందించబడిన విశ్లేషణ. ఎట్టి పరిస్థితుల్లోనూ OTP లేదా బ్యాంక్ వివరాలు ఎవరితోనూ పంచుకోవద్దు.",
    },
  },
  hi: {
    appName: "साइबर शील्ड AI",
    tagline: "फोरेंसिक स्कैम एवं साइबर अपराध सुरक्षा डेस्क",
    fraudDesk: "धोखाधड़ी जांच डेस्क",
    nav: {
      scan: "जांच करें",
      dashboard: "खतरा विश्लेषण",
      learn: "प्रशिक्षण लैब",
      history: "केस आर्काइव",
      about: "कार्यप्रणाली",
      helpline: "राष्ट्रीय हेल्पलाइन: 1930",
    },
    hero: {
      badge: "सक्रिय निगरानी // क्षेत्र: भारत",
      title: "कोई संदिग्ध संदेश मिला? आइए जांच करें।",
      subtitle:
        "संदिग्ध एसएमएस, व्हाट्सएप संदेश, पेमेंट लिंक, स्क्रीनशॉट या क्यूआर कोड यहां पेस्ट करें। हमारा इंजन तुरंत जोखिम और धोखाधड़ी पैटर्न की पहचान करता है।",
      startBtn: "जांच शुरू करें",
      sampleBtn: "नमूना देखें",
    },
    scanner: {
      title: "साक्ष्य इनपुट टर्मिनल",
      tabText: "संदेश",
      tabLink: "लिंक / URL",
      tabImage: "स्क्रीनशॉट",
      tabQR: "क्यूआर कोड",
      placeholderText: "संदिग्ध बैंक एसएमएस, जॉब ऑफर, या लॉटरी संदेश यहां पेस्ट करें...",
      placeholderUrl: "संदिग्ध भुगतान लिंक या वेबसाइट लिंक यहां पेस्ट करें...",
      dragDropImage: "स्क्रीनशॉट यहां खींचें या फ़ाइल चुनें (अधिकतम 5MB)",
      dragDropQR: "पेमेंट क्यूआर कोड की फोटो यहां अपलोड करें",
      analyzeBtn: "फोरेंसिक जांच शुरू करें",
      analyzingBtn: "साक्ष्यों की जांच जारी है...",
      shortcuts: "विश्लेषण के लिए Ctrl + Enter दबाएं",
      samplesLabel: "या पहले से मौजूद उदाहरण चुनें:",
      charCount: "अक्षर",
    },
    scanningStates: [
      "संदेश के शब्दों की जांच हो रही है...",
      "डोमेन और वेब लिंक का परीक्षण चल रहा है...",
      "दबाव और डराने वाली तकनीकों की पहचान हो रही है...",
      "राष्ट्रीय साइबर अपराध पैटर्न से मिलान किया जा रहा है...",
      "सुरक्षा रिपोर्ट तैयार की जा रही है...",
    ],
    verdicts: {
      safe: "सुरक्षित // कोई तत्काल खतरा नहीं",
      suspicious: "संदिग्ध // सावधानी बरतें",
      dangerous: "खतरनाक // पुष्टि की गई धोखाधड़ी",
    },
    report: {
      caseNumber: "केस फ़ाइल",
      riskScore: "खतरा सूचकांक",
      confidence: "सटीकता दर",
      scamFamily: "स्कैम श्रेणी",
      evidenceHeading: "साक्ष्य और चिह्नित लाल झंडे",
      evidenceSub: "विस्तृत कारण देखने के लिए हाइलाइट किए गए शब्दों पर क्लिक करें",
      redFlagsHeading: "पहचाने गए खतरे के संकेत",
      explanationHeading: "सरल भाषा में विश्लेषण",
      actionsHeading: "तुरंत क्या करें (सुरक्षा निर्देश)",
      familyBtn: "परिवार के लिए चेतावनी कार्ड",
      reportBtn: "1930 साइबर अपराध शिकायत तैयार करें",
      downloadPdf: "केस PDF डाउनलोड करें",
      scanAnother: "नई जांच शुरू करें",
    },
    familyModal: {
      title: "परिवार और बुजुर्गों के लिए चेतावनी कार्ड",
      warningHeader: "चेतावनी: इस लिंक पर क्लिक न करें, यह एक धोखा है!",
      subtitle: "व्हाट्सएप पर परिवार को तुरंत सावधान करने के लिए सरल हिंदी में तैयार कार्ड।",
      copyBtn: "संदेश कॉपी करें",
      downloadBtn: "कार्ड डाउनलोड करें",
      whatsappBtn: "व्हाट्सएप पर भेजें",
      closeBtn: "बंद करें",
    },
    complaintModal: {
      title: "साइबर अपराध शिकायत प्रारूप (हेल्पलाइन 1930)",
      helplineNotice: "वित्तीय नुकसान हुआ है? चोरी हुए पैसे को फ्रीज कराने के लिए 2 घंटे के भीतर 1930 पर कॉल करें।",
      portalNotice: "आधिकारिक शिकायत पोर्टल: cybercrime.gov.in",
      copyReportBtn: "शिकायत कॉपी करें",
      downloadPdfBtn: "आधिकारिक PDF डाउनलोड करें",
      openPortalBtn: "cybercrime.gov.in खोलें",
      call1930Btn: "1930 पर कॉल करें",
      guideTitle: "शिकायत दर्ज करने के मुख्य चरण",
    },
    footer: {
      helplineTitle: "राष्ट्रीय साइबर अपराध हेल्पलाइन: 1930",
      helplineDesc: "गृह मंत्रालय (I4C), भारत सरकार द्वारा 24 घंटे संचालित।",
      disclaimer: "अस्वीकरण: यह प्रणाली AI और हेयुरिस्टिक्स पर आधारित है। कभी भी किसी के साथ ओटीपी या बैंक पासवर्ड साझा न करें।",
    },
  },
};
