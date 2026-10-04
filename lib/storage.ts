import { AnalysisResult, LanguageCode } from "@/types";
import { SEED_HISTORY } from "./seedData";

const STORAGE_KEYS = {
  HISTORY: "cybershield_history_v1",
  LANGUAGE: "cybershield_lang_v1",
  AUDIO_MUTED: "cybershield_audio_muted_v1",
};

export function getStoredLanguage(): LanguageCode {
  if (typeof window === "undefined") return "en";
  try {
    const lang = localStorage.getItem(STORAGE_KEYS.LANGUAGE) as LanguageCode | null;
    if (lang === "en" || lang === "te" || lang === "hi") {
      return lang;
    }
  } catch (e) {
    console.error("Storage error:", e);
  }
  return "en";
}

export function setStoredLanguage(lang: LanguageCode): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  } catch (e) {
    console.error("Storage error:", e);
  }
}

export function getAudioMuted(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const val = localStorage.getItem(STORAGE_KEYS.AUDIO_MUTED);
    return val !== "false"; // Default muted (true)
  } catch {
    return true;
  }
}

export function setAudioMuted(muted: boolean): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.AUDIO_MUTED, muted ? "true" : "false");
  } catch (e) {
    console.error("Storage error:", e);
  }
}

export function getScanHistory(): AnalysisResult[] {
  if (typeof window === "undefined") return SEED_HISTORY;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(SEED_HISTORY));
      return SEED_HISTORY;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SEED_HISTORY;
  } catch (e) {
    console.error("Storage error:", e);
    return SEED_HISTORY;
  }
}

export function saveScanToHistory(scan: AnalysisResult): void {
  if (typeof window === "undefined") return;
  try {
    const current = getScanHistory();
    // Prepend new scan, remove duplicate id if present
    const updated = [scan, ...current.filter((s) => s.id !== scan.id)].slice(0, 50);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
  } catch (e) {
    console.error("Storage error:", e);
  }
}

export function deleteScanFromHistory(id: string): AnalysisResult[] {
  if (typeof window === "undefined") return [];
  try {
    const current = getScanHistory();
    const updated = current.filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Storage error:", e);
    return [];
  }
}

export function clearAllHistory(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  } catch (e) {
    console.error("Storage error:", e);
  }
}
