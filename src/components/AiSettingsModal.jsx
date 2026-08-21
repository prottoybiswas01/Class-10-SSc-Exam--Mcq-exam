import React, { useState, useEffect } from 'react';
import { X, Key, Sparkles, CheckCircle2, AlertCircle, ExternalLink, Cpu, Cloud, ShieldCheck, RefreshCw } from 'lucide-react';

export default function AiSettingsModal({ isOpen, onClose, onKeySaved }) {
  const [provider, setProvider] = useState('cloudflare'); // 'google' | 'cloudflare'
  const [geminiKey, setGeminiKey] = useState('');
  const [cfToken, setCfToken] = useState('');
  const [cfAccountId, setCfAccountId] = useState('4856aab769ba28fe73b35aee65e3abc0');
  const [cfGateway, setCfGateway] = useState('default');
  const [selectedModel, setSelectedModel] = useState('@cf/meta/llama-3.1-8b-instruct');
  
  const [testLoading, setTestLoading] = useState(false);
  const [testResult, setTestResult] = useState(null); // { success: boolean, message: string }
  const [savedStatus, setSavedStatus] = useState(null); // 'saved' | 'cleared' | null

  useEffect(() => {
    if (isOpen) {
      let storedGemini = (localStorage.getItem('ssc_mcq_gemini_api_key_v1') || import.meta.env.VITE_GEMINI_API_KEY || '').trim();
      let storedCfToken = (localStorage.getItem('ssc_mcq_cf_token_v1') || import.meta.env.VITE_CLOUDFLARE_AI_TOKEN || '').trim();
      const storedCfAccount = (localStorage.getItem('ssc_mcq_cf_account_id_v1') || import.meta.env.VITE_CLOUDFLARE_ACCOUNT_ID || '4856aab769ba28fe73b35aee65e3abc0').trim();
      const storedCfGateway = (localStorage.getItem('ssc_mcq_cf_gateway_v1') || import.meta.env.VITE_CLOUDFLARE_GATEWAY_NAME || 'default').trim();
      const storedModel = (localStorage.getItem('ssc_mcq_gemini_model_v1') || import.meta.env.VITE_AI_MODEL || '@cf/meta/llama-3.1-8b-instruct').trim();

      // Auto-migrate misplaced cfut_ token
      if (storedGemini.startsWith('cfut_') && !storedCfToken) {
        storedCfToken = storedGemini;
        storedGemini = '';
        localStorage.removeItem('ssc_mcq_gemini_api_key_v1');
        localStorage.setItem('ssc_mcq_cf_token_v1', storedCfToken);
      }

      setGeminiKey(storedGemini);
      setCfToken(storedCfToken);
      setCfAccountId(storedCfAccount);
      setCfGateway(storedCfGateway);
      setSelectedModel(storedModel);
      setTestResult(null);
      setSavedStatus(null);

      if (storedCfToken) {
        setProvider('cloudflare');
      } else if (storedGemini) {
        setProvider('google');
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Auto-switch provider on input change
  const handleGeminiInput = (val) => {
    setGeminiKey(val);
    if (val.trim().startsWith('cfut_')) {
      setCfToken(val.trim());
      setGeminiKey('');
      setProvider('cloudflare');
    }
  };

  const handleCfInput = (val) => {
    setCfToken(val);
    if (val.trim().startsWith('AIzaSy')) {
      setGeminiKey(val.trim());
      setCfToken('');
      setProvider('google');
    }
  };

  // Test live connection
  const handleTestConnection = async () => {
    setTestLoading(true);
    setTestResult(null);

    try {
      if (provider === 'cloudflare') {
        const token = cfToken.trim();
        if (!token) throw new Error('Cloudflare API Token দিন।');
        
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        if (cfGateway && cfGateway !== 'default') {
          headers['cf-aig-gateway-id'] = cfGateway;
        }

        const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/ai/run/${selectedModel}`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            max_tokens: 50,
            messages: [{ role: 'user', content: 'Say "OK" in Bengali' }]
          })
        });

        if (!res.ok) {
          const err = await res.text();
          throw new Error(`Cloudflare Error (${res.status}): ${err}`);
        }
        setTestResult({ success: true, message: 'Cloudflare AI সফলভাবে কানেক্টেড ও সচল!' });
      } else {
        const key = geminiKey.trim();
        if (!key) throw new Error('Google Gemini API Key দিন।');

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: 'Say OK' }] }]
          })
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error?.message || `Google API Error (${res.status})`);
        }
        setTestResult({ success: true, message: 'Google Gemini AI সফলভাবে কানেক্টেড ও সচল!' });
      }
    } catch (err) {
      setTestResult({ success: false, message: err.message });
    } finally {
      setTestLoading(false);
    }
  };

  const handleSave = () => {
    if (provider === 'google') {
      if (geminiKey.trim()) {
        localStorage.setItem('ssc_mcq_gemini_api_key_v1', geminiKey.trim());
        localStorage.setItem('ssc_mcq_gemini_model_v1', selectedModel);
        setSavedStatus('saved');
        if (onKeySaved) onKeySaved(geminiKey.trim());
        setTimeout(() => onClose(), 600);
      } else {
        localStorage.removeItem('ssc_mcq_gemini_api_key_v1');
        setSavedStatus('cleared');
      }
    } else {
      localStorage.setItem('ssc_mcq_cf_token_v1', cfToken.trim());
      localStorage.setItem('ssc_mcq_cf_account_id_v1', cfAccountId.trim());
      localStorage.setItem('ssc_mcq_cf_gateway_v1', cfGateway.trim());
      localStorage.setItem('ssc_mcq_gemini_model_v1', selectedModel);
      setSavedStatus('saved');
      if (onKeySaved) onKeySaved(cfToken.trim());
      setTimeout(() => onClose(), 600);
    }
  };

  const handleClear = () => {
    localStorage.removeItem('ssc_mcq_gemini_api_key_v1');
    localStorage.removeItem('ssc_mcq_cf_token_v1');
    localStorage.removeItem('ssc_mcq_cf_account_id_v1');
    localStorage.removeItem('ssc_mcq_cf_gateway_v1');
    setGeminiKey('');
    setCfToken('');
    setTestResult(null);
    setSavedStatus('cleared');
    if (onKeySaved) onKeySaved('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="glass-card rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-slide-up relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              AI Engine & API Key সেটিংস
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              সরাসরি AI দ্বারা আনকমন ও বোর্ড স্ট্যান্ডার্ড প্রশ্ন তৈরির কনফিগারেশন
            </p>
          </div>
        </div>

        {/* Provider Switcher */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl">
          <button
            type="button"
            onClick={() => { setProvider('cloudflare'); setSelectedModel('@cf/meta/llama-3.1-8b-instruct'); }}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              provider === 'cloudflare'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Cloud className="w-3.5 h-3.5" />
            <span>Cloudflare AI Engine</span>
          </button>

          <button
            type="button"
            onClick={() => { setProvider('google'); setSelectedModel('gemini-2.5-flash'); }}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              provider === 'google'
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Google AI Studio (Gemini)</span>
          </button>
        </div>

        {/* Form Body for Cloudflare AI */}
        {provider === 'cloudflare' && (
          <div className="space-y-3.5 animate-fade-in">
            <div className="p-3 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50 text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Cloud className="w-4 h-4 text-indigo-600" />
                <span>Cloudflare Workers AI</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                আপনার ক্লাউডফ্লেয়ার টোকেন (`cfut_...`) নিচে দিন।
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Cloudflare API Token:</span>
                {savedStatus === 'saved' && (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> সেভ হয়েছে!
                  </span>
                )}
              </label>
              <input
                type="password"
                value={cfToken}
                onChange={(e) => handleCfInput(e.target.value)}
                placeholder="cfut_..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Account ID:
                </label>
                <input
                  type="text"
                  value={cfAccountId}
                  onChange={(e) => setCfAccountId(e.target.value)}
                  placeholder="4856aab769ba28fe73b35aee65e3abc0"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Gateway ID:
                </label>
                <input
                  type="text"
                  value={cfGateway}
                  onChange={(e) => setCfGateway(e.target.value)}
                  placeholder="default"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono"
                />
              </div>
            </div>

            {/* Model Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-600" />
                <span>AI মডেল:</span>
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="@cf/meta/llama-3.1-8b-instruct">@cf/meta/llama-3.1-8b-instruct (Fast & Tested)</option>
              </select>
            </div>
          </div>
        )}

        {/* Form Body for Google AI Studio */}
        {provider === 'google' && (
          <div className="space-y-4 animate-fade-in">
            <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-xs text-indigo-950 dark:text-indigo-200 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Google AI Studio ফ্রি Gemini Key (AIzaSy...)</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                সরাসরি গুগল থেকে ফ্রি Gemini API Key ব্যবহার করতে চাইলে নিচের লিঙ্কে ক্লিক করে কি তৈরি করে এখানে দিন।
              </p>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 hover:underline pt-1 text-[11px]"
              >
                <span>ফ্রি Gemini API Key পেতে এখানে ক্লিক করুন</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Google Gemini API Key:</span>
                {savedStatus === 'saved' && (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> সেভ হয়েছে!
                  </span>
                )}
              </label>
              <input
                type="password"
                value={geminiKey}
                onChange={(e) => handleGeminiInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-600" />
                <span>Gemini মডেল:</span>
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="gemini-2.5-flash">gemini-2.5-flash (লেটেস্ট ও সেরা)</option>
                <option value="gemini-2.0-flash">gemini-2.0-flash</option>
                <option value="gemini-1.5-flash">gemini-1.5-flash</option>
              </select>
            </div>
          </div>
        )}

        {/* Test Connection Button & Result */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleTestConnection}
            disabled={testLoading}
            className="w-full py-2.5 px-4 rounded-xl border border-indigo-200 dark:border-indigo-800/80 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/40 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testLoading ? 'animate-spin' : ''}`} />
            <span>{testLoading ? 'যাচাই করা হচ্ছে...' : 'কানেকশন টেস্ট করুন (Test API)'}</span>
          </button>

          {testResult && (
            <div className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
              testResult.success 
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                : 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300'
            }`}>
              {testResult.success ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
              <span className="leading-snug">{testResult.message}</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={handleClear}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 px-3 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30"
          >
            রিমুভ করুন
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              বাতিল
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 flex items-center gap-2 active:scale-95 transition-transform cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>সংরক্ষণ করুন</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
