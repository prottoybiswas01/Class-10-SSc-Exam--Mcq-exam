export const higherMathQuestions = [
  {
    id: 'hm1',
    chapter: 'সেট ও ফাংশন',
    type: 'standard',
    question: 'f(x) = √(2x - 6) ফাংশনটির ডোমেন কত?',
    options: ['[3, ∞)', '(3, ∞)', '(-∞, 3]', 'R'],
    correctAnswer: 0,
    explanation: 'বর্গমূলের ভিতরের মান অঋণাত্মক হতে হবে: 2x - 6 ≥ 0 => 2x ≥ 6 => x ≥ 3। সুতরাং ডোমেন = [3, ∞)।'
  },
  {
    id: 'hm2',
    chapter: 'বীজগণিতীয় রাশি',
    type: 'standard',
    question: 'P(x) = x³ - 6x² + 11x - 6 বহুপদীর একটি উৎপাদক কোনটি?',
    options: ['(x + 1)', '(x - 2)', '(x + 2)', '(x + 3)'],
    correctAnswer: 1,
    explanation: 'x = 2 বসালে P(2) = 2³ - 6(2²) + 11(2) - 6 = 8 - 24 + 22 - 6 = 0। সুতরাং (x - 2) বহুপদীটির একটি উৎপাদক।'
  },
  {
    id: 'hm3',
    chapter: 'জ্যামিতি (অ্যাপোলোনিয়াস)',
    type: 'standard',
    question: 'ΔABC এর AD একটি মধ্যমা হলে অ্যাপোলোনিয়াসের উপপাদ্য কোনটি?',
    options: [
      'AB² + AC² = 2(AD² + BD²)',
      'AB² + AC² = AD² + BD²',
      'AB² + BC² = 2(AC² + AD²)',
      'AB² + AC² = 2(AD² - BD²)'
    ],
    correctAnswer: 0,
    explanation: 'অ্যাপোলোনিয়াসের উপপাদ্য অনুসারে, ত্রিভুজের যেকোনো দুই বাহুর ওপর অঙ্কিত বর্গক্ষেত্রের ক্ষেত্রফলের সমষ্টি = ২ × (মধ্যমার ওপর বর্গ + তৃতীয় বাহুর অর্ধেকের ওপর বর্গ)।'
  },
  {
    id: 'hm4',
    chapter: 'জ্যামিতিক অঙ্কন',
    type: 'standard',
    question: 'একটি সমবাহু ত্রিভুজের পরিবৃত্ত, অন্তর্বৃত্ত ও বহির্বৃত্তের কেন্দ্র—',
    options: ['ভিন্ন বিন্দু', 'একই সমবিন্দু', 'ত্রিভুজের বাইরে', 'অতিভুজের মধ্যবিন্দু'],
    correctAnswer: 1,
    explanation: 'সমবাহু ত্রিভুজের পরিকেন্দ্র, অন্তঃকেন্দ্র, ভরকেন্দ্র ও লম্ববিন্দু সবই একই বিন্দুতে অবস্থান করে।'
  },
  {
    id: 'hm5',
    chapter: 'দ্বিপদী বিস্তৃতি',
    type: 'standard',
    question: '(1 + x)⁸ এর বিস্তৃতিতে মধ্যপদের সংখ্যা কয়টি?',
    options: ['১টি', '২টি', '৩টি', '৮টি'],
    correctAnswer: 0,
    explanation: 'ঘাত n = 8 (জোড়)। মোট পদ = n + 1 = 9টি। সুতরাং একমাত্র মধ্যপদ হবে (8/2 + 1) = ৫ম পদ।'
  },
  {
    id: 'hm6',
    chapter: 'দ্বিপদী বিস্তৃতি',
    type: 'standard',
    question: '(x - 1/x)⁶ এর বিস্তৃতিতে x-বর্জিত পদের মান কত?',
    options: ['-20', '20', '15', '-15'],
    correctAnswer: 0,
    explanation: 'r+1 তম পদ = ⁶Cr (x)^(6-r) (-1/x)^r = ⁶Cr (-1)^r x^(6-2r)। x-বর্জিত পদের জন্য 6 - 2r = 0 => r = 3। পদটি = ⁶C3 (-1)³ = 20 × (-1) = -20।'
  },
  {
    id: 'hm7',
    chapter: 'অসীম ধারা',
    type: 'standard',
    question: '1 + 1/3 + 1/9 + 1/27 + ...... অসীম গুণোত্তর ধারার অসীমতক সমষ্টি কত?',
    options: ['3/2', '2/3', '1/3', 'অসীম'],
    correctAnswer: 0,
    explanation: 'a = 1, r = 1/3 (< 1)। S_∞ = a / (1 - r) = 1 / (1 - 1/3) = 1 / (2/3) = 3/2।'
  },
  {
    id: 'hm8',
    chapter: 'ত্রিকোণমিতি',
    type: 'standard',
    question: 'রেডিয়ান কোণ কোন ধরনের কোণ?',
    options: ['স্থূলকোণ', 'ধ্রুব কোণ', 'সরল কোণ', 'প্রবৃদ্ধ কোণ'],
    correctAnswer: 1,
    explanation: 'রেডিয়ান একটি ধ্রুব কোণ (Constant Angle)। এর মান প্রায় 57° 17\' 44.8\'\'।'
  },
  {
    id: 'hm9',
    chapter: 'ত্রিকোণমিতি',
    type: 'standard',
    question: 'sec(-θ) = কত?',
    options: ['-sec θ', 'sec θ', '-cos θ', 'cosec θ'],
    correctAnswer: 1,
    explanation: 'চতুর্থ চতুর্ভাগে cos(-θ) = cos θ এবং sec(-θ) = sec θ।'
  },
  { 
    id: 'hm10',
    chapter: 'ত্রিকোণমিতি',
    type: 'standard',
    question: 'sin (13π/6) এর মান কত?',
    options: ['1/2', '√3/2', '-1/2', '1'],
    correctAnswer: 0,
    explanation: 'sin (13π/6) = sin (2π + π/6) = sin (π/6) = sin 30° = 1/2।'
  },
  {
    id: 'hm11',
    chapter: 'সূচকীয় ও লগারিদমীয় ফাংশন',
    type: 'standard',
    question: 'ln e^x এর মান কত?',
    options: ['e', 'x', '1', '0'],
    correctAnswer: 1,
    explanation: 'ln e^x = x ln e = x × 1 = x।'
  },
  {
    id: 'hm12',
    chapter: 'স্থানাঙ্ক জ্যামিতি',
    type: 'standard',
    question: '3x - 4y + 12 = 0 সরলরেখাটি দ্বারা y অক্ষের খণ্ডিতাংশের দৈর্ঘ্য কত?',
    options: ['3', '4', '-3', '12'],
    correctAnswer: 0,
    explanation: 'রেখার সমীকরণ: 3x - 4y = -12 => x/(-4) + y/3 = 1। সুতরাং y অক্ষের খণ্ডিতাংশ = 3।'
  },
  {
    id: 'hm13',
    chapter: 'স্থানাঙ্ক জ্যামিতি',
    type: 'standard',
    question: '(2, 3) এবং (4, 7) বিন্দুগামী সরলরেখার ঢাল (Slope) কত?',
    options: ['1/2', '2', '4', '3/2'],
    correctAnswer: 1,
    explanation: 'ঢাল m = (y2 - y1) / (x2 - x1) = (7 - 3) / (4 - 2) = 4 / 2 = 2।'
  },
  {
    id: 'hm14',
    chapter: 'ভেক্টর',
    type: 'multi',
    question: 'দুটি সমান্তরাল ভেক্টরের ক্ষেত্রে—',
    statements: [
      'i. তাদের ধারক রেখা একই বা সমান্তরাল',
      'ii. তাদের দিক একই বা বিপরীত হতে পারে',
      'iii. মান সমান হওয়া আবশ্যক'
    ],
    options: ['i ও ii', 'ii ও iii', 'i ও iii', 'i, ii ও iii'],
    correctAnswer: 0,
    explanation: 'সমান্তরাল ভেক্টরের মান সমান হওয়া বাধ্যতামূলক নয়; সমান হলে তারা সমান ভেক্টর বা বিপরীত ভেক্টর হবে।'
  },
  {
    id: 'hm15',
    chapter: 'ভেক্টর',
    type: 'standard',
    question: 'একটি অবস্থান ভেক্টর r = 3i + 4j হলে, |r| এর মান কত?',
    options: ['7', '5', '1', '25'],
    correctAnswer: 1,
    explanation: '|r| = √(3² + 4²) = √(9 + 16) = √25 = 5 একক।'
  },
  {
    id: 'hm16',
    chapter: 'সম্ভাবনা (Probability)',
    type: 'standard',
    question: 'একটি নিরপেক্ষ ছক্কা একবার নিক্ষেপ করলে মৌলিক সংখ্যা আসার সম্ভাবনা কত?',
    options: ['1/6', '1/3', '1/2', '2/3'],
    correctAnswer: 2,
    explanation: 'ছক্কার সম্ভাব্য ফলাফল {1, 2, 3, 4, 5, 6} (মোট ৬টি)। মৌলিক সংখ্যা {2, 3, 5} (৩টি)। সম্ভাবনা = ৩/৬ = ১/২।'
  },
  {
    id: 'hm17',
    chapter: 'সম্ভাবনা',
    type: 'standard',
    question: 'একটি মুদ্রা দুইবার নিক্ষেপ করলে কমপক্ষে একটি Head (H) পাওয়ার সম্ভাবনা কত?',
    options: ['1/4', '1/2', '3/4', '1'],
    correctAnswer: 2,
    explanation: 'নমুনা ক্ষেত্র S = {HH, HT, TH, TT} (মোট ৪টি)। কমপক্ষে একটি H বিশিষ্ট ঘটনা = {HH, HT, TH} (৩টি)। সম্ভাবনা = ৩/৪।'
  },
  {
    id: 'hm18',
    chapter: 'ঘন জ্যামিতি',
    type: 'standard',
    question: 'একটি সিলিন্ডারের ভূমির ব্যাসার্ধ r এবং উচ্চতা h হলে এর সমগ্র তলের ক্ষেত্রফল কোনটি?',
    options: ['2πrh', 'πr²h', '2πr(r + h)', '2/3 πr³'],
    correctAnswer: 2,
    explanation: 'সিলিন্ডারের সমগ্র তলের ক্ষেত্রফল = ২ × ভূমির ক্ষেত্রফল + বক্রতলের ক্ষেত্রফল = 2πr² + 2πrh = 2πr(r + h)।'
  },
  {
    id: 'hm19',
    chapter: 'ঘন জ্যামিতি',
    type: 'standard',
    question: 'r ব্যাসার্ধবিশিষ্ট গোলকের আয়তন কত?',
    options: ['4πr²', '4/3 πr³', '2/3 πr³', 'πr³'],
    correctAnswer: 1,
    explanation: 'গোলকের আয়তনের সূত্র = 4/3 πr³।'
  },
  {
    id: 'hm20',
    chapter: 'দ্বিপদী বিস্তৃতি',
    type: 'standard',
    question: 'প্যাসকেলের ত্রিভুজ কিসের সহগ নির্ণয়ে ব্যবহৃত হয়?',
    options: ['দ্বিপদী বিস্তৃতি', 'বহুপদী উৎপাদক', 'অসীম গুণোত্তর ধারা', 'ম্যাট্রিক্স'],
    correctAnswer: 0,
    explanation: 'প্যাসকেলের ত্রিভুজ দ্বিপদী রাশির বিভিন্ন ঘাতের বিস্তৃতির সহগ সহজ পদ্ধতিতে বের করতে ব্যবহৃত হয়।'
  },
  {
    id: 'hm21',
    chapter: 'ত্রিকোণমিতি',
    type: 'standard',
    question: 'একটি বৃত্তের ব্যাসার্ধ 7 সেমি হলে 11 সেমি চাপের কেন্দ্রস্থ কোণ কত রেডিয়ান?',
    options: ['11/7 রেডিয়ান', '7/11 রেডিয়ান', '77 রেডিয়ান', '1.2 রেডিয়ান'],
    correctAnswer: 0,
    explanation: 's = rθ => θ = s/r = 11/7 রেডিয়ান।'
  },
  {
    id: 'hm22',
    chapter: 'অসীম ধারা',
    type: 'multi',
    question: 'একটি গুণোত্তর ধারার সাধারণ অনুপাত r হলে অসীমতক সমষ্টি থাকবে যদি—',
    statements: [
      'i. |r| < 1 হয়',
      'ii. -1 < r < 1 হয়',
      'iii. r ≥ 1 হয়'
    ],
    options: ['i ও ii', 'ii ও iii', 'i ও iii', 'i, ii ও iii'],
    correctAnswer: 0,
    explanation: 'গুণোত্তর ধারার অসীমতক সমষ্টি কেবল তখনই বিদ্যমান থাকে যখন |r| < 1 অর্থাৎ -1 < r < 1।'
  },
  {
    id: 'hm23',
    chapter: 'বীজগণিতীয় রাশি',
    type: 'standard',
    question: 'x³ + y³ + z³ - 3xyz এর উৎপাদক সূত্রের একটি অংশ কোনটি?',
    options: ['(x + y + z)', '(x - y - z)', '(x + y - z)', '(xy + yz + zx)'],
    correctAnswer: 0,
    explanation: 'x³ + y³ + z³ - 3xyz = (x + y + z)(x² + y² + z² - xy - yz - zx)।'
  },
  {
    id: 'hm24',
    chapter: 'সেট ও ফাংশন',
    type: 'standard',
    question: 'f(x) = 2x + 3 হলে, f⁻¹(7) এর মান কত?',
    options: ['2', '5', '17', '1'],
    correctAnswer: 0,
    explanation: 'ধরি f(x) = y = 2x + 3 => x = (y - 3)/2 => f⁻¹(y) = (y - 3)/2। অতএব f⁻¹(7) = (7 - 3)/2 = 4/2 = 2।'
  },
  {
    id: 'hm25',
    chapter: 'স্থানাঙ্ক জ্যামিতি',
    type: 'standard',
    question: 'মূলবিন্দু (0, 0) থেকে 4x + 3y - 10 = 0 সরলরেখার লম্ব দূরত্ব কত একক?',
    options: ['2', '5', '10', '1'],
    correctAnswer: 0,
    explanation: 'লম্ব দূরত্ব d = |4(0) + 3(0) - 10| / √(4² + 3²) = |-10| / √25 = 10 / 5 = 2 একক।'
  },
  {
    id: 'hm26',
    chapter: 'সম্ভাবনা',
    type: 'standard',
    question: 'একটি নিশ্চিত ঘটনার সম্ভাবনা কত?',
    options: ['0', '0.5', '1', 'অসীম'],
    correctAnswer: 2,
    explanation: 'যে ঘটনা নিশ্চিত ঘটবে তার সম্ভাবনা সর্বদা ১ এবং অসম্ভব ঘটনার সম্ভাবনা ০।'
  },
  // Stem based
  {
    id: 'hm27',
    chapter: 'স্থানাঙ্ক জ্যামিতি',
    type: 'stem',
    stem: 'উদ্দীপক: A(1, 2), B(4, 6) এবং C(x, y) তিনটি বিন্দু যেখানে AB রেখার ঢাল m এবং AB এর দৈর্ঘ্য d।',
    question: 'AB রেখাংশের দৈর্ঘ্য d কত একক?',
    options: ['3', '4', '5', '7'],
    correctAnswer: 2,
    explanation: 'd = √[(4 - 1)² + (6 - 2)²] = √[3² + 4²] = √25 = 5 একক।'
  },
  {
    id: 'hm28',
    chapter: 'স্থানাঙ্ক জ্যামিতি',
    type: 'stem',
    stem: 'উদ্দীপক: A(1, 2), B(4, 6) এবং C(x, y) তিনটি বিন্দু যেখানে AB রেখার ঢাল m এবং AB এর দৈর্ঘ্য d।',
    question: 'AB রেখার সমীকরণ কোনটি?',
    options: ['4x - 3y + 2 = 0', '4x - 3y - 2 = 0', '3x - 4y + 5 = 0', '3x + 4y - 11 = 0'],
    correctAnswer: 0,
    explanation: 'ঢাল m = (6 - 2)/(4 - 1) = 4/3। সমীকরণ: y - 2 = 4/3 (x - 1) => 3y - 6 = 4x - 4 => 4x - 3y + 2 = 0।'
  },
  {
    id: 'hm29',
    chapter: 'দ্বিপদী বিস্তৃতি',
    type: 'multi',
    question: '(1 + x)ⁿ এর বিস্তৃতিতে—',
    statements: [
      'i. মোট পদ সংখ্যা (n + 1)',
      'ii. প্রথম পদ সর্বদা 1',
      'iii. শেষ পদ xⁿ'
    ],
    options: ['i ও ii', 'ii ও iii', 'i ও iii', 'i, ii ও iii'],
    correctAnswer: 3,
    explanation: '(1 + x)ⁿ এর মোট পদ (n + 1)টি, প্রথম পদ 1 এবং শেষ পদ xⁿ। তিনটি উক্তিই সঠিক।'
  },
  {
    id: 'hm30',
    chapter: 'ভেক্টর',
    type: 'standard',
    question: 'কোনো ভেক্টরের পাদবিন্দু ও শীর্ষবিন্দু একই হলে তাকে কী বলে?',
    options: ['একক ভেক্টর', 'শূন্য ভেক্টর', 'বিপরীত ভেক্টর', 'স্বাধীন ভেক্টর'],
    correctAnswer: 1,
    explanation: 'যে ভেক্টরের আদিবিন্দু ও প্রান্তবিন্দু একই এবং মান শূন্য, তাকে শূন্য ভেক্টর (Null/Zero Vector) বলা হয়।'
  }
];
