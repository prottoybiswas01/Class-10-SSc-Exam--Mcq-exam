export const SUBJECT_GROUPS = {
  ALL: 'all',
  COMPULSORY: 'compulsory',
  SCIENCE: 'science',
  COMMERCE: 'commerce',
  HUMANITIES: 'humanities',
  OPTIONAL: 'optional'
};

export const GROUP_LABELS = {
  all: 'সকল বিষয় (All Subjects)',
  compulsory: 'আবশ্যিক বিষয় (Compulsory)',
  science: 'বিজ্ঞান বিভাগ (Science)',
  commerce: 'ব্যবসায় শিক্ষা (Commerce)',
  humanities: 'মানবিক বিভাগ (Humanities)',
  optional: 'ঐচ্ছিক বিষয় (Optional)'
};

export const SUBJECTS = [
  // Science Group
  {
    id: 'math',
    name: 'গণিত (Mathematics)',
    banglaName: 'সাধারণ গণিত',
    code: '১০৯',
    group: 'science',
    icon: 'Calculator',
    color: 'from-blue-500 to-indigo-600',
    textColor: 'text-blue-500',
    totalQuestions: 30,
    timeMinutes: 30,
    desc: 'বাস্তব সংখ্যা, বীজগণিতীয় রাশি, ত্রিকোণমিতি, জ্যামিতি ও পরিসংখ্যান'
  },
  {
    id: 'higherMath',
    name: 'উচ্চতর গণিত (Higher Math)',
    banglaName: 'উচ্চতর গণিত',
    code: '১২৬',
    group: 'science',
    icon: 'Variable',
    color: 'from-indigo-600 to-purple-600',
    textColor: 'text-indigo-600',
    totalQuestions: 30,
    timeMinutes: 30,
    desc: 'সেট ও ফাংশন, দ্বিপদী বিস্তৃতি, স্থানাঙ্ক জ্যামিতি, সম্ভাবনা ও ভেক্টর'
  },
  {
    id: 'physics',
    name: 'পদার্থবিজ্ঞান (Physics)',
    banglaName: 'পদার্থবিজ্ঞান',
    code: '১৩৬',
    group: 'science',
    icon: 'Atom',
    color: 'from-cyan-500 to-blue-600',
    textColor: 'text-cyan-500',
    totalQuestions: 30,
    timeMinutes: 30,
    desc: 'গতি, বল, কাজ ক্ষমতা ও শক্তি, পদার্থের অবস্থা, আলো ও স্থির তড়িৎ'
  },
  {
    id: 'chemistry',
    name: 'রসায়ন (Chemistry)',
    banglaName: 'রসায়ন',
    code: '১৩৭',
    group: 'science',
    icon: 'FlaskConical',
    color: 'from-amber-500 to-orange-600',
    textColor: 'text-amber-500',
    totalQuestions: 30,
    timeMinutes: 30,
    desc: 'পদার্থের গঠন, পর্যায় সারণি, রাসায়নিক বন্ধন, জারণ-বিজারণ ও এসিড-ক্ষারক'
  },
  {
    id: 'biology',
    name: 'জীববিজ্ঞান (Biology)',
    banglaName: 'জীববিজ্ঞান',
    code: '১৩৮',
    group: 'science',
    icon: 'Dna',
    color: 'from-emerald-500 to-green-600',
    textColor: 'text-emerald-500',
    totalQuestions: 30,
    timeMinutes: 30,
    desc: 'কোষ ও টিস্যু, কোষ বিভাজন, জীবনীশক্তি, খাদ্য ও পরিপাক, বংশগতি ও জীবপ্রযুক্তি'
  },
  {
    id: 'bgs',
    name: 'বাংলাদেশ ও বিশ্বপরিচয় (BGS)',
    banglaName: 'বাংলাদেশ ও বিশ্বপরিচয়',
    code: '১৫০',
    group: 'science',
    icon: 'Globe2',
    color: 'from-emerald-600 to-teal-700',
    textColor: 'text-emerald-600',
    totalQuestions: 30,
    timeMinutes: 30,
    desc: 'পূর্ব বাংলার আন্দোলন, মুক্তিযুদ্ধ, সংবিধান, ভূ-প্রকৃতি, সামাজিক পরিবর্তন'
  },

  // Compulsory
  {
    id: 'bangla2nd',
    name: 'বাংলা ২য় পত্র (Bangla 2nd)',
    banglaName: 'বাংলা ব্যাকরণ ও নির্মিতি',
    code: '১০২',
    group: 'compulsory',
    icon: 'BookOpenCheck',
    color: 'from-rose-500 to-pink-600',
    textColor: 'text-rose-500',
    totalQuestions: 30,
    timeMinutes: 30,
    desc: 'ধ্বনি পরিবর্তন, সন্ধি, ণ-ত্ব ও ষ-ত্ব বিধান, সমাস, প্রত্যয়, উপসর্গ ও বাক্য'
  },
  {
    id: 'banglaSahapath',
    name: 'বাংলা সহপাঠ (Sahapath)',
    banglaName: 'বাংলা সহপাঠ (কাকতাড়ুয়া ও বহিপীর)',
    code: '১০১',
    group: 'compulsory',
    icon: 'BookText',
    color: 'from-pink-500 to-rose-600',
    textColor: 'text-pink-500',
    totalQuestions: 30,
    timeMinutes: 30,
    desc: 'উপন্যাস (কাকতাড়ুয়া) এবং নাটক (বহিপীর) ভিত্তিক গভীর বিশ্লেষণধর্মী প্রশ্ন'
  },
  {
    id: 'ict',
    name: 'তথ্য ও যোগাযোগ প্রযুক্তি (ICT)',
    banglaName: 'তথ্য ও যোগাযোগ প্রযুক্তি',
    code: '১৫৪',
    group: 'compulsory',
    icon: 'Cpu',
    color: 'from-sky-500 to-blue-600',
    textColor: 'text-sky-500',
    totalQuestions: 30,
    timeMinutes: 30,
    desc: 'ই-লার্নিং, ডিজিটাল নিরাপত্তা, ওয়ার্ড প্রসেসর, স্প্রেডশিট, ডাটাবেস ও মাল্টিমিডিয়া'
  },
  {
    id: 'islamStudies',
    name: 'ইসলাম ও নৈতিক শিক্ষা',
    banglaName: 'ইসলাম ও নৈতিক শিক্ষা',
    code: '১১১',
    group: 'compulsory',
    icon: 'Moon',
    color: 'from-teal-600 to-emerald-700',
    textColor: 'text-teal-600',
    totalQuestions: 30,
    timeMinutes: 30,
    desc: 'আকাইদ, শরীয়ত, ইবাদত, আখলাক ও ইসলামী মনীষীদের আদর্শ জীবনী'
  },
  {
    id: 'hinduStudies',
    name: 'হিন্দুধর্ম ও নৈতিক শিক্ষা',
    banglaName: 'হিন্দুধর্ম ও নৈতিক শিক্ষা',
    code: '১১২',
    group: 'compulsory',
    icon: 'Sun',
    color: 'from-orange-500 to-amber-600',
    textColor: 'text-orange-500',
    totalQuestions: 30,
    timeMinutes: 30,
    desc: 'স্রষ্টা ও সৃষ্টি, দেব-দেবী ও পূজা, ধর্মীয় উপাখ্যান, নীতিশিক্ষা ও অবতার'
  },
  {
    id: 'careerStudies',
    name: 'ক্যারিয়ার শিক্ষা (Career Studies)',
    banglaName: 'ক্যারিয়ার শিক্ষা',
    code: '১৫৬',
    group: 'compulsory',
    icon: 'Briefcase',
    color: 'from-violet-500 to-purple-600',
    textColor: 'text-violet-500',
    totalQuestions: 30,
    timeMinutes: 30,
    desc: 'আমি ও আমার কর্মজগৎ, পেশা নির্বাচন, কর্মদক্ষতা ও ভবিষ্যৎ পরিকল্পনা'
  },
  {
    id: 'artsCrafts',
    name: 'চারু ও কারুকলা (Arts & Crafts)',
    banglaName: 'চারু ও কারুকলা',
    code: '১৪৮',
    group: 'compulsory',
    icon: 'Palette',
    color: 'from-fuchsia-500 to-pink-600',
    textColor: 'text-fuchsia-500',
    totalQuestions: 30,
    timeMinutes: 30,
    desc: 'চারুকলার ইতিহাস, শিল্পকলা ও সমাজ, লোকশিল্প এবং শিল্পমাধ্যমের ব্যবহার'
  },

  // Commerce Group
  {
    id: 'accounting',
    name: 'হিসাববিজ্ঞান (Accounting)',
    banglaName: 'হিসাববিজ্ঞান',
    code: '১৪৬',
    group: 'commerce',
    icon: 'Receipt',
    color: 'from-emerald-600 to-teal-800',
    textColor: 'text-emerald-600',
    totalQuestions: 30,
    timeMinutes: 30,
    desc: 'লেনদেন, জাবেদা, খতিয়ান, রেওয়ামিল, আর্থিক বিবরণী ও পারিবারিক বাজেট'
  },
  {
    id: 'business',
    name: 'ব্যবসায় উদ্যোগ (Business)',
    banglaName: 'ব্যবসায় উদ্যোগ',
    code: '১৪৩',
    group: 'commerce',
    icon: 'Building2',
    color: 'from-blue-600 to-cyan-700',
    textColor: 'text-blue-600',
    totalQuestions: 30,
    timeMinutes: 30,
    desc: 'উদ্যোক্তা, ব্যবসায় পরিবেশ, মালিকানাভিত্তিক ব্যবসায় ও ব্যবসায় পরিকল্পনা'
  },
  {
    id: 'finance',
    name: 'ফিন্যান্স ও ব্যাংকিং (Finance)',
    banglaName: 'ফিন্যান্স ও ব্যাংকিং',
    code: '১৫২',
    group: 'commerce',
    icon: 'Coins',
    color: 'from-yellow-500 to-amber-600',
    textColor: 'text-yellow-600',
    totalQuestions: 30,
    timeMinutes: 30,
    desc: 'অর্থের সময়মূল্য, ঝুঁকি ও অনিশ্চয়তা, মূলধন বাজেটিং ও বাণিজ্যিক ব্যাংকিং'
  },
  {
    id: 'generalScience',
    name: 'সাধারণ বিজ্ঞান (General Science)',
    banglaName: 'সাধারণ বিজ্ঞান',
    code: '১২৭',
    group: 'commerce',
    icon: 'Sparkles',
    color: 'from-teal-500 to-green-600',
    textColor: 'text-teal-500',
    totalQuestions: 30,
    timeMinutes: 30,
    desc: 'উন্নততর জীবনধারা, জীবনের জন্য পানি, পলিমার, আলো ও স্বাস্থ্য সুরক্ষা'
  },

  // Humanities Group
  {
    id: 'geography',
    name: 'ভূগোল ও পরিবেশ (Geography)',
    banglaName: 'ভূগোল ও পরিবেশ',
    code: '১১০',
    group: 'humanities',
    icon: 'MapPin',
    color: 'from-cyan-600 to-teal-700',
    textColor: 'text-cyan-600',
    totalQuestions: 30,
    timeMinutes: 30,
    desc: 'মহাবিশ্ব ও পৃথিবী, পৃথিবীর অভ্যন্তরীণ গঠন, বাড়ি মণ্ডল ও মানচিত্র'
  },
  {
    id: 'civics',
    name: 'পৌরনীতি ও নাগরিকতা (Civics)',
    banglaName: 'পৌরনীতি ও নাগরিকতা',
    code: '১৪০',
    group: 'humanities',
    icon: 'ShieldCheck',
    color: 'from-blue-500 to-indigo-600',
    textColor: 'text-blue-500',
    totalQuestions: 30,
    timeMinutes: 30,
    desc: 'রাষ্ট্র, আইন ও অধিকার, নাগরিকত্ব, সরকার ব্যবস্থা ও সংবিধান'
  },
  {
    id: 'economics',
    name: 'অর্থনীতি (Economics)',
    banglaName: 'অর্থনীতি',
    code: '১৪১',
    group: 'humanities',
    icon: 'TrendingUp',
    color: 'from-green-600 to-emerald-700',
    textColor: 'text-green-600',
    totalQuestions: 30,
    timeMinutes: 30,
    desc: 'মৌলিক ধারণা, চাহিদা ও যোগান, জাতীয় আয়, বাজার কাঠামো ও সরকারি অর্থ'
  },
  {
    id: 'history',
    name: 'ইতিহাস ও বিশ্বসভ্যতা (History)',
    banglaName: 'বাংলাদেশের ইতিহাস ও বিশ্বসভ্যতা',
    code: '১৫৩',
    group: 'humanities',
    icon: 'Landmark',
    color: 'from-amber-600 to-orange-700',
    textColor: 'text-amber-600',
    totalQuestions: 30,
    timeMinutes: 30,
    desc: 'প্রাচীন বিশ্বসভ্যতা, মধ্যযুগ ও সুলতানি আমল, পলাশীর যুদ্ধ ও মুক্তিযুদ্ধ'
  },

  // Optional
  {
    id: 'agriculture',
    name: 'কৃষিশিক্ষা (Agriculture)',
    banglaName: 'কৃষিশিক্ষা',
    code: '১৩৪',
    group: 'optional',
    icon: 'Sprout',
    color: 'from-lime-600 to-green-700',
    textColor: 'text-lime-600',
    totalQuestions: 30,
    timeMinutes: 30,
    desc: 'কৃষি প্রযুক্তি, কৃষি উপকরণ, কৃষি ও জলবায়ু এবং বনায়ন'
  },
  {
    id: 'homeScience',
    name: 'গার্হস্থ্যবিজ্ঞান (Home Science)',
    banglaName: 'গার্হস্থ্যবিজ্ঞান',
    code: '১৫১',
    group: 'optional',
    icon: 'Home',
    color: 'from-rose-500 to-red-600',
    textColor: 'text-rose-500',
    totalQuestions: 30,
    timeMinutes: 30,
    desc: 'গৃহ ব্যবস্থাপনা, শিশু বিকাশ, পুষ্টি ও খাদ্য পরিকল্পনা এবং পোশাক পরিচ্ছদ'
  }
];
