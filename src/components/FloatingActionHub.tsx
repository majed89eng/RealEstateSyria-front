'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  Heart,
  Scale,
  X,
  MessageCircle,
  Trash2,
  ExternalLink,
  ChevronLeft,
  Sun,
  ShieldCheck,
  Building,
  Maximize2,
  Bed,
  Bath,
  Layers,
  Sparkles,
  ArrowRight,
  Plus,
} from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useCurrency } from '../context/CurrencyContext';
import { Property } from '../types/property';

interface Props {
  allProperties?: Property[];
}

export const FloatingActionHub: React.FC<Props> = ({ allProperties = [] }) => {
  const {
    favorites,
    toggleFavorite,
    favoritesCount,
    comparisonList,
    removeFromComparison,
    clearComparison,
    isComparisonModalOpen,
    setIsComparisonModalOpen,
    isFavoritesDrawerOpen,
    setIsFavoritesDrawerOpen,
    generateFavoritesWhatsAppUrl,
  } = useFavorites();

  const { currency, formatPrice } = useCurrency();

  const favoriteProperties = allProperties.filter((p) => favorites.includes(p.id));
  const favoritesWhatsAppUrl = generateFavoritesWhatsAppUrl(allProperties, currency);

  // Lock background body scroll when comparison modal or favorites drawer is open
  useEffect(() => {
    if (isComparisonModalOpen || isFavoritesDrawerOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isComparisonModalOpen, isFavoritesDrawerOpen]);

  // Focus table container when modal opens so arrow keys scroll the modal immediately
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isComparisonModalOpen) {
      const timer = setTimeout(() => {
        scrollContainerRef.current?.focus();
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [isComparisonModalOpen]);

  // Close modals on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isComparisonModalOpen) setIsComparisonModalOpen(false);
        if (isFavoritesDrawerOpen) setIsFavoritesDrawerOpen(false);
      }
    };
    if (isComparisonModalOpen || isFavoritesDrawerOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isComparisonModalOpen, isFavoritesDrawerOpen, setIsComparisonModalOpen, setIsFavoritesDrawerOpen]);

  return (
    <>
      {/* 1. Floating Bottom Bar (Appears when Favorites > 0 or Comparison > 0) */}
      {(favoritesCount > 0 || comparisonList.length > 0) && (
        <aside
          aria-label="شريط الإجراءات السريعة"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-950/90 text-white border border-slate-700/80 shadow-2xl rounded-full px-5 py-2.5 backdrop-blur-xl flex items-center gap-4 animate-in slide-in-from-bottom-5 duration-300 ring-4 ring-emerald-500/10 max-w-[95vw]"
        >
          {/* Favorites Pill Button */}
          {favoritesCount > 0 && (
            <button
              type="button"
              onClick={() => setIsFavoritesDrawerOpen(true)}
              className="flex items-center gap-2 text-xs font-bold text-slate-200 hover:text-white transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-black text-xs">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              </div>
              <span>المفضلة ({favoritesCount})</span>
            </button>
          )}

          {favoritesCount > 0 && comparisonList.length > 0 && (
            <div className="w-px h-4 bg-slate-700" />
          )}

          {/* Comparison Pill Button */}
          {comparisonList.length > 0 && (
            <button
              type="button"
              onClick={() => setIsComparisonModalOpen(true)}
              className="flex items-center gap-2 text-xs font-bold text-slate-200 hover:text-emerald-400 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xs">
                <Scale className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span>مقارنة ({comparisonList.length})</span>
            </button>
          )}

          {/* Direct WhatsApp Share of Favorites */}
          {favoritesCount > 0 && (
            <a
              href={favoritesWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-extrabold shadow-sm transition-transform hover:scale-105"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>إرسال المفضلة لواتساب</span>
            </a>
          )}
        </aside>
      )}

      {/* 2. Floating Live WhatsApp Bubble in Bottom Corner */}
      <a
        href="https://wa.me/963988123456?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%B9%D9%82%D8%A7%D8%B1%D8%A7%D8%AA%20%D8%B3%D9%88%D8%B1%D9%8A%D8%A9"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل مباشر عبر واتساب"
        className="fixed bottom-6 left-6 z-40 group flex items-center gap-2.5 p-3 sm:px-4 sm:py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-xl shadow-emerald-950/30 transition-all duration-300 hover:scale-105"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-300 rounded-full animate-ping" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-emerald-600" />
        </div>
        <div className="hidden sm:flex flex-col text-right leading-tight">
          <span className="text-[10px] text-emerald-100 font-medium">متواجدون لخدمتكم 🟢</span>
          <span className="text-xs font-black font-alexandria">محادثة واتساب فورية</span>
        </div>
      </a>

      {/* 3. Comparison Side-by-Side Modal */}
      {isComparisonModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="comparison-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsComparisonModalOpen(false);
            }
          }}
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            className="relative w-full max-w-5xl bg-slate-900 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden max-h-[88vh] flex flex-col my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header (Fixed) */}
            <div className="px-6 py-4 bg-slate-850 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h2 id="comparison-modal-title" className="text-base font-bold font-alexandria text-white">
                    مقارنة العقارات المختارة ({comparisonList.length})
                  </h2>
                  <span className="text-[11px] text-slate-400">مقارنة فنية وهندسية وسعرية دقيقة</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {comparisonList.length > 0 && (
                  <button
                    type="button"
                    onClick={clearComparison}
                    className="text-xs text-rose-400 hover:text-rose-300 font-bold px-3 py-1.5 rounded-xl hover:bg-rose-500/10 transition-colors cursor-pointer"
                  >
                    إفراغ المقارنة
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsComparisonModalOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="إغلاق النافذة"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Hint Banner when exactly 1 property is in comparison (Fixed) */}
            {comparisonList.length === 1 && (
              <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>لقد أضفت عقاراً واحداً. يمكنك اختيار حتى 3 عقارات أخرى من الموقع للمقارنة بينها جنباً إلى جنب.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsComparisonModalOpen(false)}
                  className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs whitespace-nowrap transition-colors cursor-pointer shrink-0"
                >
                  + تصفح لإضافة عقار آخر
                </button>
              </div>
            )}

            {/* Modal Table Body (Scrollable container with direct focus) */}
            {comparisonList.length === 0 ? (
              <div className="p-12 text-center space-y-4 flex-1 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto text-slate-500">
                  <Scale className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-base text-slate-200 font-bold">لم تختر أي عقارات للمقارنة بعد.</p>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                    اضغط على أيقونة الميزان ⚖️ في بطاقة أي عقار لإضافته إلى قائمة المقارنة الفورية.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsComparisonModalOpen(false)}
                  className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  إغلاق والعودة لتصفح العقارات
                </button>
              </div>
            ) : (
              <div
                ref={scrollContainerRef}
                tabIndex={0}
                className="p-4 sm:p-6 overflow-y-auto overflow-x-auto flex-1 focus:outline-none scrollbar-thin select-text"
              >
                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="p-3 text-slate-400 font-bold w-40 sticky right-0 bg-slate-900 z-10">العقار</th>
                      {comparisonList.map((p) => (
                        <th key={p.id} className="p-3 min-w-[200px] text-slate-100">
                          <div className="space-y-2">
                            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800">
                              <img
                                src={p.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80'}
                                alt={p.title}
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => removeFromComparison(p.id)}
                                className="absolute top-1.5 right-1.5 p-1 rounded-full bg-slate-950/80 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                                title="إزالة من المقارنة"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <span className="font-mono text-[10px] text-amber-400 font-bold block">
                              {p.propertyCode}
                            </span>
                            <h4 className="font-bold text-xs text-white line-clamp-2">{p.title}</h4>
                          </div>
                        </th>
                      ))}

                      {/* Add Slot Placeholder when only 1 property is added */}
                      {comparisonList.length === 1 && (
                        <th className="p-3 min-w-[200px] text-slate-100 align-top">
                          <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500/50 rounded-2xl p-4 text-center space-y-3 bg-slate-950/40 transition-colors">
                            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                              <Plus className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-xs font-bold text-slate-300 block">العقار الثاني</span>
                              <span className="text-[10px] text-slate-500">اختر عقاراً من الكتالوج</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setIsComparisonModalOpen(false)}
                              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-emerald-400 border border-slate-700 text-xs font-bold transition-all cursor-pointer"
                            >
                              + تصفح العقارات
                            </button>
                          </div>
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    <tr>
                      <td className="p-3 font-bold text-slate-400">السعر المطلوب</td>
                      {comparisonList.map((p) => (
                        <td key={p.id} className="p-3 font-black font-alexandria text-emerald-400 text-sm">
                          {formatPrice(p.priceUsd)}
                        </td>
                      ))}
                      {comparisonList.length === 1 && (
                        <td className="p-3 text-slate-500 text-center font-mono">-</td>
                      )}
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-400">سعر المتر التقديري</td>
                      {comparisonList.map((p) => (
                        <td key={p.id} className="p-3 font-mono font-bold text-slate-200">
                          {p.area > 0 ? `${formatPrice(Math.round(p.priceUsd / p.area))} / م²` : '-'}
                        </td>
                      ))}
                      {comparisonList.length === 1 && (
                        <td className="p-3 text-slate-500 text-center font-mono">-</td>
                      )}
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-400">الموقع</td>
                      {comparisonList.map((p) => (
                        <td key={p.id} className="p-3 font-medium">
                          {p.region} ({p.governorate})
                        </td>
                      ))}
                      {comparisonList.length === 1 && (
                        <td className="p-3 text-slate-500 text-center font-mono">-</td>
                      )}
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-400">المساحة</td>
                      {comparisonList.map((p) => (
                        <td key={p.id} className="p-3 font-bold">
                          {p.area} م²
                        </td>
                      ))}
                      {comparisonList.length === 1 && (
                        <td className="p-3 text-slate-500 text-center font-mono">-</td>
                      )}
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-400">الغرف والحمامات</td>
                      {comparisonList.map((p) => (
                        <td key={p.id} className="p-3">
                          {p.bedrooms} غرف • {p.bathrooms} حمامات
                        </td>
                      ))}
                      {comparisonList.length === 1 && (
                        <td className="p-3 text-slate-500 text-center font-mono">-</td>
                      )}
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-400">الطابق والاتجاه</td>
                      {comparisonList.map((p) => (
                        <td key={p.id} className="p-3">
                          {p.floor} ({p.direction})
                        </td>
                      ))}
                      {comparisonList.length === 1 && (
                        <td className="p-3 text-slate-500 text-center font-mono">-</td>
                      )}
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-400">طاقة شمسية</td>
                      {comparisonList.map((p) => (
                        <td key={p.id} className="p-3">
                          {p.hasSolar ? (
                            <span className="text-amber-400 font-bold">متوفرة</span>
                          ) : (
                            <span className="text-slate-500">غير متوفرة</span>
                          )}
                        </td>
                      ))}
                      {comparisonList.length === 1 && (
                        <td className="p-3 text-slate-500 text-center font-mono">-</td>
                      )}
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-400">سند الملكية</td>
                      {comparisonList.map((p) => (
                        <td key={p.id} className="p-3 text-emerald-400 font-medium">
                          {p.ownershipType}
                        </td>
                      ))}
                      {comparisonList.length === 1 && (
                        <td className="p-3 text-slate-500 text-center font-mono">-</td>
                      )}
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-400">رابط وتفاصيل</td>
                      {comparisonList.map((p) => (
                        <td key={p.id} className="p-3">
                          <Link
                            href={`/properties/${p.slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                          >
                            <span>فتح صفحة العقار</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      ))}
                      {comparisonList.length === 1 && (
                        <td className="p-3 text-slate-500 text-center font-mono">-</td>
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Modal Footer with Clear Close Button */}
            <div className="px-6 py-4 bg-slate-850 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-emerald-400" />
                <span>يمكنك مقارنة حتى 4 عقارات في وقت واحد</span>
              </div>
              <div className="flex items-center gap-2">
                {comparisonList.length > 0 && (
                  <button
                    type="button"
                    onClick={clearComparison}
                    className="px-4 py-2 rounded-xl text-xs text-rose-400 hover:text-rose-300 font-bold hover:bg-rose-500/10 transition-colors border border-rose-500/20"
                  >
                    مسح المقارنة
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsComparisonModalOpen(false)}
                  className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  إغلاق ومتابعة التصفح
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Favorites Drawer Sidebar */}
      {isFavoritesDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="favorites-drawer-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsFavoritesDrawerOpen(false);
            }
          }}
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
        >
          <div className="w-full max-w-md bg-slate-900 text-slate-100 h-full p-6 flex flex-col justify-between shadow-2xl border-r border-slate-800 overflow-y-auto animate-in slide-in-from-left duration-300">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                    <Heart className="w-4 h-4 fill-rose-500" />
                  </div>
                  <div>
                    <h2 id="favorites-drawer-title" className="text-base font-bold font-alexandria text-white">
                      العقارات المحفوظة في المفضلة
                    </h2>
                    <span className="text-xs text-slate-400">{favoritesCount} عقارات محفوظة</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsFavoritesDrawerOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              {favoriteProperties.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <Heart className="w-12 h-12 text-slate-700 mx-auto" />
                  <p className="text-sm font-bold text-slate-400">قائمة المفضلة فارغة حالياً.</p>
                  <p className="text-xs text-slate-500">انقر على أيقونة القلب في أي عقار لحفظه ومراجعته لاحقاً.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {favoriteProperties.map((prop) => (
                    <div
                      key={prop.id}
                      className="p-3 rounded-2xl bg-slate-850 border border-slate-800 flex gap-3 group relative hover:border-emerald-500/40 transition-colors"
                    >
                      <div className="w-24 h-20 rounded-xl overflow-hidden bg-slate-800 shrink-0">
                        <img
                          src={prop.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=300&q=80'}
                          alt={prop.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] text-amber-400 font-bold">
                            {prop.propertyCode}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleFavorite(prop.id)}
                            className="text-slate-500 hover:text-rose-400 transition-colors"
                            title="إزالة من المفضلة"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <Link
                          href={`/properties/${prop.slug}`}
                          onClick={() => setIsFavoritesDrawerOpen(false)}
                          className="text-xs font-bold text-white hover:text-emerald-400 line-clamp-1 block"
                        >
                          {prop.title}
                        </Link>

                        <span className="text-[11px] text-slate-400 block">{prop.region}</span>

                        <span className="text-xs font-black text-emerald-400 font-alexandria block">
                          {formatPrice(prop.priceUsd)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            {favoriteProperties.length > 0 && (
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <a
                  href={favoritesWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition-transform hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>إرسال سلة المفضلة عبر واتساب</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
