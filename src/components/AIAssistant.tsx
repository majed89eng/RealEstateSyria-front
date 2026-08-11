import React from 'react';
import { Sparkles, Bot, RefreshCw, CheckCircle } from 'lucide-react';
import { useAIAssistant } from '../hooks/useAIAssistant';
import { PropertyCard } from './PropertyCard';
import { Property } from '../types/property';

interface AIAssistantProps {
  onOpenDetail: (property: Property) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ onOpenDetail }) => {
  const { query, setQuery, loading, result, search, clear } = useAIAssistant();

  const examplePrompts = [
    'شقة للبيع في أبو رمانة أو المالكي فيها طاقة شمسية',
    'بدنا مزرعة بريف دمشق يعفور فيها مسبح خاص',
    'مكتب تجاري بكفرسوسة قرب البرج',
    'شقة اقتصادية بسعر مناسب في قدسيا أو جرمانا',
  ];

  return (
    <section id="ai-assistant" className="py-16 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>مساعد عقارات سوريا الذكي</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-alexandria tracking-tight">
            ابحث بلغتك الطبيعية مع{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300">
              مساعد الذكاء الاصطناعي
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            اكتب متطلبات عقارك بأسلوبك البسيط، وسيحلل المساعد الذكي المواصفات والمنطقة والأسعار ليقترح عليك أنسب العقارات المطابقة.
          </p>
        </div>

        {/* Input Box Card */}
        <div className="max-w-3xl mx-auto bg-slate-800/90 backdrop-blur-2xl p-4 sm:p-6 rounded-3xl border border-slate-700/80 shadow-2xl space-y-4">
          
          <div className="relative flex items-center">
            <div className="absolute right-4 text-amber-400">
              <Bot className="w-6 h-6" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="أدخل طلبك (مثال: شقة بالمرجة أو المزة طابق ثاني للبيع فيها طاقة شمسية)..."
              className="w-full bg-slate-900/90 text-white placeholder-slate-400 border border-slate-700 rounded-2xl pr-14 pl-28 py-4 text-sm font-medium focus:outline-none focus:border-amber-500 transition-all"
              onKeyDown={(e) => e.key === 'Enter' && search()}
            />

            <button
              type="button"
              onClick={() => search()}
              disabled={loading || !query.trim()}
              className="absolute left-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 disabled:opacity-50 text-slate-950 font-extrabold text-xs transition-all shadow-md flex items-center gap-1.5"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>جاري التحليل...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>تحليل الطلب</span>
                </>
              )}
            </button>
          </div>

          {/* Example Prompts */}
          <div className="space-y-2 pt-2 border-t border-slate-700/60">
            <span className="text-xs text-slate-400 font-semibold block">نماذج جمل للبحث السريع:</span>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setQuery(prompt);
                    search(prompt);
                  }}
                  className="text-xs px-3 py-1.5 rounded-xl bg-slate-900/70 hover:bg-amber-500/20 hover:text-amber-300 border border-slate-700/80 transition-all font-medium text-slate-300 text-right"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* AI Results Output Display */}
        {result && (
          <div className="mt-12 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
            
            {/* AI Response Card Summary */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-amber-500/30 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                <Bot className="w-6 h-6" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-amber-300 font-alexandria">
                    نتيجة تحيل المساعد العقاري
                  </h4>
                  <button
                    type="button"
                    onClick={clear}
                    className="text-xs text-slate-400 hover:text-white underline"
                  >
                    إغلاق النتائج
                  </button>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {result.summary}
                </p>
              </div>
            </div>

            {/* Matched Property Cards */}
            {result.matches.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {result.matches.map(({ property, relevanceScore, reason }) => (
                  <div key={property.id} className="relative bg-slate-900 rounded-3xl p-2 border border-slate-800 flex flex-col justify-between">
                    
                    {/* Score Ribbon */}
                    <div className="mb-2 px-4 pt-2 flex items-center justify-between text-xs">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        نسبة المطابقة: {relevanceScore}%
                      </span>
                      <span className="text-slate-400 truncate max-w-[200px]" title={reason}>
                        {reason}
                      </span>
                    </div>

                    <PropertyCard
                      property={property}
                      onOpenDetail={onOpenDetail}
                    />
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};
