"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, FileSearch, Paperclip } from "lucide-react";

export const EvidenceCard: React.FC = () => {
  const [highlightStep, setHighlightStep] = useState(0);
  const [showStamp, setShowStamp] = useState(false);

  useEffect(() => {
    // Loop animation cycle:
    // Step 0: Clean card
    // Step 1: Highlight "BLOCKED within 12 hours"
    // Step 2: Highlight URL "http://sbi-pan-kyc.top/update"
    // Step 3: Highlight Phone "+91-9876543210"
    // Step 4: Slam stamp "DANGEROUS 92"
    // Reset after 7.5s

    const cycle = () => {
      setHighlightStep(0);
      setShowStamp(false);

      const t1 = setTimeout(() => setHighlightStep(1), 1200);
      const t2 = setTimeout(() => setHighlightStep(2), 2400);
      const t3 = setTimeout(() => setHighlightStep(3), 3600);
      const t4 = setTimeout(() => setShowStamp(true), 4500);

      const tReset = setTimeout(() => {
        cycle();
      }, 8000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(tReset);
      };
    };

    const cleanup = cycle();
    return () => cleanup && cleanup();
  }, []);

  return (
    <div className="relative w-full max-w-md sm:max-w-lg mx-auto select-none">
      {/* Paperclip top decoration */}
      <div className="absolute -top-3.5 left-6 sm:left-10 z-20 text-ink-soft">
        <Paperclip className="w-6 h-6 sm:w-8 sm:h-8 rotate-45 stroke-[2.5]" />
      </div>

      {/* Tilted Case File Card */}
      <motion.div
        animate={{ rotate: [-0.5, -2, -0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="case-card p-3.5 sm:p-6 md:p-8 relative bg-card tape-top-left tape-top-right transform rotate-0 sm:-rotate-2 shadow-hard-sm sm:shadow-hard"
      >
        {/* Case File Metadata Header */}
        <div className="flex items-center justify-between border-b-2 border-line pb-2 mb-3 sm:mb-4 gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="font-mono text-10 sm:text-12 font-bold bg-accent-red text-white px-1.5 sm:px-2 py-0.5 shrink-0">
              CASE #CS-2041
            </span>
            <span className="font-mono text-10 sm:text-12 text-ink-soft font-semibold truncate">
              EXHIBIT A // SMS
            </span>
          </div>
          <span className="font-mono text-10 sm:text-12 text-ink-soft font-bold shrink-0">
            CONFIDENTIAL
          </span>
        </div>

        {/* Evidence Ruled Paper Content */}
        <div className="ruled-paper border-2 border-divider p-2.5 sm:p-4 mb-3 sm:mb-4 font-mono text-12 sm:text-14 text-ink leading-relaxed sm:leading-loose break-words">
          <div className="text-11 sm:text-12 text-ink-soft font-bold mb-1">
            ORIGIN: +91-98765-XXXXX // SENDER TAG: "VK-SBIBNK"
          </div>
          <p className="m-0">
            URGENT ALERT: Dear SBI customer, your bank account #XXXX4021 will be{" "}
            <span
              className={`transition-all duration-300 ${
                highlightStep >= 1
                  ? "bg-accent-red/25 border-b-2 border-accent-red font-bold px-1"
                  : ""
              }`}
            >
              BLOCKED within 12 hours
            </span>{" "}
            due to pending KYC verification. Update PAN immediately at{" "}
            <span
              className={`transition-all duration-300 ${
                highlightStep >= 2
                  ? "bg-accent-red/25 border-b-2 border-accent-red font-bold px-1 underline"
                  : ""
              }`}
            >
              http://sbi-pan-kyc.top/update
            </span>{" "}
            or contact manager at{" "}
            <span
              className={`transition-all duration-300 ${
                highlightStep >= 3
                  ? "bg-accent-amber/30 border-b-2 border-accent-amber font-bold px-1"
                  : ""
              }`}
            >
              +91-9876543210
            </span>
            . Do not ignore.
          </p>
        </div>

        {/* Forensic Annotations Footer */}
        <div className="flex items-center justify-between font-mono text-11 sm:text-12 text-ink-soft pt-2 border-t border-divider">
          <span className="flex items-center gap-1.5 font-semibold">
            <FileSearch className="w-3.5 h-3.5 text-accent-red" />
            <span>Forensic scan in progress</span>
          </span>
          <span className="text-accent-red font-bold">
            {highlightStep >= 3 ? "3 RED FLAGS IDENTIFIED" : `${highlightStep} RED FLAGS FOUND`}
          </span>
        </div>

        {/* Rubber Stamp Slam In with Heavy Gravity */}
        <AnimatePresence>
          {showStamp && (
            <motion.div
              initial={{ scale: 3.2, opacity: 0, y: -45, rotate: -26 }}
              animate={{ scale: [3.2, 0.92, 1.05, 1], opacity: 1, y: 0, rotate: -7 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 480,
                damping: 18,
                mass: 1.2,
              }}
              className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 z-30 pointer-events-none"
            >
              <div className="stamp-box border-accent-red text-accent-red bg-card/95 shadow-hard-sm px-3 py-1.5 sm:px-4 sm:py-2 text-13 sm:text-16 font-extrabold tracking-widest rotate-[-6deg]">
                DANGEROUS 92
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
