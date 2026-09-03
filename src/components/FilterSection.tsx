'use client';

import React, { useState } from 'react';
import {
  SlidersHorizontal,
  RotateCcw,
  Check,
  Sun,
  ShieldCheck,
  ArrowUpDown,
  X,
  Sparkles,
  Building2,
  Home,
  Trees,
  Briefcase,
  Layers,
  MapPin,
  DollarSign,
  Bed,
  Car,
  Zap,
  Gem,
  Tag,
  ScrollText,
  Palmtree,
  CheckCircle2,
  HardHat,
  Maximize2,
  Coins,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  FilterOptions,
  Governorate,
  PropertyType,
  FinishingStatus,
  AvailabilityStatus,
  CurrencyCode,
} from '../types/property';
import { propertyService } from '../services/propertyService';
import { useCurrency } from '../context/CurrencyContext';
import { SYRIAN_LOCATIONS } from '../data/locations';

interface FilterSectionProps {
  filters: FilterOptions;
  onUpdateFilter: <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => void;
  onResetFilters: () => void;
  resultCount: number;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  onUpdateFilter,
  onResetFilters,
  resultCount,
}) => {
  const { currency, setCurrency, formatPrice, convertPrice } = useCurrency();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Available regions based on selected governorate
  const currentProvinceData = SYRIAN_LOCATIONS.find((l) => l.provinceNameAr === filters.governorate);
  const regions = currentProvinceData
    ? currentProvinceData.cities.map((c) => c.cityNameAr)
    : [
        'أبو رمانة',
        'المالكي',
        'المزة',
        'كفرسوسة',
        'مشروع دمر',
        'الشعلان',
        'قدسيا',
        'يعفور',
        'الصبورة',
        'صحنايا',
        'جرمانا',
      ];

  // Quick Category Filter Carousel
  const categoryTabs = [
    {
      id: 'all',
      label: 'كافة العقارات',
      icon: Building2,
      iconColor: 'text-slate-300',
      activeBg: 'bg-emerald-600 text-white shadow-emerald-600/30',
      isActive: filters.propertyType === 'all' && !filters.hasSolar && !filters.isOffPlan && !filters.hasTaboGreen,
      onClick: () => {
        onUpdateFilter('propertyType', 'all');
        onUpdateFilter('hasSolar', undefined);
        onUpdateFilter('isOffPlan', undefined);
        onUpdateFilter('hasTaboGreen', undefined);
      },
    },
    {
      id: 'apartment',
      label: 'شقق سكنية',
      icon: Home,
      iconColor: 'text-emerald-400',
      activeBg: 'bg-emerald-600 text-white shadow-emerald-600/30',
      isActive: filters.propertyType === 'apartment',
      onClick: () => onUpdateFilter('propertyType', filters.propertyType === 'apartment' ? 'all' : 'apartment'),
    },
    {
      id: 'villa',
      label: 'فيلات وقصور',
      icon: Building2,
      iconColor: 'text-amber-400',
      activeBg: 'bg-amber-600 text-white shadow-amber-600/30',
      isActive: filters.propertyType === 'villa',
      onClick: () => onUpdateFilter('propertyType', filters.propertyType === 'villa' ? 'all' : 'villa'),
    },
    {
      id: 'off_plan',
      label: 'على المخطط',
      icon: HardHat,
      iconColor: 'text-amber-400',
      activeBg: 'bg-amber-600 text-white shadow-amber-600/30',
      isActive: !!filters.isOffPlan,
      onClick: () => onUpdateFilter('isOffPlan', !filters.isOffPlan),
    },
    {
      id: 'chalet',
      label: 'مزارع واستراحات',
      icon: Palmtree,
      iconColor: 'text-teal-400',
      activeBg: 'bg-teal-600 text-white shadow-teal-600/30',
      isActive: filters.propertyType === 'chalet',
      onClick: () => onUpdateFilter('propertyType', filters.propertyType === 'chalet' ? 'all' : 'chalet'),
    },
    {
      id: 'commercial',
      label: 'مكاتب ومقرات',
      icon: Briefcase,
      iconColor: 'text-blue-400',
      activeBg: 'bg-blue-600 text-white shadow-blue-600/30',
      isActive: filters.propertyType === 'commercial',
      onClick: () => onUpdateFilter('propertyType', filters.propertyType === 'commercial' ? 'all' : 'commercial'),
    },
    {
      id: 'solar',
      label: 'طاقة شمسية',
      icon: Sun,
      iconColor: 'text-amber-400',
      activeBg: 'bg-amber-600 text-white shadow-amber-600/30',
      isActive: !!filters.hasSolar,
      onClick: () => onUpdateFilter('hasSolar', !filters.hasSolar),
    },
    {
      id: 'tabo_green',
      label: 'طابو سبز 2400',
      icon: ScrollText,
      iconColor: 'text-emerald-400',
      activeBg: 'bg-emerald-700 text-white shadow-emerald-700/30',
      isActive: !!filters.hasTaboGreen,
      onClick: () => onUpdateFilter('hasTaboGreen', !filters.hasTaboGreen),
    },
    {
      id: 'luxury',
      label: 'سوبر ديلوكس',
      icon: Gem,
      iconColor: 'text-purple-400',
      activeBg: 'bg-purple-600 text-white shadow-purple-600/30',
      isActive: filters.finishingStatus === 'luxury',
      onClick: () => onUpdateFilter('finishingStatus', filters.finishingStatus === 'luxury' ? 'all' : 'luxury'),
    },
  ];

  // Calculate number of active custom filters for the badge
  const activeFiltersCount = [
    filters.governorate !== 'الكل',
    filters.region !== 'الكل',
    filters.bedrooms !== 'all',
    filters.minPriceUsd !== undefined,
    filters.maxPriceUsd !== undefined,
    filters.minArea !== undefined,
    filters.maxArea !== undefined,
    filters.finishingStatus !== 'all',
    filters.availabilityStatus !== 'all',
    filters.isOffPlan,
    filters.hasSolar,
    filters.hasTaboGreen,
    filters.hasElevator,
    filters.hasGarage,
    filters.hasGenerator,
  ].filter(Boolean).length;

  // Multi-Currency Quick Price Preset Options
  const pricePresets = [
    {
      key: 'under_50k',
      min: undefined,
      max: 50000,
      labelUsd: 'حتى $50,000',
      labelSyp: 'حتى 750 مليون ل.س',
      labelEur: 'حتى 46,000 €',
    },
    {
      key: '50k_100k',
      min: 50000,
      max: 100000,
      labelUsd: '$50,000 - $100,000',
      labelSyp: '750م - 1.5 مليار ل.س',
      labelEur: '46k - 92k €',
    },
    {
      key: '100k_200k',
      min: 100000,
      max: 200000,
      labelUsd: '$100,000 - $200,000',
      labelSyp: '1.5 - 3 مليار ل.س',
      labelEur: '92k - 184k €',
    },
    {
      key: '200k_400k',
      min: 200000,
      max: 400000,
      labelUsd: '$200,000 - $400,000',
      labelSyp: '3 - 6 مليار ل.س',
      labelEur: '184k - 368k €',
    },
    {
      key: 'above_400k',
      min: 400000,
      max: undefined,
      labelUsd: 'أكثر من $400,000',
      labelSyp: 'أكثر من 6 مليار ل.س',
      labelEur: 'أكثر من 368,000 €',
    },
  ];

  // Derive active quick price value
  const getQuickPriceValue = () => {
    if (!filters.minPriceUsd && !filters.maxPriceUsd) return 'all';
    if (!filters.minPriceUsd && filters.maxPriceUsd === 50000) return 'under_50k';
    if (filters.minPriceUsd === 50000 && filters.maxPriceUsd === 100000) return '50k_100k';
    if (filters.minPriceUsd === 100000 && filters.maxPriceUsd === 200000) return '100k_200k';
    if (filters.minPriceUsd === 200000 && filters.maxPriceUsd === 400000) return '200k_400k';
    if (filters.minPriceUsd === 400000 && !filters.maxPriceUsd) return 'above_400k';
    return 'custom';
  };

  const getPresetLabel = (preset: (typeof pricePresets)[0]) => {
    if (currency === 'SYP') return preset.labelSyp;
    if (currency === 'EUR') return preset.labelEur;
    return preset.labelUsd;
  };

  return (
    <section
      id="properties"
      className="w-full bg-slate-900/98 backdrop-blur-2xl border-y border-slate-800/80 sticky top-[68px] sm:top-[74px] z-40 shadow-2xl transition-all duration-300 text-right"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
        
        {/* Row 1: Vector SVG Category Pill Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
          {categoryTabs.map((tab) => {
            const IconComponent = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={tab.onClick}
                className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 border cursor-pointer ${
                  tab.isActive
                    ? `${tab.activeBg} shadow-md scale-105`
                    : 'bg-slate-950/90 hover:bg-slate-850 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-xl flex items-center justify-center transition-colors ${
                    tab.isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-900 border border-slate-800 group-hover:bg-slate-850'
                  }`}
                >
                  <IconComponent className={`w-3.5 h-3.5 ${tab.isActive ? 'text-white' : tab.iconColor}`} />
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Row 2: Streamlined Interactive Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          
          {/* Main Filter Dropdowns & Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            
            {/* Contract Type Segmented Capsule */}
            <div className="flex p-0.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-bold shadow-inner">
              <button
                type="button"
                onClick={() => onUpdateFilter('contractType', 'all')}
                className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                  filters.contractType === 'all'
                    ? 'bg-slate-800 text-white shadow-sm font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                الكل
              </button>
              <button
                type="button"
                onClick={() => onUpdateFilter('contractType', 'sale')}
                className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                  filters.contractType === 'sale'
                    ? 'bg-emerald-600 text-white shadow-sm font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                للبيع
              </button>
              <button
                type="button"
                onClick={() => onUpdateFilter('contractType', 'rent')}
                className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                  filters.contractType === 'rent'
                    ? 'bg-emerald-600 text-white shadow-sm font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                للإيجار
              </button>
            </div>

            {/* Modern Governorate Dropdown with Icon */}
            <div className="relative">
              <select
                value={filters.governorate}
                onChange={(e) => onUpdateFilter('governorate', e.target.value as Governorate)}
                className="bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-200 text-xs font-bold rounded-2xl pr-3.5 pl-8 py-2 focus:outline-none focus:border-emerald-500 cursor-pointer appearance-none transition-colors shadow-sm"
              >
                <option value="الكل">كل المحافظات (14)</option>
                {SYRIAN_LOCATIONS.map((loc) => (
                  <option key={loc.provinceId} value={loc.provinceNameAr}>
                    {loc.provinceNameAr}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Multi-Currency Price Range Dropdown */}
            <div className="relative">
              <select
                value={getQuickPriceValue()}
                onChange={(e) => {
                  const val = e.target.value;
                  const found = pricePresets.find((p) => p.key === val);
                  if (val === 'all') {
                    onUpdateFilter('minPriceUsd', undefined);
                    onUpdateFilter('maxPriceUsd', undefined);
                  } else if (found) {
                    onUpdateFilter('minPriceUsd', found.min);
                    onUpdateFilter('maxPriceUsd', found.max);
                  }
                }}
                className={`border text-xs font-bold rounded-2xl pr-3.5 pl-8 py-2 focus:outline-none focus:border-emerald-500 cursor-pointer appearance-none transition-colors shadow-sm ${
                  filters.minPriceUsd || filters.maxPriceUsd
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 shadow-md font-black'
                    : 'bg-slate-950 hover:bg-slate-850 border-slate-800 text-slate-200'
                }`}
                title="تصفية سريعة بالسعر والميزانية"
              >
                <option value="all">كل الأسعار ({currency === 'USD' ? '$' : currency === 'SYP' ? 'ل.س' : '€'})</option>
                {pricePresets.map((p) => (
                  <option key={p.key} value={p.key}>
                    {getPresetLabel(p)}
                  </option>
                ))}
                {getQuickPriceValue() === 'custom' && (
                  <option value="custom">نطاق سعر مخصص</option>
                )}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Inline Expand / Collapse Toggle Button */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                isExpanded || activeFiltersCount > 0
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 shadow-md ring-1 ring-emerald-500/30'
                  : 'bg-slate-950 hover:bg-slate-850 text-slate-200 border-slate-800'
              }`}
              title="فرد وتوسيع خيارات الفلترة المتقدمة"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400 stroke-[2.2]" />
              <span>{isExpanded ? 'طي الفلاتر' : 'توسيع الفلاتر'}</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] flex items-center justify-center font-black mr-1">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Clear All Reset Button */}
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={onResetFilters}
                className="flex items-center gap-1 px-3 py-2 text-xs text-rose-400 hover:text-rose-300 font-bold bg-rose-950/30 hover:bg-rose-950/60 border border-rose-500/30 rounded-2xl transition-colors cursor-pointer"
                title="إعادة ضبط ومسح كافة الفلاتر"
              >
                <RotateCcw className="w-3.5 h-3.5 stroke-[2.2]" />
                <span>مسح ({activeFiltersCount})</span>
              </button>
            )}
          </div>

          {/* Right Controls: Sort Dropdown & Result Count */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-semibold">
              العقارات: <strong className="text-emerald-400 font-alexandria font-bold">{resultCount}</strong>
            </span>

            <div className="relative">
              <select
                value={filters.sortBy}
                onChange={(e) => onUpdateFilter('sortBy', e.target.value as any)}
                className="bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-200 text-xs font-bold rounded-2xl pr-3 pl-7 py-2 focus:outline-none focus:border-emerald-500 cursor-pointer appearance-none transition-colors"
              >
                <option value="newest">الأحدث أولاً</option>
                <option value="price_asc">الأقل سعراً</option>
                <option value="price_desc">الأعلى سعراً</option>
                <option value="most_viewed">الأكثر مشاهدة</option>
              </select>
              <ArrowUpDown className="w-3 h-3 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* Inline Expandable Full Filters Tray (Pushes cards down, 100% visible) */}
        {/* ========================================================================= */}
        {isExpanded && (
          <div className="pt-4 pb-2 border-t border-slate-800/80 space-y-6 animate-in slide-in-from-top-3 duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* 1. Multi-Currency Price Range Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>الميزانية والسعر</span>
                  </label>

                  {/* Inline Currency Switcher Capsule */}
                  <div className="flex p-0.5 bg-slate-900 rounded-lg border border-slate-800 text-[10px] font-bold">
                    {(['USD', 'SYP', 'EUR'] as CurrencyCode[]).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCurrency(c)}
                        className={`px-1.5 py-0.5 rounded transition-colors ${
                          currency === c
                            ? 'bg-emerald-600 text-white font-black'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {c === 'USD' ? '$' : c === 'SYP' ? 'ل.س' : '€'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-0.5">
                      الأدنى ({currency === 'USD' ? '$' : currency === 'SYP' ? 'ل.س' : '€'}):
                    </span>
                    <input
                      type="number"
                      placeholder={currency === 'SYP' ? 'مثال: 500000000' : 'مثال: 30000'}
                      value={
                        filters.minPriceUsd !== undefined
                          ? currency === 'USD'
                            ? filters.minPriceUsd
                            : convertPrice(filters.minPriceUsd, currency)
                          : ''
                      }
                      onChange={(e) => {
                        const val = e.target.value ? Number(e.target.value) : undefined;
                        if (val === undefined) {
                          onUpdateFilter('minPriceUsd', undefined);
                        } else {
                          // convert back to USD if entering in SYP or EUR
                          const rate = currency === 'SYP' ? 15000 : currency === 'EUR' ? 0.92 : 1;
                          onUpdateFilter('minPriceUsd', Math.round(val / rate));
                        }
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block mb-0.5">
                      الأعلى ({currency === 'USD' ? '$' : currency === 'SYP' ? 'ل.س' : '€'}):
                    </span>
                    <input
                      type="number"
                      placeholder={currency === 'SYP' ? 'مثال: 2000000000' : 'مثال: 150000'}
                      value={
                        filters.maxPriceUsd !== undefined
                          ? currency === 'USD'
                            ? filters.maxPriceUsd
                            : convertPrice(filters.maxPriceUsd, currency)
                          : ''
                      }
                      onChange={(e) => {
                        const val = e.target.value ? Number(e.target.value) : undefined;
                        if (val === undefined) {
                          onUpdateFilter('maxPriceUsd', undefined);
                        } else {
                          // convert back to USD if entering in SYP or EUR
                          const rate = currency === 'SYP' ? 15000 : currency === 'EUR' ? 0.92 : 1;
                          onUpdateFilter('maxPriceUsd', Math.round(val / rate));
                        }
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>
                </div>

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {pricePresets.map((p) => {
                    const isSel = filters.minPriceUsd === p.min && filters.maxPriceUsd === p.max;
                    return (
                      <button
                        key={p.key}
                        type="button"
                        onClick={() => {
                          if (isSel) {
                            onUpdateFilter('minPriceUsd', undefined);
                            onUpdateFilter('maxPriceUsd', undefined);
                          } else {
                            onUpdateFilter('minPriceUsd', p.min);
                            onUpdateFilter('maxPriceUsd', p.max);
                          }
                        }}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-all ${
                          isSel
                            ? 'bg-emerald-600 text-white border-emerald-500'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        {getPresetLabel(p)}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Region / Neighborhood Dropdown */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>المنطقة أو الحي</span>
                </label>
                <div className="relative">
                  <select
                    value={filters.region}
                    onChange={(e) => onUpdateFilter('region', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white text-xs font-bold rounded-xl p-2.5 focus:outline-none focus:border-emerald-500 appearance-none pr-3 pl-7"
                  >
                    <option value="الكل">كافة المناطق والأحياء</option>
                    {regions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <span className="text-[10px] text-slate-400 block">
                  المحافظة الحالية: <strong className="text-emerald-400">{filters.governorate}</strong>
                </span>
              </div>

              {/* 3. Bedrooms Filter */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Bed className="w-4 h-4 text-emerald-400" />
                  <span>عدد غرف النوم</span>
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { val: 'all', label: 'الكل' },
                    { val: 1, label: '1' },
                    { val: 2, label: '2' },
                    { val: 3, label: '3' },
                    { val: 4, label: '4+' },
                  ].map((b) => (
                    <button
                      key={b.label}
                      type="button"
                      onClick={() => onUpdateFilter('bedrooms', b.val as any)}
                      className={`py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        filters.bedrooms === b.val
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Area Range Filter (م²) */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Maximize2 className="w-4 h-4 text-emerald-400" />
                  <span>المساحة (م²)</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="الأدنى م²"
                    value={filters.minArea || ''}
                    onChange={(e) =>
                      onUpdateFilter('minArea', e.target.value ? Number(e.target.value) : undefined)
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                  <input
                    type="number"
                    placeholder="الأعلى م²"
                    value={filters.maxArea || ''}
                    onChange={(e) =>
                      onUpdateFilter('maxArea', e.target.value ? Number(e.target.value) : undefined)
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

            </div>

            {/* Special Syrian Market Features Checkboxes Bar */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 block">الميزات السورية الخاصة:</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {[
                  { key: 'hasSolar', label: 'طاقة شمسية ☀️' },
                  { key: 'hasTaboGreen', label: 'طابو أخضر 📜' },
                  { key: 'isOffPlan', label: 'على المخطط 🏗️' },
                  { key: 'hasElevator', label: 'مصعد 🛗' },
                  { key: 'hasGarage', label: 'موقف خاص 🚗' },
                  { key: 'hasGenerator', label: 'مولدة/أمبير ⚡' },
                ].map((feat) => {
                  const isChecked = !!filters[feat.key as keyof FilterOptions];
                  return (
                    <button
                      key={feat.key}
                      type="button"
                      onClick={() => onUpdateFilter(feat.key as any, !isChecked)}
                      className={`p-2 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                        isChecked
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40 shadow-sm'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {feat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Expand Tray Footer Actions */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={onResetFilters}
                className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة ضبط ومسح الفلاتر</span>
              </button>

              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
              >
                تطبيق وإغلاق (إظهار {resultCount} عقار)
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
