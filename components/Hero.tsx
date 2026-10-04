"use client";

import React from "react";
import { EvidenceCard } from "./EvidenceCard";
import { ArrowDownRight, ShieldAlert, Sparkles, ExternalLink } from "lucide-react";
import { LanguageCode } from "@/types";
import { translations } from "@/lib/i18n";

interface HeroProps {
  language: LanguageCode;
  onStartClick: () => void;
  onSampleClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onStartClick,
  onSampleClick,
}) => {
  const t = translations[language] || translations.en;

  return (
    <section className="pt-6 pb-12 sm:pt-12 sm:pb-18 md:pt-16 md:pb-24 border-b-2 border-line bg-paper overflow-hidden">
      <div className="max-w-container mx-auto px-3 sm:px-4 md:px-8">
        {/* Asymmetric 2-column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Small FRAUD DESK Label */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 border-2 border-line bg-card shadow-hard-sm mb-4 sm:mb-6">
              <span className="w-2.5 h-2.5 bg-accent-red shrink-0" />
              <span className="font-mono text-11 sm:text-12 font-bold tracking-widest text-ink uppercase truncate max-w-[260px] sm:max-w-none">
                {t.fraudDesk} // AP-TELANGANA-DELHI CRIME DESK
              </span>
            </div>

            {/* Huge Serif Headline in Fraunces */}
            <h1 className="font-serif text-28 sm:text-42 md:text-54 lg:text-72 font-extrabold text-ink leading-[1.1] tracking-tight mb-3 sm:mb-6">
              {t.hero.title}
            </h1>

            {/* Plain-Language Subtext */}
            <p className="font-sans text-14 sm:text-17 md:text-20 text-ink-soft leading-relaxed max-w-prose mb-5 sm:mb-8">
              {t.hero.subtitle}
            </p>

            {/* Actions: Primary Red Button + Secondary Link */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 mb-5 sm:mb-8 w-full sm:w-auto">
              <button
                onClick={onStartClick}
                className="btn-case btn-case-primary text-15 sm:text-16 py-3.5 px-6 shadow-hard w-full sm:w-auto text-center"
              >
                <span>{t.hero.startBtn}</span>
                <ArrowDownRight className="w-5 h-5 stroke-[2.5] shrink-0" />
              </button>

              <button
                onClick={onSampleClick}
                className="font-mono text-13 sm:text-14 font-bold text-ink underline decoration-2 underline-offset-4 hover:text-accent-red cursor-pointer flex items-center justify-center sm:justify-start gap-1.5 py-2 sm:py-1"
              >
                <span>{t.hero.sampleBtn}</span>
                <span className="font-mono text-12 text-ink-soft">→</span>
              </button>
            </div>

            {/* Micro assurance note */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-11 sm:text-12 text-ink-soft">
              <span className="stamp-box text-accent-green border-accent-green text-11 py-0.5 px-2 font-bold shrink-0">
                100% PRIVATE
              </span>
              <span>Zero server-side retention. Instant client-first forensic parsing.</span>
            </div>
          </div>

          {/* Right Column: Tilted Paper Evidence Card */}
          <div className="lg:col-span-5 flex justify-center w-full px-1 sm:px-0">
            <EvidenceCard />
          </div>
        </div>

        {/* Trust Strip: 3 stats in mono font */}
        <div className="mt-10 sm:mt-16 md:mt-20 pt-6 sm:pt-8 border-t-2 border-divider grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-4 border-2 border-line bg-card shadow-hard-sm">
            <div className="font-mono text-12 font-bold uppercase text-ink-soft mb-1">
              01 // THREAT DOMAINS COVERED
            </div>
            <div className="font-mono text-18 font-bold text-ink">
              Phishing, Fake KYC, Job Deposit & UPI Scams
            </div>
            <p className="font-sans text-12 text-ink-soft mt-1">
              Dissects lookalike URLs (.top, .xyz, punycode), fake sender headers, and WhatsApp recruiter traps.
            </p>
          </div>

          <div className="p-4 border-2 border-line bg-card shadow-hard-sm">
            <div className="font-mono text-12 font-bold uppercase text-ink-soft mb-1">
              02 // SPEED & RESILIENCE
            </div>
            <div className="font-mono text-18 font-bold text-accent-red">
              &lt; 3 Seconds Analysis
            </div>
            <p className="font-sans text-12 text-ink-soft mt-1">
              Anthropic Claude 3.5 Sonnet analysis backed by offline keyword heuristics engine.
            </p>
          </div>

          <div className="p-4 border-2 border-line bg-card shadow-hard-sm">
            <div className="font-mono text-12 font-bold uppercase text-ink-soft mb-1">
              03 // DIRECT STATUTORY INTEGRATION
            </div>
            <div className="font-mono text-18 font-bold text-accent-green">
              Helpline 1930 & cybercrime.gov.in
            </div>
            <p className="font-sans text-12 text-ink-soft mt-1">
              Auto-formats ready-to-file police dossiers and 1-tap WhatsApp warning cards for family elders.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
