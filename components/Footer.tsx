"use client";

import React from "react";
import Link from "next/link";
import { PhoneCall, ShieldCheck, ExternalLink } from "lucide-react";
import { LanguageCode } from "@/types";
import { translations } from "@/lib/i18n";

interface FooterProps {
  language: LanguageCode;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language] || translations.en;

  return (
    <footer className="border-t-2 border-line bg-paper-2 pt-14 pb-12 mt-20">
      <div className="max-w-container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b-2 border-divider">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-28 font-bold text-ink tracking-tight">
                CyberShield
              </span>
              <span className="w-2.5 h-2.5 bg-accent-red" />
            </div>
            <p className="font-sans text-14 text-ink-soft max-w-md leading-relaxed">
              Forensic cybercrime and scam investigation platform engineered for citizens across India.
              Rapidly dissects psychological coercion, malicious domains, and fraudulent payment lures.
            </p>
            <div className="flex items-center gap-2 font-mono text-12 text-ink-soft">
              <span className="stamp-box border-accent-green text-accent-green text-11 py-0 px-2 font-bold">
                LIGHT THEME ONLY
              </span>
              <span>WCAG AA Certified // Indian Cybersecurity Standard</span>
            </div>
          </div>

          {/* Emergency 1930 Helpline Callout */}
          <div className="md:col-span-6 flex flex-col justify-center">
            <div className="p-5 border-2 border-line bg-card shadow-hard-sm">
              <div className="flex items-center gap-2 mb-2 font-mono text-12 font-bold text-accent-red uppercase">
                <PhoneCall className="w-4 h-4" />
                <span>{t.footer.helplineTitle}</span>
              </div>
              <p className="font-sans text-14 text-ink font-semibold mb-3">
                {t.footer.helplineDesc}
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                <a
                  href="tel:1930"
                  className="btn-case btn-case-primary text-13 py-2 px-3 font-bold text-center justify-center w-full sm:w-auto"
                >
                  Call Helpline 1930
                </a>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-case text-13 py-2 px-3 bg-card font-bold flex items-center justify-center gap-1 w-full sm:w-auto text-center"
                >
                  <span>cybercrime.gov.in</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-12 text-ink-soft">
          <p className="max-w-2xl leading-relaxed m-0 font-sans text-12">
            {t.footer.disclaimer}
          </p>
          <div className="shrink-0 flex items-center gap-4">
            <Link href="/about" className="hover:text-accent-red underline">
              Protocol Docs
            </Link>
            <Link href="/learn" className="hover:text-accent-red underline">
              Training Lab
            </Link>
            <Link href="/dashboard" className="hover:text-accent-red underline">
              Threat Map
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
