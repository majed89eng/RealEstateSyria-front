'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Building2, Lock, Mail, ShieldCheck, ArrowRight, KeyRound } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('admin@realestate-syria.com');
  const [password, setPassword] = useState<string>('admin123');
  const [role, setRole] = useState<'super_admin' | 'editor'>('super_admin');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('يرجى إدخال البريد الإلكتروني وكلمة المرور.');
      return;
    }

    // Save session in localStorage
    const session = {
      name: role === 'super_admin' ? 'المدير العام (Super Admin)' : 'محرر العقارات (Editor)',
      email,
      role,
      token: `token_${Date.now()}`,
      loggedInAt: new Date().toISOString(),
    };

    localStorage.setItem('syria_realestate_admin_session', JSON.stringify(session));
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-cairo flex items-center justify-center p-4 selection:bg-emerald-500 selection:text-white">
      {/* Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6">
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-emerald-600/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold font-alexandria text-white">
            بوابة إدارة منصة عقارات سوريا
          </h1>
          <p className="text-xs text-slate-400">
            لوحة تحكم مخصصة لإدارة العروض العقارية، أسعار الصرف، ومتابعة العملاء.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pr-10 pl-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">كلمة المرور</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pr-10 pl-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">الصلاحية (الدور)</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('super_admin')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                  role === 'super_admin'
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-750'
                }`}
              >
                Super Admin (كامل الصلاحيات)
              </button>

              <button
                type="button"
                onClick={() => setRole('editor')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                  role === 'editor'
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-750'
                }`}
              >
                Editor (محرر عقارات)
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 mt-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>تسجيل الدخول إلى لوحة التحكم</span>
          </button>
        </form>

        <div className="pt-4 border-t border-slate-800 text-center">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1"
          >
            <span>العودة إلى الصفحة الرئيسية للموقع</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
