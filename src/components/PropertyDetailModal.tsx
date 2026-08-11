import React, { useState } from 'react';
import {
  X,
  MapPin,
  Maximize2,
  Bed,
  Bath,
  Layers,
  Compass,
  ShieldCheck,
  MessageCircle,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Building,
  CheckCircle2
} from 'lucide-react';
import { Property } from '../types/property';
import { propertyService } from '../services/propertyService';

interface PropertyDetailModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  isOpen,
  onClose,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isFullscreenLightbox, setIsFullscreenLightbox] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  if (!isOpen || !property) return null;

  const images = property.images && property.images.length > 0
    ? property.images
    : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'];

  const whatsappUrl = propertyService.generateWhatsAppUrl(property);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-8">
        
        {/* Top Header Bar */}
        <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1 rounded-full font-bold bg-slate-100 text-slate-700 border border-slate-200">
              الرمز: {property.id}
            </span>
            <span className={`text-xs px-3 py-1 rounded-full font-extrabold ${
              property.contractType === 'sale' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {property.contractType === 'sale' ? 'للبيع' : 'للإيجار'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-8 max-h-[80vh] overflow-y-auto">
          
          {/* Gallery / Lightbox Section */}
          <div className="space-y-3">
            
            {/* Active Big Image Preview */}
            <div className="relative aspect-[16/9] bg-slate-900 rounded-2xl overflow-hidden group">
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
                    onClick={prevImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-sm transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-sm transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Fullscreen toggle button */}
              <button
                type="button"
                onClick={() => setIsFullscreenLightbox(true)}
                className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-slate-900/70 text-white text-xs font-semibold backdrop-blur-md hover:bg-slate-900 transition-colors flex items-center gap-1.5"
              >
                <Maximize className="w-3.5 h-3.5" />
                <span>تكبير الصورة</span>
              </button>

              {/* Image index counter */}
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-slate-900/70 text-white text-xs font-semibold backdrop-blur-md">
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
                    className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImageIndex === idx ? 'border-emerald-600 ring-2 ring-emerald-500/30' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="مصغرة" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Title & Location & Price */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 font-alexandria leading-snug">
                {property.title}
              </h2>
              <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>{property.locationDetails}</span>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200/80 p-4 rounded-2xl flex flex-col items-start md:items-end min-w-[200px]">
              <span className="text-xs text-emerald-800 font-semibold">السعر المطلوب</span>
              <span className="text-2xl font-black text-emerald-700 font-alexandria">
                {property.formattedPrice}
              </span>
            </div>
          </div>

          {/* Technical Specs Table Grid */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 font-alexandria flex items-center gap-2">
              <Building className="w-5 h-5 text-emerald-600" />
              <span>المواصفات الفنية والمالية</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-slate-800 text-sm">
              <div className="space-y-1">
                <span className="text-xs text-slate-500 block">المساحة</span>
                <span className="font-bold flex items-center gap-1">
                  <Maximize2 className="w-4 h-4 text-emerald-600" />
                  {property.area} م²
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-500 block">عدد الغرف</span>
                <span className="font-bold flex items-center gap-1">
                  <Bed className="w-4 h-4 text-emerald-600" />
                  {property.bedrooms} غرف نوم
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-500 block">عدد الحمامات</span>
                <span className="font-bold flex items-center gap-1">
                  <Bath className="w-4 h-4 text-emerald-600" />
                  {property.bathrooms} حمام
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-500 block">الطابق</span>
                <span className="font-bold flex items-center gap-1">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  {property.floor}
                </span>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-200">
                <span className="text-xs text-slate-500 block">الاتجاه والقبلية</span>
                <span className="font-bold flex items-center gap-1">
                  <Compass className="w-4 h-4 text-emerald-600" />
                  {property.direction}
                </span>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-200 col-span-2">
                <span className="text-xs text-slate-500 block">نوع الملكية العقارية</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  {property.ownershipType}
                </span>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-200">
                <span className="text-xs text-slate-500 block">المحافظة</span>
                <span className="font-bold">{property.governorate}</span>
              </div>
            </div>
          </div>

          {/* Features Badges */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 font-alexandria flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>مميزات وخدمات العقار</span>
            </h3>

            <div className="flex flex-wrap gap-2">
              {property.features.map((feat, i) => (
                <span
                  key={i}
                  className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 font-alexandria">
              تفاصيل إضافية ووصف العقار
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 whitespace-pre-line">
              {property.description}
            </p>
          </div>

        </div>

        {/* Modal Bottom CTA Bar */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold transition-colors"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span>{copiedLink ? 'تم نسخ رابط العقار!' : 'مشاركة العقار'}</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base transition-all shadow-xl shadow-emerald-600/30 hover:scale-[1.01]"
          >
            <MessageCircle className="w-5 h-5" />
            <span>تواصل الآن عبر واتساب للاستفسار المعاينات</span>
          </a>
        </div>

      </div>

      {/* Fullscreen Lightbox Overlay */}
      {isFullscreenLightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setIsFullscreenLightbox(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl">
            <img
              src={images[activeImageIndex]}
              alt="صورة كاملة"
              className="max-w-full max-h-[85vh] object-contain"
            />
          </div>

          <div className="mt-4 flex items-center gap-4 text-white text-sm">
            <button type="button" onClick={prevImage} className="p-2 rounded-xl bg-white/10 hover:bg-white/20">
              <ChevronRight className="w-5 h-5" />
            </button>
            <span>{activeImageIndex + 1} من {images.length}</span>
            <button type="button" onClick={nextImage} className="p-2 rounded-xl bg-white/10 hover:bg-white/20">
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
