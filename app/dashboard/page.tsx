"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CategoryDonutChart, ThreatTrendLineChart, IndiaStateThreatChart } from "@/components/Charts";
import { SEED_DASHBOARD_DATA } from "@/lib/seedData";
import { getScanHistory, getStoredLanguage, setStoredLanguage } from "@/lib/storage";
import { LanguageCode, AnalysisResult } from "@/types";
import { ShieldAlert, TrendingUp, AlertTriangle, CheckCircle, BarChart3, MapPin } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [history, setHistory] = useState<AnalysisResult[]>([]);

  useEffect(() => {
    setLanguage(getStoredLanguage());
    setHistory(getScanHistory());
  }, []);

  const totalUserScans = history.length;
  const dangerousCount = history.filter((h) => h.verdict === "DANGEROUS").length;
  const avgRisk =
    history.length > 0
      ? Math.round(history.reduce((acc, h) => acc + h.riskScore, 0) / history.length)
      : 76;

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
        {/* Dashboard Dossier Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-line pb-3 sm:pb-4 mb-6 sm:mb-8 gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 bg-accent-red shrink-0" />
              <span className="font-mono text-11 sm:text-12 font-bold tracking-widest text-accent-red uppercase truncate max-w-[260px] sm:max-w-none">
                NATIONAL THREAT INTELLIGENCE DESK // CITIZEN SURVEILLANCE
              </span>
            </div>
            <h1 className="font-serif text-24 sm:text-36 md:text-48 font-bold text-ink m-0">
              Scam & Threat Intelligence Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="stamp-box border-accent-red text-accent-red font-bold text-11 sm:text-12 py-1 px-2.5">
              ACTIVE DEFENSE
            </span>
            <Link href="/#scanner-intake" className="btn-case btn-case-primary text-12 py-2 px-3 font-bold">
              New Investigation
            </Link>
          </div>
        </div>

        {/* Stat Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="case-card p-5 bg-card">
            <span className="font-mono text-12 font-bold text-ink-soft uppercase block mb-1">
              TOTAL SCANS LOGGED
            </span>
            <div className="font-serif text-36 font-black text-ink">
              {(SEED_DASHBOARD_DATA.totalScans + totalUserScans).toLocaleString()}
            </div>
            <div className="font-mono text-11 text-accent-green mt-1 flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% this week across India</span>
            </div>
          </div>

          <div className="case-card p-5 bg-card">
            <span className="font-mono text-12 font-bold text-ink-soft uppercase block mb-1">
              DANGEROUS SCAMS INTERCEPTED
            </span>
            <div className="font-serif text-36 font-black text-accent-red">
              {(SEED_DASHBOARD_DATA.scamsBlocked + dangerousCount).toLocaleString()}
            </div>
            <div className="font-mono text-11 text-ink-soft mt-1 font-semibold">
              Blocked before financial debit
            </div>
          </div>

          <div className="case-card p-5 bg-card">
            <span className="font-mono text-12 font-bold text-ink-soft uppercase block mb-1">
              NATIONAL AVERAGE RISK INDEX
            </span>
            <div className="font-serif text-36 font-black text-accent-amber">
              {avgRisk} <span className="text-18 font-normal text-ink-soft">/ 100</span>
            </div>
            <div className="font-mono text-11 text-ink-soft mt-1 font-semibold">
              Severity category: Elevated Threat
            </div>
          </div>

          <div className="case-card p-5 bg-card">
            <span className="font-mono text-12 font-bold text-ink-soft uppercase block mb-1">
              GOLDEN HOUR RECOVERIES (1930)
            </span>
            <div className="font-serif text-36 font-black text-accent-green">
              ₹ 24.8 Cr
            </div>
            <div className="font-mono text-11 text-ink-soft mt-1 font-semibold">
              Recovered within 2h of incident report
            </div>
          </div>
        </div>

        {/* Charts Section: Donut & Line */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          {/* Donut Chart: Scam Categories */}
          <div className="lg:col-span-5 case-card p-6 bg-card">
            <div className="flex items-center justify-between border-b-2 border-divider pb-3 mb-4">
              <span className="font-serif text-18 font-bold text-ink">
                Scam Modus Breakdown
              </span>
              <span className="font-mono text-11 font-bold text-ink-soft uppercase">
                DISTRIBUTION
              </span>
            </div>
            <CategoryDonutChart data={SEED_DASHBOARD_DATA.categories} />
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-divider font-mono text-11">
              {SEED_DASHBOARD_DATA.categories.slice(0, 4).map((c, i) => (
                <div key={i} className="flex items-center justify-between text-ink-soft">
                  <span className="truncate pr-1">• {c.name}</span>
                  <span className="font-bold text-ink">{c.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Line Chart: Threat Volume Trend */}
          <div className="lg:col-span-7 case-card p-6 bg-card">
            <div className="flex items-center justify-between border-b-2 border-divider pb-3 mb-4">
              <div>
                <span className="font-serif text-18 font-bold text-ink block">
                  7-Day Incident Velocity
                </span>
                <span className="font-sans text-12 text-ink-soft">
                  Black line = Total incoming scans | Red line = Verified scam threats
                </span>
              </div>
              <span className="stamp-box border-line text-ink font-bold text-11">
                HOURLY SYNC
              </span>
            </div>
            <ThreatTrendLineChart data={SEED_DASHBOARD_DATA.trend} />
          </div>
        </div>

        {/* India State-Wise Threat Bar Section */}
        <div className="case-card p-6 bg-card mb-10">
          <div className="flex flex-wrap items-center justify-between border-b-2 border-divider pb-3 mb-6 gap-2">
            <div>
              <div className="flex items-center gap-1.5 font-mono text-12 font-bold text-accent-red mb-0.5">
                <MapPin className="w-4 h-4" />
                <span>STATE-LEVEL CYBER DEFENSE MONITOR</span>
              </div>
              <h2 className="font-serif text-22 font-bold text-ink m-0">
                Top Affected Regions in India
              </h2>
            </div>
            <span className="font-mono text-12 text-ink-soft">
              DATASET: NATIONAL CYBERCRIME REPORTING PORTAL
            </span>
          </div>

          <IndiaStateThreatChart data={SEED_DASHBOARD_DATA.stateData} />
        </div>

        {/* Recent Investigations Table */}
        <div className="case-card p-6 bg-card">
          <div className="flex items-center justify-between border-b-2 border-divider pb-3 mb-4">
            <span className="font-serif text-18 font-bold text-ink">
              Recent Case Intercepts
            </span>
            <Link
              href="/history"
              className="font-mono text-12 font-bold text-ink underline hover:text-accent-red"
            >
              View Full Archive ({history.length}) →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-12 border-collapse">
              <thead>
                <tr className="border-b-2 border-line bg-paper-2">
                  <th className="p-3">CASE ID</th>
                  <th className="p-3">TIMESTAMP</th>
                  <th className="p-3">VERDICT</th>
                  <th className="p-3">RISK SCORE</th>
                  <th className="p-3">CATEGORY</th>
                  <th className="p-3">SUSPECT LINK / HEADER</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-divider">
                {history.slice(0, 5).map((caseItem) => (
                  <tr key={caseItem.id} className="hover:bg-paper-2/50 transition-colors">
                    <td className="p-3 font-bold text-ink">{caseItem.id}</td>
                    <td className="p-3 text-ink-soft">
                      {new Date(caseItem.timestamp).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 font-bold uppercase ${
                          caseItem.verdict === "DANGEROUS"
                            ? "bg-accent-red text-white"
                            : caseItem.verdict === "SUSPICIOUS"
                            ? "bg-accent-amber text-white"
                            : "bg-accent-green text-white"
                        }`}
                      >
                        {caseItem.verdict}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-ink">{caseItem.riskScore}/100</td>
                    <td className="p-3 font-sans text-ink">{caseItem.category}</td>
                    <td className="p-3 text-accent-red truncate max-w-xs">
                      {caseItem.reportSummary?.suspectContactOrLink || "Identified"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer language={language} />
    </div>
  );
}
