'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Building2,
  User,
  Briefcase,
  ShieldCheck,
  Plus,
  Heart,
  Eye,
  MessageCircle,
  Phone,
  MapPin,
  Calendar,
  LogOut,
  Settings,
  CheckCircle2,
  Clock,
  Trash2,
  ExternalLink,
  Edit3,
  Award,
  Sparkles,
  Share2,
  Filter,
  Search,
  Check,
  AlertCircle,
  Tag,
  Layers,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useCurrency } from '../../context/CurrencyContext';
import { Property, AvailabilityStatus } from '../../types/property';
import { propertyService } from '../../services/propertyService';
import { exchangeRateService } from '../../services/exchangeRateService';
import { PropertyCard } from '../../components/PropertyCard';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout, updateProfile, removeMyListing, inquiries, markInquiryStatus, deleteInquiry } = useAuth();
  const { favorites, clearFavorites } = useFavorites();
  const { currency } = useCurrency();

  const [activeTab, setActiveTab] = useState<'overview' | 'my-properties' | 'favorites' | 'inquiries' | 'settings'>('overview');
  const [myPropertiesList, setMyPropertiesList] = useState<Property[]>([]);
  const [favoritePropertiesList, setFavoritePropertiesList] = useState<Property[]>([]);
  const [loadingProperties, setLoadingProperties] = useState<boolean>(true);
  const [statusNotification, setStatusNotification] = useState<string | null>(null);

  // Settings form states
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editWhatsapp, setEditWhatsapp] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editSpecialties, setEditSpecialties] = useState<string[]>([]);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Initialize settings from user
  useEffect(() => {
    if (user) {
      setEditName(user.name || '');
      setEditPhone(user.phone || '');
      setEditWhatsapp(user.whatsapp || '');
      setEditCity(user.city || '');
      if (user.agencyDetails) {
        setEditDescription(user.agencyDetails.description || '');
        setEditSpecialties(user.agencyDetails.specialties || []);
      }
    }
  }, [user]);

  // Load properties (My properties & Favorites)
  useEffect(() => {
    async function loadData() {
      if (!user) return;
      setLoadingProperties(true);

      try {
        const allProps = await propertyService.getProperties(undefined, true);

        // 1. My properties
        const myIds = user.myListings || [];
        const userProps = allProps.filter((p) => myIds.includes(p.id) || p.submitterPhone === user.phone);
        setMyPropertiesList(userProps);

        // 2. Favorites
        const favProps = allProps.filter((p) => favorites.includes(p.id));
        setFavoritePropertiesList(favProps);
      } catch (err) {
        console.error('Error loading dashboard properties:', err);
      } finally {
        setLoadingProperties(false);
      }
    }

    if (user) {
      loadData();
    }
  }, [user, favorites]);

  // If not authenticated and not loading, redirect to login
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login?redirect=/dashboard');
    }
  }, [isLoading, isAuthenticated, router]);

  const showNotification = (msg: string) => {
    setStatusNotification(msg);
    setTimeout(() => setStatusNotification(null), 3500);
  };

  const handleUpdateStatus = async (propertyId: string, newStatus: AvailabilityStatus) => {
    const success = await propertyService.updatePropertyStatus(propertyId, newStatus);
    if (success) {
      setMyPropertiesList((prev) =>
        prev.map((p) => (p.id === propertyId ? { ...p, availabilityStatus: newStatus } : p))
      );
      showNotification('تم تحديث حالة توفر العقار بنجاح.');
    }
  };

  const handleDeleteProperty = async (propertyId: string) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا العرض العقاري نهائياً؟')) return;
    const success = await propertyService.deleteProperty(propertyId);
    if (success) {
      removeMyListing(propertyId);
      setMyPropertiesList((prev) => prev.filter((p) => p.id !== propertyId));
      showNotification('تم حذف العقار بنجاح.');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);

    updateProfile({
      name: editName,
      phone: editPhone,
      whatsapp: editWhatsapp,
      city: editCity,
      agencyDetails: user?.agencyDetails
        ? {
            ...user.agencyDetails,
            description: editDescription,
            specialties: editSpecialties,
          }
        : undefined,
    });

    setTimeout(() => {
      setIsSavingSettings(false);
      showNotification('تم حفظ بيانات الملف الشخصي بنجاح.');
    }, 300);
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white font-cairo">
        <div className="w-12 h-12 rounded-2xl bg-emerald-600 animate-pulse flex items-center justify-center mb-4">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <p className="text-sm font-semibold text-slate-400">جاري تحميل لوحة التحكم...</p>
      </div>
    );
  }

  const isAgency = user.role === 'agency';
  const isAdmin = user.role === 'admin';
  const totalViews = myPropertiesList.reduce((acc, p) => acc + (p.viewsCount || 45), 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-cairo selection:bg-emerald-500 selection:text-white flex flex-col">
      <Header />

      {/* Floating Status Notification Toast */}
      {statusNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white text-xs sm:text-sm font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusNotification}</span>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Profile Header Banner */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-850 via-slate-800 to-slate-850 border border-slate-700/80 p-6 sm:p-8 shadow-2xl overflow-hidden mb-8">
          {/* Background Decorative Accents */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* User Info Avatar & Title */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative">
                <img
                  src={
                    user.avatar ||
                    (isAgency
                      ? 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80'
                      : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80')
                  }
                  alt={user.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl object-cover border-2 border-emerald-500/50 shadow-xl"
                />
                <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-lg shadow-md">
                  {isAgency ? <Briefcase className="w-3.5 h-3.5" /> : isAdmin ? <ShieldCheck className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black font-alexandria text-white">
                    {user.name}
                  </h1>
                  {isAgency && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <Award className="w-3 h-3 text-emerald-400" />
                      <span>{user.agencyDetails?.badge || 'مكتب معتمد 🛡️'}</span>
                    </span>
                  )}
                  {isAdmin && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-amber-400" />
                      <span>إدارة المنصة</span>
                    </span>
                  )}
                  {!isAgency && !isAdmin && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-700 text-slate-300">
                      باحث عن عقار
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-2 text-xs text-slate-400">
                  {user.city && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{user.city}</span>
                    </span>
                  )}
                  <span className="flex items-center gap-1" dir="ltr">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{user.phone}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>عضو منذ {user.createdAt || '2026'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <Link
                href="/add-property"
                className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة عقار جديد</span>
              </Link>

              {isAdmin && (
                <Link
                  href="/admin/dashboard"
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-600/20 transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>لوحة الإدارة</span>
                </Link>
              )}

              <button
                type="button"
                onClick={logout}
                className="p-2.5 rounded-2xl bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700 transition-colors"
                title="تسجيل الخروج"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Overview Stat Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
              <span>عقاراتي المعروضة</span>
              <Building2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-alexandria text-white">
              {myPropertiesList.length}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1">
              {myPropertiesList.filter((p) => p.availabilityStatus === 'available').length} متاح حالياً
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
              <span>إجمالي المشاهدات</span>
              <Eye className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-alexandria text-white">
              {totalViews.toLocaleString('ar-SY')}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">مشاهدة حقيقية للعروض</div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
              <span>طلبات واستفسارات العملاء</span>
              <MessageCircle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-alexandria text-white">
              {inquiries.length}
            </div>
            <div className="text-[11px] text-amber-400 mt-1">
              {inquiries.filter((i) => i.status === 'new').length} طلب جديد بحاجة لرد
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
              <span>العقارات المفضلة</span>
              <Heart className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-alexandria text-white">
              {favorites.length}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">عقارات محفوظة للمتابعة</div>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex border-b border-slate-750 gap-2 sm:gap-4 overflow-x-auto pb-2 mb-6 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>نظرة عامة</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('my-properties')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'my-properties'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>عقاراتي المعروضة ({myPropertiesList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'inquiries'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>استفسارات العملاء ({inquiries.length})</span>
            {inquiries.some((i) => i.status === 'new') && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'favorites'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>المفضلة ({favorites.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>إعدادات الملف</span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Banner for Agency Details if available */}
            {isAgency && user.agencyDetails && (
              <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-6 shadow-xl">
                <h2 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-400" />
                  <span>معلومات واعتماد المكتب:</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 block mb-1">الترخيص النقابي / السجل:</span>
                    <span className="text-white font-bold">{user.agencyDetails.licenseNumber}</span>
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 block mb-1">المنطقة والموقع:</span>
                    <span className="text-white font-bold">{user.agencyDetails.region}</span>
                  </div>
                  <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
                    <span className="text-slate-400 block mb-1">سنوات الخبرة:</span>
                    <span className="text-white font-bold">{user.agencyDetails.experienceYears || 10} سنوات في السوق السوري</span>
                  </div>
                </div>

                {user.agencyDetails.specialties && user.agencyDetails.specialties.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2 items-center">
                    <span className="text-xs text-slate-400 font-bold">التخصصات:</span>
                    {user.agencyDetails.specialties.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] px-2.5 py-1 rounded-xl bg-slate-900 text-emerald-300 border border-emerald-500/30"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Saved Searches / Alerts */}
            {user.savedSearches && user.savedSearches.length > 0 && (
              <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-6 shadow-xl">
                <h2 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>تنبيهاتي وعمليات البحث المحفوظة:</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {user.savedSearches.map((s) => (
                    <div
                      key={s.id}
                      className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="text-xs font-bold text-white mb-1">{s.title}</div>
                        <div className="text-[10px] text-slate-400">تاريخ الإضافة: {s.createdAt}</div>
                      </div>
                      <Link
                        href={s.query}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 text-xs font-bold transition-colors shrink-0"
                      >
                        تصفح النتائج
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Properties Preview */}
            <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>أحدث عروضي العقارية:</span>
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveTab('my-properties')}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-bold"
                >
                  عرض كافة العقارات ({myPropertiesList.length}) ←
                </button>
              </div>

              {myPropertiesList.length === 0 ? (
                <div className="text-center py-8 bg-slate-900/40 rounded-2xl border border-slate-800">
                  <Building2 className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">لم تقم بإضافة أي عقارات حتى الآن.</p>
                  <Link
                    href="/add-property"
                    className="inline-flex items-center gap-1.5 mt-3 px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>أضف عقارك الأول الآن</span>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {myPropertiesList.slice(0, 3).map((prop) => (
                    <div
                      key={prop.id}
                      className="bg-slate-900 rounded-2xl border border-slate-800 p-3.5 flex flex-col justify-between"
                    >
                      <div className="flex gap-3">
                        <img
                          src={prop.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80'}
                          alt={prop.title}
                          className="w-20 h-20 rounded-xl object-cover shrink-0"
                        />
                        <div className="overflow-hidden">
                          <div className="text-xs font-bold text-white line-clamp-1">{prop.title}</div>
                          <div className="text-[11px] text-slate-400 mt-1">{prop.region} - {prop.governorate}</div>
                          <div className="text-xs font-mono font-bold text-emerald-400 mt-1">
                            {exchangeRateService.formatPrice(prop.priceUsd, currency)}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            prop.availabilityStatus === 'available'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : prop.availabilityStatus === 'reserved'
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-rose-500/20 text-rose-300'
                          }`}
                        >
                          {prop.availabilityStatus === 'available'
                            ? 'متاح'
                            : prop.availabilityStatus === 'reserved'
                            ? 'محجوز'
                            : 'تم البيع'}
                        </span>

                        <Link
                          href={`/properties/${prop.slug}`}
                          className="text-xs text-slate-400 hover:text-emerald-400 font-bold flex items-center gap-1"
                        >
                          <span>معاينة الإعلان</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: My Properties Management */}
        {activeTab === 'my-properties' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
              <h2 className="text-base font-bold text-white">إدارة العروض العقارية ({myPropertiesList.length})</h2>
              <Link
                href="/add-property"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة عقار جديد</span>
              </Link>
            </div>

            {myPropertiesList.length === 0 ? (
              <div className="text-center py-16 bg-slate-800/40 rounded-3xl border border-slate-800">
                <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-1">لا توجد عقارات مضافة في حسابك</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                  يمكنك نشر عقاراتك بسهولة وستظهر للملايين من المشترين والمهتمين بالعقارات السورية.
                </p>
                <Link
                  href="/add-property"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>أضف عقاراً جديداً الآن</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {myPropertiesList.map((property) => (
                  <div
                    key={property.id}
                    className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 transition-all hover:border-slate-600"
                  >
                    {/* Property Thumbnail & Info */}
                    <div className="flex items-center gap-4">
                      <img
                        src={property.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80'}
                        alt={property.title}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-slate-400">
                            {property.propertyCode}
                          </span>
                          <span className="text-xs text-slate-400">{property.region} - {property.governorate}</span>
                        </div>
                        <h3 className="text-xs sm:text-sm font-bold text-white mt-1 line-clamp-1">
                          {property.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-1.5 text-xs">
                          <span className="font-mono font-black text-emerald-400">
                            {exchangeRateService.formatPrice(property.priceUsd, currency)}
                          </span>
                          <span className="text-slate-400">• {property.area} م²</span>
                          <span className="text-slate-400 flex items-center gap-1">
                            <Eye className="w-3 h-3 text-slate-500" />
                            <span>{property.viewsCount || 32}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Toggle & Actions */}
                    <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-700">
                      {/* Availability Selector */}
                      <select
                        value={property.availabilityStatus}
                        onChange={(e) => handleUpdateStatus(property.id, e.target.value as AvailabilityStatus)}
                        className={`text-xs font-bold py-1.5 px-3 rounded-xl border focus:outline-none cursor-pointer ${
                          property.availabilityStatus === 'available'
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                            : property.availabilityStatus === 'reserved'
                            ? 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                            : 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                        }`}
                      >
                        <option value="available">🟢 متاح للعرض</option>
                        <option value="reserved">🟡 محجوز (مفاوضات)</option>
                        <option value="sold">🔴 تم البيع</option>
                        <option value="rented">🔴 تم التأجير</option>
                      </select>

                      {/* View Link */}
                      <Link
                        href={`/properties/${property.slug}`}
                        target="_blank"
                        className="p-2 rounded-xl bg-slate-700/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="معاينة العقار في الموقع"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleDeleteProperty(property.id)}
                        className="p-2 rounded-xl bg-slate-700/80 hover:bg-rose-600/30 text-slate-400 hover:text-rose-400 transition-colors"
                        title="حذف العقار"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Customer Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-bold text-white">طلبات واستفسارات العملاء الواردة ({inquiries.length})</h2>
            </div>

            {inquiries.length === 0 ? (
              <div className="text-center py-16 bg-slate-800/40 rounded-3xl border border-slate-800">
                <MessageCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-1">لا توجد استفسارات واردة حالياً</h3>
                <p className="text-xs text-slate-400">ستظهر هنا أي رسائل أو طلبات معاينة يرسلها الزوار لعقاراتك.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.map((inq) => {
                  const whatsappUrl =
                    'https://wa.me/' +
                    (inq.senderWhatsapp || inq.senderPhone).replace(/[^0-9]/g, '') +
                    '?text=' +
                    encodeURIComponent(`أهلاً بك أخي ${inq.senderName}، بخصوص استفسارك عن العقار (${inq.propertyTitle})...`);

                  return (
                    <div
                      key={inq.id}
                      className={`bg-slate-800/80 border rounded-2xl p-4 sm:p-5 transition-all ${
                        inq.status === 'new' ? 'border-amber-500/50 bg-slate-800/95 shadow-md shadow-amber-500/5' : 'border-slate-700/80'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${
                              inq.status === 'new' ? 'bg-amber-400 animate-pulse' : inq.status === 'contacted' ? 'bg-emerald-400' : 'bg-slate-500'
                            }`}
                          />
                          <span className="text-xs font-bold text-white">{inq.senderName}</span>
                          <span className="text-[10px] text-slate-400">• {inq.createdAt}</span>
                        </div>

                        <div className="text-xs text-slate-400 flex items-center gap-1.5">
                          <span className="font-semibold text-slate-300">العقار:</span>
                          <span className="font-mono text-emerald-400 font-bold">{inq.propertyCode}</span>
                          <span className="line-clamp-1 max-w-[200px] text-slate-300">{inq.propertyTitle}</span>
                        </div>
                      </div>

                      {/* Message body */}
                      <div className="p-3 rounded-xl bg-slate-900/90 text-xs sm:text-sm text-slate-200 border border-slate-800 my-3 leading-relaxed">
                        &quot;{inq.message}&quot;
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="flex items-center gap-2">
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => markInquiryStatus(inq.id, 'contacted')}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-md shadow-emerald-600/20"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>محادثة واتساب للرد</span>
                          </a>

                          <a
                            href={`tel:${inq.senderPhone}`}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-emerald-400" />
                            <span dir="ltr">{inq.senderPhone}</span>
                          </a>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              markInquiryStatus(
                                inq.id,
                                inq.status === 'contacted' ? 'closed' : 'contacted'
                              )
                            }
                            className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1 rounded-lg bg-slate-900 border border-slate-700"
                          >
                            {inq.status === 'contacted' ? 'وضع علامة [مغلق]' : 'وضع علامة [تم التواصل]'}
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteInquiry(inq.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10"
                            title="حذف الطلب"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Favorites */}
        {activeTab === 'favorites' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-bold text-white">العقارات المحفوظة في المفضلة ({favorites.length})</h2>
              {favorites.length > 0 && (
                <button
                  type="button"
                  onClick={clearFavorites}
                  className="text-xs text-rose-400 hover:text-rose-300 font-bold transition-colors"
                >
                  إفراغ المفضلة
                </button>
              )}
            </div>

            {favoritePropertiesList.length === 0 ? (
              <div className="text-center py-16 bg-slate-800/40 rounded-3xl border border-slate-800">
                <Heart className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-1">قائمة المفضلة فارغة حالياً</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                  تصفح العقارات واضغط على أيقونة القلب لحفظ أي عقار يعجبك والرجوع إليه لاحقاً.
                </p>
                <Link
                  href="/properties"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors shadow-lg"
                >
                  <Search className="w-4 h-4" />
                  <span>تصفح العقارات الآن</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoritePropertiesList.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Profile & Agency Settings */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-emerald-400" />
              <span>تعديل بيانات الملف الشخصي</span>
            </h2>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {isAgency ? 'اسم المكتب أو الشركة العقارية' : 'الاسم الكامل'}
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">رقم الهاتف</label>
                  <input
                    type="tel"
                    required
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    dir="ltr"
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">رقم الواتساب للتواصل</label>
                  <input
                    type="tel"
                    required
                    value={editWhatsapp}
                    onChange={(e) => setEditWhatsapp(e.target.value)}
                    dir="ltr"
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500 text-right"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">المحافظة / المدينة</label>
                <input
                  type="text"
                  value={editCity}
                  onChange={(e) => setEditCity(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {isAgency && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">النبذة التعريفية للمكتب</label>
                  <textarea
                    rows={3}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isSavingSettings}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 mt-4"
              >
                {isSavingSettings ? (
                  <span>جاري الحفظ...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>حفظ التعديلات</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
