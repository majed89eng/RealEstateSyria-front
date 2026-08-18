import {
  FilterOptions,
  Property,
  Governorate,
  AIQueryResult,
  AIQueryMatch,
  CurrencyCode,
} from '../types/property';
import mockPropertiesData from '../data/properties.json';
import { exchangeRateService } from './exchangeRateService';
import { SYRIAN_LOCATIONS } from '../data/locations';

const STORAGE_KEY = 'syria_realestate_custom_properties';

/**
 * Returns all properties merging static mock data with any admin-created items in localStorage
 */
function getAllProperties(): Property[] {
  let list = [...(mockPropertiesData as unknown as Property[])];
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const customProps: Property[] = JSON.parse(stored);
        list = [...customProps, ...list];
      }
    } catch {
      // ignore
    }
  }
  return list;
}

export const propertyService = {
  /**
   * Fetch properties with dynamic filtering and sorting.
   */
  async getProperties(filters?: Partial<FilterOptions>): Promise<Property[]> {
    // Simulate slight API latency
    await new Promise((resolve) => setTimeout(resolve, 80));

    let result = getAllProperties().filter((p) => p.isActive !== false);

    if (!filters) return result;

    // Search query filter (matches title, code, region, neighborhood, description, features)
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.propertyCode.toLowerCase().includes(q) ||
          p.region.toLowerCase().includes(q) ||
          (p.neighborhood && p.neighborhood.toLowerCase().includes(q)) ||
          p.locationDetails.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.features.some((f) => f.toLowerCase().includes(q))
      );
    }

    // Contract Type filter
    if (filters.contractType && filters.contractType !== 'all') {
      result = result.filter((p) => p.contractType === filters.contractType);
    }

    // Property Type filter
    if (filters.propertyType && filters.propertyType !== 'all') {
      result = result.filter((p) => p.propertyType === filters.propertyType);
    }

    // Governorate filter
    if (filters.governorate && filters.governorate !== 'الكل') {
      result = result.filter((p) => p.governorate === filters.governorate);
    }

    // Region / City filter
    if (filters.region && filters.region !== 'الكل' && filters.region !== '') {
      result = result.filter((p) => p.region === filters.region);
    }

    // Neighborhood filter
    if (filters.neighborhood && filters.neighborhood !== 'الكل' && filters.neighborhood !== '') {
      result = result.filter((p) => p.neighborhood === filters.neighborhood);
    }

    // Min / Max Price in USD
    if (filters.minPriceUsd !== undefined && filters.minPriceUsd > 0) {
      result = result.filter((p) => p.priceUsd >= filters.minPriceUsd!);
    }
    if (filters.maxPriceUsd !== undefined && filters.maxPriceUsd > 0) {
      result = result.filter((p) => p.priceUsd <= filters.maxPriceUsd!);
    }

    // Min / Max Area
    if (filters.minArea !== undefined && filters.minArea > 0) {
      result = result.filter((p) => p.area >= filters.minArea!);
    }
    if (filters.maxArea !== undefined && filters.maxArea > 0) {
      result = result.filter((p) => p.area <= filters.maxArea!);
    }

    // Finishing Status
    if (filters.finishingStatus && filters.finishingStatus !== 'all') {
      result = result.filter((p) => p.finishingStatus === filters.finishingStatus);
    }

    // Availability Status
    if (filters.availabilityStatus && filters.availabilityStatus !== 'all') {
      result = result.filter((p) => p.availabilityStatus === filters.availabilityStatus);
    }

    // Bedrooms filter
    if (filters.bedrooms && filters.bedrooms !== 'all') {
      const roomCount = Number(filters.bedrooms);
      if (!isNaN(roomCount)) {
        if (roomCount >= 4) {
          result = result.filter((p) => p.bedrooms >= 4);
        } else {
          result = result.filter((p) => p.bedrooms === roomCount);
        }
      }
    }

    // Off-Plan (Under Construction) Filter
    if (filters.isOffPlan !== undefined && filters.isOffPlan) {
      result = result.filter((p) => p.isOffPlan === true);
    }

    // Amenities toggles
    if (filters.hasSolar) {
      result = result.filter((p) => p.hasSolar || p.features.some((f) => f.includes('طاقة شمسية')));
    }
    if (filters.hasTaboGreen) {
      result = result.filter(
        (p) => p.ownershipType.includes('طابو سبز') || p.features.some((f) => f.includes('طابو سبز'))
      );
    }
    if (filters.hasElevator) {
      result = result.filter(
        (p) => p.hasElevator || p.floor.includes('مصعد') || p.features.some((f) => f.includes('مصعد'))
      );
    }
    if (filters.hasGarage) {
      result = result.filter((p) => p.hasGarage || p.features.some((f) => f.includes('كراج')));
    }
    if (filters.hasGenerator) {
      result = result.filter((p) => p.hasGenerator || p.features.some((f) => f.includes('مولدة')));
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.priceUsd - b.priceUsd);
        break;
      case 'price_desc':
        result.sort((a, b) => b.priceUsd - a.priceUsd);
        break;
      case 'area_desc':
        result.sort((a, b) => b.area - a.area);
        break;
      case 'most_viewed':
        result.sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0));
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return result;
  },

  /**
   * Fetch single property by ID
   */
  async getPropertyById(id: string): Promise<Property | null> {
    const list = getAllProperties();
    const property = list.find((p) => p.id === id);
    return property || null;
  },

  /**
   * Fetch single property by unique SEO slug
   */
  async getPropertyBySlug(slug: string): Promise<Property | null> {
    const list = getAllProperties();
    const property = list.find((p) => p.slug === slug || p.id === slug);
    return property || null;
  },

  /**
   * Fetch single property by human-readable reference code (e.g. REF-101)
   */
  async getPropertyByCode(code: string): Promise<Property | null> {
    const list = getAllProperties();
    const cleanCode = code.trim().toUpperCase();
    const property = list.find((p) => p.propertyCode.toUpperCase() === cleanCode);
    return property || null;
  },

  /**
   * Fetch featured properties for homepage
   */
  async getFeaturedProperties(limit: number = 6): Promise<Property[]> {
    const list = getAllProperties().filter((p) => p.isActive !== false);
    const featured = list.filter((p) => p.featured);
    return featured.slice(0, limit);
  },

  /**
   * Fetch similar properties based on province and propertyType
   */
  async getSimilarProperties(property: Property, limit: number = 3): Promise<Property[]> {
    const list = getAllProperties().filter((p) => p.isActive !== false && p.id !== property.id);
    const sameProvince = list.filter(
      (p) => p.governorate === property.governorate && p.propertyType === property.propertyType
    );
    if (sameProvince.length >= limit) {
      return sameProvince.slice(0, limit);
    }
    const fallback = list.filter((p) => p.governorate === property.governorate);
    return [...sameProvince, ...fallback].slice(0, limit);
  },

  /**
   * Get unique regions list based on governorate
   */
  getRegions(governorate?: Governorate): string[] {
    let props = getAllProperties().filter((p) => p.isActive !== false);
    if (governorate && governorate !== 'الكل') {
      props = props.filter((p) => p.governorate === governorate);
    }
    const regions = Array.from(new Set(props.map((p) => p.region)));
    return regions;
  },

  /**
   * Get provinces with total count of active properties
   */
  getProvincesWithCounts(): { nameAr: string; slug: string; count: number }[] {
    const all = getAllProperties().filter((p) => p.isActive !== false);
    const provinces = SYRIAN_LOCATIONS.map((loc) => {
      const count = all.filter((p) => p.governorate === loc.provinceNameAr).length;
      return {
        nameAr: loc.provinceNameAr,
        slug: loc.provinceSlug,
        count,
      };
    });
    return provinces;
  },

  /**
   * AI-powered Search Assistant.
   * Parses Syrian natural language search queries and matches against properties.
   */
  async searchWithAI(userQuery: string): Promise<AIQueryResult> {
    await new Promise((resolve) => setTimeout(resolve, 450)); // AI thinking effect

    const queryLower = userQuery.toLowerCase();
    const matches: AIQueryMatch[] = [];
    const allProps = getAllProperties().filter((p) => p.isActive !== false);

    allProps.forEach((prop) => {
      let score = 0;
      const reasons: string[] = [];

      // Check Contract Type
      if ((queryLower.includes('بيع') || queryLower.includes('شراء')) && prop.contractType === 'sale') {
        score += 25;
        reasons.push('مطابقة مع رغبة الشراء/البيع');
      }
      if (
        (queryLower.includes('إيجار') || queryLower.includes('اجار') || queryLower.includes('للاجار')) &&
        prop.contractType === 'rent'
      ) {
        score += 25;
        reasons.push('مطابقة مع رغبة الإيجار');
      }

      // Check Governorate / Region keywords
      if (queryLower.includes(prop.governorate.toLowerCase())) {
        score += 30;
        reasons.push(`العقار في محافظة ${prop.governorate}`);
      }
      if (queryLower.includes(prop.region.toLowerCase())) {
        score += 35;
        reasons.push(`العقار في منطقة ${prop.region} المطلوبة`);
      }

      // Check Property Type
      if (queryLower.includes('شقة') && prop.propertyType === 'apartment') {
        score += 20;
        reasons.push('نوع العقار: شقة سكنية');
      }
      if (
        (queryLower.includes('فيلا') || queryLower.includes('مزرعة')) &&
        (prop.propertyType === 'villa' || prop.propertyType === 'chalet')
      ) {
        score += 20;
        reasons.push('نوع العقار: فيلا / مزرعة');
      }
      if (
        (queryLower.includes('مكتب') ||
          queryLower.includes('محل') ||
          queryLower.includes('تجاري') ||
          queryLower.includes('مستودع')) &&
        prop.propertyType === 'commercial'
      ) {
        score += 20;
        reasons.push('نوع العقار: تجاري / مكتب');
      }

      // Feature matching
      if (
        (queryLower.includes('طاقة') || queryLower.includes('شمسية')) &&
        (prop.hasSolar || prop.features.some((f) => f.includes('طاقة شمسية')))
      ) {
        score += 15;
        reasons.push('يتوفر نظام طاقة شمسية');
      }
      if (
        (queryLower.includes('طابو') || queryLower.includes('سبز') || queryLower.includes('2400')) &&
        prop.ownershipType.includes('طابو سبز')
      ) {
        score += 15;
        reasons.push('الملكية طابو سبز (2400 سهم)');
      }
      if (
        (queryLower.includes('مصعد') || queryLower.includes('أسانسير')) &&
        (prop.hasElevator || prop.floor.includes('مصعد'))
      ) {
        score += 10;
        reasons.push('يوجد مصعد بالمبنى');
      }
      if (
        (queryLower.includes('كراج') || queryLower.includes('موقف')) &&
        (prop.hasGarage || prop.features.some((f) => f.includes('كراج')))
      ) {
        score += 10;
        reasons.push('يوجد كراج خاص');
      }

      // Off-plan & Installments check
      if (
        (queryLower.includes('مخطط') ||
          queryLower.includes('قيد الإنشاء') ||
          queryLower.includes('أقساط') ||
          queryLower.includes('تقسيط') ||
          queryLower.includes('اكتتاب') ||
          queryLower.includes('مشروع')) &&
        prop.isOffPlan
      ) {
        score += 35;
        reasons.push('مشروع استثماري على المخطط بأقساط ميسرة');
      }

      // Price keywords check
      if (queryLower.includes('رخيص') || queryLower.includes('اقتصادي') || queryLower.includes('مناسب')) {
        if (prop.priceUsd <= 100000) {
          score += 15;
          reasons.push('السعر اقتصادي ومناسب');
        }
      }
      if (queryLower.includes('فخم') || queryLower.includes('ديلوكس') || queryLower.includes('فارهة')) {
        if (prop.priceUsd >= 250000 || prop.finishingStatus === 'luxury') {
          score += 15;
          reasons.push('إكساء ديلوكس وفخم جداً');
        }
      }

      if (score > 15) {
        matches.push({
          property: prop,
          relevanceScore: Math.min(score, 99),
          reason: reasons.join(' • '),
        });
      }
    });

    matches.sort((a, b) => b.relevanceScore - a.relevanceScore);

    return {
      query: userQuery,
      summary:
        matches.length > 0
          ? `بناءً على طلبك ("${userQuery}")، عثر المساعد الذكي على ${matches.length} عقارات مطابقة لمتطلباتك:`
          : `لم نجد نتائج مطابقة تماماً لطلبك ("${userQuery}"). جرب تحديد المنطقة أو نوع العقار بمصطلحات أعم.`,
      matches: matches.slice(0, 4),
    };
  },

  /**
   * Generates WhatsApp Click-to-Chat direct URL formatted in Arabic for Syrian Lead Generation.
   */
  generateWhatsAppUrl(
    property: Property,
    customMsg?: string,
    currentCurrency: CurrencyCode = 'USD'
  ): string {
    const rawPhone = property.whatsappNumber.replace(/[^0-9+]/g, '');
    const cleanPhone = rawPhone.startsWith('+') ? rawPhone.substring(1) : rawPhone;

    const formattedPrice = exchangeRateService.formatPrice(property.priceUsd, currentCurrency);

    // If property is sold or rented, adjust message appropriately
    if (property.availabilityStatus === 'sold' || property.availabilityStatus === 'rented') {
      const soldMsg = `مرحباً، اطلعت على العقار (${property.propertyCode} - ${property.title}) وهو حالياً [${property.availabilityStatus === 'sold' ? 'تم البيع' : 'تم التأجير'}]. أود الاستفسار عن توفر عقارات مشابهة في نفس المنطقة (${property.region} - ${property.governorate}). وشكراً!`;
      return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(soldMsg)}`;
    }

    const defaultMsg = `مرحباً، أود الاستفسار عن العقار المعروض في منصتكم:\n\n*الرمز المرجعي:* ${property.propertyCode}\n*العنوان:* ${property.title}\n*المنطقة:* ${property.region} - ${property.governorate}\n*السعر:* ${formattedPrice}\n*الرابط:* https://realestate-syria.com/properties/${property.slug}\n\nيرجى تزويدي بمزيد من التفاصيل وترتيب موعد معاينة. وشكراً!`;

    const textToEncode = customMsg || defaultMsg;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(textToEncode)}`;
  },
};
