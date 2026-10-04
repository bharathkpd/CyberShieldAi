"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { VerdictType } from "@/types";
import { Check, AlertTriangle, AlertOctagon } from "lucide-react";
import { getAudioMuted } from "@/lib/storage";

interface StampVerdictProps {
  verdict: VerdictType;
  riskScore: number;
}

export const StampVerdict: React.FC<StampVerdictProps> = ({
  verdict,
  riskScore,
}) => {
  const [screenShake, setScreenShake] = useState(false);

  useEffect(() => {
    // Play synthetic ink stamp sound if unmuted
    const isMuted = getAudioMuted();
    if (!isMuted && typeof window !== "undefined" && window.AudioContext) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = verdict === "DANGEROUS" ? "square" : "sine";
        osc.frequency.setValueAtTime(verdict === "DANGEROUS" ? 95 : 220, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.15);

        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
      } catch (e) {
        // Audio error silent fallback
      }
    }

    if (verdict === "DANGEROUS") {
      setScreenShake(true);
      const timer = setTimeout(() => setScreenShake(false), 450);
      return () => clearTimeout(timer);
    }
  }, [verdict]);

  const config = {
    DANGEROUS: {
      label: "DANGEROUS",
      colorClass: "border-accent-red text-accent-red shadow-hard-red",
      bgClass: "bg-accent-red/10",
      icon: <AlertOctagon className="w-6 h-6 stroke-[3]" />,
      angle: -7,
    },
    SUSPICIOUS: {
      label: "SUSPICIOUS",
      colorClass: "border-accent-amber text-accent-amber shadow-hard-amber",
      bgClass: "bg-accent-amber/10",
      icon: <AlertTriangle className="w-6 h-6 stroke-[3]" />,
      angle: -4,
    },
    SAFE: {
      label: "SAFE",
      colorClass: "border-accent-green text-accent-green shadow-hard-green",
      bgClass: "bg-accent-green/10",
      icon: <Check className="w-6 h-6 stroke-[3.5]" />,
      angle: -2,
    },
  }[verdict];

  return (
    <div className={`relative inline-block ${screenShake ? "shake-gravity" : ""}`}>
      <motion.div
        initial={{ scale: 2.6, opacity: 0, y: -55, rotate: -25 }}
        animate={{ scale: 1, opacity: 1, y: 0, rotate: config.angle }}
        transition={{
          type: "spring",
          stiffness: 480,
          damping: 18,
          mass: 1.35,
          delay: 0.05,
        }}
        className={`stamp-box border-3 sm:border-4 ${config.colorClass} ${config.bgClass} px-3.5 py-2 sm:px-6 sm:py-3.5 select-none`}
      >
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <div className="shrink-0">{config.icon}</div>
          <div>
            <div className="font-mono text-18 sm:text-24 md:text-28 font-extrabold tracking-widest leading-none">
              {config.label}
            </div>
            <div className="font-mono text-11 sm:text-12 font-bold opacity-80 mt-1">
              RISK INDEX: {riskScore} / 100
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
