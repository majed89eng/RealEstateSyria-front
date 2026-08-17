import { NextRequest, NextResponse } from 'next/server';
import { propertyService } from '@/services/propertyService';
import { Property, AIQueryResult, AIQueryMatch } from '@/types/property';

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json({ error: 'الرجاء إدخال نص البحث.' }, { status: 400 });
    }

    const cleanQuery = query.trim();
    const apiKey = process.env.GEMINI_API_KEY;
    const isAiEnabled = process.env.AI_ASSISTANT_ENABLED !== 'false';

    // If Gemini API Key is present and AI is enabled, attempt Gemini Structured Intent Extraction
    if (apiKey && isAiEnabled) {
      try {
        const geminiModel = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
        const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${apiKey}`;

        const systemPrompt = `
You are the Real Estate Search Intent Parser for a Syrian real estate platform.
Analyze the user's natural language Syrian Arabic (or standard Arabic / English) search query and extract structured filtering criteria in valid JSON format only.

Extract the following JSON fields (use null if not specified):
{
  "governorate": string or null (e.g. "دمشق", "ريف دمشق", "حلب", "حمص", "حماة"),
  "region": string or null (e.g. "أبو رمانة", "المزة", "قدسيا", "يعفور", "مشروع دمر", "الشهباء", "الإنشاءات"),
  "contractType": "sale" | "rent" | null,
  "propertyType": "apartment" | "villa" | "commercial" | "chalet" | "land" | null,
  "maxPriceUsd": number or null,
  "minPriceUsd": number or null,
  "bedrooms": number or null,
  "hasSolar": boolean or null,
  "hasTaboGreen": boolean or null,
  "hasElevator": boolean or null,
  "hasGarage": boolean or null,
  "intentExplanationAr": string (Brief helpful Arabic sentence explaining the interpreted request)
}

Rules:
1. Return ONLY the JSON object. No Markdown code fences, no extra text.
2. Prices mentioned in Syrian Pounds or Millions/Billions should be approximated in USD if possible (assume 1 USD ≈ 15,000 SYP).
3. "طابو سبز" or "2400 سهم" means hasTaboGreen = true.
4. "طاقة شمسية" means hasSolar = true.
`;

        const geminiRes = await fetch(geminiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: systemPrompt },
                  { text: `User Search Query: "${cleanQuery}"` },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 500,
            },
          }),
        });

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

          if (rawText) {
            const cleanJsonStr = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
            const intent = JSON.parse(cleanJsonStr);

            // Fetch actual properties using structured intent
            const allProperties = await propertyService.getProperties();

            // Match against real properties
            const matches: AIQueryMatch[] = [];

            allProperties.forEach((prop) => {
              let score = 0;
              const reasons: string[] = [];

              if (intent.contractType && prop.contractType === intent.contractType) {
                score += 25;
                reasons.push(intent.contractType === 'sale' ? 'مطابقة رغبة الشراء' : 'مطابقة رغبة الإيجار');
              }

              if (intent.governorate && prop.governorate.includes(intent.governorate)) {
                score += 30;
                reasons.push(`في محافظة ${prop.governorate}`);
              }

              if (intent.region && (prop.region.includes(intent.region) || intent.region.includes(prop.region))) {
                score += 35;
                reasons.push(`في منطقة ${prop.region}`);
              }

              if (intent.propertyType && prop.propertyType === intent.propertyType) {
                score += 20;
                reasons.push(`نوع العقار مطابق`);
              }

              if (intent.hasSolar && prop.hasSolar) {
                score += 15;
                reasons.push('مزود بمنظومة طاقة شمسية');
              }

              if (intent.hasTaboGreen && prop.ownershipType.includes('طابو سبز')) {
                score += 15;
                reasons.push('طابو سبز 2400 سهم');
              }

              if (intent.maxPriceUsd && prop.priceUsd <= intent.maxPriceUsd) {
                score += 15;
                reasons.push('السعر ضمن الميزانية المحددة');
              }

              if (intent.bedrooms && prop.bedrooms >= intent.bedrooms) {
                score += 10;
                reasons.push(`عدد الغرف (${prop.bedrooms}) يلبي المطلوب`);
              }

              if (score > 20) {
                matches.push({
                  property: prop,
                  relevanceScore: Math.min(score, 99),
                  reason: reasons.join(' • '),
                });
              }
            });

            matches.sort((a, b) => b.relevanceScore - a.relevanceScore);

            const result: AIQueryResult = {
              query: cleanQuery,
              summary:
                matches.length > 0
                  ? `بناءً على طلبك (${intent.intentExplanationAr || cleanQuery})، وجدنا ${matches.length} عقارات مطابقة:`
                  : `لم نجد عقارات مطابقة تماماً للمواصفات المطلوبة (${intent.intentExplanationAr || cleanQuery}). جرب توسيع نطاق البحث أو تغيير المنطقة.`,
              matches: matches.slice(0, 4),
            };

            return NextResponse.json(result);
          }
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to local search engine:', geminiError);
      }
    }

    // Fallback: Local Syrian Natural Language Search Engine
    const localResult = await propertyService.searchWithAI(cleanQuery);
    return NextResponse.json(localResult);
  } catch (error) {
    console.error('AI Assistant Endpoint Error:', error);
    return NextResponse.json(
      {
        query: '',
        summary: 'المساعد الذكي غير متاح حالياً. يمكنك استخدام الفلاتر التقليدية للعثور على العقار المناسب.',
        matches: [],
      },
      { status: 200 }
    );
  }
}
