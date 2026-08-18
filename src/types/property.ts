export type ContractType = 'all' | 'sale' | 'rent';

export type PropertyType =
  | 'all'
  | 'apartment'
  | 'villa'
  | 'commercial'
  | 'chalet'
  | 'land'
  | 'shop'
  | 'office'
  | 'warehouse'
  | 'building'
  | 'farm'
  | 'other';

export type AvailabilityStatus = 'available' | 'reserved' | 'sold' | 'rented' | 'inactive';

export type FinishingStatus = 'shell' | 'semi_finished' | 'finished' | 'luxury';

export type CurrencyCode = 'USD' | 'SYP' | 'EUR';

export type Governorate =
  | 'الكل'
  | 'دمشق'
  | 'ريف دمشق'
  | 'حلب'
  | 'حمص'
  | 'حماة'
  | 'اللاذقية'
  | 'طرطوس';

export interface LocationHierarchy {
  provinceId: string;
  provinceNameAr: string;
  provinceNameEn: string;
  provinceSlug: string;
  cities: {
    cityId: string;
    cityNameAr: string;
    cityNameEn: string;
    citySlug: string;
    neighborhoods: {
      neighborhoodId: string;
      neighborhoodNameAr: string;
      neighborhoodNameEn: string;
      neighborhoodSlug: string;
    }[];
  }[];
}

export interface Property {
  id: string;
  propertyCode: string; // Unique human reference e.g. "REF-1024"
  slug: string; // SEO-friendly unique slug e.g. "modern-apartment-qudsaya-ref-1024"
  title: string;
  contractType: 'sale' | 'rent';
  propertyType: Exclude<PropertyType, 'all'>;
  availabilityStatus: AvailabilityStatus;
  finishingStatus: FinishingStatus;

  // Off-Plan / Under Construction Fields
  isOffPlan?: boolean; // هل العقار بيع على المخطط / قيد الإنشاء
  handoverDate?: string; // موعد التسليم المتوقع e.g. "الربع الرابع 2026"
  paymentPlan?: string; // خطة السداد e.g. "دفعة 25% وأقساط ميسرة على 3 سنوات"
  constructionProgress?: number; // نسبة الإنجاز الفعلي (0 إلى 100)
  
  // Location
  governorate: Exclude<Governorate, 'الكل'>;
  region: string; // City / Area
  neighborhood?: string;
  locationDetails: string;
  address?: string;
  lat?: number;
  lng?: number;

  // Price & Currency (USD is canonical source of truth)
  priceUsd: number;
  displayCurrencyPreference?: CurrencyCode;
  
  // Specs
  area: number; // m2
  bedrooms: number;
  bathrooms: number;
  floor: string;
  totalFloors?: number;
  direction: string; // e.g. "قبلي شرقي"
  ownershipType: string; // e.g. "طابو سبز (2400 سهم)"

  // Amenities
  hasSolar?: boolean;
  hasElevator?: boolean;
  hasGarage?: boolean;
  hasGenerator?: boolean;

  features: string[];
  images: string[];
  videoUrl?: string;
  featured?: boolean;
  isActive?: boolean;
  viewsCount?: number;

  // Contact
  contactPhone?: string;
  whatsappNumber: string;
  
  createdAt: string;
  updatedAt?: string;
  description: string;
}

export interface FilterOptions {
  searchQuery: string;
  contractType: ContractType;
  propertyType: PropertyType;
  governorate: Governorate;
  region: string;
  neighborhood?: string;
  minPriceUsd?: number;
  maxPriceUsd?: number;
  minArea?: number;
  maxArea?: number;
  bedrooms?: number | 'all';
  finishingStatus?: FinishingStatus | 'all';
  availabilityStatus?: AvailabilityStatus | 'all';
  isOffPlan?: boolean;
  hasSolar?: boolean;
  hasTaboGreen?: boolean;
  hasElevator?: boolean;
  hasGarage?: boolean;
  hasGenerator?: boolean;
  sortBy: 'newest' | 'price_asc' | 'price_desc' | 'area_desc' | 'most_viewed';
}

export interface ExchangeRate {
  currencyCode: CurrencyCode;
  rateToUsd: number; // e.g. 15000 for SYP (1 USD = 15,000 SYP), 0.92 for EUR
  symbol: string;
  nameAr: string;
  updatedAt: string;
}

export interface AIQueryMatch {
  property: Property;
  relevanceScore: number; // 0 to 100
  reason: string; // Syrian-Arabic explanation why it matched
}

export interface AIQueryResult {
  query: string;
  summary: string;
  matches: AIQueryMatch[];
}
