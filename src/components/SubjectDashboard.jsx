import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Flame, 
  Clock, 
  BookOpen, 
  Sparkles, 
  CheckCircle, 
  Trophy, 
  Calculator, 
  Variable, 
  Atom, 
  FlaskConical, 
  Dna, 
  Globe2, 
  BookOpenCheck, 
  BookText, 
  Cpu, 
  Moon, 
  Sun, 
  Briefcase, 
  Palette, 
  Receipt, 
  Building2, 
  Coins, 
  MapPin, 
  ShieldCheck, 
  TrendingUp, 
  Landmark, 
  Sprout, 
  Home,
  Play,
  Lightbulb
} from 'lucide-react';
import { SUBJECTS, SUBJECT_GROUPS, GROUP_LABELS } from '../data/subjects';
import { toBengaliNumber } from '../utils/gradeCalculator';

// Icon Map
const ICON_MAP = {
  Calculator,
  Variable,
  Atom,
  FlaskConical,
  Dna,
  Globe2,
  BookOpenCheck,
  BookText,
  Cpu,
  Moon,
  Sun,
  Briefcase,
  Palette,
  Receipt,
  Building2,
  Coins,
  Sparkles,
  MapPin,
  ShieldCheck,
  TrendingUp,
  Landmark,
  Sprout,
  Home
};

export default function SubjectDashboard({ onStartExam, onStartPractice }) {
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter subjects based on group and search query
  const filteredSubjects = useMemo(() => {
    return SUBJECTS.filter((sub) => {
      const matchesGroup = selectedGroup === 'all' || sub.group === selectedGroup;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        sub.name.toLowerCase().includes(query) ||
        sub.banglaName.toLowerCase().includes(query) ||
        sub.desc.toLowerCase().includes(query) ||
        sub.code.includes(query);
      return matchesGroup && matchesSearch;
    });
  }, [selectedGroup, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white p-6 sm:p-10 shadow-2xl shadow-emerald-950/20">
        
        {/* Decorative background glows */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-teal-400/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-200">
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>এসএসসি ২০২৬ ও ২০২৭ স্পেশাল মডেল টেস্ট</span>
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/30 backdrop-blur-md border border-indigo-400/40 text-xs font-semibold text-indigo-100">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>লাইভ প্রশ্ন জেনারেশন</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            ১০ম শ্রেণি ও এসএসসি প্রস্তুতি — <br className="hidden sm:inline" />
            <span className="text-emerald-300">২৩টি বিষয়ের</span> পূর্ণাঙ্গ মডেল টেস্ট ও অনুশীলন
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl">
            জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) অনুমোদিত বিজ্ঞান, ব্যবসায় শিক্ষা, মানবিক ও সকল আবশ্যিক বিষয়ের ওপর সম্পূর্ণ বই বা নির্দিষ্ট অধ্যায়ভিত্তিক ইউনিক প্রশ্ন দিয়ে পরীক্ষা দিন।
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-2 flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm font-semibold">
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur-md">
              <BookOpen className="w-4 h-4 text-emerald-300" />
              <span>২৩টি পূর্ণাঙ্গ বিষয়</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur-md">
              <Clock className="w-4 h-4 text-amber-300" />
              <span>৩০ মিনিটের বোর্ড টাইম</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3.5 py-2 rounded-xl backdrop-blur-md">
              <Trophy className="w-4 h-4 text-yellow-300" />
              <span>GPA 5.0 স্ট্যান্ডার্ড রেজাল্ট</span>
            </div>
          </div>

        </div>

      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          
          {/* Group Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedGroup('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-150 ${
                selectedGroup === 'all'
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-md'
                  : 'glass-card text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              সকল বিষয় ({toBengaliNumber(SUBJECTS.length)})
            </button>

            {Object.entries(SUBJECT_GROUPS).map(([key, value]) => {
              const count = SUBJECTS.filter((s) => s.group === value).length;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedGroup(value)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-150 ${
                    selectedGroup === value
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'glass-card text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  {GROUP_LABELS[value]} ({toBengaliNumber(count)})
                </button>
              );
            })}
          </div>

          {/* Search Input Box */}
          <div className="relative min-w-[260px] sm:min-w-[300px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="বিষয়ের নাম বা কোড দিয়ে খুঁজুন..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>

        </div>

      </div>

      {/* Subject Cards Grid */}
      {filteredSubjects.length === 0 ? (
        <div className="text-center py-16 glass-panel rounded-2xl">
          <BookOpen className="w-12 h-12 mx-auto text-slate-400 mb-3 opacity-60" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
            কোনো বিষয় খুঁজে পাওয়া যায়নি!
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            অনুগ্রহ করে ভিন্ন কোনো নাম বা কোড দিয়ে চেষ্টা করুন।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredSubjects.map((subject) => {
            const IconComponent = ICON_MAP[subject.icon] || BookOpen;

            return (
              <div
                key={subject.id}
                className="group relative rounded-2xl glass-card p-5 hover:shadow-xl hover:border-emerald-500/50 dark:hover:border-emerald-500/40 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Icon, Group Badge, Code */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        কোড: {subject.code}
                      </span>
                    </div>
                  </div>

                  {/* Subject Name & Description */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {subject.banglaName}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {subject.desc}
                  </p>
                </div>

                {/* Bottom Actions: Practice & Timed Exam */}
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onStartPractice(subject)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500/50 bg-white/50 dark:bg-slate-800/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-slate-700 dark:text-slate-300 hover:text-emerald-600 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    <span>অনুশীলন</span>
                  </button>

                  <button
                    onClick={() => onStartExam(subject)}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>মডেল টেস্ট</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
