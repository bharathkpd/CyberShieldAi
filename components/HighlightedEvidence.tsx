"use client";

import React, { useState } from "react";
import { RedFlag } from "@/types";
import { Info, AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";

interface HighlightedEvidenceProps {
  rawText: string;
  redFlags: RedFlag[];
}

interface SpanMatch {
  start: number;
  end: number;
  flag: RedFlag;
}

export const HighlightedEvidence: React.FC<HighlightedEvidenceProps> = ({
  rawText,
  redFlags,
}) => {
  const [activeTooltip, setActiveTooltip] = useState<RedFlag | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // 1. Locate non-overlapping matches in rawText
  const matches: SpanMatch[] = [];

  for (const flag of redFlags) {
    if (!flag.phrase || flag.phrase.trim() === "") continue;

    // Search case-insensitive
    const lowerInput = rawText.toLowerCase();
    const lowerPhrase = flag.phrase.toLowerCase();
    let searchStart = 0;

    while (searchStart < lowerInput.length) {
      const idx = lowerInput.indexOf(lowerPhrase, searchStart);
      if (idx === -1) break;

      const end = idx + flag.phrase.length;
      // Check collision with existing matches
      const hasCollision = matches.some(
        (m) => (idx >= m.start && idx < m.end) || (end > m.start && end <= m.end)
      );

      if (!hasCollision) {
        matches.push({ start: idx, end, flag });
        break; // Record first non-overlapping match for this flag
      }
      searchStart = idx + 1;
    }
  }

  // Sort by start index
  matches.sort((a, b) => a.start - b.start);

  // 2. Build segments
  const segments: React.ReactNode[] = [];
  let lastIndex = 0;

  matches.forEach((m, i) => {
    // Normal preceding text
    if (m.start > lastIndex) {
      segments.push(
        <span key={`text-${i}`}>{rawText.slice(lastIndex, m.start)}</span>
      );
    }

    const matchedSubstring = rawText.slice(m.start, m.end);
    const isDanger = m.flag.severity === "danger";
    const isSuspicious = m.flag.severity === "suspicious";

    const highlightClass = isDanger
      ? "bg-accent-red/25 border-b-2 border-accent-red font-bold text-ink cursor-pointer hover:bg-accent-red/35"
      : isSuspicious
      ? "bg-accent-amber/30 border-b-2 border-accent-amber font-bold text-ink cursor-pointer hover:bg-accent-amber/40"
      : "bg-accent-green/25 border-b-2 border-accent-green font-bold text-ink cursor-pointer hover:bg-accent-green/35";

    segments.push(
      <mark
        key={`flag-${i}`}
        onClick={(e) => {
          e.stopPropagation();
          setActiveTooltip(activeTooltip?.phrase === m.flag.phrase ? null : m.flag);
        }}
        onMouseEnter={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setTooltipPos({ x: rect.left, y: rect.bottom + window.scrollY });
          setActiveTooltip(m.flag);
        }}
        onMouseLeave={() => {
          // On non-touch screens allow hover leave
          if (window.matchMedia("(hover: hover)").matches) {
            setActiveTooltip(null);
          }
        }}
        className={`px-1 py-0.5 rounded-none transition-colors relative inline [box-decoration-break:clone] [-webkit-box-decoration-break:clone] break-words cursor-pointer ${highlightClass}`}
      >
        {matchedSubstring}
      </mark>
    );

    lastIndex = m.end;
  });

  // Remaining trailing text
  if (lastIndex < rawText.length) {
    segments.push(
      <span key="text-end">{rawText.slice(lastIndex)}</span>
    );
  }

  return (
    <div className="relative">
      <div className="p-4 md:p-6 border-2 border-line ruled-paper font-mono text-13 sm:text-14 text-ink leading-loose whitespace-pre-wrap break-words [overflow-wrap:anywhere] rounded-none shadow-hard-sm">
        {segments.length > 0 ? segments : rawText}
      </div>

      {/* Floating Tooltip */}
      {activeTooltip && (
        <div className="mt-3 p-3.5 border-2 border-line bg-card shadow-hard max-w-md animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between gap-2 mb-1.5 border-b border-divider pb-1">
            <span className="font-mono text-12 font-bold uppercase flex items-center gap-1.5">
              {activeTooltip.severity === "danger" && (
                <AlertCircle className="w-4 h-4 text-accent-red shrink-0" />
              )}
              {activeTooltip.severity === "suspicious" && (
                <AlertTriangle className="w-4 h-4 text-accent-amber shrink-0" />
              )}
              {activeTooltip.severity === "safe" && (
                <CheckCircle className="w-4 h-4 text-accent-green shrink-0" />
              )}
              <span
                className={
                  activeTooltip.severity === "danger"
                    ? "text-accent-red font-bold"
                    : activeTooltip.severity === "suspicious"
                    ? "text-accent-amber font-bold"
                    : "text-accent-green font-bold"
                }
              >
                FORENSIC FLAG // {activeTooltip.severity}
              </span>
            </span>
            <button
              onClick={() => setActiveTooltip(null)}
              className="text-ink-soft hover:text-ink font-mono text-12 px-1 border border-line bg-paper-2"
              aria-label="Close tooltip"
            >
              ✕
            </button>
          </div>

          <p className="font-sans text-14 text-ink mb-1 font-semibold leading-snug">
            "{activeTooltip.phrase}"
          </p>
          <p className="font-sans text-12 text-ink-soft leading-relaxed m-0">
            {activeTooltip.reason}
          </p>
        </div>
      )}
    </div>
  );
};
