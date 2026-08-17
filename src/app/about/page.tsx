import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Building2, ShieldCheck, Users, Eye, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'عن منصة عقارات سوريا | رؤيتنا وخدماتنا العقارية الموثوقة',
  description: 'تعرف على منصة عقارات سوريا، الكتالوج العقاري الموثوق للبحث عن الشقق والفيلات والمكاتب في دمشق وريف دمشق وسائر المحافظات.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-cairo flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        {/* Banner */}
        <div className="bg-slate-900 text-white py-16 mb-12 border-b border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              المنصة العقارية المنسقة
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-alexandria leading-tight">
              نبذة عن منصة عقارات سوريا
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              منصة عقارية متخصصة تهدف إلى إعادة الثقة والشفافية لسوق العقارات السوري من خلال عروض منسقة ومحققة بدقة وبدون وسطاء عشوائيين.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 font-alexandria">رؤيتنا ورسالتنا</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                تقديم تجربة بحث عقاري سلسة وعصرية تحاكي أحدث المعايير العالمية، مع التركيز على الخصوصية والتفاصيل الدقيقة للسوق السوري كالتسعير بالدولار وسندات الملكية (طابو سبز 2400 سهم) وتوفر منظومات الطاقة البديلة.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Eye className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 font-alexandria">معايير النشر والشفافية</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                لا نتيح النشر العشوائي المفتوح؛ جميع العقارات المعروضة في منصتنا مفحوصة وموثقة بعناية من قبل فريق الإدارة مع صور حقيقية عالية الجودة وأسعار واضحة خالية من أي تضليل.
              </p>
            </div>
          </div>

          {/* Key Advantages */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 font-alexandria">
              لماذا يفضل العملاء البحث عبر منصتنا؟
            </h2>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold">تواصل مباشر وسريع عبر واتساب:</strong>
                  توليد رسائل مخصصة بكود العقار المرجعي تتيح لك التواصل الفوري مع الفريق دون ملء استمارات معقدة.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold">نظام تحويل العملات اللحظي:</strong>
                  تحديث مستمر لأسعار صرف الليرة واليورو مقابل الدولار لضمان معرفة القيمة الحقيقية للعقار.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold">مساعد ذكي مدعوم بالذكاء الاصطناعي:</strong>
                  البحث باللغة العامية السورية للعثور على متطلباتك بدقة متناهية.
                </div>
              </div>
            </div>
          </div>

          {/* Direct CTA */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white text-center space-y-5 shadow-xl">
            <h3 className="text-2xl font-bold font-alexandria">هل تبحث عن عقار مخصص أو ترغب بالتواصل معنا؟</h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
              فريقنا جاهز للإجابة عن كافة استفساراتكم ومساعدتكم في اتخاذ القرار العقاري الصحيح.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="https://wa.me/963988123456"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                <span>محادثة واتساب مباشرة</span>
              </a>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs sm:text-sm font-bold transition-colors"
              >
                صفحة اتصل بنا
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
