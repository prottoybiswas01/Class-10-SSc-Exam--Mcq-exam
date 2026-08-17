import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SubjectDashboard from './components/SubjectDashboard';
import ExamScreen from './components/ExamScreen';
import PracticeScreen from './components/PracticeScreen';
import ResultScreen from './components/ResultScreen';
import DetailedReview from './components/DetailedReview';
import HistoryModal from './components/HistoryModal';
import { storage } from './utils/storage';
import { soundManager } from './utils/audio';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard'); // 'dashboard' | 'exam' | 'practice' | 'result' | 'review'
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [examResult, setExamResult] = useState(null);
  const [darkMode, setDarkMode] = useState(() => storage.getTheme() === 'dark');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Sync Dark mode to document class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      storage.setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      storage.setTheme('light');
    }
  }, [darkMode]);

  // Screen Transitions
  const handleStartExam = (subject) => {
    setSelectedSubject(subject);
    setCurrentScreen('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartPractice = (subject) => {
    setSelectedSubject(subject);
    setCurrentScreen('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishExam = (result) => {
    // Save to LocalStorage
    storage.saveResult(result);
    setExamResult(result);
    setCurrentScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    if (currentScreen === 'exam') {
      if (!window.confirm('আপনি কি নিশ্চিত যে চলমান পরীক্ষাটি ত্যাগ করে মূল পাতায় ফিরে যেতে চান?')) {
        return;
      }
    }
    setCurrentScreen('dashboard');
    setSelectedSubject(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetakeExam = () => {
    if (selectedSubject) {
      setCurrentScreen('exam');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleGoHome();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 selection:bg-emerald-500 selection:text-white">
      
      {/* Header / Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        currentScreen={currentScreen}
        onGoHome={handleGoHome}
        onOpenHistory={() => setIsHistoryOpen(true)}
      />

      {/* Main Screen Content */}
      <main className="flex-1">
        {currentScreen === 'dashboard' && (
          <SubjectDashboard
            onStartExam={handleStartExam}
            onStartPractice={handleStartPractice}
          />
        )}

        {currentScreen === 'exam' && selectedSubject && (
          <ExamScreen
            subject={selectedSubject}
            onFinishExam={handleFinishExam}
            onExitExam={handleGoHome}
            soundManager={soundManager}
          />
        )}

        {currentScreen === 'practice' && selectedSubject && (
          <PracticeScreen
            subject={selectedSubject}
            onExitPractice={handleGoHome}
            soundManager={soundManager}
          />
        )}

        {currentScreen === 'result' && examResult && (
          <ResultScreen
            result={examResult}
            onGoToReview={() => {
              setCurrentScreen('review');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRetakeExam={handleRetakeExam}
            onChangeSubject={handleGoHome}
          />
        )}

        {currentScreen === 'review' && examResult && (
          <DetailedReview
            result={examResult}
            onBackToResult={() => {
              setCurrentScreen('result');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoHome={handleGoHome}
          />
        )}
      </main>

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800/80 py-6 text-center text-xs text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-700 dark:text-slate-300">
            এসএসসি (Class 10) পূর্ণাঙ্গ প্রস্তুতি ও মডেল টেস্ট প্ল্যাটফর্ম — সর্বস্বত্ব সংরক্ষিত © {new Date().getFullYear()}
          </p>
          <p className="text-[11px] text-slate-400">
            জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) অনুমোদিত ২৩টি বিষয়ের সর্বশেষ সিলেবাস ও মানবন্টন অনুযায়ী প্রণীত।
          </p>
        </div>
      </footer>

    </div>
  );
}
