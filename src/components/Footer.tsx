'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, MessageCircle, MapPin, ShieldCheck, Mail, Phone, ExternalLink } from 'lucide-react';
import { Governorate } from '../types/property';

interface FooterProps {
  onSelectRegion?: (gov: Governorate, region: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectRegion }) => {
  const whatsappUrl =
    'https://wa.me/963988123456?text=' +
    encodeURIComponent('مرحباً، أود الاستفسار عن منصة عقارات سوريا والعقارات المعروضة.');

  const handleRegionClick = (gov: Governorate, region: string) => {
    if (onSelectRegion) {
      onSelectRegion(gov, region);
    } else {
      window.location.href = `/properties?gov=${encodeURIComponent(gov)}&region=${encodeURIComponent(region)}`;
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold font-alexandria text-white">
                عقارات سوريا
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              الكتالوج العقاري الموثوق لتصفح واكتشاف العقارات السكنية والتجارية في دمشق وريف دمشق وسائر المحافظات. تجربة تصفح سريعة، تسعير دقيق، وتواصل فوري عبر واتساب.
            </p>
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-300 block">
                تابعنا وتواصل معنا عبر منصاتنا:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="صفحتنا على فيسبوك"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/60 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 hover:-translate-y-0.5"
                  title="فيسبوك"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="حسابنا على إنستغرام"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500/60 hover:bg-pink-600/20 text-slate-400 hover:text-pink-400 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 hover:-translate-y-0.5"
                  title="إنستغرام"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* Telegram */}
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="قناتنا على تيليجرام"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/60 hover:bg-sky-600/20 text-slate-400 hover:text-sky-400 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 hover:-translate-y-0.5"
                  title="تيليجرام"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="حسابنا على تيك توك"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-teal-400/60 hover:bg-teal-600/20 text-slate-400 hover:text-teal-300 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 hover:-translate-y-0.5"
                  title="تيك توك"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="قناتنا على يوتيوب"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500/60 hover:bg-red-600/20 text-slate-400 hover:text-red-400 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 hover:-translate-y-0.5"
                  title="يوتيوب"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* X / Twitter */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="حسابنا على منصة إكس"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-500 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 hover:-translate-y-0.5"
                  title="منصة X"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* WhatsApp Channel */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="قناة الواتساب الرسمية"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/60 hover:bg-emerald-600/20 text-slate-400 hover:text-emerald-400 flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 hover:-translate-y-0.5"
                  title="واتساب"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white font-alexandria">أقسام المنصة</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  الصفحة الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-emerald-400 transition-colors">
                  دليل كافة العقارات
                </Link>
              </li>
              <li>
                <Link href="/add-property" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors flex items-center gap-1">
                  <span>+ أضف عقارك مجاناً</span>
                </Link>
              </li>
              <li>
                <Link href="/provinces" className="hover:text-emerald-400 transition-colors">
                  المحافظات والمناطق
                </Link>
              </li>
              <li>
                <Link href="/agencies" className="hover:text-emerald-400 transition-colors">
                  دليل المكاتب المعتمدة
                </Link>
              </li>
              <li>
                <Link href="/ai-assistant" className="hover:text-amber-400 text-amber-300 transition-colors">
                  المساعد الذكي (AI)
                </Link>
              </li>
              <li>
                <Link href="/market-index" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors flex items-center gap-1">
                  <span>📊 مؤشر أسعار العقارات والمتر</span>
                </Link>
              </li>
              <li>
                <Link href="/request-property" className="text-amber-400 font-bold hover:text-amber-300 transition-colors flex items-center gap-1">
                  <span>✨ اطلب عقارك الخاص (خدمة الإدارة)</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  عن المنصة ورؤيتنا
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  اتصل بنا وحجز موعد
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Regions (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white font-alexandria">أشهر المناطق العقارية</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleRegionClick('دمشق', 'أبو رمانة')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-right"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>أبو رمانة والمالكي (دمشق)</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleRegionClick('دمشق', 'المزة')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-right"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>فيلات المزة وكفرسوسة</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleRegionClick('ريف دمشق', 'قدسيا')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-right"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>قدسيا وضاحية قدسيا</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleRegionClick('ريف دمشق', 'يعفور')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-right"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>يعفور والصبورة (ريف دمشق)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Admin & Security (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white font-alexandria">بوابة الإدارة</h4>
            <div className="space-y-2">
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-slate-400 hover:text-emerald-400 text-xs font-semibold transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>لوحة التحكم الإدارية</span>
              </Link>
              <p className="text-[11px] text-slate-500 leading-tight">
                خاصة بمديري المنصة لإدارة العروض والأسعار والطلبات.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Fast Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} منصة عقارات سوريا. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-slate-600">•</span>
            <span>منصة عقارية متوافقة مع محركات البحث وسريعة التجاوب</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
