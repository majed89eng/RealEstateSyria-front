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
            <div className="flex items-center gap-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>تواصل عبر واتساب</span>
              </a>
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
