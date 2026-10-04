"use client";

import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Scanner } from "@/components/Scanner";
import { ScanAnimation } from "@/components/ScanAnimation";
import { CaseReport } from "@/components/CaseReport";
import { Footer } from "@/components/Footer";
import { ToastProvider, useToast } from "@/components/Toast";
import { AnalysisResult, LanguageCode, ScanInputType } from "@/types";
import { getStoredLanguage, setStoredLanguage, saveScanToHistory } from "@/lib/storage";
import { SampleCase } from "@/lib/sampleScams";
import { ArrowRight, Shield, AlertTriangle, FileCheck, CheckCircle2 } from "lucide-react";

function HomeContent() {
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [isScanning, setIsScanning] = useState(false);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const { error: toastError, success: toastSuccess } = useToast();

  const scannerRef = useRef<HTMLDivElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLanguage(getStoredLanguage());
  }, []);

  const handleLanguageChange = (lang: LanguageCode) => {
    setLanguage(lang);
    setStoredLanguage(lang);
  };

  const scrollToScanner = () => {
    scannerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAnalyze = async (type: ScanInputType, content: string) => {
    setIsScanning(true);
    setCurrentResult(null);

    // Scroll to scanning area
    setTimeout(() => {
      scannerRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, content, language }),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || "Analysis failed");
      }

      const data: AnalysisResult = await res.json();
      setCurrentResult(data);
      saveScanToHistory(data);
      toastSuccess("Forensic Scan Complete", `Verdict: ${data.verdict} (${data.riskScore}/100)`);

      // Smooth scroll into Case Report
      setTimeout(() => {
        reportRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 250);
    } catch (err: any) {
      console.error(err);
      toastError("Scan Error", err.message || "Failed to analyze input. Please try again.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleResetScan = () => {
    setCurrentResult(null);
    scrollToScanner();
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
      />

      <main className="flex-1">
        {/* Asymmetric Hero with Evidence Card */}
        <Hero
          language={language}
          onStartClick={scrollToScanner}
          onSampleClick={scrollToScanner}
        />

        {/* Scanner & Live Analysis Section */}
        <div ref={scannerRef} className="max-w-container mx-auto px-3 sm:px-4 md:px-8 py-6 sm:py-12">
          <Scanner
            language={language}
            onAnalyze={handleAnalyze}
            isLoading={isScanning}
          />

          {/* Scanning In Progress State */}
          {isScanning && <ScanAnimation language={language} />}

          {/* Case Report Results Dossier */}
          {currentResult && (
            <div ref={reportRef}>
              <CaseReport
                result={currentResult}
                language={language}
                onReset={handleResetScan}
              />
            </div>
          )}
        </div>

        {/* How It Works: Numbered Evidence Tags */}
        <section className="border-t-2 border-b-2 border-line bg-paper-2 py-10 sm:py-16 md:py-24">
          <div className="max-w-container mx-auto px-3 sm:px-4 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
              <span className="font-mono text-11 sm:text-12 font-bold tracking-widest text-accent-red uppercase">
                INVESTIGATION PROCEDURE
              </span>
              <h2 className="font-serif text-26 sm:text-36 md:text-48 font-bold text-ink mt-1 sm:mt-2">
                How CyberShield Dissects Scams
              </h2>
              <p className="font-sans text-14 sm:text-16 text-ink-soft mt-2 sm:mt-3">
                Three rigorous forensic steps designed to shield Indian citizens from financial fraud and credential theft.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {/* Step 1 */}
              <div className="case-card p-4 sm:p-6 bg-card relative">
                <div className="flex items-center justify-between border-b-2 border-divider pb-3 mb-4">
                  <span className="stamp-box border-accent-red text-accent-red text-14 font-bold">
                    TAG 01
                  </span>
                  <span className="font-mono text-12 text-ink-soft font-bold">
                    INTAKE PHASE
                  </span>
                </div>
                <h3 className="font-serif text-22 font-bold text-ink mb-2">
                  Paste Suspicious Evidence
                </h3>
                <p className="font-sans text-14 text-ink-soft leading-relaxed">
                  Submit any suspicious SMS, WhatsApp forward, bank warning, job contract, payment link, or upload a screenshot/QR code.
                </p>
              </div>

              {/* Step 2 */}
              <div className="case-card p-6 bg-card relative">
                <div className="flex items-center justify-between border-b-2 border-divider pb-3 mb-4">
                  <span className="stamp-box border-accent-amber text-accent-amber text-14 font-bold">
                    TAG 02
                  </span>
                  <span className="font-mono text-12 text-ink-soft font-bold">
                    FORENSIC AUDIT
                  </span>
                </div>
                <h3 className="font-serif text-22 font-bold text-ink mb-2">
                  Dual-Engine Dissection
                </h3>
                <p className="font-sans text-14 text-ink-soft leading-relaxed">
                  Our system evaluates psychological pressure tactics, brand typosquats (paypa1, sbi-kyc), bad TLDs, and cross-checks with known Indian fraud families.
                </p>
              </div>

              {/* Step 3 */}
              <div className="case-card p-6 bg-card relative">
                <div className="flex items-center justify-between border-b-2 border-divider pb-3 mb-4">
                  <span className="stamp-box border-accent-green text-accent-green text-14 font-bold">
                    TAG 03
                  </span>
                  <span className="font-mono text-12 text-ink-soft font-bold">
                    DEFENSE SHIELD
                  </span>
                </div>
                <h3 className="font-serif text-22 font-bold text-ink mb-2">
                  1-Tap Action & Report
                </h3>
                <p className="font-sans text-14 text-ink-soft leading-relaxed">
                  Get a risk verdict, generate a vernacular WhatsApp warning card for parents, and export a ready-to-file police complaint for 1930 and cybercrime.gov.in.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Scam Types Grid with Forensic Defense Tips */}
        <section className="py-10 sm:py-16 md:py-24 bg-paper">
          <div className="max-w-container mx-auto px-3 sm:px-4 md:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-12 gap-2 sm:gap-4">
              <div>
                <span className="font-mono text-11 sm:text-12 font-bold tracking-widest text-accent-red uppercase">
                  INTELLIGENCE BULLETIN
                </span>
                <h2 className="font-serif text-24 sm:text-36 md:text-48 font-bold text-ink mt-1 sm:mt-2">
                  Top 6 Modus Operandi in India
                </h2>
              </div>
              <span className="font-mono text-11 sm:text-12 text-ink-soft font-bold">
                SOURCE: I4C & INDIAN CYBER POLICE DATA
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Card 1 */}
              <div className="p-4 sm:p-6 border-2 border-line bg-card shadow-hard-sm">
                <div className="font-mono text-11 sm:text-12 font-bold text-accent-red mb-1">
                  01 // BANKING & PAN DEACTIVATION
                </div>
                <h3 className="font-serif text-18 font-bold text-ink mb-2">
                  Fake KYC / Electricity Threats
                </h3>
                <p className="font-sans text-13 text-ink-soft mb-3 leading-relaxed">
                  Threatens electricity disconnection at 9:30 PM or bank account freeze within hours unless an APK is installed.
                </p>
                <div className="border-t border-divider pt-2 font-mono text-11 text-accent-red font-semibold">
                  DEFENSE: Legitimate power boards NEVER send mobile numbers for bill clearance.
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-6 border-2 border-line bg-card shadow-hard-sm">
                <div className="font-mono text-12 font-bold text-accent-red mb-1">
                  02 // PART-TIME RECRUITMENT
                </div>
                <h3 className="font-serif text-18 font-bold text-ink mb-2">
                  Work-From-Home Task Fraud
                </h3>
                <p className="font-sans text-13 text-ink-soft mb-3 leading-relaxed">
                  Telegram/WhatsApp offers to review hotels or like YouTube videos for Rs 3,000/day, demanding a prepaid bond fee.
                </p>
                <div className="border-t border-divider pt-2 font-mono text-11 text-accent-red font-semibold">
                  DEFENSE: Any job requiring YOU to transfer money first is 100% fraud.
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-6 border-2 border-line bg-card shadow-hard-sm">
                <div className="font-mono text-12 font-bold text-accent-red mb-1">
                  03 // POSTAL CONSIGNMENT
                </div>
                <h3 className="font-serif text-18 font-bold text-ink mb-2">
                  India Post Delivery Failed
                </h3>
                <p className="font-sans text-13 text-ink-soft mb-3 leading-relaxed">
                  Fake SMS claiming a package is delayed, asking for a nominal Rs 5 redelivery fee to harvest card numbers and OTPs.
                </p>
                <div className="border-t border-divider pt-2 font-mono text-11 text-accent-red font-semibold">
                  DEFENSE: India Post only uses indiapost.gov.in. Never enter OTPs on .xyz links.
                </div>
              </div>

              {/* Card 4 */}
              <div className="p-6 border-2 border-line bg-card shadow-hard-sm">
                <div className="font-mono text-12 font-bold text-accent-red mb-1">
                  04 // LOTTERY & KBC PRIZES
                </div>
                <h3 className="font-serif text-18 font-bold text-ink mb-2">
                  Sim Card Lucky Draw
                </h3>
                <p className="font-sans text-13 text-ink-soft mb-3 leading-relaxed">
                  Celebrity images and letters claiming 25 Lakh winnings, demanding "GST tax" or "customs duty" payments.
                </p>
                <div className="border-t border-divider pt-2 font-mono text-11 text-accent-red font-semibold">
                  DEFENSE: You cannot win a lottery you never bought a ticket for.
                </div>
              </div>

              {/* Card 5 */}
              <div className="p-6 border-2 border-line bg-card shadow-hard-sm">
                <div className="font-mono text-12 font-bold text-accent-red mb-1">
                  05 // DIGITAL ARREST
                </div>
                <h3 className="font-serif text-18 font-bold text-ink mb-2">
                  Police & Customs Video Threat
                </h3>
                <p className="font-sans text-13 text-ink-soft mb-3 leading-relaxed">
                  Callers posing as CBI or Mumbai Police claiming drugs or illegal passports found in your parcel, staging fake video courtrooms.
                </p>
                <div className="border-t border-divider pt-2 font-mono text-11 text-accent-red font-semibold">
                  DEFENSE: There is NO legal provision for "digital arrest" via Skype/WhatsApp in India.
                </div>
              </div>

              {/* Card 6 */}
              <div className="p-6 border-2 border-line bg-card shadow-hard-sm">
                <div className="font-mono text-12 font-bold text-accent-green mb-1">
                  06 // STATE HELPLINE RAPID RESPONSE
                </div>
                <h3 className="font-serif text-18 font-bold text-ink mb-2">
                  The Golden Hour Rule (1930)
                </h3>
                <p className="font-sans text-13 text-ink-soft mb-3 leading-relaxed">
                  If funds are debited from your bank or UPI, reporting within 2 hours allows 1930 to freeze the mule accounts in real time.
                </p>
                <div className="border-t border-divider pt-2 font-mono text-11 text-accent-green font-semibold">
                  ACTION: Keep transaction IDs, beneficiary UPI IDs, and call 1930 immediately.
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer language={language} />
    </div>
  );
}

export default function Home() {
  return (
    <ToastProvider>
      <HomeContent />
    </ToastProvider>
  );
}
