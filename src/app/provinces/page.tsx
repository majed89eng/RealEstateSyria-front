import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SYRIAN_LOCATIONS } from '@/data/locations';
import { propertyService } from '@/services/propertyService';
import { MapPin, Building, ChevronRight, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'المحافظات والمناطق العقارية في سوريا | عقارات سوريا',
  description: 'استكشف كافة المحافظات والمدن والمناطق العقارية المتاحة في سوريا: دمشق، ريف دمشق، حلب، حمص، حماة، اللاذقية، طرطوس.',
};

export default function ProvincesPage() {
  const provincesWithCounts = propertyService.getProvincesWithCounts();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-cairo flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        {/* Page Header */}
        <div className="bg-slate-900 text-white py-12 mb-10 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
              <Link href="/" className="hover:text-emerald-400 transition-colors">
                الرئيسية
              </Link>
              <ChevronRight className="w-3.5 h-3.5 rotate-180 text-slate-500" />
              <span className="text-emerald-400 font-bold">المحافظات والمناطق</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold font-alexandria">
              المحافظات والمدن السورية
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl mt-2">
              اختر المحافظة لاستعراض أشهر المناطق والأحياء السكنية والتجارية وتصفح العقارات المتاحة فيها.
            </p>
          </div>
        </div>

        {/* Provinces Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SYRIAN_LOCATIONS.map((loc) => {
              const countData = provincesWithCounts.find((p) => p.slug === loc.provinceSlug);
              const count = countData ? countData.count : 0;

              return (
                <div
                  key={loc.provinceId}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-lg">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                        {count} عقار متوفر
                      </span>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-slate-900 font-alexandria group-hover:text-emerald-600 transition-colors">
                        محافظة {loc.provinceNameAr}
                      </h2>
                      <span className="text-xs text-slate-400 font-medium block mt-0.5">
                        {loc.provinceNameEn}
                      </span>
                    </div>

                    {/* Cities Preview Chips */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-semibold text-slate-400 block">أشهر المناطق:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {loc.cities.slice(0, 4).map((city) => (
                          <span
                            key={city.cityId}
                            className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium"
                          >
                            {city.cityNameAr}
                          </span>
                        ))}
                        {loc.cities.length > 4 && (
                          <span className="px-2 py-1 text-xs text-slate-400 font-medium">
                            +{loc.cities.length - 4} مناطق
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100">
                    <Link
                      href={`/provinces/${loc.provinceSlug}`}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 text-xs font-bold transition-all duration-200"
                    >
                      <span>استكشاف عقارات {loc.provinceNameAr}</span>
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
