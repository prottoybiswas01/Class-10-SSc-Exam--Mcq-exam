import { mathQuestions } from './math.js';
import { higherMathQuestions } from './higherMath.js';
import { physicsQuestions } from './physics.js';
import { chemistryQuestions } from './chemistry.js';
import { biologyQuestions } from './biology.js';
import { bangla2ndQuestions } from './bangla2nd.js';
import { banglaSahapathQuestions } from './banglaSahapath.js';
import { bgsQuestions } from './bgs.js';
import { generalScienceQuestions } from './generalScience.js';
import { accountingQuestions } from './accounting.js';
import { businessQuestions } from './business.js';
import { financeQuestions } from './finance.js';
import { economicsQuestions } from './economics.js';
import { civicsQuestions } from './civics.js';
import { geographyQuestions } from './geography.js';
import { historyQuestions } from './history.js';
import { ictQuestions } from './ict.js';
import { agricultureQuestions } from './agriculture.js';
import { homeScienceQuestions } from './homeScience.js';
import { islamStudiesQuestions } from './islamStudies.js';
import { hinduStudiesQuestions } from './hinduStudies.js';
import { artsCraftsQuestions } from './artsCrafts.js';
import { careerStudiesQuestions } from './careerStudies.js';

export const QUESTION_BANKS = {
  math: mathQuestions,
  higherMath: higherMathQuestions,
  physics: physicsQuestions,
  chemistry: chemistryQuestions,
  biology: biologyQuestions,
  bangla2nd: bangla2ndQuestions,
  banglaSahapath: banglaSahapathQuestions,
  bgs: bgsQuestions,
  generalScience: generalScienceQuestions,
  accounting: accountingQuestions,
  business: businessQuestions,
  finance: financeQuestions,
  economics: economicsQuestions,
  civics: civicsQuestions,
  geography: geographyQuestions,
  history: historyQuestions,
  ict: ictQuestions,
  agriculture: agricultureQuestions,
  homeScience: homeScienceQuestions,
  islamStudies: islamStudiesQuestions,
  hinduStudies: hinduStudiesQuestions,
  artsCrafts: artsCraftsQuestions,
  careerStudies: careerStudiesQuestions,
};

export function getQuestionsBySubject(subjectId) {
  return QUESTION_BANKS[subjectId] || [];
}
