'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProperties } from '@/hooks/useProperties';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FilterSection } from '@/components/FilterSection';
import { PropertyGrid } from '@/components/PropertyGrid';
import { PropertyDetailModal } from '@/components/PropertyDetailModal';
import { Building2, Search, Sparkles, ChevronRight } from 'lucide-react';

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

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  const totalPages = Math.ceil(properties.length / itemsPerPage) || 1;
  const paginatedProperties = properties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-cairo flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        {/* Page Banner Header */}
        <div className="bg-slate-900 text-white py-12 mb-6 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
              <Link href="/" className="hover:text-emerald-400 transition-colors">
                الرئيسية
              </Link>
              <ChevronRight className="w-3.5 h-3.5 rotate-180 text-slate-500" />
              <span className="text-emerald-400 font-bold">دليل العقارات</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl font-extrabold font-alexandria">
                  كافة العقارات المتاحة في سوريا
                </h1>
                <p className="text-slate-300 text-sm max-w-2xl">
                  تصفح أحدث الشقق، الفيلات، المزارع والمكاتب التجارية في دمشق وريف دمشق وحلب وحمص مع تسعير دقيق وتواصل مباشر.
                </p>
              </div>

              {/* Quick Search Input */}
              <div className="relative min-w-[280px]">
                <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="ابحث بالاسم أو الرمز المرجعي..."
                  value={filters.searchQuery}
                  onChange={(e) => {
                    updateFilter('searchQuery', e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 text-xs rounded-xl pr-10 pl-3.5 py-3 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>

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

        {/* Properties Grid Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <PropertyGrid
            properties={paginatedProperties}
            loading={loading}
            onOpenDetail={openPropertyDetail}
            onResetFilters={resetFilters}
          />

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12 pt-6 border-t border-slate-200">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((p) => Math.max(p - 1, 1));
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 disabled:opacity-40 transition-colors"
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
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
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
                className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 disabled:opacity-40 transition-colors"
              >
                التالي
              </button>
            </div>
          )}
        </div>

        {/* Property Detail Lightbox Modal */}
        <PropertyDetailModal
          property={selectedProperty}
          isOpen={isDetailModalOpen}
          onClose={closePropertyDetail}
        />
      </main>

      <Footer />
    </div>
  );
}
