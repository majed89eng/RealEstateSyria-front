export type PropertyRequestStatus = 'new' | 'in_progress' | 'matched' | 'closed' | 'cancelled';
export type BudgetCurrency = 'USD' | 'SYP';
export type UrgencyLevel = 'immediate' | 'within_month' | 'exploring';

export interface PropertyRequest {
  id: string;
  requestCode: string; // e.g. "REQ-301"
  requesterName: string;
  requesterPhone: string;
  requesterWhatsapp?: string;
  requesterEmail?: string;
  governorate: string; // e.g. "دمشق"
  preferredRegions: string[]; // e.g. ["المزة", "كفرسوسة"]
  contractType: 'sale' | 'rent'; // شراء أو استئجار
  propertyType: string; // شقة، فيلا، مكتب، مزرعة، تجاري
  minBudgetUsd?: number;
  maxBudgetUsd: number;
  minArea?: number;
  minBedrooms?: number;
  paymentPreference?: 'cash' | 'installments' | 'any';
  requiredFeatures: string[]; // ["طاقة شمسية", "مصعد", "طابو سبز 2400", "كراج"]
  description: string;
  urgency: UrgencyLevel;
  status: PropertyRequestStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt?: string;
}
