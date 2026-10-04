"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Quiz } from "@/components/Quiz";
import { getStoredLanguage, setStoredLanguage } from "@/lib/storage";
import { LanguageCode } from "@/types";
import {
  GraduationCap,
  ShieldAlert,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  HelpCircle,
  PhoneCall,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function LearnPage() {
  const [language, setLanguage] = useState<LanguageCode>("en");

  useEffect(() => {
    setLanguage(getStoredLanguage());
  }, []);

  const guides = [
    {
      title: "Anatomy of an SMS Phishing Link",
      tag: "DOMAIN DECEPTION",
      content:
        "Fraudsters register disposable domains like 'sbi-update.top' or 'indlapost.xyz'. Notice the substitution of 'l' for 'i' or random hyphens. Legitimate Indian banks strictly use verified banking TLDs (e.g. .sbi, .bank) or secure corporate domains with EV SSL.",
      checklist: [
        "Check domain suffix: avoid .top, .xyz, .live, .click",
        "Inspect sender header: genuine bank SMS starts with carrier-code (e.g., VM-HDFCBK, AX-SBIBNK)",
        "Never tap links asking for netbanking credentials or OTP",
      ],
    },
    {
      title: "The UPI PIN 'Receive Money' Scam",
      tag: "PAYMENT FRAUD",
      content:
        "Scammers on OLX or Facebook Marketplace claim they are sending you an advance payment. They send a QR code or UPI collect request saying 'Enter PIN to receive Rs 15,000'. Remember: In UPI architecture, you NEVER enter your MPIN to receive money.",
      checklist: [
        "UPI MPIN is ONLY used to AUTHORIZE DEBITS from your account",
        "Scanning a QR code means you are paying, never receiving",
        "Decline unsolicited collect requests in PhonePe, Google Pay, or Paytm",
      ],
    },
    {
      title: "Work-From-Home Task & Telegram Traps",
      tag: "RECRUITMENT FRAUD",
      content:
        "Victims are hired to review Google Maps places or like YouTube videos. The scammer pays small rewards (Rs 150) at first to build trust, then forces entry into a Telegram VIP group requiring Rs 10,000+ deposits to unlock 'frozen commissions'.",
      checklist: [
        "No legitimate company hires via unsolicited WhatsApp/Telegram texts",
        "Never pay 'security deposits', 'equipment fees', or 'tax bond charges'",
        "Exit immediately if directed to invest cryptocurrency or trading platforms",
      ],
    },
    {
      title: "Digital Arrest & Fake Police Video Calls",
      tag: "EXTORTION TACTIC",
      content:
        "Criminals dress in fake police uniforms, sitting against backdrops resembling CBI or Mumbai Police stations. They claim your Aadhaar was linked to money laundering in a FedEx parcel and threaten arrest unless you transfer money to a 'court RBI verification account'.",
      checklist: [
        "The Indian Penal Code has NO legal provision for 'digital arrest'",
        "Indian Police or CBI NEVER investigate or arrest citizens via Skype or WhatsApp video",
        "If threatened, disconnect immediately and dial 1930 or local 112",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Navbar
        language={language}
        onLanguageChange={(l) => {
          setLanguage(l);
          setStoredLanguage(l);
        }}
      />

      <main className="flex-1 max-w-container mx-auto px-4 md:px-8 py-10 w-full">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between border-b-2 border-line pb-4 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 bg-accent-red" />
              <span className="font-mono text-12 font-bold tracking-widest text-accent-red uppercase">
                CYBER FRAUD AWARENESS LAB // CITIZEN ACADEMY
              </span>
            </div>
            <h1 className="font-serif text-32 md:text-48 font-bold text-ink m-0">
              Spot the Scam: Field Drills & Guides
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="stamp-box border-accent-green text-accent-green font-bold text-12">
              ACADEMY ACTIVE
            </span>
          </div>
        </div>

        {/* Section 1: Spot the Scam Interactive Quiz */}
        <div className="mb-16">
          <Quiz />
        </div>

        {/* Section 2: Comprehensive Field Defense Dossiers */}
        <div className="border-t-2 border-line pt-12">
          <div className="flex flex-wrap items-center justify-between mb-8 gap-2">
            <div>
              <span className="font-mono text-12 font-bold uppercase text-accent-red">
                FIELD INVESTIGATION PROTOCOLS
              </span>
              <h2 className="font-serif text-28 md:text-36 font-bold text-ink mt-1">
                Deception Breakdowns & Countermeasures
              </h2>
            </div>
            <span className="font-mono text-12 text-ink-soft">
              UPDATED FOR 2026 INDIAN THREAT LANDSCAPE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((g, idx) => (
              <div key={idx} className="case-card p-6 bg-card relative">
                <div className="flex items-center justify-between border-b-2 border-divider pb-3 mb-4">
                  <span className="font-mono text-12 font-bold text-accent-red uppercase">
                    MODUS {idx + 1} // {g.tag}
                  </span>
                  <Lightbulb className="w-4 h-4 text-accent-amber" />
                </div>

                <h3 className="font-serif text-20 font-bold text-ink mb-2">
                  {g.title}
                </h3>
                <p className="font-sans text-14 text-ink-soft leading-relaxed mb-4">
                  {g.content}
                </p>

                <div className="bg-paper-2 border-2 border-line p-3 font-sans text-12">
                  <span className="font-mono font-bold text-ink block mb-1">
                    RAPID CITIZEN VERIFICATION CHECKLIST:
                  </span>
                  <ul className="space-y-1 pl-4 list-disc text-ink-soft m-0">
                    {g.checklist.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Golden Hour Helpline Callout Box */}
        <div className="mt-14 case-card p-8 bg-card border-3 border-accent-red shadow-hard">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-2 font-mono text-12 font-bold text-accent-red uppercase mb-1">
                <PhoneCall className="w-4 h-4" />
                <span>CRUCIAL EMERGENCY PROTOCOL</span>
              </div>
              <h3 className="font-serif text-24 md:text-28 font-bold text-ink m-0 mb-2">
                What to do in the Golden Hour (First 2 Hours)
              </h3>
              <p className="font-sans text-14 text-ink-soft leading-relaxed m-0">
                If you made a payment or shared an OTP: (1) Immediately dial <strong>1930</strong>. (2) Provide your bank account number, beneficiary UPI ID/account, and transaction time. (3) 1930 coordinates directly with 250+ connected banks through the Citizen Financial Cyber Fraud Reporting System to freeze the fraudulent accounts before money is laundered.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href="tel:1930"
                className="btn-case btn-case-primary text-14 py-3 px-4 font-bold text-center"
              >
                Dial Helpline: 1930
              </a>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-case text-14 py-3 px-4 font-bold text-center bg-card flex items-center justify-center gap-1.5"
              >
                <span>cybercrime.gov.in ↗</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer language={language} />
    </div>
  );
}
