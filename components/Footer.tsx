"use client";

import React from "react";
import Link from "next/link";
import { PhoneCall, ShieldCheck, ExternalLink, ShieldAlert, FileText, CheckCircle2, Lock } from "lucide-react";
import { LanguageCode } from "@/types";
import { translations } from "@/lib/i18n";

interface FooterProps {
  language: LanguageCode;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language] || translations.en;

  return (
    <footer className="border-t-2 border-line bg-paper-2 pt-12 sm:pt-16 pb-10 sm:pb-12 mt-16 sm:mt-24">
      <div className="max-w-container mx-auto px-4 md:px-8">
        
        {/* Top Rapid Emergency Response Strip */}
        <div className="p-4 sm:p-6 border-2 border-line bg-card shadow-hard mb-10 sm:mb-14">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono text-12 font-bold text-accent-red uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-red animate-pulse" />
                <span>GOLDEN HOUR EMERGENCY FINANCIAL FREEZE (WITHIN 2 HOURS OF TRANSACTION)</span>
              </div>
              <h3 className="font-serif text-18 sm:text-22 font-bold text-ink">
                Victim of an unauthorized bank transfer or UPI payment? Act immediately.
              </h3>
              <p className="font-sans text-13 text-ink-soft max-w-3xl">
                Dialing <strong>1930</strong> connects directly to the National Cyber Crime Reporting Portal (NCRP) and citizen financial fraud management system (CFCFRMS), halting fund dispersal through mule bank accounts.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto shrink-0">
              <a
                href="tel:1930"
                className="btn-case btn-case-primary text-13 sm:text-14 py-2.5 px-4 font-bold flex items-center justify-center gap-2 text-center"
              >
                <PhoneCall className="w-4 h-4 stroke-[2.5]" />
                <span>CALL HELPLINE 1930</span>
              </a>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-case text-13 sm:text-14 py-2.5 px-4 bg-card font-bold flex items-center justify-center gap-1.5 text-center"
              >
                <span>cybercrime.gov.in</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* 4-Column Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b-2 border-divider">
          
          {/* Col 1: Brand & Standard (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-28 font-bold text-ink tracking-tight">
                CyberShield
              </span>
              <span className="w-2.5 h-2.5 bg-accent-red" />
              <span className="font-mono text-11 font-bold px-1.5 py-0.5 border border-line bg-card ml-2">
                DESK #CS-2026.4
              </span>
            </div>
            <p className="font-sans text-13 sm:text-14 text-ink-soft leading-relaxed max-w-sm">
              Automated cybercrime detection and forensic decision-support desk engineered specifically for citizens across India. Dissects deceptive psychology, malicious domain infrastructure, and fraudulent payment lures in real time.
            </p>
            <div className="space-y-1.5 font-mono text-11 text-ink-soft">
              <div className="flex items-center gap-2">
                <span className="stamp-box border-accent-green text-accent-green text-10 py-0 px-1.5 font-bold">
                  LIGHT THEME ONLY
                </span>
                <span>Tactile Paper Case File Standard</span>
              </div>
              <div className="flex items-center gap-2 text-11 text-ink">
                <Lock className="w-3.5 h-3.5 text-accent-green" />
                <span>Zero server-side retention: Ephemeral client analysis</span>
              </div>
            </div>
          </div>

          {/* Col 2: Investigation Modules (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-mono text-12 font-bold text-ink uppercase tracking-wider border-b border-line pb-1.5">
              FORENSIC EXAMINATION MODULES
            </div>
            <ul className="space-y-2 font-mono text-12 text-ink-soft">
              <li>
                <Link href="/#scanner-intake" className="hover:text-accent-red flex items-center gap-1.5">
                  <span className="text-accent-red font-bold">→</span> Suspicious SMS & Text Scanner
                </Link>
              </li>
              <li>
                <Link href="/#scanner-intake" className="hover:text-accent-red flex items-center gap-1.5">
                  <span className="text-accent-red font-bold">→</span> Link Typosquat & TLD Auditor
                </Link>
              </li>
              <li>
                <Link href="/#scanner-intake" className="hover:text-accent-red flex items-center gap-1.5">
                  <span className="text-accent-red font-bold">→</span> Screenshot & Evidence Inspector
                </Link>
              </li>
              <li>
                <Link href="/#scanner-intake" className="hover:text-accent-red flex items-center gap-1.5">
                  <span className="text-accent-red font-bold">→</span> Deceptive UPI QR Code Decoder
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-accent-red flex items-center gap-1.5">
                  <span className="text-accent-red font-bold">→</span> Spot-the-Scam Training Lab
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-accent-red flex items-center gap-1.5">
                  <span className="text-accent-red font-bold">→</span> National Threat Intelligence
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: State Cyber Crime Cells (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-mono text-12 font-bold text-ink uppercase tracking-wider border-b border-line pb-1.5">
              STATE CYBER CRIME DESKS
            </div>
            <ul className="space-y-2 font-mono text-12 text-ink-soft">
              <li>
                <a href="https://cid.appolice.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-accent-red flex items-center justify-between">
                  <span>AP State Cyber Security Bureau</span>
                  <ExternalLink className="w-3 h-3 text-ink-soft" />
                </a>
              </li>
              <li>
                <a href="https://tscsb.telangana.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-accent-red flex items-center justify-between">
                  <span>Telangana Cyber Security Bureau (TSCSB)</span>
                  <ExternalLink className="w-3 h-3 text-ink-soft" />
                </a>
              </li>
              <li>
                <a href="https://delhipolice.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-accent-red flex items-center justify-between">
                  <span>Delhi Police IFSO Special Cell</span>
                  <ExternalLink className="w-3 h-3 text-ink-soft" />
                </a>
              </li>
              <li>
                <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-accent-red flex items-center justify-between">
                  <span>National Cyber Crime Portal (I4C)</span>
                  <ExternalLink className="w-3 h-3 text-ink-soft" />
                </a>
              </li>
              <li>
                <a href="https://sancharsaathi.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-accent-red flex items-center justify-between">
                  <span>Chakshu Telecom Fraud (DoT)</span>
                  <ExternalLink className="w-3 h-3 text-ink-soft" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Statutory Notice & Helplines (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="font-mono text-12 font-bold text-ink uppercase tracking-wider border-b border-line pb-1.5">
              EMERGENCY DIAL
            </div>
            <div className="space-y-2 font-mono text-12">
              <div className="p-2 border border-line bg-card">
                <div className="text-10 text-ink-soft font-bold">FINANCIAL FRAUD:</div>
                <a href="tel:1930" className="text-accent-red font-bold hover:underline block text-14">
                  1930 (24x7)
                </a>
              </div>
              <div className="p-2 border border-line bg-card">
                <div className="text-10 text-ink-soft font-bold">POLICE EMERGENCY:</div>
                <a href="tel:112" className="text-ink font-bold hover:underline block text-14">
                  112 (National)
                </a>
              </div>
              <div className="p-2 border border-line bg-card">
                <div className="text-10 text-ink-soft font-bold">WOMEN HELPLINE:</div>
                <a href="tel:1091" className="text-ink font-bold hover:underline block text-14">
                  1091 / 181
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Accreditation */}
        <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-11 sm:text-12 text-ink-soft">
          <p className="max-w-2xl leading-relaxed m-0 font-sans text-12">
            <strong>STATUTORY DISCLAIMER:</strong> CyberShield AI operates as an automated forensic decision-support aid. Never transfer money, share OTPs, enter your UPI PIN to receive funds, or grant remote desktop access (AnyDesk, TeamViewer). In financial loss events, call 1930 immediately to lodge an acknowledgment request on NCRP.
          </p>
          <div className="shrink-0 flex flex-wrap items-center gap-4 font-mono text-11">
            <Link href="/about" className="hover:text-accent-red underline">
              Protocol Dossier
            </Link>
            <Link href="/learn" className="hover:text-accent-red underline">
              Training Drills
            </Link>
            <Link href="/dashboard" className="hover:text-accent-red underline">
              Threat Intelligence
            </Link>
            <span className="font-bold text-ink">REGION: INDIA (EN | TE | HI)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
