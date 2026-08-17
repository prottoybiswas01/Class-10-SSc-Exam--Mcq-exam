import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { formatTime, toBengaliNumber } from '../utils/gradeCalculator';

export default function Timer({ secondsLeft, totalSeconds = 1800 }) {
  const isCritical = secondsLeft <= 300; // < 5 mins
  const isDanger = secondsLeft <= 60;   // < 1 min
  
  const percentage = Math.max(0, (secondsLeft / totalSeconds) * 100);

  return (
    <div className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border transition-all ${
      isDanger 
        ? 'bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 timer-critical'
        : isCritical
        ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400'
        : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
    }`}>
      {isCritical ? (
        <AlertTriangle className={`w-4 h-4 ${isDanger ? 'animate-bounce text-rose-500' : 'text-amber-500'}`} />
      ) : (
        <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
      )}
      
      <div className="flex flex-col items-end">
        <span className="font-mono font-bold text-sm tracking-wider">
          {toBengaliNumber(formatTime(secondsLeft))}
        </span>
        
        {/* Visual micro progress bar */}
        <div className="w-16 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-0.5">
          <div 
            className={`h-full transition-all duration-1000 rounded-full ${
              isDanger ? 'bg-rose-500' : isCritical ? 'bg-amber-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
