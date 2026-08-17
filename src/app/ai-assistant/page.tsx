'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AIAssistant } from '@/components/AIAssistant';
import { PropertyDetailModal } from '@/components/PropertyDetailModal';
import { useProperties } from '@/hooks/useProperties';
import { Sparkles, ChevronRight } from 'lucide-react';

export default function AIAssistantPage() {
  const { selectedProperty, isDetailModalOpen, openPropertyDetail, closePropertyDetail } =
    useProperties();

  return (
    <div className="min-h-screen bg-slate-900 text-white font-cairo flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        {/* Banner Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              الرئيسية
            </Link>
            <ChevronRight className="w-3.5 h-3.5 rotate-180 text-slate-600" />
            <span className="text-amber-400 font-bold">المساعد الذكي</span>
          </nav>
        </div>

        {/* AI Assistant Component */}
        <AIAssistant onOpenDetail={openPropertyDetail} />

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
