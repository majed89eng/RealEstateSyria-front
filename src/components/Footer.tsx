import React from 'react';
import { Building2, MessageCircle, MapPin } from 'lucide-react';
import { Governorate } from '../types/property';

interface FooterProps {
  onSelectRegion: (gov: Governorate, region: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectRegion }) => {
  const whatsappUrl = "https://wa.me/963988123456?text=" + encodeURIComponent("مرحباً، أود الاستفسار عن منصة عقارات سوريا والعقارات المعروضة.");

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold font-alexandria text-white">
                عقارات سوريا | Syria Estate
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              الكتالوج العقاري المفضل لتصفح واكتشاف العقارات السكنية والتجارية في دمشق وريف دمشق. يوفر تجربة تصفح سلسة، فلاتر دقيقة، وتواصل مباشر عبر واتساب.
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

              {/* Social Media Links */}
              <div className="flex items-center gap-2">
                <a
                  href="https://facebook.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="فيسبوك"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-200"
                  title="فيسبوك"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                <a
                  href="https://instagram.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="إنستغرام"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-500 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-200"
                  title="إنستغرام"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                <a
                  href="https://tiktok.com/@yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="تيك توك"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-200"
                  title="تيك توك"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .56.04.82.1v-3.6a6.47 6.47 0 0 0-1-.07C5.41 9.2 2 12.61 2 16.8 2 20.99 5.41 24 9.6 24c4.19 0 7.6-3.41 7.6-7.6V9.23a8.3 8.3 0 0 0 5.07 1.73V7.5a4.8 4.8 0 0 1-2.68-.81z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Regions */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white font-alexandria">
              روابط سريعة للمناطق
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectRegion('دمشق', 'أبو رمانة')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  <span>عقارات أبو رمانة والمالكي</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectRegion('دمشق', 'المزة')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  <span>عقارات فيلات المزة وكفرسوسة</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectRegion('دمشق', 'مشروع دمر')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  <span>عقارات مشروع دمر والجزيرة 2</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectRegion('ريف دمشق', 'قدسيا')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  <span>عقارات قدسيا وضاحية قدسيا</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectRegion('ريف دمشق', 'يعفور')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  <span>مزارع وفيلات يعفور والصبورة</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Note */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white font-alexandria">
              تنبيه وتنويه قانوني
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-900 p-3 rounded-2xl border border-slate-850">
              جميع العقارات المعروضة مخصصة للعرض والاستعلام العام فقط. يتم التحقق من الملكية والمعاينة الميدانية مباشرة عبر التواصل والتنسيق المباشر.
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} منصة عقارات سوريا. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-1">
            <span>تم التطوير بأعلى معايير الأداء والـ UX</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
