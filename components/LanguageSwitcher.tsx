"use client";

import React from "react";
import { LanguageCode } from "@/types";

interface LanguageSwitcherProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  const languages: { code: LanguageCode; label: string; sub: string }[] = [
    { code: "en", label: "EN", sub: "English" },
    { code: "te", label: "తెలుగు", sub: "Telugu" },
    { code: "hi", label: "हिन्दी", sub: "Hindi" },
  ];

  return (
    <div
      role="group"
      aria-label="Language selection"
      className="inline-flex items-center border-2 border-line bg-paper-2 p-0.5 shadow-hard-sm"
    >
      {languages.map((item) => {
        const isActive = currentLanguage === item.code;
        return (
          <button
            key={item.code}
            onClick={() => onLanguageChange(item.code)}
            aria-pressed={isActive}
            className={`px-2 sm:px-3 py-1 text-11 sm:text-12 font-mono font-bold transition-colors cursor-pointer min-h-[34px] sm:min-h-[36px] flex items-center justify-center ${
              isActive
                ? "bg-card text-ink border-2 border-line shadow-hard-sm"
                : "text-ink-soft hover:text-ink border-2 border-transparent"
            }`}
          >
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
