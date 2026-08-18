import { NCTB_SYLLABUS } from '../data/syllabus';

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

  // 1. Check for API credentials
  const geminiKey = localStorage.getItem('ssc_mcq_gemini_api_key_v1') || import.meta.env.VITE_GEMINI_API_KEY;
  const cfToken = localStorage.getItem('ssc_mcq_cf_token_v1') || import.meta.env.VITE_CLOUDFLARE_AI_TOKEN;
  const cfAccountId = localStorage.getItem('ssc_mcq_cf_account_id_v1') || import.meta.env.VITE_CLOUDFLARE_ACCOUNT_ID;
  const cfGateway = localStorage.getItem('ssc_mcq_cf_gateway_v1') || import.meta.env.VITE_CLOUDFLARE_GATEWAY_NAME;

  const prompt = createExamPrompt(syllabusInfo, targetChapters, count);

  // 2. Route to appropriate API provider
  let questions = null;

  // Try Cloudflare AI Gateway if configured
  if (cfToken && cfAccountId && cfGateway) {
    try {
      questions = await fetchFromCloudflareGateway(cfToken, cfAccountId, cfGateway, prompt);
    } catch (err) {
      console.warn('Cloudflare Gateway call error:', err);
    }
  }

  // Try Direct Google Gemini API if key is present
  if (!questions && geminiKey && geminiKey.trim()) {
    try {
      questions = await fetchFromGoogleGemini(geminiKey.trim(), prompt);
    } catch (err) {
      console.warn('Google Gemini API call error:', err);
      throw err;
    }
  }

  // If Cloudflare token is provided but Account ID is missing:
  if (!questions && cfToken && (!cfAccountId || !cfGateway)) {
    throw new Error(
      'Cloudflare API Token পাওয়া গেছে, কিন্তু Cloudflare Account ID এবং AI Gateway Name প্রয়োজন। দয়া করে AI Settings থেকে Account ID প্রদান করুন, অথবা সরাসরি Google AI Studio থেকে ফ্রি Gemini API Key প্রদান করুন।'
    );
  }

  if (!questions) {
    throw new Error(
      'MISSING_API_KEY: দয়া করে AI Settings থেকে আপনার API Key প্রদান করুন।'
    );
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
1. Every question MUST contain real numerical calculations, authentic formulas (e.g. v=u+at, x+1/x, sin/cos, mole calculations), scientific reactions, exact Bangla grammar rules, or authentic historical/geographical data based on NCTB Class 10 Textbook.
2. Mix standard MCQs, multi-statement MCQs (type: "multi", with statements array i, ii, iii), and stem-based context MCQs (type: "stem", with stem paragraph).
3. Every explanation MUST show full step-by-step mathematical calculations, exact rules, or scientific rationale in clear Bengali.
4. Output strictly a valid JSON array of objects. Do not include markdown wraps or conversational text.

JSON format:
[
  {
    "id": "q_1",
    "chapter": "অধ্যায়",
    "type": "standard",
    "question": "প্রশ্ন",
    "options": ["ক", "খ", "গ", "ঘ"],
    "correctAnswer": 0,
    "explanation": "ব্যাখ্যা"
  }
]`;
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
        console.warn(`Gemini Model ${modelName} returned status ${response.status}:`, errText);
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
 * Cloudflare AI Gateway Call
 */
async function fetchFromCloudflareGateway(token, accountId, gatewayName, prompt) {
  const model = localStorage.getItem('ssc_mcq_gemini_model_v1') || import.meta.env.VITE_AI_MODEL || 'google/gemini-3.7-flash';
  
  const url = `https://gateway.ai.cloudflare.com/v1/${accountId}/${gatewayName}/openai/chat/completions`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: 'system', content: 'You generate structured JSON questions for Bangladesh SSC examinations.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 8192,
      response_format: { type: 'json_object' }
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Cloudflare AI Gateway Error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const rawText = data.choices?.[0]?.message?.content;
  if (rawText) {
    return parseJsonResponse(rawText);
  }

  throw new Error('Cloudflare AI Gateway থেকে রেসপন্স পাওয়া যায়নি।');
}

/**
 * Parse JSON safely
 */
function parseJsonResponse(rawText) {
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }
  
  const parsed = JSON.parse(cleaned);
  if (Array.isArray(parsed)) {
    return parsed;
  }
  if (parsed && Array.isArray(parsed.questions)) {
    return parsed.questions;
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
    question: q.question || 'প্রশ্ন পাওয়া যায়নি',
    options: Array.isArray(q.options) && q.options.length >= 2 ? q.options : ['বিকল্প ১', 'বিকল্প ২', 'বিকল্প ৩', 'বিকল্প ৪'],
    correctAnswer: typeof q.correctAnswer === 'number' && q.correctAnswer >= 0 && q.correctAnswer < (q.options?.length || 4) ? q.correctAnswer : 0,
    explanation: q.explanation || 'সঠিক উত্তর যাচাইকৃত।'
  }));
}
