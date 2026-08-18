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
      iconColor: 'text-amber-500',
      activeBg: 'bg-emerald-600 text-white shadow-emerald-600/25',
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
      iconColor: 'text-amber-600',
      activeBg: 'bg-amber-600 text-white shadow-amber-600/25',
      isActive: !!filters.isOffPlan,
      onClick: () => onUpdateFilter('isOffPlan', !filters.isOffPlan),
    },
    {
      id: 'apartment',
      label: 'شقق سكنية',
      icon: Building2,
      iconColor: 'text-sky-500',
      activeBg: 'bg-emerald-600 text-white shadow-emerald-600/25',
      isActive: filters.propertyType === 'apartment',
      onClick: () => onUpdateFilter('propertyType', filters.propertyType === 'apartment' ? 'all' : 'apartment'),
    },
    {
      id: 'villa',
      label: 'فيلات وقصور',
      icon: Home,
      iconColor: 'text-emerald-500',
      activeBg: 'bg-emerald-600 text-white shadow-emerald-600/25',
      isActive: filters.propertyType === 'villa',
      onClick: () => onUpdateFilter('propertyType', filters.propertyType === 'villa' ? 'all' : 'villa'),
    },
    {
      id: 'chalet',
      label: 'مزارع واستراحات',
      icon: Palmtree,
      iconColor: 'text-teal-500',
      activeBg: 'bg-emerald-600 text-white shadow-emerald-600/25',
      isActive: filters.propertyType === 'chalet',
      onClick: () => onUpdateFilter('propertyType', filters.propertyType === 'chalet' ? 'all' : 'chalet'),
    },
    {
      id: 'commercial',
      label: 'مكاتب وتجاري',
      icon: Briefcase,
      iconColor: 'text-indigo-500',
      activeBg: 'bg-emerald-600 text-white shadow-emerald-600/25',
      isActive: filters.propertyType === 'commercial',
      onClick: () => onUpdateFilter('propertyType', filters.propertyType === 'commercial' ? 'all' : 'commercial'),
    },
    {
      id: 'solar',
      label: 'طاقة شمسية',
      icon: Sun,
      iconColor: 'text-amber-500',
      activeBg: 'bg-amber-500 text-slate-950 shadow-amber-500/25',
      isActive: !!filters.hasSolar,
      onClick: () => onUpdateFilter('hasSolar', !filters.hasSolar),
    },
    {
      id: 'tabo',
      label: 'طابو سبز 2400',
      icon: ScrollText,
      iconColor: 'text-emerald-600',
      activeBg: 'bg-emerald-700 text-white shadow-emerald-700/25',
      isActive: !!filters.hasTaboGreen,
      onClick: () => onUpdateFilter('hasTaboGreen', !filters.hasTaboGreen),
    },
    {
      id: 'budget_100k',
      label: 'أقل من 100k$',
      icon: Tag,
      iconColor: 'text-rose-500',
      activeBg: 'bg-rose-600 text-white shadow-rose-600/25',
      isActive: filters.maxPriceUsd === 100000,
      onClick: () => onUpdateFilter('maxPriceUsd', filters.maxPriceUsd === 100000 ? undefined : 100000),
    },
    {
      id: 'luxury',
      label: 'سوبر ديلوكس',
      icon: Gem,
      iconColor: 'text-purple-500',
      activeBg: 'bg-purple-600 text-white shadow-purple-600/25',
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
    <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-[56px] z-30 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 space-y-2.5">
        {/* Top: Vector SVG Category Pill Carousel (Clean Airbnb Standard) */}
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
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-lg flex items-center justify-center transition-colors ${
                    tab.isActive
                      ? 'bg-white/20 text-white'
                      : `bg-white border border-slate-200/60 shadow-2xs ${tab.iconColor}`
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
        <div className="flex items-center justify-between gap-3 pt-1 border-t border-slate-100">
          {/* Left Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Contract Type Segmented Capsule */}
            <div className="flex p-0.5 bg-slate-100 rounded-xl border border-slate-200/80 text-xs font-bold">
              <button
                type="button"
                onClick={() => onUpdateFilter('contractType', 'all')}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  filters.contractType === 'all'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
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
                    : 'text-slate-500 hover:text-slate-900'
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
                    : 'text-slate-500 hover:text-slate-900'
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
                className="bg-slate-100 hover:bg-slate-200/70 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer appearance-none pl-6 pr-3 transition-colors"
              >
                <option value="الكل">كل المحافظات</option>
                <option value="دمشق">دمشق</option>
                <option value="ريف دمشق">ريف دمشق</option>
                <option value="حلب">حلب</option>
                <option value="حمص">حمص</option>
                <option value="حماة">حماة</option>
              </select>
            </div>

            {/* Luxury All-Filters Modal Button */}
            <button
              type="button"
              onClick={() => setIsFilterModalOpen(true)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                activeFiltersCount > 0
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-sm'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600 stroke-[2.2]" />
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
                className="flex items-center gap-1 px-2.5 py-1 text-xs text-rose-600 hover:text-rose-700 font-bold hover:bg-rose-50 rounded-xl transition-colors"
                title="إعادة ضبط الفلاتر"
              >
                <RotateCcw className="w-3 h-3 stroke-[2.2]" />
                <span className="hidden sm:inline">مسح الفلاتر</span>
              </button>
            )}
          </div>

          {/* Right Controls: Result Count & Sort */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 hidden sm:inline">
              <strong className="text-slate-900 font-extrabold">{resultCount}</strong> عقار
            </span>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1">
              <select
                value={filters.sortBy}
                onChange={(e) => onUpdateFilter('sortBy', e.target.value as any)}
                className="bg-slate-100 hover:bg-slate-200/70 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-2.5 py-1.5 focus:outline-none cursor-pointer transition-colors"
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
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-8 max-h-[85vh] flex flex-col justify-between">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <div>
                  <h3 id="filter-modal-title" className="text-base font-extrabold font-alexandria text-slate-900">
                    تخصيص خيارات البحث والفلاتر
                  </h3>
                  <span className="text-xs text-slate-400">حدد المواصفات الدقيقة للعقار المطلوب</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Form Body */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
              {/* 1. Location Filters (Governorate & Region) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>الموقع الجغرافي والحي</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <select
                      value={filters.governorate}
                      onChange={(e) => onUpdateFilter('governorate', e.target.value as Governorate)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="الكل">كافة المحافظات</option>
                      <option value="دمشق">محافظة دمشق</option>
                      <option value="ريف دمشق">محافظة ريف دمشق</option>
                      <option value="حلب">محافظة حلب</option>
                      <option value="حمص">محافظة حمص</option>
                      <option value="حماة">محافظة حماة</option>
                    </select>
                  </div>

                  <div>
                    <select
                      value={filters.region}
                      onChange={(e) => onUpdateFilter('region', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                <label className="block text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Bed className="w-3.5 h-3.5 text-emerald-600" />
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
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Max Price Limit */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  <span>الحد الأقصى للميزانية ({currency})</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { val: undefined, label: 'بدون حد أقصى' },
                    { val: 50000, label: `< ${formatPrice(50000)}` },
                    { val: 100000, label: `< ${formatPrice(100000)}` },
                    { val: 200000, label: `< ${formatPrice(200000)}` },
                    { val: 500000, label: `< ${formatPrice(500000)}` },
                    { val: 1000000, label: `< ${formatPrice(1000000)}` },
                  ].map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => onUpdateFilter('maxPriceUsd', p.val)}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                        filters.maxPriceUsd === p.val
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Amenities & Solar & Legal Status */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>المواصفات الخاصة وسند الملكية والمشاريع</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => onUpdateFilter('isOffPlan', !filters.isOffPlan)}
                    className={`flex items-center justify-between p-3 rounded-2xl text-xs font-bold border transition-all ${
                      filters.isOffPlan
                        ? 'bg-amber-500/15 border-amber-500/50 text-amber-950'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <HardHat className="w-4 h-4 text-amber-600" />
                      <span>على المخطط (قيد الإنشاء)</span>
                    </div>
                    {filters.isOffPlan && <Check className="w-4 h-4 text-amber-600" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => onUpdateFilter('hasSolar', !filters.hasSolar)}
                    className={`flex items-center justify-between p-3 rounded-2xl text-xs font-bold border transition-all ${
                      filters.hasSolar
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-900'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Sun className="w-4 h-4 text-amber-500" />
                      <span>طاقة شمسية</span>
                    </div>
                    {filters.hasSolar && <Check className="w-4 h-4 text-amber-600" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => onUpdateFilter('hasTaboGreen', !filters.hasTaboGreen)}
                    className={`flex items-center justify-between p-3 rounded-2xl text-xs font-bold border transition-all ${
                      filters.hasTaboGreen
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>طابو سبز 2400</span>
                    </div>
                    {filters.hasTaboGreen && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => onUpdateFilter('hasElevator', !filters.hasElevator)}
                    className={`flex items-center justify-between p-3 rounded-2xl text-xs font-bold border transition-all ${
                      filters.hasElevator
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>مصعد شغال</span>
                    {filters.hasElevator && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => onUpdateFilter('hasGarage', !filters.hasGarage)}
                    className={`flex items-center justify-between p-3 rounded-2xl text-xs font-bold border transition-all ${
                      filters.hasGarage
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-slate-600" />
                      <span>كراج خاص</span>
                    </div>
                    {filters.hasGarage && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => onUpdateFilter('hasGenerator', !filters.hasGenerator)}
                    className={`flex items-center justify-between p-3 rounded-2xl text-xs font-bold border transition-all ${
                      filters.hasGenerator
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span>مولدة بناء</span>
                    </div>
                    {filters.hasGenerator && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onResetFilters}
                className="px-4 py-2.5 rounded-2xl text-slate-600 hover:text-rose-600 font-bold text-xs transition-colors"
              >
                إعادة ضبط الكل
              </button>

              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 transition-transform hover:scale-105"
              >
                عرض النتائج ({resultCount} عقار)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
