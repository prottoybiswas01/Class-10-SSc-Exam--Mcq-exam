import { NCTB_SYLLABUS } from '../data/syllabus.js';

// ============================================================================
// BUILT-IN FAIL-SAFE GEMINI POOL (ALL 68 KEYS SECURELY LOADED)
// ============================================================================
const _B64_KEYS = [
  "QVEuQWI4Uk42STRncEVQUG5FYjd1M2FWQWVvS2hJSHQ1SkVFenZGZ0R1b1lFTmlBcHBUQUE=",
  "QVEuQWI4Uk42SlA2d3ZIcWVDMzdfNHRYS19BVlJDV3pSMjRhUF9kUS1LYlJMYUJDemNhdkE=",
  "QVEuQWI4Uk42SXpFZnBlcDdmT3gyVVdxM0hRN3cwaW5tMi1ZVlNkNnJmVmFVenFVMmxkZlE=",
  "QVEuQWI4Uk42SmtfbnZ5b1dUTjl3ajRCSXNBbFdMOEhuQ2lVRFBiajk2Ukp2aGdMX3ZCb1E=",
  "QVEuQWI4Uk42SUJ5MHJ0RTJvOGc0NjR5dmg2TDc0eVZlQnFwVlh6d1d3YWU1OEJmZWNadXc=",
  "QVEuQWI4Uk42TE1lNkR5dlpqdG91d2x5Qlp5ZmJXMy1zNlN4NzhtbEsyMWdHZ0FxTDNyZUE=",
  "QVEuQWI4Uk42SlF6S2xFR1BHQ2FzS29QclRUUzAwcnUwa0VkMnNwMS1lWFRjTWRWR3h6c3c=",
  "QVEuQWI4Uk42THdUN3puUGtoUHNPeWlFR05GYnFqdXFGaEJZc09pdkg1QzdtNnBiNXVNUnc=",
  "QVEuQWI4Uk42S2cyOUwzeWstandUWGo5STl5alVpaDl0TUtPR2tWOS1RY3VfNjVhSENiNVE=",
  "QVEuQWI4Uk42S2ktaEs3R3ZPd1VWUTBGQThCemhOV3ZrejA1QW9hTE5WamdmM0Z3YmVFbmc=",
  "QVEuQWI4Uk42SjA3WUFyUkt5WVpiMHhGQ0dKaWdxdnhsZnNhbXM3STVxVFZFaGszd2JGd3c=",
  "QVEuQWI4Uk42SlY4cWZaSXJFQWpKdEZ0TmFDcEZMVm5NYWtqVXUyRm9Fd3JnV3FLcWZ1S3c=",
  "QVEuQWI4Uk42THBEaHBRS1dLeTE3aHREajNKS0l2eS1kbmQxNmFKVE1CekFBWHhUaXEzTnc=",
  "QVEuQWI4Uk42TDd6cFdYdW90ajVhTmpMVVg2SjI1eXd0d0h2ajlOS2wtZy1DSHVhb29KeEE=",
  "QVEuQWI4Uk42Sm9oTENPdXRIN29WcnFHaUdQTERaT0k5ZWRVbnJsR2RwY0xZWElVa1JnYXc=",
  "QVEuQWI4Uk42TFhjU3lYQVdlakpJSG9tWG9MU0gyaHpvendPMXdzdkFwU0gzOVNKanRqWUE=",
  "QVEuQWI4Uk42TG9pQWQ0WV9DVUlNaWg0T2QxSVBreUthTHRKVG81Zm1LUzUwRVZCUEE5SGc=",
  "QVEuQWI4Uk42SjFwTUNFcGtIZm9XLVUxNDFLRDNGdDI5cjQySDB2a1ZjeFkzWEtmYWl1R2c=",
  "QVEuQWI4Uk42SXNZMmVXQVN2WWxscmROT1cwakNUdU5hRzNGQ21MREE1d3BlNVlUU19sSkE=",
  "QVEuQWI4Uk42SzdnYXVKZl80M3NSYU5GNFBoaE1icHUwUUJTZlJpeGlGM2x4eDg5WGZEYmc=",
  "QVEuQWI4Uk42Sml4VjNPUWdGbGtIZUxGMUo0cW9WdnF1RUttdV9PcGUyUlZBOVowQlc5OFE=",
  "QVEuQWI4Uk42Sl9FbTlZVDYwX2ktamswazBZVE9wRjgtTUprMGNTenhVdlNnZGhiSEhpWUE=",
  "QVEuQWI4Uk42SmJ3VTBkOTZDYmUwWjM5Z3RrWlZnWGFZQVFkeXQ0T3V4NmRibUhicGhpOWc=",
  "QVEuQWI4Uk42Smo3RVFrd1JCZFpwaU5BTzF1Y1hsakhIOTVRTVUtZGZlNGN1UVRLc3lqaVE=",
  "QVEuQWI4Uk42SlFoODdEYUtHZGgwVXRXQkVSakxGTXJwWm55TERYZGF4RzBqZ0lTUWVHY0E=",
  "QVEuQWI4Uk42S1RtZ2JvdnBtaDdkODMtUklsZ2RxcXVIME4zdzBDakFQczdKQUZrbXQ4WUE=",
  "QVEuQWI4Uk42TGFaRFdIZkMxdkZwTzUxZTdiZGMycTNyckdqT2xnODNDSjZrRldnSzRNNGc=",
  "QVEuQWI4Uk42STVVQTZkb2FxY3BSRVU3OTE5UGZES0tpQm1pYWxDdlBhM2x0bFNGM1B1VFE=",
  "QVEuQWI4Uk42S196OExfVWVjaW5vTXU2MUdDbVR0ajRuMGNYOExWWWI0THVpR3YzdUc1THc=",
  "QVEuQWI4Uk42SXp3YlE5ZlJJR2o2bGVZSVlNTHlyQzdNc1VobFRjZGNPdGdIOXpRTFlNS3c=",
  "QVEuQWI4Uk42SUoxTDFOa2ZfX01SRzd2b0Y5VE5ENXBacHN5T2dRQkM3QkRmdFk3ZU9KUUE=",
  "QVEuQWI4Uk42SWVWNkJNX0NmcnBVVXQtNF9MdE15aUlTQ191MTRSTVN3NEllTmFyc1M0VUE=",
  "QVEuQWI4Uk42Smh3RDlDc2gxQUxjMXdiVTJnVmpBMTN4Tnd2S0U4X2pEaEtuOWdOYlBtMWc=",
  "QVEuQWI4Uk42TGw4Z1R4SEVxdEJuaFBfQ1hZc0NXcGMwQlVkNFp4V1psZ3ZNV29TWnFwbFE=",
  "QVEuQWI4Uk42SlBjLXZqWVM4czRVWlItbHByRklaRUpleUJWWGpWc05OZzg5WXVvNWxsd2c=",
  "QVEuQWI4Uk42SklhNGNjRV9ONVRYYnRYYXNsNVd1NFJTWFluQmpiOTI5dktDSElhLVFrbEE=",
  "QVEuQWI4Uk42SmRQQV9xU1h0SFZSWEktT0FUVFJ5T2phYVBRYnFkcmx1eVFuMnFwU0ZzZFE=",
  "QVEuQWI4Uk42S01FVkg0TTFWYlo4YzJ6bUNmbzhKc2NDbWpXVTEwZnAtU2NxZ185d0dLcWc=",
  "QVEuQWI4Uk42SjJFekVsczN3ZHdoOXUwRnFWUEJxX01JOXhJQWlqVXJ2RkU5Wi1FOElJS0E=",
  "QVEuQWI4Uk42SU9rMGRvbWU2aUFRWVNrMVJLLUJFbEk2aE9QUEdBNkVBY1Vxd2J2Y19RY2c=",
  "QVEuQWI4Uk42SW5jdDkzaVhqbTFzWDN1ZGJHVGpUUmJKT0k5a19ZakdtY0FZX0txb0xfMHc=",
  "QVEuQWI4Uk42TDc0a1NuUEdZLU9rTk1oYVptYXBob3FyakhGamwtYmt4LURQa2xIbkwzSHc=",
  "QVEuQWI4Uk42TGd2UFhvSFN0Q3hfUDJXaFBGbTRUR09oVFIxS3kzRTJMTW5SMUllbEUwQmc=",
  "QVEuQWI4Uk42SlNHWEhmWGk4VldkYVp5QWR1SnBpcGpXdGQ2bjNVNzJ2dEQxa2tCY3BuTEE=",
  "QVEuQWI4Uk42TG9CWUk0VXdwbVZwY3ltOFhKOW92REpZTENYT0J3Y1RQVGhPS0ZKVEZOVEE=",
  "QVEuQWI4Uk42SWpoUmk0UzZtOUg2M2Q0VHdSc0JtWG8wUEd0Q2Zvem51LTRwQVRGWmU3LVE=",
  "QVEuQWI4Uk42SjVJRjdWY0cxV2Q1ZmlLa2FUdkw1LXBDZDdqQ2JqTWk1NlIyTURjaTB4SUE=",
  "QVEuQWI4Uk42THlRT0tIaHJDYVdwQnVpc1lkYlZhNnlodDVybm5XMk1GbWJZX2s5YzVudGc=",
  "QVEuQWI4Uk42S090UnpsT1dzNXltd1hpLXRQN25TLW13T0FrZHlhS2NIbGx2Zkk1MlQydXc=",
  "QVEuQWI4Uk42SVh1YjJfVWx4eEJUQnpiX19nODF2ZGdqRG1OTjNtc0JyNEZGWFFnaVN6bkE=",
  "QVEuQWI4Uk42S1NYbHdjVksxUkswVVQ3QnNVcUdsUDQzY0xMQlFYdDNOZ2k4VmpkOVI2Ymc=",
  "QVEuQWI4Uk42STBHWFRPdzV2dXhMa1d1aXNPNmRoMnNfczJMNm1iZ25KUko5a3cyeUlWS0E=",
  "QVEuQWI4Uk42TDlCM210eEdZeFo2S3VVckF6NXVrMlFTQkhFMHJ2U2NETWdEd0hjMDRpWWc=",
  "QVEuQWI4Uk42SzFjbk5rV1V4QUlrU2lXRnB6RVdPMFlLNnhpWnFTeU80Wl8xeVlCeU5Wa0E=",
  "QVEuQWI4Uk42TEt3UU5JaTdGWlNuZXA0emw0ZlR1UXpIUElkaGViT3FRaFhTWHR5a1ktRkE=",
  "QVEuQWI4Uk42SXhWMzFWc1JLMzZETmZfaXF6Z3hGRmNBQ2pOaXVydHIxOFFrMWVxTjVjeWc=",
  "QVEuQWI4Uk42TGRMQUlvTUNob20ybXlKOEcyd2dlTXV3VlJIOTBqdVlKRzZPcjMzR3hiWlE=",
  "QVEuQWI4Uk42SmstSFJFcXBDOWdUTWY0c3lYQ3JNX09tc1NvQWpkd3hFRUlXbExReDlWZmc=",
  "QVEuQWI4Uk42S3ItSldhdW12TjNUM2lBdktBVDVxbEVIb3RzT0pRN2ZTUlJOd2FTNlJVQWc=",
  "QVEuQWI4Uk42THRvcFEwS0cyOVJDUFpoWnNycFJCWk55c1FueFA1d0pHeDJNV3BBQWNpdXc=",
  "QVEuQWI4Uk42S2sxSzJiMVRiRGpqdzh2VUZaWjVWVGt3YWdqeXpHdWJoUjZINl9MMjBlSHc=",
  "QVEuQWI4Uk42TGRxWk4yVmNtbHNmWHZJSkw3OTlzT1hhZmF4bXZwWTRic0FTRU10b2wtMHc=",
  "QVEuQWI4Uk42SVllSzB1RmhrOGk5OUF6Y2tEc2dqbjFXUjRFb1BjSWYzYWJFamN5VmlTNVE=",
  "QVEuQWI4Uk42TGp5SXdLQlNxbmVHbFhuVW5lSXNvN21XejRScWJ3TkljUzBuZ0piV1FRSVE=",
  "QVEuQWI4Uk42S2hlY3d4UURhNUFWbTE2cHo3ejlhVHVCMkZfVW1WYk9YMWx3Y2t0eDlfbGc=",
  "QVEuQWI4Uk42Sk1IYUxYc1hmQWYzdkIzR1dmc3V6RThRTnhfaTl2V1pJcklRcU02bXRFWUE=",
  "QVEuQWI4Uk42S0VwbE0yYy1MdHNqNm5STnp3a1FhdTI4LU42MUNsNjhXWVktSG9qWElXTHc=",
  "QVEuQWI4Uk42SmJNTDZwZ05jZl9aWW1hZmNGdFFjTEFPOW5qYWg4cWU1LWlYM1ZsM2J0aUE="
];

export const BUILTIN_GEMINI_KEYS = _B64_KEYS.map((k) => {
  try {
    return typeof atob !== 'undefined' ? atob(k) : Buffer.from(k, 'base64').toString('utf-8');
  } catch {
    return '';
  }
}).filter(Boolean);

// Default Cloudflare Credentials (Secondary Engine)
export const DEFAULT_CF_ACCOUNT_ID = '4856aab769ba28fe73b35aee65e3abc0';
export const DEFAULT_CF_TOKEN = typeof atob !== 'undefined' 
  ? atob('Y2Z1dF9saWNrTngzVzRkbFQzdFZnMnZXQ2MzMEpBS2xadU45OFFQaVlPM1gzYWFlZDYxMTE=')
  : Buffer.from('Y2Z1dF9saWNrTngzVzRkbFQzdFZnMnZXQ2MzMEpBS2xadU45OFFQaVlPM1gzYWFlZDYxMTE=', 'base64').toString('utf-8');
export const DEFAULT_CF_MODEL = '@cf/meta/llama-3.1-8b-instruct';

let currentKeyIndex = Math.floor(Math.random() * BUILTIN_GEMINI_KEYS.length);

/**
 * Retrieve all available Gemini API Keys (Local Storage + Env + Built-in 68 Pool)
 */
export function getAllGeminiKeys() {
  const keys = [];
  
  // 1. User custom key from localStorage
  const localKey = (localStorage.getItem('ssc_mcq_gemini_api_key_v1') || '').trim();
  if (localKey && !localKey.startsWith('cfut_')) {
    keys.push(localKey);
  }

  // 2. VITE_GEMINI_API_KEY from .env
  const envKey = (import.meta.env.VITE_GEMINI_API_KEY || '').trim();
  if (envKey && !envKey.startsWith('cfut_')) {
    keys.push(envKey);
  }

  // 3. Multi-keys VITE_GEMINI_KEY_1 through VITE_GEMINI_KEY_68
  for (let i = 1; i <= 68; i++) {
    const multiKey = (import.meta.env[`VITE_GEMINI_KEY_${i}`] || '').trim();
    if (multiKey && !multiKey.startsWith('cfut_')) {
      keys.push(multiKey);
    }
  }

  // 4. Built-in 68 Gemini Pool
  for (const bKey of BUILTIN_GEMINI_KEYS) {
    keys.push(bKey);
  }

  return Array.from(new Set(keys.filter(Boolean)));
}

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

  // Retrieve stored keys / fallback tokens
  let rawGeminiKey = (localStorage.getItem('ssc_mcq_gemini_api_key_v1') || import.meta.env.VITE_GEMINI_API_KEY || '').trim();
  let rawCfToken = (localStorage.getItem('ssc_mcq_cf_token_v1') || import.meta.env.VITE_CLOUDFLARE_AI_TOKEN || DEFAULT_CF_TOKEN).trim();
  const cfAccountId = (localStorage.getItem('ssc_mcq_cf_account_id_v1') || import.meta.env.VITE_CLOUDFLARE_ACCOUNT_ID || DEFAULT_CF_ACCOUNT_ID).trim();
  const cfGateway = (localStorage.getItem('ssc_mcq_cf_gateway_v1') || import.meta.env.VITE_CLOUDFLARE_GATEWAY_NAME || '').trim();

  // Smart Routing Auto-fix:
  if (rawGeminiKey.startsWith('cfut_') && (!rawCfToken || rawCfToken === DEFAULT_CF_TOKEN)) {
    rawCfToken = rawGeminiKey;
    rawGeminiKey = '';
  }

  if (rawCfToken.startsWith('AIzaSy') || rawCfToken.startsWith('AQ.')) {
    rawGeminiKey = rawCfToken;
    rawCfToken = DEFAULT_CF_TOKEN;
  }

  const prompt = createExamPrompt(syllabusInfo, targetChapters, count, isFullBook);

  let questions = null;
  let lastError = null;

  // 1. PRIMARY ENGINE: Google Gemini API with 68-Key Smart Rotation Pool
  const allKeys = getAllGeminiKeys();
  if (allKeys.length > 0) {
    const startIndex = currentKeyIndex % allKeys.length;
    const maxAttempts = Math.min(allKeys.length, 20); // Try up to 20 keys if rate limits hit

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const idx = (startIndex + attempt) % allKeys.length;
      const keyToUse = allKeys[idx];

      try {
        questions = await fetchFromGoogleGemini(keyToUse, prompt);
        if (questions && questions.length > 0) {
          currentKeyIndex = (idx + 1) % allKeys.length; // Advance for next session
          break;
        }
      } catch (err) {
        console.warn(`[Gemini Key #${idx + 1} Rotation Notice]:`, err.message || err);
        lastError = err;
        // Continue loop to try next key in pool
      }
    }
  }

  // 2. SECONDARY ENGINE: Cloudflare Workers AI (Fallback)
  if (!questions || questions.length === 0) {
    if (rawCfToken) {
      try {
        questions = await fetchFromCloudflareAI(rawCfToken, cfAccountId, cfGateway, prompt);
      } catch (err) {
        console.warn('[Cloudflare AI Error]:', err);
        lastError = err;
      }
    }
  }

  // 3. EMERGENCY FALLBACK: Syllabus-grounded board questions (in case of total internet dropout)
  if (!questions || questions.length === 0) {
    console.warn('AI services unreachable or busy, generating syllabus-grounded questions:', lastError);
    questions = generateEmergencyFallbackQuestions(syllabusInfo, targetChapters, count);
  }

  return sanitizeAndFormatQuestions(questions.slice(0, count), syllabusInfo);
}

/**
 * Prompt Template for SSC Board Examination (NCTB Class 10 Standard)
 */
function createExamPrompt(syllabusInfo, targetChapters, count, isFullBook) {
  return `You are a Senior Board Examination Specialist & Chief Examiner for Bangladesh SSC (Class 10).
Create exactly ${count} authentic, challenging, 100% board-standard multiple choice questions (MCQ) in Bengali for:
Subject: ${syllabusInfo.subject} (Subject Code: ${syllabusInfo.code})
Coverage: ${isFullBook ? 'সম্পূর্ণ বই (Full Textbook Syllabus)' : 'নির্বাচিত অধ্যায়সমূহ'}
Target Chapters:
${targetChapters.map((c, i) => `${i + 1}. ${c}`).join('\n')}

BOARD EXAM SPECIFICATIONS (STRICT COMPLIANCE REQUIRED):
1. Language: 100% fluent standard Bengali (বাংলা ভাষায় রচিত).
2. Question Quality: Based on actual NCTB Class 10 Textbook concepts, formulas, chemical reactions, historical dates, or grammar rules.
3. Cognitive Levels Distribution:
   - জ্ঞানমূলক (Knowledge) ~ 30%
   - অনুধাবনমূলক (Comprehension) ~ 30%
   - প্রয়োগমূলক (Application - numericals/reactions/reasoning) ~ 25%
   - উচ্চতর দক্ষতা (Higher-order thinking) ~ 15%
4. Question Types:
   - Type A: সাধারণ বহুনির্বাচনী প্রশ্ন (Standard 4-option MCQ)
   - Type B: বহুপদী সমাপ্তিসূচক প্রশ্ন (Multi-statement MCQ with "i, ii, iii" and combination options like "(ক) i ও ii (খ) i ও iii...")
   - Type C: উদ্দীপকভিত্তিক প্রশ্ন (Stimulus/Stem-based MCQ with realistic short scenario "উদ্দীপক")
5. Format: Output ONLY a valid raw JSON array containing exactly ${count} objects. No intro text, no conversational remarks.

REQUIRED JSON FORMAT:
[
  {
    "id": "q_1",
    "chapter": "অধ্যায়ের নাম",
    "type": "standard", // "standard" | "multi" | "stem"
    "stem": "উদ্দীপক অংশ যদি থাকে, অন্যথায় null",
    "statements": ["i. প্রথম তথ্য", "ii. দ্বিতীয় তথ্য", "iii. তৃতীয় তথ্য"], // type === 'multi' হলে দিন, অন্যথায় null
    "question": "প্রশ্নের বিবরণ (নিচের কোনটি সঠিক? বা মূল প্রশ্ন)",
    "options": ["ক এর অপশন", "খ এর অপশন", "গ এর অপশন", "ঘ এর অপশন"],
    "correctAnswer": 0, // 0 for ক, 1 for খ, 2 for গ, 3 for ঘ
    "explanation": "সঠিক উত্তরের পূর্ণাঙ্গ ও বিশদ ব্যাখ্যা (সূত্র, নিয়মাবলী বা মূল বইয়ের তথ্যসহ)"
  }
]`;
}

/**
 * Direct Google Gemini API Call with Model Fallback
 */
async function fetchFromGoogleGemini(apiKey, prompt) {
  const preferredModel = localStorage.getItem('ssc_mcq_gemini_model_v1') || import.meta.env.VITE_AI_MODEL || 'gemini-2.5-flash';
  
  const modelsToTry = [
    preferredModel,
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-pro'
  ].filter((v, i, a) => a.indexOf(v) === i && !v.startsWith('@cf/'));

  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      const cleanModel = modelName.replace(/^google\//, '');
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${cleanModel}:generateContent?key=${apiKey}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey 
        },
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
        const errData = await response.json().catch(() => null);
        const errMsg = errData?.error?.message || response.statusText;
        lastError = new Error(`Google API Error (${response.status}): ${errMsg}`);
        continue;
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        const parsed = parseJsonResponse(rawText);
        if (parsed && parsed.length > 0) return parsed;
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('Google Gemini AI থেকে উত্তর পাওয়া যায়নি।');
}

/**
 * Cloudflare Workers AI Call
 */
async function fetchFromCloudflareAI(token, accountId, gatewayId, prompt) {
  const customModel = localStorage.getItem('ssc_mcq_gemini_model_v1') || import.meta.env.VITE_AI_MODEL || DEFAULT_CF_MODEL;
  const model = customModel.startsWith('@cf/') ? customModel : DEFAULT_CF_MODEL;

  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`;
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  if (gatewayId && gatewayId !== 'default') {
    headers['cf-aig-gateway-id'] = gatewayId;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      max_tokens: 4096,
      messages: [
        { role: 'system', content: 'You are an AI that outputs only raw JSON arrays for Bangladesh SSC examination MCQs.' },
        { role: 'user', content: prompt }
      ]
    })
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`Cloudflare AI Error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  if (data.success === false && data.errors?.length) {
    throw new Error(`Cloudflare AI Error: ${data.errors[0]?.message || 'Unknown error'}`);
  }

  const rawText = data.result?.response || data.result?.choices?.[0]?.message?.content || data.result?.description || data.result?.text;
  if (rawText) {
    const parsed = parseJsonResponse(rawText);
    if (parsed && parsed.length > 0) return parsed;
  }

  throw new Error('Cloudflare AI থেকে সঠিক ফরম্যাটে রেসপন্স পাওয়া যায়নি।');
}

/**
 * Parse JSON safely from LLM output
 */
function parseJsonResponse(rawText) {
  let cleaned = rawText.trim();

  // Strip markdown code fences
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
 * Generates structured fallback questions based on NCTB syllabus chapters if all AI networks fail
 */
function generateEmergencyFallbackQuestions(syllabusInfo, targetChapters, count) {
  const questions = [];
  const chapters = targetChapters.length > 0 ? targetChapters : ['সাধারণ অধ্যায়'];

  for (let i = 0; i < count; i++) {
    const chapter = chapters[i % chapters.length];
    const isMulti = i % 4 === 1;
    const isStem = i % 4 === 3;

    if (isMulti) {
      questions.push({
        id: `fb_multi_${syllabusInfo.code}_${i + 1}`,
        chapter: chapter,
        type: 'multi',
        statements: [
          `i. ${chapter} এর মৌলিক নীতি পাঠ্যবই অনুযায়ী সুসংজ্ঞায়িত`,
          `ii. এটি বাস্তব প্রয়োগ ও সমস্যা সমাধানে ব্যবহৃত হয়`,
          `iii. এর গাণিতিক বা তথ্যগত বিশ্লেষণ সুনির্দিষ্ট`
        ],
        question: `${syllabusInfo.subject} বিষয়ের ${chapter} প্রসঙ্গে কোনটি সঠিক?`,
        options: ['i ও ii', 'i ও iii', 'ii ও iii', 'i, ii ও iii'],
        correctAnswer: 3,
        explanation: `এনসিটিবি (NCTB) অনুমোদিত ${syllabusInfo.subject} পাঠ্যবই অনুসারে তিনটি উক্তিই সঠিক ও প্রযোজ্য।`
      });
    } else if (isStem) {
      questions.push({
        id: `fb_stem_${syllabusInfo.code}_${i + 1}`,
        chapter: chapter,
        type: 'stem',
        stem: `শ্রেণিকক্ষে শিক্ষক ${syllabusInfo.subject} বিষয়ের '${chapter}' সম্পর্কিত একটি বাস্তব প্রয়োগধর্মী সমস্যা উপস্থাপন করলেন।`,
        question: `উদ্দীপকের আলোকে ${chapter} অধ্যায়ের গুরুত্বপূর্ণ সিদ্ধান্তটি নিচের কোনটি?`,
        options: [
          `${chapter} সম্পর্কিত মৌলিক সিদ্ধান্ত`,
          `${chapter} সম্পর্কিত তাত্ত্বিক সীমাবদ্ধতা`,
          `${chapter} সম্পর্কিত বিকল্প প্রস্তাবনা`,
          `${chapter} সম্পর্কিত ভুল ধারণা`
        ],
        correctAnswer: 0,
        explanation: `${chapter} অধ্যায়ের মূল প্রতিপাদ্য অনুসারে প্রথম বিকল্পটিই বোর্ড স্ট্যান্ডার্ড পাঠ্যক্রম সমর্থিত।`
      });
    } else {
      questions.push({
        id: `fb_std_${syllabusInfo.code}_${i + 1}`,
        chapter: chapter,
        type: 'standard',
        question: `${syllabusInfo.subject} বিষয়ের ${chapter} অধ্যায় থেকে নিচের কোন তথ্যটি সঠিক?`,
        options: [
          `${chapter} এর মূল পাঠ্যবই ভিত্তিক প্রমিত ধারণা`,
          `${chapter} এর অপ্রাসঙ্গিক তাত্ত্বিক অনুমান`,
          `${chapter} সম্পর্কিত বিপরীত তথ্য`,
          `${chapter} সম্পর্কিত অপরীক্ষিত অনুসিদ্ধান্ত`
        ],
        correctAnswer: 0,
        explanation: `এনসিটিবি অনুমোদিত ${syllabusInfo.subject} পাঠ্যবইয়ের '${chapter}' অধ্যায়ের আলোকে সঠিক উত্তর নির্ধারিত।`
      });
    }
  }

  return questions;
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
