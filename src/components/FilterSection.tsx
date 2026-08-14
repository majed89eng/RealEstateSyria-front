'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, RotateCcw, Check, Sun, ShieldCheck, ArrowUpDown } from 'lucide-react';
import { FilterOptions, Governorate, PropertyType } from '../types/property';
import { propertyService } from '../services/propertyService';

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
  const regions = propertyService.getRegions(filters.governorate);

  return (
    <div className="bg-white border-y border-slate-200 shadow-sm sticky top-[65px] z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Main Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          {/* Quick Filters Row */}
          <div className="flex flex-wrap items-center gap-3 flex-1">
            
            {/* Governorate */}
            <div className="w-full sm:w-auto">
              <select
                value={filters.governorate}
                onChange={(e) => onUpdateFilter('governorate', e.target.value as Governorate)}
                className="w-full sm:w-48 bg-slate-50 border border-slate-300 text-slate-800 text-sm font-semibold rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
              >
                <option value="الكل">كل المحافظات المتاحة</option>
                <option value="دمشق">محافظة دمشق</option>
                <option value="ريف دمشق">محافظة ريف دمشق</option>
                <option value="حلب">محافظة حلب</option>
                <option value="حمص">محافظة حمص</option>
                <option value="حماة">محافظة حماة</option>
              </select>
            </div>

            {/* Region */}
            <div className="w-full sm:w-auto">
              <select
                value={filters.region}
                onChange={(e) => onUpdateFilter('region', e.target.value)}
                className="w-full sm:w-44 bg-slate-50 border border-slate-300 text-slate-800 text-sm font-semibold rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
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
                className="w-full sm:w-44 bg-slate-50 border border-slate-300 text-slate-800 text-sm font-semibold rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
              >
                <option value="all">جميع أنواع العقارات</option>
                <option value="apartment">شقة سكنية</option>
                <option value="villa">فيلا / مزرعة</option>
                <option value="commercial">محل / مخزن / تجاري</option>
                <option value="land">أرض / قطعة أرض</option>
                <option value="chalet">شاليه / استراحة</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div className="w-full sm:w-auto">
              <select
                value={filters.bedrooms}
                onChange={(e) => onUpdateFilter('bedrooms', e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="w-full sm:w-36 bg-slate-50 border border-slate-300 text-slate-800 text-sm font-semibold rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
              >
                <option value="all">عدد الغرف</option>
                <option value="1">غرفة واحدة (1)</option>
                <option value="2">غرفتان (2)</option>
                <option value="3">3 غرف نوم</option>
                <option value="4">4+ غرف نوم</option>
              </select>
            </div>

            {/* Feature Toggles Pill Buttons */}
            <button
              type="button"
              onClick={() => onUpdateFilter('hasSolar', !filters.hasSolar)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                filters.hasSolar
                  ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>طاقة شمسية</span>
            </button>

            <button
              type="button"
              onClick={() => onUpdateFilter('hasTaboGreen', !filters.hasTaboGreen)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                filters.hasTaboGreen
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>طابو سبز (2400 سهم)</span>
            </button>

            {/* Toggle Advanced Panel */}
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors border border-slate-300"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>خيارات إضافية</span>
            </button>

          </div>

          {/* Sort & Counter Controls */}
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
            
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              النتائج ({resultCount})
            </span>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-slate-500" />
              <select
                value={filters.sortBy}
                onChange={(e) => onUpdateFilter('sortBy', e.target.value as any)}
                className="bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold rounded-xl px-2.5 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
              >
                <option value="newest">الأحدث إضافة</option>
                <option value="price_asc">السعر: من الأقل للأعلى</option>
                <option value="price_desc">السعر: من الأعلى للأقل</option>
                <option value="area_desc">المساحة الأكبر</option>
              </select>
            </div>

            {/* Reset Filters */}
            <button
              type="button"
              onClick={onResetFilters}
              className="p-2 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="مسح الفلاتر"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

          </div>

        </div>

        {/* Expandable Advanced Filter Options */}
        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in duration-200">
            
            {/* Price Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الحد الأقصى للسعر (ل.س)</label>
              <select
                value={filters.maxPrice || ''}
                onChange={(e) => onUpdateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs font-medium rounded-xl p-2.5 focus:outline-none"
              >
                <option value="">بدون حد أقصى</option>
                <option value="2000000000">أقل من 2 مليار ل.س</option>
                <option value="4000000000">أقل من 4 مليار ل.س</option>
                <option value="8000000000">أقل من 8 مليار ل.س</option>
                <option value="15000000000">أقل من 15 مليار ل.س</option>
              </select>
            </div>

            {/* Elevator filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">المصعد والمواصفات</label>
              <button
                type="button"
                onClick={() => onUpdateFilter('hasElevator', !filters.hasElevator)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold transition-all ${
                  filters.hasElevator
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                    : 'bg-slate-50 border-slate-300 text-slate-700'
                }`}
              >
                <span>يحتوي المبنى على مصعد شغال</span>
                {filters.hasElevator && <Check className="w-4 h-4 text-emerald-600" />}
              </button>
            </div>

            {/* Search Term Reset Badge */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={onResetFilters}
                className="w-full flex items-center justify-center gap-2 p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors border border-slate-300"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة ضبط كافة خيارات البحث</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
