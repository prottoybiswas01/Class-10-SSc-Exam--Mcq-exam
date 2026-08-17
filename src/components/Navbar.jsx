import React from 'react';
import { 
  GraduationCap, 
  Moon, 
  Sun, 
  History, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  HelpCircle,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function Navbar({ 
  darkMode, 
  setDarkMode, 
  soundEnabled, 
  setSoundEnabled, 
  currentScreen, 
  onGoHome, 
  onOpenHistory,
  onOpenInfo
}) {
  const toggleSound = () => {
    const newState = soundManager.toggleSound(!soundEnabled);
    setSoundEnabled(newState);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left Brand Section */}
        <div className="flex items-center gap-3">
          {currentScreen !== 'dashboard' && (
            <button
              onClick={onGoHome}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-sm font-semibold"
              title="মূল পাতায় ফিরুন"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">হোম</span>
            </button>
          )}

          <div 
            onClick={onGoHome}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-700 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
                  এসএসসি MCQ এক্সাম
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  ২৩টি বিষয়
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden md:block">
                NCTB সিলেবাসভুক্ত পূর্ণাঙ্গ প্রস্তুতি ও মডেল টেস্ট
              </p>
            </div>
          </div>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Official NCTB Link */}
          <a
            href="https://nctb.gov.bd/pages/static-pages/695b99afc4774958d7b70612"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="NCTB ১০ম শ্রেণির পাঠ্যবই"
          >
            <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden md:inline">NCTB পাঠ্যবই</span>
          </a>

          {/* Exam History Button */}
          <button
            onClick={onOpenHistory}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="পরীক্ষার হিস্ট্রি"
          >
            <History className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span className="hidden sm:inline">হিস্ট্রি</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={soundEnabled ? 'সাউন্ড বন্ধ করুন' : 'সাউন্ড চালু করুন'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={darkMode ? 'লাইট মোড' : 'ডার্ক মোড'}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
