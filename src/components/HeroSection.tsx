'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  Building,
  ChevronLeft,
  ChevronRight,
  Star,
  ShieldCheck,
  Sun,
  Clock,
  Sparkles,
  Zap,
} from 'lucide-react';
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
    badge: '🏡 فيلات وقصور دمشقية',
    title: 'فيلا فاخرة بإطلالة خضراء',
    location: 'أبو رمانة - دمشق',
    price: '٥٦٠,٠٠٠ $',
    tag: 'طابو سبز 2400',
    rating: '4.9',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2000&q=85',
    badge: '🌿 مزارع وفيلات راقية',
    title: 'مزرعة ملكية مجهزة بالكامل',
    location: 'يعفور - ريف دمشق',
    price: '٩٥٠,٠٠٠ $',
    tag: 'طاقة شمسية كاملة',
    rating: '5.0',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=85',
    badge: '🏢 شقق سكنية راقية',
    title: 'شقة سوبر ديلوكس حديثة',
    location: 'فيلات المزة الشرقية',
    price: '٣٥٠,٠٠٠ $',
    tag: 'للبيع',
    rating: '4.8',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2000&q=85',
    badge: '🏙️ مكاتب وأبراج تجارية',
    title: 'مكتب تجاري حديث مجهز',
    location: 'كفرسوسة - دمشق',
    price: '٢,٢٠٠ $ / شهر',
    tag: 'للإيجار',
    rating: '4.9',
  },
];

const popularRegions = [
  { name: 'أبو رمانة', gov: 'دمشق' },
  { name: 'المزة', gov: 'دمشق' },
  { name: 'يعفور', gov: 'ريف دمشق' },
  { name: 'مشروع دمر', gov: 'دمشق' },
  { name: 'الشهباء', gov: 'حلب' },
  { name: 'الإنشاءات', gov: 'حمص' },
];

const trustStats = [
  {
    icon: ShieldCheck,
    value: '100% طابو محقق',
    label: 'سندات ملكية مفحوصة وموثقة',
    color: 'text-emerald-400',
  },
  {
    icon: Sun,
    value: '85% طاقة شمسية',
    label: 'منظومات طاقة بديلة متكاملة',
    color: 'text-amber-400',
  },
  {
    icon: Building,
    value: '+150 عقار منسق',
    label: 'في دمشق، ريف دمشق والمحافظات',
    color: 'text-sky-400',
  },
  {
    icon: Clock,
    value: 'رد فوري 5 دقائق',
    label: 'تنسيق مباشر وسريع عبر واتساب',
    color: 'text-teal-400',
  },
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

  const goToNext = React.useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning]);

  const goToPrev = React.useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <div id="hero" className="relative min-h-[90vh] flex flex-col pt-24 overflow-hidden bg-slate-950">
      {/* Background Slides */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === currentSlide ? 1 : 0 }}
          >
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover transform scale-105 transition-transform duration-10000 ease-out"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        {/* Ambient Dark Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950 z-10" />
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              'linear-gradient(to left, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.85) 45%, rgba(2,6,23,0.35) 75%, rgba(2,6,23,0.1) 100%)',
          }}
        />
      </div>

      {/* Slider Controls */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-emerald-600 text-white backdrop-blur-md border border-white/15 flex items-center justify-center transition-all shadow-xl"
        aria-label="السابق"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Slider Indicator Dots */}
      <div className="absolute bottom-32 left-1/4 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`rounded-full transition-all duration-500 ${
              i === currentSlide ? 'w-8 h-2 bg-emerald-400' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Floating Hero Preview Card */}
      <div
        className={`absolute bottom-24 left-10 z-20 hidden xl:block transition-all duration-500 ${
          isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="bg-slate-950/70 backdrop-blur-2xl border border-white/20 rounded-3xl p-5 shadow-2xl max-w-[260px] space-y-2.5 ring-1 ring-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              {slide.badge}
            </span>
            <div className="flex items-center gap-1 text-amber-400 text-xs font-black">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{slide.rating}</span>
            </div>
          </div>

          <p className="text-white font-extrabold text-sm leading-normal font-alexandria">{slide.title}</p>

          <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{slide.location}</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <span className="text-emerald-400 font-black text-sm font-alexandria">{slide.price}</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {slide.tag}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="relative z-20 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Right Column: High-Impact Typography & Frosted Glass Search Panel */}
            <div className="text-right space-y-6">
              {/* Top Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wide backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>المنصة العقارية الأكثر موثوقية وتنسيقاً في سوريا</span>
              </div>

              {/* Main Headline */}
              <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'}`}>
                <h1 className="font-black font-alexandria space-y-3.5">
                  <span className="block text-2xl sm:text-3xl xl:text-4xl text-white leading-[1.45]">
                    اعثر على{' '}
                    <span className="text-emerald-400">
                      عقارك المثالي
                    </span>
                  </span>
                  <span className="block text-slate-200 text-lg sm:text-xl xl:text-2xl font-extrabold leading-[1.45]">
                    بأسعار حقيقية وتواصل مباشر
                  </span>
                </h1>
                <p className="mt-4 text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg">
                  تصفح أرقى الشقق، الفيلات والمزارع في دمشق وريف دمشق وسائر المحافظات مع تفاصيل دقيقة للطاقة وسندات الملكية.
                </p>
              </div>

              {/* Frosted Glass Search Card */}
              <div className="bg-slate-900/85 backdrop-blur-2xl rounded-3xl border border-slate-700/80 shadow-2xl p-5 ring-1 ring-white/10 space-y-4">
                {/* Contract Type Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-2xl w-fit border border-slate-800">
                  {[
                    { val: 'all', label: 'كافة العروض' },
                    { val: 'sale', label: 'عقارات للبيع' },
                    { val: 'rent', label: 'عقارات للإيجار' },
                  ].map((tab) => (
                    <button
                      key={tab.val}
                      type="button"
                      onClick={() => onContractTypeChange(tab.val as ContractType)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        contractType === tab.val
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Input Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                  <div className="sm:col-span-4 relative">
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                    </div>
                    <select
                      value={governorate}
                      onChange={(e) => onGovernorateChange(e.target.value as Governorate)}
                      className="w-full bg-slate-800/90 text-white border border-slate-700 rounded-2xl pr-10 pl-3 py-3 focus:outline-none focus:border-emerald-500 text-xs sm:text-sm font-semibold transition-all appearance-none cursor-pointer"
                    >
                      <option value="الكل">كل المحافظات</option>
                      <option value="دمشق">محافظة دمشق</option>
                      <option value="ريف دمشق">محافظة ريف دمشق</option>
                      <option value="حلب">محافظة حلب</option>
                      <option value="حمص">محافظة حمص</option>
                      <option value="حماة">محافظة حماة</option>
                    </select>
                  </div>

                  <div className="sm:col-span-5 relative">
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Building className="w-4 h-4 text-emerald-500" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      placeholder="ابحث بالحي، المنطقة أو الرمز..."
                      className="w-full bg-slate-800/90 text-white placeholder-slate-400 border border-slate-700 rounded-2xl pr-10 pl-3 py-3 focus:outline-none focus:border-emerald-500 text-xs sm:text-sm font-medium transition-all"
                      onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <button
                      type="button"
                      onClick={onSearchSubmit}
                      className="w-full h-full min-h-[44px] flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm rounded-2xl transition-all duration-200 shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-95"
                    >
                      <Search className="w-4 h-4" />
                      <span>بحث العقارات</span>
                    </button>
                  </div>
                </div>

                {/* Popular Region Quick Chips */}
                <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-slate-400 font-semibold">أشهر المناطق:</span>
                  {popularRegions.map((reg) => (
                    <button
                      key={reg.name}
                      type="button"
                      onClick={() => {
                        onGovernorateChange(reg.gov as Governorate);
                        onRegionSelect(reg.name);
                        onSearchSubmit();
                      }}
                      className="px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-emerald-600 hover:text-white border border-slate-700/80 text-slate-300 text-xs transition-all font-medium"
                    >
                      {reg.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Left Column: Visual breathing space */}
            <div className="hidden lg:flex items-end justify-start h-full pb-6">
              <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white text-xs font-bold shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {slide.badge} • {slide.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Stats Counter Bar */}
      <div className="relative z-20 border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustStats.map((stat) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={stat.value}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/60"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                    <IconComp className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <span className="text-sm font-black font-alexandria text-white block">
                      {stat.value}
                    </span>
                    <span className="text-[11px] text-slate-400 block leading-tight">
                      {stat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
