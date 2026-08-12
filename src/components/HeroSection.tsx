import React from 'react';
import { Search, MapPin, Building, Sparkles } from 'lucide-react';
import { ContractType, Governorate } from '../types/property';

interface HeroSectionProps {
  searchQuery: string;
  contractType: ContractType;
  governorate: Governorate;
  onSearchChange: (q: string) => void;
  onContractTypeChange: (ct: ContractType) => void;
  onGovernorateChange: (gov: Governorate) => void;
  onRegionSelect: (region: string) => void;
  onSearchSubmit: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  contractType,
  governorate,
  onSearchChange,
  onContractTypeChange,
  onGovernorateChange,
  onRegionSelect,
  onSearchSubmit,
}) => {
  const popularRegions = [
    { name: 'أبو رمانة', gov: 'دمشق' },
    { name: 'المزة', gov: 'دمشق' },
    { name: 'الشهباء', gov: 'حلب' },
    { name: 'الإنشاءات', gov: 'حمص' },
    { name: 'الشاطئ الأزرق', gov: 'اللاذقية' },
    { name: 'الكورنيش', gov: 'طرطوس' },
    { name: 'مشروع دمر', gov: 'دمشق' },
    { name: 'يعفور', gov: 'ريف دمشق' },
  ];

  return (
    <div id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-900 text-white">
      {/* Background Image with Gradient Mask */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80"
          alt="عقارات سوريا"
          className="w-full h-full object-cover opacity-25 scale-105 transform hover:scale-100 transition-transform duration-10000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/30 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-md text-emerald-400 text-sm font-medium animate-pulse">
            <Sparkles className="w-4 h-4" />
            <span>المنصة العقارية الأكثر موثوقية في كافة المحافظات السورية (14 محافظة)</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-alexandria leading-tight sm:leading-tight">
            اكتشف أفضل العقارات والمنازل في{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
              جميع المحافظات السورية
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            تصفح أرقى الشقق، الفيلات، والمكاتب التجارية بأسعار دقيقة ومواصفات حقيقية في دمشق، حلب، حمص، الساحل وكافة المحافظات، مع إمكانية التواصل المباشر عبر واتساب.
          </p>

          {/* Search Box Box Glassmorphism */}
          <div className="mt-8 bg-slate-800/90 backdrop-blur-2xl p-4 sm:p-6 rounded-3xl border border-slate-700/80 shadow-2xl text-right text-slate-900 max-w-3xl mx-auto">
            
            {/* Tabs (All, Sale, Rent) */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-900/70 rounded-2xl w-fit mb-4 border border-slate-700/50">
              <button
                type="button"
                onClick={() => onContractTypeChange('all')}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                  contractType === 'all'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                جميع العقارات
              </button>
              <button
                type="button"
                onClick={() => onContractTypeChange('sale')}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                  contractType === 'sale'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                للبيـع
              </button>
              <button
                type="button"
                onClick={() => onContractTypeChange('rent')}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                  contractType === 'rent'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                للإيجـار
              </button>
            </div>

            {/* Inputs Container */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              
              {/* Governorate Dropdown */}
              <div className="md:col-span-4 relative">
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <MapPin className="w-5 h-5" />
                </div>
                <select
                  value={governorate}
                  onChange={(e) => onGovernorateChange(e.target.value as Governorate)}
                  className="w-full bg-slate-900/90 text-white border border-slate-700 rounded-2xl pr-11 pl-4 py-3.5 focus:outline-none focus:border-emerald-500 font-medium text-sm transition-all appearance-none cursor-pointer"
                >
                  <option value="الكل">جميع المحافظات المتاحة</option>
                  <option value="دمشق">محافظة دمشق</option>
                  <option value="ريف دمشق">محافظة ريف دمشق</option>
                  <option value="حلب">محافظة حلب</option>
                  <option value="حمص">محافظة حمص</option>
                  <option value="حماة">محافظة حماة</option>
                </select>
              </div>

              {/* Search text input */}
              <div className="md:col-span-5 relative">
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Building className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="ابحث بالمنطقة، الحي، (مثل: أبو رمانة، طاقة شمسية)..."
                  className="w-full bg-slate-900/90 text-white placeholder-slate-400 border border-slate-700 rounded-2xl pr-11 pl-4 py-3.5 focus:outline-none focus:border-emerald-500 font-medium text-sm transition-all"
                  onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
                />
              </div>

              {/* Search button */}
              <div className="md:col-span-3">
                <button
                  type="button"
                  onClick={onSearchSubmit}
                  className="w-full h-full min-h-[50px] flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base rounded-2xl transition-all duration-200 shadow-xl shadow-emerald-600/30 hover:scale-[1.02] active:scale-95"
                >
                  <Search className="w-5 h-5" />
                  <span>بحث عن عقار</span>
                </button>
              </div>

            </div>

            {/* Quick Regions Tags */}
            <div className="mt-4 pt-4 border-t border-slate-700/60 flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="font-semibold text-slate-400">مناطق شائعة:</span>
              {popularRegions.map((reg) => (
                <button
                  key={reg.name}
                  type="button"
                  onClick={() => {
                    onGovernorateChange(reg.gov as Governorate);
                    onRegionSelect(reg.name);
                    onSearchSubmit();
                  }}
                  className="px-3 py-1 rounded-xl bg-slate-700/60 hover:bg-emerald-600/30 hover:text-emerald-300 border border-slate-600/60 transition-all font-medium"
                >
                  {reg.name}
                </button>
              ))}
            </div>

          </div>

          {/* Quick Metrics Trust Bar */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 flex flex-col items-center">
              <span className="text-2xl font-bold font-alexandria text-emerald-400">+500</span>
              <span className="text-xs text-slate-400 mt-1">عقار موثق بالكامل</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 flex flex-col items-center">
              <span className="text-2xl font-bold font-alexandria text-amber-400">100%</span>
              <span className="text-xs text-slate-400 mt-1">تأكيد الملكية (طابو)</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 flex flex-col items-center">
              <span className="text-2xl font-bold font-alexandria text-emerald-400">تواصل مباشر</span>
              <span className="text-xs text-slate-400 mt-1">بدون عمولات وسجناء</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 flex flex-col items-center">
              <span className="text-2xl font-bold font-alexandria text-teal-400">تحديث يومي</span>
              <span className="text-xs text-slate-400 mt-1">عقارات حديثة السوق</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
