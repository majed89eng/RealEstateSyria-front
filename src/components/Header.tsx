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
  User,
  LogOut,
  LayoutDashboard,
  Heart,
  Briefcase,
  FileSpreadsheet,
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { useAuth } from '../context/AuthContext';
import { CurrencyCode } from '../types/property';

interface HeaderProps {
  onOpenAI?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAI }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState<boolean>(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);
  const { currency, setCurrency } = useCurrency();
  const { user, isAuthenticated, logout } = useAuth();

  const currencyDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        currencyDropdownRef.current &&
        !currencyDropdownRef.current.contains(event.target as Node)
      ) {
        setCurrencyDropdownOpen(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
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
          ? 'bg-slate-950/80 backdrop-blur-2xl border-b border-slate-800/80 shadow-2xl py-2.5 text-white ring-1 ring-white/5'
          : 'bg-gradient-to-b from-slate-950/90 via-slate-900/50 to-transparent py-3.5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Clean Minimalist Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30 group-hover:scale-105 transition-transform duration-200 border border-emerald-400/30">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-lg sm:text-xl font-black font-alexandria tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              عقارات سوريا
            </span>
          </Link>

          {/* Desktop Streamlined Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-semibold">
            <Link
              href="/"
              className="transition-colors text-slate-200 hover:text-emerald-400 font-medium"
            >
              الرئيسية
            </Link>
            <Link
              href="/properties"
              className="transition-colors text-slate-200 hover:text-emerald-400 font-medium"
            >
              العقارات
            </Link>
            <Link
              href="/provinces"
              className="transition-colors text-slate-200 hover:text-emerald-400 font-medium"
            >
              المحافظات
            </Link>
            <Link
              href="/agencies"
              className="transition-colors text-slate-200 hover:text-emerald-400 font-medium"
            >
              المكاتب المعتمدة
            </Link>
            <Link
              href="/request-property"
              className="transition-colors text-slate-200 hover:text-emerald-400 font-medium flex items-center gap-1"
            >
              <span>اطلب عقارك</span>
              <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[10px] rounded-full border border-emerald-500/30">جديد</span>
            </Link>
            <Link
              href="/ai-assistant"
              onClick={(e) => {
                if (onOpenAI && window.location.pathname === '/') {
                  e.preventDefault();
                  onOpenAI();
                }
              }}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 transition-all text-xs shimmer-badge-wrapper"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              <span>المساعد الذكي</span>
            </Link>
          </nav>

          {/* Right Actions: Currency + User Profile / Login + CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Compact Currency Dropdown */}
            <div className="relative" ref={currencyDropdownRef}>
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-800 bg-slate-900/80 hover:bg-slate-850 text-white backdrop-blur-md transition-all"
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
                <div className="absolute left-0 mt-1.5 w-44 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-800 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl">
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
                          ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/30'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-emerald-400 w-5 text-center font-black">
                          {opt.symbol}
                        </span>
                        <span>{opt.label}</span>
                      </div>
                      {currency === opt.code && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile Dropdown OR Login Button */}
            {isAuthenticated && user ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-bold border border-slate-800 bg-slate-900/80 hover:bg-slate-850 text-white backdrop-blur-md transition-all"
                >
                  <img
                    src={
                      user.avatar ||
                      (user.role === 'agency'
                        ? 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=150&q=80'
                        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80')
                    }
                    alt={user.name}
                    className="w-5 h-5 rounded-full object-cover border border-emerald-400"
                  />
                  <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown
                    className={`w-3 h-3 opacity-60 transition-transform duration-200 ${
                      userDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* User Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute left-0 mt-1.5 w-56 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl">
                    <div className="px-3 py-2 border-b border-slate-800 mb-1">
                      <div className="font-bold text-xs text-white truncate">{user.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
                      <div className="mt-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                          {user.role === 'agency'
                            ? 'مكتب عقاري 🛡️'
                            : user.role === 'admin'
                            ? 'إدارة المنصة'
                            : 'حساب مستخدم'}
                        </span>
                      </div>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
                      <span>لوحة التحكم والملف</span>
                    </Link>

                    {user.role === 'admin' && (
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-amber-300 hover:bg-amber-950/40 transition-colors"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>لوحة تحكم الإدارة</span>
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 transition-colors mt-1 border-t border-slate-800"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-400" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-800 bg-slate-900/80 hover:bg-slate-850 text-white backdrop-blur-md transition-all"
                title="تسجيل الدخول أو إنشاء حساب"
              >
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span>دخول / حساب</span>
              </Link>
            )}

            {/* Primary Add Property CTA Button */}
            <Link
              href="/add-property"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs transition-all duration-200 shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 border border-emerald-400/30 shrink-0"
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
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-xs border border-slate-800 transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-95 shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>واتساب</span>
            </a>
          </div>

          {/* Mobile Actions Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile User / Login Indicator */}
            {isAuthenticated && user ? (
              <Link
                href="/dashboard"
                className="p-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 flex items-center gap-1 text-xs px-2"
              >
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span className="max-w-[60px] truncate">{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="p-1.5 rounded-lg bg-slate-900 text-slate-200 border border-slate-800 text-xs"
                title="تسجيل الدخول"
              >
                <User className="w-4 h-4 text-emerald-400" />
              </Link>
            )}

            {/* Mobile Currency Fast Switcher */}
            <button
              onClick={() => {
                const nextCurrency: CurrencyCode =
                  currency === 'USD' ? 'SYP' : currency === 'SYP' ? 'EUR' : 'USD';
                setCurrency(nextCurrency);
              }}
              className="px-2 py-1 rounded-lg text-xs font-bold border border-slate-800 bg-slate-900 text-white flex items-center gap-1"
              title="تغيير العملة"
            >
              <span className="text-emerald-400 font-bold font-mono">
                {currentCurrencyObj.symbol}
              </span>
              <span>{currency}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-white transition-colors"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[58px] bg-slate-950/98 backdrop-blur-2xl border-b border-slate-800 text-white p-6 shadow-2xl animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-3">
            {/* User Profile Bar in Mobile Menu */}
            {isAuthenticated && user ? (
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <img
                    src={
                      user.avatar ||
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
                    }
                    alt={user.name}
                    className="w-10 h-10 rounded-xl object-cover border border-emerald-400"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">{user.name}</div>
                    <div className="text-[10px] text-emerald-400 font-semibold">
                      {user.role === 'agency'
                        ? 'مكتب عقاري معتمد 🛡️'
                        : user.role === 'admin'
                        ? 'مدير المنصة'
                        : 'عضو مسجل'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow"
                  >
                    لوحة التحكم
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="p-1.5 rounded-xl bg-slate-800 text-rose-400"
                    title="خروج"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between mb-2">
                <div>
                  <div className="text-xs font-bold text-white">حساب المستخدم والمكاتب</div>
                  <div className="text-[11px] text-slate-400">سجل الدخول لإدارة عقاراتك ومفضلتك</div>
                </div>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow"
                >
                  تسجيل الدخول
                </Link>
              </div>
            )}

            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3.5 rounded-xl hover:bg-slate-900 text-slate-200 font-bold text-sm transition-colors"
            >
              الرئيسية
            </Link>

            <Link
              href="/properties"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3.5 rounded-xl hover:bg-slate-900 text-slate-200 font-bold text-sm transition-colors"
            >
              كافة العقارات المتاحة
            </Link>

            <Link
              href="/provinces"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3.5 rounded-xl hover:bg-slate-900 text-slate-200 font-bold text-sm transition-colors"
            >
              دليل المحافظات السورية
            </Link>

            <Link
              href="/agencies"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3.5 rounded-xl hover:bg-slate-900 text-slate-200 font-bold text-sm transition-colors"
            >
              دليل المكاتب والشركات المعتمدة
            </Link>

            <Link
              href="/request-property"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-bold text-sm transition-colors flex items-center justify-between"
            >
              <span>اطلب عقارك الخاص (للإدارة مباشرة)</span>
              <span className="text-[10px] bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full font-black">جديد</span>
            </Link>

            <Link
              href="/ai-assistant"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 font-bold text-sm transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>المساعد العقاري الذكي (AI)</span>
              </div>
              <span className="text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full font-black">ذكاء اصطناعي</span>
            </Link>

            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3.5 rounded-xl hover:bg-slate-900 text-slate-400 text-xs transition-colors"
              >
                عن منصة عقارات سوريا
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3.5 rounded-xl hover:bg-slate-900 text-slate-400 text-xs transition-colors"
              >
                اتصل بنا
              </Link>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <Link
                href="/add-property"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-center text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>أضف عقارك مجاناً</span>
              </Link>

              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white font-bold text-center text-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>تواصل مع الإدارة عبر واتساب</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
