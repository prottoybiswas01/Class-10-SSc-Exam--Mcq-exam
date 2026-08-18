import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Clock, 
  Play, 
  Lightbulb, 
  CheckSquare, 
  Square,
  Sliders
} from 'lucide-react';
import { NCTB_SYLLABUS } from '../data/syllabus';
import { toBengaliNumber } from '../utils/gradeCalculator';

export default function ChapterSelectModal({ 
  isOpen, 
  onClose, 
  subject, 
  mode, // 'exam' | 'practice'
  onConfirm 
}) {
  const [selectedChapters, setSelectedChapters] = useState(['all']);
  const [questionCount, setQuestionCount] = useState(30);

  if (!isOpen || !subject) return null;

  const syllabus = NCTB_SYLLABUS[subject.id] || { chapters: [] };
  const allChapters = syllabus.chapters || [];

  const isAllSelected = selectedChapters.includes('all');

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedChapters([]);
    } else {
      setSelectedChapters(['all']);
    }
  };

  const toggleChapter = (chapter) => {
    if (isAllSelected) {
      // Switching from all to individual selection
      setSelectedChapters([chapter]);
    } else {
      if (selectedChapters.includes(chapter)) {
        const next = selectedChapters.filter((c) => c !== chapter);
        setSelectedChapters(next);
      } else {
        const next = [...selectedChapters, chapter];
        if (next.length === allChapters.length) {
          setSelectedChapters(['all']);
        } else {
          setSelectedChapters(next);
        }
      }
    }
  };

  const handleStart = () => {
    const finalChapters = isAllSelected ? allChapters : selectedChapters;
    onConfirm({
      subject,
      mode,
      chapters: finalChapters.length > 0 ? finalChapters : allChapters,
      isFullBook: isAllSelected,
      questionCount
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="glass-card rounded-3xl max-w-xl w-full max-h-[90vh] shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col animate-slide-up overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white/40 dark:bg-slate-900/40">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${subject.color} text-white flex items-center justify-center shadow-md`}>
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {subject.banglaName}
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  কোড: {subject.code}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {mode === 'exam' ? '৩০ মিনিটের পূর্ণাঙ্গ মডেল টেস্ট' : 'তাত্ক্ষণিক ব্যাখ্যাসহ অনুশীলন সেশন'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* Question Count Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>প্রশ্নের সংখ্যা নির্বাচন করুন:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xs">
                {toBengaliNumber(questionCount)}টি প্রশ্ন
              </span>
            </label>

            <div className="grid grid-cols-4 gap-2">
              {[10, 15, 20, 30].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setQuestionCount(num)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    questionCount === num
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'border border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {toBengaliNumber(num)}টি
                </button>
              ))}
            </div>
          </div>

          {/* Chapter Selection Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span>সিলেবাস ও অধ্যায় নির্বাচন:</span>
              </label>

              <button
                type="button"
                onClick={toggleSelectAll}
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                {isAllSelected ? 'নির্দিষ্ট অধ্যায় বাছুন' : 'সব অধ্যায় নির্বাচন করুন'}
              </button>
            </div>

            {/* Full Book Option Card */}
            <div
              onClick={toggleSelectAll}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                isAllSelected
                  ? 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 ring-1 ring-emerald-500/40'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-lg flex items-center justify-center ${
                  isAllSelected ? 'bg-emerald-600 text-white' : 'border border-slate-300 dark:border-slate-600'
                }`}>
                  {isAllSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <span>🌟 সম্পূর্ণ বই (Full Syllabus)</span>
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 bg-amber-500 text-white rounded">
                      Board Standard
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    পাঠ্যবইয়ের সকল অধ্যায় থেকে বোর্ড পরীক্ষার অনুরূপ ব্যালেন্সড প্রশ্ন তৈরি হবে
                  </p>
                </div>
              </div>
            </div>

            {/* Individual Chapters List */}
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {allChapters.map((chapter, idx) => {
                const isChecked = isAllSelected || selectedChapters.includes(chapter);

                return (
                  <div
                    key={idx}
                    onClick={() => toggleChapter(chapter)}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                      isChecked
                        ? 'border-emerald-500/60 bg-emerald-50/40 dark:bg-emerald-950/20 text-slate-900 dark:text-slate-100'
                        : 'border-slate-200 dark:border-slate-800/80 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-medium text-xs pr-2">{chapter}</span>
                    <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                      isChecked ? 'bg-emerald-600 text-white' : 'border border-slate-300 dark:border-slate-600'
                    }`}>
                      {isChecked && <CheckCircle2 className="w-3 h-3" />}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            বাতিল
          </button>

          <button
            onClick={handleStart}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
            <span>{mode === 'exam' ? 'মডেল টেস্ট শুরু করুন' : 'অনুশীলন শুরু করুন'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
