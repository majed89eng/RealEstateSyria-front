'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  Building2,
  MapPin,
  Flame,
  Percent,
  Search,
  ChevronLeft,
  Coins,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Layers,
} from 'lucide-react';
import marketIndexData from '../data/marketPriceIndex.json';
import { NeighborhoodPriceData } from '../types/marketIndex';
import { Governorate } from '../types/property';
import { useCurrency } from '../context/CurrencyContext';
import { Tilt3DCard } from './ui/Tilt3DCard';

interface Props {
  isStandalonePage?: boolean;
}

export const MarketPriceIndexSection: React.FC<Props> = ({ isStandalonePage = false }) => {
  const { formatPrice, currency } = useCurrency();
  const [selectedGov, setSelectedGov] = useState<Governorate>('الكل');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<NeighborhoodPriceData | null>(null);

  const neighborhoods = marketIndexData.neighborhoods as NeighborhoodPriceData[];

  const filteredNeighborhoods = neighborhoods.filter((item) => {
    const matchesGov = selectedGov === 'الكل' || item.governorate === selectedGov;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.neighborhoodName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.governorate.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGov && matchesSearch;
  });

  const governorateTabs: Governorate[] = [
    'الكل',
    'دمشق',
    'ريف دمشق',
    'حلب',
    'حمص',
    'اللاذقية',
    'طرطوس',
    'السويداء',
  ];

  return (
    <section className={`relative ${isStandalonePage ? 'py-8' : 'py-20 border-t border-slate-800/80 bg-slate-950'} text-white overflow-hidden bg-grid-pattern`}>
      {/* Ambient Glows */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-bold border border-emerald-500/30 backdrop-blur-md shimmer-badge-wrapper">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>مؤشر السوق والبيانات العقارية الحية</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-alexandria text-gradient-silver">
              مؤشر أسعار العقارات والمتر في سوريا 📊
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
              بيانات حية ودقيقة لمتوسط سعر المتر المربع وتغيرات الأسعار خلال آخر 6 أشهر، لمساعدة المشترين والمغتربين والمستثمرين على اتخاذ قرارات مدروسة.
            </p>
          </div>

          {/* National Stats Highlight Card */}
          <div className="flex items-center gap-4 bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-3xl shadow-xl backdrop-blur-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-400 font-bold block">معدل نمو السوق الوطني (6 أشهر)</span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-emerald-400 font-alexandria">
                  +{marketIndexData.nationalSixMonthGrowth}%
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                  صعود مستمر ↗️
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-3xl shadow-xl backdrop-blur-xl space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ابحث بالحي أو المنطقة (مثل: المالكي، المزة، يعفور، الشهباء...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl pr-10 pl-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Quick Summary Note */}
            <div className="flex items-center gap-2 text-xs text-slate-400 justify-end">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>آخر تحديث: {marketIndexData.lastUpdated}</span>
            </div>
          </div>

          {/* Governorate Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            <span className="text-xs text-slate-400 font-bold ml-1 shrink-0">المحافظة:</span>
            {governorateTabs.map((gov) => (
              <button
                key={gov}
                type="button"
                onClick={() => setSelectedGov(gov)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedGov === gov
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {gov}
              </button>
            ))}
          </div>
        </div>

        {/* Neighborhood Price Index Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNeighborhoods.map((item) => (
            <Tilt3DCard
              key={item.id}
              maxTilt={6}
              scale={1.02}
              glare={true}
              glareOpacity={0.12}
              className="h-full cursor-pointer"
              onClick={() => setSelectedNeighborhood(item)}
            >
              <div className="glass-panel p-6 rounded-3xl space-y-4 group h-full border border-slate-800/80 hover:border-emerald-500/40 shadow-3d-card hover:shadow-3d-card-hover transition-all duration-300 relative overflow-hidden preserve-3d flex flex-col justify-between">
                {/* Top Row: Governorate & Growth Rate */}
                <div className="flex items-center justify-between translate-z-md">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-950 border border-slate-800 text-slate-300 shadow-sm">
                    {item.governorate}
                  </span>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold shadow-sm font-mono">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+{item.sixMonthChangePercent}% خلال 6 أشهر</span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-1 translate-z-sm">
                  <h3 className="text-lg font-bold font-alexandria text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                    <span>{item.neighborhoodName}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Price Stats Box with 3D Elevation */}
                <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 space-y-2 translate-z-md shadow-inner">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-semibold">متوسط سعر المتر:</span>
                    <span className="text-base font-black font-alexandria text-emerald-400 drop-shadow">
                      {formatPrice(item.avgPricePerSqmUsd)} / م²
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                    <span>نطاق الأسعار:</span>
                    <span className="font-mono font-medium text-slate-200">
                      {formatPrice(item.minPricePerSqmUsd)} - {formatPrice(item.maxPricePerSqmUsd)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <span>متوسط سعر الشقة:</span>
                    <span className="font-bold text-slate-200">
                      {formatPrice(item.avgApartmentPriceUsd)}
                    </span>
                  </div>
                </div>

                {/* Metrics Pills: Rental Yield & Demand */}
                <div className="flex items-center justify-between pt-1 text-xs translate-z-sm">
                  <div className="flex items-center gap-1 text-slate-300">
                    <Percent className="w-3.5 h-3.5 text-amber-400" />
                    <span>العائد الإيجاري التقديري:</span>
                    <strong className="text-amber-300 font-bold">{item.rentalYieldPercent}%</strong>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    item.demandLevel === 'very_high'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {item.demandLevel === 'very_high' ? 'طلب مرتفع جداً 🔥' : 'طلب نشط ⚡'}
                  </span>
                </div>

                {/* Historical Trend Micro-Visualizer */}
                <div className="pt-2 border-t border-slate-800/80 space-y-1 translate-z-sm">
                  <span className="text-[10px] font-semibold text-slate-400 block">حركة متوسط المتر (آخر 6 أشهر):</span>
                  <div className="flex items-end gap-1.5 h-8 pt-1">
                    {item.historicalTrends.map((t, idx) => {
                      const minP = Math.min(...item.historicalTrends.map((h) => h.avgPriceUsd));
                      const maxP = Math.max(...item.historicalTrends.map((h) => h.avgPriceUsd));
                      const heightPercent = Math.max(25, ((t.avgPriceUsd - minP) / (maxP - minP || 1)) * 100);
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-0.5 group/bar relative">
                          <div
                            className="w-full bg-emerald-500/40 group-hover/bar:bg-emerald-400 rounded-t transition-all"
                            style={{ height: `${heightPercent}%` }}
                          />
                          <span className="text-[9px] text-slate-400">{t.month[0]}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Tilt3DCard>
          ))}
        </div>

        {/* Standalone CTA or Browse Properties Link */}
        {!isStandalonePage && (
          <div className="pt-6 text-center">
            <Link
              href="/market-index"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm border border-slate-700 hover:border-emerald-500 transition-all shadow-lg hover:scale-105"
            >
              <span>استعراض التقرير العقاري والتحليلي الكامل لمؤشر الأسعار</span>
              <ChevronLeft className="w-4 h-4 text-emerald-400" />
            </Link>
          </div>
        )}

      </div>

      {/* Neighborhood Detailed Drawer Modal */}
      {selectedNeighborhood && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                  {selectedNeighborhood.governorate}
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-alexandria text-white mt-2">
                  {selectedNeighborhood.neighborhoodName}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedNeighborhood(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Modal Body Info */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
              {selectedNeighborhood.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block">متوسط المتر</span>
                <span className="text-base font-black text-emerald-400 font-alexandria">
                  {formatPrice(selectedNeighborhood.avgPricePerSqmUsd)}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block">النمو (6 أشهر)</span>
                <span className="text-base font-black text-emerald-400 font-alexandria">
                  +{selectedNeighborhood.sixMonthChangePercent}%
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block">العائد الإيجاري</span>
                <span className="text-base font-black text-amber-400 font-alexandria">
                  {selectedNeighborhood.rentalYieldPercent}%
                </span>
              </div>
            </div>

            {/* Popular property types */}
            <div className="space-y-2">
              <span className="text-xs text-slate-400 font-bold block">أكثر العقارات طلباً في هذا الحي:</span>
              <div className="flex flex-wrap gap-2">
                {selectedNeighborhood.popularPropertyTypes.map((type, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href={`/properties?gov=${encodeURIComponent(selectedNeighborhood.governorate)}&search=${encodeURIComponent(selectedNeighborhood.neighborhoodName.split(' ')[0])}`}
                className="w-full flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-center text-xs sm:text-sm transition-colors shadow-lg shadow-emerald-600/30"
              >
                تصفح العقارات المعروضة في {selectedNeighborhood.neighborhoodName}
              </Link>
              <button
                type="button"
                onClick={() => setSelectedNeighborhood(null)}
                className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
