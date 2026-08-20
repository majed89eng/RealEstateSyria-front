'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  ShieldCheck,
  MapPin,
  Phone,
  MessageCircle,
  Search,
  Star,
  Sparkles,
  Award,
  ChevronRight,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingActionHub } from '@/components/FloatingActionHub';
import agenciesData from '@/data/agencies.json';
import { Governorate } from '@/types/property';

export default function AgenciesDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGov, setSelectedGov] = useState<Governorate>('الكل');

  const filteredAgencies = agenciesData.filter((agency) => {
    const matchesGov = selectedGov === 'الكل' || agency.governorate === selectedGov;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      q === '' ||
      agency.name.toLowerCase().includes(q) ||
      agency.region.toLowerCase().includes(q) ||
      agency.specialties.some((s) => s.toLowerCase().includes(q));

    return matchesGov && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white font-cairo flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        
        {/* Page Banner Header */}
        <div className="bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-950 py-12 mb-8 border-b border-slate-800 relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 text-right">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Link href="/" className="hover:text-emerald-400 transition-colors">
                الرئيسية
              </Link>
              <ChevronRight className="w-3.5 h-3.5 rotate-180 text-slate-500" />
              <span className="text-emerald-400 font-bold">دليل المكاتب المعتمدة</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>شبكة الشركاء والوسطاء المرخصين رسمياً</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black font-alexandria text-white">
                  دليل المكاتب والشركات العقارية المعتمدة
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  تواصل مباشرة مع نخبة المكاتب والشركات العقارية المرخصة في دمشق والمحافظات السورية، مع ضمان الشفافية والخبرة الموثوقة.
                </p>
              </div>

              {/* Quick Search */}
              <div className="relative min-w-[280px]">
                <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="ابحث باسم المكتب أو المنطقة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 text-xs rounded-2xl pr-10 pl-3.5 py-3 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Governorate Filter Pills */}
            <div className="pt-3 flex flex-wrap items-center gap-1.5 border-t border-slate-800/80">
              <span className="text-xs text-slate-400 font-bold ml-2">المحافظة:</span>
              {(['الكل', 'دمشق', 'ريف دمشق', 'حلب', 'حمص'] as Governorate[]).map((gov) => (
                <button
                  key={gov}
                  type="button"
                  onClick={() => setSelectedGov(gov)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedGov === gov
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700'
                  }`}
                >
                  {gov}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Agencies Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgencies.map((agency) => (
              <div
                key={agency.id}
                className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 text-right flex flex-col justify-between hover:border-emerald-500/40 transition-all group ring-1 ring-white/5"
              >
                <div className="space-y-4">
                  
                  {/* Agency Header Row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 shrink-0">
                      <img
                        src={agency.logo}
                        alt={agency.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="text-left space-y-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 inline-block">
                        {agency.badge}
                      </span>
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-bold justify-end">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{agency.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Location */}
                  <div className="space-y-1">
                    <h3 className="text-base font-black text-white font-alexandria leading-snug">
                      {agency.name}
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{agency.region} ({agency.governorate})</span>
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {agency.description}
                  </p>

                  {/* Stats & License Info */}
                  <div className="p-3 bg-slate-850 rounded-2xl border border-slate-800 space-y-1 text-xs text-slate-300">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">العقارات النشطة:</span>
                      <strong className="text-emerald-400">{agency.listingsCount} عقار معتمد</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">سنوات الخبرة:</span>
                      <span className="text-white font-bold">{agency.experienceYears} عاماً</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-800 text-slate-400">
                      <span>الترخيص:</span>
                      <span className="font-mono text-slate-300">{agency.licenseNumber}</span>
                    </div>
                  </div>

                  {/* Specialties Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {agency.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-lg bg-slate-800 text-[10px] text-slate-300 border border-slate-700 font-medium"
                      >
                        • {spec}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-slate-800 flex items-center gap-2">
                  <a
                    href={`https://wa.me/${agency.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `مرحباً ${agency.name}، اطلعت على ملفكم في منصة عقارات سوريا وأود الاستفسار عن عروضكم.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all hover:scale-105"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>محادثة واتساب</span>
                  </a>

                  <Link
                    href={`/properties?searchQuery=${encodeURIComponent(agency.region)}`}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                    title="تصفح عقارات هذا المكتب"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
      <FloatingActionHub />
    </div>
  );
}
