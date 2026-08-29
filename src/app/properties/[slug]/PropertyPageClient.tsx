'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Maximize2,
  Bed,
  Bath,
  Layers,
  Compass,
  ShieldCheck,
  Check,
  Star,
  Sun,
  Car,
  Zap,
  Share2,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Building,
  CheckCircle2,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  Heart,
  Scale,
  HardHat,
  Video,
  Printer,
  BadgeCheck,
  FileCheck,
} from 'lucide-react';
import { Property } from '@/types/property';
import { useCurrency } from '@/context/CurrencyContext';
import { useFavorites } from '@/context/FavoritesContext';
import { propertyService } from '@/services/propertyService';
import { leadService } from '@/services/leadService';
import { PropertyCard } from '@/components/PropertyCard';
import { FloatingActionHub } from '@/components/FloatingActionHub';
import { NeighborhoodAmenitiesGuide } from '@/components/NeighborhoodAmenitiesGuide';
import { PropertyPdfExport } from '@/components/PropertyPdfExport';

interface Props {
  property: Property;
  similarProperties: Property[];
}

export const PropertyPageClient: React.FC<Props> = ({ property, similarProperties }) => {
  const { currency, formatPrice } = useCurrency();
  const { isFavorite, toggleFavorite, isInComparison, addToComparison, removeFromComparison } =
    useFavorites();

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isFullscreenLightbox, setIsFullscreenLightbox] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const favorited = isFavorite(property.id);
  const inCompare = isInComparison(property.id);

  // Form State
  const [leadName, setLeadName] = useState<string>('');
  const [leadPhone, setLeadPhone] = useState<string>('');
  const [leadNotes, setLeadNotes] = useState<string>('');
  const [isSubmittingLead, setIsSubmittingLead] = useState<boolean>(false);
  const [leadSubmittedSuccess, setLeadSubmittedSuccess] = useState<boolean>(false);

  const images =
    property.images && property.images.length > 0
      ? property.images
      : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'];

  const whatsappUrl = propertyService.generateWhatsAppUrl(property, undefined, currency);
  const videoRequestWhatsappUrl = propertyService.generateVideoRequestWhatsAppUrl(property);
  const phoneNumber = '+963988123456';
  const phoneCallUrl = `tel:${phoneNumber}`;

  const isSold = property.availabilityStatus === 'sold';
  const isRented = property.availabilityStatus === 'rented';
  const isUnavailable = isSold || isRented;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    setIsSubmittingLead(true);
    leadService.createLead({
      propertyId: property.id,
      propertyCode: property.propertyCode,
      propertyTitle: property.title,
      name: leadName,
      phone: leadPhone,
      source: 'website',
      message: leadNotes || 'طلب معاينة واستفسار من صفحة تفاصيل العقار.',
    });

    setTimeout(() => {
      setIsSubmittingLead(false);
      setLeadSubmittedSuccess(true);
      setLeadName('');
      setLeadPhone('');
      setLeadNotes('');
    }, 600);
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-10">
      {/* Top Banner: Title, Code, Status, Trust Badge & Share */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-800/80">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-slate-900 text-amber-300 border border-slate-700 shadow-sm">
              {property.propertyCode}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                isSold
                  ? 'bg-red-600 text-white'
                  : isRented
                  ? 'bg-amber-600 text-white'
                  : property.contractType === 'sale'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-teal-600 text-white'
              }`}
            >
              {isSold
                ? 'تم البيع'
                : isRented
                ? 'تم التأجير'
                : property.contractType === 'sale'
                ? 'للبيـع'
                : 'للإيجـار'}
            </span>

            {/* Visual Trust Badge */}
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 shadow-sm">
              <BadgeCheck className="w-4 h-4 text-emerald-400" />
              <span>عقار موثق ومفحوص الملكية 🟢</span>
            </span>

            {/* Last Price Update Badge */}
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-900 text-slate-300 border border-slate-800 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>تم تدقيق السعر حديثاً</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-alexandria leading-[1.4]">
            {property.title}
          </h1>

          <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm font-medium">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {property.locationDetails} ({property.region} - {property.governorate})
            </span>
          </div>
        </div>

        {/* Price & Actions Box */}
        <div className="flex flex-col items-start md:items-end gap-3 min-w-[260px]">
          <div className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl w-full text-left md:text-right">
            <div className="flex items-center justify-between gap-4 mb-1">
              <span className="text-xs text-slate-400 font-semibold">
                {property.contractType === 'rent' ? 'الإيجار المطلوب' : 'السعر المطلوب'}
              </span>
              {property.area > 0 && property.contractType === 'sale' && !isUnavailable && (
                <span className="text-[11px] text-emerald-400/90 font-mono font-bold">
                  ≈ {formatPrice(Math.round(property.priceUsd / property.area))}/م²
                </span>
              )}
            </div>
            <span
              className={`text-2xl sm:text-3xl font-black font-alexandria tracking-tight ${
                isUnavailable ? 'text-slate-500 line-through' : 'text-emerald-400'
              }`}
            >
              {formatPrice(property.priceUsd)}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full">
            {/* Toggle Favorite Button */}
            <button
              type="button"
              onClick={() => toggleFavorite(property.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl text-xs font-bold border transition-all ${
                favorited
                  ? 'bg-rose-950/60 border-rose-500/40 text-rose-400 shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
              title={favorited ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{favorited ? 'محفوظ' : 'حفظ'}</span>
            </button>

            {/* Toggle Compare Button */}
            <button
              type="button"
              onClick={() => {
                if (inCompare) {
                  removeFromComparison(property.id);
                } else {
                  addToComparison(property);
                }
              }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl text-xs font-bold border transition-all ${
                inCompare
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 shadow-sm'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
              title={inCompare ? 'مدرج بالمقارنة' : 'إضافة للمقارنة'}
            >
              <Scale className="w-4 h-4 text-emerald-400" />
              <span>{inCompare ? 'مقارن' : 'مقارنة'}</span>
            </button>

            {/* Share Link Button */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-800 transition-colors"
              title="مشاركة رابط العقار"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? 'منسوخ' : 'مشاركة'}</span>
            </button>

            {/* PDF Export Component */}
            <PropertyPdfExport property={property} />
          </div>
        </div>
      </div>

      {/* Main Grid: Gallery + Sidebar CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Gallery & Details (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Gallery Section */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] bg-slate-950 rounded-3xl overflow-hidden group shadow-2xl border border-slate-800">
              <img
                src={images[activeImageIndex]}
                alt={`${property.title} - صورة ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Prev / Next controls */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white backdrop-blur-md transition-all shadow-lg hover:scale-110"
                    aria-label="الصورة السابقة"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white backdrop-blur-md transition-all shadow-lg hover:scale-110"
                    aria-label="الصورة التالية"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Action overlays */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <button
                  type="button"
                  onClick={() => setIsFullscreenLightbox(true)}
                  className="pointer-events-auto px-3.5 py-2 rounded-2xl bg-slate-950/80 text-white text-xs font-bold backdrop-blur-md hover:bg-slate-900 transition-colors flex items-center gap-1.5 shadow-md"
                >
                  <Maximize className="w-4 h-4" />
                  <span>عرض ملء الشاشة ({images.length} صور)</span>
                </button>

                <div className="px-3.5 py-1.5 rounded-2xl bg-slate-950/80 text-white text-xs font-bold backdrop-blur-md font-mono">
                  {activeImageIndex + 1} / {images.length}
                </div>
              </div>
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-28 h-20 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-emerald-500 ring-2 ring-emerald-500/30 scale-105'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="مصغرة" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Technical Specs Cards Grid */}
          <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl space-y-5">
            <h2 className="text-lg font-bold text-white font-alexandria flex items-center gap-2">
              <Building className="w-5 h-5 text-emerald-400" />
              <span>المواصفات الفنية والهندسية</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block">المساحة الإجمالية</span>
                <span className="text-base font-bold text-white flex items-center gap-1.5">
                  <Maximize2 className="w-4 h-4 text-emerald-400" />
                  {property.area} م²
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block">عدد الغرف</span>
                <span className="text-base font-bold text-white flex items-center gap-1.5">
                  <Bed className="w-4 h-4 text-emerald-400" />
                  {property.bedrooms} غرف
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block">عدد الحمامات</span>
                <span className="text-base font-bold text-white flex items-center gap-1.5">
                  <Bath className="w-4 h-4 text-emerald-400" />
                  {property.bathrooms} حمام
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block">الطابق</span>
                <span className="text-base font-bold text-white flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  {property.floor}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block">الاتجاه</span>
                <span className="text-base font-bold text-white flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-emerald-400" />
                  {property.direction}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 col-span-2">
                <span className="text-xs text-slate-400 block">نوع الملكية والسند</span>
                <span className="text-base font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  {property.ownershipType}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block">المحافظة</span>
                <span className="text-base font-bold text-white">{property.governorate}</span>
              </div>
            </div>
          </div>

          {/* Off-Plan Project Investment Section */}
          {property.isOffPlan && (
            <div className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 rounded-3xl p-6 sm:p-7 border border-amber-500/30 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-bold text-amber-300 font-alexandria flex items-center gap-2">
                  <HardHat className="w-5 h-5 text-amber-400" />
                  <span>مشروع استثماري على المخطط (قيد الإنشاء)</span>
                </h2>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-950 shadow-md">
                  تسليم بالتقسيط
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/20 space-y-1">
                  <span className="text-xs text-amber-400 font-bold block">موعد التسليم المتوقع</span>
                  <span className="text-sm sm:text-base font-extrabold text-white flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-400" />
                    {property.handoverDate || 'خلال 2026/2027'}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/20 space-y-1.5">
                  <span className="text-xs text-amber-400 font-bold block">نسبة الإنجاز الفعلي</span>
                  <div className="flex justify-between text-xs font-black text-slate-200">
                    <span>مرحلة التشييد</span>
                    <span className="text-amber-400">{property.constructionProgress || 35}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-amber-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${property.constructionProgress || 35}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/20 space-y-1">
                  <span className="text-xs text-amber-400 font-bold block">تسهيلات السداد والأقساط</span>
                  <span className="text-xs sm:text-sm font-bold text-white leading-snug block">
                    {property.paymentPlan || 'متوفر خطط دفع ميسرة'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Features and Amenities */}
          <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-white font-alexandria flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>المميزات والخدمات المتوفرة</span>
            </h2>

            <div className="flex flex-wrap gap-2.5">
              {property.features.map((feat, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-2xl bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 text-xs sm:text-sm font-bold flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-emerald-400" />
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl space-y-3">
            <h2 className="text-lg font-bold text-white font-alexandria">
              الوصف الكامل والتفاصيل
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-slate-950 p-5 rounded-2xl border border-slate-800">
              {property.description}
            </p>
          </div>

          {/* Neighborhood Amenities & Services Guide */}
          <NeighborhoodAmenitiesGuide
            governorate={property.governorate}
            region={property.region}
          />
        </div>

        {/* Right Column: Sticky Contact, Video Lead Magnet & Direct Phone CTA (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Primary Contact & Action Box */}
          <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <div className="w-11 h-11 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base font-alexandria text-white">إدارة منصة عقارات سوريا</h3>
                <span className="text-xs text-emerald-400 font-semibold">تواصل مباشر وسريع 🟢</span>
              </div>
            </div>

            {/* Video Walkthrough Request Lead Magnet */}
            <a
              href={videoRequestWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-transparent border border-amber-500/40 text-amber-300 hover:border-amber-400 transition-all duration-200 group shadow-md hover:scale-[1.01]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black group-hover:scale-110 transition-transform">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-white group-hover:text-amber-300 transition-colors">
                    طلب فيديو ومعاينة افتراضية
                  </div>
                  <div className="text-[11px] text-slate-400">إرسال مقطع فيديو كامل عبر واتساب</div>
                </div>
              </div>
              <ChevronLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
            </a>

            {/* WhatsApp Direct Chat Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm transition-all shadow-lg shadow-emerald-600/30 hover:scale-[1.01] active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              <span>تواصل فوري عبر واتساب</span>
            </a>

            {/* Direct Phone Call Button */}
            <a
              href={phoneCallUrl}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 transition-all hover:scale-[1.01]"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>اتصال هاتفي مباشر ({phoneNumber})</span>
            </a>
          </div>

          {/* Lead Booking / Inquiry Form */}
          <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-white font-alexandria font-bold text-base">
              <Calendar className="w-5 h-5 text-emerald-400" />
              <span>حجز موعد معاينة ميدانية</span>
            </div>

            {leadSubmittedSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3 animate-in zoom-in-95 duration-150">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-sm text-white">تم استلام طلب المعاينة بنجاح!</h4>
                <p className="text-xs text-slate-300">
                  سيتواصل معكم فريق المنصة لترتيب الوقت الأنسب للمعاينة وتزويدكم بالوثائق.
                </p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">الاسم الكريم *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: أحمد العلي"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">رقم الهاتف / الواتساب *</label>
                  <input
                    type="tel"
                    required
                    placeholder="09xxxxxxxx أو رقم دولي"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">الوقت المفضل للمعاينة (اختياري)</label>
                  <textarea
                    rows={2}
                    placeholder="مثال: يوم الجمعة عصراً، أو الاستفسار عن تفاصيل إضافية..."
                    value={leadNotes}
                    onChange={(e) => setLeadNotes(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingLead}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/30"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmittingLead ? 'جاري الإرسال...' : 'تأكيد حجز المعاينة'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Similar Properties Section */}
      {similarProperties.length > 0 && (
        <section className="pt-10 border-t border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-alexandria">
                عقارات مشابهة في {property.governorate} ({property.region})
              </h2>
              <p className="text-xs text-slate-400 mt-1">عقارات من نفس الفئة والمنطقة قد تناسب طلبك</p>
            </div>
            <Link
              href={`/properties?gov=${encodeURIComponent(property.governorate)}&region=${encodeURIComponent(property.region)}`}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>عرض المزيد</span>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProperties.slice(0, 3).map((item) => (
              <PropertyCard key={item.id} property={item} onOpenDetail={() => {}} />
            ))}
          </div>
        </section>
      )}

      {/* Fullscreen Lightbox Overlay */}
      {isFullscreenLightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 animate-in fade-in duration-150">
          <button
            type="button"
            onClick={() => setIsFullscreenLightbox(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6 rotate-180" />
          </button>

          <div className="max-w-5xl max-h-[85vh] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <img
              src={images[activeImageIndex]}
              alt="صورة كاملة"
              className="max-w-full max-h-[85vh] object-contain"
            />
          </div>

          <div className="mt-4 flex items-center gap-6 text-white text-sm">
            <button
              type="button"
              onClick={prevImage}
              className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <span className="font-mono font-bold">
              {activeImageIndex + 1} من {images.length}
            </span>
            <button
              type="button"
              onClick={nextImage}
              className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Hub (Favorites, Comparison, Live WhatsApp) */}
      <FloatingActionHub />
    </div>
  );
};
