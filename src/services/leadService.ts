import { Lead, LeadStatus, LeadSource } from '../types/lead';

const STORAGE_KEY = 'syria_realestate_leads';

const INITIAL_MOCK_LEADS: Lead[] = [
  {
    id: 'lead-101',
    propertyId: 'SY-DMS-101',
    propertyCode: 'REF-101',
    propertyTitle: 'شقة فاخرة مطلة على حديقة الجاحظ - أبو رمانة',
    name: 'المهندس وسيم الأحمد',
    phone: '+963944112233',
    email: 'waseem@example.com',
    source: 'website',
    status: 'new',
    message: 'أرغب بمعاينة الشقة في نهاية هذا الأسبوع والتأكد من تفاصيل منظومة الطاقة الشمسية.',
    notes: 'العميل مهتم جداً والدفع كاش بالدولار.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: 'lead-102',
    propertyId: 'SY-RDMS-106',
    propertyCode: 'REF-106',
    propertyTitle: 'فيلا فاخرة ومزرعة ملكية مع مسبح - يعفور',
    name: 'الدكتور طارق حمصي',
    phone: '+963933556677',
    source: 'whatsapp',
    status: 'contacted',
    message: 'استفسار عن إمكانية التفاوض على سعر الفيلا وترتيب زيارة ميدانية.',
    notes: 'تم التواصل معه هاتفياً وموعد الزيارة يوم الخميس القادم.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  }
];

export const leadService = {
  getLeads(): Lead[] {
    if (typeof window === 'undefined') {
      return INITIAL_MOCK_LEADS;
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MOCK_LEADS));
    } catch {
      // ignore
    }
    return INITIAL_MOCK_LEADS;
  },

  createLead(data: {
    propertyId?: string;
    propertyCode?: string;
    propertyTitle?: string;
    name: string;
    phone: string;
    email?: string;
    source?: LeadSource;
    message?: string;
  }): Lead {
    const leads = this.getLeads();
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      propertyId: data.propertyId,
      propertyCode: data.propertyCode,
      propertyTitle: data.propertyTitle,
      name: data.name,
      phone: data.phone,
      email: data.email,
      source: data.source || 'website',
      status: 'new',
      message: data.message,
      createdAt: new Date().toISOString(),
    };

    const updated = [newLead, ...leads];
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    return newLead;
  },

  updateLeadStatus(id: string, status: LeadStatus, notes?: string): Lead | null {
    const leads = this.getLeads();
    let updatedLead: Lead | null = null;

    const updated = leads.map((lead) => {
      if (lead.id === id) {
        updatedLead = {
          ...lead,
          status,
          notes: notes !== undefined ? notes : lead.notes,
          updatedAt: new Date().toISOString(),
        };
        return updatedLead;
      }
      return lead;
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    return updatedLead;
  },

  generateAdminWhatsAppUrl(lead: Lead): string {
    const cleanPhone = lead.phone.replace(/[^0-9+]/g, '').replace(/^00/, '+');
    const msg = `مرحباً ${lead.name}، معك إدارة منصة عقارات سوريا بخصوص طلبك${lead.propertyCode ? ` للعقار (${lead.propertyCode} - ${lead.propertyTitle})` : ''}. يسعدنا خدمتكم والإجابة عن كافة استفساراتكم.`;
    return `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(msg)}`;
  }
};
