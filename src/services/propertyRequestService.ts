import { PropertyRequest, PropertyRequestStatus } from '../types/propertyRequest';

const STORAGE_KEY = 'syria_realestate_property_requests';

const INITIAL_MOCK_REQUESTS: PropertyRequest[] = [
  {
    id: 'req-101',
    requestCode: 'REQ-501',
    requesterName: 'الدكتور أنس الشريف (مغترب في السعودية)',
    requesterPhone: '+966 50 123 4567',
    requesterWhatsapp: '+966501234567',
    requesterEmail: 'anas.shareef@example.com',
    governorate: 'دمشق',
    preferredRegions: ['المالكي', 'أبو رمانة', 'المزة فيلات غربية'],
    contractType: 'sale',
    propertyType: 'apartment',
    minBudgetUsd: 300000,
    maxBudgetUsd: 480000,
    minArea: 200,
    minBedrooms: 3,
    paymentPreference: 'cash',
    requiredFeatures: ['طاقة شمسية', 'مصعد شغال 24/7', 'طابو سبز 2400', 'كراج سيارات خاص'],
    description: 'أبحث عن شقة راقية جداً بإكساء ديلوكس حديث، جاهزة للسكن المباشر مع عائلتي خلال زيارتي القادمة لدمشق. الدفع كاش فوري بالدولار.',
    urgency: 'immediate',
    status: 'new',
    adminNotes: 'تم الاطلاع على الطلب، يوجد شقة مطابقة في أبو رمانة (REF-101) وشقة بالمزة (REF-102)، يلزم التواصل لترتيب المعاينة.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: 'req-102',
    requestCode: 'REQ-502',
    requesterName: 'السيد علاء الدين الحلبي',
    requesterPhone: '+963 944 888 222',
    requesterWhatsapp: '+963944888222',
    requesterEmail: 'alaa.halabi@example.com',
    governorate: 'ريف دمشق',
    preferredRegions: ['يعفور', 'الصبورة'],
    contractType: 'sale',
    propertyType: 'villa',
    minBudgetUsd: 180000,
    maxBudgetUsd: 320000,
    minArea: 400,
    minBedrooms: 4,
    paymentPreference: 'cash',
    requiredFeatures: ['مسبح مستقل', 'طاقة شمسية', 'حديقة مشجرة', 'بئر ماء أو تغذية مستقرة'],
    description: 'مطلوب فيلا أو مزرعة استجمامية مجهزة بالكامل ومسورة، طريق ممهد وسهل الوصول.',
    urgency: 'within_month',
    status: 'in_progress',
    adminNotes: 'تم التواصل معه هاتفياً وهو بانتظار إرسال صور ومقاطع فيديو لفيلات يعفور المتاحة.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 'req-103',
    requestCode: 'REQ-503',
    requesterName: 'شركة أفق المستقبل للاستشارات والتقانة',
    requesterPhone: '+963 933 111 999',
    requesterWhatsapp: '+963933111999',
    governorate: 'دمشق',
    preferredRegions: ['كفرسوسة - تنظيم', 'المزة - أوتوستراد'],
    contractType: 'rent',
    propertyType: 'commercial',
    minBudgetUsd: 800,
    maxBudgetUsd: 1800,
    minArea: 150,
    minBedrooms: 4,
    paymentPreference: 'any',
    requiredFeatures: ['مصعد', 'مولدة أو طاقة شمسية', 'مواقف سيارات', 'موقع تجاري مرموق'],
    description: 'مطلوب طابق مكتبي أو شقة تجارية لشركة برمجيات واستشارات تقنية تضم 15 موظفاً، عقد إيجار سنوي قابل للتجديد.',
    urgency: 'immediate',
    status: 'new',
    adminNotes: '',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: 'req-104',
    requestCode: 'REQ-504',
    requesterName: 'المهندسة ندى القاسم',
    requesterPhone: '+963 955 444 333',
    requesterWhatsapp: '+963955444333',
    governorate: 'دمشق',
    preferredRegions: ['ماروتا سيتي', 'مشروع دمر', 'ضاحية قدسيا'],
    contractType: 'sale',
    propertyType: 'apartment',
    minBudgetUsd: 40000,
    maxBudgetUsd: 95000,
    minArea: 110,
    minBedrooms: 2,
    paymentPreference: 'installments',
    requiredFeatures: ['إمكانية التقسيط', 'طاقة شمسية', 'مصعد'],
    description: 'أبحث عن شقة بالتقسيط (دفعة أولى 35,000$ وأقساط شهرية مريحة)، أو مشروع قيد الإنشاء موثوق.',
    urgency: 'exploring',
    status: 'matched',
    adminNotes: 'تم تزويدها بخطة سداد مشروع ماروتا سيتي وأبراج قدسيا.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
];

export const propertyRequestService = {
  /**
   * Get all client requests (combines localStorage with initial data)
   */
  getRequests(): PropertyRequest[] {
    if (typeof window === 'undefined') {
      return INITIAL_MOCK_REQUESTS;
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_REQUESTS));
    } catch {
      // ignore
    }
    return INITIAL_MOCK_REQUESTS;
  },

  /**
   * Submit a new customized property request from a user directly to Admin
   */
  createRequest(data: Omit<PropertyRequest, 'id' | 'requestCode' | 'status' | 'createdAt'>): PropertyRequest {
    const all = this.getRequests();
    const nextNum = 500 + all.length + 1;
    const newRequest: PropertyRequest = {
      ...data,
      id: `req_${Date.now()}`,
      requestCode: `REQ-${nextNum}`,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    const updated = [newRequest, ...all];
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving property request:', e);
      }
    }
    return newRequest;
  },

  /**
   * Update the status and admin internal notes of a request
   */
  updateRequest(
    id: string,
    updates: Partial<Pick<PropertyRequest, 'status' | 'adminNotes'>>
  ): boolean {
    const all = this.getRequests();
    const index = all.findIndex((r) => r.id === id);
    if (index === -1) return false;

    all[index] = {
      ...all[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
        return true;
      } catch (e) {
        console.error('Error updating property request:', e);
      }
    }
    return true;
  },

  /**
   * Delete a request
   */
  deleteRequest(id: string): boolean {
    let all = this.getRequests();
    all = all.filter((r) => r.id !== id);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
        return true;
      } catch (e) {
        console.error('Error deleting property request:', e);
      }
    }
    return true;
  },

  /**
   * Generate Direct WhatsApp Click-to-Chat URL to Platform Admin
   */
  generateAdminWhatsAppUrl(req: Partial<PropertyRequest>): string {
    const adminPhone = '963988123456';
    const lines = [
      `🏛️ *طلب عقار مخصص عبر منصة عقارات سوريا*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `👤 *اسم العميل:* ${req.requesterName || 'غير محدد'}`,
      `📞 *رقم التواصل:* ${req.requesterPhone || ''}`,
      `📍 *المحافظة المطلوبة:* ${req.governorate || 'دمشق'}`,
      req.preferredRegions && req.preferredRegions.length > 0 ? `🏘️ *المناطق المفضلة:* ${req.preferredRegions.join('، ')}` : '',
      `🏷️ *نوع العملية:* ${req.contractType === 'rent' ? 'استئجار' : 'شراء ملكية'}`,
      `🏢 *نوع العقار:* ${req.propertyType || 'شقة'}`,
      `💰 *الميزانية القصوى:* $${req.maxBudgetUsd ? req.maxBudgetUsd.toLocaleString() : 'غير محدد'}`,
      req.minArea ? `📐 *المساحة المطلوبة:* لا تقل عن ${req.minArea} م²` : '',
      req.requiredFeatures && req.requiredFeatures.length > 0 ? `✨ *الشروط والميزات:* ${req.requiredFeatures.join(' • ')}` : '',
      req.description ? `📝 *تفاصيل إضافية:* ${req.description}` : '',
      `━━━━━━━━━━━━━━━━━━━━`,
      `_أرجو من إدارة المنصة البحث والتواصل معي بأقرب فرصة عند توفر عروض مطابقة._`
    ].filter(Boolean);

    const fullMessage = lines.join('\n');
    return `https://wa.me/${adminPhone}?text=${encodeURIComponent(fullMessage)}`;
  }
};
