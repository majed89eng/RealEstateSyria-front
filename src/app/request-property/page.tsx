'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  Search,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  MapPin,
  DollarSign,
  Phone,
  MessageCircle,
  Clock,
  ArrowRight,
  Send,
  Zap,
  Home,
  Check,
  FileCheck,
  Compass,
  Bed,
  Car,
  Sun,
  Layers,
} from 'lucide-react';
import { propertyRequestService } from '../../services/propertyRequestService';
import { useCurrency } from '../../context/CurrencyContext';
import { useAuth } from '../../context/AuthContext';
import { SYRIAN_LOCATIONS } from '../../data/locations';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

const GOVERNORATES = ['دمشق', 'ريف دمشق', 'حلب', 'حمص', 'حماة', 'اللاذقية', 'طرطوس'];

const PROPERTY_TYPES = [
  { id: 'apartment', label: 'شقة سكنية', icon: Building2 },
  { id: 'villa', label: 'فيلا / قصر', icon: Home },
  { id: 'chalet', label: 'مزرعة / استراحة', icon: Sun },
  { id: 'commercial', label: 'مكتب / مقر شركة', icon: Layers },
  { id: 'shop', label: 'محل / معرض تجاري', icon: Zap },
  { id: 'land', label: 'أرض / مقسم', icon: Compass },
];

const MUST_HAVE_FEATURES = [
  'طاقة شمسية كاملة',
  'مصعد شغال 24/7',
  'طابو سبز (2400 سهم)',
  'كراج سيارات خاص',
  'تدفئة مركزية',
  'إطلالة مفتوحة',
  'مسبح مستقل',
  'تسهيلات أقساط',
];

export default function RequestPropertyPage() {
  const { currency, formatPrice } = useCurrency();
  const { user } = useAuth();

  const [contractType, setContractType] = useState<'sale' | 'rent'>('sale');
  const [propertyType, setPropertyType] = useState<string>('apartment');
  const [governorate, setGovernorate] = useState<string>('دمشق');
  const [customRegions, setCustomRegions] = useState<string>('');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  
  const [maxBudgetUsd, setMaxBudgetUsd] = useState<number | ''>(150000);
  const [minArea, setMinArea] = useState<number | ''>(140);
  const [minBedrooms, setMinBedrooms] = useState<number>(3);
  const [paymentPreference, setPaymentPreference] = useState<'cash' | 'installments' | 'any'>('cash');
  const [requiredFeatures, setRequiredFeatures] = useState<string[]>(['طاقة شمسية كاملة', 'طابو سبز (2400 سهم)']);
  const [description, setDescription] = useState<string>('');
  const [urgency, setUrgency] = useState<'immediate' | 'within_month' | 'exploring'>('immediate');

  // Contact Info
  const [requesterName, setRequesterName] = useState<string>(user?.name || '');
  const [requesterPhone, setRequesterPhone] = useState<string>(user?.phone || user?.whatsapp || '+963 ');
  const [requesterWhatsapp, setRequesterWhatsapp] = useState<string>(user?.whatsapp || user?.phone || '+963 ');
  const [requesterEmail, setRequesterEmail] = useState<string>(user?.email || '');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  // Available regions based on governorate
  const currentProvinceData = SYRIAN_LOCATIONS.find((l) => l.provinceNameAr === governorate);
  const availableRegions = currentProvinceData
    ? currentProvinceData.cities.map((c) => c.cityNameAr)
    : ['المزة', 'أبو رمانة', 'المالكي', 'كفرسوسة', 'مشروع دمر', 'يعفور'];

  const toggleRegion = (reg: string) => {
    if (selectedRegions.includes(reg)) {
      setSelectedRegions(selectedRegions.filter((r) => r !== reg));
    } else {
      setSelectedRegions([...selectedRegions, reg]);
    }
  };

  const toggleFeature = (feat: string) => {
    if (requiredFeatures.includes(feat)) {
      setRequiredFeatures(requiredFeatures.filter((f) => f !== feat));
    } else {
      setRequiredFeatures([...requiredFeatures, feat]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const allRegions = [...selectedRegions];
    if (customRegions.trim()) {
      allRegions.push(...customRegions.split(/[,،]/).map((r) => r.trim()).filter(Boolean));
    }

    const newReq = propertyRequestService.createRequest({
      requesterName: requesterName || 'عميل باحث عن عقار',
      requesterPhone,
      requesterWhatsapp: requesterWhatsapp || requesterPhone,
      requesterEmail: requesterEmail || undefined,
      governorate,
      preferredRegions: allRegions.length > 0 ? allRegions : [governorate],
      contractType,
      propertyType,
      maxBudgetUsd: Number(maxBudgetUsd) || 100000,
      minArea: minArea ? Number(minArea) : undefined,
      minBedrooms: Number(minBedrooms) || 2,
      paymentPreference,
      requiredFeatures,
      description: description || 'طلب عقار مخصص عبر نموذج الموقع المباشر.',
      urgency,
    });

    setSubmittedCode(newReq.requestCode);
    setIsSubmitting(false);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  const whatsappDirectUrl = propertyRequestService.generateAdminWhatsAppUrl({
    requesterName,
    requesterPhone,
    governorate,
    preferredRegions: selectedRegions,
    contractType,
    propertyType,
    maxBudgetUsd: Number(maxBudgetUsd) || 0,
    minArea: Number(minArea) || 0,
    requiredFeatures,
    description,
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-cairo selection:bg-emerald-500 selection:text-white flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-28 pb-12 overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>خدمة حصرية ومباشرة من إدارة منصة عقارات سوريا</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-alexandria text-white tracking-tight leading-tight">
            لم تجد العقار المناسب؟ <span className="text-emerald-400">اطلب عقارك الخاص الآن</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            أدخل المواصفات والميزانية المطلوبة وسيقوم <strong className="text-white">فريق إدارة المنصة حصرياً</strong> بالبحث والتحقق وتأمين أفضل العروض المطابقة والتواصل المباشر معك بسرية واحترافية.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-[11px] sm:text-xs text-slate-400">
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>متابعة مباشرة من إدارة المنصة</span>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>تدقيق قانوني لسندات الملكية</span>
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>خدمة مجانية 100% للمشترين والمستأجرين</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10">
        {submittedCode ? (
          /* Success Screen */
          <div className="bg-slate-900/90 border border-emerald-500/40 rounded-3xl p-8 text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-emerald-600/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto shadow-xl">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                رمز الطلب المرجعي: {submittedCode}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-alexandria text-white pt-2">
                تم استلام طلبك بنجاح من قِبل إدارة المنصة!
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                شكراً لثقتك بنا. يقوم فريقنا الآن بمراجعة طلبك ومطابقته مع العروض الحصرية، وسنتواصل معك عبر الهاتف أو الواتساب خلال أقل من 24 ساعة.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>متابعة الطلب مع مسؤول المنصة على واتساب</span>
              </a>

              <Link
                href="/properties"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition-colors"
              >
                تصفح العقارات المعروضة
              </Link>
            </div>
          </div>
        ) : (
          /* Request Form */
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Property Type & Purpose */}
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
                  1
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white">نوع العقار والهدف من الطلب</h2>
                  <p className="text-[11px] text-slate-400">حدد نوع العملية العقارية ونوع العقار المطلوب</p>
                </div>
              </div>

              {/* Purpose Selector (Sale vs Rent) */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">نوع العملية:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setContractType('sale')}
                    className={`py-3 px-4 rounded-2xl border text-xs sm:text-sm font-bold transition-all ${
                      contractType === 'sale'
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-600/20'
                        : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:bg-slate-800'
                    }`}
                  >
                    شراء ملكية (تملك دائم) 🏢
                  </button>

                  <button
                    type="button"
                    onClick={() => setContractType('rent')}
                    className={`py-3 px-4 rounded-2xl border text-xs sm:text-sm font-bold transition-all ${
                      contractType === 'rent'
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-600/20'
                        : 'bg-slate-800/60 text-slate-400 border-slate-700/60 hover:bg-slate-800'
                    }`}
                  >
                    استئجار (سكني أو تجاري) 🔑
                  </button>
                </div>
              </div>

              {/* Property Type Grid */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">نوع العقار:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {PROPERTY_TYPES.map((t) => {
                    const Icon = t.icon;
                    const isSelected = propertyType === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setPropertyType(t.id)}
                        className={`flex items-center gap-2.5 p-3 rounded-2xl border transition-all text-right ${
                          isSelected
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/50 shadow-md'
                            : 'bg-slate-800/50 text-slate-300 border-slate-700/60 hover:bg-slate-800'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                        <span className="text-xs font-bold">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Section 2: Location & Preferred Neighborhoods */}
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
                  2
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white">المحافظة والأحياء المفضلة</h2>
                  <p className="text-[11px] text-slate-400">حدد المناطق التي ترغب بتأمين العقار فيها</p>
                </div>
              </div>

              {/* Governorate Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">المحافظة الرئيسية *</label>
                <select
                  value={governorate}
                  onChange={(e) => {
                    setGovernorate(e.target.value);
                    setSelectedRegions([]);
                  }}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  {GOVERNORATES.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              {/* Popular Neighborhoods Tag Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  اختر الأحياء أو المناطق المرغوبة (حدد واحداً أو أكثر):
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {availableRegions.map((reg) => {
                    const isSelected = selectedRegions.includes(reg);
                    return (
                      <button
                        key={reg}
                        type="button"
                        onClick={() => toggleRegion(reg)}
                        className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-emerald-600 text-white border-emerald-500 font-bold shadow-sm'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                        }`}
                      >
                        {isSelected && '✓ '}
                        {reg}
                      </button>
                    );
                  })}
                </div>

                <input
                  type="text"
                  placeholder="أو اكتب أسماء أحياء ومناطق أخرى تفضلها..."
                  value={customRegions}
                  onChange={(e) => setCustomRegions(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Section 3: Budget, Specs & Must-Have Features */}
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
                  3
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white">الميزانية والمواصفات المطلوبة</h2>
                  <p className="text-[11px] text-slate-400">حدد السقف السعري والشروط التي تهمك في العقار</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Max Budget */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    {contractType === 'rent' ? 'الحد الأقصى للإيجار الشهري ($ USD)' : 'الحد الأقصى للميزانية ($ USD) *'}
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400" />
                    <input
                      type="number"
                      required
                      placeholder="مثال: 120000"
                      value={maxBudgetUsd}
                      onChange={(e) => setMaxBudgetUsd(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl pr-10 pl-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 font-mono font-bold"
                    />
                  </div>
                  {maxBudgetUsd !== '' && (
                    <span className="text-[11px] text-emerald-400 mt-1 block">
                      يعادل تقريباً: {formatPrice(Number(maxBudgetUsd))}
                    </span>
                  )}
                </div>

                {/* Min Area */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">المساحة المطلوبة (م²)</label>
                  <input
                    type="number"
                    placeholder="مثال: 140"
                    value={minArea}
                    onChange={(e) => setMinArea(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                {/* Min Bedrooms */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">عدد الغرف الأدنى</label>
                  <select
                    value={minBedrooms}
                    onChange={(e) => setMinBedrooms(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value={1}>غرفة نوم واحدة</option>
                    <option value={2}>غرفتان نوم (2)</option>
                    <option value={3}>3 غرف نوم</option>
                    <option value={4}>4 غرف نوم فأكثر</option>
                  </select>
                </div>
              </div>

              {/* Payment Type */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">طريقة السداد المفضلة:</label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentPreference('cash')}
                    className={`py-2.5 rounded-xl border font-bold transition-all ${
                      paymentPreference === 'cash'
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    كاش فوري 💵
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentPreference('installments')}
                    className={`py-2.5 rounded-xl border font-bold transition-all ${
                      paymentPreference === 'installments'
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    أقساط ميسرة 📑
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentPreference('any')}
                    className={`py-2.5 rounded-xl border font-bold transition-all ${
                      paymentPreference === 'any'
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    أي خيار متاح 🔄
                  </button>
                </div>
              </div>

              {/* Must-have Features Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  شروط وميزات إلزامية في العقار المطلوب:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {MUST_HAVE_FEATURES.map((feat) => {
                    const isSelected = requiredFeatures.includes(feat);
                    return (
                      <button
                        key={feat}
                        type="button"
                        onClick={() => toggleFeature(feat)}
                        className={`text-xs p-2.5 rounded-xl border transition-all text-right flex items-center justify-between ${
                          isSelected
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/50 font-bold'
                            : 'bg-slate-800/50 text-slate-400 border-slate-700/60 hover:bg-slate-800'
                        }`}
                      >
                        <span>{feat}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Additional description */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  تفاصيل ورغبات إضافية خاصة بطلبك:
                </label>
                <textarea
                  rows={3}
                  placeholder="مثال: أفضل الطوابق المتوسطة مع شرفة واسعة، وقرب المدارس أو الأسواق..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl p-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Section 4: Contact Info */}
            <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
                  4
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white">بيانات التواصل وموعد الشراء</h2>
                  <p className="text-[11px] text-slate-400">ستستخدم إدارة المنصة هذه البيانات للتواصل معك بشأن العروض</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">الاسم الكامل *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: المهندس وائل الخالد"
                    value={requesterName}
                    onChange={(e) => setRequesterName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">رقم الهاتف *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="tel"
                      required
                      placeholder="+963 944 123 456"
                      value={requesterPhone}
                      onChange={(e) => setRequesterPhone(e.target.value)}
                      dir="ltr"
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl pr-10 pl-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 text-right"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    رقم الواتساب (لإرسال صور وتفاصيل العروض فوراً)
                  </label>
                  <div className="relative">
                    <MessageCircle className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400" />
                    <input
                      type="tel"
                      placeholder="+963 944 123 456"
                      value={requesterWhatsapp}
                      onChange={(e) => setRequesterWhatsapp(e.target.value)}
                      dir="ltr"
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl pr-10 pl-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 text-right"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">مدى الاستعجال وموعد اتخاذ القرار</label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="immediate">⚡ فوري (خلال أيام قليلة / زيارة قريبة)</option>
                    <option value="within_month">📅 خلال شهر</option>
                    <option value="exploring">🔍 استكشاف ودراسة الفرص المتاحة</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submission Actions */}
            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                <span>إرسال الطلب لإدارة المنصة للبحث الفوري</span>
              </button>

              <div className="text-center">
                <span className="text-xs text-slate-400">أو إذا كنت تفضل التواصل المباشر والسريع:</span>
              </div>

              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-emerald-500/40 text-xs sm:text-sm font-bold transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>إرسال تفاصيل الطلب مباشرة لمسؤول المنصة عبر واتساب</span>
              </a>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
