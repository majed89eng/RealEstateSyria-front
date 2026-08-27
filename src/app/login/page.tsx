'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Building2,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  User,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Briefcase,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/dashboard';

  const { login, loginAsDemo, isAuthenticated, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect
  React.useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin' && redirectUrl === '/dashboard') {
        router.push('/admin/dashboard');
      } else {
        router.push(redirectUrl);
      }
    }
  }, [isAuthenticated, user, redirectUrl, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const res = await login(email, password);
    setIsLoading(false);

    if (res.success) {
      router.push(redirectUrl);
    } else {
      setError(res.error || 'فشل تسجيل الدخول. يرجى التأكد من البيانات المدخلة.');
    }
  };

  const handleDemoLogin = (role: UserRole) => {
    setError(null);
    loginAsDemo(role);
    if (role === 'admin') {
      router.push('/admin/dashboard');
    } else {
      router.push(redirectUrl);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-cairo selection:bg-emerald-500 selection:text-white">
      {/* Background Decorative Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        {/* Brand Logo */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-xl shadow-emerald-600/30 group-hover:scale-105 transition-transform duration-200">
              <Building2 className="w-7 h-7" />
            </div>
            <span className="text-2xl font-black font-alexandria text-white tracking-tight">
              عقارات سوريا
            </span>
          </Link>
          <h2 className="mt-4 text-xl sm:text-2xl font-bold font-alexandria text-white">
            تسجيل الدخول إلى حسابك
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-400">
            أهلاً بك مجدداً في المنصة العقارية الأولى في دمشق والمحافظات
          </p>
        </div>

        {/* Demo Fast Logins Bar */}
        <div className="mt-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-2.5">
            <Sparkles className="w-4 h-4 animate-pulse text-amber-400" />
            <span>تجربة فورية للحسابات (Demo Quick Login):</span>
          </div>
          <p className="text-[11px] text-slate-400 mb-3">
            اضغط لتسجيل الدخول مباشرة وتجربة لوحة التحكم والميزات المخصصة لكل دور:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('user')}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 hover:border-emerald-500/50 text-xs font-bold transition-all hover:scale-[1.02]"
            >
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span>مستخدم عادي</span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('agency')}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 text-xs font-bold transition-all hover:scale-[1.02]"
            >
              <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
              <span>مكتب عقاري 🛡️</span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 hover:border-amber-500/50 text-xs font-bold transition-all hover:scale-[1.02]"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>إدارة المنصة</span>
            </button>
          </div>
        </div>

        {/* Main Card Form */}
        <div className="mt-4 bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {error && (
            <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                البريد الإلكتروني أو اسم المستخدم
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl pr-10 pl-4 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-300">كلمة المرور</label>
                <button
                  type="button"
                  onClick={() => alert('في هذه النسخة التجريبية يمكنك استخدام تسجيل الدخول السريع أو أي كلمة مرور مكونة من 4 محارف فأكثر.')}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  نسيت كلمة المرور؟
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl pr-10 pl-11 py-3 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {isLoading ? (
                <span>جاري تسجيل الدخول...</span>
              ) : (
                <>
                  <span>تسجيل الدخول</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Register Link Footer */}
          <div className="pt-4 border-t border-slate-800 text-center space-y-3">
            <p className="text-xs text-slate-400">
              ليس لديك حساب بعد؟{' '}
              <Link
                href="/register"
                className="text-emerald-400 hover:text-emerald-300 font-bold underline underline-offset-4 mr-1"
              >
                إنشاء حساب جديد (مستخدم أو مكتب عقاري)
              </Link>
            </p>

            <div>
              <Link
                href="/"
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-1"
              >
                <span>العودة للصفحة الرئيسية</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">جاري التحميل...</div>}>
      <LoginForm />
    </Suspense>
  );
}
