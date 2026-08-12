'use client';

import React, { useState, useEffect } from 'react';
import { Building2, MessageCircle, Menu, X, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenAI: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAI }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappDirectUrl = "https://wa.me/963988123456?text=" + encodeURIComponent("مرحباً، أود الاستفسار عن الخدمات العقارية والعقارات المتاحة في المنصة.");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-header border-b border-slate-200/80 shadow-sm py-3'
          : 'bg-gradient-to-b from-slate-900/90 via-slate-900/40 to-transparent py-4 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/30 group-hover:scale-105 transition-transform duration-200">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold font-alexandria tracking-tight flex items-center gap-1.5 ${scrolled ? 'text-slate-900' : 'text-white'}`}>
                عقارات سوريا
                <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-cairo">
                  دمشق وريفها
                </span>
              </span>
              <span className={`text-[11px] font-medium ${scrolled ? 'text-slate-500' : 'text-slate-300'}`}>
                الكتالوج العقاري الأول في سوريا
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <a
              href="#properties"
              className={`transition-colors hover:text-emerald-500 ${scrolled ? 'text-slate-700' : 'text-slate-200'}`}
            >
              تصفح العقارات
            </a>
            <a
              href="#ai-assistant"
              onClick={(e) => {
                e.preventDefault();
                onOpenAI();
                const el = document.getElementById('ai-assistant');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 text-amber-600 font-semibold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all`}
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              المساعد الذكي
            </a>
            <a
              href="#governorates"
              className={`transition-colors hover:text-emerald-500 ${scrolled ? 'text-slate-700' : 'text-slate-200'}`}
            >
              المناطق
            </a>
            <a
              href="#why-us"
              className={`transition-colors hover:text-emerald-500 ${scrolled ? 'text-slate-700' : 'text-slate-200'}`}
            >
              لماذا نحن؟
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-all duration-200 shadow-md shadow-emerald-600/20 hover:shadow-lg hover:scale-[1.02] active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>تواصل عبر واتساب</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-emerald-600 text-white shadow-sm"
              title="تواصل مباشر"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                scrolled ? 'bg-slate-100 text-slate-700' : 'bg-white/10 text-white backdrop-blur-md'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[73px] bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 text-white p-6 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-4">
            <a
              href="#properties"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium hover:text-emerald-400 py-2 border-b border-slate-800"
            >
              تصفح العقارات
            </a>
            <a
              href="#ai-assistant"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAI();
              }}
              className="flex items-center justify-between text-lg font-semibold text-amber-400 py-2 border-b border-slate-800"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                المساعد الذكي بالذكاء الاصطناعي
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">جديد</span>
            </a>
            <a
              href="#governorates"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium hover:text-emerald-400 py-2 border-b border-slate-800"
            >
              المناطق والمحافظات
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium hover:text-emerald-400 py-2 border-b border-slate-800"
            >
              لماذا منصتنا؟
            </a>

            <div className="pt-2">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-center shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                <span>محادثة الواتساب المباشرة</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
