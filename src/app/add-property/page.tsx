'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Building2,
  Home,
  UploadCloud,
  CheckCircle2,
  MapPin,
  DollarSign,
  ShieldCheck,
  Sun,
  Bed,
  Layers,
  Phone,
  User,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Plus,
  MessageCircle,
  FileCheck2,
  HardHat,
  Compass,
  Zap,
  Car,
} from 'lucide-react';
import { Governorate, PropertyType, FinishingStatus, ContractType } from '@/types/property';
import { propertyService } from '@/services/propertyService';
import { useCurrency } from '@/context/CurrencyContext';
import { useAuth } from '@/context/AuthContext';
import { SYRIAN_LOCATIONS } from '@/data/locations';
import { FloatingActionHub } from '@/components/FloatingActionHub';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function AddPropertyPage() {
  const { currency, formatPrice, convertPrice } = useCurrency();
  const { user, isAuthenticated, addMyListing } = useAuth();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [generatedRefCode, setGeneratedRefCode] = useState<string>('');

  // Form State
  const [title, setTitle] = useState<string>('');
  const [contractType, setContractType] = useState<ContractType>('sale');
  const [propertyType, setPropertyType] = useState<Exclude<PropertyType, 'all'>>('apartment');
  const [isOffPlan, setIsOffPlan] = useState<boolean>(false);
  const [governorate, setGovernorate] = useState<Exclude<Governorate, 'الكل'>>('دمشق');
  const [region, setRegion] = useState<string>('المزة');
  const [neighborhood, setNeighborhood] = useState<string>('');
  const [locationDetails, setLocationDetails] = useState<string>('');
  
  const [priceUsd, setPriceUsd] = useState<number | ''>(120000);
  const [area, setArea] = useState<number | ''>(140);
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(2);
  const [floor, setFloor] = useState<string>('طابق ثاني');
  const [direction, setDirection] = useState<string>('قبلي شرقي');
  const [ownershipType, setOwnershipType] = useState<string>('طابو سبز (2400 سهم)');
  const [finishingStatus, setFinishingStatus] = useState<FinishingStatus>('finished');
  
  const [hasSolar, setHasSolar] = useState<boolean>(true);
  const [hasElevator, setHasElevator] = useState<boolean>(true);
  const [hasGarage, setHasGarage] = useState<boolean>(false);
  const [hasGenerator, setHasGenerator] = useState<boolean>(false);
  
  const [handoverDate, setHandoverDate] = useState<string>('');
  const [paymentPlan, setPaymentPlan] = useState<string>('');
  const [constructionProgress, setConstructionProgress] = useState<number>(35);

  const [description, setDescription] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  
  // Submitter Details
  const [submitterName, setSubmitterName] = useState<string>(user?.name || '');
  const [submitterPhone, setSubmitterPhone] = useState<string>(user?.phone || user?.whatsapp || '');
  const [submitterRole, setSubmitterRole] = useState<'owner' | 'broker' | 'developer'>(
    user?.role === 'agency' ? 'broker' : 'owner'
  );

  // Auto-populate when user signs in or changes
  React.useEffect(() => {
    if (user) {
      setSubmitterName(user.name);
      setSubmitterPhone(user.phone || user.whatsapp);
      if (user.role === 'agency') {
        setSubmitterRole('broker');
      }
    }
  }, [user]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Available regions for the selected governorate
  const currentProvinceData = SYRIAN_LOCATIONS.find((l) => l.provinceNameAr === governorate);
  const availableRegions = currentProvinceData
    ? currentProvinceData.cities.map((c) => c.cityNameAr)
    : ['المزة', 'أبو رمانة', 'المالكي', 'كفرسوسة', 'مشروع دمر', 'يعفور'];

  // Handle Local Image Upload via FileReader
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImages((prev) => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddSamplePhotos = () => {
    setImages([
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    ]);
  };

  const handleSubmitProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalImages = images.length > 0
      ? images
      : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'];

    const featuresList: string[] = [];
    if (hasSolar) featuresList.push('طاقة شمسية');
    if (hasElevator) featuresList.push('مصعد شغال');
    if (hasGarage) featuresList.push('كراج خاص');
    if (hasGenerator) featuresList.push('مولدة كهرباء');
    if (ownershipType.includes('طابو سبز')) featuresList.push('طابو سبز 2400');
    if (isOffPlan) featuresList.push('بيع على المخطط بتسهيلات سداد');

    try {
      const submitted = await propertyService.submitPublicProperty({
        title: title || `عقار معروض ${contractType === 'sale' ? 'للبيع' : 'للإيجار'} في ${region}`,
        contractType: contractType === 'all' ? 'sale' : contractType,
        propertyType,
        isOffPlan,
        handoverDate: isOffPlan ? handoverDate : undefined,
        paymentPlan: isOffPlan ? paymentPlan : undefined,
        constructionProgress: isOffPlan ? constructionProgress : undefined,
        governorate,
        region,
        neighborhood,
        locationDetails: locationDetails || `${region} - ${governorate}`,
        priceUsd: Number(priceUsd) || 50000,
        area: Number(area) || 100,
        bedrooms,
        bathrooms,
        floor,
        direction,
        ownershipType,
        finishingStatus,
        hasSolar,
        hasElevator,
        hasGarage,
        hasGenerator,
        features: featuresList.length > 0 ? featuresList : ['إكساء ممتاز', 'موقع مميز'],
        images: finalImages,
        description: description || `عقار بمواصفات ممتازة وموقع راقٍ في ${region} - ${governorate}. للتواصل والاستفسار المباشر.`,
        whatsappNumber: submitterPhone.startsWith('+') ? submitterPhone : `+963${submitterPhone.replace(/^0+/, '')}`,
        contactPhone: submitterPhone,
        submitterName,
        submitterPhone,
      });

      // Attach to current user session listings if authenticated
      if (isAuthenticated) {
        addMyListing(submitted.id);
      }

      setGeneratedRefCode(submitted.propertyCode);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Submission failed:', err);
      alert('حدث خطأ أثناء إرسال العقار، يرجى المحاولة ثانية.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-cairo flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      <Header />

      <main className="flex-grow pt-28 pb-16 relative overflow-hidden">
      {/* Background Aurora Gradients */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Top Header & Intro */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold shadow-lg backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>انضم لأكبر شبكة عقارية موثوقة في سوريا</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black font-alexandria text-white">
            أضف عقارك مجاناً <span className="text-emerald-400">لآلاف المشترين</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            اعرض شقتك، فيلتك، أو مشروعك العقاري ليصل إلى آلاف الباحثين والمغتربين السوريين مباشرة مع مراجعة واعتماد رسمي من إدارة المنصة.
          </p>
        </div>

        {/* ================= SUCCESS STATE ================= */}
        {isSubmitted ? (
          <div className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-emerald-500/40 p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-300 ring-1 ring-emerald-500/20">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-8 ring-emerald-500/10 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black font-alexandria text-white">
                تم استلام عقارك بنجاح!
              </h2>
              <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                شكراً لك <strong className="text-white">{submitterName || 'عزيزنا المالك'}</strong>. الرمز المرجعي لطلبك هو{' '}
                <span className="font-mono font-bold text-amber-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 inline-block">
                  {generatedRefCode}
                </span>
              </p>
            </div>

            <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl max-w-md mx-auto text-xs text-emerald-200 text-right space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>ما هي الخطوة التالية؟</span>
              </div>
              <p className="leading-relaxed">
                يقوم فريق التدقيق لدينا بمراجعة صور وبيانات العقار والتأكد من مطابقتها لمعايير المنصة، وسيتم اعتماده ونشره خلال ساعات قليلة، وسنرسل لك إشعاراً مباشراً عبر واتساب.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Link
                href="/"
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-transform hover:scale-105"
              >
                العودة للرئيسية
              </Link>
              <Link
                href="/properties"
                className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition-colors"
              >
                تصفح العقارات المتاحة
              </Link>
            </div>
          </div>
        ) : (
          /* ================= MULTI-STEP WIZARD FORM ================= */
          <div className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-slate-700/80 p-6 sm:p-10 shadow-2xl ring-1 ring-white/10 space-y-8">
            
            {/* Step Progress Indicators */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 border-b border-slate-800 pb-6 text-center text-xs font-bold">
              <div
                className={`flex items-center justify-center gap-2 p-2.5 rounded-2xl border transition-all ${
                  currentStep === 1
                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400 ring-1 ring-emerald-500/30'
                    : currentStep > 1
                    ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                    : 'bg-slate-800/50 border-slate-800 text-slate-500'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center text-[10px]">
                  1
                </span>
                <span className="hidden sm:inline">الموقع ونوع العقار</span>
              </div>

              <div
                className={`flex items-center justify-center gap-2 p-2.5 rounded-2xl border transition-all ${
                  currentStep === 2
                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400 ring-1 ring-emerald-500/30'
                    : currentStep > 2
                    ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                    : 'bg-slate-800/50 border-slate-800 text-slate-500'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center text-[10px]">
                  2
                </span>
                <span className="hidden sm:inline">الأسعار والمواصفات والصور</span>
              </div>

              <div
                className={`flex items-center justify-center gap-2 p-2.5 rounded-2xl border transition-all ${
                  currentStep === 3
                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400 ring-1 ring-emerald-500/30'
                    : 'bg-slate-800/50 border-slate-800 text-slate-500'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center text-[10px]">
                  3
                </span>
                <span className="hidden sm:inline">بيانات التواصل والتأكيد</span>
              </div>
            </div>

            <form onSubmit={handleSubmitProperty} className="space-y-6 text-right">
              
              {/* ================= STEP 1: Basic Info & Location ================= */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <h3 className="text-lg font-black font-alexandria text-white flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-emerald-400" />
                      <span>الخطوة 1: تحديد الموقع ونوع العقار</span>
                    </h3>
                    <p className="text-xs text-slate-400">حدد الموقع الجغرافي ونوع العقد بدقة</p>
                  </div>

                  {/* Property Title */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-300">
                      عنوان الإعلان المقترح *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: شقة سوبر ديلوكس مطلة على حديقة الجاحظ بأبو رمانة"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-2xl p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>

                  {/* Contract Type & Property Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-300">نوع العقد *</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setContractType('sale')}
                          className={`p-3 rounded-2xl text-xs font-bold border transition-all ${
                            contractType === 'sale'
                              ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30'
                              : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                          }`}
                        >
                          للبيـع
                        </button>
                        <button
                          type="button"
                          onClick={() => setContractType('rent')}
                          className={`p-3 rounded-2xl text-xs font-bold border transition-all ${
                            contractType === 'rent'
                              ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30'
                              : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                          }`}
                        >
                          للإيجـار
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-300">نوع العقار *</label>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value as any)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-3 text-xs sm:text-sm text-white font-bold focus:outline-none focus:border-emerald-500"
                      >
                        <option value="apartment">شقة سكنية</option>
                        <option value="villa">فيلا أو قصر مستقل</option>
                        <option value="chalet">مزرعة أو استراحة</option>
                        <option value="commercial">مكتب أو مقر تجاري</option>
                        <option value="land">أرض أو مقسم استثماري</option>
                      </select>
                    </div>
                  </div>

                  {/* Off-Plan Switch */}
                  <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <HardHat className="w-4 h-4 text-amber-400" />
                        <span>هل العقار بيع على المخطط (قيد الإنشاء / مشروع استثماري)؟</span>
                      </span>
                      <span className="text-[11px] text-slate-400 block">
                        فعل هذا الخيار إذا كان العقار في مرحلة الهيكل أو التشييد مع خطة أقساط
                      </span>
                    </div>

                    <input
                      type="checkbox"
                      checked={isOffPlan}
                      onChange={(e) => setIsOffPlan(e.target.checked)}
                      className="w-5 h-5 rounded text-amber-500 bg-slate-800 border-slate-700 cursor-pointer"
                    />
                  </div>

                  {/* Governorate & Region */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-300">المحافظة *</label>
                      <select
                        value={governorate}
                        onChange={(e) => {
                          const newGov = e.target.value as Governorate;
                          if (newGov !== 'الكل') {
                            setGovernorate(newGov);
                            const prov = SYRIAN_LOCATIONS.find((l) => l.provinceNameAr === newGov);
                            if (prov && prov.cities.length > 0) {
                              setRegion(prov.cities[0].cityNameAr);
                            }
                          }
                        }}
                        className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-3 text-xs sm:text-sm text-white font-bold focus:outline-none focus:border-emerald-500"
                      >
                        {SYRIAN_LOCATIONS.map((loc) => (
                          <option key={loc.provinceId} value={loc.provinceNameAr}>
                            محافظة {loc.provinceNameAr}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-300">المنطقة / الحي *</label>
                      <input
                        type="text"
                        required
                        placeholder="مثال: المزة، أبو رمانة، يعفور، الشهباء..."
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-3 text-xs sm:text-sm text-white font-bold focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Detailed Location Description */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-300">
                      وصف العنوان ومحيط العقار بالتفصيل
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: شارع الجاحظ الرئيسي مقابل القنصلية، قرب الخدمات والمواصلات"
                      value={locationDetails}
                      onChange={(e) => setLocationDetails(e.target.value)}
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-2xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Next Step Button */}
                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (!title.trim() || !region.trim()) {
                          alert('يرجى كتابة عنوان الإعلان والمنطقة للمتابعة.');
                          return;
                        }
                        setCurrentStep(2);
                      }}
                      className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-transform hover:scale-105"
                    >
                      <span>المتابعة إلى المواصفات والصور</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ================= STEP 2: Specs, Price & Photos ================= */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <h3 className="text-lg font-black font-alexandria text-white flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-emerald-400" />
                      <span>الخطوة 2: الأسعار والمواصفات الفنية والصور</span>
                    </h3>
                    <p className="text-xs text-slate-400">أدخل السعر المطلوب والميزات الهامة</p>
                  </div>

                  {/* Price in USD and Calculator */}
                  <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-2xl space-y-2">
                    <label className="block text-xs font-bold text-slate-200">
                      السعر المطلوب بالدولار ($ USD) *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                      <input
                        type="number"
                        required
                        min="1"
                        placeholder="120000"
                        value={priceUsd}
                        onChange={(e) => setPriceUsd(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-600 rounded-xl p-3 text-base font-black text-emerald-400 focus:outline-none focus:border-emerald-500 font-mono"
                      />
                      <div className="text-xs text-slate-400 space-y-0.5">
                        <span className="block font-semibold">يعادل تقريباً بالليرة السورية:</span>
                        <span className="text-sm font-bold text-amber-300 font-alexandria">
                          {priceUsd ? formatPrice(Number(priceUsd)) : '—'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Specs: Area, Bedrooms, Bathrooms, Floor */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-300">المساحة (م²) *</label>
                      <input
                        type="number"
                        required
                        min="10"
                        value={area}
                        onChange={(e) => setArea(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs sm:text-sm text-white font-bold focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-300">غرف النوم</label>
                      <select
                        value={bedrooms}
                        onChange={(e) => setBedrooms(Number(e.target.value))}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs sm:text-sm text-white font-bold focus:outline-none"
                      >
                        <option value={1}>غرفة واحدة (1)</option>
                        <option value={2}>غرفتان (2)</option>
                        <option value={3}>3 غرف نوم</option>
                        <option value={4}>4 غرف نوم</option>
                        <option value={5}>5 غرف نوم فأكثر</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-300">الحمامات</label>
                      <select
                        value={bathrooms}
                        onChange={(e) => setBathrooms(Number(e.target.value))}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs sm:text-sm text-white font-bold focus:outline-none"
                      >
                        <option value={1}>حمام 1</option>
                        <option value={2}>حمامان (2)</option>
                        <option value={3}>3 حمامات</option>
                        <option value={4}>4 حمامات+</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-300">الطابق</label>
                      <input
                        type="text"
                        placeholder="طابق ثاني"
                        value={floor}
                        onChange={(e) => setFloor(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs sm:text-sm text-white font-bold focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Ownership & Finishing */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-300">سند الملكية والقيد العقاري *</label>
                      <select
                        value={ownershipType}
                        onChange={(e) => setOwnershipType(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-white font-bold focus:outline-none"
                      >
                        <option value="طابو سبز (2400 سهم)">طابو سبز نظامي (2400 سهم)</option>
                        <option value="حكم محكمة مبرم">حكم محكمة مبرم</option>
                        <option value="سجل مؤقت معتمد">سجل مؤقت معتمد (مرسوم 66)</option>
                        <option value="وكالة كاتب عدل غير قابلة للعزل">وكالة كاتب عدل غير قابلة للعزل</option>
                        <option value="أسهم شائعة زراعية">أسهم شائعة زراعية</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-300">حالة الإكساء والتشطيب</label>
                      <select
                        value={finishingStatus}
                        onChange={(e) => setFinishingStatus(e.target.value as FinishingStatus)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-white font-bold focus:outline-none"
                      >
                        <option value="luxury">سوبر ديلوكس فاخر</option>
                        <option value="finished">مكسي وجاهز للسكن</option>
                        <option value="semi_finished">نصف إكساء</option>
                        <option value="shell">على الهيكل (عظم)</option>
                      </select>
                    </div>
                  </div>

                  {/* Off-Plan Details (If checked) */}
                  {isOffPlan && (
                    <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-3">
                      <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                        <HardHat className="w-4 h-4" />
                        <span>بيانات التسليم والأقساط للمشروع</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 mb-1">موعد التسليم المتوقع</label>
                          <input
                            type="text"
                            placeholder="الربع الرابع 2026"
                            value={handoverDate}
                            onChange={(e) => setHandoverDate(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 mb-1">تسهيلات وخطة السداد</label>
                          <input
                            type="text"
                            placeholder="دفعة 20% وأقساط على 3 سنوات"
                            value={paymentPlan}
                            onChange={(e) => setPaymentPlan(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Amenities Checkboxes */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-300">الخدمات والميزات المتوفرة</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setHasSolar(!hasSolar)}
                        className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold border transition-all ${
                          hasSolar ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        <Sun className="w-4 h-4 text-amber-400" />
                        <span>طاقة شمسية</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setHasElevator(!hasElevator)}
                        className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold border transition-all ${
                          hasElevator ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        <Layers className="w-4 h-4 text-emerald-400" />
                        <span>مصعد شغال</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setHasGarage(!hasGarage)}
                        className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold border transition-all ${
                          hasGarage ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        <Car className="w-4 h-4 text-slate-400" />
                        <span>كراج خاص</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setHasGenerator(!hasGenerator)}
                        className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold border transition-all ${
                          hasGenerator ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span>مولدة كهرباء</span>
                      </button>
                    </div>
                  </div>

                  {/* Photo Upload Dropzone */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-300">
                        صور العقار ({images.length} صور مضافة)
                      </label>
                      <button
                        type="button"
                        onClick={handleAddSamplePhotos}
                        className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300"
                      >
                        + إضافة صور نموذجية سريعة
                      </button>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-3xl p-6 text-center cursor-pointer bg-slate-800/40 hover:bg-slate-800/80 transition-all space-y-2"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-slate-200">
                        انقر لرفع صور العقار من جهازك أو اسحب الصور إلى هنا
                      </p>
                      <span className="text-[11px] text-slate-500 block">
                        يدعم JPG, PNG بجودة عالية (الحد الأقصى 10 صور)
                      </span>
                    </div>

                    {/* Previews Grid */}
                    {images.length > 0 && (
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 pt-2">
                        {images.map((imgUrl, idx) => (
                          <div key={idx} className="relative aspect-4/3 rounded-xl overflow-hidden border border-slate-700 group">
                            <img src={imgUrl} alt={`صورة ${idx + 1}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveImage(idx);
                              }}
                              className="absolute top-1 right-1 p-1 rounded-full bg-red-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-300">
                      شرح وتفاصيل إضافية عن العقار
                    </label>
                    <textarea
                      rows={3}
                      placeholder="اذكر أي تفاصيل إضافية ترغب بعرضها للمشترين (مثل نوع الرخام، التكييف، القرب من الأسواق...)"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-2xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Step 2 Actions */}
                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                      <span>السابق</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (!priceUsd || !area) {
                          alert('يرجى تحديد السعر والمساحة للمتابعة.');
                          return;
                        }
                        setCurrentStep(3);
                      }}
                      className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-transform hover:scale-105"
                    >
                      <span>المتابعة إلى بيانات التواصل</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ================= STEP 3: Submitter Contact & Final Confirmation ================= */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <h3 className="text-lg font-black font-alexandria text-white flex items-center gap-2">
                      <User className="w-5 h-5 text-emerald-400" />
                      <span>الخطوة 3: بيانات التواصل وتأكيد النشر</span>
                    </h3>
                    <p className="text-xs text-slate-400">أدخل معلوماتك لنربط المشترين معك ونؤكد اعتماد العقار</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-300">الاسم الكامل أو اسم المكتب *</label>
                      <input
                        type="text"
                        required
                        placeholder="مثال: م. أحمد الخالد أو عقارات دمشق"
                        value={submitterName}
                        onChange={(e) => setSubmitterName(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-3 text-xs sm:text-sm text-white font-bold focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-300">رقم الواتساب للتواصل *</label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          dir="ltr"
                          placeholder="+963 988 123 456"
                          value={submitterPhone}
                          onChange={(e) => setSubmitterPhone(e.target.value)}
                          className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-3 text-xs sm:text-sm text-emerald-400 font-bold focus:outline-none focus:border-emerald-500 font-mono text-left"
                        />
                        <MessageCircle className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-300">صفتك المعلنة</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setSubmitterRole('owner')}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                          submitterRole === 'owner' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        المالك المباشر
                      </button>
                      <button
                        type="button"
                        onClick={() => setSubmitterRole('broker')}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                          submitterRole === 'broker' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        وسيط / مكتب عقاري
                      </button>
                      <button
                        type="button"
                        onClick={() => setSubmitterRole('developer')}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                          submitterRole === 'developer' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        مطور / شركة بناء
                      </button>
                    </div>
                  </div>

                  {/* Summary Preview Box */}
                  <div className="p-4 bg-slate-800/60 border border-slate-700/80 rounded-2xl space-y-2 text-xs">
                    <span className="text-xs font-bold text-slate-300 block">ملخص بيانات العقار:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-300">
                      <div>• العنوان: <strong className="text-white">{title}</strong></div>
                      <div>• الموقع: <strong className="text-white">{region} - {governorate}</strong></div>
                      <div>• السعر: <strong className="text-emerald-400">{priceUsd ? `$${Number(priceUsd).toLocaleString()}` : ''}</strong></div>
                      <div>• المساحة: <strong className="text-white">{area} م²</strong></div>
                      <div>• الملكية: <strong className="text-white">{ownershipType}</strong></div>
                      <div>• الصور: <strong className="text-white">{images.length} صور</strong></div>
                    </div>
                  </div>

                  {/* Moderation Guarantee Note */}
                  <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl text-xs text-emerald-200 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                      <ShieldCheck className="w-4 h-4" />
                      <span>ضمان الجودة والمراجعة السريعة</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-300">
                      بالنقر على زر الإرسال أدناه، سيتم حفظ عقارك بحالة <strong className="text-amber-300">&quot;قيد المراجعة&quot;</strong>، حيث يقوم فريق المنصة بالتحقق من البيانات ونشره فوراً وتزويدك برابط العقار على واتساب.
                    </p>
                  </div>

                  {/* Step 3 Actions */}
                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                      <span>السابق</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-xl shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>جاري إرسال العقار...</span>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>إرسال العقار للمراجعة والنشر مجاناً</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>
        )}

      </div>

      <FloatingActionHub />
      </main>

      <Footer />
    </div>
  );
}
