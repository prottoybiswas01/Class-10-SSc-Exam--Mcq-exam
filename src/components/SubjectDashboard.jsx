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
  Lightbulb,
  Award
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-200">
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>এসএসসি ২০২৬ ও ২০২৭ স্পেশাল মডেল টেস্ট</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-snug">
            এসএসসি পূর্ণাঙ্গ প্রস্তুতি ও <br className="hidden sm:block" />
            <span className="text-amber-300">২৩টি বিষয়ের</span> বোর্ড স্ট্যান্ডার্ড MCQ পরীক্ষা
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl">
            বাংলাদেশ কারিকুলাম (NCTB) অনুমোদিত সকল বিষয়ের জন্য ৩০ মিনিটের বাস্তবসম্মত মডেল টেস্ট, তাৎক্ষণিক GPA 5.0 গ্রেডিং এবং প্রতিটি প্রশ্নের বিষদ বাংলা ব্যাখ্যা।
          </p>

          {/* Quick Metrics */}
          <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="text-lg sm:text-xl font-bold text-white">২৩টি বিষয়</div>
              <div className="text-xs text-emerald-200">সকল বিভাগ অন্তর্ভুক্ত</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="text-lg sm:text-xl font-bold text-white">৭০০+ MCQ</div>
              <div className="text-xs text-emerald-200">বোর্ড স্ট্যান্ডার্ড প্রশ্ন</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="text-lg sm:text-xl font-bold text-white">৩০ মিনিট</div>
              <div className="text-xs text-emerald-200">টাইমড এক্সাম ইঞ্জিন</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="text-lg sm:text-xl font-bold text-white">GPA 5.0</div>
              <div className="text-xs text-emerald-200">সঠিক মূল্যায়ন ও সনদ</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="বিষয় খুঁজুন (যেমন: গণিত, পদার্থ, হিসাববিজ্ঞান)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ক্লিয়ার
              </button>
            )}
          </div>

          {/* Subject Count Indicator */}
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 self-end md:self-center">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>মোট {toBengaliNumber(filteredSubjects.length)}টি বিষয় প্রদর্শিত</span>
          </div>
        </div>

        {/* Group Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {Object.entries(GROUP_LABELS).map(([key, label]) => {
            const isSelected = selectedGroup === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedGroup(key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-[1.02]'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-emerald-400'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subject Cards Grid */}
      {filteredSubjects.length === 0 ? (
        <div className="text-center py-16 glass-panel rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
          <BookOpen className="w-12 h-12 mx-auto text-slate-400 mb-3" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">কোনো বিষয় খুঁজে পাওয়া যায়নি</h3>
          <p className="text-xs text-slate-500 mt-1">অন্য কোনো কি-ওয়ার্ড দিয়ে অনুসন্ধান করুন।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSubjects.map((sub) => {
            const IconComponent = ICON_MAP[sub.icon] || BookOpen;

            return (
              <div
                key={sub.id}
                className="glass-card rounded-2xl p-5 flex flex-col justify-between group shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 border border-slate-200 dark:border-slate-800/80"
              >
                <div>
                  {/* Card Header: Icon, Code, Question Count */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sub.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                        কোড: {sub.code}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {toBengaliNumber(sub.timeMinutes)} মিনিট
                      </span>
                    </div>
                  </div>

                  {/* Subject Name */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {sub.banglaName}
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-2.5">
                    {sub.name}
                  </div>

                  {/* Subject Summary */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {sub.desc}
                  </p>
                </div>

                {/* Card Actions: 2 Distinct Modes */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2">
                  
                  {/* Timed Model Test Button */}
                  <button
                    onClick={() => onStartExam(sub)}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 flex items-center justify-center gap-1.5 transition-transform active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>মডেল টেস্ট</span>
                  </button>

                  {/* Practice Mode with Instant Explanations */}
                  <button
                    onClick={() => onStartPractice(sub)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-300 text-xs font-bold border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5 transition-colors active:scale-95"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    <span>অনুশীলন</span>
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
