"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getStoredLanguage, setStoredLanguage } from "@/lib/storage";
import { LanguageCode } from "@/types";
import {
  ShieldAlert,
  Cpu,
  Lock,
  FileText,
  AlertCircle,
  CheckCircle2,
  Server,
  Layers,
  Scale,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const [language, setLanguage] = useState<LanguageCode>("en");

  useEffect(() => {
    setLanguage(getStoredLanguage());
  }, []);

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Navbar
        language={language}
        onLanguageChange={(l) => {
          setLanguage(l);
          setStoredLanguage(l);
        }}
      />

      <main className="flex-1 max-w-container mx-auto px-3 sm:px-4 md:px-8 py-6 sm:py-10 w-full">
        {/* Header */}
        <div className="border-b-2 border-line pb-3 sm:pb-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-accent-red shrink-0" />
            <span className="font-mono text-11 sm:text-12 font-bold tracking-widest text-accent-red uppercase truncate max-w-[260px] sm:max-w-none">
              TECHNICAL SPECIFICATIONS & METHODOLOGY
            </span>
          </div>
          <h1 className="font-serif text-24 sm:text-36 md:text-48 font-bold text-ink m-0">
            About CyberShield AI
          </h1>
          <p className="font-sans text-14 sm:text-16 text-ink-soft mt-2 max-w-2xl leading-relaxed">
            A hackathon-grade forensic scam and cybercrime detection platform designed to protect citizens from financial loss, digital extortion, and credential theft across India.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12">
          {/* Pillar 1: Dual-Engine Forensic Architecture */}
          <div className="case-card p-4 sm:p-6 bg-card">
            <div className="flex items-center gap-3 border-b-2 border-divider pb-3 mb-4">
              <Cpu className="w-6 h-6 text-accent-red stroke-[2]" />
              <h2 className="font-serif text-20 font-bold text-ink m-0">
                1. Dual-Engine Forensic Architecture
              </h2>
            </div>
            <p className="font-sans text-14 text-ink-soft leading-relaxed mb-4">
              CyberShield AI combines cutting-edge LLM reasoning with strict, deterministic heuristics to ensure rapid sub-3 second verdicts with 0% downtime:
            </p>
            <ul className="space-y-2 font-mono text-12 text-ink">
              <li className="flex items-start gap-2">
                <span className="text-accent-red font-bold">●</span>
                <span>
                  <strong>Anthropic Claude 3.5 Sonnet:</strong> Server-side AI model dissecting complex psychological coercion and contextual deception.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-red font-bold">●</span>
                <span>
                  <strong>URL & Domain Heuristics Engine:</strong> Algorithmic scoring evaluating disposable TLDs (.top, .xyz), typosquatting, raw IP URLs, punycode, and missing HTTPS.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-red font-bold">●</span>
                <span>
                  <strong>Offline Rule-Based Fallback:</strong> Ensures the application functions reliably even when API quotas or internet connectivity fluctuate.
                </span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: Client-Side Privacy & Ethics */}
          <div className="case-card p-6 bg-card">
            <div className="flex items-center gap-3 border-b-2 border-divider pb-3 mb-4">
              <Lock className="w-6 h-6 text-accent-green stroke-[2]" />
              <h2 className="font-serif text-20 font-bold text-ink m-0">
                2. Privacy-First Ethical Standard
              </h2>
            </div>
            <p className="font-sans text-14 text-ink-soft leading-relaxed mb-4">
              Cybercrime investigation must never compromise the victim's privacy. Our architecture is built on absolute data minimization:
            </p>
            <ul className="space-y-2 font-mono text-12 text-ink">
              <li className="flex items-start gap-2">
                <span className="text-accent-green font-bold">✓</span>
                <span>
                  <strong>Zero Server-Side Storage:</strong> Submitted messages, links, and screenshots are never stored in databases or log files.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-green font-bold">✓</span>
                <span>
                  <strong>Client-Side LocalStorage:</strong> Case history resides exclusively within the user's browser storage and can be wiped with one tap.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-green font-bold">✓</span>
                <span>
                  <strong>In-Browser QR Decoding:</strong> Payment QR codes are decoded client-side using `jsQR` before passing extracted URLs to analysis.
                </span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: Statutory Ecosystem Alignment */}
          <div className="case-card p-6 bg-card">
            <div className="flex items-center gap-3 border-b-2 border-divider pb-3 mb-4">
              <Scale className="w-6 h-6 text-accent-amber stroke-[2]" />
              <h2 className="font-serif text-20 font-bold text-ink m-0">
                3. Indian Cyber Defense Integration
              </h2>
            </div>
            <p className="font-sans text-14 text-ink-soft leading-relaxed mb-4">
              Directly aligned with Indian cybercrime reporting protocols under the Ministry of Home Affairs (MHA) and Indian Cyber Crime Coordination Centre (I4C):
            </p>
            <ul className="space-y-2 font-mono text-12 text-ink">
              <li className="flex items-start gap-2">
                <span className="text-accent-amber font-bold">▶</span>
                <span>
                  <strong>National Helpline 1930:</strong> Immediate guidance for reporting within the 2-hour "Golden Hour" to freeze stolen funds in beneficiary bank accounts.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-amber font-bold">▶</span>
                <span>
                  <strong>Pre-Formatted Complaint Dossiers:</strong> Auto-generates formal complaint text and official PDF exports matching cybercrime.gov.in required fields.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-amber font-bold">▶</span>
                <span>
                  <strong>Multilingual Vernacular Cards:</strong> Generates WhatsApp-friendly alerts in English, Telugu (తెలుగు), and Hindi (हिन्दी) for non-technical parents and elders.
                </span>
              </li>
            </ul>
          </div>

          {/* Pillar 4: Forensic Limitations & Verification */}
          <div className="case-card p-6 bg-card">
            <div className="flex items-center gap-3 border-b-2 border-divider pb-3 mb-4">
              <AlertCircle className="w-6 h-6 text-ink-soft stroke-[2]" />
              <h2 className="font-serif text-20 font-bold text-ink m-0">
                4. Operational Scope & Limitations
              </h2>
            </div>
            <p className="font-sans text-14 text-ink-soft leading-relaxed mb-4">
              CyberShield AI is an advisory intelligence instrument. Citizens should observe the following guidelines:
            </p>
            <ul className="space-y-2 font-sans text-13 text-ink-soft">
              <li className="flex items-start gap-2">
                <span className="text-accent-red font-bold font-mono">!</span>
                <span>
                  <strong>Advisory Nature:</strong> AI and heuristic models provide probability scores. A "Safe" score does not replace personal vigilance.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-red font-bold font-mono">!</span>
                <span>
                  <strong>Independent Bank Confirmation:</strong> Always verify banking alerts directly through authorized bank mobile applications (e.g. YONO SBI, HDFC MobileBanking).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-red font-bold font-mono">!</span>
                <span>
                  <strong>Law Enforcement Primacy:</strong> CyberShield AI does not initiate police FIRs. Legal complaints must be registered at cybercrime.gov.in or local police stations.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Tech Stack Summary Card */}
        <div className="case-card p-8 bg-paper-2 mb-12">
          <span className="font-mono text-12 font-bold text-accent-red uppercase block mb-2">
            STACK SPECIFICATION
          </span>
          <h2 className="font-serif text-24 font-bold text-ink mb-4">
            Production Engineering Specifications
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-12">
            <div className="p-3 border-2 border-line bg-card">
              <span className="text-ink-soft block font-bold">FRAMEWORK</span>
              <span className="text-ink font-bold">Next.js 14 App Router</span>
            </div>
            <div className="p-3 border-2 border-line bg-card">
              <span className="text-ink-soft block font-bold">STYLING</span>
              <span className="text-ink font-bold">Tailwind CSS (Custom Tokens)</span>
            </div>
            <div className="p-3 border-2 border-line bg-card">
              <span className="text-ink-soft block font-bold">AI ENGINE</span>
              <span className="text-ink font-bold">Anthropic Claude 3.5 Sonnet</span>
            </div>
            <div className="p-3 border-2 border-line bg-card">
              <span className="text-ink-soft block font-bold">MOTION & DATA</span>
              <span className="text-ink font-bold">Framer Motion + Recharts</span>
            </div>
            <div className="p-3 border-2 border-line bg-card">
              <span className="text-ink-soft block font-bold">EXPORTING</span>
              <span className="text-ink font-bold">jsPDF + html-to-image</span>
            </div>
            <div className="p-3 border-2 border-line bg-card">
              <span className="text-ink-soft block font-bold">QR ENGINE</span>
              <span className="text-ink font-bold">jsQR (Client-Side)</span>
            </div>
            <div className="p-3 border-2 border-line bg-card">
              <span className="text-ink-soft block font-bold">VALIDATION</span>
              <span className="text-ink font-bold">Zod Runtime Schemas</span>
            </div>
            <div className="p-3 border-2 border-line bg-card">
              <span className="text-ink-soft block font-bold">THEME</span>
              <span className="text-accent-red font-bold">Light Only (Forensic File)</span>
            </div>
          </div>
        </div>

        {/* CTA to Scanner */}
        <div className="text-center py-6">
          <Link
            href="/#scanner-intake"
            className="btn-case btn-case-primary text-16 py-3.5 px-8 font-bold inline-flex items-center gap-2 shadow-hard"
          >
            <span>Launch Evidence Intake Terminal</span>
            <span className="font-mono text-14">→</span>
          </Link>
        </div>
      </main>

      <Footer language={language} />
    </div>
  );
}
