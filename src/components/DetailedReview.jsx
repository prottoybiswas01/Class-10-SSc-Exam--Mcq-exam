import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Bookmark, 
  Sparkles, 
  Filter,
  Eye
} from 'lucide-react';
import QuestionCard from './QuestionCard';
import { toBengaliNumber } from '../utils/gradeCalculator';

export default function DetailedReview({ result, onBackToResult, onGoHome }) {
  const { questions, answers, bookmarks, subjectName, subjectCode } = result;
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'wrong' | 'correct' | 'marked'

  const filteredQuestions = useMemo(() => {
    return questions
      .map((q, idx) => ({ ...q, originalIndex: idx }))
      .filter((q) => {
        const userAns = answers[q.originalIndex];
        const isCorrect = userAns === q.correctAnswer;
        const isWrong = userAns !== undefined && !isCorrect;
        const isMarked = bookmarks[q.id];

        if (activeFilter === 'wrong') return isWrong;
        if (activeFilter === 'correct') return isCorrect;
        if (activeFilter === 'marked') return isMarked;
        return true; // 'all'
      });
  }, [questions, answers, bookmarks, activeFilter]);

  const wrongCount = questions.filter(
    (q, idx) => answers[idx] !== undefined && answers[idx] !== q.correctAnswer
  ).length;

  const correctCount = questions.filter(
    (q, idx) => answers[idx] === q.correctAnswer
  ).length;

  const markedCount = Object.values(bookmarks).filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToResult}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="ফলাফল সামারিতে ফিরুন"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>{subjectName} — বিশদ প্রশ্ন পর্যালোচনা</span>
            </h2>
            <p className="text-xs text-slate-500">
              সঠিক উত্তর ও পাঠ্যবই ভিত্তিক পুঙ্খানুপুঙ্খ ব্যাখ্যা
            </p>
          </div>
        </div>

        <button
          onClick={onGoHome}
          className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          হোমে ফিরুন
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeFilter === 'all'
              ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-md'
              : 'glass-card text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
          }`}
        >
          সমস্ত প্রশ্ন ({toBengaliNumber(questions.length)})
        </button>

        <button
          onClick={() => setActiveFilter('wrong')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeFilter === 'wrong'
              ? 'bg-rose-600 text-white shadow-md'
              : 'glass-card text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50'
          }`}
        >
          <XCircle className="w-3.5 h-3.5" />
          <span>ভুল উত্তরসমূহ ({toBengaliNumber(wrongCount)})</span>
        </button>

        <button
          onClick={() => setActiveFilter('correct')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeFilter === 'correct'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'glass-card text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>সঠিক উত্তরসমূহ ({toBengaliNumber(correctCount)})</span>
        </button>

        <button
          onClick={() => setActiveFilter('marked')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeFilter === 'marked'
              ? 'bg-amber-500 text-white shadow-md'
              : 'glass-card text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>রিভিউ চিহ্নিত ({toBengaliNumber(markedCount)})</span>
        </button>
      </div>

      {/* Questions Review List */}
      {filteredQuestions.length === 0 ? (
        <div className="text-center py-16 glass-panel rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
          <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-500 mb-3" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
            {activeFilter === 'wrong' ? 'অসাধারণ! আপনার কোনো ভুল উত্তর নেই।' : 'এই ফিল্টারে কোনো প্রশ্ন নেই।'}
          </h3>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredQuestions.map((q) => {
            const userAns = answers[q.originalIndex];
            const isBookmarked = !!bookmarks[q.id];

            return (
              <QuestionCard
                key={q.id}
                question={q}
                questionIndex={q.originalIndex}
                totalQuestions={questions.length}
                selectedAnswer={userAns}
                onSelectOption={() => {}}
                isBookmarked={isBookmarked}
                showExplanation={true}
                isReview={true}
              />
            );
          })}
        </div>
      )}

      {/* Back CTA */}
      <div className="pt-4 text-center">
        <button
          onClick={onBackToResult}
          className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold shadow-md hover:opacity-90"
        >
          ফলাফলে ফিরে যান
        </button>
      </div>

    </div>
  );
}
