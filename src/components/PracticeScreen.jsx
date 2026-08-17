import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Bookmark, 
  Sparkles, 
  Trophy, 
  Eye, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';
import QuestionCard from './QuestionCard';
import { toBengaliNumber } from '../utils/gradeCalculator';

export default function PracticeScreen({
  subject,
  questions = [],
  onExitPractice,
  soundManager
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [qIdx]: selectedOptionIdx }
  const [bookmarks, setBookmarks] = useState({});
  const [revealedExplanations, setRevealedExplanations] = useState({}); // { [qIdx]: boolean }

  const currentQuestion = questions[currentIndex] || questions[0];

  const handleSelectOption = (optionIdx) => {
    if (userAnswers[currentIndex] !== undefined) return; // already answered

    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIdx
    }));

    // Auto reveal explanation in practice mode
    setRevealedExplanations((prev) => ({
      ...prev,
      [currentIndex]: true
    }));

    const isCorrect = optionIdx === currentQuestion.correctAnswer;
    if (soundManager) {
      if (isCorrect) soundManager.playCorrect();
      else soundManager.playWrong();
    }
  };

  const handleToggleBookmark = (qId) => {
    setBookmarks((prev) => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const handleResetPractice = () => {
    if (window.confirm('আপনি কি এই অনুশীলন সেশনের সমস্ত উত্তর রিসেট করতে চান?')) {
      setUserAnswers({});
      setRevealedExplanations({});
      setCurrentIndex(0);
    }
  };

  // Score stats
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = Object.entries(userAnswers).filter(
    ([idx, ans]) => ans === questions[idx]?.correctAnswer
  ).length;

  if (!questions || questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center glass-card rounded-2xl">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">কোনো প্রশ্ন পাওয়া যায়নি।</h3>
        <button onClick={onExitPractice} className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
          ফিরে যান
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onExitPractice}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="অনুশীলন ত্যাগ করুন"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>{subject.banglaName}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300">
                অনুশীলন মোড (ব্যাখ্যাসহ)
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              অপশন সিলেক্ট করলেই তাত্ক্ষণিক সঠিক উত্তর ও ব্যাখ্যা দেখতে পাবেন
            </p>
          </div>
        </div>

        {/* Live Score Counter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <span className="text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {toBengaliNumber(correctCount)}
            </span>
            <span className="text-slate-300 dark:text-slate-600">/</span>
            <span className="text-slate-600 dark:text-slate-400">
              {toBengaliNumber(answeredCount)} টি সম্পন্ন
            </span>
          </div>

          <button
            onClick={handleResetPractice}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
            title="নতুন করে শুরু করুন"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Active Question Card */}
      <QuestionCard
        question={currentQuestion}
        questionIndex={currentIndex}
        totalQuestions={questions.length}
        selectedAnswer={userAnswers[currentIndex]}
        onSelectOption={handleSelectOption}
        isBookmarked={!!bookmarks[currentQuestion?.id]}
        onToggleBookmark={handleToggleBookmark}
        showExplanation={revealedExplanations[currentIndex]}
        isReview={userAnswers[currentIndex] !== undefined}
        soundManager={soundManager}
      />

      {/* Navigation Controls */}
      <div className="glass-panel rounded-2xl p-4 flex items-center justify-between gap-3">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>পূর্ববর্তী প্রশ্ন</span>
        </button>

        <div className="text-xs font-bold text-slate-500">
          প্রশ্ন {toBengaliNumber(currentIndex + 1)} / {toBengaliNumber(questions.length)}
        </div>

        <button
          onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
          disabled={currentIndex === questions.length - 1}
          className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-600/20 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5"
        >
          <span>পরবর্তী প্রশ্ন</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
