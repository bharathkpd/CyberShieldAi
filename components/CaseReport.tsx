"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Clock,
  ShieldAlert,
  Share2,
  Download,
  Copy,
  RotateCcw,
  Sparkles,
  PhoneCall,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { AnalysisResult, LanguageCode } from "@/types";
import { translations } from "@/lib/i18n";
import { StampVerdict } from "./StampVerdict";
import { InkGauge } from "./InkGauge";
import { HighlightedEvidence } from "./HighlightedEvidence";
import { FlagCard } from "./FlagCard";
import { Checklist } from "./Checklist";
import { FamilyCard } from "./FamilyCard";
import { ReportHelper } from "./ReportHelper";
import { useToast } from "./Toast";

interface CaseReportProps {
  result: AnalysisResult;
  language: LanguageCode;
  onReset: () => void;
}

export const CaseReport: React.FC<CaseReportProps> = ({
  result,
  language,
  onReset,
}) => {
  const t = translations[language] || translations.en;
  const { success, error } = useToast();

  const [familyModalOpen, setFamilyModalOpen] = useState(false);
  const [complaintModalOpen, setComplaintModalOpen] = useState(false);

  // Typewriter effect state for explanation
  const [displayedExplanation, setDisplayedExplanation] = useState("");
  const targetExplanation =
    result.translatedExplanation?.[language] || result.explanation;

  useEffect(() => {
    setDisplayedExplanation("");
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < targetExplanation.length) {
        setDisplayedExplanation(targetExplanation.slice(0, currentIdx + 2));
        currentIdx += 2;
      } else {
        setDisplayedExplanation(targetExplanation);
        clearInterval(interval);
      }
    }, 12);

    return () => clearInterval(interval);
  }, [targetExplanation]);

  const copyFullReport = async () => {
    try {
      const summary = `CYBERSHIELD AI // FORENSIC REPORT ${result.id}
Verdict: ${result.verdict} (Threat Index: ${result.riskScore}/100)
Category: ${result.category}
Scam Family: ${result.scamFamily} (${result.matchPercent}% match)

Key Red Flags:
${result.redFlags.map((f) => `- [${f.severity.toUpperCase()}] ${f.phrase}: ${f.reason}`).join("\n")}

Explanation:
${targetExplanation}

Helpline: 1930 | Report online: https://cybercrime.gov.in`;

      await navigator.clipboard.writeText(summary);
      success("Report Copied", "Full forensic summary copied to clipboard.");
    } catch {
      error("Copy Error", "Failed to copy report.");
    }
  };

  return (
    <div id="case-report-dossier" className="case-card bg-card border-2 border-line shadow-hard p-4 sm:p-6 md:p-10 relative my-6 sm:my-10">
      {/* Dossier Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-line pb-3 sm:pb-4 mb-6 sm:mb-8 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-11 sm:text-12 font-bold px-2 py-0.5 bg-accent-red text-white uppercase shrink-0">
              {t.report.caseNumber} #{result.id}
            </span>
            <span className="font-mono text-11 sm:text-12 text-ink-soft uppercase font-semibold truncate">
              INPUT: {result.inputType.toUpperCase()}
            </span>
          </div>
          <h2 className="font-serif text-22 sm:text-28 md:text-36 font-extrabold text-ink m-0">
            Forensic Incident Dossier
          </h2>
        </div>

        <div className="flex items-center gap-2 font-mono text-11 sm:text-12 text-ink-soft">
          <Clock className="w-4 h-4 shrink-0" />
          <span>
            {new Date(result.timestamp).toLocaleDateString()} //{" "}
            {new Date(result.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      {/* Top Banner: Rubber Stamp + Ink Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center bg-paper-2 border-2 border-line p-4 sm:p-6 mb-6 sm:mb-8 shadow-hard-sm">
        {/* Rubber Stamp Left */}
        <div className="lg:col-span-5 flex justify-center py-1 sm:py-2">
          <StampVerdict verdict={result.verdict} riskScore={result.riskScore} />
        </div>

        {/* Ink Gauge Right */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <InkGauge score={result.riskScore} />
        </div>
      </div>

      {/* Metadata Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="p-3.5 sm:p-4 border-2 border-line bg-card shadow-hard-sm">
          <span className="font-mono text-11 sm:text-12 font-bold text-ink-soft uppercase block mb-1">
            THREAT CLASSIFICATION
          </span>
          <span className="font-serif text-16 sm:text-18 font-bold text-ink block leading-snug">
            {result.category}
          </span>
        </div>

        <div className="p-4 border-2 border-line bg-card shadow-hard-sm">
          <span className="font-mono text-12 font-bold text-ink-soft uppercase block mb-1">
            {t.report.scamFamily}
          </span>
          <span className="font-serif text-18 font-bold text-ink block leading-snug">
            {result.matchPercent}% match: {result.scamFamily}
          </span>
        </div>

        <div className="p-4 border-2 border-line bg-card shadow-hard-sm">
          <span className="font-mono text-12 font-bold text-ink-soft uppercase block mb-1">
            {t.report.confidence}
          </span>
          <span className="font-serif text-18 font-bold text-ink block leading-snug">
            {result.confidence}% Confidence Rating
          </span>
        </div>
      </div>

      {/* Evidence Panel with Marker Highlights */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1">
          <div>
            <h3 className="font-serif text-18 sm:text-20 font-bold text-ink m-0">
              {t.report.evidenceHeading}
            </h3>
            <span className="font-sans text-11 sm:text-12 text-ink-soft">
              {t.report.evidenceSub}
            </span>
          </div>
          <span className="font-mono text-11 sm:text-12 font-bold text-accent-red uppercase">
            {result.redFlags.length} RED FLAGS FLAGGED
          </span>
        </div>

        <HighlightedEvidence
          rawText={result.rawInput}
          redFlags={result.redFlags}
        />
      </div>

      {/* Red Flag Accordion Cards */}
      <div className="mb-6 sm:mb-8">
        <h3 className="font-serif text-18 sm:text-20 font-bold text-ink mb-3">
          {t.report.redFlagsHeading}
        </h3>
        <div>
          {result.redFlags.map((flag, idx) => (
            <FlagCard key={idx} flag={flag} index={idx} />
          ))}
        </div>
      </div>

      {/* Plain-Language Forensic Explanation with Typewriter Effect */}
      <div className="border-2 border-line bg-card p-4 sm:p-6 shadow-hard-sm mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2 font-mono text-11 sm:text-12 font-bold uppercase text-ink-soft">
          <Sparkles className="w-4 h-4 text-accent-red shrink-0" />
          <span>{t.report.explanationHeading}</span>
        </div>
        <p className="font-sans text-15 sm:text-17 md:text-18 text-ink leading-relaxed font-medium m-0 min-h-[48px]">
          {displayedExplanation}
          {displayedExplanation.length < targetExplanation.length && (
            <span className="inline-block w-2 h-4 bg-accent-red ml-1 animate-pulse" />
          )}
        </p>
      </div>

      {/* What To Do Now (Tickable Checklist) */}
      <div className="mb-6 sm:mb-8">
        <Checklist items={result.actions} />
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t-2 border-line">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={() => setFamilyModalOpen(true)}
            className="btn-case text-14 py-2.5 px-4 bg-paper-2 hover:bg-card flex items-center justify-center gap-2 font-bold w-full sm:w-auto"
          >
            <Share2 className="w-4 h-4 text-accent-red" />
            <span>{t.report.familyBtn}</span>
          </button>

          <button
            onClick={() => setComplaintModalOpen(true)}
            className="btn-case btn-case-primary text-14 py-2.5 px-4 flex items-center justify-center gap-2 font-bold w-full sm:w-auto"
          >
            <FileText className="w-4 h-4" />
            <span>{t.report.reportBtn}</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={copyFullReport}
            className="btn-case text-14 py-2.5 px-4 bg-card hover:bg-paper-2 flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Copy className="w-4 h-4" />
            <span>Copy Dossier</span>
          </button>

          <button
            onClick={onReset}
            className="btn-case text-14 py-2.5 px-4 bg-card hover:bg-paper-2 flex items-center justify-center gap-2 font-bold w-full sm:w-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.report.scanAnother}</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <FamilyCard
        isOpen={familyModalOpen}
        onClose={() => setFamilyModalOpen(false)}
        scanResult={result}
        initialLanguage={language}
      />

      <ReportHelper
        isOpen={complaintModalOpen}
        onClose={() => setComplaintModalOpen(false)}
        scanResult={result}
      />
    </div>
  );
};
