"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, AlertOctagon, AlertTriangle, ShieldCheck } from "lucide-react";
import { RedFlag } from "@/types";

interface FlagCardProps {
  flag: RedFlag;
  index: number;
}

export const FlagCard: React.FC<FlagCardProps> = ({ flag, index }) => {
  const [isOpen, setIsOpen] = useState(index === 0); // Open first item by default

  const isDanger = flag.severity === "danger";
  const isSuspicious = flag.severity === "suspicious";

  const borderColor = isDanger
    ? "border-accent-red"
    : isSuspicious
    ? "border-accent-amber"
    : "border-accent-green";

  const badgeBg = isDanger
    ? "bg-accent-red text-white"
    : isSuspicious
    ? "bg-accent-amber text-white"
    : "bg-accent-green text-white";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.08 }}
      className={`border-2 border-line bg-card shadow-hard-sm mb-3 overflow-hidden rounded-none`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-paper-2/60 transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 pr-2">
          <span className={`font-mono text-12 font-bold px-2 py-0.5 uppercase ${badgeBg}`}>
            {flag.severity}
          </span>
          <span className="font-mono text-14 font-bold text-ink line-clamp-1">
            "{flag.phrase}"
          </span>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-ink-soft shrink-0"
        >
          <ChevronDown className="w-5 h-5 stroke-[2.5]" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t-2 border-divider px-4 py-3 bg-paper-2/40"
          >
            <div className="space-y-2">
              <div>
                <span className="font-mono text-12 font-bold text-ink-soft uppercase block mb-0.5">
                  FORENSIC RATIONALE:
                </span>
                <p className="font-sans text-14 text-ink leading-relaxed m-0">
                  {flag.reason}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
