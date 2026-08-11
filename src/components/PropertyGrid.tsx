import React from 'react';
import { Property } from '../types/property';
import { PropertyCard } from './PropertyCard';
import { SearchX, SlidersHorizontal } from 'lucide-react';

interface PropertyGridProps {
  properties: Property[];
  loading: boolean;
  onOpenDetail: (property: Property) => void;
  onResetFilters: () => void;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  loading,
  onOpenDetail,
  onResetFilters,
}) => {
  if (loading) {
    return (
      <div id="properties" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-white rounded-3xl overflow-hidden border border-slate-200 p-4 space-y-4 animate-pulse">
              <div className="aspect-[16/10] bg-slate-200 rounded-2xl" />
              <div className="h-6 bg-slate-200 rounded-lg w-3/4" />
              <div className="h-4 bg-slate-100 rounded-lg w-1/2" />
              <div className="h-10 bg-slate-100 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div id="properties" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-md mx-auto bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <SearchX className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-alexandria">
            لم نجد عقارات مطابقة للفلاتر الحالية
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            جرب توسيع نطاق البحث أو تصفية بمناطق سكنية أخرى في دمشق وريفها.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-md"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>إعادة ضبط كافة الفلاتر</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <section id="properties" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header section with result count */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-alexandria flex items-center gap-2">
            <span>العقارات المتاحة</span>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-cairo font-bold">
              {properties.length} عقار
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            جميع البيانات محدثة وموثقة مع إمكانية المعاينة والتواصل المباشر
          </p>
        </div>
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onOpenDetail={onOpenDetail}
          />
        ))}
      </div>

    </section>
  );
};
