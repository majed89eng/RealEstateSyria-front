'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Bed,
  Maximize2,
  Layers,
  Sun,
  ShieldCheck,
  MessageCircle,
  Eye,
  Star,
  Compass,
  Heart,
  Scale,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  HardHat,
  Clock,
} from 'lucide-react';
import { Property } from '../types/property';
import { propertyService } from '../services/propertyService';
import { useCurrency } from '../context/CurrencyContext';
import { useFavorites } from '../context/FavoritesContext';

interface PropertyCardProps {
  property: Property;
  onOpenDetail?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onOpenDetail,
}) => {
  const { formatPrice, currency } = useCurrency();
  const { isFavorite, toggleFavorite, isInComparison, addToComparison, removeFromComparison } = useFavorites();
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const images = property.images && property.images.length > 0
    ? property.images
    : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'];

  const isUnavailable =
    property.availabilityStatus === 'sold' ||
    property.availabilityStatus === 'rented' ||
    property.availabilityStatus === 'reserved';

  const isSold = property.availabilityStatus === 'sold';
  const isRented = property.availabilityStatus === 'rented';
  const isReserved = property.availabilityStatus === 'reserved';

  const favorited = isFavorite(property.id);
  const inCompare = isInComparison(property.id);

  const whatsappUrl = propertyService.generateWhatsAppUrl(property, undefined, currency);

  // Calculate Estimated Price per Square Meter
  const pricePerSqm =
    property.area > 0 && property.contractType === 'sale'
      ? Math.round(property.priceUsd / property.area)
      : null;

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveImageIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(property.id);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (inCompare) {
      removeFromComparison(property.id);
    } else {
      addToComparison(property);
    }
  };

  const handleCardClick = () => {
    if (onOpenDetail) {
      onOpenDetail(property);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-slate-900/90 rounded-3xl overflow-hidden border border-slate-800 hover:border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between relative"
    >
      {/* Top Media Section with Interactive Carousel */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-950 select-none">
        {/* Main Active Image */}
        <img
          src={images[activeImageIdx]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 cursor-pointer"
          onClick={handleCardClick}
          loading="lazy"
        />

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/40 pointer-events-none" />

        {/* Carousel Navigation Arrows (visible on hover) */}
        {images.length > 1 && (
          <div
            className={`absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none transition-opacity duration-200 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              type="button"
              onClick={handlePrevImage}
              className="p-1.5 rounded-full bg-slate-950/80 hover:bg-slate-950 text-white backdrop-blur-md shadow-lg pointer-events-auto transition-transform hover:scale-110 active:scale-95"
              title="الصورة السابقة"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleNextImage}
              className="p-1.5 rounded-full bg-slate-950/80 hover:bg-slate-950 text-white backdrop-blur-md shadow-lg pointer-events-auto transition-transform hover:scale-110 active:scale-95"
              title="الصورة التالية"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Carousel Dot Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
            {images.slice(0, 5).map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeImageIdx === idx ? 'w-4 bg-emerald-400' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        )}

        {/* Top Right Badges (Contract Type, Off-Plan & Featured) */}
        <div className="absolute top-3 right-3 flex flex-wrap items-center gap-1.5 z-10">
          {property.isOffPlan && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-500 text-slate-950 shadow-md flex items-center gap-1">
              <HardHat className="w-3.5 h-3.5" />
              على المخطط
            </span>
          )}

          {isSold ? (
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-red-600 text-white shadow-md">
              تم البيع
            </span>
          ) : isRented ? (
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-amber-600 text-white shadow-md">
              تم التأجير
            </span>
          ) : isReserved ? (
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-purple-600 text-white shadow-md">
              محجوز
            </span>
          ) : property.contractType === 'sale' ? (
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-600 text-white shadow-md">
              للبيـع
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-teal-600 text-white shadow-md">
              للإيجـار
            </span>
          )}

          {property.featured && !isUnavailable && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-slate-950 shadow-md flex items-center gap-1">
              <Star className="w-3 h-3 fill-slate-950" />
              مميز
            </span>
          )}
        </div>

        {/* Top Left: Quick Action Icons (Favorite Heart & Compare Scale & Code) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          {/* Compare Button */}
          <button
            type="button"
            onClick={handleToggleCompare}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md shadow-md ${
              inCompare
                ? 'bg-emerald-600 text-white ring-2 ring-emerald-400/50'
                : 'bg-slate-950/70 hover:bg-slate-950 text-slate-300 hover:text-emerald-400'
            }`}
            title={inCompare ? 'مدرج بالمقارنة' : 'إضافة إلى المقارنة'}
          >
            <Scale className="w-3.5 h-3.5" />
          </button>

          {/* Favorite Heart Button */}
          <button
            type="button"
            onClick={handleToggleFavorite}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md shadow-md ${
              favorited
                ? 'bg-rose-600 text-white ring-2 ring-rose-400/50 scale-105'
                : 'bg-slate-950/70 hover:bg-slate-950 text-slate-300 hover:text-rose-400'
            }`}
            title={favorited ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Bottom Right: Location Badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white text-xs font-semibold drop-shadow z-10">
          <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>
            {property.region} • {property.governorate}
          </span>
        </div>

        {/* Bottom Left: Property Code */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-slate-950/90 text-amber-300 border border-slate-700 backdrop-blur-md shadow">
            {property.propertyCode}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
        <div className="space-y-1.5">
          {/* Title */}
          <h3
            onClick={handleCardClick}
            className="text-sm sm:text-base font-extrabold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug cursor-pointer font-alexandria"
          >
            {property.title}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-1 leading-normal">
            {property.locationDetails}
          </p>
        </div>

        {/* Key Specs Grid Pills */}
        <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-800 text-slate-300 text-xs">
          <div className="flex items-center gap-1.5 bg-slate-950 p-2 rounded-xl border border-slate-800/80 justify-center">
            <Maximize2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-bold">{property.area} م²</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 p-2 rounded-xl border border-slate-800/80 justify-center">
            <Bed className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-bold">{property.bedrooms > 0 ? `${property.bedrooms} غرف` : property.floor}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 p-2 rounded-xl border border-slate-800/80 justify-center">
            {property.hasSolar ? (
              <span className="font-bold text-amber-400 flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                طاقة ☀️
              </span>
            ) : (
              <span className="font-bold truncate text-slate-400">{property.direction || 'قبلي'}</span>
            )}
          </div>
        </div>

        {/* Off-Plan Project Investment Strip */}
        {property.isOffPlan && (
          <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-2.5 space-y-1.5 text-xs">
            <div className="flex items-center justify-between font-bold text-amber-300">
              <span className="flex items-center gap-1 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                تسليم: {property.handoverDate || 'قريباً'}
              </span>
              <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded-full text-amber-300 font-black border border-amber-500/30">
                {property.constructionProgress || 30}% إنجاز
              </span>
            </div>
            {property.paymentPlan && (
              <p className="text-[11px] text-amber-200/90 font-semibold truncate">
                💳 {property.paymentPlan}
              </p>
            )}
          </div>
        )}

        {/* Footer: Price, Price/m² & Actions */}
        <div className="flex items-center justify-between gap-2 pt-1">
          {/* Price & Price/m² */}
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-slate-400 block">
              {property.contractType === 'rent' ? 'الإيجار المطلوب' : 'السعر المطلوب'}
            </span>
            <span
              className={`text-lg font-black font-alexandria tracking-tight ${
                isUnavailable ? 'text-slate-500 line-through' : 'text-emerald-400'
              }`}
            >
              {formatPrice(property.priceUsd)}
            </span>
            {pricePerSqm && !isUnavailable && (
              <span className="text-[10px] text-slate-400 font-mono font-medium">
                ≈ {formatPrice(pricePerSqm)}/م²
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5">
            <Link
              href={`/properties/${property.slug}`}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white transition-colors border border-slate-700"
              title="تفاصيل العقار"
            >
              <Eye className="w-4 h-4" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 px-3 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 shadow-md ${
                isUnavailable
                  ? 'bg-slate-800 hover:bg-slate-750 text-slate-400 border border-slate-700'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30 hover:scale-105 active:scale-95'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>{isUnavailable ? 'طلب مماثل' : 'واتساب'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
