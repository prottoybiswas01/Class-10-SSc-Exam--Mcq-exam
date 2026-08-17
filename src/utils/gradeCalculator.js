/**
 * Bangladesh Secondary School Certificate (SSC) Grading System
 * 80 - 100% : A+ (GPA 5.0)
 * 70 - 79%  : A  (GPA 4.0)
 * 60 - 69%  : A- (GPA 3.5)
 * 50 - 59%  : B  (GPA 3.0)
 * 40 - 49%  : C  (GPA 2.0)
 * 33 - 39%  : D  (GPA 1.0)
 * 0  - 32%  : F  (GPA 0.0)
 */

export function calculateSSCGrade(obtainedMarks, totalMarks = 30) {
  if (totalMarks <= 0) return { grade: 'F', gpa: 0.0, label: 'অকৃতকার্য', color: 'text-red-500' };
  
  const percentage = Math.max(0, (obtainedMarks / totalMarks) * 100);
  
  if (percentage >= 80) {
    return {
      grade: 'A+',
      gpa: 5.0,
      label: 'অসাধারণ (Outstanding)',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10 border-emerald-500/30',
      badgeColor: 'bg-emerald-500 text-white',
      passed: true
    };
  } else if (percentage >= 70) {
    return {
      grade: 'A',
      gpa: 4.0,
      label: 'চমৎকার (Excellent)',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10 border-green-500/30',
      badgeColor: 'bg-green-600 text-white',
      passed: true
    };
  } else if (percentage >= 60) {
    return {
      grade: 'A-',
      gpa: 3.5,
      label: 'খুব ভালো (Very Good)',
      color: 'text-teal-500',
      bgColor: 'bg-teal-500/10 border-teal-500/30',
      badgeColor: 'bg-teal-600 text-white',
      passed: true
    };
  } else if (percentage >= 50) {
    return {
      grade: 'B',
      gpa: 3.0,
      label: 'ভালো (Good)',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10 border-blue-500/30',
      badgeColor: 'bg-blue-600 text-white',
      passed: true
    };
  } else if (percentage >= 40) {
    return {
      grade: 'C',
      gpa: 2.0,
      label: 'সন্তোষজনক (Satisfactory)',
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10 border-amber-500/30',
      badgeColor: 'bg-amber-600 text-white',
      passed: true
    };
  } else if (percentage >= 33) {
    return {
      grade: 'D',
      gpa: 1.0,
      label: 'উত্তীর্ণ (Passed)',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10 border-orange-500/30',
      badgeColor: 'bg-orange-600 text-white',
      passed: true
    };
  } else {
    return {
      grade: 'F',
      gpa: 0.0,
      label: 'পুনরায় প্রস্তুতি প্রয়োজন (Needs Improvement)',
      color: 'text-rose-500',
      bgColor: 'bg-rose-500/10 border-rose-500/30',
      badgeColor: 'bg-rose-600 text-white',
      passed: false
    };
  }
}

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function toBengaliNumber(num) {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (d) => bnDigits[parseInt(d, 10)]);
}
