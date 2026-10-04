"use client";

import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { X, Download, Share2, Copy, AlertTriangle, PhoneCall, ShieldAlert } from "lucide-react";
import { AnalysisResult, LanguageCode } from "@/types";
import { useToast } from "./Toast";

interface FamilyCardProps {
  isOpen: boolean;
  onClose: () => void;
  scanResult: AnalysisResult;
  initialLanguage: LanguageCode;
}

export const FamilyCard: React.FC<FamilyCardProps> = ({
  isOpen,
  onClose,
  scanResult,
  initialLanguage,
}) => {
  const [cardLang, setCardLang] = useState<LanguageCode>(initialLanguage);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const { success, error } = useToast();

  if (!isOpen) return null;

  const topReasons = scanResult.redFlags.slice(0, 2);

  const warningMessages: Record<LanguageCode, { header: string; advice: string; helplineText: string }> = {
    en: {
      header: "AMMA / NANNA / FAMILY ALERT: DO NOT CLICK THIS!",
      advice: "This message was analyzed by CyberShield AI and confirmed as a dangerous scam attempt. Never share OTPs, click links, or send UPI money.",
      helplineText: "If money was deducted, immediately dial Police Helpline 1930 within 2 hours.",
    },
    te: {
      header: "అమ్మా / నాన్న / కుటుంబ సభ్యులకు హెచ్చరిక: ఇది మోసం!",
      advice: "ఈ సందేశాన్ని సైబర్ షీల్డ్ AI ప్రమాదకరమైన మోసంగా గుర్తించింది. ఎట్టి పరిస్థితుల్లోనూ OTP లేదా ఆధార్/పాన్ వివరాలు ఇవ్వకండి, లింకులు క్లిక్ చేయకండి.",
      helplineText: "డబ్బులు కట్ అయితే వెంటనే జాతీయ సైబర్ క్రైమ్ హెల్ప్‌లైన్ 1930 కు కాల్ చేయండి.",
    },
    hi: {
      header: "परिवार और बुजुर्गों के लिए चेतावनी: यह एक धोखा है!",
      advice: "साइबर शील्ड AI द्वारा इस संदेश की जांच की गई है और यह एक खतरनाक स्कैम है। कभी भी किसी को ओटीपी न दें और न ही लिंक पर क्लिक करें।",
      helplineText: "यदि कोई पैसा कट गया है, तो 2 घंटे के भीतर राष्ट्रीय साइबर हेल्पलाइन 1930 पर कॉल करें।",
    },
  };

  const currentMsg = warningMessages[cardLang] || warningMessages.en;

  const generateShareText = () => {
    return `⚠️ *${currentMsg.header}*\n\nScam Type: ${scanResult.category}\n\n*Why it's fake:*\n${topReasons
      .map((r, i) => `${i + 1}. ${r.reason}`)
      .join("\n")}\n\n*Emergency Helpline:* 1930\n*Official Reporting:* https://cybercrime.gov.in\n\nVerified via CyberShield AI Desk.`;
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(generateShareText());
      success("Warning Text Copied", "Ready to paste into family WhatsApp group.");
    } catch {
      error("Copy Failed", "Please manually copy the text.");
    }
  };

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        quality: 0.95,
        backgroundColor: "#F5F0E6",
      });
      const link = document.createElement("a");
      link.download = `cybershield-family-warning-${scanResult.id}.png`;
      link.href = dataUrl;
      link.click();
      success("Image Saved", "Family warning card downloaded as PNG.");
    } catch (err) {
      console.error(err);
      error("Export Failed", "Could not export image. You can copy the text instead.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(generateShareText());
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/50 backdrop-blur-none">
      <div className="bg-paper border-2 border-line shadow-hard max-w-lg w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-line pb-3 mb-4">
          <div>
            <span className="font-mono text-12 font-bold uppercase text-accent-red">
              FAMILY DEFENSE PROTOCOL
            </span>
            <h3 className="font-serif text-20 font-bold text-ink">
              One-Tap Warning Card for Relatives
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 border border-line bg-card hover:bg-paper-2 cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language selector for card */}
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-12 text-ink-soft font-semibold">Language:</span>
          {(["en", "te", "hi"] as LanguageCode[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setCardLang(lang)}
              className={`px-2.5 py-1 font-mono text-12 font-bold border-2 cursor-pointer ${
                cardLang === lang
                  ? "bg-accent-red text-white border-line"
                  : "bg-card text-ink border-divider hover:border-ink"
              }`}
            >
              {lang === "en" ? "English" : lang === "te" ? "తెలుగు" : "हिन्दी"}
            </button>
          ))}
        </div>

        {/* The Printable / Downloadable Card */}
        <div
          ref={cardRef}
          className="border-3 border-accent-red bg-card p-6 shadow-hard-sm mb-6 relative"
        >
          {/* Emergency Warning Header */}
          <div className="flex items-center gap-3 border-b-2 border-accent-red pb-3 mb-4">
            <div className="w-10 h-10 bg-accent-red text-white flex items-center justify-center font-bold shrink-0">
              <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="font-mono text-12 font-bold uppercase text-accent-red tracking-wider">
                CYBERSHIELD CRIME ALERT
              </div>
              <h4 className="font-serif text-16 md:text-18 font-extrabold text-ink leading-tight m-0">
                {currentMsg.header}
              </h4>
            </div>
          </div>

          {/* Advice */}
          <p className="font-sans text-14 text-ink font-semibold mb-4 leading-relaxed">
            {currentMsg.advice}
          </p>

          {/* Scam Category & Reasons */}
          <div className="bg-paper-2 border-2 border-line p-3 mb-4">
            <div className="font-mono text-12 font-bold text-accent-red uppercase mb-1">
              DETECTED THREAT: {scanResult.category}
            </div>
            <ul className="text-12 font-sans space-y-1 pl-4 list-disc text-ink m-0">
              {topReasons.map((r, i) => (
                <li key={i}>
                  <strong>{r.phrase}</strong>: {r.reason}
                </li>
              ))}
            </ul>
          </div>

          {/* Helpline Footer */}
          <div className="border-t-2 border-divider pt-3 flex items-center justify-between font-mono text-12">
            <div className="flex items-center gap-1.5 text-accent-red font-bold">
              <PhoneCall className="w-4 h-4" />
              <span>HELPLINE: 1930</span>
            </div>
            <span className="text-ink-soft">cybercrime.gov.in</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={handleDownloadImage}
            disabled={isExporting}
            className="btn-case text-12 py-2 px-3 flex items-center justify-center gap-1.5 bg-card"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG</span>
          </button>
          <button
            onClick={handleWhatsAppShare}
            className="btn-case text-12 py-2 px-3 flex items-center justify-center gap-1.5 bg-[#25D366] text-white hover:bg-[#1EBE5D] border-line font-bold"
          >
            <Share2 className="w-4 h-4" />
            <span>WhatsApp Share</span>
          </button>
          <button
            onClick={handleCopyText}
            className="btn-case text-12 py-2 px-3 flex items-center justify-center gap-1.5 bg-card"
          >
            <Copy className="w-4 h-4" />
            <span>Copy Text</span>
          </button>
        </div>
      </div>
    </div>
  );
};
