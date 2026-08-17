import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SYRIAN_LOCATIONS } from '@/data/locations';
import { propertyService } from '@/services/propertyService';
import { PropertyCard } from '@/components/PropertyCard';
import { FloatingActionHub } from '@/components/FloatingActionHub';
import { MapPin, Building2, ChevronRight } from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const loc = SYRIAN_LOCATIONS.find((l) => l.provinceSlug === params.slug);

  if (!loc) {
    return {
      title: 'المحافظة غير موجودة | عقارات سوريا',
    };
  }

  return {
    title: `عقارات محافظة ${loc.provinceNameAr} | شقق، فيلات ومكاتب للبيع وللإيجار`,
    description: `دليل عقارات محافظة ${loc.provinceNameAr}. تصفح أحدث الشقق والفيلات المعروضة للبيع وللإيجار في مناطق ${loc.cities.map((c) => c.cityNameAr).join('، ')}.`,
    keywords: [
      `عقارات ${loc.provinceNameAr}`,
      `شقق للبيع في ${loc.provinceNameAr}`,
      `شقق للإيجار في ${loc.provinceNameAr}`,
      ...loc.cities.map((c) => `عقارات ${c.cityNameAr}`),
    ],
    openGraph: {
      title: `عقارات محافظة ${loc.provinceNameAr} | عقارات سوريا`,
      description: `تصفح كافة العقارات المتاحة في محافظة ${loc.provinceNameAr}.`,
    },
  };
}

export default async function SingleProvincePage({ params }: Props) {
  const loc = SYRIAN_LOCATIONS.find((l) => l.provinceSlug === params.slug);

  if (!loc) {
    notFound();
  }

  const properties = await propertyService.getProperties({
    governorate: loc.provinceNameAr as any,
  });

  const baseUrl = 'https://realestate-syria.com';
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'الرئيسية',
        item: `${baseUrl}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'دليل المحافظات',
        item: `${baseUrl}/provinces`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `عقارات ${loc.provinceNameAr}`,
        item: `${baseUrl}/provinces/${loc.provinceSlug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-cairo flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      {/* Breadcrumb Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Header />

      <main className="flex-grow pt-24 pb-16">
        {/* Banner */}
        <div className="bg-slate-900 text-white py-12 mb-10 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-3">
              <Link href="/" className="hover:text-emerald-400 transition-colors">
                الرئيسية
              </Link>
              <ChevronRight className="w-3.5 h-3.5 rotate-180 text-slate-500" />
              <Link href="/provinces" className="hover:text-emerald-400 transition-colors">
                المحافظات
              </Link>
              <ChevronRight className="w-3.5 h-3.5 rotate-180 text-slate-500" />
              <span className="text-emerald-400 font-bold">{loc.provinceNameAr}</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>دليل المحافظات</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold font-alexandria">
                  عقارات محافظة {loc.provinceNameAr}
                </h1>
                <p className="text-slate-300 text-sm max-w-2xl">
                  استكشف أفضل الفرص العقارية السكنية والتجارية في محافظة {loc.provinceNameAr} مع تسعير حقيقي وتواصل مباشر.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-center min-w-[180px]">
                <span className="text-xs text-slate-400 block mb-1">إجمالي العقارات المتاحة</span>
                <span className="text-3xl font-black text-emerald-400 font-alexandria">
                  {properties.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Cities & Regions Explorer Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 font-alexandria flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-600" />
              <span>المدن والمناطق الرئيسية التابعة لـ {loc.provinceNameAr}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {loc.cities.map((city) => (
                <div
                  key={city.cityId}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{city.cityNameAr}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{city.cityNameEn}</span>
                  </div>

                  {city.neighborhoods.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {city.neighborhoods.map((n) => (
                        <span
                          key={n.neighborhoodId}
                          className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] text-slate-600"
                        >
                          {n.neighborhoodNameAr}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Properties Listing */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-slate-900 font-alexandria">
                العقارات المعروضة في {loc.provinceNameAr}
              </h2>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {properties.length} نتائج
              </span>
            </div>

            {properties.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
                <Building2 className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-lg font-bold text-slate-800">لا توجد عقارات منشورة حالياً في هذه المحافظة</h3>
                <p className="text-xs text-slate-500">سيتم إضافة عروض جديدة قريباً من قبل فريق الإدارة.</p>
                <Link
                  href="/properties"
                  className="inline-block px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors mt-2"
                >
                  تصفح عقارات المحافظات الأخرى
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Floating Action Hub */}
        <FloatingActionHub allProperties={properties} />
      </main>

      <Footer />
    </div>
  );
}
