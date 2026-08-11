import React from 'react';
import { MapPin, Bed, Maximize2, Layers, Sun, ShieldCheck, MessageCircle, Eye, Star, Compass } from 'lucide-react';
import { Property } from '../types/property';
import { propertyService } from '../services/propertyService';

interface PropertyCardProps {
  property: Property;
  onOpenDetail: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onOpenDetail }) => {
  const whatsappUrl = propertyService.generateWhatsAppUrl(property);
  const mainImage = property.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80';
  const hasSolar = property.features.some((f) => f.includes('طاقة شمسية'));
  const isTaboGreen = property.ownershipType.includes('طابو سبز') || property.features.some((f) => f.includes('طابو سبز'));

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
      
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onOpenDetail(property)}>
        <img
          src={mainImage}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        {/* Top Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 right-3 flex flex-wrap items-center gap-1.5 z-10">
          {property.contractType === 'sale' ? (
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-600 text-white shadow-md">
              للبيـع
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-600 text-white shadow-md">
              للإيجـار
            </span>
          )}

          {property.featured && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-900 shadow-md flex items-center gap-1">
              <Star className="w-3 h-3 fill-slate-900" />
              مميز
            </span>
          )}
        </div>

        {/* Syrian Feature Badges (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-col items-end gap-1 z-10">
          {hasSolar && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/90 text-slate-950 shadow backdrop-blur-md flex items-center gap-1">
              <Sun className="w-3 h-3 text-slate-950" />
              طاقة شمسية
            </span>
          )}
          {isTaboGreen && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow backdrop-blur-md flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              طابو سبز
            </span>
          )}
        </div>

        {/* Image count pill */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1">
          <Eye className="w-3.5 h-3.5" />
          <span>{property.images.length} صور</span>
        </div>

        {/* Location Badge (Bottom Right) */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white text-xs font-semibold drop-shadow">
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span>{property.region} • {property.governorate}</span>
        </div>

      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          {/* Title */}
          <h3
            onClick={() => onOpenDetail(property)}
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
              <span className="font-bold">{property.floor}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100 justify-center">
            <Compass className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-bold truncate">{property.direction || 'قبلية'}</span>
          </div>

        </div>

        {/* Footer: Price & WhatsApp Action */}
        <div className="flex items-center justify-between gap-2 pt-1">
          
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-slate-400">السعر المطلوب</span>
            <span className="text-lg font-extrabold text-emerald-700 font-alexandria tracking-tight">
              {property.formattedPrice}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenDetail(property)}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="عرض كافة التفاصيل"
            >
              <Eye className="w-4 h-4" />
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all duration-200 shadow-md shadow-emerald-600/20 hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>واتساب</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
