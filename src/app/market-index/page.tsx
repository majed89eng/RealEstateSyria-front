import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MarketPriceIndexSection } from '@/components/MarketPriceIndexSection';
import { FloatingActionHub } from '@/components/FloatingActionHub';
import {
  TrendingUp,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Building2,
  Percent,
  Sparkles,
  BarChart3,
  Calendar,
  Layers,
  ArrowLeft,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'مؤشر أسعار العقارات في سوريا | متوسط سعر المتر وتحليلات السوق الحية',
  description:
    'دليل ومؤشر أسعار العقارات في سوريا: دمشق، ريف دمشق، حلب، حمص، الساحل وسائر المحافظات. متوسط سعر المتر المربع، معدلات النمو وتغيرات الأسعار والعائد الإيجاري الاستثماري.',
};

export default function MarketIndexPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-cairo flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <Header />

      <main className="flex-grow">
        {/* Page Banner Header */}
        <section className="relative pt-28 pb-14 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/80 overflow-hidden">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-2">
              <Link href="/" className="hover:text-emerald-400 transition-colors">
                الرئيسية
              </Link>
              <ChevronRight className="w-3.5 h-3.5 rotate-180 text-slate-600" />
              <span className="text-emerald-400 font-bold">مؤشر أسعار السوق</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-bold border border-emerald-500/30 backdrop-blur-md">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>المرجع الأول لبيانات وتحليلات السوق العقاري السوري</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-alexandria text-white tracking-tight">
              مؤشر أسعار العقارات <span className="text-emerald-400">في سوريا 📊</span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              تحليل دقيق لمتوسط سعر المتر المربع في أشهر الأحياء والمناطق، ومعدلات النمو والتغير الفعلي خلال آخر 6 أشهر لمساعدتك على اتخاذ قرار شراء أو استثمار صائب.
            </p>
          </div>
        </section>

        {/* Interactive Market Index Component */}
        <MarketPriceIndexSection isStandalonePage={true} />

        {/* Investment Insights & FAQ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black font-alexandria text-white">
              كيف يتم حساب مؤشر الأسعار؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              يعتمد مؤشر منصة عقارات سوريا على رصد ومطابقة مئات العروض العقارية المنفذة ومراجعة صفقات السوق الحقيقية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-3xl space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-bold text-white text-base font-alexandria">رصد عروض البيع والإيجار</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                جمع وتدقيق بيانات الأسعار من المكاتب العقارية المعتمدة والعروض المباشرة في كل حي ومحافظة.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-bold text-white text-base font-alexandria">حساب متوسط المتر ونسب التغير</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                استبعاد الأسعار الشاذة أو المبالغ فيها واحتساب المتوسط الحسابي العادل للمتر السكني والتجاري.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-bold text-white text-base font-alexandria">تقدير العائد الإيجاري السنوي</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                مقارنة أسعار الشراء مع بدلات الإيجار الدارجة لحساب نسبة العائد الاستثماري المتوقع للمغتربين والمستثمرين.
              </p>
            </div>
          </div>
        </section>

        {/* Floating Action Hub */}
        <FloatingActionHub />
      </main>

      <Footer />
    </div>
  );
}
