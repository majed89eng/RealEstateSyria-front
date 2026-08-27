'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Building2,
  Lock,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  ShieldCheck,
  User,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Award,
  FileText,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';

const GOVERNORATES = ['دمشق', 'ريف دمشق', 'حلب', 'حمص', 'حماة', 'اللاذقية', 'طرطوس'];

const AGENCY_SPECIALTY_OPTIONS = [
  'شقق سكنية راقية',
  'فيلات وقصور',
  'مزارع واستراحات',
  'مكاتب ومحلات تجارية',
  'أراضٍ ومقاسم استثمارية',
  'البيع على المخطط (قيد الإنشاء)',
  'إيجارات سنوية ودبلوماسية',
];

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated } = useAuth();

  const [role, setRole] = useState<UserRole>('user');
  const [name, setName] = useState('');
  const [agencyName, setAgencyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+963 ');
  const [whatsapp, setWhatsapp] = useState('+963 ');
  const [governorate, setGovernorate] = useState('دمشق');
  const [region, setRegion] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(['شقق سكنية راقية']);
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const toggleSpecialty = (spec: string) => {
    if (selectedSpecialties.includes(spec)) {
      setSelectedSpecialties(selectedSpecialties.filter((s) => s !== spec));
    } else {
      setSelectedSpecialties([...selectedSpecialties, spec]);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 4) {
      setError('كلمة المرور يجب أن تتكون من 4 محارف على الأقل.');
      return;
    }

    if (password !== confirmPassword) {
      setError('كلمة المرور وتأكيدها غير متطابقين.');
      return;
    }

    setIsLoading(true);

    const isAgency = role === 'agency';
    const finalName = isAgency ? agencyName : name;

    if (!finalName) {
      setError(isAgency ? 'يرجى إدخال اسم المكتب العقاري.' : 'يرجى إدخال اسمك الكامل.');
      setIsLoading(false);
      return;
    }

    const userData = {
      name: finalName,
      email,
      phone,
      whatsapp: whatsapp || phone,
      role,
      city: `${governorate}${region ? ' - ' + region : ''}`,
      agencyDetails: isAgency
        ? {
            agencyName,
            licenseNumber: licenseNumber || 'قيد التدقيق والتسجيل',
            governorate,
            region: region || 'المركز',
            specialties: selectedSpecialties,
            description: description || 'مكتب عقاري معتمد لتقديم أفضل العروض والفرص الاستثمارية.',
            badge: 'مكتب مسجل حديثاً 🛡️',
            isVerified: false,
          }
        : undefined,
    };

    const res = await register(userData, password);
    setIsLoading(false);

    if (res.success) {
      router.push('/dashboard');
    } else {
      setError(res.error || 'حدث خطأ أثناء إنشاء الحساب، يرجى المحاولة مرة أخرى.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-cairo selection:bg-emerald-500 selection:text-white">
      {/* Glow Effects */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 group mb-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-xl shadow-emerald-600/30 group-hover:scale-105 transition-transform duration-200">
              <Building2 className="w-7 h-7" />
            </div>
            <span className="text-2xl font-black font-alexandria text-white tracking-tight">
              عقارات سوريا
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-alexandria text-white">
            انضم إلى منصة عقارات سوريا
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            أنشئ حسابك للوصول إلى العروض الحصرية، حفظ المفضلة، أو نشر وتسويق عقاراتك
          </p>
        </div>

        {/* Account Role Selector Card */}
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-3xl p-3 sm:p-4 mb-6 shadow-xl">
          <div className="text-xs font-bold text-slate-300 mb-2 px-2">اختر نوع الحساب:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('user')}
              className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-right ${
                role === 'user'
                  ? 'bg-emerald-950/70 border-emerald-500 shadow-md shadow-emerald-950/50'
                  : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800 text-slate-400'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  role === 'user' ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
                }`}
              >
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className={`text-sm font-bold ${role === 'user' ? 'text-white' : 'text-slate-200'}`}>
                  حساب فردي (باحث عن عقار)
                </div>
                <div className="text-[11px] text-slate-400">
                  لحفظ العقارات المفضلة، تلقي التنبيهات، والتواصل مع المعلنين
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setRole('agency')}
              className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all text-right ${
                role === 'agency'
                  ? 'bg-emerald-950/70 border-emerald-500 shadow-md shadow-emerald-950/50'
                  : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800 text-slate-400'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  role === 'agency' ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
                }`}
              >
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <div className={`text-sm font-bold ${role === 'agency' ? 'text-white' : 'text-slate-200'}`}>
                  حساب مكتب / وسيط عقاري 🛡️
                </div>
                <div className="text-[11px] text-slate-400">
                  لنشر العروض باسم المكتب، إدارة العملاء، والظهور في دليل المكاتب
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Main Form Box */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {error && (
            <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {role === 'user' ? (
              /* User Individual Form */
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  الاسم الكامل
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="مثال: أحمد عبد الله"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl pr-10 pl-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            ) : (
              /* Agency Specific Form */
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    اسم المكتب أو الشركة العقارية *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="مثال: مكتب الفيحاء للاستشارات العقارية"
                      value={agencyName}
                      onChange={(e) => setAgencyName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl pr-10 pl-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      اسم المسؤول / المدير
                    </label>
                    <input
                      type="text"
                      placeholder="الاسم الثلاثي للمدير"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      رقم الترخيص / السجل التجاري (إن وجد)
                    </label>
                    <div className="relative">
                      <FileText className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        placeholder="مثال: ترخيص دمشق رقم 215"
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl pr-10 pl-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    تخصصات المكتب (حدد ما ينطبق):
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {AGENCY_SPECIALTY_OPTIONS.map((spec) => {
                      const isSelected = selectedSpecialties.includes(spec);
                      return (
                        <button
                          key={spec}
                          type="button"
                          onClick={() => toggleSpecialty(spec)}
                          className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                            isSelected
                              ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                              : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-750'
                          }`}
                        >
                          {spec}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                البريد الإلكتروني *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="contact@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl pr-10 pl-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Phone & WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  رقم الهاتف السوري *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="tel"
                    required
                    placeholder="+963 944 123 456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    dir="ltr"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl pr-10 pl-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 text-right"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  رقم الواتساب (للتواصل المباشر)
                </label>
                <div className="relative">
                  <MessageCircle className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                  <input
                    type="tel"
                    placeholder="+963 944 123 456"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    dir="ltr"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl pr-10 pl-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 text-right"
                  />
                </div>
              </div>
            </div>

            {/* Governorate & Region */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  المحافظة الرئيسية *
                </label>
                <select
                  value={governorate}
                  onChange={(e) => setGovernorate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  {GOVERNORATES.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  المنطقة / الحي
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="مثال: المزة - أوتوستراد"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl pr-10 pl-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Description (If agency) */}
            {role === 'agency' && (
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  نبذة تعريفية عن المكتب
                </label>
                <textarea
                  rows={2}
                  placeholder="اكتب نبذة مختصرة تبرز خبرات وخدمات المكتب للظهور في الدليل..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl p-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            )}

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  كلمة المرور *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl pr-10 pl-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  تأكيد كلمة المرور *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl pr-10 pl-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm transition-all duration-200 shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 mt-4"
            >
              {isLoading ? (
                <span>جاري إنشاء الحساب...</span>
              ) : (
                <>
                  <span>إتمام إنشاء الحساب والدخول</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="pt-4 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400">
              لديك حساب بالفعل؟{' '}
              <Link
                href="/login"
                className="text-emerald-400 hover:text-emerald-300 font-bold underline underline-offset-4 mr-1"
              >
                تسجيل الدخول هنا
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
