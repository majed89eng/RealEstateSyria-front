'use client';

import React from 'react';
import { Sparkles, Bot, RefreshCw, CheckCircle, ArrowRight, Compass, Shield, Sun } from 'lucide-react';
import { useAIAssistant } from '../hooks/useAIAssistant';
import { PropertyCard } from './PropertyCard';
import { Property } from '../types/property';

interface AIAssistantProps {
  onOpenDetail: (property: Property) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ onOpenDetail }) => {
  const { query, setQuery, loading, result, search, clear } = useAIAssistant();

  const promptChips = [
    {
      icon: '🏢',
      title: 'شقق دمشق الفاخرة',
      text: 'شقة للبيع في أبو رمانة أو المزة فيها طاقة شمسية ومصعد',
    },
    {
      icon: '🏡',
      title: 'فيلات ومزارع ريف دمشق',
      text: 'فيلا أو مزرعة للإيجار بيعفور أو الصبورة مع حديقة ومسبح',
    },
    {
      icon: '📜',
      title: 'طابو سبز أقل من 100k$',
      text: 'عقار طابو سبز 2400 سهم بسعر أقل من 100 ألف دولار',
    },
    {
      icon: '💼',
      title: 'مكاتب ومقرات شركات',
      text: 'مكتب تجاري مرخص ومكسى في كفرسوسة أو ساحة الأمويين',
    },
  ];

  return (
    <section
      id="ai-assistant"
      className="py-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden"
    >
      {/* Dynamic Ambient Aurora Background Glow */}
      <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 -left-20 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-teal-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-lg backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span>مساعد عقارات سوريا الذكي (AI Assistant)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black font-alexandria tracking-tight">
            ابحث بلغتك الطبيعية مع{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300">
              الذكاء الاصطناعي
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-xl mx-auto">
            اكتب طلبك باللهجة السورية أو الفصحى، وسيقوم المساعد الذكي بتحليل السعر، المنطقة، والطاقة وسند الملكية لاقتراح أنسب العروض المطابقة فورياً.
          </p>
        </div>

        {/* AI Futuristic Search Box */}
        <div className="max-w-3xl mx-auto bg-slate-900/90 backdrop-blur-2xl p-5 sm:p-7 rounded-3xl border border-slate-700/90 shadow-2xl space-y-5 ring-1 ring-white/10 relative">
          <div className="relative flex items-center">
            <div className="absolute right-4 text-emerald-400 pointer-events-none">
              <Bot className="w-6 h-6" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="اكتب ما تبحث عنه (مثال: شقة للبيع بالمالكي طابق ثاني طاقة شمسية)..."
              className="w-full bg-slate-950 text-white placeholder-slate-500 border border-slate-700 rounded-2xl pr-14 pl-32 py-4 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-500 transition-all shadow-inner"
              onKeyDown={(e) => e.key === 'Enter' && search()}
            />

            <button
              type="button"
              onClick={() => search()}
              disabled={loading || !query.trim()}
              className="absolute left-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-black text-xs transition-all shadow-lg flex items-center gap-1.5 hover:scale-105 active:scale-95"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>جاري الفرز...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>بحث ذكي</span>
                </>
              )}
            </button>
          </div>

          {/* Preset AI Prompt Cards */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-[11px] text-slate-400 font-semibold block">
              أو اختر من سيناريوهات البحث الجاهزة:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {promptChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setQuery(chip.text);
                    search(chip.text);
                  }}
                  className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-right transition-all group"
                >
                  <span className="text-base shrink-0">{chip.icon}</span>
                  <div className="truncate">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-emerald-300 block truncate">
                      {chip.title}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">{chip.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Results Output Display */}
        {result && (
          <div className="mt-12 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
            {/* AI Response Analysis Header */}
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/40 flex items-start gap-4 shadow-xl">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 shrink-0">
                <Bot className="w-6 h-6" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-emerald-300 font-alexandria">
                    تحليل المساعد الذكي ونتائج المطابقة
                  </h3>
                  <button
                    type="button"
                    onClick={clear}
                    className="text-xs text-slate-400 hover:text-white underline font-semibold"
                  >
                    إغلاق النتائج
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {result.summary}
                </p>
              </div>
            </div>

            {/* Matched Property Cards Grid */}
            {result.matches.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {result.matches.map(({ property, relevanceScore, reason }) => (
                  <div
                    key={property.id}
                    className="relative bg-slate-900 rounded-3xl p-2.5 border border-slate-800 flex flex-col justify-between shadow-xl"
                  >
                    {/* Score Ribbon */}
                    <div className="mb-2 px-3 pt-1 flex items-center justify-between text-xs">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        نسبة المطابقة: {relevanceScore}%
                      </span>
                      <span className="text-[11px] text-slate-400 truncate max-w-[200px]" title={reason}>
                        {reason}
                      </span>
                    </div>

                    <PropertyCard property={property} onOpenDetail={onOpenDetail} />
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
