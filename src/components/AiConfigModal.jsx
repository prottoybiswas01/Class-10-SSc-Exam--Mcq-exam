import React, { useState, useEffect } from 'react';
import { 
  X, 
  KeyRound, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Cpu, 
  ExternalLink,
  Loader2,
  HelpCircle,
  Zap
} from 'lucide-react';
import { aiConfig, AI_MODELS, testGeminiApiKey } from '../services/aiQuestionGenerator';

export default function AiConfigModal({ isOpen, onClose, onSave }) {
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash');
  const [isTesting, setIsTesting] = useState(false);
  const [testStatus, setTestStatus] = useState(null); // { success: boolean, message: string }

  useEffect(() => {
    if (isOpen) {
      setApiKey(aiConfig.getApiKey());
      setSelectedModel(aiConfig.getModel());
      setTestStatus(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestKey = async () => {
    if (!apiKey.trim()) {
      setTestStatus({ success: false, message: 'অনুগ্রহ করে প্রথমে আপনার Gemini API Key টি প্রদান করুন।' });
      return;
    }

    setIsTesting(true);
    setTestStatus(null);

    try {
      await testGeminiApiKey(apiKey, selectedModel);
      setTestStatus({ success: true, message: 'সংযোগ সফল হয়েছে! Gemini AI API সক্রিয় ও প্রস্তুত।' });
    } catch (err) {
      setTestStatus({ success: false, message: err.message || 'API Key যাচাই ব্যর্থ হয়েছে। অনুগ্রহ করে সঠিক কি প্রদান করুন।' });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    aiConfig.setApiKey(apiKey);
    aiConfig.setModel(selectedModel);
    if (onSave) onSave({ apiKey, model: selectedModel });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="glass-card rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col animate-slide-up overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>Gemini AI ইঞ্জিন কনফিগারেশন</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                  Live AI
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                প্রতিটি বিষয়ের জন্য সম্পূর্ণ নতুন ও অন-ডিমান্ড প্রশ্ন তৈরি
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto max-h-[70vh]">
          
          {/* Info Banner */}
          <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-900 dark:text-indigo-200 leading-relaxed flex items-start gap-2.5">
            <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong>লাইভ এআই জেনারেশন:</strong> আপনার দেওয়া Gemini API Key ব্যবহার করে ২০২৬-২৭ সালের সর্বশেষ NCTB কারিকুলাম ও অধ্যায় রিসার্চ করে স্বয়ংক্রিয়ভাবে ৩০টি ইউনিক বোর্ড স্ট্যান্ডার্ড MCQ ও ব্যাখ্যা তৈরি হবে।
            </div>
          </div>

          {/* API Key Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>Google Gemini API Key:</span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>ফ্রি API Key নিন</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </label>

            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy... আপনার Gemini API Key দিন"
                className="w-full pl-10 pr-20 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-mono text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              />
              <button
                type="button"
                onClick={handleTestKey}
                disabled={isTesting || !apiKey.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 text-[11px] font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 disabled:opacity-40 transition-colors"
              >
                {isTesting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                ) : (
                  'টেস্ট করুন'
                )}
              </button>
            </div>
          </div>

          {/* Test Status Feedback */}
          {testStatus && (
            <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 animate-fade-in ${
              testStatus.success 
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500/30 text-rose-700 dark:text-rose-300'
            }`}>
              {testStatus.success ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              )}
              <span>{testStatus.message}</span>
            </div>
          )}

          {/* Model Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              AI মডেল নির্বাচন করুন:
            </label>

            <div className="space-y-2">
              {AI_MODELS.map((m) => (
                <label
                  key={m.id}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    selectedModel === m.id
                      ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/40 ring-1 ring-indigo-500/30'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="geminiModel"
                      value={m.id}
                      checked={selectedModel === m.id}
                      onChange={() => setSelectedModel(m.id)}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                        <span>{m.name}</span>
                        {m.recommended && (
                          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 bg-emerald-500 text-white rounded">
                            Recommended
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            বাতিল
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-transform active:scale-95 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>সংরক্ষণ করুন</span>
          </button>
        </div>

      </div>
    </div>
  );
}
