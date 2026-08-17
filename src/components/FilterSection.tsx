'use client';

import React, { useState } from 'react';
import {
  SlidersHorizontal,
  RotateCcw,
  Check,
  Sun,
  ShieldCheck,
  ArrowUpDown,
  Car,
  Zap,
  Tag,
  Sparkles,
} from 'lucide-react';
import { FilterOptions, Governorate, PropertyType, FinishingStatus, AvailabilityStatus } from '../types/property';
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
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const { currency, formatPrice } = useCurrency();
  const regions = propertyService.getRegions(filters.governorate);

  // Quick Preset Tags
  const quickPresets = [
    {
      id: 'solar',
      label: '☀️ طاقة شمسية',
      active: !!filters.hasSolar,
      apply: () => onUpdateFilter('hasSolar', !filters.hasSolar),
    },
    {
      id: 'tabo',
      label: '📜 طابو سبز (2400 سهم)',
      active: !!filters.hasTaboGreen,
      apply: () => onUpdateFilter('hasTaboGreen', !filters.hasTaboGreen),
    },
    {
      id: 'yaafour',
      label: '🏡 فيلات يعفور والصبورة',
      active: filters.governorate === 'ريف دمشق' && filters.region === 'يعفور',
      apply: () => {
        if (filters.governorate === 'ريف دمشق' && filters.region === 'يعفور') {
          onUpdateFilter('governorate', 'الكل');
          onUpdateFilter('region', 'الكل');
        } else {
          onUpdateFilter('governorate', 'ريف دمشق');
          onUpdateFilter('region', 'يعفور');
        }
      },
    },
    {
      id: 'budget_100k',
      label: `🏷️ أقل من ${formatPrice(100000)}`,
      active: filters.maxPriceUsd === 100000,
      apply: () => onUpdateFilter('maxPriceUsd', filters.maxPriceUsd === 100000 ? undefined : 100000),
    },
    {
      id: 'damascus_rent',
      label: '🏢 شقق للإيجار في دمشق',
      active: filters.contractType === 'rent' && filters.governorate === 'دمشق',
      apply: () => {
        if (filters.contractType === 'rent' && filters.governorate === 'دمشق') {
          onUpdateFilter('contractType', 'all');
          onUpdateFilter('governorate', 'الكل');
        } else {
          onUpdateFilter('contractType', 'rent');
          onUpdateFilter('governorate', 'دمشق');
        }
      },
    },
    {
      id: 'luxury',
      label: '💎 إكساء سوبر ديلوكس',
      active: filters.finishingStatus === 'luxury',
      apply: () =>
        onUpdateFilter('finishingStatus', filters.finishingStatus === 'luxury' ? 'all' : 'luxury'),
    },
  ];

  return (
    <div className="bg-white border-y border-slate-200 shadow-sm sticky top-[62px] z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 space-y-3">
        {/* Main Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Quick Filters Row */}
          <div className="flex flex-wrap items-center gap-2.5 flex-1">
            {/* Contract Type Tabs */}
            <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => onUpdateFilter('contractType', 'all')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filters.contractType === 'all'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                الكل
              </button>
              <button
                type="button"
                onClick={() => onUpdateFilter('contractType', 'sale')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filters.contractType === 'sale'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                للبيع
              </button>
              <button
                type="button"
                onClick={() => onUpdateFilter('contractType', 'rent')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  filters.contractType === 'rent'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                للإيجار
              </button>
            </div>

            {/* Governorate */}
            <div className="w-full sm:w-auto">
              <select
                value={filters.governorate}
                onChange={(e) => onUpdateFilter('governorate', e.target.value as Governorate)}
                className="w-full sm:w-40 bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
              >
                <option value="الكل">كل المحافظات</option>
                <option value="دمشق">محافظة دمشق</option>
                <option value="ريف دمشق">محافظة ريف دمشق</option>
                <option value="حلب">محافظة حلب</option>
                <option value="حمص">محافظة حمص</option>
                <option value="حماة">محافظة حماة</option>
                <option value="اللاذقية">محافظة اللاذقية</option>
                <option value="طرطوس">محافظة طرطوس</option>
              </select>
            </div>

            {/* Region / City */}
            <div className="w-full sm:w-auto">
              <select
                value={filters.region}
                onChange={(e) => onUpdateFilter('region', e.target.value)}
                className="w-full sm:w-40 bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
              >
                <option value="الكل">جميع المناطق</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div className="w-full sm:w-auto">
              <select
                value={filters.propertyType}
                onChange={(e) => onUpdateFilter('propertyType', e.target.value as PropertyType)}
                className="w-full sm:w-40 bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
              >
                <option value="all">كل أنواع العقارات</option>
                <option value="apartment">شقة سكنية</option>
                <option value="villa">فيلا / مزرعة</option>
                <option value="commercial">محل / مكتب / تجاري</option>
                <option value="chalet">شاليه / استراحة</option>
                <option value="land">أرض / قطعة أرض</option>
              </select>
            </div>

            {/* Toggle Advanced */}
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors border ${
                showAdvanced
                  ? 'bg-slate-800 text-white border-slate-800'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>فلاتر متقدمة</span>
            </button>
          </div>

          {/* Results Count & Sort */}
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              {resultCount} عقار
            </span>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={filters.sortBy}
                onChange={(e) => onUpdateFilter('sortBy', e.target.value as any)}
                className="bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold rounded-xl px-2.5 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
              >
                <option value="newest">الأحدث أولاً</option>
                <option value="price_asc">السعر: الأقل أولاً</option>
                <option value="price_desc">السعر: الأعلى أولاً</option>
                <option value="area_desc">المساحة الأكبر</option>
                <option value="most_viewed">الأكثر مشاهدة</option>
              </select>
            </div>

            {/* Reset */}
            <button
              type="button"
              onClick={onResetFilters}
              className="p-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="إعادة ضبط الفلاتر"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Tags Filter Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-[11px] font-bold text-slate-400 shrink-0 flex items-center gap-1">
            <Tag className="w-3 h-3 text-emerald-600" />
            <span>وسوم سريعة:</span>
          </span>

          {quickPresets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={preset.apply}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all border shrink-0 ${
                preset.active
                  ? 'bg-slate-900 text-amber-300 border-slate-900 shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Expandable Advanced Filter Options */}
        {showAdvanced && (
          <div className="pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 animate-in fade-in duration-200">
            {/* Bedrooms */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">عدد الغرف</label>
              <select
                value={filters.bedrooms}
                onChange={(e) =>
                  onUpdateFilter('bedrooms', e.target.value === 'all' ? 'all' : Number(e.target.value))
                }
                className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs font-medium rounded-xl p-2.5 focus:outline-none"
              >
                <option value="all">أي عدد غرف</option>
                <option value="1">غرفة واحدة</option>
                <option value="2">غرفتان (2)</option>
                <option value="3">3 غرف نوم</option>
                <option value="4">4 غرف أو أكثر</option>
              </select>
            </div>

            {/* Price Limit in USD */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                الحد الأقصى للسعر ({currency})
              </label>
              <select
                value={filters.maxPriceUsd || ''}
                onChange={(e) =>
                  onUpdateFilter('maxPriceUsd', e.target.value ? Number(e.target.value) : undefined)
                }
                className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs font-medium rounded-xl p-2.5 focus:outline-none"
              >
                <option value="">بدون حد أقصى</option>
                <option value="75000">أقل من {formatPrice(75000)}</option>
                <option value="150000">أقل من {formatPrice(150000)}</option>
                <option value="300000">أقل من {formatPrice(300000)}</option>
                <option value="600000">أقل من {formatPrice(600000)}</option>
                <option value="1000000">أقل من {formatPrice(1000000)}</option>
              </select>
            </div>

            {/* Finishing Status */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">حالة الإكساء</label>
              <select
                value={filters.finishingStatus || 'all'}
                onChange={(e) =>
                  onUpdateFilter('finishingStatus', e.target.value as FinishingStatus | 'all')
                }
                className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs font-medium rounded-xl p-2.5 focus:outline-none"
              >
                <option value="all">جميع حالات الإكساء</option>
                <option value="luxury">سوبر ديلوكس / فاخر</option>
                <option value="finished">جاهز للسكن</option>
                <option value="semi_finished">نصف إكساء</option>
                <option value="shell">على العظم</option>
              </select>
            </div>

            {/* Availability Status */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">حالة العرض</label>
              <select
                value={filters.availabilityStatus || 'all'}
                onChange={(e) =>
                  onUpdateFilter('availabilityStatus', e.target.value as AvailabilityStatus | 'all')
                }
                className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs font-medium rounded-xl p-2.5 focus:outline-none"
              >
                <option value="all">الكل (متاح ومباع ومؤجر)</option>
                <option value="available">المتاح حالياً فقط</option>
                <option value="reserved">محجوز</option>
                <option value="sold">تم البيع (أرشيف)</option>
                <option value="rented">تم التأجير</option>
              </select>
            </div>

            {/* Extra Amenities Row */}
            <div className="sm:col-span-2 lg:col-span-4 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onUpdateFilter('hasSolar', !filters.hasSolar)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                  filters.hasSolar
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>طاقة شمسية</span>
                {filters.hasSolar && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>

              <button
                type="button"
                onClick={() => onUpdateFilter('hasTaboGreen', !filters.hasTaboGreen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                  filters.hasTaboGreen
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>طابو سبز 2400</span>
                {filters.hasTaboGreen && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>

              <button
                type="button"
                onClick={() => onUpdateFilter('hasElevator', !filters.hasElevator)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                  filters.hasElevator
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <span>مصعد شغال</span>
                {filters.hasElevator && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>

              <button
                type="button"
                onClick={() => onUpdateFilter('hasGarage', !filters.hasGarage)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                  filters.hasGarage
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                <span>كراج / موقف سيارات</span>
                {filters.hasGarage && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>

              <button
                type="button"
                onClick={() => onUpdateFilter('hasGenerator', !filters.hasGenerator)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                  filters.hasGenerator
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>مولدة بناء</span>
                {filters.hasGenerator && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
