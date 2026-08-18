import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SubjectDashboard from './components/SubjectDashboard';
import ExamScreen from './components/ExamScreen';
import PracticeScreen from './components/PracticeScreen';
import ResultScreen from './components/ResultScreen';
import DetailedReview from './components/DetailedReview';
import HistoryModal from './components/HistoryModal';
import ChapterSelectModal from './components/ChapterSelectModal';
import AiLoadingScreen from './components/AiLoadingScreen';
import AiSettingsModal from './components/AiSettingsModal';
import { storage } from './utils/storage';
import { soundManager } from './utils/audio';
import { generateAIQuestions } from './services/aiQuestionGenerator';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard'); // 'dashboard' | 'loading' | 'exam' | 'practice' | 'result' | 'review'
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [targetMode, setTargetMode] = useState('exam'); // 'exam' | 'practice'
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [examResult, setExamResult] = useState(null);
  const [darkMode, setDarkMode] = useState(() => storage.getTheme() === 'dark');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [generationError, setGenerationError] = useState(null);
  
  // Modals
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);
  const [isAiSettingsOpen, setIsAiSettingsOpen] = useState(false);
  const [activeSessionConfig, setActiveSessionConfig] = useState(null);

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

  // Clicked from Dashboard
  const handleOpenSubjectModal = (subject, mode) => {
    setSelectedSubject(subject);
    setTargetMode(mode);
    setIsChapterModalOpen(true);
  };

  // Confirmed from Chapter/Syllabus Modal
  const handleConfirmStart = async (config) => {
    setIsChapterModalOpen(false);
    setActiveSessionConfig(config);
    setGenerationError(null);
    setCurrentScreen('loading');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const questions = await generateAIQuestions(
        config.subject.id,
        config.questionCount,
        config.chapters,
        config.isFullBook
      );
      setGeneratedQuestions(questions);
      setCurrentScreen(config.mode);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Generation Error:', err);
      setGenerationError(err.message || 'AI প্রশ্ন জেনারেট করতে ব্যর্থ হয়েছে। দয়া করে আপনার API Key চেক করুন।');
    }
  };

  const handleFinishExam = (result) => {
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
    setGeneratedQuestions([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetakeExam = () => {
    if (activeSessionConfig) {
      handleConfirmStart(activeSessionConfig);
    } else if (selectedSubject) {
      handleOpenSubjectModal(selectedSubject, 'exam');
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
        onOpenAiSettings={() => setIsAiSettingsOpen(true)}
      />

      {/* Main Screen Content */}
      <main className="flex-1">
        {currentScreen === 'dashboard' && (
          <SubjectDashboard
            onStartExam={(sub) => handleOpenSubjectModal(sub, 'exam')}
            onStartPractice={(sub) => handleOpenSubjectModal(sub, 'practice')}
          />
        )}

        {currentScreen === 'loading' && selectedSubject && (
          <AiLoadingScreen
            subject={selectedSubject}
            error={generationError}
            onRetry={() => activeSessionConfig && handleConfirmStart(activeSessionConfig)}
            onOpenSettings={() => setIsAiSettingsOpen(true)}
            onCancel={handleGoHome}
          />
        )}

        {currentScreen === 'exam' && selectedSubject && (
          <ExamScreen
            subject={selectedSubject}
            questions={generatedQuestions}
            onFinishExam={handleFinishExam}
            onExitExam={handleGoHome}
            soundManager={soundManager}
          />
        )}

        {currentScreen === 'practice' && selectedSubject && (
          <PracticeScreen
            subject={selectedSubject}
            questions={generatedQuestions}
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

      {/* Chapter / Full Book Selection Modal */}
      <ChapterSelectModal
        isOpen={isChapterModalOpen}
        onClose={() => setIsChapterModalOpen(false)}
        subject={selectedSubject}
        mode={targetMode}
        onConfirm={handleConfirmStart}
      />

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />

      {/* AI Settings Modal */}
      <AiSettingsModal
        isOpen={isAiSettingsOpen}
        onClose={() => setIsAiSettingsOpen(false)}
        onKeySaved={() => {
          if (generationError && activeSessionConfig) {
            handleConfirmStart(activeSessionConfig);
          }
        }}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800/80 py-6 text-center text-xs text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-700 dark:text-slate-300">
            এসএসসি (Class 10) পূর্ণাঙ্গ প্রস্তুতি ও মডেল টেস্ট প্ল্যাটফর্ম — সর্বস্বত্ব সংরক্ষিত © {new Date().getFullYear()}
          </p>
          <p className="text-[11px] text-slate-400">
            জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) অনুমোদিত ২৩টি বিষয়ের সর্বশেষ কারিকুলাম ও অধ্যায় অনুযায়ী প্রণীত।
          </p>
        </div>
      </footer>

    </div>
  );
}
