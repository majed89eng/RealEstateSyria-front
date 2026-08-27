import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  Building2,
  ShieldCheck,
  Users,
  Eye,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  ChevronRight,
  Award,
  Zap,
  MapPin,
  TrendingUp,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'عن منصة عقارات سوريا | رؤيتنا وخدماتنا العقارية الموثوقة',
  description:
    'تعرف على منصة عقارات سوريا، الكتالوج العقاري الموثوق للبحث عن الشقق والفيلات والمكاتب في دمشق وريف دمشق وسائر المحافظات.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-cairo flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <Header />

      <main className="flex-grow">
        {/* Banner */}
        <section className="relative pt-28 pb-16 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/80 overflow-hidden">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-2">
              <Link href="/" className="hover:text-emerald-400 transition-colors">
                الرئيسية
              </Link>
              <ChevronRight className="w-3.5 h-3.5 rotate-180 text-slate-600" />
              <span className="text-emerald-400 font-bold">عن المنصة</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>المنصة العقارية المنسقة والموثوقة</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-alexandria leading-tight text-white tracking-tight">
              نبذة عن منصة <span className="text-emerald-400">عقارات سوريا</span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
              منصة عقارية رقمية متخصصة تهدف إلى إعادة الثقة والشفافية لسوق العقارات السوري من خلال عروض منسقة ومحققة بدقة وبدون وسطاء عشوائيين.
            </p>
          </div>
        </section>

        {/* Content Body */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/90 rounded-3xl p-8 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white font-alexandria">رؤيتنا ورسالتنا</h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                تقديم تجربة بحث عقاري سلسة وعصرية تحاكي أحدث المعايير العالمية، مع التركيز على الخصوصية والتفاصيل الدقيقة للسوق السوري كالتسعير بالدولار وسندات الملكية (طابو سبز 2400 سهم) وتوفر منظومات الطاقة البديلة.
              </p>
            </div>

            <div className="bg-slate-900/90 rounded-3xl p-8 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white font-alexandria">معايير النشر والشفافية</h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                لا نتيح النشر العشوائي المفتوح؛ جميع العقارات المعروضة في منصتنا مفحوصة وموثقة بعناية من قبل فريق الإدارة مع صور حقيقية عالية الجودة وأسعار واضحة خالية من أي تضليل أو مبالغات.
              </p>
            </div>
          </div>

          {/* Key Advantages Grid */}
          <div className="bg-slate-900/80 rounded-3xl p-8 border border-slate-800/90 shadow-xl space-y-6">
            <div className="text-center md:text-right space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-alexandria">
                لماذا يفضل العملاء والمغتربون البحث عبر منصتنا؟
              </h2>
              <p className="text-xs text-slate-400">ميزات حصرية صممت خصيصاً لتلائم متطلبات السوق السوري</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">تواصل فوري عبر واتساب</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  توليد رسائل مخصصة بكود العقار المرجعي تتيح لك التواصل الفوري مع الفريق دون ملء استمارات معقدة.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-600/20 text-teal-400 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">تحويل العملات اللحظي</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  تحديث فوري لأسعار صرف الليرة واليورو مقابل الدولار لضمان معرفة القيمة الحقيقية للعقار.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">مساعد ذكي بالذكاء الاصطناعي</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  البحث باللغة العامية السورية والمطابقة الذكية للعثور على متطلباتك بدقة وسرعة فائقة.
                </p>
              </div>
            </div>
          </div>

          {/* Direct CTA */}
          <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 rounded-3xl p-8 border border-emerald-500/30 text-white text-center space-y-5 shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-bold font-alexandria">
              هل تبحث عن عقار مخصص أو ترغب بالتواصل مع الإدارة؟
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
              فريقنا جاهز للإجابة عن كافة استفساراتكم وتأمين أفضل الفرص الاستثمارية والسكنية.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/request-property"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm transition-transform hover:scale-105 shadow-lg shadow-emerald-600/30"
              >
                <Building2 className="w-4 h-4" />
                <span>اطلب عقارك الخاص الآن</span>
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs sm:text-sm font-bold transition-colors"
              >
                صفحة اتصل بنا
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
