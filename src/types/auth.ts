export type UserRole = 'user' | 'agency' | 'admin';

export interface AgencyDetails {
  agencyName: string;
  licenseNumber?: string;
  governorate: string;
  region: string;
  address?: string;
  specialties: string[];
  description?: string;
  badge?: string;
  isVerified?: boolean;
  experienceYears?: number;
  website?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  role: UserRole;
  avatar?: string;
  city?: string;
  createdAt: string;
  agencyDetails?: AgencyDetails;
  myListings?: string[]; // Array of Property IDs
  savedSearches?: {
    id: string;
    title: string;
    query: string;
    createdAt: string;
  }[];
  notes?: string;
}

export interface AuthSession {
  user: UserProfile;
  token: string;
  loggedInAt: string;
}

export interface LeadInquiryItem {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyCode: string;
  senderName: string;
  senderPhone: string;
  senderWhatsapp?: string;
  message: string;
  inquiryType: 'viewing' | 'price' | 'general' | 'offer';
  status: 'new' | 'contacted' | 'closed';
  createdAt: string;
}
