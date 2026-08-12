export type ContractType = 'all' | 'sale' | 'rent';

export type PropertyType = 'all' | 'apartment' | 'villa' | 'commercial' | 'chalet' | 'land';

export type Governorate =
  | 'الكل'
  | 'دمشق'
  | 'ريف دمشق'
  | 'حلب'
  | 'حمص'
  | 'حماة';

export interface Property {
  id: string;
  title: string;
  contractType: 'sale' | 'rent';
  propertyType: 'apartment' | 'villa' | 'commercial' | 'chalet' | 'land';
  governorate: Exclude<Governorate, 'الكل'>;
  region: string;
  locationDetails: string;
  price: number; // Numeric value in SYP or USD for sorting/filtering
  formattedPrice: string; // e.g. "450,000,000 ل.س" or "$85,000"
  currency: 'ل.س' | '$';
  area: number; // m2
  bedrooms: number;
  bathrooms: number;
  floor: string;
  direction: string; // e.g. "قبلي شرقي"
  ownershipType: string; // e.g. "طابو سبز (2400 سهم)"
  features: string[];
  images: string[];
  featured?: boolean;
  whatsappNumber: string;
  createdAt: string;
  description: string;
}

export interface FilterOptions {
  searchQuery: string;
  contractType: ContractType;
  propertyType: PropertyType;
  governorate: Governorate;
  region: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  bedrooms?: number | 'all';
  hasSolar?: boolean;
  hasTaboGreen?: boolean;
  hasElevator?: boolean;
  sortBy: 'newest' | 'price_asc' | 'price_desc' | 'area_desc';
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
