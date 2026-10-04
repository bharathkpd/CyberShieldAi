"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import jsQR from "jsqr";
import {
  MessageSquare,
  Link2,
  Image as ImageIcon,
  QrCode,
  Upload,
  X,
  Sparkles,
  CornerDownLeft,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { ScanInputType, LanguageCode, AnalysisResult } from "@/types";
import { translations } from "@/lib/i18n";
import { SAMPLE_SCAMS, SampleCase } from "@/lib/sampleScams";
import { useToast } from "./Toast";

interface ScannerProps {
  language: LanguageCode;
  onAnalyze: (type: ScanInputType, content: string) => Promise<void>;
  isLoading: boolean;
  onSampleSelect?: (sample: SampleCase) => void;
}

export const Scanner: React.FC<ScannerProps> = ({
  language,
  onAnalyze,
  isLoading,
  onSampleSelect,
}) => {
  const t = translations[language] || translations.en;
  const { error: toastError, toast } = useToast();

  const [activeTab, setActiveTab] = useState<ScanInputType>("text");
  const [textContent, setTextContent] = useState("");
  const [urlContent, setUrlContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [qrDecodedText, setQrDecodedText] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const tabs: { id: ScanInputType; shortLabel: string; label: string; icon: React.ReactNode }[] = [
    { id: "text", shortLabel: "Message", label: t.scanner.tabText, icon: <MessageSquare className="w-4 h-4 shrink-0" /> },
    { id: "url", shortLabel: "Link", label: t.scanner.tabLink, icon: <Link2 className="w-4 h-4 shrink-0" /> },
    { id: "image", shortLabel: "Screenshot", label: t.scanner.tabImage, icon: <ImageIcon className="w-4 h-4 shrink-0" /> },
    { id: "qr", shortLabel: "QR / UPI", label: t.scanner.tabQR, icon: <QrCode className="w-4 h-4 shrink-0" /> },
  ];

  // Keyboard shortcut: Ctrl + Enter / Cmd + Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleSubmit = async () => {
    if (isLoading) return;

    if (activeTab === "text") {
      if (!textContent.trim()) {
        toastError("Empty Input", "Please paste or type a suspicious message to analyze.");
        textareaRef.current?.focus();
        return;
      }
      await onAnalyze("text", textContent.trim());
    } else if (activeTab === "url") {
      if (!urlContent.trim()) {
        toastError("Empty URL", "Please enter a suspicious link or website domain.");
        return;
      }
      await onAnalyze("url", urlContent.trim());
    } else if (activeTab === "image") {
      if (!imagePreview) {
        toastError("No Image Attached", "Please upload or drop a screenshot of the suspicious message.");
        return;
      }
      await onAnalyze("image", imagePreview);
    } else if (activeTab === "qr") {
      if (!qrDecodedText && !imagePreview) {
        toastError("No QR Code", "Please upload a QR code image to decode and analyze.");
        return;
      }
      const targetContent = qrDecodedText || imagePreview || "";
      await onAnalyze("qr", targetContent);
    }
  };

  const handleFileProcess = useCallback(
    (file: File, isQRMode: boolean) => {
      if (!file.type.startsWith("image/")) {
        toastError("Unsupported File", "Please upload an image file (PNG, JPG, WEBP).");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toastError("File Too Large", "Maximum image size allowed is 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);

        if (isQRMode) {
          // Decode QR client-side using jsQR
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            if (ctx) {
              ctx.drawImage(img, 0, 0);
              const imgData = ctx.getImageData(0, 0, img.width, img.height);
              const code = jsQR(imgData.data, imgData.width, imgData.height);
              if (code && code.data) {
                setQrDecodedText(code.data);
                toast("QR Code Decoded", code.data, "info");
              } else {
                setQrDecodedText(null);
                toast(
                  "QR Detection",
                  "No standard QR pattern recognized. Our vision engine will inspect it directly.",
                  "warning"
                );
              }
            }
          };
          img.src = result;
        }
      };
      reader.readAsDataURL(file);
    },
    [toast, toastError]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0], activeTab === "qr");
    }
  };

  const loadSample = (sample: SampleCase) => {
    if (sample.type === "url") {
      setActiveTab("url");
      setUrlContent(sample.content);
    } else {
      setActiveTab("text");
      setTextContent(sample.content);
    }

    if (onSampleSelect) {
      onSampleSelect(sample);
    }

    // Auto-run analysis for instant hackathon demonstration
    setTimeout(() => {
      onAnalyze(sample.type, sample.content);
    }, 150);
  };

  return (
    <div id="scanner-intake" className="case-card bg-card border-2 border-line shadow-hard p-4 sm:p-6 md:p-8 relative">
      {/* Evidence Intake Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-line pb-3 sm:pb-4 mb-4 sm:mb-6 gap-2 sm:gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-accent-red shrink-0" />
          <h2 className="font-serif text-20 sm:text-26 md:text-32 font-bold text-ink m-0">
            {t.scanner.title}
          </h2>
        </div>
        <div className="font-mono text-11 sm:text-12 text-ink-soft flex items-center gap-2 sm:gap-3">
          <span className="hidden md:inline">SECURITY LEVEL: RESTRICTED</span>
          <span className="border border-line px-1.5 sm:px-2 py-0.5 bg-paper font-bold">
            CASE FILE INTAKE
          </span>
        </div>
      </div>

      {/* Tabs with sliding underline indicator */}
      <div className="flex border-b-2 border-divider relative mb-4 sm:mb-6 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[70px] sm:min-w-0 py-2.5 sm:py-3 px-1.5 sm:px-3 flex items-center justify-center gap-1.5 sm:gap-2 font-mono text-11 sm:text-13 md:text-14 font-bold transition-colors cursor-pointer relative shrink-0 sm:shrink ${
                isActive ? "text-accent-red" : "text-ink-soft hover:text-ink"
              }`}
            >
              <span>{tab.icon}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
              <span className="hidden sm:inline truncate">{tab.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-[-2px] left-0 right-0 h-[3px] bg-accent-red"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="mb-5 sm:mb-6">
        {activeTab === "text" && (
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={textContent}
              onChange={(e) => setTextContent(e.target.value.slice(0, 5000))}
              placeholder={t.scanner.placeholderText}
              rows={5}
              className="w-full p-3 sm:p-4 border-2 border-line font-mono text-13 sm:text-14 text-ink ruled-paper focus:border-accent-red focus-visible:outline-none resize-y min-h-[140px] sm:min-h-[160px]"
            />
            <div className="flex justify-between items-center mt-2 font-mono text-11 sm:text-12 text-ink-soft">
              <span className="hidden sm:inline">{t.scanner.shortcuts}</span>
              <span className={textContent.length >= 4800 ? "text-accent-red font-bold ml-auto" : "ml-auto sm:ml-0"}>
                {textContent.length} / 5000 {t.scanner.charCount}
              </span>
            </div>
          </div>
        )}

        {activeTab === "url" && (
          <div className="space-y-3">
            <div className="flex border-2 border-line bg-card">
              <span className="px-4 py-3 bg-paper-2 border-r-2 border-line font-mono text-14 text-ink-soft font-bold flex items-center">
                HTTP://
              </span>
              <input
                type="text"
                value={urlContent}
                onChange={(e) => setUrlContent(e.target.value)}
                placeholder={t.scanner.placeholderUrl}
                className="w-full px-4 py-3 font-mono text-14 text-ink bg-transparent focus-visible:outline-none"
              />
            </div>
            <p className="font-sans text-12 text-ink-soft">
              Tests domain typosquatting, brand spoofing (SBI, Amazon, IndiaPost), disposable TLDs (.xyz, .top, .live), and credential-harvesting parameters.
            </p>
          </div>
        )}

        {(activeTab === "image" || activeTab === "qr") && (
          <div>
            {!imagePreview ? (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-3 border-dashed p-8 md:p-12 text-center cursor-pointer transition-colors ${
                  isDragging
                    ? "border-accent-red bg-accent-red/5"
                    : "border-divider hover:border-ink bg-paper-2"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileProcess(e.target.files[0], activeTab === "qr");
                    }
                  }}
                  className="hidden"
                />
                <Upload className="w-10 h-10 mx-auto mb-3 text-ink-soft stroke-[1.5]" />
                <p className="font-serif font-bold text-18 text-ink mb-1">
                  {activeTab === "qr" ? t.scanner.dragDropQR : t.scanner.dragDropImage}
                </p>
                <p className="font-mono text-12 text-ink-soft">
                  PNG, JPG, WEBP (Max 5MB)
                </p>
              </div>
            ) : (
              <div className="p-4 border-2 border-line bg-paper-2 relative">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Uploaded evidence screenshot"
                    className="max-h-52 max-w-full md:max-w-xs object-contain border-2 border-line bg-card shadow-hard-sm"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-12 font-bold text-accent-green flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4" />
                        EVIDENCE IMAGE ATTACHED
                      </span>
                      <button
                        onClick={() => {
                          setImagePreview(null);
                          setQrDecodedText(null);
                        }}
                        className="btn-case text-12 py-1 px-2.5 text-accent-red hover:bg-accent-red hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>

                    {activeTab === "qr" && qrDecodedText && (
                      <div className="p-3 border-2 border-line bg-card font-mono text-12">
                        <span className="font-bold text-ink-soft block mb-1">
                          CLIENT-SIDE jsQR DECODE OUTPUT:
                        </span>
                        <div className="break-all text-accent-red font-bold">
                          {qrDecodedText}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Primary Action Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 pt-4 border-t-2 border-divider">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="btn-case btn-case-primary text-15 sm:text-16 py-3.5 px-8 font-bold shadow-hard w-full sm:w-auto text-center justify-center"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {t.scanner.analyzingBtn}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span>{t.scanner.analyzeBtn}</span>
              <CornerDownLeft className="w-4 h-4 stroke-[2.5]" />
            </span>
          )}
        </button>

        <span className="font-mono text-11 sm:text-12 text-ink-soft hidden md:inline-block">
          {t.scanner.shortcuts}
        </span>
      </div>

      {/* Sample Chips Section */}
      <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t-2 border-divider">
        <div className="font-mono text-11 sm:text-12 font-bold tracking-wider text-ink-soft uppercase mb-3 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-accent-red shrink-0" />
          <span>{t.scanner.samplesLabel}</span>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-2.5">
          {SAMPLE_SCAMS.map((sample) => {
            const isDanger = sample.expectedVerdict === "DANGEROUS";
            return (
              <button
                key={sample.id}
                onClick={() => loadSample(sample)}
                disabled={isLoading}
                className="btn-case text-11 sm:text-12 py-2 px-2.5 sm:px-3 bg-paper-2 hover:bg-card flex items-center justify-start gap-2 text-ink text-left w-full sm:w-auto"
              >
                <span
                  className={`w-2 h-2 shrink-0 ${
                    isDanger ? "bg-accent-red" : "bg-accent-green"
                  }`}
                />
                <span className="font-bold truncate">{sample.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
