"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldAlert, Menu, X, PhoneCall, Volume2, VolumeX } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LanguageCode } from "@/types";
import { translations } from "@/lib/i18n";
import { getStoredLanguage, setStoredLanguage, getAudioMuted, setAudioMuted } from "@/lib/storage";

interface NavbarProps {
  language?: LanguageCode;
  onLanguageChange?: (lang: LanguageCode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language: propLang,
  onLanguageChange: propOnChange,
}) => {
  const pathname = usePathname();
  const [internalLang, setInternalLang] = useState<LanguageCode>("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setInternalLang(getStoredLanguage());
    setIsMuted(getAudioMuted());
  }, []);

  const activeLang = propLang || internalLang;
  const t = translations[activeLang] || translations.en;

  const handleLanguageChange = (lang: LanguageCode) => {
    setInternalLang(lang);
    setStoredLanguage(lang);
    if (propOnChange) {
      propOnChange(lang);
    }
  };

  const toggleAudio = () => {
    const next = !isMuted;
    setIsMuted(next);
    setAudioMuted(next);
  };

  const navLinks = [
    { href: "/#scanner-intake", label: t.nav.scan },
    { href: "/dashboard", label: t.nav.dashboard },
    { href: "/learn", label: t.nav.learn },
    { href: "/history", label: t.nav.history },
    { href: "/about", label: t.nav.about },
  ];

  return (
    <header className="sticky top-0 z-40 bg-paper border-b-2 border-line">
      {/* High-Authority Cybercrime Emergency Reminder Banner */}
      <div className="bg-[#FAF4E6] border-b-2 border-line py-1.5 px-3 sm:px-4 font-mono text-11 sm:text-12 text-ink shadow-sm">
        <div className="max-w-container mx-auto flex flex-col md:flex-row items-center justify-between gap-1.5 md:gap-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 font-bold">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 bg-accent-red text-white text-10 font-mono tracking-widest uppercase border border-ink shadow-[2px_2px_0px_#1B1B1B]">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              LIVE DISPATCH
            </span>
            <span className="tracking-tight text-ink font-mono font-bold">
              NATIONAL CYBER CRIME DESK // AP STATE CYBER CELL • TELANGANA TSCSB • DELHI POLICE IFSO
            </span>
            <span className="hidden lg:inline text-ink-soft font-normal text-11">
              // MHA & I4C NODE #2026-IN
            </span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <span className="hidden sm:inline font-mono text-11 text-ink-soft uppercase font-semibold">
              24x7 FRAUD FREEZE:
            </span>
            <a
              href="tel:1930"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-card border-2 border-line text-accent-red font-bold text-12 shadow-[2px_2px_0px_#1B1B1B] hover:bg-accent-red hover:text-white transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>DIAL 1930 (TOLL-FREE)</span>
            </a>
          </div>
        </div>
      </div>

      <nav className="max-w-container mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Wordmark Logo */}
        <Link href="/" className="flex items-center gap-2 focus-visible:outline-none group">
          <div className="flex items-center">
            <span className="font-serif text-24 md:text-32 font-bold tracking-tight text-ink">
              CyberShield
            </span>
            <span className="w-2.5 h-2.5 bg-accent-red ml-0.5 inline-block group-hover:scale-125 transition-transform" />
          </div>
          <span className="hidden sm:inline-block font-mono text-12 font-bold uppercase tracking-widest text-ink-soft border border-line px-1.5 py-0.5 bg-card ml-2">
            AI CASE DESK
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6 font-mono text-14 font-semibold text-ink">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`py-1 relative hover:text-accent-red transition-colors focus-visible:outline-none ${
                  isActive ? "text-accent-red border-b-2 border-accent-red font-bold" : "text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Controls: Audio mute, Language switcher, Emergency Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={toggleAudio}
            title={isMuted ? "Audio muted (click to unmute stamp sound)" : "Audio unmuted"}
            aria-label="Toggle sound effects"
            className="p-2 border-2 border-line bg-card shadow-hard-sm hover:translate-y-[-1px] transition-transform cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-ink-soft stroke-[2]" />
            ) : (
              <Volume2 className="w-4 h-4 text-accent-red stroke-[2]" />
            )}
          </button>

          <LanguageSwitcher
            currentLanguage={activeLang}
            onLanguageChange={handleLanguageChange}
          />

          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-case text-12 px-3 py-1.5 hidden md:inline-flex bg-card hover:bg-paper-2"
          >
            cybercrime.gov.in ↗
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher
            currentLanguage={activeLang}
            onLanguageChange={handleLanguageChange}
          />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="p-2 border-2 border-line bg-card shadow-hard-sm cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Paper Sheet Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[90px] z-50 bg-paper border-t-2 border-line p-6 flex flex-col justify-between overflow-y-auto lg:hidden">
          <div className="flex flex-col gap-5 pt-4">
            <span className="font-mono text-12 font-bold uppercase tracking-widest text-ink-soft">
              CASE DESK NAVIGATION
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-24 font-bold border-b-2 border-divider pb-2 text-ink hover:text-accent-red"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="border-t-2 border-line pt-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-14 text-ink-soft font-semibold">Sound FX</span>
              <button
                onClick={toggleAudio}
                className="btn-case text-12 py-1 px-3"
              >
                {isMuted ? "Sound: Off (Muted)" : "Sound: On"}
              </button>
            </div>
            <a
              href="tel:1930"
              className="btn-case btn-case-primary text-center font-bold text-16 py-3"
            >
              Emergency Helpline: 1930
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
