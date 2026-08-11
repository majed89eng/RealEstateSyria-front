import { FilterOptions, Property, Governorate, AIQueryResult, AIQueryMatch } from '../types/property';
import mockPropertiesData from '../data/properties.json';

const ALL_PROPERTIES: Property[] = mockPropertiesData as Property[];

/**
 * Property Service Layer - Simulating REST API calls.
 * Can be easily swapped with Axios or native fetch calls to a real backend.
 */
export const propertyService = {
  /**
   * Fetch properties with dynamic filtering and sorting.
   */
  async getProperties(filters?: Partial<FilterOptions>): Promise<Property[]> {
    // Simulate API network latency (e.g. 200ms)
    await new Promise((resolve) => setTimeout(resolve, 200));

    let result = [...ALL_PROPERTIES];

    if (!filters) return result;

    // Search query filter (matches title, location, region, description, features)
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.region.toLowerCase().includes(q) ||
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

    // Region filter
    if (filters.region && filters.region !== 'الكل' && filters.region !== '') {
      result = result.filter((p) => p.region === filters.region);
    }

    // Min / Max Price filter
    if (filters.minPrice !== undefined && filters.minPrice > 0) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
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

    // Feature toggles
    if (filters.hasSolar) {
      result = result.filter((p) => p.features.some((f) => f.includes('طاقة شمسية')));
    }
    if (filters.hasTaboGreen) {
      result = result.filter((p) => p.ownershipType.includes('طابو سبز') || p.features.some(f => f.includes('طابو سبز')));
    }
    if (filters.hasElevator) {
      result = result.filter((p) => p.floor.includes('مصعد') || p.features.some(f => f.includes('مصعد')));
    }

    // Sorting
    switch (filters.sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'area_desc':
        result.sort((a, b) => b.area - a.area);
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
    await new Promise((resolve) => setTimeout(resolve, 150));
    const property = ALL_PROPERTIES.find((p) => p.id === id);
    return property || null;
  },

  /**
   * Get unique regions list based on governorate
   */
  getRegions(governorate?: Governorate): string[] {
    let props = ALL_PROPERTIES;
    if (governorate && governorate !== 'الكل') {
      props = props.filter((p) => p.governorate === governorate);
    }
    const regions = Array.from(new Set(props.map((p) => p.region)));
    return regions;
  },

  /**
   * AI-powered Search Assistant.
   * Parses Syrian natural language search queries against Mock Data.
   */
  async searchWithAI(userQuery: string): Promise<AIQueryResult> {
    await new Promise((resolve) => setTimeout(resolve, 600)); // AI thinking delay effect

    const queryLower = userQuery.toLowerCase();
    const matches: AIQueryMatch[] = [];

    ALL_PROPERTIES.forEach((prop) => {
      let score = 0;
      const reasons: string[] = [];

      // Check Contract Type keywords
      if ((queryLower.includes('بيع') || queryLower.includes('شراء')) && prop.contractType === 'sale') {
        score += 25;
        reasons.push('مطابقة مع رغبة الشراء/البيع');
      }
      if ((queryLower.includes('إيجار') || queryLower.includes('اجار') || queryLower.includes('للاجار')) && prop.contractType === 'rent') {
        score += 25;
        reasons.push('مطابقة مع رغبة الإيجار');
      }

      // Check Region keywords
      if (queryLower.includes(prop.region.toLowerCase())) {
        score += 35;
        reasons.push(`العقار في منطقة ${prop.region} المطلوبة`);
      }

      // Check Property Type keywords
      if (queryLower.includes('شقة') && prop.propertyType === 'apartment') {
        score += 20;
        reasons.push('نوع العقار: شقة سكنية');
      }
      if ((queryLower.includes('فيلا') || queryLower.includes('مزرعة')) && (prop.propertyType === 'villa' || prop.propertyType === 'chalet')) {
        score += 20;
        reasons.push('نوع العقار: فيلا / مزرعة');
      }
      if ((queryLower.includes('مكتب') || queryLower.includes('محل') || queryLower.includes('تجاري')) && prop.propertyType === 'commercial') {
        score += 20;
        reasons.push('نوع العقار: تجاري / مكتب');
      }

      // Feature matching
      if ((queryLower.includes('طاقة') || queryLower.includes('شمسية')) && prop.features.some(f => f.includes('طاقة شمسية'))) {
        score += 15;
        reasons.push('يتوفر نظام طاقة شمسية');
      }
      if ((queryLower.includes('طابو') || queryLower.includes('سبز') || queryLower.includes('2400')) && (prop.ownershipType.includes('طابو سبز') || prop.features.some(f => f.includes('طابو سبز')))) {
        score += 15;
        reasons.push('الملكية طابو سبز (2400 سهم)');
      }
      if ((queryLower.includes('مصعد') || queryLower.includes('أسانسير')) && prop.floor.includes('مصعد')) {
        score += 10;
        reasons.push('يوجد مصعد بالمبنى');
      }
      if (queryLower.includes('مسبح') && prop.features.some(f => f.includes('مسبح'))) {
        score += 20;
        reasons.push('يتوفر مسبح خاص');
      }
      if (queryLower.includes('حديقة') && (prop.description.includes('حديقة') || prop.features.some(f => f.includes('حديقة')))) {
        score += 15;
        reasons.push('توجد حديقة خاصة');
      }

      // Price keywords check (رخيص، مناسب، فخم، ديلوكس)
      if (queryLower.includes('رخيص') || queryLower.includes('اقتصادي') || queryLower.includes('مناسب')) {
        if (prop.price < 3000000000) {
          score += 15;
          reasons.push('السعر اقتصادي ومناسب');
        }
      }
      if (queryLower.includes('فخم') || queryLower.includes('ديلوكس') || queryLower.includes('فارهة')) {
        if (prop.price >= 5000000000 || prop.features.some(f => f.includes('ديلوكس'))) {
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

    // Sort by relevance score
    matches.sort((a, b) => b.relevanceScore - a.relevanceScore);

    return {
      query: userQuery,
      summary: matches.length > 0
        ? `بناءً على طلبك ("${userQuery}")، عثر المساعد الذكي على ${matches.length} عقارات مطابقة لمتطلباتك:`
        : `لم نجد نتائج مطابقة تماماً لطلبك ("${userQuery}"). جرب تحديد المنطقة أو نوع العقار بشكل أعم.`,
      matches: matches.slice(0, 4), // Return top 4 recommendations
    };
  },

  /**
   * Generates WhatsApp Click-to-Chat direct URL formatted in Arabic for Syrian Lead Generation.
   */
  generateWhatsAppUrl(property: Property, customMsg?: string): string {
    const rawPhone = property.whatsappNumber.replace(/[^0-9+]/g, '');
    const cleanPhone = rawPhone.startsWith('+') ? rawPhone.substring(1) : rawPhone;

    const defaultMsg = `مرحباً، أود الاستفسار عن العقار المعروض في منصتكم:\n\n*الرمز المرجعي:* ${property.id}\n*العنوان:* ${property.title}\n*المنطقة:* ${property.region} - ${property.governorate}\n*السعر:* ${property.formattedPrice}\n\nيرجى تزويدي بمزيد من التفاصيل والاطلاع على العقار. وشكراً!`;

    const textToEncode = customMsg || defaultMsg;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(textToEncode)}`;
  }
};
