import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Lightbulb, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  Sparkles,
  BookOpen
} from 'lucide-react';
import QuestionCard from './QuestionCard';
import { getQuestionsBySubject } from '../data/questions';
import { toBengaliNumber } from '../utils/gradeCalculator';

export default function PracticeScreen({ subject, onExitPractice, soundManager }) {
  const questions = useRef(getQuestionsBySubject(subject.id)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [qIdx]: selectedOptionIdx }
  const [score, setScore] = useState({ correct: 0, wrong: 0 });

  const currentQuestion = questions[currentIndex];
  const isAnswered = answers[currentIndex] !== undefined;

  const handleSelectOption = (optIdx) => {
    if (isAnswered) return; // already answered

    const isCorrect = optIdx === currentQuestion.correctAnswer;
    if (soundManager) {
      if (isCorrect) soundManager.playCorrect();
      else soundManager.playWrong();
    }

    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: optIdx
    }));

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      wrong: prev.wrong + (isCorrect ? 0 : 1)
    }));
  };

  const handleResetPractice = () => {
    setAnswers({});
    setScore({ correct: 0, wrong: 0 });
    setCurrentIndex(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-6">
      
      {/* Top Header */}
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
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center gap-1">
                <Lightbulb className="w-3 h-3" /> অনুশীলন মোড
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              অপশন বাছাই করার সাথে সাথে সঠিক উত্তর ও বিশদ সমাধান দেখতে পাবেন।
            </p>
          </div>
        </div>

        {/* Live Score Counter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>সঠিক: {toBengaliNumber(score.correct)}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 text-xs font-bold">
            <XCircle className="w-4 h-4" />
            <span>ভুল: {toBengaliNumber(score.wrong)}</span>
          </div>

          <button
            onClick={handleResetPractice}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            title="পুনরায় শুরু করুন"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Question Area */}
        <div className="lg:col-span-3 space-y-4">
          <QuestionCard
            question={currentQuestion}
            questionIndex={currentIndex}
            totalQuestions={questions.length}
            selectedAnswer={answers[currentIndex]}
            onSelectOption={handleSelectOption}
            showExplanation={isAnswered}
            soundManager={soundManager}
          />

          {/* Navigation Bar */}
          <div className="glass-panel rounded-2xl p-4 flex items-center justify-between gap-3">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>পূর্ববর্তী প্রশ্ন</span>
            </button>

            <span className="text-xs font-bold text-slate-500">
              প্রশ্ন {toBengaliNumber(currentIndex + 1)} / {toBengaliNumber(questions.length)}
            </span>

            <button
              onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              disabled={currentIndex === questions.length - 1}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5 transition-transform active:scale-95"
            >
              <span>পরবর্তী প্রশ্ন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Question Numbers Grid */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-2xl p-5 border border-slate-200 dark:border-slate-800 sticky top-20 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-500" />
              <span>অনুশীলন তালিকা</span>
            </h3>

            <div className="grid grid-cols-5 gap-2 pt-2">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const userAns = answers[idx];
                const answered = userAns !== undefined;
                const isCorrect = userAns === q.correctAnswer;

                let bgClass = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
                if (answered) {
                  bgClass = isCorrect 
                    ? 'bg-emerald-600 text-white font-bold' 
                    : 'bg-rose-500 text-white font-bold';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-xl text-xs font-bold transition-all duration-150 flex items-center justify-center border ${
                      isCurrent ? 'ring-2 ring-amber-500 ring-offset-2 dark:ring-offset-slate-900' : 'border-transparent'
                    } ${bgClass}`}
                  >
                    {toBengaliNumber(idx + 1)}
                  </button>
                );
              })}
            </div>

            <button
              onClick={onExitPractice}
              className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 text-xs font-bold"
            >
              মূল পাতায় ফিরুন
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
