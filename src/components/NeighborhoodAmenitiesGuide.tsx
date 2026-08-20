'use client';

import React from 'react';
import {
  MapPin,
  Sun,
  Droplets,
  Bus,
  Building,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import neighborhoodsData from '@/data/neighborhoods.json';

interface Props {
  governorate: string;
  region: string;
}

export const NeighborhoodAmenitiesGuide: React.FC<Props> = ({ governorate, region }) => {
  // Find matching neighborhood data or fallback to general governorate data
  const dataKey = `${governorate} - ${region}`;
  const rawData = (neighborhoodsData as Record<string, any>)[dataKey];

  // If no exact match, try matching by region name substring
  const fallbackKey = Object.keys(neighborhoodsData).find(
    (k) => k.includes(region) || k.includes(governorate)
  );
  const info = rawData || (fallbackKey ? (neighborhoodsData as Record<string, any>)[fallbackKey] : null);

  if (!info) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 space-y-3 text-right">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span>محيط وخريطة المنطقة: {region} - {governorate}</span>
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          تقع هذه المنطقة ضمن النطاق العمراني والسكني لمحافظة {governorate}، وتتميز بسهولة الوصول وقربها من الخدمات الأساسية والمرافق التجارية.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/70 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5 text-right ring-1 ring-white/10">
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <MapPin className="w-4 h-4" />
            </span>
            <h3 className="text-base sm:text-lg font-black text-white font-alexandria">
              دليل ومرافق حي {info.name} ({info.governorate})
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            {info.type}
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800/90 text-emerald-300 border border-emerald-500/30 w-fit">
          ✨ {info.vibe}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
        {info.description}
      </p>

      {/* 4 Practical Fact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
        
        {/* 1. Energy & Solar Card */}
        <div className="p-4 rounded-2xl bg-slate-850/80 border border-slate-800 space-y-1.5 hover:border-amber-500/30 transition-colors">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
            <Sun className="w-4 h-4 shrink-0" />
            <span>الطاقة والكهرباء بالمنطقة</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            {info.energyStatus}
          </p>
        </div>

        {/* 2. Water & Tanks Card */}
        <div className="p-4 rounded-2xl bg-slate-850/80 border border-slate-800 space-y-1.5 hover:border-sky-500/30 transition-colors">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
            <Droplets className="w-4 h-4 shrink-0" />
            <span>المياه والتغذية والضخ</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            {info.waterStatus}
          </p>
        </div>

        {/* 3. Transport & Main Roads Card */}
        <div className="p-4 rounded-2xl bg-slate-850/80 border border-slate-800 space-y-1.5 hover:border-teal-500/30 transition-colors">
          <div className="flex items-center gap-2 text-teal-400 font-bold text-xs">
            <Bus className="w-4 h-4 shrink-0" />
            <span>المواصلات وسهولة الوصول</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            {info.transport}
          </p>
        </div>

        {/* 4. Nearby Landmarks & Amenities */}
        <div className="p-4 rounded-2xl bg-slate-850/80 border border-slate-800 space-y-2 hover:border-emerald-500/30 transition-colors">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
            <Building className="w-4 h-4 shrink-0" />
            <span>أبرز المرافق والخدمات المجاورة</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {info.landmarks?.map((landmark: string, idx: number) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-lg bg-slate-900 text-[10px] text-slate-300 border border-slate-750 font-medium"
              >
                • {landmark}
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
