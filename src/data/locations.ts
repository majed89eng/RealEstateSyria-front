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
      },
      {
        cityId: 'new-aleppo',
        cityNameAr: 'حلب الجديدة',
        cityNameEn: 'New Aleppo',
        citySlug: 'new-aleppo',
        neighborhoods: [
          { neighborhoodId: 'new-aleppo-north', neighborhoodNameAr: 'حلب الجديدة الشمالية', neighborhoodNameEn: 'North New Aleppo', neighborhoodSlug: 'new-aleppo-north' },
          { neighborhoodId: 'new-aleppo-south', neighborhoodNameAr: 'حلب الجديدة الجنوبية', neighborhoodNameEn: 'South New Aleppo', neighborhoodSlug: 'new-aleppo-south' }
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
      },
      {
        cityId: 'al-waer',
        cityNameAr: 'الوعر',
        cityNameEn: 'Al Waer',
        citySlug: 'al-waer',
        neighborhoods: [
          { neighborhoodId: 'new-waer', neighborhoodNameAr: 'الوعر الجديد', neighborhoodNameEn: 'New Waer', neighborhoodSlug: 'new-waer' }
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
      },
      {
        cityId: 'al-hadir',
        cityNameAr: 'الحاضر',
        cityNameEn: 'Al Hadir',
        citySlug: 'al-hadir',
        neighborhoods: [
          { neighborhoodId: 'hadir-center', neighborhoodNameAr: 'مركز الحاضر القديم', neighborhoodNameEn: 'Hadir Center', neighborhoodSlug: 'hadir-center' }
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
      },
      {
        cityId: 'mashrou-al-sabea',
        cityNameAr: 'المشروع السابع',
        cityNameEn: '7th Project',
        citySlug: 'mashrou-al-sabea',
        neighborhoods: [
          { neighborhoodId: 'sabea-villas', neighborhoodNameAr: 'فيلات المشروع السابع', neighborhoodNameEn: '7th Project Villas', neighborhoodSlug: 'sabea-villas' }
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
      },
      {
        cityId: 'safita',
        cityNameAr: 'صافيتا',
        cityNameEn: 'Safita',
        citySlug: 'safita',
        neighborhoods: [
          { neighborhoodId: 'safita-tower', neighborhoodNameAr: 'محيط برج صافيتا', neighborhoodNameEn: 'Safita Tower Area', neighborhoodSlug: 'safita-tower' }
        ]
      },
      {
        cityId: 'baniyas',
        cityNameAr: 'بانياس',
        cityNameEn: 'Baniyas',
        citySlug: 'baniyas',
        neighborhoods: [
          { neighborhoodId: 'baniyas-corniche', neighborhoodNameAr: 'كورنيش بانياس', neighborhoodNameEn: 'Baniyas Corniche', neighborhoodSlug: 'baniyas-corniche' }
        ]
      }
    ]
  },
  {
    provinceId: 'daraa',
    provinceNameAr: 'درعا',
    provinceNameEn: 'Daraa',
    provinceSlug: 'daraa',
    cities: [
      {
        cityId: 'daraa-mahata',
        cityNameAr: 'درعا المحطة',
        cityNameEn: 'Daraa Al-Mahata',
        citySlug: 'daraa-mahata',
        neighborhoods: [
          { neighborhoodId: 'al-shuhada-square', neighborhoodNameAr: 'محيط ساحة الشهداء', neighborhoodNameEn: 'Shuhada Square', neighborhoodSlug: 'al-shuhada-square' },
          { neighborhoodId: 'al-qusoor-daraa', neighborhoodNameAr: 'حي القصور', neighborhoodNameEn: 'Al Qusoor', neighborhoodSlug: 'al-qusoor-daraa' }
        ]
      },
      {
        cityId: 'daraa-balad',
        cityNameAr: 'درعا البلد',
        cityNameEn: 'Daraa Al-Balad',
        citySlug: 'daraa-balad',
        neighborhoods: [
          { neighborhoodId: 'al-manshiya', neighborhoodNameAr: 'حي المنشية', neighborhoodNameEn: 'Al Manshiya', neighborhoodSlug: 'al-manshiya' }
        ]
      },
      {
        cityId: 'izra',
        cityNameAr: 'إزرع',
        cityNameEn: 'Izra',
        citySlug: 'izra',
        neighborhoods: [
          { neighborhoodId: 'izra-center', neighborhoodNameAr: 'وسط إزرع', neighborhoodNameEn: 'Izra Center', neighborhoodSlug: 'izra-center' }
        ]
      },
      {
        cityId: 'sanamein',
        cityNameAr: 'الصنمين',
        cityNameEn: 'Al-Sanamayn',
        citySlug: 'sanamein',
        neighborhoods: [
          { neighborhoodId: 'sanamein-main', neighborhoodNameAr: 'شارع السوق الرئيسي', neighborhoodNameEn: 'Main Souq', neighborhoodSlug: 'sanamein-main' }
        ]
      }
    ]
  },
  {
    provinceId: 'suwayda',
    provinceNameAr: 'السويداء',
    provinceNameEn: 'As-Suwayda',
    provinceSlug: 'suwayda',
    cities: [
      {
        cityId: 'suwayda-city',
        cityNameAr: 'مدينة السويداء',
        cityNameEn: 'Suwayda City',
        citySlug: 'suwayda-city',
        neighborhoods: [
          { neighborhoodId: 'al-mashnaqa', neighborhoodNameAr: 'ساحة المشنقة والمتحف', neighborhoodNameEn: 'Museum Area', neighborhoodSlug: 'al-mashnaqa' },
          { neighborhoodId: 'dahr-al-jabal', neighborhoodNameAr: 'طريق ظهر الجبل (فيلات ومزارع)', neighborhoodNameEn: 'Dahr Al Jabal', neighborhoodSlug: 'dahr-al-jabal' },
          { neighborhoodId: 'al-masaken', neighborhoodNameAr: 'حي المساكن', neighborhoodNameEn: 'Al Masaken', neighborhoodSlug: 'al-masaken' }
        ]
      },
      {
        cityId: 'shahba',
        cityNameAr: 'شهبا',
        cityNameEn: 'Shahba',
        citySlug: 'shahba',
        neighborhoods: [
          { neighborhoodId: 'roman-ruins', neighborhoodNameAr: 'محيط الآثار الرومانية', neighborhoodNameEn: 'Roman Ruins Area', neighborhoodSlug: 'roman-ruins' }
        ]
      },
      {
        cityId: 'salkhad',
        cityNameAr: 'صلخد',
        cityNameEn: 'Salkhad',
        citySlug: 'salkhad',
        neighborhoods: [
          { neighborhoodId: 'castle-salkhad', neighborhoodNameAr: 'محيط قلعة صلخد', neighborhoodNameEn: 'Castle Area', neighborhoodSlug: 'castle-salkhad' }
        ]
      }
    ]
  },
  {
    provinceId: 'quneitra',
    provinceNameAr: 'القنيطرة',
    provinceNameEn: 'Quneitra',
    provinceSlug: 'quneitra',
    cities: [
      {
        cityId: 'madinat-al-baath',
        cityNameAr: 'مدينة البعث',
        cityNameEn: 'Madinat Al-Baath',
        citySlug: 'madinat-al-baath',
        neighborhoods: [
          { neighborhoodId: 'baath-center', neighborhoodNameAr: 'المركز الإداري والخدمي', neighborhoodNameEn: 'Civic Center', neighborhoodSlug: 'baath-center' }
        ]
      },
      {
        cityId: 'khan-arnabeh',
        cityNameAr: 'خان أرنبة',
        cityNameEn: 'Khan Arnabeh',
        citySlug: 'khan-arnabeh',
        neighborhoods: [
          { neighborhoodId: 'main-market', neighborhoodNameAr: 'سوق خان أرنبة', neighborhoodNameEn: 'Main Market', neighborhoodSlug: 'main-market' }
        ]
      }
    ]
  },
  {
    provinceId: 'idlib',
    provinceNameAr: 'إدلب',
    provinceNameEn: 'Idlib',
    provinceSlug: 'idlib',
    cities: [
      {
        cityId: 'idlib-city',
        cityNameAr: 'مدينة إدلب',
        cityNameEn: 'Idlib City',
        citySlug: 'idlib-city',
        neighborhoods: [
          { neighborhoodId: 'al-saaha-idlib', neighborhoodNameAr: 'ساحة الساعة والمركز', neighborhoodNameEn: 'Clock Square', neighborhoodSlug: 'al-saaha-idlib' },
          { neighborhoodId: 'al-thawra-idlib', neighborhoodNameAr: 'شارع الثورة', neighborhoodNameEn: 'Al Thawra', neighborhoodSlug: 'al-thawra-idlib' },
          { neighborhoodId: 'al-dbeit', neighborhoodNameAr: 'حي الضبيط', neighborhoodNameEn: 'Al Dbeit', neighborhoodSlug: 'al-dbeit' }
        ]
      },
      {
        cityId: 'ariha',
        cityNameAr: 'أريحا',
        cityNameEn: 'Ariha',
        citySlug: 'ariha',
        neighborhoods: [
          { neighborhoodId: 'arbaeen-mountain', neighborhoodNameAr: 'سفح جبل الأربعين', neighborhoodNameEn: 'Arbaeen Mountain', neighborhoodSlug: 'arbaeen-mountain' }
        ]
      },
      {
        cityId: 'sarmada',
        cityNameAr: 'سرمدا والدانا',
        cityNameEn: 'Sarmada & Al-Dana',
        citySlug: 'sarmada',
        neighborhoods: [
          { neighborhoodId: 'commercial-crossing', neighborhoodNameAr: 'المنطقة التجارية ومحيط المعبر', neighborhoodNameEn: 'Commercial Area', neighborhoodSlug: 'commercial-crossing' }
        ]
      },
      {
        cityId: 'jisr-al-shughur',
        cityNameAr: 'جسر الشغور',
        cityNameEn: 'Jisr al-Shughur',
        citySlug: 'jisr-al-shughur',
        neighborhoods: [
          { neighborhoodId: 'orontes-bridge', neighborhoodNameAr: 'محيط الجسر الروماني والعاصي', neighborhoodNameEn: 'Orontes Bridge', neighborhoodSlug: 'orontes-bridge' }
        ]
      }
    ]
  },
  {
    provinceId: 'raqqa',
    provinceNameAr: 'الرقة',
    provinceNameEn: 'Ar-Raqqah',
    provinceSlug: 'raqqa',
    cities: [
      {
        cityId: 'raqqa-city',
        cityNameAr: 'مدينة الرقة',
        cityNameEn: 'Raqqa City',
        citySlug: 'raqqa-city',
        neighborhoods: [
          { neighborhoodId: 'al-thawra-raqqa', neighborhoodNameAr: 'شارع 23 شباط والوادي', neighborhoodNameEn: 'Al Wadi Street', neighborhoodSlug: 'al-thawra-raqqa' },
          { neighborhoodId: 'al-fardous', neighborhoodNameAr: 'حي الفردوس والحديقة البيضاء', neighborhoodNameEn: 'Al Fardous', neighborhoodSlug: 'al-fardous' }
        ]
      },
      {
        cityId: 'al-thawrah-tabqa',
        cityNameAr: 'الطبقة (الثورة)',
        cityNameEn: 'Al-Thawrah (Tabqa)',
        citySlug: 'al-thawrah-tabqa',
        neighborhoods: [
          { neighborhoodId: 'euphrates-dam', neighborhoodNameAr: 'محيط بحيرة الأسد وسد الفرات', neighborhoodNameEn: 'Euphrates Lake Area', neighborhoodSlug: 'euphrates-dam' }
        ]
      },
      {
        cityId: 'tal-abyad',
        cityNameAr: 'تل أبيض',
        cityNameEn: 'Tal Abyad',
        citySlug: 'tal-abyad',
        neighborhoods: [
          { neighborhoodId: 'border-souq', neighborhoodNameAr: 'السوق المركزي', neighborhoodNameEn: 'Central Souq', neighborhoodSlug: 'border-souq' }
        ]
      }
    ]
  },
  {
    provinceId: 'deir-ez-zor',
    provinceNameAr: 'دير الزور',
    provinceNameEn: 'Deir ez-Zor',
    provinceSlug: 'deir-ez-zor',
    cities: [
      {
        cityId: 'deir-ez-zor-city',
        cityNameAr: 'مدينة دير الزور',
        cityNameEn: 'Deir ez-Zor City',
        citySlug: 'deir-ez-zor-city',
        neighborhoods: [
          { neighborhoodId: 'al-qusoor-deir', neighborhoodNameAr: 'حي القصور', neighborhoodNameEn: 'Al Qusoor', neighborhoodSlug: 'al-qusoor-deir' },
          { neighborhoodId: 'al-joura', neighborhoodNameAr: 'حي الجورة', neighborhoodNameEn: 'Al Joura', neighborhoodSlug: 'al-joura' },
          { neighborhoodId: 'hanging-bridge', neighborhoodNameAr: 'محيط الجسر المعلق والكورنيش', neighborhoodNameEn: 'Hanging Bridge Area', neighborhoodSlug: 'hanging-bridge' }
        ]
      },
      {
        cityId: 'al-mayadin',
        cityNameAr: 'الميادين',
        cityNameEn: 'Al-Mayadin',
        citySlug: 'al-mayadin',
        neighborhoods: [
          { neighborhoodId: 'rahba-castle', neighborhoodNameAr: 'محيط قلعة الرحبة', neighborhoodNameEn: 'Rahba Area', neighborhoodSlug: 'rahba-castle' }
        ]
      },
      {
        cityId: 'al-bukamal',
        cityNameAr: 'البوكمال',
        cityNameEn: 'Al-Bukamal',
        citySlug: 'al-bukamal',
        neighborhoods: [
          { neighborhoodId: 'border-market', neighborhoodNameAr: 'المنطقة التجارية الحدودية', neighborhoodNameEn: 'Commercial Area', neighborhoodSlug: 'border-market' }
        ]
      }
    ]
  },
  {
    provinceId: 'hasakah',
    provinceNameAr: 'الحسكة',
    provinceNameEn: 'Al-Hasakah',
    provinceSlug: 'hasakah',
    cities: [
      {
        cityId: 'qamishli',
        cityNameAr: 'القامشلي',
        cityNameEn: 'Qamishli',
        citySlug: 'qamishli',
        neighborhoods: [
          { neighborhoodId: 'al-siyahi', neighborhoodNameAr: 'الحي السياحي', neighborhoodNameEn: 'Siyahi District', neighborhoodSlug: 'al-siyahi' },
          { neighborhoodId: 'al-gharbi', neighborhoodNameAr: 'الحي الغربي', neighborhoodNameEn: 'West District', neighborhoodSlug: 'al-gharbi' },
          { neighborhoodId: 'al-wusta', neighborhoodNameAr: 'حي الوسطى', neighborhoodNameEn: 'Al Wusta', neighborhoodSlug: 'al-wusta' }
        ]
      },
      {
        cityId: 'hasakah-city',
        cityNameAr: 'مدينة الحسكة',
        cityNameEn: 'Hasakah City',
        citySlug: 'hasakah-city',
        neighborhoods: [
          { neighborhoodId: 'al-mufti', neighborhoodNameAr: 'حي المفتي', neighborhoodNameEn: 'Al Mufti', neighborhoodSlug: 'al-mufti' },
          { neighborhoodId: 'al-aziziya-hasakah', neighborhoodNameAr: 'حي العزيزية', neighborhoodNameEn: 'Al Aziziya', neighborhoodSlug: 'al-aziziya-hasakah' },
          { neighborhoodId: 'khabour-river', neighborhoodNameAr: 'محيط نهر الخابور', neighborhoodNameEn: 'Khabour River Area', neighborhoodSlug: 'khabour-river' }
        ]
      },
      {
        cityId: 'amuda',
        cityNameAr: 'عامودا',
        cityNameEn: 'Amuda',
        citySlug: 'amuda',
        neighborhoods: [
          { neighborhoodId: 'amuda-center', neighborhoodNameAr: 'مركز مدينة عامودا', neighborhoodNameEn: 'Amuda Center', neighborhoodSlug: 'amuda-center' }
        ]
      },
      {
        cityId: 'al-malikiyah',
        cityNameAr: 'المالكية (ديريك)',
        cityNameEn: 'Al-Malikiyah',
        citySlug: 'al-malikiyah',
        neighborhoods: [
          { neighborhoodId: 'malikiyah-market', neighborhoodNameAr: 'السوق التجاري', neighborhoodNameEn: 'Commercial Market', neighborhoodSlug: 'malikiyah-market' }
        ]
      }
    ]
  }
];
