import { NCTB_SYLLABUS } from '../data/syllabus';

const DEFAULT_CF_ACCOUNT_ID = '4856aab769ba28fe73b35aee65e3abc0';
const DEFAULT_CF_GATEWAY_ID = 'default';
const DEFAULT_CF_MODEL = '@cf/meta/llama-3.1-8b-instruct';

/**
 * Generate fresh authentic board-standard MCQs directly from AI
 */
export async function generateAIQuestions(subjectId, count = 30, selectedChapters = [], isFullBook = true) {
  const syllabusInfo = NCTB_SYLLABUS[subjectId] || {
    subject: subjectId,
    code: '100',
    chapters: []
  };

  const targetChapters = (selectedChapters && selectedChapters.length > 0)
    ? selectedChapters
    : syllabusInfo.chapters;

  const geminiKey = localStorage.getItem('ssc_mcq_gemini_api_key_v1') || import.meta.env.VITE_GEMINI_API_KEY || '';
  const cfToken = localStorage.getItem('ssc_mcq_cf_token_v1') || import.meta.env.VITE_CLOUDFLARE_AI_TOKEN || '';
  const cfAccountId = localStorage.getItem('ssc_mcq_cf_account_id_v1') || import.meta.env.VITE_CLOUDFLARE_ACCOUNT_ID || DEFAULT_CF_ACCOUNT_ID;
  const cfGateway = localStorage.getItem('ssc_mcq_cf_gateway_v1') || import.meta.env.VITE_CLOUDFLARE_GATEWAY_NAME || DEFAULT_CF_GATEWAY_ID;

  const prompt = createExamPrompt(syllabusInfo, targetChapters, count);

  let questions = null;

  // 1. Try Cloudflare Workers AI / Gateway if token exists
  if (cfToken && cfToken.trim()) {
    try {
      questions = await fetchFromCloudflareAI(cfToken.trim(), cfAccountId, cfGateway, prompt);
    } catch (err) {
      console.warn('Cloudflare AI Error:', err);
    }
  }

  // 2. Try Direct Google Gemini API if key is present
  if (!questions && geminiKey && geminiKey.trim()) {
    try {
      questions = await fetchFromGoogleGemini(geminiKey.trim(), prompt);
    } catch (err) {
      console.warn('Google Gemini API call error:', err);
      throw err;
    }
  }

  // 3. Fallback error message if no key or all attempts failed
  if (!questions) {
    if (!cfToken && !geminiKey) {
      throw new Error('MISSING_API_KEY: দয়া করে AI Settings থেকে আপনার API Key বা Cloudflare Token সেট করুন।');
    }
    throw new Error('AI ইঞ্জিন থেকে প্রশ্ন তৈরিতে সমস্যা হয়েছে। অনুগ্রহ করে ইন্টারনেট সংযোগ ও API সেটিংস চেক করে আবার চেষ্টা করুন।');
  }

  return sanitizeAndFormatQuestions(questions.slice(0, count), syllabusInfo);
}

/**
 * Prompt Template for SSC Board Examination
 */
function createExamPrompt(syllabusInfo, targetChapters, count) {
  return `You are a Senior Board Examination Specialist & Professor for Bangladesh SSC (Class 10).
Generate exactly ${count} authentic, challenging, 100% board-standard multiple choice questions (MCQ) in Bengali for:
Subject: ${syllabusInfo.subject} (Code: ${syllabusInfo.code})
Selected Chapters:
${targetChapters.join('\n')}

STRICT RULES:
1. Every question MUST be written in fluent Bengali based on NCTB Class 10 Textbook.
2. Include accurate numerical calculations, authentic scientific reactions, Bengali grammar rules, or historical facts.
3. Every question must have 4 options and a detailed step-by-step explanation in Bengali.
4. Output strictly a valid JSON array of objects without conversational text.

Format:
[
  {
    "id": "q_1",
    "chapter": "অধ্যায় নাম",
    "type": "standard",
    "question": "প্রশ্ন বিবরণ",
    "options": ["ক এর উত্তর", "খ এর উত্তর", "গ এর উত্তর", "ঘ এর উত্তর"],
    "correctAnswer": 0,
    "explanation": "ব্যাখ্যা"
  }
]`;
}

/**
 * Cloudflare Workers AI Call
 */
async function fetchFromCloudflareAI(token, accountId, gatewayId, prompt) {
  const customModel = localStorage.getItem('ssc_mcq_gemini_model_v1') || import.meta.env.VITE_AI_MODEL || DEFAULT_CF_MODEL;
  const model = customModel.startsWith('@cf/') ? customModel : DEFAULT_CF_MODEL;

  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'cf-aig-gateway-id': gatewayId || 'default'
    },
    body: JSON.stringify({
      max_tokens: 4096,
      messages: [
        { role: 'system', content: 'You are an AI that outputs only raw JSON arrays for Bangladesh SSC examination MCQs.' },
        { role: 'user', content: prompt }
      ]
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Cloudflare API Error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const rawText = data.result?.response || data.result?.choices?.[0]?.message?.content;
  if (rawText) {
    return parseJsonResponse(rawText);
  }

  throw new Error('Cloudflare AI থেকে কোনো রেসপন্স পাওয়া যায়নি।');
}

/**
 * Direct Google Gemini API Call
 */
async function fetchFromGoogleGemini(apiKey, prompt) {
  const preferredModel = localStorage.getItem('ssc_mcq_gemini_model_v1') || import.meta.env.VITE_AI_MODEL || 'gemini-2.5-flash';
  
  const modelsToTry = [
    preferredModel,
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash'
  ].filter((v, i, a) => a.indexOf(v) === i);

  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      const cleanModel = modelName.replace(/^google\//, '').replace(/^@cf\//, '');
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${cleanModel}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            maxOutputTokens: 8192,
            responseMimeType: 'application/json',
            temperature: 0.7
          }
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        lastError = new Error(`Google API Error (${response.status}): ${errText}`);
        continue;
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        return parseJsonResponse(rawText);
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('Google Gemini AI থেকে উত্তর পাওয়া যায়নি।');
}

/**
 * Parse JSON safely from LLM output
 */
function parseJsonResponse(rawText) {
  let cleaned = rawText.trim();

  // Strip code fences if present
  const jsonMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (jsonMatch) {
    cleaned = jsonMatch[1].trim();
  }

  try {
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && Array.isArray(parsed.questions)) return parsed.questions;
    if (parsed && typeof parsed === 'object') {
      const arrayKey = Object.keys(parsed).find(k => Array.isArray(parsed[k]));
      if (arrayKey) return parsed[arrayKey];
    }
  } catch (err) {
    // Attempt greedy JSON array extraction
    const firstBracket = cleaned.indexOf('[');
    const lastBracket = cleaned.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
      try {
        const sub = cleaned.substring(firstBracket, lastBracket + 1);
        const parsed = JSON.parse(sub);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error('Failed to parse extracted JSON array:', e);
      }
    }
  }

  return null;
}

/**
 * Sanitize question objects
 */
function sanitizeAndFormatQuestions(questions, syllabusInfo) {
  return questions.map((q, idx) => ({
    id: q.id || `ai_q_${idx + 1}_${Date.now().toString(36)}`,
    chapter: q.chapter || syllabusInfo.chapters[0] || 'বোর্ড সিলেবাস',
    type: q.type || (q.statements && q.statements.length > 0 ? 'multi' : q.stem ? 'stem' : 'standard'),
    stem: q.stem || null,
    statements: Array.isArray(q.statements) ? q.statements : null,
    question: q.question || q.text || 'প্রশ্ন পাওয়া যায়নি',
    options: Array.isArray(q.options) && q.options.length >= 2 ? q.options : ['বিকল্প ১', 'বিকল্প ২', 'বিকল্প ৩', 'বিকল্প ৪'],
    correctAnswer: typeof q.correctAnswer === 'number' && q.correctAnswer >= 0 && q.correctAnswer < (q.options?.length || 4)
      ? q.correctAnswer
      : (typeof q.correct === 'number' ? q.correct : 0),
    explanation: q.explanation || q.answer || 'সঠিক উত্তর যাচাইকৃত।'
  }));
}
