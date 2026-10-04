"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Award,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";
import { QuizQuestion } from "@/types";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    sender: "VK-SBIBNK (Unverified SMS)",
    message:
      "Dear Customer, your SBI account #XXXX4021 will be BLOCKED today. To prevent deactivation, update your PAN immediately at http://sbi-pan-update.top/auth or call 9876543210.",
    isScam: true,
    type: "Fake Bank KYC Phishing",
    explanation:
      "Classic panic tactic. Legitimate banks never threaten same-day account suspension via SMS or use disposable domains like .top. Official SBI portal is strictly 'onlinesbi.sbi'.",
    indicators: ["Same-day suspension threat", ".top disposable domain", "Personal 10-digit mobile number"],
  },
  {
    id: "q2",
    sender: "TSSPDCL-OFFICIAL",
    message:
      "Dear Consumer, payment of Rs 1,420.00 towards Electricity Bill for Service #882910 has been received successfully via BillDesk with TXN ID: 99120482. Official portal: https://tssouthernpower.com",
    isScam: false,
    type: "Legitimate Utility Payment Receipt",
    explanation:
      "Authentic payment acknowledgment. It confirms a completed transaction, includes a specific transaction ID, uses the verified state power distribution HTTPS domain, and asks for zero actions or passwords.",
    indicators: ["Verifiable transaction reference", "Official state utility domain", "Zero urgency or request for data"],
  },
  {
    id: "q3",
    sender: "HR Priyanka (WhatsApp +91-9128491023)",
    message:
      "Congratulations! Shortlisted for Amazon Remote Data Specialist. Earn Rs 2,500 daily. To dispatch your company laptop and ID, transfer mandatory Rs 1,499 registration bond fee via UPI to recruit-amazon@ybl.",
    isScam: true,
    type: "Work-From-Home Advance Fee Fraud",
    explanation:
      "Advance-fee scam. Real multinational corporations like Amazon never request candidates to pay registration fees or laptop security deposits over UPI.",
    indicators: ["Upfront registration fee demand", "Personal @ybl UPI handle", "Unrealistic daily payout for simple tasks"],
  },
  {
    id: "q4",
    sender: "+91-9840192834 (SMS)",
    message:
      "India Post: Your package #IN98234190 delivery was suspended due to incorrect house number. Pay pending Rs 5.00 re-attempt fee at https://indlapost-track.xyz before 7:00 PM.",
    isScam: true,
    type: "Postal Consignment Re-delivery Phishing",
    explanation:
      "Typosquatted domain phishing. Notice the spelling 'indlapost' with an 'l' instead of 'i' on a .xyz domain. The tiny Rs 5 fee is a psychological trap to make you enter credit card and OTP details.",
    indicators: ["Typosquatted domain (indlapost with 'l')", "Disposable .xyz domain", "Nominal Rs 5 bait fee"],
  },
  {
    id: "q5",
    sender: "HDFC-BANK (Authenticated SMS Header)",
    message:
      "Rs 450.00 debited from HDFC Bank A/C **8912 on 04-OCT-26 at SWIGGY BANGALORE. UPI Ref 427819201948. If not you, call 18002583838 or SMS BLOCK to 5676712.",
    isScam: false,
    type: "Legitimate Bank Debit Alert",
    explanation:
      "Authentic transactional debit alert. It provides an immediate toll-free number and verified shortcode (5676712) to block the card, without sending any suspicious external URLs.",
    indicators: ["Authentic bank shortcode", "No web link to harvest credentials", "Legitimate debit confirmation"],
  },
];

export const Quiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleAnswer = (choice: boolean) => {
    if (revealed) return;
    setSelectedAnswer(choice);
    setRevealed(true);
    if (choice === currentQ.isScam) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setRevealed(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setRevealed(false);
    setIsFinished(false);
  };

  const getRankStamp = (finalScore: number) => {
    if (finalScore === 5) return { title: "CHIEF FORENSIC INSPECTOR", color: "border-accent-red text-accent-red" };
    if (finalScore >= 4) return { title: "SPECIAL INVESTIGATOR", color: "border-accent-amber text-accent-amber" };
    if (finalScore >= 3) return { title: "FIELD DETECTIVE", color: "border-accent-olive text-accent-olive" };
    return { title: "CADET TRAINEE", color: "border-ink-soft text-ink-soft" };
  };

  return (
    <div className="case-card bg-card border-2 border-line shadow-hard p-6 md:p-8 relative max-w-2xl mx-auto">
      {/* Quiz Header */}
      <div className="flex items-center justify-between border-b-2 border-line pb-4 mb-6">
        <div>
          <span className="font-mono text-12 font-bold uppercase text-accent-red">
            PRACTICAL DEFENSE TRAINING DRILL
          </span>
          <h2 className="font-serif text-24 md:text-32 font-bold text-ink">
            Spot the Scam: Case Drills
          </h2>
        </div>
        {!isFinished && (
          <span className="font-mono text-14 font-bold border-2 border-line bg-paper px-3 py-1 shadow-hard-sm">
            CASE {currentIdx + 1} / {QUIZ_QUESTIONS.length}
          </span>
        )}
      </div>

      {!isFinished ? (
        <div>
          {/* Question / Case Message Ruled Paper */}
          <div className="border-2 border-line bg-card ruled-paper p-5 mb-6 font-mono text-14 text-ink shadow-hard-sm">
            <div className="text-12 font-bold text-ink-soft uppercase mb-2 border-b border-divider pb-1">
              INCOMING TRANSMISSION SENDER: {currentQ.sender}
            </div>
            <p className="leading-relaxed m-0">{currentQ.message}</p>
          </div>

          {/* Interactive Choices (Scam vs Safe) */}
          {!revealed ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => handleAnswer(true)}
                className="btn-case btn-case-primary py-4 text-16 font-bold flex items-center justify-center gap-2 shadow-hard"
              >
                <XCircle className="w-5 h-5 stroke-[2.5]" />
                <span>THIS IS A SCAM</span>
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className="btn-case py-4 text-16 font-bold flex items-center justify-center gap-2 bg-paper-2 hover:bg-card shadow-hard text-accent-green"
              >
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                <span>THIS IS SAFE</span>
              </button>
            </div>
          ) : (
            /* Reveal Dossier */
            <div className="space-y-4 mb-6">
              <div
                className={`p-4 border-2 ${
                  selectedAnswer === currentQ.isScam
                    ? "border-accent-green bg-accent-green/10"
                    : "border-accent-red bg-accent-red/10"
                }`}
              >
                <div className="flex items-center gap-2 font-mono text-14 font-bold mb-1">
                  {selectedAnswer === currentQ.isScam ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-accent-green" />
                      <span className="text-accent-green">CORRECT EVALUATION!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-accent-red" />
                      <span className="text-accent-red">INCORRECT VERDICT!</span>
                    </>
                  )}
                  <span className="text-ink-soft ml-auto font-normal">
                    Target: {currentQ.isScam ? "CONFIRMED SCAM" : "VERIFIED SAFE"}
                  </span>
                </div>
                <p className="font-sans text-14 text-ink leading-relaxed m-0 font-medium">
                  {currentQ.explanation}
                </p>
              </div>

              {/* Key Indicators */}
              <div className="bg-paper-2 border-2 border-line p-3 font-mono text-12">
                <span className="font-bold text-ink-soft block mb-1">
                  DETECTED FORENSIC SIGNALS:
                </span>
                <ul className="list-disc pl-4 space-y-0.5 text-ink">
                  {currentQ.indicators.map((ind, i) => (
                    <li key={i}>{ind}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNext}
                  className="btn-case btn-case-primary py-2.5 px-6 font-bold flex items-center gap-2"
                >
                  <span>
                    {currentIdx + 1 === QUIZ_QUESTIONS.length
                      ? "Complete Drill & View Rank"
                      : "Next Case Drill"}
                  </span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Finished State / Rank Stamp */
        <div className="text-center py-8">
          <div className="mb-6">
            <span className="font-mono text-14 font-bold text-ink-soft uppercase block mb-3">
              DRILL EVALUATION RESULTS
            </span>
            <div className="font-serif text-48 font-black text-ink mb-2">
              {score} / {QUIZ_QUESTIONS.length}
            </div>
            <p className="font-sans text-16 text-ink-soft max-w-md mx-auto">
              {score === 5
                ? "Perfect forensic detection. You identified every urgency trap, typosquat, and legitimate communication pattern."
                : score >= 3
                ? "Solid analytical awareness. Review the red flag breakdown to eliminate residual blind spots."
                : "High vulnerability to social engineering tactics. Please review the scam type guide cards below."}
            </p>
          </div>

          {/* Rank Rubber Stamp */}
          <div className="mb-8">
            <div
              className={`stamp-box border-4 ${
                getRankStamp(score).color
              } bg-card text-20 md:text-24 font-extrabold px-6 py-3 rotate-[-4deg] shadow-hard-sm`}
            >
              ★ {getRankStamp(score).title} ★
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="btn-case btn-case-primary py-3 px-6 font-bold flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Drill (New Attempt)</span>
          </button>
        </div>
      )}
    </div>
  );
};
