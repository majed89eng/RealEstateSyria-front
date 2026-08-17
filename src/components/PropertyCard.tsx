'use client';

import React from 'react';
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
  Zap,
  Car,
} from 'lucide-react';
import { Property } from '../types/property';
import { propertyService } from '../services/propertyService';
import { useCurrency } from '../context/CurrencyContext';

interface PropertyCardProps {
  property: Property;
  onOpenDetail?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onOpenDetail }) => {
  const { currency, formatPrice } = useCurrency();
  const whatsappUrl = propertyService.generateWhatsAppUrl(property, undefined, currency);
  const mainImage =
    property.images[0] ||
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80';

  const isSold = property.availabilityStatus === 'sold';
  const isRented = property.availabilityStatus === 'rented';
  const isReserved = property.availabilityStatus === 'reserved';
  const isUnavailable = isSold || isRented;

  const handleCardClick = (e: React.MouseEvent) => {
    if (onOpenDetail) {
      e.preventDefault();
      onOpenDetail(property);
    }
  };

  return (
    <div
      className={`group bg-white rounded-3xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 ${
        isUnavailable ? 'border-slate-300 opacity-90' : 'border-slate-200/80'
      }`}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 cursor-pointer" onClick={handleCardClick}>
        <img
          src={mainImage}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges (Contract Type & Status) */}
        <div className="absolute top-3 right-3 flex flex-wrap items-center gap-1.5 z-10">
          {/* Status Badge */}
          {isSold ? (
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-red-600 text-white shadow-md">
              تم البيع
            </span>
          ) : isRented ? (
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-600 text-white shadow-md">
              تم التأجير
            </span>
          ) : isReserved ? (
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-purple-600 text-white shadow-md">
              محجوز
            </span>
          ) : property.contractType === 'sale' ? (
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-600 text-white shadow-md">
              للبيـع
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-600 text-white shadow-md">
              للإيجـار
            </span>
          )}

          {property.featured && !isUnavailable && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-900 shadow-md flex items-center gap-1">
              <Star className="w-3 h-3 fill-slate-900" />
              مميز
            </span>
          )}
        </div>

        {/* Top Left: Code & Energy Badges */}
        <div className="absolute top-3 left-3 flex flex-col items-end gap-1.5 z-10">
          {/* Property Code */}
          <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-slate-950/85 text-amber-300 border border-amber-500/40 shadow backdrop-blur-md">
            {property.propertyCode}
          </span>

          {property.hasSolar && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/90 text-slate-950 shadow backdrop-blur-md flex items-center gap-1">
              <Sun className="w-3 h-3 text-slate-950" />
              طاقة شمسية
            </span>
          )}
        </div>

        {/* Bottom Left: Images count */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1">
          <Eye className="w-3.5 h-3.5" />
          <span>{property.images.length} صور</span>
        </div>

        {/* Bottom Right: Location Badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white text-xs font-semibold drop-shadow">
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span>
            {property.region} • {property.governorate}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Title */}
          <h3
            onClick={handleCardClick}
            className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug cursor-pointer font-alexandria"
          >
            {property.title}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {property.locationDetails}
          </p>
        </div>

        {/* Key Specs Grid Pills */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-slate-700 text-xs">
          <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100 justify-center">
            <Maximize2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-bold">{property.area} م²</span>
          </div>

          {property.bedrooms > 0 ? (
            <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100 justify-center">
              <Bed className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-bold">{property.bedrooms} غرف</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100 justify-center">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-bold truncate">{property.floor}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100 justify-center">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-bold truncate">{property.direction || 'قبلية'}</span>
          </div>
        </div>

        {/* Footer: Price & Actions */}
        <div className="flex items-center justify-between gap-2 pt-1">
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-slate-400">
              {property.contractType === 'rent' ? 'الإيجار المطلوب' : 'السعر المطلوب'}
            </span>
            <span
              className={`text-lg font-extrabold font-alexandria tracking-tight ${
                isUnavailable ? 'text-slate-400 line-through' : 'text-emerald-700'
              }`}
            >
              {formatPrice(property.priceUsd)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Link
              href={`/properties/${property.slug}`}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="صفحة العقار المستقلة"
            >
              <Eye className="w-4 h-4" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 shadow-md ${
                isUnavailable
                  ? 'bg-slate-700 hover:bg-slate-800 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 hover:scale-105 active:scale-95'
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
