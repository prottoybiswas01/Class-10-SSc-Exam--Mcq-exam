import React, { useState, useEffect } from 'react';
import { 
  X, 
  History, 
  Trash2, 
  Trophy, 
  Clock, 
  CheckCircle2, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { storage } from '../utils/storage';
import { calculateSSCGrade, formatTime, toBengaliNumber } from '../utils/gradeCalculator';

export default function HistoryModal({ isOpen, onClose }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setHistory(storage.getHistory());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClearHistory = () => {
    if (window.confirm('আপনি কি সত্যিই সকল পূর্ববর্তী পরীক্ষার হিস্ট্রি মুছে ফেলতে চান?')) {
      storage.clearHistory();
      setHistory([]);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="glass-card rounded-3xl max-w-2xl w-full max-h-[85vh] shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col animate-slide-up overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                পরীক্ষার পূর্ববর্তী ফলাফল (History)
              </h3>
              <p className="text-xs text-slate-500">
                আপনার সাম্প্রতিক মডেল টেস্ট সমূহের পারফরম্যান্স রেকর্ড
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
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Trophy className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
              <p className="text-sm font-semibold">এখনও কোনো পরীক্ষার রেকর্ড নেই।</p>
              <p className="text-xs text-slate-400 mt-1">মডেল টেস্ট সম্পন্ন করলে আপনার স্কোর এখানে সংরক্ষিত হবে।</p>
            </div>
          ) : (
            history.map((record) => {
              const grade = calculateSSCGrade(record.obtainedMarks, record.totalQuestions);

              return (
                <div
                  key={record.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-4 hover:border-emerald-500/40 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {record.subjectName}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 px-2 py-0.5 rounded bg-slate-200/60 dark:bg-slate-700">
                        কোড: {record.subjectCode}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(record.timestamp)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {toBengaliNumber(formatTime(record.timeSpent))}
                      </span>
                      <span>•</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        সঠিক: {toBengaliNumber(record.correctCount)}
                      </span>
                    </div>
                  </div>

                  {/* Grade Badge */}
                  <div className="text-right shrink-0">
                    <div className={`text-base sm:text-lg font-black ${grade.color}`}>
                      {grade.grade} ({grade.gpa.toFixed(1)})
                    </div>
                    <div className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      {toBengaliNumber(record.obtainedMarks.toFixed(1))} / {toBengaliNumber(record.totalQuestions)}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        {history.length > 0 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <button
              onClick={handleClearHistory}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>সকল হিস্ট্রি মুছে ফেলুন</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold"
            >
              বন্ধ করুন
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
