import { NCTB_SYLLABUS } from '../data/syllabus';

const GEMINI_API_KEY_STORAGE = 'ssc_mcq_gemini_api_key_v1';
const GEMINI_MODEL_STORAGE = 'ssc_mcq_gemini_model_v1';

export const AI_MODELS = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash (Super Fast & Accurate)', recommended: true },
  { id: 'gemini-3.7-flash', name: 'Gemini 3.7 Flash (Next-Gen Reasoning)' },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash' },
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash' }
];

export const aiConfig = {
  getApiKey: () => {
    try {
      return localStorage.getItem(GEMINI_API_KEY_STORAGE) || '';
    } catch (e) {
      return '';
    }
  },

  setApiKey: (key) => {
    try {
      localStorage.setItem(GEMINI_API_KEY_STORAGE, key.trim());
    } catch (e) {
      console.error(e);
    }
  },

  getModel: () => {
    try {
      return localStorage.getItem(GEMINI_MODEL_STORAGE) || 'gemini-2.5-flash';
    } catch (e) {
      return 'gemini-2.5-flash';
    }
  },

  setModel: (model) => {
    try {
      localStorage.setItem(GEMINI_MODEL_STORAGE, model);
    } catch (e) {
      console.error(e);
    }
  }
};

/**
 * Generate fresh board-standard MCQs dynamically via Gemini API
 */
export async function generateAIQuestions(subjectId, count = 30, difficulty = 'board-standard') {
  const syllabusInfo = NCTB_SYLLABUS[subjectId] || {
    subject: subjectId,
    code: '100',
    chapters: ['সাধারণ জ্ঞান ও বিষয়ভিত্তিক ধারণা']
  };

  const apiKey = aiConfig.getApiKey();
  const model = aiConfig.getModel();

  if (!apiKey) {
    throw new Error('MISSING_API_KEY');
  }

  const prompt = `You are a chief curriculum examiner and senior question setter for the Bangladesh Secondary School Certificate (SSC) Board Examination.
Your task is to generate exactly ${count} completely fresh, unique, challenging, and authentic board-standard Multiple Choice Questions (MCQs) in Bengali for Class 10 SSC examinees.

Subject: ${syllabusInfo.subject} (Subject Code: ${syllabusInfo.code})
Difficulty level: ${difficulty} (Must strictly follow NCTB SSC Board Examination standards).

Topics & Chapters to cover across the 30 questions:
${syllabusInfo.chapters.map((ch, i) => `${i + 1}. ${ch}`).join('\n')}

Format & Guidelines:
1. Language: Strictly authentic Bengali (বাংলা ভাষা ও পরিভাষা).
2. Question Types composition:
   - 70% Standard Single Choice questions (সাধারণ বহুনির্বাচনী).
   - 15% Multi-statement questions (বহুপদী সমাপ্তিসূচক: 'i. ...', 'ii. ...', 'iii. ...' followed by 'নিচের কোনটি সঠিক?').
   - 15% Context/Scenario/Stem-based questions (উদ্দীপকভিত্তিক: provide a concise 'stem' before the question).
3. Every question must have:
   - 'id': string, e.g. "q_1", "q_2", ...
   - 'chapter': Bengali chapter name from the provided list
   - 'type': 'standard' | 'multi' | 'stem'
   - 'stem': string (only if type is 'stem', otherwise omit or null)
   - 'statements': array of strings (only if type is 'multi', e.g. ["i. ...", "ii. ...", "iii. ..."], otherwise omit or null)
   - 'question': the actual Bengali question text
   - 'options': an array of exactly 4 plausible Bengali options [option0, option1, option2, option3]
   - 'correctAnswer': integer index (0, 1, 2, or 3) pointing to the correct option in the options array
   - 'explanation': an in-depth, pedagogical Bengali explanation (বিশদ সমাধান ও পাঠ্যবই রেফারেন্স) explaining why the answer is correct.

OUTPUT FORMAT:
Return ONLY a valid, raw JSON array of objects. Do not include markdown code block backticks (\`\`\`json), do not include any preamble or postamble text.

Example JSON output structure:
[
  {
    "id": "q_1",
    "chapter": "বাস্তব সংখ্যা",
    "type": "standard",
    "question": "০.৩̇ এবং ০.৬̇ এর গুণফল কত?",
    "options": ["০.১৮̇", "০.২̇", "০.২", "০.১৮"],
    "correctAnswer": 1,
    "explanation": "০.৩̇ = ৩/৯ = ১/৩ এবং ০.৬̇ = ৬/৯ = ২/৩। এদের গুণফল = (১/৩) × (২/৩) = ২/৯ = ০.২̇।"
  }
]`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 8192,
        responseMimeType: 'application/json'
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.error?.message || response.statusText || 'API Request Failed';
    throw new Error(`GEMINI_API_ERROR: ${message}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error('EMPTY_RESPONSE_FROM_AI');
  }

  // Parse JSON from response
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }

  const questions = JSON.parse(cleaned);

  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error('INVALID_JSON_ARRAY');
  }

  return questions;
}

/**
 * Verify Gemini API Key
 */
export async function testGeminiApiKey(key, model = 'gemini-2.5-flash') {
  if (!key) throw new Error('API Key cannot be empty');
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key.trim()}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: 'Respond with "OK"' }] }],
      generationConfig: { maxOutputTokens: 10 }
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Invalid API Key');
  }

  return true;
}
