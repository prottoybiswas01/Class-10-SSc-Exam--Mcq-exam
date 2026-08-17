import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SubjectDashboard from './components/SubjectDashboard';
import ExamScreen from './components/ExamScreen';
import PracticeScreen from './components/PracticeScreen';
import ResultScreen from './components/ResultScreen';
import DetailedReview from './components/DetailedReview';
import HistoryModal from './components/HistoryModal';
import AiConfigModal from './components/AiConfigModal';
import AiLoadingScreen from './components/AiLoadingScreen';
import { storage } from './utils/storage';
import { soundManager } from './utils/audio';
import { generateAIQuestions, aiConfig } from './services/aiQuestionGenerator';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard'); // 'dashboard' | 'loading' | 'exam' | 'practice' | 'result' | 'review'
  const [targetMode, setTargetMode] = useState(null); // 'exam' | 'practice'
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [examResult, setExamResult] = useState(null);
  const [darkMode, setDarkMode] = useState(() => storage.getTheme() === 'dark');
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // Modals & AI State
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAiConfigOpen, setIsAiConfigOpen] = useState(false);
  const [aiError, setAiError] = useState(null);

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

  // Request fresh AI questions for a subject
  const loadSubjectQuestions = async (subject, mode) => {
    setSelectedSubject(subject);
    setTargetMode(mode);
    setAiError(null);
    setCurrentScreen('loading');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Check if API Key exists
    const apiKey = aiConfig.getApiKey();
    if (!apiKey) {
      setAiError('MISSING_API_KEY');
      setIsAiConfigOpen(true);
      return;
    }

    try {
      const questions = await generateAIQuestions(subject.id, 30);
      setGeneratedQuestions(questions);
      setCurrentScreen(mode);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('AI Generation Error:', err);
      setAiError(err.message || 'প্রশ্ন তৈরিতে সমস্যা হয়েছে।');
    }
  };

  const handleStartExam = (subject) => {
    loadSubjectQuestions(subject, 'exam');
  };

  const handleStartPractice = (subject) => {
    loadSubjectQuestions(subject, 'practice');
  };

  const handleRetryAi = () => {
    if (selectedSubject && targetMode) {
      loadSubjectQuestions(selectedSubject, targetMode);
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
    setAiError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetakeExam = () => {
    if (selectedSubject) {
      loadSubjectQuestions(selectedSubject, 'exam');
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
        onOpenAiConfig={() => setIsAiConfigOpen(true)}
      />

      {/* Main Screen Content */}
      <main className="flex-1">
        {currentScreen === 'dashboard' && (
          <SubjectDashboard
            onStartExam={handleStartExam}
            onStartPractice={handleStartPractice}
            onOpenAiConfig={() => setIsAiConfigOpen(true)}
          />
        )}

        {currentScreen === 'loading' && selectedSubject && (
          <AiLoadingScreen
            subject={selectedSubject}
            error={aiError}
            onCancel={handleGoHome}
            onRetry={handleRetryAi}
            onOpenSettings={() => setIsAiConfigOpen(true)}
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

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />

      {/* AI Configuration Modal */}
      <AiConfigModal
        isOpen={isAiConfigOpen}
        onClose={() => setIsAiConfigOpen(false)}
        onSave={() => {
          if (currentScreen === 'loading' && selectedSubject) {
            handleRetryAi();
          }
        }}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800/80 py-6 text-center text-xs text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-700 dark:text-slate-300">
            এসএসসি (Class 10) লাইভ এআই প্রস্তুতি ও মডেল টেস্ট প্ল্যাটফর্ম — সর্বস্বত্ব সংরক্ষিত © {new Date().getFullYear()}
          </p>
          <p className="text-[11px] text-slate-400">
            Google Gemini 3.7 / 2.5 Flash এআই চালিত অন-ডিমান্ড ও নন-রিপিটিং বোর্ড স্ট্যান্ডার্ড প্রশ্ন ব্যাংক।
          </p>
        </div>
      </footer>

    </div>
  );
}
