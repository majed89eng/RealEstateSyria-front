import React from 'react';
import { Property } from '../types/property';
import { PropertyCard } from './PropertyCard';
import { SearchX, SlidersHorizontal, Sparkles } from 'lucide-react';

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
      <div id="properties" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="bg-slate-900/90 rounded-3xl overflow-hidden border border-slate-800 p-4 space-y-4 animate-pulse shadow-xl"
            >
              <div className="aspect-[16/10] bg-slate-800 rounded-2xl" />
              <div className="h-6 bg-slate-800 rounded-lg w-3/4" />
              <div className="h-4 bg-slate-800/60 rounded-lg w-1/2" />
              <div className="h-10 bg-slate-800/40 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div id="properties" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-md mx-auto bg-slate-900/90 rounded-3xl border border-slate-800 p-8 shadow-2xl space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <SearchX className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-white font-alexandria">
            لم نجد عقارات مطابقة للفلاتر الحالية
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            جرب توسيع نطاق البحث أو تصفية بمناطق سكنية أخرى في دمشق وريفها وسائر المحافظات.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-lg shadow-emerald-600/30"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>إعادة ضبط كافة الفلاتر</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <section id="properties" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header section with result count */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-alexandria flex items-center gap-2.5">
            <span>العقارات المتاحة</span>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-cairo font-bold">
              {properties.length} عقار
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            جميع البيانات محدثة وموثقة مع إمكانية المعاينة والتواصل المباشر عبر واتساب
          </p>
        </div>
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
