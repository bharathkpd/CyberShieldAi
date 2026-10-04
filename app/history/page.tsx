"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CaseReport } from "@/components/CaseReport";
import { ToastProvider, useToast } from "@/components/Toast";
import {
  getScanHistory,
  deleteScanFromHistory,
  clearAllHistory,
  getStoredLanguage,
  setStoredLanguage,
} from "@/lib/storage";
import { AnalysisResult, LanguageCode, VerdictType } from "@/types";
import {
  Search,
  Trash2,
  ExternalLink,
  RotateCcw,
  AlertTriangle,
  FolderArchive,
  X,
  FileSearch,
} from "lucide-react";
import Link from "next/link";

function HistoryContent() {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVerdict, setSelectedVerdict] = useState<string>("ALL");
  const [selectedCase, setSelectedCase] = useState<AnalysisResult | null>(null);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  const { success, warning } = useToast();

  useEffect(() => {
    setLanguage(getStoredLanguage());
    setHistory(getScanHistory());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteScanFromHistory(id);
    setHistory(updated);
    if (selectedCase?.id === id) {
      setSelectedCase(null);
    }
    warning("Case Deleted", `Case #${id} was purged from your local device.`);
  };

  const handleClearAll = () => {
    clearAllHistory();
    setHistory([]);
    setSelectedCase(null);
    setConfirmClearOpen(false);
    success("Archives Cleared", "All local forensic case records were removed.");
  };

  const filteredHistory = history.filter((c) => {
    const matchesFilter =
      selectedVerdict === "ALL" || c.verdict === selectedVerdict;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      c.id.toLowerCase().includes(query) ||
      c.category.toLowerCase().includes(query) ||
      c.rawInput.toLowerCase().includes(query) ||
      (c.reportSummary?.suspectContactOrLink || "").toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-line pb-3 sm:pb-4 mb-6 sm:mb-8 gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 bg-accent-red shrink-0" />
              <span className="font-mono text-11 sm:text-12 font-bold tracking-widest text-accent-red uppercase truncate max-w-[260px] sm:max-w-none">
                LOCAL EVIDENCE REPOSITORY // LOCALSTORAGE PERSISTENT
              </span>
            </div>
            <h1 className="font-serif text-24 sm:text-36 md:text-48 font-bold text-ink m-0">
              Investigation Case Archives
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {history.length > 0 && (
              <button
                onClick={() => setConfirmClearOpen(true)}
                className="btn-case text-12 py-2 px-3 text-accent-red hover:bg-accent-red hover:text-white"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All Records</span>
              </button>
            )}
            <Link
              href="/#scanner-intake"
              className="btn-case btn-case-primary text-12 py-2 px-3 font-bold"
            >
              Scan New Evidence
            </Link>
          </div>
        </div>

        {/* Selected Case Modal / Dossier View */}
        {selectedCase && (
          <div className="mb-10">
            <div className="flex items-center justify-between bg-paper-2 border-2 border-line p-3 mb-2">
              <span className="font-mono text-12 font-bold text-ink flex items-center gap-2">
                <FileSearch className="w-4 h-4 text-accent-red" />
                <span>INSPECTING ARCHIVED DOSSIER: #{selectedCase.id}</span>
              </span>
              <button
                onClick={() => setSelectedCase(null)}
                className="btn-case text-11 py-1 px-2.5 bg-card"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close Inspector</span>
              </button>
            </div>
            <CaseReport
              result={selectedCase}
              language={language}
              onReset={() => setSelectedCase(null)}
            />
          </div>
        )}

        {/* Search & Filters */}
        <div className="case-card p-4 bg-card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Box */}
            <div className="md:col-span-8 flex items-center border-2 border-line bg-paper-2 px-3 py-2">
              <Search className="w-4 h-4 text-ink-soft mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Case ID, category, suspect domain, or phrase..."
                className="w-full bg-transparent font-mono text-13 text-ink focus-visible:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-ink-soft hover:text-ink text-12 font-mono"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Verdict Filter Buttons */}
            <div className="md:col-span-4 flex items-center justify-start md:justify-end gap-1.5 font-mono text-12">
              {["ALL", "DANGEROUS", "SUSPICIOUS", "SAFE"].map((v) => (
                <button
                  key={v}
                  onClick={() => setSelectedVerdict(v)}
                  className={`px-2.5 py-1.5 border-2 font-bold cursor-pointer transition-colors ${
                    selectedVerdict === v
                      ? "bg-ink text-paper border-line"
                      : "bg-paper-2 text-ink-soft border-divider hover:border-ink"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Case List */}
        {filteredHistory.length > 0 ? (
          <div className="space-y-4">
            {filteredHistory.map((item) => {
              const isDanger = item.verdict === "DANGEROUS";
              const isSuspicious = item.verdict === "SUSPICIOUS";

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedCase(item)}
                  className="case-card p-5 bg-card hover:bg-paper-2/40 transition-all cursor-pointer relative"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-divider pb-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-13 font-bold bg-ink text-paper px-2 py-0.5">
                        CASE #{item.id}
                      </span>
                      <span className="font-mono text-12 text-ink-soft">
                        {new Date(item.timestamp).toLocaleDateString()} at{" "}
                        {new Date(item.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span className="font-mono text-11 text-ink-soft uppercase border border-line px-1.5 bg-paper">
                        {item.inputType}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-12 font-bold px-2.5 py-0.5 uppercase ${
                          isDanger
                            ? "bg-accent-red text-white"
                            : isSuspicious
                            ? "bg-accent-amber text-white"
                            : "bg-accent-green text-white"
                        }`}
                      >
                        {item.verdict} // {item.riskScore}
                      </span>
                      <button
                        onClick={(e) => handleDelete(item.id, e)}
                        className="text-ink-soft hover:text-accent-red p-1 cursor-pointer"
                        title="Delete this record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-9">
                      <h3 className="font-serif text-18 font-bold text-ink mb-1">
                        {item.category}
                      </h3>
                      <p className="font-mono text-13 text-ink-soft line-clamp-2 m-0">
                        "{item.rawInput}"
                      </p>
                    </div>

                    <div className="md:col-span-3 flex justify-start md:justify-end">
                      <span className="btn-case text-12 py-1.5 px-3 bg-paper-2 font-bold flex items-center gap-1.5">
                        <span>Inspect Dossier</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-line bg-card p-8">
            <FolderArchive className="w-12 h-12 text-ink-soft mx-auto mb-3" />
            <h3 className="font-serif text-20 font-bold text-ink mb-1">
              No Cases Match Your Query
            </h3>
            <p className="font-sans text-14 text-ink-soft max-w-sm mx-auto mb-6">
              {history.length === 0
                ? "Your local investigation archives are currently empty. Run your first scam analysis now."
                : "No archived dossiers matched your search keywords or verdict filter."}
            </p>
            <Link
              href="/#scanner-intake"
              className="btn-case btn-case-primary text-13 py-2 px-4 font-bold"
            >
              Analyze New Evidence
            </Link>
          </div>
        )}

        {/* Clear All Confirmation Modal */}
        {confirmClearOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-none">
            <div className="case-card p-6 bg-card max-w-md w-full">
              <div className="flex items-center gap-2 text-accent-red mb-3">
                <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
                <h3 className="font-serif text-20 font-bold text-ink m-0">
                  Purge All Investigation Records?
                </h3>
              </div>
              <p className="font-sans text-14 text-ink-soft leading-relaxed mb-6">
                This will delete all saved case reports from your browser's localStorage. This operation cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmClearOpen(false)}
                  className="btn-case text-13 py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearAll}
                  className="btn-case btn-case-primary text-13 py-2 px-4 font-bold"
                >
                  Yes, Delete All
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer language={language} />
    </div>
  );
}

export default function HistoryPage() {
  return (
    <ToastProvider>
      <HistoryContent />
    </ToastProvider>
  );
}
