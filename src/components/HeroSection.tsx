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
import { SYRIAN_LOCATIONS } from '../data/locations';

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
  { name: 'المزة فيلات', gov: 'دمشق' },
  { name: 'يعفور', gov: 'ريف دمشق' },
  { name: 'مشروع دمر', gov: 'دمشق' },
  { name: 'كفرسوسة', gov: 'دمشق' },
  { name: 'ماروتا سيتي', gov: 'دمشق' },
  { name: 'الشهباء', gov: 'حلب' },
  { name: 'الإنشاءات', gov: 'حمص' },
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
      className="relative bg-slate-950 text-white pt-24 sm:pt-28 pb-10 overflow-hidden bg-grid-pattern bg-radial-vignette"
    >
      {/* Dynamic Ambient Background Aura Glows */}
      <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split Hero 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center py-4 sm:py-8">
          
          {/* ================= RIGHT COLUMN: Headlines & Search Panel (lg:col-span-7) ================= */}
          <div className="lg:col-span-7 text-right space-y-5 order-2 lg:order-1">
            {/* Top Trust Badge with Shimmer */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wide backdrop-blur-md shimmer-badge-wrapper shadow-lg shadow-emerald-950/40">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>المنصة العقارية الأكثر موثوقية وتنسيقاً في سوريا</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2.5">
              <h1 className="font-black font-alexandria space-y-2">
                <span className="block text-2xl sm:text-4xl xl:text-5xl leading-[1.35] text-gradient-silver">
                  اعثر على <span className="text-gradient-emerald">عقارك المثالي</span>
                </span>
                <span className="block text-slate-300 text-lg sm:text-2xl xl:text-3xl font-extrabold leading-[1.35]">
                  بأسعار حقيقية وتواصل مباشر
                </span>
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                تصفح أرقى الشقق، الفيلات، والمشاريع قيد الإنشاء في دمشق وريف دمشق وسائر المحافظات مع تدقيق سندات الملكية وأنظمة الطاقة.
              </p>
            </div>

            {/* Frosted Glass Search Card */}
            <div className="glass-panel rounded-3xl p-5 space-y-4">
              {/* Contract Type Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-950/90 rounded-2xl w-fit border border-slate-800">
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
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/40'
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
                    <MapPin className="w-4 h-4 text-emerald-400" />
                  </div>
                  <select
                    value={governorate}
                    onChange={(e) => onGovernorateChange(e.target.value as Governorate)}
                    className="w-full bg-slate-950/80 text-white border border-slate-700/80 rounded-2xl pr-10 pl-3 py-3 focus:outline-none focus:border-emerald-500 text-xs sm:text-sm font-semibold transition-all appearance-none cursor-pointer"
                  >
                    <option value="الكل">كل المحافظات (14 محافظة)</option>
                    {SYRIAN_LOCATIONS.map((loc) => (
                      <option key={loc.provinceId} value={loc.provinceNameAr}>
                        محافظة {loc.provinceNameAr}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-5 relative">
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Building className="w-4 h-4 text-emerald-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="ابحث بالحي، المنطقة أو الرمز..."
                    className="w-full bg-slate-950/80 text-white placeholder-slate-500 border border-slate-700/80 rounded-2xl pr-10 pl-3 py-3 focus:outline-none focus:border-emerald-500 text-xs sm:text-sm font-medium transition-all"
                    onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
                  />
                </div>

                <div className="sm:col-span-3">
                  <button
                    type="button"
                    onClick={onSearchSubmit}
                    className="w-full h-full min-h-[46px] flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm rounded-2xl transition-all duration-200 shadow-xl shadow-emerald-600/30 hover:scale-[1.02] active:scale-95 cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    <span>بحث العقارات</span>
                  </button>
                </div>
              </div>

              {/* Popular Region Quick Chips */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
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
                    className="px-2.5 py-1 rounded-xl bg-slate-950/70 hover:bg-emerald-600 hover:text-white border border-slate-800 text-slate-300 text-xs transition-all font-medium cursor-pointer"
                  >
                    {reg.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ================= LEFT COLUMN: General Lifestyle / Category Showcase Frame (lg:col-span-5) ================= */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative group rounded-3xl sm:rounded-4xl overflow-hidden border border-slate-700/80 shadow-2xl shadow-emerald-950/40 bg-slate-900 aspect-[4/3] sm:aspect-[16/11] select-none ring-1 ring-white/15">
              
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

              {/* Glass Dark Vignette for Crisp Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

              {/* Top Glass Category Pill Banner */}
              <div className="absolute top-4 right-4 z-20">
                <span className="px-3.5 py-1.5 rounded-2xl bg-slate-950/80 text-white text-xs font-black backdrop-blur-md border border-slate-700/80 shadow-lg flex items-center gap-1.5">
                  {slide.categoryBadge}
                </span>
              </div>

              {/* Top Left Total Count Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 rounded-xl bg-emerald-600/90 text-white text-[11px] font-black backdrop-blur-md shadow-md">
                  {slide.countBadge}
                </span>
              </div>

              {/* Floating Slide Details Content at the Bottom */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-20 space-y-2 text-right">
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black font-alexandria text-white drop-shadow-md">
                    {slide.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-300 drop-shadow">
                    {slide.subtitle}
                  </p>
                </div>

                <div className="pt-1 flex items-center justify-between border-t border-white/15 text-xs text-slate-200">
                  <span className="text-[11px] text-slate-300 font-medium truncate">
                    {slide.highlightTag}
                  </span>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-1.5 shrink-0 mr-2">
                    <button
                      type="button"
                      onClick={goToPrev}
                      className="p-1.5 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white border border-slate-700 backdrop-blur-md shadow transition-transform hover:scale-110 active:scale-95"
                      title="السابق"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={goToNext}
                      className="p-1.5 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white border border-slate-700 backdrop-blur-md shadow transition-transform hover:scale-110 active:scale-95"
                      title="التالي"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Slider Progress Bar */}
              <div className="absolute bottom-1 inset-x-5 flex gap-1 z-30">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className="flex-1 h-1 rounded-full overflow-hidden bg-white/30"
                  >
                    <div
                      className={`h-full bg-emerald-400 transition-all duration-300 ${
                        idx === currentSlide ? 'w-full' : 'w-0'
                      }`}
                    />
                  </button>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
