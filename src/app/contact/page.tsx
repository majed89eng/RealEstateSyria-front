'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { leadService } from '@/services/leadService';
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);
    leadService.createLead({
      name,
      phone,
      email,
      source: 'website',
      message: message || 'رسالة استفسار عامة من صفحة اتصل بنا.',
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    }, 600);
  };

  const whatsappDirectUrl =
    'https://wa.me/963988123456?text=' +
    encodeURIComponent('مرحباً، أود الاستفسار والتواصل مع إدارة منصة عقارات سوريا.');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-cairo flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <Header />

      <main className="flex-grow">
        {/* Page Banner */}
        <section className="relative pt-28 pb-14 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/80 overflow-hidden">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-2">
              <Link href="/" className="hover:text-emerald-400 transition-colors">
                الرئيسية
              </Link>
              <ChevronRight className="w-3.5 h-3.5 rotate-180 text-slate-600" />
              <span className="text-emerald-400 font-bold">اتصل بنا</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>فريق دعم المنصة جاهز لمساعدتكم</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-alexandria text-white tracking-tight">
              تواصل مع <span className="text-emerald-400">إدارة المنصة</span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              يسعدنا تلقي استفساراتكم وملاحظاتكم أو مساعدتكم في إيجاد العقار المطلوب بأسرع وقت وبسرية تامة.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact Info Cards (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white font-alexandria">معلومات الاتصال المباشر</h2>
                  <p className="text-xs text-slate-400 mt-1">تواصل معنا عبر القنوات الرسمية التالية:</p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  {/* WhatsApp */}
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-500/30 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-emerald-400 block font-semibold">محادثة واتساب فورية:</span>
                      <span className="font-bold text-white font-mono" dir="ltr">+963 988 123 456</span>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+963988123456"
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-950/80 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 shrink-0 group-hover:scale-105 transition-transform">
                      <Phone className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-semibold">الاتصال الهاتفي:</span>
                      <span className="font-bold text-white font-mono" dir="ltr">+963 988 123 456</span>
                    </div>
                  </a>

                  {/* Email */}
                  <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-950/80 text-slate-200 border border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 shrink-0">
                      <Mail className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-semibold">البريد الإلكتروني:</span>
                      <span className="font-bold text-white font-mono">info@realestate-syria.com</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-950/80 text-slate-200 border border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 shrink-0">
                      <MapPin className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-semibold">المقر الرئيسي:</span>
                      <span className="font-bold text-white">دمشق، المزة، أوتوستراد المزة</span>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-950/80 text-slate-200 border border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 shrink-0">
                      <Clock className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-semibold">أوقات العمل واستقبال الاستفسارات:</span>
                      <span className="font-bold text-white">السبت - الخميس: 9:00 ص - 8:00 م</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white font-alexandria">أرسل لنا رسالة مباشرة</h2>
                  <p className="text-xs text-slate-400 mt-1">سيقوم فريقنا بالرد عليك ومتابعة استفسارك في أقرب وقت.</p>
                </div>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-4 animate-in zoom-in-95 duration-200">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white">تم استلام رسالتك بنجاح!</h3>
                      <p className="text-xs text-slate-300">شكراً لتواصلك معنا، سيتواصل معك أحد مسؤولي المنصة قريباً.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white"
                    >
                      إرسال استفسار آخر
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">الاسم الكريم *</label>
                        <input
                          type="text"
                          required
                          placeholder="مثال: المهندس وسيم العلي"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1.5">رقم الهاتف أو الواتساب *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+963 944 123 456"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          dir="ltr"
                          className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 text-right"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">البريد الإلكتروني (اختياري)</label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 text-right"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">نص الرسالة أو الاستفسار *</label>
                      <textarea
                        rows={4}
                        required
                        placeholder="اكتب تفاصيل استفسارك أو طلبك هنا..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة للإدارة'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
