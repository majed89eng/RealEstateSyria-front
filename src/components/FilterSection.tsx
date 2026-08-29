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
} from 'lucide-react';
import {
  FilterOptions,
  Governorate,
  PropertyType,
  FinishingStatus,
  AvailabilityStatus,
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
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const { currency, formatPrice } = useCurrency();
  const regions = propertyService.getRegions(filters.governorate);

  // Modern Vector SVG Category Tabs (Airbnb / Luxury Real Estate Standard)
  const categoryTabs = [
    {
      id: 'all',
      label: 'كافة العقارات',
      icon: Sparkles,
      iconColor: 'text-amber-400',
      activeBg: 'bg-emerald-600 text-white shadow-emerald-600/30',
      isActive:
        filters.propertyType === 'all' &&
        !filters.hasSolar &&
        !filters.hasTaboGreen &&
        !filters.isOffPlan &&
        filters.maxPriceUsd !== 100000 &&
        filters.finishingStatus !== 'luxury',
      onClick: () => {
        onUpdateFilter('propertyType', 'all');
        onUpdateFilter('hasSolar', false);
        onUpdateFilter('hasTaboGreen', false);
        onUpdateFilter('isOffPlan', false);
        onUpdateFilter('maxPriceUsd', undefined);
        onUpdateFilter('finishingStatus', 'all');
      },
    },
    {
      id: 'off_plan',
      label: 'على المخطط (قيد الإنشاء)',
      icon: HardHat,
      iconColor: 'text-amber-400',
      activeBg: 'bg-amber-600 text-white shadow-amber-600/30',
      isActive: !!filters.isOffPlan,
      onClick: () => onUpdateFilter('isOffPlan', !filters.isOffPlan),
    },
    {
      id: 'apartment',
      label: 'شقق سكنية',
      icon: Building2,
      iconColor: 'text-sky-400',
      activeBg: 'bg-emerald-600 text-white shadow-emerald-600/30',
      isActive: filters.propertyType === 'apartment',
      onClick: () => onUpdateFilter('propertyType', filters.propertyType === 'apartment' ? 'all' : 'apartment'),
    },
    {
      id: 'villa',
      label: 'فيلات وقصور',
      icon: Home,
      iconColor: 'text-emerald-400',
      activeBg: 'bg-emerald-600 text-white shadow-emerald-600/30',
      isActive: filters.propertyType === 'villa',
      onClick: () => onUpdateFilter('propertyType', filters.propertyType === 'villa' ? 'all' : 'villa'),
    },
    {
      id: 'chalet',
      label: 'مزارع واستراحات',
      icon: Palmtree,
      iconColor: 'text-teal-400',
      activeBg: 'bg-emerald-600 text-white shadow-emerald-600/30',
      isActive: filters.propertyType === 'chalet',
      onClick: () => onUpdateFilter('propertyType', filters.propertyType === 'chalet' ? 'all' : 'chalet'),
    },
    {
      id: 'commercial',
      label: 'مكاتب وتجاري',
      icon: Briefcase,
      iconColor: 'text-indigo-400',
      activeBg: 'bg-emerald-600 text-white shadow-emerald-600/30',
      isActive: filters.propertyType === 'commercial',
      onClick: () => onUpdateFilter('propertyType', filters.propertyType === 'commercial' ? 'all' : 'commercial'),
    },
    {
      id: 'solar',
      label: 'طاقة شمسية',
      icon: Sun,
      iconColor: 'text-amber-400',
      activeBg: 'bg-amber-500 text-slate-950 shadow-amber-500/30',
      isActive: !!filters.hasSolar,
      onClick: () => onUpdateFilter('hasSolar', !filters.hasSolar),
    },
    {
      id: 'tabo',
      label: 'طابو سبز 2400',
      icon: ScrollText,
      iconColor: 'text-emerald-400',
      activeBg: 'bg-emerald-700 text-white shadow-emerald-700/30',
      isActive: !!filters.hasTaboGreen,
      onClick: () => onUpdateFilter('hasTaboGreen', !filters.hasTaboGreen),
    },
    {
      id: 'budget_100k',
      label: 'أقل من 100k$',
      icon: Tag,
      iconColor: 'text-rose-400',
      activeBg: 'bg-rose-600 text-white shadow-rose-600/30',
      isActive: filters.maxPriceUsd === 100000,
      onClick: () => onUpdateFilter('maxPriceUsd', filters.maxPriceUsd === 100000 ? undefined : 100000),
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
    filters.maxPriceUsd !== undefined,
    filters.finishingStatus !== 'all',
    filters.availabilityStatus !== 'all',
    filters.isOffPlan,
    filters.hasSolar,
    filters.hasTaboGreen,
    filters.hasElevator,
    filters.hasGarage,
    filters.hasGenerator,
  ].filter(Boolean).length;

  return (
    <div className="bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/80 sticky top-[56px] z-30 shadow-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 space-y-2.5">
        {/* Top: Vector SVG Category Pill Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categoryTabs.map((tab) => {
            const IconComponent = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={tab.onClick}
                className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 border ${
                  tab.isActive
                    ? `${tab.activeBg} shadow-md`
                    : 'bg-slate-950/80 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-lg flex items-center justify-center transition-colors ${
                    tab.isActive
                      ? 'bg-white/20 text-white'
                      : `bg-slate-900 border border-slate-700 shadow-2xs ${tab.iconColor}`
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5 stroke-[2.2]" />
                </span>
                <span className="leading-none">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom: Streamlined Single-Row Controls Bar */}
        <div className="flex items-center justify-between gap-3 pt-1.5 border-t border-slate-800/80">
          {/* Left Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Contract Type Segmented Capsule */}
            <div className="flex p-0.5 bg-slate-950 rounded-xl border border-slate-800 text-xs font-bold">
              <button
                type="button"
                onClick={() => onUpdateFilter('contractType', 'all')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  filters.contractType === 'all'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                الكل
              </button>
              <button
                type="button"
                onClick={() => onUpdateFilter('contractType', 'sale')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  filters.contractType === 'sale'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                للبيع
              </button>
              <button
                type="button"
                onClick={() => onUpdateFilter('contractType', 'rent')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  filters.contractType === 'rent'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                للإيجار
              </button>
            </div>

            {/* Modern Governorate Dropdown */}
            <div className="relative">
              <select
                value={filters.governorate}
                onChange={(e) => onUpdateFilter('governorate', e.target.value as Governorate)}
                className="bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-200 text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer appearance-none pl-6 pr-3 transition-colors"
              >
                <option value="الكل">كل المحافظات</option>
                {SYRIAN_LOCATIONS.map((loc) => (
                  <option key={loc.provinceId} value={loc.provinceNameAr}>
                    {loc.provinceNameAr}
                  </option>
                ))}
              </select>
            </div>

            {/* Luxury All-Filters Modal Button */}
            <button
              type="button"
              onClick={() => setIsFilterModalOpen(true)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                activeFiltersCount > 0
                  ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40 shadow-sm'
                  : 'bg-slate-950 hover:bg-slate-850 text-slate-300 border-slate-800'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400 stroke-[2.2]" />
              <span>فلاتر تفصيلية</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Clear All Reset Button */}
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={onResetFilters}
                className="flex items-center gap-1 px-2.5 py-1 text-xs text-rose-400 hover:text-rose-300 font-bold hover:bg-rose-950/40 rounded-xl transition-colors"
                title="إعادة ضبط الفلاتر"
              >
                <RotateCcw className="w-3 h-3 stroke-[2.2]" />
                <span className="hidden sm:inline">مسح الفلاتر</span>
              </button>
            )}
          </div>

          {/* Right Controls: Result Count & Sort */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 hidden sm:inline">
              <strong className="text-emerald-400 font-extrabold">{resultCount}</strong> عقار
            </span>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1">
              <select
                value={filters.sortBy}
                onChange={(e) => onUpdateFilter('sortBy', e.target.value as any)}
                className="bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 text-xs font-bold rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer transition-colors"
              >
                <option value="newest">الأحدث</option>
                <option value="price_asc">السعر: الأقل</option>
                <option value="price_desc">السعر: الأعلى</option>
                <option value="area_desc">المساحة الأكبر</option>
                <option value="most_viewed">الأكثر مشاهدة</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ================= LUXURY ADVANCED FILTER MODAL ================= */}
      {isFilterModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="filter-modal-title"
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-2xl bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden my-8 max-h-[85vh] flex flex-col justify-between">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h3 id="filter-modal-title" className="text-base font-extrabold font-alexandria text-white">
                    تخصيص خيارات البحث والفلاتر
                  </h3>
                  <span className="text-xs text-slate-400">حدد المواصفات الدقيقة للعقار المطلوب</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Form Body */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
              {/* 1. Location Filters (Governorate & Region) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>الموقع الجغرافي والحي</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <select
                      value={filters.governorate}
                      onChange={(e) => onUpdateFilter('governorate', e.target.value as Governorate)}
                      className="w-full bg-slate-950 border border-slate-800 text-white text-xs font-bold rounded-2xl p-3 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="الكل">كافة المحافظات (14 محافظة)</option>
                      {SYRIAN_LOCATIONS.map((loc) => (
                        <option key={loc.provinceId} value={loc.provinceNameAr}>
                          محافظة {loc.provinceNameAr}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <select
                      value={filters.region}
                      onChange={(e) => onUpdateFilter('region', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-white text-xs font-bold rounded-2xl p-3 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="الكل">كافة المناطق والأحياء</option>
                      {regions.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 2. Bedrooms Selection Chips */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Bed className="w-3.5 h-3.5 text-emerald-400" />
                  <span>عدد غرف النوم</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { val: 'all', label: 'أي عدد' },
                    { val: 1, label: 'غرفة 1' },
                    { val: 2, label: 'غرفتان (2)' },
                    { val: 3, label: '3 غرف' },
                    { val: 4, label: '4 غرف+' },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => onUpdateFilter('bedrooms', item.val as any)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        filters.bedrooms === item.val
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-850'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Finishing Quality */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Gem className="w-3.5 h-3.5 text-emerald-400" />
                  <span>مستوى الإكساء والتشطيب</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { val: 'all', label: 'الكل' },
                    { val: 'luxury', label: 'سوبر ديلوكس' },
                    { val: 'finished', label: 'جاهز للسكن' },
                    { val: 'semi_finished', label: 'نصف إكساء' },
                  ].map((f) => (
                    <button
                      key={f.val}
                      type="button"
                      onClick={() => onUpdateFilter('finishingStatus', f.val as any)}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                        filters.finishingStatus === f.val
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-850'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Special Syrian Market Features Checkboxes */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>الميزات السورية الخاصة المطلوبة</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { key: 'hasSolar', label: 'طاقة شمسية مركبة ☀️', icon: Sun },
                    { key: 'hasTaboGreen', label: 'طابو أخضر 2400 سهم 📜', icon: ScrollText },
                    { key: 'isOffPlan', label: 'شراء على المخطط (أقساط) 🏗️', icon: HardHat },
                    { key: 'hasElevator', label: 'مصعد شغال 🛗', icon: Building2 },
                    { key: 'hasGarage', label: 'موقف سيارات خاص 🚗', icon: Car },
                    { key: 'hasGenerator', label: 'مولدة أو خط أمبير ⚡', icon: Zap },
                  ].map((feat) => {
                    const isChecked = !!filters[feat.key as keyof FilterOptions];
                    return (
                      <button
                        key={feat.key}
                        type="button"
                        onClick={() => onUpdateFilter(feat.key as any, !isChecked)}
                        className={`flex items-center justify-between p-3 rounded-2xl border text-xs font-bold transition-all ${
                          isChecked
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 shadow-sm'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-850'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <feat.icon className="w-4 h-4 text-emerald-400" />
                          <span>{feat.label}</span>
                        </span>
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                            isChecked ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-700'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onResetFilters}
                className="px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة ضبط</span>
              </button>

              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
              >
                عرض النتائج ({resultCount})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
