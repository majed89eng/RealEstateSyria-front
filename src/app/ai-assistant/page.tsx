'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AIAssistant } from '@/components/AIAssistant';
import { PropertyDetailModal } from '@/components/PropertyDetailModal';
import { useProperties } from '@/hooks/useProperties';
import { Sparkles, ChevronRight, MessageSquare } from 'lucide-react';

export default function AIAssistantPage() {
  const { selectedProperty, isDetailModalOpen, openPropertyDetail, closePropertyDetail } =
    useProperties();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-cairo flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <Header />

      <main className="flex-grow pt-28 pb-16">
        {/* Banner Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              الرئيسية
            </Link>
            <ChevronRight className="w-3.5 h-3.5 rotate-180 text-slate-600" />
            <span className="text-amber-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              المساعد الذكي (AI)
            </span>
          </nav>
        </div>

        {/* AI Assistant Component */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AIAssistant onOpenDetail={openPropertyDetail} />
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
