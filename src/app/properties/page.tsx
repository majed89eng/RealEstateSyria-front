'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProperties } from '@/hooks/useProperties';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FilterSection } from '@/components/FilterSection';
import { PropertyGrid } from '@/components/PropertyGrid';
import { PropertyDetailModal } from '@/components/PropertyDetailModal';
import { InteractivePropertyMap } from '@/components/InteractivePropertyMap';
import { PropertyAlertModal } from '@/components/PropertyAlertModal';
import { FloatingActionHub } from '@/components/FloatingActionHub';
import {
  Building2,
  Search,
  Sparkles,
  ChevronRight,
  LayoutGrid,
  Map,
  Bell,
  Compass,
} from 'lucide-react';

export default function PropertiesCatalogPage() {
  const {
    properties,
    loading,
    filters,
    updateFilter,
    resetFilters,
    selectedProperty,
    isDetailModalOpen,
    openPropertyDetail,
    closePropertyDetail,
  } = useProperties();

  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  const totalPages = Math.ceil(properties.length / itemsPerPage) || 1;
  const paginatedProperties = properties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white font-cairo flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <Header />

      <main className="flex-grow">
        {/* Page Banner Header */}
        <section className="relative pt-28 pb-10 mb-6 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/80 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-right">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Link href="/" className="hover:text-emerald-400 transition-colors">
                الرئيسية
              </Link>
              <ChevronRight className="w-3.5 h-3.5 rotate-180 text-slate-500" />
              <span className="text-emerald-400 font-bold">دليل العقارات</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <h1 className="text-3xl sm:text-4xl font-black font-alexandria">
                  كافة العقارات المتاحة في سوريا
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
                  تصفح أحدث الشقق، الفيلات، المزارع والمكاتب التجارية في دمشق وريف دمشق وحلب وسائر المحافظات مع تسعير دقيق وتواصل مباشر.
                </p>
              </div>

              {/* View Switcher & Custom Alert CTA */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-2xl border border-slate-700">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      viewMode === 'grid'
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>عرض الشبكة</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode('map')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      viewMode === 'map'
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Map className="w-3.5 h-3.5" />
                    <span>الخريطة التفاعلية</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAlertModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-bold text-xs transition-colors"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>نبّهني بطلب جديد</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Filters Section */}
        <FilterSection
          filters={filters}
          onUpdateFilter={(key, val) => {
            updateFilter(key, val);
            setCurrentPage(1);
          }}
          onResetFilters={() => {
            resetFilters();
            setCurrentPage(1);
          }}
          resultCount={properties.length}
        />

        {/* Properties Content: Grid or Interactive Map */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          {viewMode === 'map' ? (
            <InteractivePropertyMap
              properties={properties}
              onOpenDetail={openPropertyDetail}
            />
          ) : (
            <>
              <PropertyGrid
                properties={paginatedProperties}
                loading={loading}
                onOpenDetail={openPropertyDetail}
                onResetFilters={resetFilters}
              />

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12 pt-6 border-t border-slate-800">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => {
                      setCurrentPage((p) => Math.max(p - 1, 1));
                      window.scrollTo({ top: 200, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-800 disabled:opacity-40 transition-colors"
                  >
                    السابق
                  </button>

                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => {
                          setCurrentPage(pageNum);
                          window.scrollTo({ top: 200, behavior: 'smooth' });
                        }}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                          currentPage === pageNum
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => {
                      setCurrentPage((p) => Math.min(p + 1, totalPages));
                      window.scrollTo({ top: 200, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-800 disabled:opacity-40 transition-colors"
                  >
                    التالي
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Property Detail Lightbox Modal */}
        <PropertyDetailModal
          property={selectedProperty}
          isOpen={isDetailModalOpen}
          onClose={closePropertyDetail}
        />

        {/* Property Alert Modal */}
        <PropertyAlertModal
          isOpen={isAlertModalOpen}
          onClose={() => setIsAlertModalOpen(false)}
          defaultGovernorate={filters.governorate === 'الكل' ? 'دمشق' : filters.governorate}
        />

        {/* Floating Action Hub */}
        <FloatingActionHub allProperties={properties} />
      </main>

      <Footer />
    </div>
  );
}
