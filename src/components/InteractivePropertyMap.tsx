'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Building2,
  Home,
  Eye,
  ExternalLink,
  DollarSign,
  Maximize2,
  X,
  Layers,
  Sparkles,
  Compass,
  ChevronLeft,
} from 'lucide-react';
import { Property, Governorate } from '@/types/property';
import { useCurrency } from '@/context/CurrencyContext';

interface Props {
  properties: Property[];
  onOpenDetail: (property: Property) => void;
}

// Approximate Syrian Geographic Coordinates for map pin distribution
const REGION_COORDINATES: Record<string, { x: number; y: number; gov: Governorate }> = {
  // Damascus Metro (Centered around 45%-55% area)
  'أبو رمانة': { x: 44, y: 52, gov: 'دمشق' },
  'المالكي': { x: 42, y: 50, gov: 'دمشق' },
  'المزة': { x: 40, y: 55, gov: 'دمشق' },
  'فيلات المزة الشرقية': { x: 41, y: 54, gov: 'دمشق' },
  'كفرسوسة': { x: 45, y: 56, gov: 'دمشق' },
  'مشروع دمر': { x: 38, y: 48, gov: 'دمشق' },
  'ماروتا سيتي': { x: 43, y: 56, gov: 'دمشق' },
  
  // Rural Damascus
  'يعفور': { x: 32, y: 52, gov: 'ريف دمشق' },
  'الصبورة': { x: 30, y: 50, gov: 'ريف دمشق' },
  'ضاحية قدسيا': { x: 36, y: 46, gov: 'ريف دمشق' },
  'جرمانا': { x: 50, y: 56, gov: 'ريف دمشق' },
  'صحنايا': { x: 44, y: 64, gov: 'ريف دمشق' },

  // Aleppo
  'الشهباء': { x: 58, y: 22, gov: 'حلب' },
  'الفرقان': { x: 56, y: 24, gov: 'حلب' },
  'حلب الجديدة': { x: 54, y: 23, gov: 'حلب' },

  // Homs & Hama
  'الإنشاءات': { x: 48, y: 38, gov: 'حمص' },
  'الحمراء': { x: 49, y: 39, gov: 'حمص' },
  'الدبلان': { x: 50, y: 38, gov: 'حمص' },
  'الحاضر': { x: 50, y: 32, gov: 'حماة' },

  // Coastal
  'الزراعة': { x: 36, y: 30, gov: 'اللاذقية' },
  'المشروع السابع': { x: 35, y: 29, gov: 'اللاذقية' },
  'الكورنيش البحري': { x: 37, y: 38, gov: 'طرطوس' },
};

export const InteractivePropertyMap: React.FC<Props> = ({ properties, onOpenDetail }) => {
  const { formatPrice } = useCurrency();
  const [selectedGov, setSelectedGov] = useState<Governorate>('الكل');
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);

  // Filter properties by governorate if selected
  const displayProperties = selectedGov === 'الكل'
    ? properties
    : properties.filter((p) => p.governorate === selectedGov);

  // Get pin position for property
  const getPinCoords = (prop: Property, index: number) => {
    const matched = REGION_COORDINATES[prop.region] ||
      Object.entries(REGION_COORDINATES).find(([k]) => prop.region.includes(k) || prop.title.includes(k))?.[1];

    if (matched) {
      // Add slight jitter so overlapping pins in the same neighborhood don't stack completely
      const jitterX = ((index % 3) - 1) * 2.2;
      const jitterY = (Math.floor(index / 3) - 1) * 2.2;
      return { x: Math.max(10, Math.min(90, matched.x + jitterX)), y: Math.max(10, Math.min(90, matched.y + jitterY)) };
    }

    // Default distribution based on governorate
    if (prop.governorate === 'دمشق') return { x: 43 + (index % 5) * 3, y: 52 + (index % 4) * 3 };
    if (prop.governorate === 'ريف دمشق') return { x: 34 + (index % 5) * 4, y: 55 + (index % 4) * 4 };
    if (prop.governorate === 'حلب') return { x: 56 + (index % 4) * 3, y: 22 + (index % 3) * 3 };
    if (prop.governorate === 'حمص') return { x: 49 + (index % 4) * 3, y: 38 + (index % 3) * 3 };
    return { x: 36 + (index % 4) * 3, y: 32 + (index % 3) * 3 };
  };

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden text-right">
      
      {/* Top Filter Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Compass className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-sm sm:text-base font-black text-white font-alexandria">
              الخريطة التفاعلية للعقارات في سوريا
            </h3>
            <span className="text-[11px] text-slate-400">
              انقر على أي دبوس سعري لاستعراض بيانات وصور العقار مباشرة
            </span>
          </div>
        </div>

        {/* Governorate Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {([
            'الكل',
            'دمشق',
            'ريف دمشق',
            'حلب',
            'حمص',
            'حماة',
            'اللاذقية',
            'طرطوس',
          ] as Governorate[]).map((gov) => (
            <button
              key={gov}
              type="button"
              onClick={() => setSelectedGov(gov)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                selectedGov === gov
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              {gov}
            </button>
          ))}
        </div>
      </div>

      {/* Map Canvas Area */}
      <div className="relative w-full h-[520px] sm:h-[620px] bg-slate-950 overflow-hidden select-none">
        
        {/* Abstract Stylized Geographic Grid / Syrian Map Vector Outline */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mapGrid)" />
          
          {/* Subtle Ambient Topography Curves */}
          <path
            d="M 50 150 Q 200 80 400 200 T 800 150 T 1200 300"
            fill="none"
            stroke="rgba(16, 185, 129, 0.15)"
            strokeWidth="2"
            strokeDasharray="6,6"
          />
          <path
            d="M 100 350 Q 300 280 600 400 T 1000 350"
            fill="none"
            stroke="rgba(245, 158, 11, 0.12)"
            strokeWidth="2"
            strokeDasharray="4,4"
          />
        </svg>

        {/* Ambient Region Labels */}
        <div className="absolute top-[20%] right-[38%] text-slate-600/60 font-black text-2xl sm:text-3xl font-alexandria pointer-events-none">
          حـلـب
        </div>
        <div className="absolute top-[36%] right-[46%] text-slate-600/60 font-black text-2xl sm:text-3xl font-alexandria pointer-events-none">
          حـمـص
        </div>
        <div className="absolute top-[52%] right-[52%] text-slate-600/60 font-black text-3xl sm:text-4xl font-alexandria pointer-events-none">
          دمـشـق
        </div>
        <div className="absolute top-[30%] right-[60%] text-slate-600/50 font-black text-xl sm:text-2xl font-alexandria pointer-events-none">
          الساحل السوري
        </div>

        {/* Interactive Property Pins */}
        {displayProperties.map((prop, idx) => {
          const coords = getPinCoords(prop, idx);
          const isSelected = activeProperty?.id === prop.id;

          return (
            <div
              key={prop.id}
              className="absolute z-20 transition-all duration-300 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
            >
              <button
                type="button"
                onClick={() => setActiveProperty(isSelected ? null : prop)}
                className={`group flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black font-alexandria transition-all duration-200 shadow-xl cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/40 scale-125 z-30'
                    : prop.contractType === 'sale'
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white hover:scale-110 ring-2 ring-white/20'
                    : 'bg-teal-600 hover:bg-teal-500 text-white hover:scale-110 ring-2 ring-white/20'
                }`}
                title={`${prop.title} - ${prop.region}`}
              >
                <MapPin className="w-3 h-3 shrink-0" />
                <span>
                  {prop.contractType === 'sale'
                    ? `$${Math.round(prop.priceUsd / 1000)}k`
                    : `$${prop.priceUsd}/ش`}
                </span>
              </button>
            </div>
          );
        })}

        {/* Active Property Floating Card (Bottom-Left / Center) */}
        {activeProperty && (
          <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-sm z-30 animate-in slide-in-from-bottom-4 duration-200">
            <div className="bg-slate-900/95 backdrop-blur-2xl rounded-3xl border border-emerald-500/40 p-4 shadow-2xl space-y-3 ring-1 ring-emerald-500/20 text-right">
              
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveProperty(null)}
                className="absolute top-3 left-3 p-1 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Image & Badges */}
              <div className="relative aspect-16/9 rounded-2xl overflow-hidden border border-slate-700">
                <img
                  src={activeProperty.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'}
                  alt={activeProperty.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-md">
                  {activeProperty.propertyCode}
                </span>
                <span className="absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/80 text-amber-300 backdrop-blur-md">
                  {activeProperty.contractType === 'sale' ? 'للبيع' : 'للإيجار'} • {activeProperty.area} م²
                </span>
              </div>

              {/* Title & Region */}
              <div className="space-y-0.5">
                <h4 className="text-xs sm:text-sm font-bold text-white font-alexandria line-clamp-1">
                  {activeProperty.title}
                </h4>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{activeProperty.region} - {activeProperty.governorate}</span>
                </p>
              </div>

              {/* Price & Action CTA */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div>
                  <span className="text-xs text-slate-400 block text-[10px]">السعر المطلوب:</span>
                  <span className="text-sm sm:text-base font-black text-emerald-400 font-alexandria">
                    {formatPrice(activeProperty.priceUsd)}
                  </span>
                </div>

                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => onOpenDetail(activeProperty)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-transform hover:scale-105"
                  >
                    معاينة سريعة
                  </button>
                  <Link
                    href={`/properties/${activeProperty.slug}`}
                    className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                    title="فتح صفحة العقار"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Map Legend Footer */}
      <div className="p-3 bg-slate-950 border-t border-slate-800/80 px-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block"></span>
            <span>عقارات للبيع ($ USD)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-teal-600 inline-block"></span>
            <span>عقارات للإيجار ($ / شهر)</span>
          </span>
        </div>
        <span>يتم عرض {displayProperties.length} عقارات على الخريطة</span>
      </div>

    </div>
  );
};
