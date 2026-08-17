import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { propertyService } from '@/services/propertyService';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PropertyPageClient } from './PropertyPageClient';

interface Props {
  params: {
    slug: string;
  };
}

// Generate Dynamic SEO Metadata for Each Property Page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = await propertyService.getPropertyBySlug(params.slug);

  if (!property) {
    return {
      title: 'العقار غير موجود | عقارات سوريا',
      description: 'لم يتم العثور على العقار المطلوب في منصة عقارات سوريا.',
    };
  }

  const contractLabel = property.contractType === 'sale' ? 'للبيع' : 'للإيجار';
  const pageTitle = `${property.title} (${property.propertyCode}) ${contractLabel} | عقارات سوريا`;
  const pageDescription = `${property.title} في ${property.region} - ${property.governorate}. المساحة: ${property.area}م²، ${property.bedrooms} غرف. ${property.locationDetails}. تواصل مباشر عبر واتساب.`;
  const mainImage =
    property.images[0] ||
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80';

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      property.title,
      property.propertyCode,
      `عقارات ${property.region}`,
      `عقارات ${property.governorate}`,
      `شقق ${contractLabel} ${property.region}`,
      'طابو سبز 2400 سهم',
      'طاقة شمسية عقارات سوريا',
      'عقارات سوريا',
    ],
    alternates: {
      canonical: `https://realestate-syria.com/properties/${property.slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://realestate-syria.com/properties/${property.slug}`,
      siteName: 'عقارات سوريا',
      images: [
        {
          url: mainImage,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
      type: 'article',
      locale: 'ar_SY',
    },
  };
}

export default async function SinglePropertyPage({ params }: Props) {
  const property = await propertyService.getPropertyBySlug(params.slug);

  if (!property) {
    notFound();
  }

  const similarProperties = await propertyService.getSimilarProperties(property, 3);
  const baseUrl = 'https://realestate-syria.com';

  // Schema.org RealEstateListing JSON-LD Structured Data
  const listingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description,
    image: property.images,
    url: `${baseUrl}/properties/${property.slug}`,
    datePosted: property.createdAt,
    price: property.priceUsd,
    priceCurrency: 'USD',
    identifier: property.propertyCode,
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.region,
      addressRegion: property.governorate,
      addressCountry: 'SY',
      streetAddress: property.locationDetails,
    },
    numberOfRooms: property.bedrooms,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.area,
      unitCode: 'MTK',
    },
  };

  // Schema.org BreadcrumbList for Rich Google Results
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
        name: 'دليل العقارات',
        item: `${baseUrl}/properties`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `عقارات ${property.governorate}`,
        item: `${baseUrl}/provinces`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: property.title,
        item: `${baseUrl}/properties/${property.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-cairo flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      {/* Schema.org RealEstateListing JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingJsonLd) }}
      />
      {/* Schema.org BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Header />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium overflow-x-auto py-1">
            <Link href="/" className="hover:text-emerald-600 transition-colors">
              الرئيسية
            </Link>
            <ChevronRight className="w-3.5 h-3.5 rotate-180 text-slate-400" />
            <Link href="/properties" className="hover:text-emerald-600 transition-colors">
              العقارات
            </Link>
            <ChevronRight className="w-3.5 h-3.5 rotate-180 text-slate-400" />
            <Link href="/provinces" className="hover:text-emerald-600 transition-colors">
              {property.governorate}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 rotate-180 text-slate-400" />
            <span className="text-slate-800 font-bold truncate max-w-xs">{property.title}</span>
          </nav>

          {/* Client-Interactive Section (Gallery, Currency Converter, Lead Form, WhatsApp) */}
          <PropertyPageClient property={property} similarProperties={similarProperties} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
