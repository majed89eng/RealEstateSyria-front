'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Building2,
  MessageCircle,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  Check,
  ShieldCheck,
  Plus,
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { CurrencyCode } from '../types/property';

interface HeaderProps {
  onOpenAI?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAI }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState<boolean>(false);
  const { currency, setCurrency } = useCurrency();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close currency dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCurrencyDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const whatsappDirectUrl =
    'https://wa.me/963988123456?text=' +
    encodeURIComponent('مرحباً، أود الاستفسار عن الخدمات العقارية والعقارات المتاحة في المنصة.');

  const currencyOptions: { code: CurrencyCode; label: string; symbol: string }[] = [
    { code: 'USD', label: 'الدولار الأمريكي', symbol: '$' },
    { code: 'SYP', label: 'الليرة السورية', symbol: 'ل.س' },
    { code: 'EUR', label: 'اليورو الأوروبي', symbol: '€' },
  ];

  const currentCurrencyObj = currencyOptions.find((c) => c.code === currency) || currencyOptions[0];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-header bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-2 text-slate-800'
          : 'bg-gradient-to-b from-slate-950/90 via-slate-900/50 to-transparent py-3.5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Clean Minimalist Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/25 group-hover:scale-105 transition-transform duration-200">
              <Building2 className="w-5 h-5" />
            </div>
            <span
              className={`text-lg sm:text-xl font-extrabold font-alexandria tracking-tight ${
                scrolled ? 'text-slate-900' : 'text-white'
              }`}
            >
              عقارات سوريا
            </span>
          </Link>

          {/* Desktop Streamlined Navigation */}
          <nav className="hidden lg:flex items-center gap-5 text-xs sm:text-sm font-semibold">
            <Link
              href="/"
              className={`transition-colors hover:text-emerald-500 ${
                scrolled ? 'text-slate-700' : 'text-slate-200'
              }`}
            >
              الرئيسية
            </Link>
            <Link
              href="/properties"
              className={`transition-colors hover:text-emerald-500 ${
                scrolled ? 'text-slate-700' : 'text-slate-200'
              }`}
            >
              العقارات
            </Link>
            <Link
              href="/add-property"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 transition-all text-xs"
            >
              <Plus className="w-3 h-3 text-emerald-400" />
              <span>أضف عقارك مجاناً</span>
            </Link>
            <Link
              href="/provinces"
              className={`transition-colors hover:text-emerald-500 ${
                scrolled ? 'text-slate-700' : 'text-slate-200'
              }`}
            >
              المحافظات
            </Link>
            <Link
              href="/agencies"
              className={`transition-colors hover:text-emerald-500 ${
                scrolled ? 'text-slate-700' : 'text-slate-200'
              }`}
            >
              المكاتب المعتمدة
            </Link>
            <Link
              href="/ai-assistant"
              onClick={(e) => {
                if (onOpenAI && window.location.pathname === '/') {
                  e.preventDefault();
                  onOpenAI();
                }
              }}
              className="flex items-center gap-1 text-amber-500 hover:text-amber-400 font-bold px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 transition-all text-xs"
            >
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>المساعد الذكي</span>
            </Link>
            <Link
              href="/about"
              className={`transition-colors hover:text-emerald-500 ${
                scrolled ? 'text-slate-700' : 'text-slate-200'
              }`}
            >
              من نحن
            </Link>
            <Link
              href="/contact"
              className={`transition-colors hover:text-emerald-500 ${
                scrolled ? 'text-slate-700' : 'text-slate-200'
              }`}
            >
              اتصل بنا
            </Link>
          </nav>

          {/* Right Actions: Compact Currency Dropdown + Compact WhatsApp CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Compact Currency Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  scrolled
                    ? 'bg-slate-100/90 hover:bg-slate-200/80 border-slate-300/80 text-slate-800'
                    : 'bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-md'
                }`}
                title="تغيير عملة عرض الأسعار"
              >
                <span className="font-mono text-emerald-400 font-black">
                  {currentCurrencyObj.symbol}
                </span>
                <span>{currentCurrencyObj.code}</span>
                <ChevronDown
                  className={`w-3 h-3 opacity-60 transition-transform duration-200 ${
                    currencyDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Floating Dropdown Menu */}
              {currencyDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-44 rounded-2xl bg-white text-slate-800 shadow-xl border border-slate-100 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    اختر عملة العرض:
                  </div>
                  {currencyOptions.map((opt) => (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => {
                        setCurrency(opt.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                        currency === opt.code
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-500 w-5 text-center font-black">
                          {opt.symbol}
                        </span>
                        <span>{opt.label}</span>
                      </div>
                      {currency === opt.code && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Add Property CTA Button */}
            <Link
              href="/add-property"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs transition-all duration-200 shadow-md shadow-emerald-600/25 hover:scale-105 active:scale-95 border border-emerald-400/30 shrink-0"
              title="أضف عقارك مجاناً للمراجعة والنشر"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>أضف عقارك</span>
            </Link>

            {/* Compact WhatsApp CTA */}
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-95 shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>واتساب</span>
            </a>
          </div>

          {/* Mobile Actions Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Currency Fast Switcher */}
            <button
              onClick={() => {
                const nextCurrency: CurrencyCode =
                  currency === 'USD' ? 'SYP' : currency === 'SYP' ? 'EUR' : 'USD';
                setCurrency(nextCurrency);
              }}
              className={`px-2 py-1 rounded-lg text-xs font-bold border flex items-center gap-1 ${
                scrolled
                  ? 'bg-slate-100 text-slate-800 border-slate-200'
                  : 'bg-white/10 text-white border-white/20'
              }`}
              title="تغيير العملة"
            >
              <span className="text-emerald-400 font-bold font-mono">
                {currentCurrencyObj.symbol}
              </span>
              <span>{currency}</span>
            </button>

            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-emerald-600 text-white shadow-sm"
              title="تواصل مباشر عبر واتساب"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 rounded-lg transition-colors ${
                scrolled ? 'bg-slate-100 text-slate-700' : 'bg-white/10 text-white backdrop-blur-md'
              }`}
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[58px] bg-slate-900/98 backdrop-blur-2xl border-b border-slate-800 text-white p-6 shadow-2xl animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-3">
            {/* Currency Bar in Mobile Menu */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80 mb-2">
              <span className="text-xs text-slate-300 font-semibold">عملة الأسعار:</span>
              <div className="flex gap-1">
                {(['USD', 'SYP', 'EUR'] as CurrencyCode[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-2.5 py-1 text-xs rounded-xl font-bold transition-colors ${
                      currency === c ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {c === 'USD' ? '$ USD' : c === 'SYP' ? 'ل.س' : '€ EUR'}
                  </button>
                ))}
              </div>
            </div>

            {/* Add Property Button in Mobile Menu */}
            <Link
              href="/add-property"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs text-center shadow-lg shadow-emerald-600/30 mb-2"
            >
              <Plus className="w-4 h-4" />
              <span>أضف عقارك مجاناً (إعلان جديد)</span>
            </Link>

            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold hover:text-emerald-400 py-2 border-b border-slate-800"
            >
              الرئيسية
            </Link>
            <Link
              href="/properties"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold hover:text-emerald-400 py-2 border-b border-slate-800"
            >
              تصفح كافة العقارات
            </Link>
            <Link
              href="/provinces"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold hover:text-emerald-400 py-2 border-b border-slate-800"
            >
              المحافظات والمناطق
            </Link>
            <Link
              href="/agencies"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold hover:text-emerald-400 py-2 border-b border-slate-800"
            >
              دليل المكاتب المعتمدة
            </Link>
            <Link
              href="/ai-assistant"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenAI && window.location.pathname === '/') {
                  onOpenAI();
                }
              }}
              className="flex items-center justify-between text-sm font-semibold text-amber-400 py-2 border-b border-slate-800"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                المساعد الذكي (AI)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                ميزة ذكية
              </span>
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold hover:text-emerald-400 py-2 border-b border-slate-800"
            >
              عن المنصة
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold hover:text-emerald-400 py-2 border-b border-slate-800"
            >
              اتصل بنا
            </Link>
            <Link
              href="/admin/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-emerald-400 py-2 border-b border-slate-800"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>لوحة تحكم الإدارة</span>
            </Link>

            <div className="pt-2">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>محادثة واتساب فورية</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
