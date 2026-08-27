'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole, AuthSession, LeadInquiryItem } from '../types/auth';

// Realistic Syrian Demo Accounts
export const DEMO_ACCOUNTS: Record<UserRole, UserProfile> = {
  user: {
    id: 'usr_user_101',
    name: 'م. أسامة الحمصي',
    email: 'user@example.com',
    phone: '+963 944 123 789',
    whatsapp: '+963944123789',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    city: 'دمشق - المزة',
    createdAt: '2026-01-15',
    myListings: ['SY-DMS-104'],
    savedSearches: [
      {
        id: 'srch_1',
        title: 'شقق للبيع في المزة أو المالكي (مع طاقة شمسية ومصعد)',
        query: '/properties?governorate=دمشق&hasSolar=true&hasElevator=true',
        createdAt: '2026-08-10',
      },
      {
        id: 'srch_2',
        title: 'فيلات واستراحات ريف دمشق - يعفور والصبورة',
        query: '/properties?governorate=ريف دمشق&propertyType=villa',
        createdAt: '2026-08-18',
      },
    ],
    notes: 'مستثمر ومهتم بالشقق السكنية في دمشق وريفها',
  },
  agency: {
    id: 'usr_agency_202',
    name: 'مكتب الرواد للاستشارات والوساطة العقارية',
    email: 'agency@example.com',
    phone: '+963 988 123 456',
    whatsapp: '+963988123456',
    role: 'agency',
    avatar: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80',
    city: 'دمشق - أبو رمانة',
    createdAt: '2025-05-10',
    myListings: ['SY-DMS-101', 'SY-DMS-102', 'SY-RDMS-201', 'SY-DMS-103'],
    agencyDetails: {
      agencyName: 'مكتب الرواد للاستشارات والوساطة العقارية',
      licenseNumber: 'ترخيص نقابي رقم 104 / دمشق',
      governorate: 'دمشق',
      region: 'أبو رمانة - شارع الجاحظ',
      address: 'شارع الجاحظ، بناء الفردوس، طابق 1',
      specialties: ['شقق سكنية راقية', 'قصور وأبنية مستقلة', 'إيجارات دبلوماسية', 'البيع على المخطط'],
      description: 'من أعرق المكاتب العقارية المعتمدة في دمشق وريفها، نوفر خدمات الوساطة والاستشارات وتدقيق السندات الملكية.',
      badge: 'مكتب معتمد 🛡️',
      isVerified: true,
      experienceYears: 18,
      website: 'https://alrowad-realestate.sy',
    },
    savedSearches: [],
    notes: 'وكالة عقارية معتمدة ومرخصة برقم 104',
  },
  admin: {
    id: 'usr_admin_999',
    name: 'إدارة المنصة (Super Admin)',
    email: 'admin@realestate-syria.com',
    phone: '+963 988 000 111',
    whatsapp: '+963988000111',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    city: 'دمشق',
    createdAt: '2025-01-01',
    myListings: [],
    notes: 'المدير العام والمسؤول عن تدقيق ونشر العروض العقارية',
  },
};

// Sample inquiries received for properties
export const INITIAL_INQUIRIES: LeadInquiryItem[] = [
  {
    id: 'inq-01',
    propertyId: 'SY-DMS-101',
    propertyTitle: 'شقة فاخرة مطلة على حديقة الجاحظ - أبو رمانة',
    propertyCode: 'REF-101',
    senderName: 'الدكتور مروان البيطار',
    senderPhone: '+963 933 445 566',
    senderWhatsapp: '+963933445566',
    message: 'السلام عليكم، أرغب بحجز موعد لمعاينة الشقة غداً عصراً مع العائلة، وهل السعر قابل للتفاوض البسيط؟',
    inquiryType: 'viewing',
    status: 'new',
    createdAt: 'منذ ساعتين',
  },
  {
    id: 'inq-02',
    propertyId: 'SY-RDMS-201',
    propertyTitle: 'فيلا ملكية مستقلة بمسبح وطاقة شمسية - يعفور',
    propertyCode: 'REF-201',
    senderName: 'السيد طارق العبدالله (مغترب في الإمارات)',
    senderPhone: '+971 50 123 4567',
    senderWhatsapp: '+971501234567',
    message: 'مرحباً، أود معرفة تفاصيل الطابو وطريقة سداد الدفعة عبر حوالة مصرفية رسمية.',
    inquiryType: 'price',
    status: 'contacted',
    createdAt: 'منذ يوم',
  },
  {
    id: 'inq-03',
    propertyId: 'SY-DMS-102',
    propertyTitle: 'شقة دوبلكس مودرن مع تراس بانورامي - المزة فيلات غربية',
    propertyCode: 'REF-102',
    senderName: 'الآنسة رند الخطيب',
    senderPhone: '+963 955 778 899',
    senderWhatsapp: '+963955778899',
    message: 'هل يتوفر نظام مصعد شغال على مدار الساعة وموقف سيارة مخصص للشقة؟ شكراً.',
    inquiryType: 'general',
    status: 'new',
    createdAt: 'منذ يومين',
  },
];

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  inquiries: LeadInquiryItem[];
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginAsDemo: (role: UserRole) => void;
  register: (userData: Partial<UserProfile>, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updatedData: Partial<UserProfile>) => void;
  addMyListing: (propertyId: string) => void;
  removeMyListing: (propertyId: string) => void;
  markInquiryStatus: (inquiryId: string, status: 'new' | 'contacted' | 'closed') => void;
  deleteInquiry: (inquiryId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'syria_realestate_user_session';
const INQUIRIES_STORAGE_KEY = 'syria_realestate_inquiries_store';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [inquiries, setInquiries] = useState<LeadInquiryItem[]>(INITIAL_INQUIRIES);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedSession = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedSession) {
        const session: AuthSession = JSON.parse(storedSession);
        if (session && session.user) {
          setUser(session.user);
        }
      }

      const storedInquiries = localStorage.getItem(INQUIRIES_STORAGE_KEY);
      if (storedInquiries) {
        setInquiries(JSON.parse(storedInquiries));
      }
    } catch (e) {
      console.error('Error loading session from localStorage:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveSession = (newUser: UserProfile | null) => {
    setUser(newUser);
    if (newUser) {
      const session: AuthSession = {
        user: newUser,
        token: `mock_jwt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        loggedInAt: new Date().toISOString(),
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    // Simulate brief network latency for realistic feel
    await new Promise((res) => setTimeout(res, 400));

    // Check against demo accounts or accept valid emails
    const trimmedEmail = email.toLowerCase().trim();
    if (!trimmedEmail || !password) {
      setIsLoading(false);
      return { success: false, error: 'يرجى إدخال البريد الإلكتروني وكلمة المرور' };
    }

    if (password.length < 4) {
      setIsLoading(false);
      return { success: false, error: 'كلمة المرور يجب أن لا تقل عن 4 محارف' };
    }

    if (trimmedEmail.includes('admin')) {
      saveSession(DEMO_ACCOUNTS.admin);
      setIsLoading(false);
      return { success: true };
    }

    if (trimmedEmail.includes('agency') || trimmedEmail.includes('rowad') || trimmedEmail.includes('office')) {
      saveSession(DEMO_ACCOUNTS.agency);
      setIsLoading(false);
      return { success: true };
    }

    // Default regular user login or custom user
    const loggedUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0] || 'مستخدم مسجل',
      email: trimmedEmail,
      phone: '+963 944 000 000',
      whatsapp: '+963944000000',
      role: 'user',
      city: 'دمشق',
      createdAt: new Date().toISOString().split('T')[0],
      myListings: [],
      savedSearches: [],
    };

    saveSession(loggedUser);
    setIsLoading(false);
    return { success: true };
  };

  const loginAsDemo = (role: UserRole) => {
    const demo = DEMO_ACCOUNTS[role];
    if (demo) {
      saveSession(demo);
    }
  };

  const register = async (
    userData: Partial<UserProfile>,
    password?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 450));

    if (!userData.name || !userData.email) {
      setIsLoading(false);
      return { success: false, error: 'يرجى إدخال الاسم والبريد الإلكتروني' };
    }

    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '+963 900 000 000',
      whatsapp: userData.whatsapp || '+963900000000',
      role: userData.role || 'user',
      city: userData.city || 'دمشق',
      createdAt: new Date().toISOString().split('T')[0],
      avatar:
        userData.avatar ||
        (userData.role === 'agency'
          ? 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'),
      agencyDetails: userData.agencyDetails,
      myListings: userData.role === 'agency' ? ['SY-DMS-101', 'SY-DMS-102'] : [],
      savedSearches: [],
      notes: userData.notes,
    };

    saveSession(newUser);
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    saveSession(null);
  };

  const updateProfile = (updatedData: Partial<UserProfile>) => {
    if (!user) return;
    const updated: UserProfile = {
      ...user,
      ...updatedData,
      agencyDetails: updatedData.agencyDetails
        ? { ...user.agencyDetails, ...updatedData.agencyDetails } as any
        : user.agencyDetails,
    };
    saveSession(updated);
  };

  const addMyListing = (propertyId: string) => {
    if (!user) return;
    const currentListings = user.myListings || [];
    if (!currentListings.includes(propertyId)) {
      const updated = {
        ...user,
        myListings: [propertyId, ...currentListings],
      };
      saveSession(updated);
    }
  };

  const removeMyListing = (propertyId: string) => {
    if (!user) return;
    const currentListings = user.myListings || [];
    const updated = {
      ...user,
      myListings: currentListings.filter((id) => id !== propertyId),
    };
    saveSession(updated);
  };

  const markInquiryStatus = (inquiryId: string, status: 'new' | 'contacted' | 'closed') => {
    const updated = inquiries.map((item) => (item.id === inquiryId ? { ...item, status } : item));
    setInquiries(updated);
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
  };

  const deleteInquiry = (inquiryId: string) => {
    const updated = inquiries.filter((item) => item.id !== inquiryId);
    setInquiries(updated);
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        inquiries,
        login,
        loginAsDemo,
        register,
        logout,
        updateProfile,
        addMyListing,
        removeMyListing,
        markInquiryStatus,
        deleteInquiry,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
