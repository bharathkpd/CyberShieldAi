"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShieldAlert, Cpu } from "lucide-react";
import { LanguageCode } from "@/types";
import { translations } from "@/lib/i18n";

interface ScanAnimationProps {
  language: LanguageCode;
}

export const ScanAnimation: React.FC<ScanAnimationProps> = ({ language }) => {
  const t = translations[language] || translations.en;
  const statusList = t.scanningStates;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % statusList.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [statusList.length]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="case-card p-8 bg-card border-2 border-line shadow-hard relative overflow-hidden my-8"
    >
      {/* Red Marker Line sweeping down over the paper */}
      <motion.div
        animate={{ y: [0, 240, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-1.5 bg-accent-red shadow-[0_0_12px_rgba(214,40,40,0.8)] z-20 pointer-events-none opacity-85"
      />

      {/* Forensic Scanning Header */}
      <div className="flex items-center justify-between border-b-2 border-divider pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-3.5 h-3.5 bg-accent-red animate-ping" />
          <span className="font-mono text-12 font-bold tracking-widest text-ink uppercase">
            FORENSIC OPTICAL DISSECTION IN PROGRESS
          </span>
        </div>
        <span className="font-mono text-12 text-ink-soft font-bold">
          CORE: CLAUDE 3.5 + HEURISTICS ENGINE
        </span>
      </div>

      {/* Cycling Status Text */}
      <div className="min-h-[48px] flex items-center justify-center py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-3 text-center"
          >
            <Search className="w-5 h-5 text-accent-red animate-spin" />
            <span className="font-serif text-20 md:text-24 font-bold text-ink">
              {statusList[currentIndex]}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Ruled Skeleton Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t-2 border-divider">
        <div className="p-4 border-2 border-divider bg-paper-2 animate-pulse space-y-2.5">
          <div className="h-4 bg-ink/15 w-2/3" />
          <div className="h-3 bg-ink/10 w-full" />
          <div className="h-3 bg-ink/10 w-4/5" />
        </div>
        <div className="p-4 border-2 border-divider bg-paper-2 animate-pulse space-y-2.5">
          <div className="h-4 bg-accent-red/20 w-1/2" />
          <div className="h-3 bg-ink/10 w-full" />
          <div className="h-3 bg-ink/10 w-3/4" />
        </div>
        <div className="p-4 border-2 border-divider bg-paper-2 animate-pulse space-y-2.5">
          <div className="h-4 bg-ink/15 w-3/5" />
          <div className="h-3 bg-ink/10 w-full" />
          <div className="h-3 bg-ink/10 w-2/3" />
        </div>
      </div>
    </div>
  );
};
