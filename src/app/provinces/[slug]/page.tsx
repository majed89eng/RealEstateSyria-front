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
import { MapPin, Building2, ChevronRight, Sparkles, Filter, Home } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-cairo flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      {/* Breadcrumb Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Header />

      <main className="flex-grow">
        {/* Banner */}
        <section className="relative pt-28 pb-14 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/80 overflow-hidden">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-3">
              <Link href="/" className="hover:text-emerald-400 transition-colors">
                الرئيسية
              </Link>
              <ChevronRight className="w-3.5 h-3.5 rotate-180 text-slate-600" />
              <Link href="/provinces" className="hover:text-emerald-400 transition-colors">
                المحافظات
              </Link>
              <ChevronRight className="w-3.5 h-3.5 rotate-180 text-slate-600" />
              <span className="text-emerald-400 font-bold">{loc.provinceNameAr}</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>دليل العقارات في {loc.provinceNameAr}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black font-alexandria text-white tracking-tight">
                  عقارات محافظة <span className="text-emerald-400">{loc.provinceNameAr}</span>
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  تصفح كافة الشقق والفيلات والمكاتب المعروضة للبيع وللإيجار في مختلف أحياء ومناطق {loc.provinceNameAr}.
                </p>
              </div>

              {/* Counter Badge */}
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-3xl text-center shrink-0 min-w-[150px] shadow-xl">
                <span className="text-[11px] text-slate-400 block mb-1">إجمالي العقارات المتاحة</span>
                <span className="text-3xl font-black font-alexandria text-emerald-400">
                  {properties.length}
                </span>
                <span className="text-xs text-slate-400 font-bold block mt-0.5">عقار معروض</span>
              </div>
            </div>

            {/* Quick Filter by City/Region Chips */}
            <div className="pt-4 border-t border-slate-800/80">
              <span className="text-xs text-slate-400 font-bold block mb-2">تصفية حسب المنطقة أو الحي:</span>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/properties?gov=${encodeURIComponent(loc.provinceNameAr)}`}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-sm"
                >
                  كافة مناطق {loc.provinceNameAr}
                </Link>
                {loc.cities.map((city) => (
                  <Link
                    key={city.cityId}
                    href={`/properties?gov=${encodeURIComponent(loc.provinceNameAr)}&region=${encodeURIComponent(city.cityNameAr)}`}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition-colors"
                  >
                    {city.cityNameAr}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {properties.length === 0 ? (
            <div className="bg-slate-900/90 rounded-3xl p-12 text-center border border-slate-800 space-y-4 max-w-lg mx-auto shadow-xl">
              <div className="w-16 h-16 rounded-3xl bg-slate-800 flex items-center justify-center text-slate-500 mx-auto">
                <Building2 className="w-8 h-8" />
              </div>
              <h2 className="text-lg font-bold text-white font-alexandria">
                لا توجد عقارات منشورة حالياً في محافظة {loc.provinceNameAr}
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                يتم تحديث العروض العقارية باستمرار. يمكنك إرسال طلب عقار خاص وسيقوم فريق الإدارة بالبحث لك فوراً.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/request-property"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg"
                >
                  اطلب عقارك الخاص في {loc.provinceNameAr}
                </Link>
                <Link
                  href="/properties"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-bold"
                >
                  تصفح باقي المحافظات
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          )}
        </section>
      </main>

      <FloatingActionHub allProperties={properties} />
      <Footer />
    </div>
  );
}
