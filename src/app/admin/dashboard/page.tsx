'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Building2,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  Coins,
  Users,
  Eye,
  MessageCircle,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Check,
  AlertCircle,
  X,
  Star,
  Search,
  Filter,
  Save,
  Clock,
  Sparkles,
  Phone,
  Mail,
  Calendar,
  BarChart3,
  Download,
  UploadCloud,
  ImageIcon,
  TrendingUp,
  DollarSign,
  Activity,
  Sun,
  HardHat,
  CheckCircle2,
} from 'lucide-react';
import { Property, Governorate, PropertyType, FinishingStatus, AvailabilityStatus } from '@/types/property';
import { Lead, LeadStatus } from '@/types/lead';
import { PropertyRequest, PropertyRequestStatus } from '@/types/propertyRequest';
import { propertyService } from '@/services/propertyService';
import { imageOptimizerService } from '@/services/imageOptimizerService';
import { exchangeRateService } from '@/services/exchangeRateService';
import { leadService } from '@/services/leadService';
import { propertyRequestService } from '@/services/propertyRequestService';
import { useCurrency } from '@/context/CurrencyContext';
import { SYRIAN_LOCATIONS } from '@/data/locations';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { currency, formatPrice, rates, updateRate } = useCurrency();

  const [activeTab, setActiveTab] = useState<'properties' | 'leads' | 'requests' | 'analytics' | 'rates'>('properties');
  const [adminUser, setAdminUser] = useState<{ name: string; email: string; role: string } | null>(null);

  // Properties State
  const [properties, setProperties] = useState<Property[]>([]);
  const [loadingProps, setLoadingProps] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Property Requests State (مطلوب عقار)
  const [requests, setRequests] = useState<PropertyRequest[]>([]);
  const [reqSearchQuery, setReqSearchQuery] = useState<string>('');
  const [reqFilterStatus, setReqFilterStatus] = useState<string>('all');
  const [reqFilterGov, setReqFilterGov] = useState<string>('all');
  const [reqFilterType, setReqFilterType] = useState<string>('all');
  const [matchingPropertyModalReq, setMatchingPropertyModalReq] = useState<PropertyRequest | null>(null);

  // Property Modal State (Add / Edit)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formPropertyCode, setFormPropertyCode] = useState<string>('');
  const [formTitle, setFormTitle] = useState<string>('');
  const [formContractType, setFormContractType] = useState<'sale' | 'rent'>('sale');
  const [formPropertyType, setFormPropertyType] = useState<Exclude<PropertyType, 'all'>>('apartment');
  const [formGovernorate, setFormGovernorate] = useState<Exclude<Governorate, 'الكل'>>('دمشق');
  const [formRegion, setFormRegion] = useState<string>('المزة');
  const [formNeighborhood, setFormNeighborhood] = useState<string>('');
  const [formLocationDetails, setFormLocationDetails] = useState<string>('');
  const [formPriceUsd, setFormPriceUsd] = useState<number>(100000);
  const [formArea, setFormArea] = useState<number>(150);
  const [formBedrooms, setFormBedrooms] = useState<number>(3);
  const [formBathrooms, setFormBathrooms] = useState<number>(2);
  const [formFloor, setFormFloor] = useState<string>('طابق ثاني');
  const [formDirection, setFormDirection] = useState<string>('قبلي شرقي');
  const [formOwnership, setFormOwnership] = useState<string>('طابو سبز (2400 سهم)');
  const [formFinishing, setFormFinishing] = useState<FinishingStatus>('finished');
  const [formAvailability, setFormAvailability] = useState<AvailabilityStatus>('available');
  const [formHasSolar, setFormHasSolar] = useState<boolean>(true);
  const [formHasElevator, setFormHasElevator] = useState<boolean>(true);
  const [formHasGarage, setFormHasGarage] = useState<boolean>(false);
  const [formHasGenerator, setFormHasGenerator] = useState<boolean>(false);
  const [formIsOffPlan, setFormIsOffPlan] = useState<boolean>(false);
  const [formHandoverDate, setFormHandoverDate] = useState<string>('');
  const [formPaymentPlan, setFormPaymentPlan] = useState<string>('');
  const [formConstructionProgress, setFormConstructionProgress] = useState<number>(35);
  const [formDescription, setFormDescription] = useState<string>('');
  const [formImages, setFormImages] = useState<string[]>([]);
  const [formFeatured, setFormFeatured] = useState<boolean>(false);
  const [isCompressingAdminImages, setIsCompressingAdminImages] = useState<boolean>(false);
  const [adminCompressionFeedback, setAdminCompressionFeedback] = useState<string | null>(null);

  // File Upload Ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Exchange Rates State
  const [sypRate, setSypRate] = useState<number>(15000);
  const [eurRate, setEurRate] = useState<number>(0.92);
  const [rateSuccess, setRateSuccess] = useState<boolean>(false);

  // Leads State
  const [leads, setLeads] = useState<Lead[]>([]);

  // Load Session & Data
  useEffect(() => {
    const sessionStr = localStorage.getItem('syria_realestate_admin_session');
    if (!sessionStr) {
      router.push('/admin/login');
      return;
    }
    setAdminUser(JSON.parse(sessionStr));

    loadAllData();
  }, [router]);

  const loadAllData = async () => {
    setLoadingProps(true);
    const data = await propertyService.getProperties(undefined, true);
    setProperties(data);
    setLoadingProps(false);

    setLeads(leadService.getLeads());
    setRequests(propertyRequestService.getRequests());

    setSypRate(exchangeRateService.getRate('SYP'));
    setEurRate(exchangeRateService.getRate('EUR'));
  };

  const handleLogout = () => {
    localStorage.removeItem('syria_realestate_admin_session');
    router.push('/admin/login');
  };

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setEditingProperty(null);
    const nextCodeNum = properties.length + 101;
    setFormPropertyCode(`REF-${nextCodeNum}`);
    setFormTitle('');
    setFormContractType('sale');
    setFormPropertyType('apartment');
    setFormGovernorate('دمشق');
    setFormRegion('المزة');
    setFormNeighborhood('');
    setFormLocationDetails('');
    setFormPriceUsd(120000);
    setFormArea(140);
    setFormBedrooms(3);
    setFormBathrooms(2);
    setFormFloor('طابق ثاني');
    setFormDirection('قبلي شرقي');
    setFormOwnership('طابو سبز (2400 سهم)');
    setFormFinishing('finished');
    setFormAvailability('available');
    setFormHasSolar(true);
    setFormHasElevator(true);
    setFormHasGarage(false);
    setFormHasGenerator(false);
    setFormIsOffPlan(false);
    setFormHandoverDate('');
    setFormPaymentPlan('');
    setFormConstructionProgress(35);
    setFormDescription('شقة سكنية ممتازة بموقع راقٍ وقريبة من كافة الخدمات.');
    setFormImages([
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ]);
    setFormFeatured(false);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (prop: Property) => {
    setEditingProperty(prop);
    setFormPropertyCode(prop.propertyCode);
    setFormTitle(prop.title);
    setFormContractType(prop.contractType);
    setFormPropertyType(prop.propertyType);
    setFormGovernorate(prop.governorate);
    setFormRegion(prop.region);
    setFormNeighborhood(prop.neighborhood || '');
    setFormLocationDetails(prop.locationDetails);
    setFormPriceUsd(prop.priceUsd);
    setFormArea(prop.area);
    setFormBedrooms(prop.bedrooms);
    setFormBathrooms(prop.bathrooms);
    setFormFloor(prop.floor);
    setFormDirection(prop.direction);
    setFormOwnership(prop.ownershipType);
    setFormFinishing(prop.finishingStatus);
    setFormAvailability(prop.availabilityStatus);
    setFormHasSolar(!!prop.hasSolar);
    setFormHasElevator(!!prop.hasElevator);
    setFormHasGarage(!!prop.hasGarage);
    setFormHasGenerator(!!prop.hasGenerator);
    setFormIsOffPlan(!!prop.isOffPlan);
    setFormHandoverDate(prop.handoverDate || '');
    setFormPaymentPlan(prop.paymentPlan || '');
    setFormConstructionProgress(prop.constructionProgress || 35);
    setFormDescription(prop.description);
    setFormImages(prop.images || []);
    setFormFeatured(!!prop.featured);
    setIsModalOpen(true);
  };

  // Handle Local Image Upload via Auto Optimizer
  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsCompressingAdminImages(true);
    setAdminCompressionFeedback(null);

    try {
      let totalOrig = 0;
      let totalOpt = 0;

      const optimized = await imageOptimizerService.optimizeMultiple(
        Array.from(files),
        (current, total) => {
          setAdminCompressionFeedback(`جاري ضغط وتحسين الصور تلقائياً (${current}/${total})... ⚡`);
        }
      );

      const newUrls: string[] = [];
      optimized.forEach((res) => {
        newUrls.push(res.dataUrl);
        totalOrig += res.originalSize;
        totalOpt += res.optimizedSize;
      });

      setFormImages((prev) => [...prev, ...newUrls]);

      const savings = totalOrig > 0 ? Math.round(((totalOrig - totalOpt) / totalOrig) * 100) : 0;
      setAdminCompressionFeedback(
        `تم تحسين ${optimized.length} صور بدقة عالية وتوفير ${savings}% من الحجم (${imageOptimizerService.formatBytes(totalOpt)}) 🚀`
      );
    } catch (err) {
      console.error('Error optimizing admin images:', err);
    } finally {
      setIsCompressingAdminImages(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setFormImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setAdminCompressionFeedback(null);
  };

  const handleAddImageUrlPrompt = () => {
    const url = window.prompt('أدخل رابط الصورة (URL):');
    if (url && url.trim().length > 0) {
      setFormImages((prev) => [...prev, url.trim()]);
    }
  };

  // Save Property Form Submit
  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();

    const generatedSlug =
      formTitle
        .toLowerCase()
        .replace(/[^a-z0-9\u0621-\u064A]+/g, '-')
        .replace(/(^-|-$)/g, '') +
      '-' +
      formPropertyCode.toLowerCase();

    const finalImages =
      formImages.length > 0
        ? formImages
        : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'];

    if (editingProperty) {
      // Update
      const updatedList = properties.map((p) => {
        if (p.id === editingProperty.id) {
          return {
            ...p,
            propertyCode: formPropertyCode,
            title: formTitle,
            contractType: formContractType,
            propertyType: formPropertyType,
            governorate: formGovernorate,
            region: formRegion,
            neighborhood: formNeighborhood,
            locationDetails: formLocationDetails,
            priceUsd: Number(formPriceUsd),
            area: Number(formArea),
            bedrooms: Number(formBedrooms),
            bathrooms: Number(formBathrooms),
            floor: formFloor,
            direction: formDirection,
            ownershipType: formOwnership,
            finishingStatus: formFinishing,
            availabilityStatus: formAvailability,
            hasSolar: formHasSolar,
            hasElevator: formHasElevator,
            hasGarage: formHasGarage,
            hasGenerator: formHasGenerator,
            isOffPlan: formIsOffPlan,
            handoverDate: formHandoverDate,
            paymentPlan: formPaymentPlan,
            constructionProgress: Number(formConstructionProgress),
            description: formDescription,
            images: finalImages,
            featured: formFeatured,
            updatedAt: new Date().toISOString(),
          };
        }
        return p;
      });
      setProperties(updatedList);
      localStorage.setItem('syria_realestate_custom_properties', JSON.stringify(updatedList));
    } else {
      // Create new
      const newProp: Property = {
        id: `SY-PROP-${Date.now().toString().slice(-4)}`,
        propertyCode: formPropertyCode,
        slug: generatedSlug,
        title: formTitle,
        contractType: formContractType,
        propertyType: formPropertyType,
        governorate: formGovernorate,
        region: formRegion,
        neighborhood: formNeighborhood,
        locationDetails: formLocationDetails,
        priceUsd: Number(formPriceUsd),
        area: Number(formArea),
        bedrooms: Number(formBedrooms),
        bathrooms: Number(formBathrooms),
        floor: formFloor,
        direction: formDirection,
        ownershipType: formOwnership,
        finishingStatus: formFinishing,
        availabilityStatus: formAvailability,
        hasSolar: formHasSolar,
        hasElevator: formHasElevator,
        hasGarage: formHasGarage,
        hasGenerator: formHasGenerator,
        isOffPlan: formIsOffPlan,
        handoverDate: formHandoverDate,
        paymentPlan: formPaymentPlan,
        constructionProgress: Number(formConstructionProgress),
        features: formIsOffPlan
          ? ['بيع على المخطط', 'أقساط ميسرة', 'طابو سبز']
          : ['طاقة شمسية', 'طابو سبز', 'إكساء حديث'],
        description: formDescription,
        images: finalImages,
        featured: formFeatured,
        isActive: true,
        viewsCount: 1,
        whatsappNumber: '+963988123456',
        createdAt: new Date().toISOString().split('T')[0],
      };

      const updated = [newProp, ...properties];
      setProperties(updated);
      localStorage.setItem('syria_realestate_custom_properties', JSON.stringify(updated));
    }

    setIsModalOpen(false);
  };

  // Approve Property Submission
  const handleApproveProperty = async (id: string) => {
    await propertyService.approveProperty(id);
    const updated = properties.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          availabilityStatus: 'available' as AvailabilityStatus,
          isApproved: true,
        };
      }
      return p;
    });
    setProperties(updated);
    localStorage.setItem('syria_realestate_custom_properties', JSON.stringify(updated));
  };

  // Delete Property
  const handleDeleteProperty = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العقار؟')) {
      const updated = properties.filter((p) => p.id !== id);
      setProperties(updated);
      localStorage.setItem('syria_realestate_custom_properties', JSON.stringify(updated));
    }
  };

  // Save Exchange Rates
  const handleSaveRates = (e: React.FormEvent) => {
    e.preventDefault();
    updateRate('SYP', Number(sypRate));
    updateRate('EUR', Number(eurRate));
    setRateSuccess(true);
    setTimeout(() => setRateSuccess(false), 2500);
  };

  // Lead Status Change
  const handleLeadStatusChange = (leadId: string, newStatus: LeadStatus) => {
    const updated = leadService.updateLeadStatus(leadId, newStatus);
    if (updated) {
      setLeads(leadService.getLeads());
    }
  };

  // Property Request Status Change
  const handleUpdateRequestStatus = (id: string, newStatus: PropertyRequestStatus) => {
    const success = propertyRequestService.updateRequest(id, { status: newStatus });
    if (success) {
      setRequests(propertyRequestService.getRequests());
    }
  };

  // Save Request Admin Notes
  const handleSaveRequestNotes = (id: string, notes: string) => {
    const success = propertyRequestService.updateRequest(id, { adminNotes: notes });
    if (success) {
      setRequests(propertyRequestService.getRequests());
      alert('تم حفظ ملاحظات الإدارة بنجاح.');
    }
  };

  // Delete Request
  const handleDeleteRequest = (id: string) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الطلب العقاري نهائياً؟')) return;
    const success = propertyRequestService.deleteRequest(id);
    if (success) {
      setRequests(propertyRequestService.getRequests());
    }
  };

  // Export Property Requests to CSV
  const exportRequestsToCsv = () => {
    if (requests.length === 0) {
      alert('لا توجد طلبات لتصديرها.');
      return;
    }
    const headers = ['الرمز', 'الاسم', 'الهاتف', 'الواتساب', 'المحافظة', 'المناطق المفضلة', 'العملية', 'نوع العقار', 'الميزانية القصوى USD', 'المساحة م²', 'الحالة', 'تاريخ الطلب'];
    const rows = requests.map((r) => [
      r.requestCode,
      `"${r.requesterName.replace(/"/g, '""')}"`,
      `"${r.requesterPhone}"`,
      `"${r.requesterWhatsapp || ''}"`,
      r.governorate,
      `"${(r.preferredRegions || []).join('، ').replace(/"/g, '""')}"`,
      r.contractType === 'sale' ? 'شراء' : 'إيجار',
      r.propertyType,
      r.maxBudgetUsd,
      r.minArea || '',
      r.status,
      r.createdAt,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `property_requests_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Leads to CSV (with UTF-8 BOM for Excel)
  const exportLeadsToCsv = () => {
    if (leads.length === 0) {
      alert('لا توجد طلبات لتصديرها حالياً.');
      return;
    }

    const headers = ['المعرف', 'الاسم', 'الهاتف', 'البريد', 'كود العقار', 'عنوان العقار', 'الرسالة', 'الحالة', 'تاريخ الإنشاء'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${l.propertyCode || ''}"`,
      `"${(l.propertyTitle || '').replace(/"/g, '""')}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${l.status}"`,
      `"${l.createdAt}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Properties to CSV
  const exportPropertiesToCsv = () => {
    if (properties.length === 0) {
      alert('لا توجد عقارات لتصديرها.');
      return;
    }

    const headers = ['الرمز', 'العنوان', 'نوع العقد', 'النوع', 'المحافظة', 'المنطقة', 'السعر بالدولار', 'المساحة م²', 'الغرف', 'الحمامات', 'طاقة شمسية', 'سند الملكية', 'الحالة'];
    const rows = properties.map((p) => [
      p.propertyCode,
      `"${p.title.replace(/"/g, '""')}"`,
      p.contractType === 'sale' ? 'بيع' : 'إيجار',
      p.propertyType,
      p.governorate,
      p.region,
      p.priceUsd,
      p.area,
      p.bedrooms,
      p.bathrooms,
      p.hasSolar ? 'نعم' : 'لا',
      `"${p.ownershipType}"`,
      p.availabilityStatus,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `properties_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter Properties in Dashboard Table
  const filteredProperties = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.propertyCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.region.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'active'
        ? p.isActive !== false
        : filterStatus === 'inactive'
        ? p.isActive === false
        : p.availabilityStatus === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Filter Property Requests
  const filteredRequests = requests.filter((r) => {
    const q = reqSearchQuery.toLowerCase();
    const matchesSearch =
      r.requesterName.toLowerCase().includes(q) ||
      r.requesterPhone.includes(q) ||
      r.requestCode.toLowerCase().includes(q) ||
      (r.preferredRegions && r.preferredRegions.some((reg) => reg.toLowerCase().includes(q))) ||
      r.description.toLowerCase().includes(q);

    const matchesStatus = reqFilterStatus === 'all' || r.status === reqFilterStatus;
    const matchesGov = reqFilterGov === 'all' || r.governorate === reqFilterGov;
    const matchesType = reqFilterType === 'all' || r.contractType === reqFilterType;

    return matchesSearch && matchesStatus && matchesGov && matchesType;
  });

  // Calculate Analytics & KPIs
  const totalValueUsd = properties.reduce((sum, p) => sum + (p.contractType === 'sale' ? p.priceUsd : 0), 0);
  const forSaleCount = properties.filter((p) => p.contractType === 'sale').length;
  const forRentCount = properties.filter((p) => p.contractType === 'rent').length;
  const solarCount = properties.filter((p) => p.hasSolar).length;
  const pendingCount = properties.filter((p) => p.availabilityStatus === 'pending_approval' || p.isApproved === false).length;
  const newLeadsCount = leads.filter((l) => l.status === 'new').length;
  const newRequestsCount = requests.filter((r) => r.status === 'new').length;
  const buyRequestsCount = requests.filter((r) => r.contractType === 'sale').length;
  const rentRequestsCount = requests.filter((r) => r.contractType === 'rent').length;

  const govCounts: Record<string, number> = {};
  properties.forEach((p) => {
    govCounts[p.governorate] = (govCounts[p.governorate] || 0) + 1;
  });

  const sortedByViews = [...properties].sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0)).slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-cairo flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Admin Top Navigation */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-alexandria font-bold text-white text-base">
                لوحة تحكم عقارات سوريا
              </span>
            </Link>

            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {adminUser?.role === 'super_admin' ? 'Super Admin' : 'Editor'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">معاينة الموقع العام</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 text-xs font-semibold border border-red-500/30 transition-colors"
              title="تسجيل الخروج"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>خروج</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container with Tabs */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('properties')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all relative ${
              activeTab === 'properties'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>إدارة العقارات ({properties.length})</span>
            {pendingCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 animate-pulse">
                {pendingCount} مراجعة
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'leads'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>استفسارات العقارات المعروضة ({leads.length})</span>
            {newLeadsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-red-500 text-white font-bold animate-pulse">
                {newLeadsCount} جديد
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all relative ${
              activeTab === 'requests'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>طلبات العقارات الخاصة (مطلوب عقار) ({requests.length})</span>
            {newRequestsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500 text-slate-950 font-bold animate-pulse">
                {newRequestsCount} جديد
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'analytics'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>التحليلات والإحصائيات</span>
          </button>

          <button
            onClick={() => setActiveTab('rates')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'rates'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>أسعار الصرف والعملات</span>
          </button>
        </div>

        {/* ================= TAB 1: PROPERTIES MANAGEMENT ================= */}
        {activeTab === 'properties' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-alexandria text-white">
                  قائمة العقارات والتحكم
                </h2>
                <p className="text-xs text-slate-400">
                  إضافة عقارات جديدة وتحديث المواصفات ورفع الصور وتصدير البيانات.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={exportPropertiesToCsv}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>تصدير Excel / CSV</span>
                </button>

                <button
                  onClick={handleOpenCreateModal}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/25 transition-transform hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة عقار جديد</span>
                </button>
              </div>
            </div>

            {/* Pending Moderation Alert Banner */}
            {pendingCount > 0 && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 text-amber-300 font-bold">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>
                    يوجد لديك <strong className="text-white underline">{pendingCount}</strong> عقارات جديدة مرسلة من الزوار بانتظار المراجعة والاعتماد قبل ظهورها في الموقع.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFilterStatus('pending_approval')}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-colors shrink-0 shadow-md"
                >
                  عرض طلبات المراجعة فقط ({pendingCount})
                </button>
              </div>
            )}

            {/* Filter & Search Bar */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="ابحث بالعنوان أو الرمز المرجعي أو المنطقة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pr-10 pl-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {[
                  { val: 'all', label: `الكل (${properties.length})` },
                  { val: 'pending_approval', label: `🔔 قيد المراجعة (${pendingCount})` },
                  { val: 'available', label: 'المتاح' },
                  { val: 'sold', label: 'تم البيع' },
                  { val: 'rented', label: 'تم التأجير' },
                ].map((s) => (
                  <button
                    key={s.val}
                    type="button"
                    onClick={() => setFilterStatus(s.val)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      filterStatus === s.val
                        ? s.val === 'pending_approval'
                          ? 'bg-amber-500 text-slate-950 font-black'
                          : 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Properties Table */}
            <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-850 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-4">الرمز</th>
                      <th className="p-4">العقار</th>
                      <th className="p-4">الموقع</th>
                      <th className="p-4">السعر (USD)</th>
                      <th className="p-4">السعر التقديري (ل.س)</th>
                      <th className="p-4">الحالة</th>
                      <th className="p-4">المشاهدات</th>
                      <th className="p-4 text-center">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    {filteredProperties.map((prop) => (
                      <tr key={prop.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-mono font-bold text-amber-400">
                          {prop.propertyCode}
                        </td>
                        <td className="p-4 font-bold text-white max-w-xs truncate">
                          <Link
                            href={`/properties/${prop.slug}`}
                            target="_blank"
                            className="hover:text-emerald-400 transition-colors"
                          >
                            {prop.title}
                          </Link>
                          <span className="block text-[10px] text-slate-500 font-normal">
                            {prop.contractType === 'sale' ? 'للبيع' : 'للإيجار'} • {prop.area} م²
                          </span>
                        </td>
                        <td className="p-4 font-medium">
                          {prop.region} - {prop.governorate}
                        </td>
                        <td className="p-4 font-bold text-emerald-400 font-mono">
                          ${prop.priceUsd.toLocaleString('en-US')}
                        </td>
                        <td className="p-4 font-bold text-slate-400 font-mono">
                          {(prop.priceUsd * sypRate).toLocaleString('en-US')} ل.س
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              prop.availabilityStatus === 'pending_approval' || prop.isApproved === false
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                                : prop.availabilityStatus === 'available'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : prop.availabilityStatus === 'sold'
                                ? 'bg-red-500/20 text-red-300'
                                : 'bg-blue-500/20 text-blue-300'
                            }`}
                          >
                            {prop.availabilityStatus === 'pending_approval' || prop.isApproved === false
                              ? '🔔 قيد المراجعة'
                              : prop.availabilityStatus === 'available'
                              ? 'متاح'
                              : prop.availabilityStatus === 'sold'
                              ? 'مباع'
                              : 'مؤجر'}
                          </span>
                          {prop.submitterName && (
                            <span className="block text-[10px] text-amber-400/90 mt-1">
                              المعلن: {prop.submitterName}
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-slate-400">{prop.viewsCount || 0}</td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* Approve Button if Pending */}
                            {(prop.availabilityStatus === 'pending_approval' || prop.isApproved === false) && (
                              <button
                                onClick={() => handleApproveProperty(prop.id)}
                                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow-md shadow-emerald-600/30 transition-transform hover:scale-105"
                                title="قبول ونشر العقار فوراً في الموقع"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>قبول ونشر</span>
                              </button>
                            )}

                            {/* Contact Submitter via WhatsApp */}
                            {prop.submitterPhone && (
                              <a
                                href={`https://wa.me/${prop.submitterPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                  `مرحباً ${prop.submitterName || 'عزيزنا المالك'}، نتواصل معك بخصوص عقارك (${prop.propertyCode} - ${prop.title}) المرسل عبر منصة عقارات سوريا.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-400 transition-colors"
                                title="تواصل مع المالك عبر واتساب"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                            )}

                            <button
                              onClick={() => handleOpenEditModal(prop)}
                              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                              title="تعديل"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteProperty(prop.id)}
                              className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                              title="حذف"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: LEADS & INQUIRIES ================= */}
        {activeTab === 'leads' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-alexandria text-white">
                  طلبات واستفسارات العملاء (Leads)
                </h2>
                <p className="text-xs text-slate-400">
                  متابعة العملاء ومراسلتهم واتساب مباشرة وتصدير سجل الطلبات.
                </p>
              </div>

              <button
                type="button"
                onClick={exportLeadsToCsv}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-colors w-fit"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تصدير قائمة العملاء إلى Excel</span>
              </button>
            </div>

            <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-850 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-4">العميل</th>
                      <th className="p-4">الهاتف</th>
                      <th className="p-4">العقار المستفسر عنه</th>
                      <th className="p-4">الرسالة / الطلب</th>
                      <th className="p-4">الحالة</th>
                      <th className="p-4">التاريخ</th>
                      <th className="p-4 text-center">إجراء واتساب</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-300">
                    {leads.map((lead) => {
                      const adminWhatsAppUrl = leadService.generateAdminWhatsAppUrl(lead);

                      return (
                        <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-4 font-bold text-white">{lead.name}</td>
                          <td className="p-4 font-mono font-medium text-slate-400 dir-ltr">
                            {lead.phone}
                          </td>
                          <td className="p-4 font-medium text-amber-300">
                            {lead.propertyCode ? (
                              <span>
                                {lead.propertyCode} - {lead.propertyTitle}
                              </span>
                            ) : (
                              <span className="text-slate-500">استفسار عام</span>
                            )}
                          </td>
                          <td className="p-4 max-w-xs text-slate-300 truncate" title={lead.message}>
                            {lead.message || '—'}
                          </td>
                          <td className="p-4">
                            <select
                              value={lead.status}
                              onChange={(e) =>
                                handleLeadStatusChange(lead.id, e.target.value as LeadStatus)
                              }
                              className="bg-slate-800 border border-slate-700 text-xs rounded-xl px-2 py-1 text-white focus:outline-none"
                            >
                              <option value="new">جديد (New)</option>
                              <option value="contacted">تم التواصل</option>
                              <option value="visited">تمت المعاينة</option>
                              <option value="closed">مغلق (تم الاتفاق)</option>
                            </select>
                          </td>
                          <td className="p-4 text-slate-400 text-[11px] font-mono">
                            {new Date(lead.createdAt).toISOString().split('T')[0]}
                          </td>
                          <td className="p-4 text-center">
                            <a
                              href={adminWhatsAppUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-transform hover:scale-105"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>مراسلة العميل</span>
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: PROPERTY REQUESTS (مطلوب عقار) ================= */}
        {activeTab === 'requests' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header & Export */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold font-alexandria text-white">
                    طلبات العقارات الخاصة بالعملاء (مطلوب عقار)
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    خاص بإدارة المنصة 🛡️
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  طلبات الشراء والاستئجار المرسلة مباشرة من الزوار لمطابقتها مع العروض والتواصل الحصري.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportRequestsToCsv}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold transition-colors"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>تصدير الطلبات (CSV)</span>
                </button>
              </div>
            </div>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-xs font-semibold text-slate-400 mb-1">إجمالي طلبات العقارات</div>
                <div className="text-2xl font-black font-alexandria text-white">{requests.length}</div>
                <div className="text-[11px] text-slate-500 mt-1">طلبات خاصة واردة للمنصة</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-xs font-semibold text-slate-400 mb-1">طلبات الشراء (تَمَلّك)</div>
                <div className="text-2xl font-black font-alexandria text-emerald-400">{buyRequestsCount}</div>
                <div className="text-[11px] text-slate-500 mt-1">مشترين بميزانيات جاهزة</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-xs font-semibold text-slate-400 mb-1">طلبات الاستئجار</div>
                <div className="text-2xl font-black font-alexandria text-teal-400">{rentRequestsCount}</div>
                <div className="text-[11px] text-slate-500 mt-1">سكني وتجاري</div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-xs font-semibold text-slate-400 mb-1">طلبات جديدة بحاجة لمتابعة</div>
                <div className="text-2xl font-black font-alexandria text-amber-400">{newRequestsCount}</div>
                <div className="text-[11px] text-amber-400/80 mt-1">تتطلب اتصال هاتفي أو واتساب</div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[220px] relative">
                <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="بحث باسم العميل، الهاتف، كود الطلب، أو المنطقة..."
                  value={reqSearchQuery}
                  onChange={(e) => setReqSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <select
                value={reqFilterGov}
                onChange={(e) => setReqFilterGov(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="all">كل المحافظات</option>
                {SYRIAN_LOCATIONS.map((loc) => (
                  <option key={loc.provinceNameAr} value={loc.provinceNameAr}>
                    {loc.provinceNameAr}
                  </option>
                ))}
              </select>

              <select
                value={reqFilterType}
                onChange={(e) => setReqFilterType(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="all">الكل (شراء وإيجار)</option>
                <option value="sale">شراء فقط</option>
                <option value="rent">إيجار فقط</option>
              </select>

              <select
                value={reqFilterStatus}
                onChange={(e) => setReqFilterStatus(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="all">كافة الحالات</option>
                <option value="new">🟡 جديد (New)</option>
                <option value="in_progress">🔵 قيد البحث والمتابعة</option>
                <option value="matched">🟢 تم إيجاد عقار مطابق</option>
                <option value="closed">⚪ مغلق / منتهي</option>
              </select>
            </div>

            {/* Requests Cards List */}
            {filteredRequests.length === 0 ? (
              <div className="text-center py-16 bg-slate-900 rounded-3xl border border-slate-800">
                <Sparkles className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-1">لا توجد طلبات عقارات مطابقة للفلاتر</h3>
                <p className="text-xs text-slate-400">ستظهر هنا أي طلبات يرسلها الزوار عبر صفحة &quot;اطلب عقارك&quot;.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRequests.map((req) => {
                  const whatsappUrl =
                    'https://wa.me/' +
                    (req.requesterWhatsapp || req.requesterPhone).replace(/[^0-9]/g, '') +
                    '?text=' +
                    encodeURIComponent(`أهلاً بك أخي ${req.requesterName}، معك إدارة منصة عقارات سوريا بخصوص طلبك المرجعي (${req.requestCode}) لتأمين ${req.propertyType} في ${req.governorate}...`);

                  return (
                    <div
                      key={req.id}
                      className={`bg-slate-900 border rounded-3xl p-5 sm:p-6 transition-all space-y-4 ${
                        req.status === 'new'
                          ? 'border-amber-500/60 shadow-lg shadow-amber-500/5'
                          : 'border-slate-800'
                      }`}
                    >
                      {/* Top Row: Requester Info & Actions */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs font-mono">
                            {req.requestCode}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-bold text-white">{req.requesterName}</h3>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  req.urgency === 'immediate'
                                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                    : req.urgency === 'within_month'
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                    : 'bg-slate-800 text-slate-400'
                                }`}
                              >
                                {req.urgency === 'immediate'
                                  ? '⚡ فوري ومستعجل'
                                  : req.urgency === 'within_month'
                                  ? '📅 خلال شهر'
                                  : '🔍 استكشاف فرص'}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              تاريخ الطلب: {new Date(req.createdAt).toLocaleDateString('ar-SY')}
                            </div>
                          </div>
                        </div>

                        {/* Direct Contact Buttons */}
                        <div className="flex items-center gap-2">
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>واتساب العميل</span>
                          </a>

                          <a
                            href={`tel:${req.requesterPhone}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-emerald-400" />
                            <span dir="ltr">{req.requesterPhone}</span>
                          </a>

                          <button
                            onClick={() => handleDeleteRequest(req.id)}
                            className="p-2 rounded-xl bg-slate-800 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 border border-slate-700"
                            title="حذف الطلب"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Request Specs Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                        <div>
                          <span className="text-slate-500 block mb-1">العملية والنوع:</span>
                          <span className="text-white font-bold">
                            {req.contractType === 'sale' ? 'شراء' : 'استئجار'} • {req.propertyType}
                          </span>
                        </div>

                        <div>
                          <span className="text-slate-500 block mb-1">المحافظة والمناطق:</span>
                          <span className="text-white font-bold">
                            {req.governorate}
                            {req.preferredRegions && req.preferredRegions.length > 0 && (
                              <span className="text-emerald-400 text-[11px] block truncate">
                                ({req.preferredRegions.join('، ')})
                              </span>
                            )}
                          </span>
                        </div>

                        <div>
                          <span className="text-slate-500 block mb-1">الميزانية القصوى:</span>
                          <span className="font-mono font-black text-emerald-400 text-sm">
                            ${req.maxBudgetUsd.toLocaleString()}
                          </span>
                        </div>

                        <div>
                          <span className="text-slate-500 block mb-1">المساحة والغرف:</span>
                          <span className="text-white font-bold">
                            {req.minArea ? `${req.minArea} م² فأكثر` : 'مفتوحة'} • {req.minBedrooms || 2} غرف
                          </span>
                        </div>
                      </div>

                      {/* Required Features Tags */}
                      {req.requiredFeatures && req.requiredFeatures.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] text-slate-400 font-bold ml-1">شروط ملزمة:</span>
                          {req.requiredFeatures.map((feat) => (
                            <span
                              key={feat}
                              className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-800 text-emerald-300 border border-emerald-500/20 font-semibold"
                            >
                              ✓ {feat}
                            </span>
                          ))}
                          {req.paymentPreference && (
                            <span className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-800 text-amber-300 border border-amber-500/20 font-semibold">
                              الدفع: {req.paymentPreference === 'cash' ? 'كاش فوري' : req.paymentPreference === 'installments' ? 'أقساط' : 'أي خيار'}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Description / Client Notes */}
                      {req.description && (
                        <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
                          <span className="text-slate-400 font-bold block mb-1">نص تفاصيل الطلب:</span>
                          &quot;{req.description}&quot;
                        </div>
                      )}

                      {/* Admin Controls Bottom Bar */}
                      <div className="pt-3 border-t border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                          <span className="text-xs text-slate-400 font-bold">حالة الطلب:</span>
                          <select
                            value={req.status}
                            onChange={(e) => handleUpdateRequestStatus(req.id, e.target.value as PropertyRequestStatus)}
                            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-bold focus:outline-none"
                          >
                            <option value="new">🟡 جديد (New)</option>
                            <option value="in_progress">🔵 قيد البحث والمتابعة</option>
                            <option value="matched">🟢 تم إيجاد عقار مطابق</option>
                            <option value="closed">⚪ مغلق / تم البيع</option>
                            <option value="cancelled">❌ ملغي</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => setMatchingPropertyModalReq(req)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-bold transition-colors"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>مطابقة العقارات المتاحة بالموقع</span>
                          </button>
                        </div>

                        {/* Admin Notes Inline Input */}
                        <div className="flex items-center gap-2 w-full md:w-1/2">
                          <input
                            type="text"
                            placeholder="ملاحظات الإدارة الخاصة (غير مرئية للعميل)..."
                            defaultValue={req.adminNotes || ''}
                            onBlur={(e) => handleSaveRequestNotes(req.id, e.target.value)}
                            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Property Matcher Modal */}
            {matchingPropertyModalReq && (
              <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>عقارات مطابقة لطلب ({matchingPropertyModalReq.requesterName})</span>
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        المحافظة: {matchingPropertyModalReq.governorate} • الميزانية القصوى: ${matchingPropertyModalReq.maxBudgetUsd.toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => setMatchingPropertyModalReq(null)}
                      className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Matched Listings */}
                  {(() => {
                    const matchedProps = properties.filter(
                      (p) =>
                        p.governorate === matchingPropertyModalReq.governorate &&
                        p.contractType === matchingPropertyModalReq.contractType &&
                        p.priceUsd <= matchingPropertyModalReq.maxBudgetUsd * 1.2
                    );

                    if (matchedProps.length === 0) {
                      return (
                        <div className="text-center py-8 bg-slate-950 rounded-2xl border border-slate-800">
                          <Building2 className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                          <p className="text-xs text-slate-400">لا توجد عقارات في قاعدة البيانات بنفس المواصفات والميزانية حالياً.</p>
                        </div>
                      );
                    }

                    return (
                      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                        {matchedProps.map((p) => {
                          const sendToClientWhatsappUrl =
                            'https://wa.me/' +
                            (matchingPropertyModalReq.requesterWhatsapp || matchingPropertyModalReq.requesterPhone).replace(/[^0-9]/g, '') +
                            '?text=' +
                            encodeURIComponent(`أهلاً بك أخي ${matchingPropertyModalReq.requesterName}، لدينا عرض عقاري مطابق لطلبك:\n\n*${p.title}*\n*المنطقة:* ${p.region} - ${p.governorate}\n*السعر:* $${p.priceUsd.toLocaleString()}\n*المساحة:* ${p.area} م²\n*الرابط للمعاينة:* https://realestate-syria.com/properties/${p.slug}`);

                          return (
                            <div
                              key={p.id}
                              className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3"
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={p.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=200&q=80'}
                                  alt={p.title}
                                  className="w-14 h-14 rounded-xl object-cover"
                                />
                                <div>
                                  <div className="text-xs font-bold text-white line-clamp-1">{p.title}</div>
                                  <div className="text-[11px] text-slate-400 mt-0.5">{p.region} • {p.area} م²</div>
                                  <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">
                                    ${p.priceUsd.toLocaleString()}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <Link
                                  href={`/properties/${p.slug}`}
                                  target="_blank"
                                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                  <span>معاينة</span>
                                </Link>

                                <a
                                  href={sendToClientWhatsappUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                  <span>إرسال العرض للعميل</span>
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: ANALYTICS & CHARTS ================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-bold font-alexandria text-white">
                لوحة التحليلات ومؤشرات الأداء (KPIs)
              </h2>
              <p className="text-xs text-slate-400">
                إحصائيات حية حول المعروض العقاري، حجم المحفظة، وتفاعل العملاء.
              </p>
            </div>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                  <span>إجمالي العقارات</span>
                  <Building2 className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-black font-alexandria text-white">{properties.length}</div>
                <div className="text-[11px] text-slate-500">
                  {forSaleCount} للبيع • {forRentCount} للإيجار
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                  <span>قيمة المحفظة المعروضة</span>
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-black font-alexandria text-emerald-400">
                  ${(totalValueUsd / 1000000).toFixed(2)}M
                </div>
                <div className="text-[11px] text-slate-500">
                  ≈ {((totalValueUsd * sypRate) / 1000000000).toFixed(1)} مليار ليرة سورية
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                  <span>طلبات العملاء (Leads)</span>
                  <Users className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-black font-alexandria text-white">{leads.length}</div>
                <div className="text-[11px] text-amber-400 font-bold">{newLeadsCount} طلبات جديدة بانتظار الرد</div>
              </div>

              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                  <span>عقارات بالطاقة الشمسية</span>
                  <Sun className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black font-alexandria text-amber-300">{solarCount}</div>
                <div className="text-[11px] text-slate-500">
                  {Math.round((solarCount / (properties.length || 1)) * 100)}% من المعروض
                </div>
              </div>
            </div>

            {/* Distribution Charts Visual Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Governorates Distribution (7 Cols) */}
              <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold font-alexandria text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-500" />
                  <span>توزيع العقارات جغرافياً حسب المحافظة</span>
                </h3>

                <div className="space-y-3 pt-2">
                  {Object.entries(govCounts).map(([gov, count]) => {
                    const pct = Math.round((count / properties.length) * 100);
                    return (
                      <div key={gov} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-slate-300 font-bold">{gov}</span>
                          <span className="text-slate-400">
                            {count} عقارات ({pct}%)
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top Viewed Properties Ranking (5 Cols) */}
              <div className="lg:col-span-5 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold font-alexandria text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-amber-500" />
                  <span>العقارات الأكثر مشاهدة واهتماماً</span>
                </h3>

                <div className="space-y-2.5 pt-1">
                  {sortedByViews.map((p, idx) => (
                    <div
                      key={p.id}
                      className="p-3 rounded-2xl bg-slate-850 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 font-bold flex items-center justify-center text-[10px] shrink-0">
                          {idx + 1}
                        </span>
                        <div className="truncate">
                          <span className="font-bold text-white block truncate">{p.title}</span>
                          <span className="text-[10px] text-slate-500">{p.region}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono text-[11px] shrink-0">
                        {p.viewsCount || 0} زيارة
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: EXCHANGE RATES ================= */}
        {activeTab === 'rates' && (
          <div className="space-y-6 animate-in fade-in duration-200 max-w-2xl">
            <div>
              <h2 className="text-xl font-bold font-alexandria text-white">
                إدارة وتحديث أسعار الصرف (USD Base)
              </h2>
              <p className="text-xs text-slate-400">
                يتم تخزين جميع أسعار العقارات بالدولار USD، وتُحسب أسعار الليرة واليورو بناءً على هذه القيم.
              </p>
            </div>

            {rateSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center">
                تم تحديث وحفظ أسعار الصرف بنجاح! سيتم تطبيقها فورياً في كافة صفحات الموقع.
              </div>
            )}

            <form
              onSubmit={handleSaveRates}
              className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-5 shadow-xl"
            >
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  سعر صرف الليرة السورية مقابل 1 دولار أمريكي (SYP / USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-mono">
                    ل.س
                  </span>
                  <input
                    type="number"
                    required
                    value={sypRate}
                    onChange={(e) => setSypRate(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white font-bold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  سعر صرف اليورو مقابل 1 دولار أمريكي (EUR / USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-mono">
                    EUR
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={eurRate}
                    onChange={(e) => setEurRate(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white font-bold focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 space-y-2">
                <span className="font-bold block text-emerald-400">معاينة الحساب لعقار بقيمة $100,000:</span>
                <div className="flex justify-between">
                  <span>بالليرة السورية:</span>
                  <span className="font-bold font-mono">
                    {(100000 * sypRate).toLocaleString('en-US')} ل.س
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>باليورو:</span>
                  <span className="font-bold font-mono">
                    €{(100000 * eurRate).toLocaleString('en-US')}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] shadow-lg shadow-emerald-600/25"
              >
                <Save className="w-4 h-4" />
                <span>حفظ وتعميم أسعار الصرف</span>
              </button>
            </form>
          </div>
        )}
      </main>

      {/* ================= PROPERTY CREATE/EDIT MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl my-8 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-850">
              <h3 className="text-lg font-bold text-white font-alexandria">
                {editingProperty ? `تعديل العقار (${editingProperty.propertyCode})` : 'إضافة عقار جديد'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveProperty} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    الرمز المرجعي الفريد *
                  </label>
                  <input
                    type="text"
                    required
                    value={formPropertyCode}
                    onChange={(e) => setFormPropertyCode(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-amber-300 font-mono font-bold focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    عنوان العقار *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: شقة سوبر ديلوكس في أبو رمانة"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">نوع العقد</label>
                  <select
                    value={formContractType}
                    onChange={(e) => setFormContractType(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                  >
                    <option value="sale">بيع</option>
                    <option value="rent">إيجار</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">نوع العقار</label>
                  <select
                    value={formPropertyType}
                    onChange={(e) => setFormPropertyType(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                  >
                    <option value="apartment">شقة</option>
                    <option value="villa">فيلا</option>
                    <option value="commercial">تجاري / مكتب</option>
                    <option value="chalet">شاليه / مزرعة</option>
                    <option value="land">أرض</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">المحافظة</label>
                  <select
                    value={formGovernorate}
                    onChange={(e) => setFormGovernorate(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                  >
                    <option value="دمشق">دمشق</option>
                    <option value="ريف دمشق">ريف دمشق</option>
                    <option value="حلب">حلب</option>
                    <option value="حمص">حمص</option>
                    <option value="حماة">حماة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">المنطقة / الحي</label>
                  <input
                    type="text"
                    required
                    value={formRegion}
                    onChange={(e) => setFormRegion(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    السعر الكنسي بالدولار ($) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formPriceUsd}
                    onChange={(e) => setFormPriceUsd(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-emerald-400 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">المساحة (م²)</label>
                  <input
                    type="number"
                    value={formArea}
                    onChange={(e) => setFormArea(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">غرف النوم</label>
                  <input
                    type="number"
                    value={formBedrooms}
                    onChange={(e) => setFormBedrooms(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">الحمامات</label>
                  <input
                    type="number"
                    value={formBathrooms}
                    onChange={(e) => setFormBathrooms(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">الطابق</label>
                  <input
                    type="text"
                    value={formFloor}
                    onChange={(e) => setFormFloor(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">الاتجاه والقبلية</label>
                  <input
                    type="text"
                    value={formDirection}
                    onChange={(e) => setFormDirection(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">سند الملكية</label>
                  <input
                    type="text"
                    value={formOwnership}
                    onChange={(e) => setFormOwnership(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  عنوان تفصيلي ووصف الموقع
                </label>
                <input
                  type="text"
                  placeholder="شارع أبي رمانة الرئيسي مقابل الحديقة..."
                  value={formLocationDetails}
                  onChange={(e) => setFormLocationDetails(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              {/* Amenities Checks */}
              <div className="flex flex-wrap items-center gap-4 p-3 bg-slate-850 rounded-2xl border border-slate-800 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formHasSolar}
                    onChange={(e) => setFormHasSolar(e.target.checked)}
                    className="rounded text-emerald-600"
                  />
                  <span>طاقة شمسية</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formHasElevator}
                    onChange={(e) => setFormHasElevator(e.target.checked)}
                    className="rounded text-emerald-600"
                  />
                  <span>مصعد شغال</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formHasGarage}
                    onChange={(e) => setFormHasGarage(e.target.checked)}
                    className="rounded text-emerald-600"
                  />
                  <span>كراج خاص</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formFeatured}
                    onChange={(e) => setFormFeatured(e.target.checked)}
                    className="rounded text-amber-500"
                  />
                  <span className="text-amber-400 font-bold">عقار مميز (Featured)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsOffPlan}
                    onChange={(e) => setFormIsOffPlan(e.target.checked)}
                    className="rounded text-amber-500"
                  />
                  <span className="text-amber-300 font-bold flex items-center gap-1">
                    <HardHat className="w-3.5 h-3.5 text-amber-400" />
                    مشروع على المخطط (قيد الإنشاء)
                  </span>
                </label>
              </div>

              {/* Off-Plan Fields if checked */}
              {formIsOffPlan && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-3">
                  <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <HardHat className="w-4 h-4" />
                    بيانات البيع على المخطط والتقسيط
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        موعد التسليم المتوقع
                      </label>
                      <input
                        type="text"
                        placeholder="الربع الرابع 2026"
                        value={formHandoverDate}
                        onChange={(e) => setFormHandoverDate(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        نسبة الإنجاز الفعلي (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formConstructionProgress}
                        onChange={(e) => setFormConstructionProgress(Number(e.target.value))}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">
                        خطة السداد والأقساط
                      </label>
                      <input
                        type="text"
                        placeholder="دفعة 20% وأقساط على 36 شهراً"
                        value={formPaymentPlan}
                        onChange={(e) => setFormPaymentPlan(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Local Image Upload & Dropzone with Auto Optimizer */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>معرض صور العقار ({formImages.length})</span>
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isCompressingAdminImages}
                      className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer disabled:opacity-50"
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>رفع من الجهاز</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleAddImageUrlPrompt}
                      className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-300 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>إضافة رابط URL</span>
                    </button>
                  </div>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageFileUpload}
                  multiple
                  accept="image/*"
                  disabled={isCompressingAdminImages}
                  className="hidden"
                />

                {/* Auto-compression Feedback Banner */}
                {adminCompressionFeedback && (
                  <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{adminCompressionFeedback}</span>
                  </div>
                )}

                {/* Thumbnails preview strip */}
                {formImages.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 p-3 rounded-2xl bg-slate-850 border border-slate-800">
                    {formImages.map((img, idx) => (
                      <div key={idx} className="relative group rounded-xl overflow-hidden aspect-video bg-slate-900 border border-slate-700">
                        <img src={img} alt="صورة العقار" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-red-600/90 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-md"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-slate-950/80 text-[10px] text-slate-300 font-mono">
                          #{idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      if (!isCompressingAdminImages) {
                        fileInputRef.current?.click();
                      }
                    }}
                    className={`p-6 rounded-2xl border-2 border-dashed text-center transition-colors space-y-1 ${
                      isCompressingAdminImages
                        ? 'border-emerald-500/80 bg-emerald-950/20 cursor-wait animate-pulse'
                        : 'border-slate-700 hover:border-emerald-500/50 cursor-pointer bg-slate-850/40 hover:bg-slate-850/80'
                    }`}
                  >
                    <UploadCloud className={`w-7 h-7 text-emerald-400 mx-auto ${isCompressingAdminImages ? 'animate-bounce' : ''}`} />
                    <p className="text-xs text-slate-200 font-bold">
                      {isCompressingAdminImages ? 'جاري تحسين وضغط الصور...' : 'انقر لرفع صور العقار من جهازك'}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      محرك تحسين فوري: يضغط الصور الكبيرة تلقائياً لأعلى دقة وسرعة (WebP/JPEG)
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  الوصف الكامل للعقار
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white resize-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-lg"
                >
                  حفظ العقار
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
