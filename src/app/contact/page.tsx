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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-cairo flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        {/* Banner */}
        <div className="bg-slate-900 text-white py-12 mb-10 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
              <Link href="/" className="hover:text-emerald-400 transition-colors">
                الرئيسية
              </Link>
              <ChevronRight className="w-3.5 h-3.5 rotate-180 text-slate-500" />
              <span className="text-emerald-400 font-bold">اتصل بنا</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold font-alexandria">
              تواصل مع فريق عقارات سوريا
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl mt-2">
              يسعدنا تلقي استفساراتكم وملاحظاتكم أو مساعدتكم في إيجاد العقار المطلوب بأسرع وقت.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact Information & Channels (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* WhatsApp Direct Card */}
              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <MessageCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg font-alexandria">محادثة واتساب الفورية</h2>
                    <span className="text-xs text-emerald-100">الرد خلال دقائق</span>
                  </div>
                </div>

                <p className="text-xs text-emerald-50 leading-relaxed">
                  طريقتنا الأسرع للتواصل المباشر مع مديري المنصة للاستفسار عن أي عقار أو طلب معاينة ميدانية فورية.
                </p>

                <a
                  href="https://wa.me/963988123456?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A7%D9%84%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%A7%D9%84%D8%B9%D9%82%D8%A7%D8%B1%D9%8A%D8%A9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-white text-emerald-900 font-extrabold text-sm transition-transform hover:scale-[1.02] active:scale-95 shadow-md"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                  <span>محادثة واتساب مباشرة (+963988123456)</span>
                </a>
              </div>

              {/* Info Details List */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 text-sm text-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">الهاتف المباشر:</span>
                    <span className="font-bold text-slate-900 dir-ltr inline-block font-mono">+963 988 123 456</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">البريد الإلكتروني:</span>
                    <span className="font-bold text-slate-900 font-mono">info@realestate-syria.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">الموقع والتغطية:</span>
                    <span className="font-bold text-slate-900">دمشق وريف دمشق وسائر المحافظات السورية</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">أوقات العمل والمعاينات:</span>
                    <span className="font-bold text-slate-900">السبت - الخميس (9:00 صباحاً - 8:00 مساءً)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Lead Contact Form (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-slate-900 font-alexandria">
                    أرسل لنا استفسارك أو طلبك الخاص
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm">
                    سجل بياناتك وسيتم التواصل معك من قبل فريقنا لمتابعة طلبك وتزويدك بالعروض المطابقة.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h3 className="text-xl font-bold text-emerald-900">تم استلام طلبكم بنجاح!</h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                      شكراً لتواصلكم معنا. تم تسجيل طلبكم في نظام خدمة العملاء وسيقوم أحد مسؤولي المنصة بالاتصال بكم قريباً.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                    >
                      إرسال استفسار آخر
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          الاسم الكامل *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="مثال: حسام الخالد"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          رقم الهاتف / الواتساب *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="09XXXXXXXX"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        البريد الإلكتروني (اختياري)
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        تفاصيل الرسالة أو مواصفات العقار المطلوب *
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="أبحث عن شقة 3 غرف في ريف دمشق بسعر مناسب..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/25 hover:scale-[1.01] active:scale-95 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة الآن'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
