"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface InkGaugeProps {
  score: number; // 0 to 100
}

export const InkGauge: React.FC<InkGaugeProps> = ({ score }) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 900;
    const stepTime = 15;
    const steps = duration / stepTime;
    const increment = score / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  // Determine severity color
  const getColor = (val: number) => {
    if (val >= 65) return "bg-accent-red";
    if (val >= 35) return "bg-accent-amber";
    return "bg-accent-green";
  };

  const barColor = getColor(score);

  return (
    <div className="w-full">
      <div className="flex justify-between items-baseline mb-2 gap-2">
        <span className="font-mono text-11 sm:text-12 font-bold uppercase tracking-wider text-ink-soft truncate max-w-[190px] sm:max-w-none">
          THREAT METER // SEVERITY
        </span>
        <span className="font-mono text-18 sm:text-20 font-bold text-ink shrink-0">
          {displayScore} <span className="text-11 sm:text-12 text-ink-soft font-normal">/ 100</span>
        </span>
      </div>

      {/* Horizontal Bar Container */}
      <div className="relative h-5 sm:h-6 border-2 border-line bg-paper-2 p-0.5 shadow-hard-sm">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(2, score))}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className={`h-full ${barColor} transition-colors relative`}
        >
          {/* Subtle hatch overlay pattern on the gauge fill */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 5px, #000 5px, #000 7px)",
            }}
          />
        </motion.div>

        {/* 50% Midpoint Line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-line pointer-events-none" />
      </div>

      {/* Tick Marks */}
      <div className="flex justify-between items-center mt-1.5 font-mono text-10 sm:text-12 text-ink-soft">
        <div className="flex flex-col items-start">
          <span className="h-1.5 w-0.5 bg-line mb-0.5" />
          <span>0 (Safe)</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="h-1.5 w-0.5 bg-line mb-0.5" />
          <span>50 (Alert)</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="h-1.5 w-0.5 bg-line mb-0.5" />
          <span>100 (Critical)</span>
        </div>
      </div>
    </div>
  );
};
