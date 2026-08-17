import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckSquare, 
  RotateCcw, 
  Bookmark, 
  Send, 
  AlertCircle, 
  Sliders
} from 'lucide-react';
import QuestionCard from './QuestionCard';
import Timer from './Timer';
import { toBengaliNumber } from '../utils/gradeCalculator';

const EXAM_DURATION_SECONDS = 30 * 60; // 30 minutes

export default function ExamScreen({
  subject,
  questions = [],
  onFinishExam,
  onExitExam,
  soundManager
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [qIdx]: selectedOptionIdx }
  const [bookmarks, setBookmarks] = useState({}); // { [qId]: true/false }
  const [secondsLeft, setSecondsLeft] = useState(EXAM_DURATION_SECONDS);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [negativeMarking, setNegativeMarking] = useState(false);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAutoSubmit = () => {
    if (soundManager) soundManager.playComplete();
    calculateAndSubmit();
  };

  const handleSelectOption = (optionIdx) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIdx
    }));
  };

  const handleClearAnswer = () => {
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentIndex];
      return copy;
    });
  };

  const handleToggleBookmark = (qId) => {
    setBookmarks((prev) => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const calculateAndSubmit = () => {
    const timeSpent = EXAM_DURATION_SECONDS - secondsLeft;
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    questions.forEach((q, idx) => {
      const userAns = answers[idx];
      if (userAns === undefined) {
        unansweredCount++;
      } else if (userAns === q.correctAnswer) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    const deduction = negativeMarking ? wrongCount * 0.25 : 0;
    const obtainedMarks = Math.max(0, correctCount - deduction);

    const examResult = {
      subjectId: subject.id,
      subjectName: subject.banglaName,
      subjectCode: subject.code,
      totalQuestions: questions.length,
      correctCount,
      wrongCount,
      unansweredCount,
      obtainedMarks,
      timeSpent,
      negativeMarking,
      answers,
      bookmarks,
      questions
    };

    onFinishExam(examResult);
  };

  const currentQuestion = questions[currentIndex] || questions[0];
  const answeredCount = Object.keys(answers).length;
  const markedCount = Object.values(bookmarks).filter(Boolean).length;

  if (!questions || questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center glass-card rounded-2xl">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">কোনো প্রশ্ন পাওয়া যায়নি।</h3>
        <button onClick={onExitExam} className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
          ফিরে যান
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-6">
      
      {/* Top Header: Title, Navigation, Live Timer, Submit CTA */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 shadow-md">
        
        {/* Subject and Negative Marking Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExitExam}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="পরীক্ষা ত্যাগ করুন"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>{subject.banglaName}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                মডেল টেস্ট
              </span>
            </h2>
            <div className="text-xs text-slate-500 flex items-center gap-3 mt-0.5">
              <span>মোট প্রশ্ন: {toBengaliNumber(questions.length)}টি</span>
              <span>•</span>
              <span>উত্তর দেওয়া হয়েছে: {toBengaliNumber(answeredCount)}টি</span>
            </div>
          </div>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Negative Marking Toggle */}
          <button
            onClick={() => setNegativeMarking(!negativeMarking)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              negativeMarking
                ? 'bg-rose-500/10 border-rose-500/40 text-rose-600 dark:text-rose-400'
                : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300'
            }`}
            title="নেগেটিভ মার্কিং চালু বা বন্ধ করুন (০.২৫ নম্বর কর্তন)"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">নেগেটিভ মার্ক:</span>
            <span>{negativeMarking ? 'চালু (০.২৫)' : 'বন্ধ'}</span>
          </button>

          {/* 30-min Countdown Timer */}
          <Timer secondsLeft={secondsLeft} totalSeconds={EXAM_DURATION_SECONDS} />

          {/* Quick Submit Button */}
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-transform active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>জমা দিন</span>
          </button>
        </div>

      </div>

      {/* Main Examination Layout: Question Area + Question Palette Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left 3 Columns: Active Question Card & Navigation Bar */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Active Question Card */}
          <QuestionCard
            question={currentQuestion}
            questionIndex={currentIndex}
            totalQuestions={questions.length}
            selectedAnswer={answers[currentIndex]}
            onSelectOption={handleSelectOption}
            isBookmarked={!!bookmarks[currentQuestion?.id]}
            onToggleBookmark={handleToggleBookmark}
            soundManager={soundManager}
          />

          {/* Navigation Controls Bar */}
          <div className="glass-panel rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>পূর্ববর্তী</span>
              </button>

              <button
                onClick={handleClearAnswer}
                disabled={answers[currentIndex] === undefined}
                className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-rose-500 hover:border-rose-400 text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 transition-colors"
                title="উত্তর বাতিল করুন"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">উত্তর মুছুন</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleBookmark(currentQuestion.id)}
                className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  bookmarks[currentQuestion?.id]
                    ? 'bg-amber-500/10 border-amber-500 text-amber-500'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-amber-400'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${bookmarks[currentQuestion?.id] ? 'fill-amber-500' : ''}`} />
                <span>রিভিউ মার্ক</span>
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-transform active:scale-95"
                >
                  <span>পরবর্তী</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-transform active:scale-95"
                >
                  <span>সম্পূর্ণ পরীক্ষা জমা দিন</span>
                  <Send className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Right 1 Column: Question Palette & Overview */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-2xl p-5 border border-slate-200 dark:border-slate-800 sticky top-20 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-emerald-600" />
                <span>প্রশ্ন প্যালেট (১-{toBengaliNumber(questions.length)})</span>
              </h3>
            </div>

            {/* Status Indicators */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500 shrink-0" />
                <span>উত্তর দেওয়া: {toBengaliNumber(answeredCount)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-500 shrink-0" />
                <span>রিভিউ মার্ক: {toBengaliNumber(markedCount)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700 shrink-0" />
                <span>বাকি আছে: {toBengaliNumber(questions.length - answeredCount)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded ring-2 ring-emerald-500 bg-white dark:bg-slate-900 shrink-0" />
                <span>বর্তমান প্রশ্ন</span>
              </div>
            </div>

            {/* Question Numbers Grid */}
            <div className="grid grid-cols-5 gap-2 pt-2">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = answers[idx] !== undefined;
                const isMarked = bookmarks[q.id];

                let bgClass = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400';

                if (isMarked) {
                  bgClass = 'bg-amber-500 text-white font-bold shadow-sm shadow-amber-500/30';
                } else if (isAnswered) {
                  bgClass = 'bg-emerald-600 text-white font-bold shadow-sm shadow-emerald-600/30';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-xl text-xs font-bold transition-all duration-150 flex items-center justify-center relative border ${
                      isCurrent ? 'ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-slate-900' : 'border-transparent'
                    } ${bgClass}`}
                  >
                    {toBengaliNumber(idx + 1)}
                  </button>
                );
              })}
            </div>

            {/* Quick Final Submit CTA */}
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-white dark:text-slate-900 text-xs font-bold transition-colors"
            >
              পরীক্ষা শেষ করুন
            </button>

          </div>
        </div>

      </div>

      {/* Submit Confirmation Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="glass-card rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-slide-up">
            
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
              <Send className="w-6 h-6" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                আপনি কি পরীক্ষাটি জমা দিতে চান?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                জমা দেওয়ার পর আপনি আপনার সম্পূর্ণ ফলাফল, জিপিএ এবং প্রতিটি প্রশ্নের বিস্তারিত ব্যাখ্যা দেখতে পাবেন।
              </p>
            </div>

            {/* Stats Breakdown in Modal */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <div className="font-bold text-emerald-600 text-base">{toBengaliNumber(answeredCount)}</div>
                <div className="text-slate-500 text-[11px]">উত্তর দেওয়া</div>
              </div>
              <div>
                <div className="font-bold text-amber-500 text-base">{toBengaliNumber(markedCount)}</div>
                <div className="text-slate-500 text-[11px]">রিভিউ চিহ্নিত</div>
              </div>
              <div>
                <div className="font-bold text-rose-500 text-base">{toBengaliNumber(questions.length - answeredCount)}</div>
                <div className="text-slate-500 text-[11px]">অনুত্থাপিত</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                পুনরায় পরীক্ষা দিন
              </button>

              <button
                onClick={() => {
                  setIsSubmitModalOpen(false);
                  calculateAndSubmit();
                }}
                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-transform active:scale-95"
              >
                হ্যাঁ, জমা দিন
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
