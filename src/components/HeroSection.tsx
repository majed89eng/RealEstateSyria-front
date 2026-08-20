'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  Building,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sun,
  Clock,
  Sparkles,
  Layers,
  Compass,
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

// General Lifestyle & Sector-Focused Hero Slides (Not tied to a single specific property)
const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=90',
    categoryBadge: '🏡 الفيلات والقصور الفاخرة',
    title: 'فيلات راقية وقصور مستقلة',
    subtitle: 'يعفور، الصبورة، وأرقى ضواحي دمشق',
    highlightTag: 'طابو سبز 2400 سهم • حدائق ومسابح خاصة',
    countBadge: '+45 فيلا وقصر متاح',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=90',
    categoryBadge: '🏢 الشقق السكنية والبنتهاوس',
    title: 'شقق سكنية وإكساء ديلوكس',
    subtitle: 'أبو رمانة، المزة، المالكي، ومشروع دمر',
    highlightTag: 'طاقة شمسية 24/7 • مصاعد وكراجات',
    countBadge: '+80 شقة سكنية منسقة',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=90',
    categoryBadge: '🏗️ مشاريع التطوير والبيع على المخطط',
    title: 'المشاريع الاستثمارية الحديثة',
    subtitle: 'أبراج ماروتا سيتي وباسيليا سيتي',
    highlightTag: 'أقساط ميسرة حتى 3 سنوات • عوائد واعدة',
    countBadge: 'مشاريع قيد الإنشاء',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=90',
    categoryBadge: '🌿 المزارع والاستراحات الريفية',
    title: 'مزارع واستراحات استجمامية',
    subtitle: 'غوطة دمشق، ريف حمص، وحلب',
    highlightTag: 'طبيعة خلابة • آبار ومنظومات ري مستقلة',
    countBadge: '+30 مزرعة واستراحة',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=90',
    categoryBadge: '🏙️ المقرات والمكاتب التجارية',
    title: 'مكاتب ومقرات شركات وأعمال',
    subtitle: 'كفرسوسة، ساحة الأمويين، والمراكز الحيوية',
    highlightTag: 'تراخيص تجارية • مواقف وخدمات متكاملة',
    countBadge: '+25 مقر تجاري',
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
    }, 300);
  }, [isTransitioning]);

  const goToPrev = React.useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <section
      id="hero"
      className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-24 sm:pt-28 pb-10 overflow-hidden"
    >
      {/* Dynamic Ambient Background Aura Glows */}
      <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split Hero 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center py-4 sm:py-8">
          
          {/* ================= RIGHT COLUMN: Headlines & Search Panel (lg:col-span-7) ================= */}
          <div className="lg:col-span-7 text-right space-y-5 order-2 lg:order-1">
            {/* Top Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wide backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>المنصة العقارية الأكثر موثوقية وتنسيقاً في سوريا</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2.5">
              <h1 className="font-black font-alexandria space-y-3.5">
                <span className="block text-2xl sm:text-3xl xl:text-4xl text-white leading-[1.45]">
                  اعثر على <span className="text-emerald-400">عقارك المثالي</span>
                </span>
                <span className="block text-slate-200 text-lg sm:text-xl xl:text-2xl font-extrabold leading-[1.45]">
                  بأسعار حقيقية وتواصل مباشر
                </span>
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                تصفح أرقى الشقق، الفيلات، والمشاريع قيد الإنشاء في دمشق وريف دمشق وسائر المحافظات مع تدقيق سندات الملكية وأنظمة الطاقة.
              </p>
            </div>

            {/* Frosted Glass Search Card */}
            <div className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-slate-700/80 shadow-2xl p-5 ring-1 ring-white/10 space-y-4">
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
                    className="w-full h-full min-h-[46px] flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm rounded-2xl transition-all duration-200 shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-95 cursor-pointer"
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
                    className="px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-emerald-600 hover:text-white border border-slate-700/80 text-slate-300 text-xs transition-all font-medium cursor-pointer"
                  >
                    {reg.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ================= LEFT COLUMN: General Lifestyle / Category Showcase Frame (lg:col-span-5) ================= */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative group rounded-3xl sm:rounded-4xl overflow-hidden border border-slate-700/80 shadow-2xl shadow-emerald-950/30 bg-slate-900 aspect-[4/3] sm:aspect-[16/11] select-none ring-1 ring-white/15">
              
              {/* Full-Bright Category Image with Smooth Cross-Fade Transition */}
              {heroSlides.map((s, i) => (
                <div
                  key={s.id}
                  className="absolute inset-0 transition-opacity duration-700 ease-out"
                  style={{ opacity: i === currentSlide ? 1 : 0 }}
                >
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover transform transition-transform duration-7000 ease-out group-hover:scale-105"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}

              {/* Soft, Transparent Bottom Gradient Just for Text Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent pointer-events-none" />

              {/* Top Floating Glass Badges */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-slate-950/80 text-emerald-400 border border-emerald-500/40 backdrop-blur-md shadow-md">
                  {slide.categoryBadge}
                </span>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-950/80 text-amber-300 border border-slate-700 backdrop-blur-md shadow-md flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{slide.countBadge}</span>
                  </span>

                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-slate-950/80 text-slate-300 border border-slate-700 backdrop-blur-md shadow-md">
                    {currentSlide + 1} / {heroSlides.length}
                  </span>
                </div>
              </div>

              {/* Left / Right Interactive Slider Navigation Buttons */}
              <div className="absolute inset-y-0 inset-x-3 flex items-center justify-between pointer-events-none z-10">
                <button
                  type="button"
                  onClick={goToPrev}
                  className="w-9 h-9 rounded-full bg-slate-950/80 hover:bg-emerald-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center pointer-events-auto transition-all duration-200 shadow-xl hover:scale-110 active:scale-95"
                  title="القسم السابق"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={goToNext}
                  className="w-9 h-9 rounded-full bg-slate-950/80 hover:bg-emerald-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center pointer-events-auto transition-all duration-200 shadow-xl hover:scale-110 active:scale-95"
                  title="القسم التالي"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>

              {/* Bottom Category Showcase Info */}
              <div className="absolute bottom-4 inset-x-4 z-10 space-y-2">
                {/* Title & Subtitle */}
                <div className="space-y-0.5">
                  <h3 className="text-base sm:text-lg font-black text-white font-alexandria line-clamp-1 drop-shadow-md">
                    {slide.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{slide.subtitle}</span>
                  </div>
                </div>

                {/* Highlight Tag & Dot Indicators Row */}
                <div className="flex items-center justify-between pt-2 border-t border-white/15">
                  <span className="text-[11px] font-bold text-amber-300 bg-slate-950/80 px-2.5 py-1 rounded-xl border border-slate-700/80 backdrop-blur-md">
                    {slide.highlightTag}
                  </span>

                  {/* Dot Indicators */}
                  <div className="flex items-center gap-1.5">
                    {heroSlides.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCurrentSlide(i)}
                        className={`rounded-full transition-all duration-300 ${
                          i === currentSlide
                            ? 'w-6 h-1.5 bg-emerald-400'
                            : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
                        }`}
                        title={`الانتقال إلى ${heroSlides[i].title}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ================= BOTTOM: Trust Stats Counter Bar ================= */}
      <div className="relative z-20 border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-xl mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {trustStats.map((stat) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={stat.value}
                  className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-slate-900/60 border border-slate-800/60"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                    <IconComp className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-black font-alexandria text-white block">
                      {stat.value}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-slate-400 block leading-tight">
                      {stat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
