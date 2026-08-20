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
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>تواصل عبر واتساب</span>
              </a>
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

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} منصة عقارات سوريا. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-1">
            <span>منصة عقارية متوافقة مع محركات البحث وسريعة التجاوب</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
