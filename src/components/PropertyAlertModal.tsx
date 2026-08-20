'use client';

import React, { useState } from 'react';
import {
  Bell,
  X,
  Sparkles,
  MapPin,
  DollarSign,
  Phone,
  CheckCircle2,
  Send,
  MessageCircle,
  Building,
} from 'lucide-react';
import { Governorate, PropertyType, ContractType } from '@/types/property';
import { leadService } from '@/services/leadService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultGovernorate?: Governorate;
}

export const PropertyAlertModal: React.FC<Props> = ({
  isOpen,
  onClose,
  defaultGovernorate = 'دمشق',
}) => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [governorate, setGovernorate] = useState<Governorate>(defaultGovernorate);
  const [region, setRegion] = useState<string>('');
  const [contractType, setContractType] = useState<ContractType>('sale');
  const [propertyType, setPropertyType] = useState<PropertyType>('apartment');
  const [maxBudgetUsd, setMaxBudgetUsd] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const messageText = `طلب تنبيه عقار مخصص:
- نوع العقد: ${contractType === 'sale' ? 'شراء' : 'إيجار'}
- نوع العقار: ${propertyType}
- المحافظة والمنطقة: ${region ? `${region} - ` : ''}${governorate}
- الميزانية القصوى: ${maxBudgetUsd ? `$${maxBudgetUsd}` : 'غير محددة'}
- ملاحظات إضافية: ${notes || 'لا يوجد'}`;

    leadService.createLead({
      name,
      phone,
      propertyTitle: `تنبيه طلب عقاري مخصص (${governorate})`,
      message: messageText,
    });

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const directWhatsAppUrl = `https://wa.me/963988123456?text=${encodeURIComponent(
    `مرحباً، أود تسجيل طلبي العقاري لتنبيهي فور توفره:\n- الاسم: ${name}\n- الطلب: ${contractType === 'sale' ? 'شراء' : 'إيجار'} في (${region || governorate})\n- الميزانية: ${maxBudgetUsd ? `$${maxBudgetUsd}` : 'حسب العرض'}\nوشكراً!`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-right ring-1 ring-white/10">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="py-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-8 ring-emerald-500/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black font-alexandria text-white">
                تم تسجيل طلب التنبيه بنجاح!
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                شكراً لك يا <strong className="text-white">{name}</strong>. سنقوم بمطابقة طلبك يومياً مع العروض الجديدة وإشعارك مباشرة على واتساب فور توفر عقار مطابق.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30"
              >
                <MessageCircle className="w-4 h-4" />
                <span>تأكيد الطلب فورا على واتساب</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                إغلاق
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
                <Bell className="w-3.5 h-3.5" />
                <span>خدمة التنبيهات العقارية المخصصة</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-alexandria text-white">
                نبّهني عند توفر عقار مطابق لمواصفاتي
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                لم تجد طلبك الحالي؟ املأ مواصفاتك وسنرسل لك إشعاراً فورياً على واتساب فور إدراج عقار يلائم ميزانيتك.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Contact: Name & WhatsApp Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-300">الاسم الكريم *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: م. فراس العلي"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-medium focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-300">رقم الواتساب للتنبيه *</label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    placeholder="+963 988 123 456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-emerald-400 font-bold focus:outline-none focus:border-emerald-500 font-mono text-left"
                  />
                </div>
              </div>

              {/* Contract & Property Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-300">نوع الطلب *</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setContractType('sale')}
                      className={`p-2 rounded-xl font-bold border transition-all ${
                        contractType === 'sale'
                          ? 'bg-emerald-600 text-white border-emerald-500'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      شراء
                    </button>
                    <button
                      type="button"
                      onClick={() => setContractType('rent')}
                      className={`p-2 rounded-xl font-bold border transition-all ${
                        contractType === 'rent'
                          ? 'bg-emerald-600 text-white border-emerald-500'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      استئجار
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-300">نوع العقار</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-semibold focus:outline-none"
                  >
                    <option value="apartment">شقة سكنية</option>
                    <option value="villa">فيلا أو قصر</option>
                    <option value="chalet">مزرعة أو استراحة</option>
                    <option value="commercial">مكتب أو محل تجاري</option>
                  </select>
                </div>
              </div>

              {/* Location: Governorate & Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-300">المحافظة *</label>
                  <select
                    value={governorate}
                    onChange={(e) => setGovernorate(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-semibold focus:outline-none"
                  >
                    <option value="دمشق">دمشق</option>
                    <option value="ريف دمشق">ريف دمشق</option>
                    <option value="حلب">حلب</option>
                    <option value="حمص">حمص</option>
                    <option value="حماة">حماة</option>
                    <option value="اللاذقية">اللاذقية</option>
                    <option value="طرطوس">طرطوس</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-300">المنطقة أو الحي المفضل</label>
                  <input
                    type="text"
                    placeholder="مثال: المزة، أبو رمانة، يعفور..."
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-medium focus:outline-none"
                  />
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-1">
                <label className="block font-bold text-slate-300">
                  الميزانية التقريبية بالدولار ($ USD)
                </label>
                <input
                  type="number"
                  placeholder="مثال: 150000"
                  value={maxBudgetUsd}
                  onChange={(e) => setMaxBudgetUsd(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-emerald-400 font-bold font-mono focus:outline-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-emerald-600/30 transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50"
                >
                  <Bell className="w-4 h-4" />
                  <span>تفعيل التنبيه العقاري مجاناً</span>
                </button>
              </div>

            </form>
          </>
        )}

      </div>
    </div>
  );
};
