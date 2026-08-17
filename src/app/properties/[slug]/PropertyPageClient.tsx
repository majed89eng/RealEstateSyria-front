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
  Eye,
  Info,
  Heart,
  Scale,
} from 'lucide-react';
import { Property } from '@/types/property';
import { useCurrency } from '@/context/CurrencyContext';
import { useFavorites } from '@/context/FavoritesContext';
import { propertyService } from '@/services/propertyService';
import { leadService } from '@/services/leadService';
import { PropertyCard } from '@/components/PropertyCard';
import { FloatingActionHub } from '@/components/FloatingActionHub';

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

  // Viewing Request Form State
  const [leadName, setLeadName] = useState<string>('');
  const [leadPhone, setLeadPhone] = useState<string>('');
  const [leadNotes, setLeadNotes] = useState<string>('');
  const [isSubmittingLead, setIsSubmittingLead] = useState<boolean>(false);
  const [leadSubmittedSuccess, setLeadSubmittedSuccess] = useState<boolean>(false);

  const images = property.images && property.images.length > 0
    ? property.images
    : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'];

  const whatsappUrl = propertyService.generateWhatsAppUrl(property, undefined, currency);

  const isSold = property.availabilityStatus === 'sold';
  const isRented = property.availabilityStatus === 'rented';
  const isUnavailable = isSold || isRented;

  // Check if updated within 7 days
  const isRecentlyUpdated = () => {
    if (!property.updatedAt) return false;
    const diffDays = (new Date().getTime() - new Date(property.updatedAt).getTime()) / (1000 * 3600 * 24);
    return diffDays <= 7;
  };

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

  return (
    <div className="space-y-10">
      {/* Top Banner: Title, Code, Status & Share */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-200">
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
                  : 'bg-blue-600 text-white'
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

            {isRecentlyUpdated() && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-700 border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                تم التحديث مؤخراً
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-alexandria leading-tight">
            {property.title}
          </h1>

          <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {property.locationDetails} ({property.region} - {property.governorate})
            </span>
          </div>
        </div>

        {/* Price & Actions Box */}
        <div className="flex flex-col items-start md:items-end gap-3 min-w-[260px]">
          <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-sm w-full text-left md:text-right">
            <div className="flex items-center justify-between gap-4 mb-1">
              <span className="text-xs text-slate-400 font-semibold">
                {property.contractType === 'rent' ? 'الإيجار المطلوب' : 'السعر المطلوب'}
              </span>
              {property.area > 0 && property.contractType === 'sale' && !isUnavailable && (
                <span className="text-[11px] text-slate-500 font-mono font-bold">
                  ≈ {formatPrice(Math.round(property.priceUsd / property.area))}/م²
                </span>
              )}
            </div>
            <span
              className={`text-2xl sm:text-3xl font-black font-alexandria tracking-tight ${
                isUnavailable ? 'text-slate-400 line-through' : 'text-emerald-700'
              }`}
            >
              {formatPrice(property.priceUsd)}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 w-full">
            {/* Toggle Favorite Button */}
            <button
              type="button"
              onClick={() => toggleFavorite(property.id)}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl text-xs font-bold border transition-all ${
                favorited
                  ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              title={favorited ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span className="hidden sm:inline">{favorited ? 'محفوظ' : 'حفظ'}</span>
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
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl text-xs font-bold border transition-all ${
                inCompare
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              title={inCompare ? 'مدرج بالمقارنة' : 'إضافة للمقارنة'}
            >
              <Scale className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">{inCompare ? 'مقارن' : 'مقارنة'}</span>
            </button>

            {/* Share Link Button */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
              title="مشاركة رابط العقار"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedLink ? 'منسوخ' : 'مشاركة'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Gallery + Sidebar CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Gallery & Details (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Gallery Section */}
          <div className="space-y-3">
            {/* Big Active Image */}
            <div className="relative aspect-[16/10] bg-slate-900 rounded-3xl overflow-hidden group shadow-lg">
              <img
                src={images[activeImageIndex]}
                alt={`${property.title} - صورة ${activeImageIndex + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Prev / Next controls */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveImageIndex((prev) => (prev + 1) % images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white backdrop-blur-sm transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white backdrop-blur-sm transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Zoom Lightbox */}
              <button
                type="button"
                onClick={() => setIsFullscreenLightbox(true)}
                className="absolute bottom-4 left-4 px-3.5 py-2 rounded-xl bg-slate-900/80 text-white text-xs font-semibold backdrop-blur-md hover:bg-slate-900 transition-colors flex items-center gap-1.5"
              >
                <Maximize className="w-4 h-4" />
                <span>تكبير كامل الشاشة</span>
              </button>

              {/* Counter */}
              <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-xl bg-slate-900/80 text-white text-xs font-semibold backdrop-blur-md">
                {activeImageIndex + 1} / {images.length}
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
                        ? 'border-emerald-600 ring-4 ring-emerald-500/20'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="مصغرة" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Specs Matrix Cards */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 font-alexandria flex items-center gap-2">
              <Building className="w-5 h-5 text-emerald-600" />
              <span>المواصفات الفنية والهندسية</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs text-slate-500 block font-medium">المساحة الإجمالية</span>
                <span className="text-base font-bold text-slate-800 flex items-center gap-1.5">
                  <Maximize2 className="w-4 h-4 text-emerald-600" />
                  {property.area} م²
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs text-slate-500 block font-medium">غرف النوم</span>
                <span className="text-base font-bold text-slate-800 flex items-center gap-1.5">
                  <Bed className="w-4 h-4 text-emerald-600" />
                  {property.bedrooms} غرف
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs text-slate-500 block font-medium">الحمامات</span>
                <span className="text-base font-bold text-slate-800 flex items-center gap-1.5">
                  <Bath className="w-4 h-4 text-emerald-600" />
                  {property.bathrooms} حمام
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs text-slate-500 block font-medium">الطابق</span>
                <span className="text-base font-bold text-slate-800 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  {property.floor}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs text-slate-500 block font-medium">الاتجاه</span>
                <span className="text-base font-bold text-slate-800 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-emerald-600" />
                  {property.direction}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 col-span-2">
                <span className="text-xs text-slate-500 block font-medium">نوع الملكية وسند التمليك</span>
                <span className="text-base font-bold text-emerald-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  {property.ownershipType}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs text-slate-500 block font-medium">حالة الإكساء</span>
                <span className="text-base font-bold text-slate-800">
                  {property.finishingStatus === 'luxury'
                    ? 'سوبر ديلوكس'
                    : property.finishingStatus === 'finished'
                    ? 'جاهز للسكن'
                    : property.finishingStatus === 'semi_finished'
                    ? 'نصف إكساء'
                    : 'على العظم'}
                </span>
              </div>
            </div>
          </div>

          {/* Features and Amenities */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 font-alexandria flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>المميزات والخدمات المتوفرة</span>
            </h2>

            <div className="flex flex-wrap gap-2.5">
              {property.features.map((feat, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-2xl bg-emerald-50 text-emerald-900 border border-emerald-200/80 text-xs sm:text-sm font-bold flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-emerald-600" />
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-lg font-bold text-slate-900 font-alexandria">
              الوصف الكامل والتفاصيل
            </h2>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line bg-slate-50 p-5 rounded-2xl border border-slate-100">
              {property.description}
            </p>
          </div>
        </div>

        {/* Right Column: Sticky Contact & Viewing Request Form (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Direct WhatsApp CTA Card */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <MessageCircle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-base font-alexandria">تواصل فوري عبر واتساب</h3>
                <span className="text-xs text-emerald-100">مراسلة مباشرة مع الإدارة</span>
              </div>
            </div>

            <p className="text-xs text-emerald-50 leading-relaxed">
              {isUnavailable
                ? 'هذا العقار لم يعد متاحاً حالياً، اضغط أدناه للتواصل معنا لطلب عقار مطابق في نفس المنطقة.'
                : 'انقر للبدء بمحادثة فورية وسيقوم فريقنا بتزويدك بكافة الصور والفيديوهات وترتيب موعد معاينة ميدانية.'}
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-white text-emerald-900 font-black text-sm transition-transform hover:scale-[1.02] active:scale-95 shadow-md"
            >
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              <span>{isUnavailable ? 'طلب عقار مشابه' : 'تواصل عبر واتساب'}</span>
            </a>
          </div>

          {/* Lead Booking / Inquiry Form */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-slate-800 font-alexandria font-bold text-base">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <span>حجز موعد معاينة أو استفسار</span>
            </div>

            {leadSubmittedSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-sm font-bold">تم استلام طلبكم بنجاح!</p>
                <p className="text-xs text-slate-600">سيتواصل معكم مستشارنا العقاري خلال ساعات العمل.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الاسم الكامل *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: م. أحمد السعدي"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">رقم الهاتف / الواتساب *</label>
                  <input
                    type="tel"
                    required
                    placeholder="09XXXXXXXX"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ملاحظات أو موعد مفضل (اختياري)</label>
                  <textarea
                    rows={3}
                    placeholder="أرغب بالمعاينة يوم الجمعة بعد الظهر..."
                    value={leadNotes}
                    onChange={(e) => setLeadNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingLead}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmittingLead ? 'جاري الإرسال...' : 'إرسال طلب المعاينة'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Similar Properties Section */}
      {similarProperties && similarProperties.length > 0 && (
        <div className="pt-10 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-alexandria">
              عقارات مشابهة في {property.governorate}
            </h2>
            <Link
              href="/properties"
              className="text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              عرض كافة العقارات ←
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Overlay */}
      {isFullscreenLightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setIsFullscreenLightbox(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            ✕
          </button>

          <div className="max-w-6xl max-h-[85vh] overflow-hidden rounded-2xl">
            <img
              src={images[activeImageIndex]}
              alt="صورة كاملة"
              className="max-w-full max-h-[85vh] object-contain"
            />
          </div>

          <div className="mt-4 flex items-center gap-4 text-white text-sm">
            <button
              type="button"
              onClick={() => setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <span>
              {activeImageIndex + 1} من {images.length}
            </span>
            <button
              type="button"
              onClick={() => setActiveImageIndex((prev) => (prev + 1) % images.length)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Hub (Favorites & Comparison & WhatsApp Bubble) */}
      <FloatingActionHub allProperties={[property, ...(similarProperties || [])]} />
    </div>
  );
};
