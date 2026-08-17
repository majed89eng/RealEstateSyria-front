export type LeadSource = 'website' | 'whatsapp' | 'facebook' | 'ai_assistant' | 'other';
export type LeadStatus = 'new' | 'contacted' | 'visited' | 'closed';

export interface Lead {
  id: string;
  propertyId?: string;
  propertyCode?: string;
  propertyTitle?: string;
  name: string;
  phone: string;
  email?: string;
  source: LeadSource;
  status: LeadStatus;
  message?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}
