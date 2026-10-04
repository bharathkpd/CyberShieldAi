"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";

type ToastType = "success" | "warning" | "error" | "info";

interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  toast: (title: string, message?: string, type?: ToastType) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (title: string, message?: string, type: ToastType = "info") => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, message, type }]);

      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  const contextValue: ToastContextType = {
    toast: addToast,
    success: (title, msg) => addToast(title, msg, "success"),
    error: (title, msg) => addToast(title, msg, "error"),
    warning: (title, msg) => addToast(title, msg, "warning"),
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto bg-card border-2 border-line shadow-hard p-4 flex items-start gap-3 relative rounded-none"
            >
              <div className="mt-0.5">
                {t.type === "success" && <CheckCircle2 className="w-5 h-5 text-accent-green" />}
                {t.type === "warning" && <AlertTriangle className="w-5 h-5 text-accent-amber" />}
                {t.type === "error" && <XCircle className="w-5 h-5 text-accent-red" />}
                {t.type === "info" && <Info className="w-5 h-5 text-ink" />}
              </div>
              <div className="flex-1 pr-3">
                <p className="font-serif font-bold text-14 text-ink leading-tight">{t.title}</p>
                {t.message && (
                  <p className="font-sans text-12 text-ink-soft mt-1 leading-snug">{t.message}</p>
                )}
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="text-ink-soft hover:text-ink cursor-pointer p-1"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
