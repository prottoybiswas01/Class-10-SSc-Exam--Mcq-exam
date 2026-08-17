import React from 'react';
import { Bookmark, CheckCircle2, XCircle, Info, Sparkles } from 'lucide-react';
import { toBengaliNumber } from '../utils/gradeCalculator';

const OPTION_PREFIXES = ['(ক)', '(খ)', '(গ)', '(ঘ)'];

export default function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  onSelectOption,
  isBookmarked,
  onToggleBookmark,
  showExplanation = false,
  isReview = false,
  soundManager
}) {
  if (!question) return null;

  const handleOptionClick = (idx) => {
    if (isReview) return; // disabled in review
    if (soundManager) soundManager.playClick();
    onSelectOption(idx);
  };

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-7 shadow-lg border border-slate-200 dark:border-slate-800/80 transition-all duration-200">
      
      {/* Header Info: Question Index, Chapter Tag, Bookmark */}
      <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
            প্রশ্ন {toBengaliNumber(questionIndex + 1)} / {toBengaliNumber(totalQuestions)}
          </span>
          {question.chapter && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {question.chapter}
            </span>
          )}
          {question.type === 'multi' && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              বহুপদী সমাপ্তিসূচক
            </span>
          )}
          {question.type === 'stem' && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              উদ্দীপকভিত্তিক
            </span>
          )}
        </div>

        {onToggleBookmark && (
          <button
            onClick={() => onToggleBookmark(question.id)}
            className={`p-2 rounded-xl border transition-all ${
              isBookmarked
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-500'
                : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-amber-500 hover:border-amber-400'
            }`}
            title={isBookmarked ? 'বুকমার্ক সরানো' : 'পরবর্তীতে পর্যালোচনার জন্য চিহ্নিত করুন'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
          </button>
        )}
      </div>

      {/* Stem / উদ্দীপক (if applicable) */}
      {question.stem && (
        <div className="mb-4 p-4 rounded-xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/20 text-slate-800 dark:text-amber-100 text-sm leading-relaxed font-medium">
          <div className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" /> উদ্দীপকটি পড়ে নিচের প্রশ্নের উত্তর দাও:
          </div>
          {question.stem}
        </div>
      )}

      {/* Question Text */}
      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-relaxed mb-4">
        {question.question}
      </h3>

      {/* Multi Statements (i, ii, iii) */}
      {question.statements && question.statements.length > 0 && (
        <div className="mb-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
          {question.statements.map((stmt, idx) => (
            <div key={idx} className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {stmt}
            </div>
          ))}
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 pt-1">
            নিচের কোনটি সঠিক?
          </div>
        </div>
      )}

      {/* Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {question.options.map((option, optIdx) => {
          let stateStyle = 'option-btn-default';
          let isCorrect = optIdx === question.correctAnswer;
          let isUserChoice = selectedAnswer === optIdx;

          if (showExplanation || isReview) {
            if (isCorrect) {
              stateStyle = 'option-btn-correct';
            } else if (isUserChoice && !isCorrect) {
              stateStyle = 'option-btn-incorrect';
            } else {
              stateStyle = 'opacity-60 border-slate-200 dark:border-slate-800';
            }
          } else if (isUserChoice) {
            stateStyle = 'option-btn-selected';
          }

          return (
            <button
              key={optIdx}
              onClick={() => handleOptionClick(optIdx)}
              disabled={isReview}
              className={`option-btn ${stateStyle}`}
            >
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                (showExplanation || isReview) && isCorrect
                  ? 'bg-emerald-600 text-white'
                  : (showExplanation || isReview) && isUserChoice && !isCorrect
                  ? 'bg-rose-600 text-white'
                  : isUserChoice
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                {OPTION_PREFIXES[optIdx]}
              </span>
              
              <span className="text-sm sm:text-base font-medium flex-1 pt-0.5 leading-snug">
                {option}
              </span>

              {/* Status Icons */}
              {(showExplanation || isReview) && isCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 self-center" />
              )}
              {(showExplanation || isReview) && isUserChoice && !isCorrect && (
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 self-center" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Box (when enabled or in review mode) */}
      {(showExplanation || isReview) && question.explanation && (
        <div className="mt-5 p-4 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/20 text-slate-800 dark:text-emerald-100 animate-fade-in">
          <div className="flex items-center gap-2 font-bold text-xs text-emerald-700 dark:text-emerald-300 uppercase tracking-wider mb-1.5">
            <Sparkles className="w-4 h-4" /> বিশদ ব্যাখ্যা ও সমাধান (Detailed Explanation):
          </div>
          <p className="text-sm sm:text-base leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}

    </div>
  );
}
