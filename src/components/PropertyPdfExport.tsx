'use client';

import React from 'react';
import { Printer, Download, FileText, CheckCircle2, ShieldCheck, Sun, Building } from 'lucide-react';
import { Property } from '@/types/property';
import { useCurrency } from '@/context/CurrencyContext';

interface Props {
  property: Property;
}

export const PropertyPdfExport: React.FC<Props> = ({ property }) => {
  const { formatPrice, currency } = useCurrency();

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* On-screen Trigger Button */}
      <button
        type="button"
        onClick={handlePrint}
        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
        title="طباعة أو حفظ بروشور العقار كملف PDF"
      >
        <Printer className="w-4 h-4 text-emerald-400" />
        <span>طباعة / حفظ PDF</span>
      </button>

      {/* Hidden Print-Only High-Fidelity Branded Sheet */}
      <div className="hidden print:block fixed inset-0 z-[9999] bg-white text-slate-900 p-8 text-right font-cairo">
        
        {/* Header Strip */}
        <div className="flex items-center justify-between border-b-2 border-emerald-600 pb-4 mb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-slate-950 font-alexandria">
              عقارات سوريا • Real Estate Syria
            </h1>
            <p className="text-xs text-slate-600">
              الكتالوج العقاري المعتمد والموثوق في الجمهورية العربية السورية
            </p>
          </div>
          <div className="text-left">
            <span className="text-sm font-mono font-bold bg-emerald-100 text-emerald-900 px-3 py-1 rounded-lg border border-emerald-300 inline-block">
              {property.propertyCode}
            </span>
            <span className="block text-[10px] text-slate-500 mt-1 font-mono">
              تاريخ التقرير: {new Date().toISOString().split('T')[0]}
            </span>
          </div>
        </div>

        {/* Title & Price Section */}
        <div className="flex items-start justify-between gap-6 mb-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">{property.title}</h2>
            <p className="text-sm text-slate-600">
              📍 {property.locationDetails || `${property.region} - ${property.governorate}`}
            </p>
          </div>
          <div className="text-left bg-emerald-50 p-3 rounded-xl border border-emerald-200">
            <span className="text-[11px] text-emerald-800 block">السعر المطلوب:</span>
            <span className="text-xl font-black text-emerald-700 font-mono">
              ${property.priceUsd.toLocaleString('en-US')} USD
            </span>
          </div>
        </div>

        {/* Main Photo Gallery Strip */}
        {property.images && property.images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {property.images.slice(0, 3).map((img, i) => (
              <div key={i} className="aspect-4/3 rounded-xl overflow-hidden border border-slate-300">
                <img src={img} alt={property.title} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* Specs Table */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-slate-800 mb-2 border-b pb-1">
            المواصفات الفنية والقانونية:
          </h3>
          <div className="grid grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>• نوع العقد: <strong>{property.contractType === 'sale' ? 'بيع' : 'إيجار'}</strong></div>
            <div>• المساحة: <strong>{property.area} م²</strong></div>
            <div>• الغرف: <strong>{property.bedrooms} غرف نوم</strong></div>
            <div>• الحمامات: <strong>{property.bathrooms}</strong></div>
            <div>• الطابق: <strong>{property.floor}</strong></div>
            <div>• القبلية والاتجاه: <strong>{property.direction}</strong></div>
            <div>• سند الملكية: <strong>{property.ownershipType}</strong></div>
            <div>• الطاقة الشمسية: <strong>{property.hasSolar ? 'متوفرة' : 'غير متوفرة'}</strong></div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-slate-800 mb-2 border-b pb-1">
            تفاصيل إضافية عن العقار:
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
            {property.description}
          </p>
        </div>

        {/* Contact & Verification Footer */}
        <div className="border-t-2 border-slate-200 pt-4 flex items-center justify-between text-xs text-slate-600">
          <div>
            <span className="font-bold text-slate-900 block">للتواصل والاستفسار المباشر عبر واتساب:</span>
            <span className="font-mono text-emerald-700 text-sm font-bold">{property.whatsappNumber}</span>
          </div>
          <div className="text-left text-[10px]">
            <span>تم استخراج هذا التقرير عبر: <strong>realestate-syria.com</strong></span>
            <span className="block text-slate-400">جميع الحقوق محفوظة © {new Date().getFullYear()}</span>
          </div>
        </div>

      </div>
    </>
  );
};
