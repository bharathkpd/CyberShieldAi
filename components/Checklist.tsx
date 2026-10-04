"use client";

import React, { useState } from "react";
import { CheckSquare, Square, CheckCheck } from "lucide-react";

interface ChecklistProps {
  items: string[];
}

export const Checklist: React.FC<ChecklistProps> = ({ items }) => {
  const [checkedState, setCheckedState] = useState<Record<number, boolean>>({});

  const toggleCheck = (idx: number) => {
    setCheckedState((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const completedCount = Object.values(checkedState).filter(Boolean).length;
  const totalCount = items.length;

  return (
    <div className="border-2 border-line bg-card shadow-hard p-6">
      <div className="flex flex-wrap items-center justify-between border-b-2 border-line pb-3 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <CheckCheck className="w-5 h-5 text-accent-red" />
          <h3 className="font-serif text-18 font-bold text-ink m-0">
            EMERGENCY DEFENSE PROTOCOL (STEP-BY-STEP)
          </h3>
        </div>
        <span className="font-mono text-12 font-bold px-2.5 py-0.5 border border-line bg-paper">
          PROGRESS: {completedCount} / {totalCount} ACTIONS TAKEN
        </span>
      </div>

      <div className="space-y-2.5">
        {items.map((action, idx) => {
          const isDone = !!checkedState[idx];
          return (
            <button
              key={idx}
              onClick={() => toggleCheck(idx)}
              className={`w-full p-3 border-2 transition-all flex items-start gap-3 text-left cursor-pointer ${
                isDone
                  ? "border-divider bg-paper-2/60 text-ink-soft"
                  : "border-line bg-card hover:bg-paper-2 text-ink shadow-hard-sm"
              }`}
            >
              <div className="mt-0.5 text-accent-red shrink-0">
                {isDone ? (
                  <CheckSquare className="w-5 h-5 text-accent-green" />
                ) : (
                  <Square className="w-5 h-5 text-ink-soft" />
                )}
              </div>
              <span
                className={`font-sans text-14 leading-snug flex-1 ${
                  isDone ? "line-through opacity-70" : "font-semibold"
                }`}
              >
                {action}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
