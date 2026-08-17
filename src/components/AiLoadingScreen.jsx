import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, BookOpen, BrainCircuit, CheckCircle2, AlertCircle } from 'lucide-react';

const GENERATION_STEPS = [
  'NCTB ১০ম শ্রেণির সর্বশেষ সিলেবাস ও অধ্যায় বিশ্লেষণ করা হচ্ছে...',
  'বিগত এসএসসি বোর্ড প্রশ্ন প্যাটার্ন ও ব্লুপ্রিন্ট রিসার্চ হচ্ছে...',
  'Gemini AI ইঞ্জিন দ্বারা নতুন বোর্ড স্ট্যান্ডার্ড MCQ ও বিশদ সমাধান তৈরি হচ্ছে...',
  'বহুপদী ও উদ্দীপকভিত্তিক প্রশ্নসমূহ সাজানো ও ভেরিফাই করা হচ্ছে...'
];

export default function AiLoadingScreen({ subject, onCancel, error, onRetry, onOpenSettings }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (error) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < GENERATION_STEPS.length - 1 ? prev + 1 : prev));
    }, 1800);

    return () => clearInterval(interval);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="glass-card rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 animate-fade-in relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        {error ? (
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                AI প্রশ্ন তৈরিতে সাময়িক সমস্যা হয়েছে
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                {error.includes('MISSING_API_KEY')
                  ? 'আপনার Gemini API Key সেট করা নেই। দয়া করে সেটিংস থেকে আপনার ফ্রি API Key প্রদান করুন।'
                  : error}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={onOpenSettings}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md"
              >
                API Key সেট করুন
              </button>
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  আবার চেষ্টা করুন
                </button>
              )}
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 hover:bg-slate-100"
              >
                বাতিল
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Animated AI Brain Icon */}
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-600 animate-pulse-fast opacity-75 blur-md" />
              <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl">
                <BrainCircuit className="w-10 h-10 animate-pulse" />
              </div>
            </div>

            {/* Subject and Title */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                {subject?.banglaName} (কোড: {subject?.code})
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                Gemini AI দিয়ে প্রশ্ন তৈরি হচ্ছে...
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                অন-ডিমান্ড ও নন-রিপিটিং ইউনিক বোর্ড স্ট্যান্ডার্ড প্রশ্ন সম্ভার
              </p>
            </div>

            {/* Step Progress List */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-left space-y-2.5">
              {GENERATION_STEPS.map((step, idx) => {
                const isDone = idx < currentStep;
                const isCurrent = idx === currentStep;

                return (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5 animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 shrink-0 mt-0.5" />
                    )}
                    <span className={isCurrent ? 'font-bold text-indigo-600 dark:text-indigo-400' : isDone ? 'text-slate-600 dark:text-slate-400' : 'text-slate-400 dark:text-slate-600'}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={onCancel}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              বাতিল করে ফিরে যান
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
