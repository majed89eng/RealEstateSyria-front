import { LocationHierarchy } from '../types/property';

export const SYRIAN_LOCATIONS: LocationHierarchy[] = [
  {
    provinceId: 'damascus',
    provinceNameAr: 'دمشق',
    provinceNameEn: 'Damascus',
    provinceSlug: 'damascus',
    cities: [
      {
        cityId: 'abu-roummaneh',
        cityNameAr: 'أبو رمانة',
        cityNameEn: 'Abu Roummaneh',
        citySlug: 'abu-roummaneh',
        neighborhoods: [
          { neighborhoodId: 'al-jahiz', neighborhoodNameAr: 'محيط حديقة الجاحظ', neighborhoodNameEn: 'Al Jahiz Park', neighborhoodSlug: 'al-jahiz' },
          { neighborhoodId: 'embassies-street', neighborhoodNameAr: 'شارع السفارات', neighborhoodNameEn: 'Embassies Street', neighborhoodSlug: 'embassies-street' }
        ]
      },
      {
        cityId: 'al-malki',
        cityNameAr: 'المالكي',
        cityNameEn: 'Al Malki',
        citySlug: 'al-malki',
        neighborhoods: [
          { neighborhoodId: 'malki-main', neighborhoodNameAr: 'شارع المالكي الرئيسي', neighborhoodNameEn: 'Main Malki', neighborhoodSlug: 'malki-main' },
          { neighborhoodId: 'tamreed-park', neighborhoodNameAr: 'حديقة التمريض', neighborhoodNameEn: 'Tamreed Park', neighborhoodSlug: 'tamreed-park' }
        ]
      },
      {
        cityId: 'mazzeh',
        cityNameAr: 'المزة',
        cityNameEn: 'Al Mazzeh',
        citySlug: 'mazzeh',
        neighborhoods: [
          { neighborhoodId: 'villas-east', neighborhoodNameAr: 'فيلات شرقية', neighborhoodNameEn: 'East Villas', neighborhoodSlug: 'villas-east' },
          { neighborhoodId: 'villas-west', neighborhoodNameAr: 'فيلات غربية', neighborhoodNameEn: 'West Villas', neighborhoodSlug: 'villas-west' },
          { neighborhoodId: 'autostrade', neighborhoodNameAr: 'أوتوستراد المزة', neighborhoodNameEn: 'Mazzeh Autostrade', neighborhoodSlug: 'autostrade' },
          { neighborhoodId: 'basateen', neighborhoodNameAr: 'بساتين المزة (ماروتا سيتي)', neighborhoodNameEn: 'Marota City', neighborhoodSlug: 'basateen' }
        ]
      },
      {
        cityId: 'kafr-souseh',
        cityNameAr: 'كفرسوسة',
        cityNameEn: 'Kafr Souseh',
        citySlug: 'kafr-souseh',
        neighborhoods: [
          { neighborhoodId: 'tanzeem', neighborhoodNameAr: 'تنظيم كفرسوسة', neighborhoodNameEn: 'Tanzeem', neighborhoodSlug: 'tanzeem' },
          { neighborhoodId: 'cham-center', neighborhoodNameAr: 'محيط شام سنتر', neighborhoodNameEn: 'Cham Center', neighborhoodSlug: 'cham-center' }
        ]
      },
      {
        cityId: 'dummar-project',
        cityNameAr: 'مشروع دمر',
        cityNameEn: 'Dummar Project',
        citySlug: 'dummar-project',
        neighborhoods: [
          { neighborhoodId: 'jazeera-1', neighborhoodNameAr: 'الجزيرة 1', neighborhoodNameEn: 'Jazeera 1', neighborhoodSlug: 'jazeera-1' },
          { neighborhoodId: 'jazeera-2', neighborhoodNameAr: 'الجزيرة 2', neighborhoodNameEn: 'Jazeera 2', neighborhoodSlug: 'jazeera-2' },
          { neighborhoodId: 'jazeera-16', neighborhoodNameAr: 'الجزيرة 16', neighborhoodNameEn: 'Jazeera 16', neighborhoodSlug: 'jazeera-16' }
        ]
      },
      {
        cityId: 'shaalan',
        cityNameAr: 'الشعلان',
        cityNameEn: 'Al Shaalan',
        citySlug: 'shaalan',
        neighborhoods: [
          { neighborhoodId: 'seven-fountains', neighborhoodNameAr: 'السبع بحرات', neighborhoodNameEn: 'Seven Fountains', neighborhoodSlug: 'seven-fountains' },
          { neighborhoodId: 'al-taliani', neighborhoodNameAr: 'الطلياني', neighborhoodNameEn: 'Al Taliani', neighborhoodSlug: 'al-taliani' }
        ]
      }
    ]
  },
  {
    provinceId: 'rural-damascus',
    provinceNameAr: 'ريف دمشق',
    provinceNameEn: 'Rural Damascus',
    provinceSlug: 'rural-damascus',
    cities: [
      {
        cityId: 'qudsaya',
        cityNameAr: 'قدسيا',
        cityNameEn: 'Qudsaya',
        citySlug: 'qudsaya',
        neighborhoods: [
          { neighborhoodId: 'qudsaya-balad', neighborhoodNameAr: 'قدسيا البلد', neighborhoodNameEn: 'Qudsaya Balad', neighborhoodSlug: 'qudsaya-balad' },
          { neighborhoodId: 'dahit-qudsaya', neighborhoodNameAr: 'ضاحية قدسيا', neighborhoodNameEn: 'Dahit Qudsaya', neighborhoodSlug: 'dahit-qudsaya' },
          { neighborhoodId: 'jazeera-b', neighborhoodNameAr: 'الجزيرة ب', neighborhoodNameEn: 'Jazeera B', neighborhoodSlug: 'jazeera-b' },
          { neighborhoodId: 'jazeera-d', neighborhoodNameAr: 'الجزيرة د', neighborhoodNameEn: 'Jazeera D', neighborhoodSlug: 'jazeera-d' }
        ]
      },
      {
        cityId: 'yaafour',
        cityNameAr: 'يعفور',
        cityNameEn: 'Yaafour',
        citySlug: 'yaafour',
        neighborhoods: [
          { neighborhoodId: 'yaafour-villas', neighborhoodNameAr: 'منطقة الفيلات والقصور', neighborhoodNameEn: 'Villas Area', neighborhoodSlug: 'yaafour-villas' },
          { neighborhoodId: 'krash', neighborhoodNameAr: 'كراش', neighborhoodNameEn: 'Krash', neighborhoodSlug: 'krash' }
        ]
      },
      {
        cityId: 'sabboura',
        cityNameAr: 'الصبورة',
        cityNameEn: 'Al Sabboura',
        citySlug: 'sabboura',
        neighborhoods: [
          { neighborhoodId: 'sabboura-villas', neighborhoodNameAr: 'مزارع الصبورة', neighborhoodNameEn: 'Sabboura Farms', neighborhoodSlug: 'sabboura-villas' }
        ]
      },
      {
        cityId: 'sehnaya',
        cityNameAr: 'صحنايا',
        cityNameEn: 'Sehnaya',
        citySlug: 'sehnaya',
        neighborhoods: [
          { neighborhoodId: 'new-corniche', neighborhoodNameAr: 'الكورنيش الجديد', neighborhoodNameEn: 'New Corniche', neighborhoodSlug: 'new-corniche' },
          { neighborhoodId: 'ashrafiyat-sehnaya', neighborhoodNameAr: 'أشرفية صحنايا', neighborhoodNameEn: 'Ashrafiyat Sehnaya', neighborhoodSlug: 'ashrafiyat-sehnaya' }
        ]
      },
      {
        cityId: 'jaramana',
        cityNameAr: 'جرمانا',
        cityNameEn: 'Jaramana',
        citySlug: 'jaramana',
        neighborhoods: [
          { neighborhoodId: 'rawda-street', neighborhoodNameAr: 'شارع الروضة', neighborhoodNameEn: 'Rawda Street', neighborhoodSlug: 'rawda-street' },
          { neighborhoodId: 'al-baladya', neighborhoodNameAr: 'ساحة البلدية', neighborhoodNameEn: 'Baladya Square', neighborhoodSlug: 'al-baladya' }
        ]
      }
    ]
  },
  {
    provinceId: 'aleppo',
    provinceNameAr: 'حلب',
    provinceNameEn: 'Aleppo',
    provinceSlug: 'aleppo',
    cities: [
      {
        cityId: 'al-shahbaa',
        cityNameAr: 'الشهباء',
        cityNameEn: 'Al Shahbaa',
        citySlug: 'al-shahbaa',
        neighborhoods: [
          { neighborhoodId: 'shahbaa-old', neighborhoodNameAr: 'الشهباء القديمة', neighborhoodNameEn: 'Old Shahbaa', neighborhoodSlug: 'shahbaa-old' },
          { neighborhoodId: 'shahbaa-new', neighborhoodNameAr: 'الشهباء الجديدة', neighborhoodNameEn: 'New Shahbaa', neighborhoodSlug: 'shahbaa-new' }
        ]
      },
      {
        cityId: 'al-sabeel',
        cityNameAr: 'السبيل',
        cityNameEn: 'Al Sabeel',
        citySlug: 'al-sabeel',
        neighborhoods: [
          { neighborhoodId: 'sabeel-park', neighborhoodNameAr: 'محيط حديقة السبيل', neighborhoodNameEn: 'Sabeel Park', neighborhoodSlug: 'sabeel-park' }
        ]
      },
      {
        cityId: 'al-furqan',
        cityNameAr: 'الفرقان',
        cityNameEn: 'Al Furqan',
        citySlug: 'al-furqan',
        neighborhoods: [
          { neighborhoodId: 'university-neighborhood', neighborhoodNameAr: 'حي الجامعة', neighborhoodNameEn: 'University District', neighborhoodSlug: 'university-neighborhood' }
        ]
      }
    ]
  },
  {
    provinceId: 'homs',
    provinceNameAr: 'حمص',
    provinceNameEn: 'Homs',
    provinceSlug: 'homs',
    cities: [
      {
        cityId: 'inshaat',
        cityNameAr: 'الإنشاءات',
        cityNameEn: 'Al Inshaat',
        citySlug: 'inshaat',
        neighborhoods: [
          { neighborhoodId: 'main-inshaat', neighborhoodNameAr: 'شارع الإنشاءات الرئيسي', neighborhoodNameEn: 'Main Inshaat', neighborhoodSlug: 'main-inshaat' }
        ]
      },
      {
        cityId: 'ghouta-homs',
        cityNameAr: 'الغوطة',
        cityNameEn: 'Al Ghouta',
        citySlug: 'ghouta-homs',
        neighborhoods: [
          { neighborhoodId: 'dablan', neighborhoodNameAr: 'محيط شارع الدبلان', neighborhoodNameEn: 'Dablan Street', neighborhoodSlug: 'dablan' }
        ]
      },
      {
        cityId: 'al-hamra',
        cityNameAr: 'الحمراء',
        cityNameEn: 'Al Hamra',
        citySlug: 'al-hamra',
        neighborhoods: [
          { neighborhoodId: 'hamra-gardens', neighborhoodNameAr: 'بساتين الحمراء', neighborhoodNameEn: 'Hamra Gardens', neighborhoodSlug: 'hamra-gardens' }
        ]
      }
    ]
  },
  {
    provinceId: 'hama',
    provinceNameAr: 'حماة',
    provinceNameEn: 'Hama',
    provinceSlug: 'hama',
    cities: [
      {
        cityId: 'al-shareea',
        cityNameAr: 'الشريعة',
        cityNameEn: 'Al Shareea',
        citySlug: 'al-shareea',
        neighborhoods: [
          { neighborhoodId: 'shareea-main', neighborhoodNameAr: 'حي الشريعة الراقي', neighborhoodNameEn: 'Al Shareea Main', neighborhoodSlug: 'shareea-main' }
        ]
      },
      {
        cityId: 'al-dabbagha',
        cityNameAr: 'الدباغة',
        cityNameEn: 'Al Dabbagha',
        citySlug: 'al-dabbagha',
        neighborhoods: [
          { neighborhoodId: 'nawaeer-park', neighborhoodNameAr: 'محيط النواعير والعاصي', neighborhoodNameEn: 'Nawaeer Park', neighborhoodSlug: 'nawaeer-park' }
        ]
      }
    ]
  },
  {
    provinceId: 'latakia',
    provinceNameAr: 'اللاذقية',
    provinceNameEn: 'Latakia',
    provinceSlug: 'latakia',
    cities: [
      {
        cityId: 'al-ziraa',
        cityNameAr: 'الزراعة',
        cityNameEn: 'Al Ziraa',
        citySlug: 'al-ziraa',
        neighborhoods: [
          { neighborhoodId: 'university-latakia', neighborhoodNameAr: 'محيط جامعة تشرين', neighborhoodNameEn: 'Tishreen University', neighborhoodSlug: 'university-latakia' }
        ]
      },
      {
        cityId: 'al-shatee-al-azraq',
        cityNameAr: 'الشاطئ الأزرق',
        cityNameEn: 'Blue Beach',
        citySlug: 'al-shatee-al-azraq',
        neighborhoods: [
          { neighborhoodId: 'chalets-area', neighborhoodNameAr: 'منطقة الشاليهات والمنتجعات', neighborhoodNameEn: 'Chalets Area', neighborhoodSlug: 'chalets-area' }
        ]
      }
    ]
  },
  {
    provinceId: 'tartus',
    provinceNameAr: 'طرطوس',
    provinceNameEn: 'Tartus',
    provinceSlug: 'tartus',
    cities: [
      {
        cityId: 'tartus-corniche',
        cityNameAr: 'الكورنيش البحري',
        cityNameEn: 'Corniche',
        citySlug: 'tartus-corniche',
        neighborhoods: [
          { neighborhoodId: 'marina', neighborhoodNameAr: 'محيط المارينا والميناء', neighborhoodNameEn: 'Marina', neighborhoodSlug: 'marina' }
        ]
      }
    ]
  }
];
