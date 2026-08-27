import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SYRIAN_LOCATIONS } from '@/data/locations';
import { propertyService } from '@/services/propertyService';
import { MapPin, Building, ChevronRight, ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'المحافظات والمناطق العقارية في سوريا | عقارات سوريا',
  description:
    'استكشف كافة المحافظات والمدن والمناطق العقارية المتاحة في سوريا: دمشق، ريف دمشق، حلب، حمص، حماة، اللاذقية، طرطوس.',
};

export default function ProvincesPage() {
  const provincesWithCounts = propertyService.getProvincesWithCounts();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-cairo flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <Header />

      <main className="flex-grow">
        {/* Page Banner Header */}
        <section className="relative pt-28 pb-14 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/80 overflow-hidden">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-2">
              <Link href="/" className="hover:text-emerald-400 transition-colors">
                الرئيسية
              </Link>
              <ChevronRight className="w-3.5 h-3.5 rotate-180 text-slate-600" />
              <span className="text-emerald-400 font-bold">المحافظات والمناطق</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              <MapPin className="w-3.5 h-3.5" />
              <span>تغطية عقارية شاملة لكافة المحافظات السورية</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-alexandria text-white tracking-tight">
              المحافظات والمدن <span className="text-emerald-400">السورية</span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              اختر المحافظة لاستعراض أشهر المناطق والأحياء السكنية والتجارية وتصفح العقارات والأسعار المتاحة فيها بدقة.
            </p>
          </div>
        </section>

        {/* Provinces Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SYRIAN_LOCATIONS.map((loc) => {
              const countData = provincesWithCounts.find((p) => p.slug === loc.provinceSlug);
              const count = countData ? countData.count : 0;

              return (
                <div
                  key={loc.provinceId}
                  className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl hover:border-emerald-500/40 hover:shadow-emerald-950/20 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black text-lg group-hover:scale-105 transition-transform">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-emerald-400 border border-slate-700">
                        {count} عقار متوفر
                      </span>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-white font-alexandria group-hover:text-emerald-400 transition-colors">
                        محافظة {loc.provinceNameAr}
                      </h2>
                      <span className="text-xs text-slate-500 font-medium block mt-0.5 font-mono">
                        {loc.provinceNameEn}
                      </span>
                    </div>

                    {/* Cities Preview Chips */}
                    <div className="space-y-2 pt-3 border-t border-slate-800/80">
                      <span className="text-[11px] font-semibold text-slate-400 block">أشهر المناطق والأحياء:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {loc.cities.slice(0, 4).map((city) => (
                          <span
                            key={city.cityId}
                            className="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-medium"
                          >
                            {city.cityNameAr}
                          </span>
                        ))}
                        {loc.cities.length > 4 && (
                          <span className="px-2.5 py-1 rounded-xl bg-slate-800 text-slate-400 text-xs font-medium">
                            +{loc.cities.length - 4} مناطق أخرى
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-800/80">
                    <Link
                      href={`/provinces/${loc.provinceSlug}`}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-slate-800/90 hover:bg-emerald-600 text-slate-200 hover:text-white text-xs font-bold border border-slate-700/80 hover:border-emerald-500 transition-all duration-200 shadow-sm"
                    >
                      <span>استكشاف عقارات {loc.provinceNameAr}</span>
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
