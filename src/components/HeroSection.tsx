'use client';

import React, { useState, useEffect } from 'react';
import { Search, MapPin, Building, ChevronLeft, ChevronRight, Star } from 'lucide-react';
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

const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
    badge: '🏡 فيلات فاخرة',
    title: 'فيلا دمشقية عصرية',
    location: 'أبو رمانة - دمشق',
    price: '٢٢٥,٠٠٠ $',
    tag: 'للبيع',
    rating: '4.9',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2000&q=85',
    badge: '🏢 شقق راقية',
    title: 'شقة مطلة على المدينة',
    location: 'المزة - دمشق',
    price: '١٢٠,٠٠٠ $',
    tag: 'للبيع',
    rating: '4.8',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=85',
    badge: '🌿 فيلات مع حديقة',
    title: 'فيلا فاخرة مع حديقة خاصة',
    location: 'قدسيا - ريف دمشق',
    price: '٣٥,٠٠٠ $ / سنة',
    tag: 'للإيجار',
    rating: '5.0',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2000&q=85',
    badge: '🏙️ مكاتب تجارية',
    title: 'مكتب مودرن في قلب المدينة',
    location: 'ساحة العباسيين - دمشق',
    price: '٣,٥٠٠ $ / شهر',
    tag: 'للإيجار',
    rating: '4.7',
  },
];

const popularRegions = [
  { name: 'أبو رمانة', gov: 'دمشق' },
  { name: 'المزة', gov: 'دمشق' },
  { name: 'الشهباء', gov: 'حلب' },
  { name: 'الإنشاءات', gov: 'حمص' },
  { name: 'مشروع دمر', gov: 'دمشق' },
  { name: 'يعفور', gov: 'ريف دمشق' },
];

const stats = [
  { value: '+500', label: 'عقار موثق', color: 'text-emerald-400' },
  { value: '100%', label: 'تأكيد الملكية (طابو)', color: 'text-amber-400' },
  { value: 'مباشر', label: 'تواصل بدون وسيط', color: 'text-teal-400' },
  { value: 'يومي', label: 'تحديث العقارات', color: 'text-sky-400' },
];

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setIsTransitioning(false);
    }, 400);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      setIsTransitioning(false);
    }, 400);
  };

  const slide = heroSlides[currentSlide];

  return (
    <div id="hero" className="relative min-h-screen flex flex-col pt-20 overflow-hidden bg-slate-950">

      {/* ---- SLIDER BACKGROUND ---- */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === currentSlide ? 1 : 0 }}
          >
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
        {/* Gradient: strong on RIGHT side (where search panel is), transparent on LEFT side */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/30 to-slate-950 z-10" />
        {/* RTL: right = start. Make right half dark to protect text readability */}
        <div className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(to left, rgba(2,6,23,0.92) 0%, rgba(2,6,23,0.85) 40%, rgba(2,6,23,0.3) 65%, rgba(2,6,23,0.05) 100%)'
          }}
        />
      </div>

      {/* ---- SLIDER CONTROLS (far left edge, won't overlap content) ---- */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-emerald-600/80 transition-all duration-200 shadow-lg"
        aria-label="السابق"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* ---- SLIDE DOTS (bottom center of LEFT half) ---- */}
      <div className="absolute bottom-36 left-1/4 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`rounded-full transition-all duration-300 ${
              i === currentSlide ? 'w-8 h-2 bg-emerald-400' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* ---- FLOATING PROPERTY CARD (bottom-left, over visible image area) ---- */}
      <div
        className={`absolute bottom-28 left-8 z-20 hidden lg:block transition-all duration-500 ${
          isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="bg-black/40 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-2xl max-w-[230px]">
          <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
            {slide.badge}
          </span>
          <p className="text-white font-bold mt-2 text-sm leading-snug">{slide.title}</p>
          <div className="flex items-center gap-1 mt-1 text-slate-400 text-xs">
            <MapPin className="w-3 h-3 text-emerald-400" />
            <span>{slide.location}</span>
          </div>
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
            <span className="text-emerald-400 font-extrabold text-sm">{slide.price}</span>
            <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{slide.rating}</span>
            </div>
          </div>
          <span className={`mt-2 inline-block text-xs font-bold px-2 py-0.5 rounded-full ${
            slide.tag === 'للبيع' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-sky-500/20 text-sky-300'
          }`}>
            {slide.tag}
          </span>
        </div>
      </div>

      {/* ---- MAIN CONTENT: Two-column grid ---- */}
      {/* In RTL: first child renders on RIGHT, second on LEFT */}
      <div className="relative z-20 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

            {/* === RIGHT COLUMN: Title + Search Panel (RTL: renders on right) === */}
            <div className="text-right space-y-5">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                المنصة العقارية الأولى في سوريا
              </div>

              {/* Title */}
              <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}>
                <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-white leading-tight font-alexandria">
                  اكتشف{' '}
                  <span className="text-emerald-400">عقارك المثالي</span>
                  <br />
                  <span className="text-slate-200 text-xl sm:text-2xl xl:text-3xl font-bold">
                    في كافة المحافظات السورية
                  </span>
                </h1>
                <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                  شقق، فيلات، ومكاتب تجارية بأسعار حقيقية — تواصل مباشر عبر واتساب بدون عمولات.
                </p>
              </div>

              {/* Search Box */}
              <div className="bg-slate-900/85 backdrop-blur-2xl rounded-2xl border border-slate-700/70 shadow-2xl p-4">

                {/* Contract type tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-800/80 rounded-xl w-fit mb-4 border border-slate-700/50">
                  {[
                    { val: 'all', label: 'الجميع' },
                    { val: 'sale', label: 'للبيع' },
                    { val: 'rent', label: 'للإيجار' },
                  ].map((tab) => (
                    <button
                      key={tab.val}
                      type="button"
                      onClick={() => onContractTypeChange(tab.val as ContractType)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                        contractType === tab.val
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-4 relative">
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <select
                      value={governorate}
                      onChange={(e) => onGovernorateChange(e.target.value as Governorate)}
                      className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl pr-10 pl-3 py-3 focus:outline-none focus:border-emerald-500 text-sm transition-all appearance-none cursor-pointer"
                    >
                      <option value="الكل">جميع المحافظات</option>
                      <option value="دمشق">دمشق</option>
                      <option value="ريف دمشق">ريف دمشق</option>
                      <option value="حلب">حلب</option>
                      <option value="حمص">حمص</option>
                      <option value="حماة">حماة</option>
                    </select>
                  </div>

                  <div className="sm:col-span-5 relative">
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                      <Building className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      placeholder="ابحث عن منطقة أو حي..."
                      className="w-full bg-slate-800 text-white placeholder-slate-500 border border-slate-700 rounded-xl pr-10 pl-3 py-3 focus:outline-none focus:border-emerald-500 text-sm transition-all"
                      onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <button
                      type="button"
                      onClick={onSearchSubmit}
                      className="w-full h-full min-h-[46px] flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-emerald-600/25 hover:scale-[1.02] active:scale-95"
                    >
                      <Search className="w-4 h-4" />
                      <span>بحث</span>
                    </button>
                  </div>
                </div>

                {/* Quick region tags */}
                <div className="mt-3 pt-3 border-t border-slate-700/50 flex flex-wrap items-center gap-1.5">
                  <span className="text-xs text-slate-500 font-medium">شائع:</span>
                  {popularRegions.map((reg) => (
                    <button
                      key={reg.name}
                      type="button"
                      onClick={() => {
                        onGovernorateChange(reg.gov as Governorate);
                        onRegionSelect(reg.name);
                        onSearchSubmit();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-emerald-600/20 hover:text-emerald-300 border border-slate-700 text-slate-400 text-xs transition-all font-medium"
                    >
                      {reg.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* === LEFT COLUMN: empty — shows background image clearly === */}
            <div className="hidden lg:flex items-end justify-start h-full pb-8">
              {/* Intentionally left mostly empty to show the slide image */}
              {/* Slide label shown at top-left of this column */}
              <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {slide.badge} · {slide.location}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ---- STATS BAR ---- */}
      <div className="relative z-20 border-t border-slate-800/60 bg-slate-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center p-3">
                <span className={`text-xl font-extrabold font-alexandria ${stat.color}`}>{stat.value}</span>
                <span className="text-xs text-slate-500 mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
