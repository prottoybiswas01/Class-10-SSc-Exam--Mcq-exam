import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Clock, 
  RotateCcw, 
  Eye, 
  ArrowLeft, 
  Share2, 
  Sparkles,
  Award,
  BookOpen
} from 'lucide-react';
import { calculateSSCGrade, formatTime, toBengaliNumber } from '../utils/gradeCalculator';

export default function ResultScreen({
  result,
  onGoToReview,
  onRetakeExam,
  onChangeSubject
}) {
  const {
    subjectName,
    subjectCode,
    totalQuestions,
    correctCount,
    wrongCount,
    unansweredCount,
    obtainedMarks,
    timeSpent,
    negativeMarking
  } = result;

  const gradeInfo = calculateSSCGrade(obtainedMarks, totalQuestions);
  const accuracy = totalQuestions > 0 ? ((correctCount / (correctCount + wrongCount || 1)) * 100).toFixed(1) : 0;

  // Trigger confetti for high scores
  useEffect(() => {
    if (gradeInfo.gpa >= 4.0) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
    }
  }, [gradeInfo]);

  const handleCopySummary = () => {
    const text = `🎓 SSC MCQ Exam Result:
বিষয়: ${subjectName} (কোড: ${subjectCode})
প্রাপ্ত নম্বর: ${obtainedMarks.toFixed(2)} / ${totalQuestions}
গ্রেড: ${gradeInfo.grade} (GPA ${gradeInfo.gpa.toFixed(2)})
সঠিক উত্তর: ${correctCount}টি | ভুল উত্তর: ${wrongCount}টি
সময় লেগেছে: ${formatTime(timeSpent)}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      alert('ফলাফল ক্লিপবোর্ডে কপি করা হয়েছে!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fade-in">
      
      {/* Result Hero Card */}
      <div className={`rounded-3xl p-6 sm:p-10 border shadow-2xl text-center space-y-6 ${gradeInfo.bgColor}`}>
        
        <div className="inline-flex p-4 rounded-3xl bg-white dark:bg-slate-900 shadow-xl mx-auto animate-bounce">
          <Trophy className={`w-12 h-12 sm:w-16 sm:h-16 ${gradeInfo.color}`} />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {subjectName} • কোড: {subjectCode}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            গ্রেড: <span className={gradeInfo.color}>{gradeInfo.grade}</span>
            <span className="text-lg sm:text-2xl font-bold text-slate-500 dark:text-slate-400 ml-2">
              (GPA {gradeInfo.gpa.toFixed(2)})
            </span>
          </h1>

          <p className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-300">
            {gradeInfo.label}
          </p>
        </div>

        {/* Score Pill */}
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <span className="text-xs font-semibold text-slate-500">প্রাপ্ত মোট নম্বর:</span>
          <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {toBengaliNumber(obtainedMarks.toFixed(2))}
          </span>
          <span className="text-xs text-slate-400">/ {toBengaliNumber(totalQuestions)}</span>
        </div>

        {negativeMarking && (
          <div className="text-xs text-rose-500 font-semibold">
            * ০.২৫ নেগেটিভ মার্কিং হিসাব করা হয়েছে (কর্তন: {toBengaliNumber((wrongCount * 0.25).toFixed(2))} নম্বর)
          </div>
        )}

      </div>

      {/* Detailed Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        {/* Correct */}
        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-emerald-500/30 text-center space-y-1">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-emerald-600">{toBengaliNumber(correctCount)}</div>
          <div className="text-xs font-semibold text-slate-500">সঠিক উত্তর</div>
        </div>

        {/* Wrong */}
        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-rose-500/30 text-center space-y-1">
          <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center mx-auto mb-2">
            <XCircle className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-rose-600">{toBengaliNumber(wrongCount)}</div>
          <div className="text-xs font-semibold text-slate-500">ভুল উত্তর</div>
        </div>

        {/* Unanswered */}
        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-300 dark:border-slate-700 text-center space-y-1">
          <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center mx-auto mb-2">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-slate-700 dark:text-slate-300">{toBengaliNumber(unansweredCount)}</div>
          <div className="text-xs font-semibold text-slate-500">অনুত্তরিত</div>
        </div>

        {/* Time Spent */}
        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-teal-500/30 text-center space-y-1">
          <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center mx-auto mb-2">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-teal-600">{toBengaliNumber(formatTime(timeSpent))}</div>
          <div className="text-xs font-semibold text-slate-500">ব্যয়িত সময়</div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6 space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Detailed Review Button */}
          <button
            onClick={onGoToReview}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-bold shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <Eye className="w-4 h-4" />
            <span>সকল প্রশ্ন ও বিশদ সমাধান দেখুন</span>
          </button>

          {/* Retake Exam Button */}
          <button
            onClick={onRetakeExam}
            className="w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm font-bold border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2 transition-colors active:scale-95"
          >
            <RotateCcw className="w-4 h-4 text-emerald-600" />
            <span>আবার পরীক্ষা দিন</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onChangeSubject}
            className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>অন্য বিষয় নির্বাচন করুন</span>
          </button>

          <button
            onClick={handleCopySummary}
            className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>ফলাফল শেয়ার বা কপি করুন</span>
          </button>
        </div>

      </div>

    </div>
  );
}
