import React from 'react';
import { MapPin, ChevronLeft, Globe } from 'lucide-react';
import { Governorate } from '../types/property';

interface GovernoratesSectionProps {
  onSelectGovernorateAndRegion: (gov: Governorate, region: string) => void;
}

export const GovernoratesSection: React.FC<GovernoratesSectionProps> = ({
  onSelectGovernorateAndRegion,
}) => {
  const regionsList = [
    {
      name: 'أبو رمانة والمالكي',
      gov: 'دمشق' as Governorate,
      regionName: 'أبو رمانة',
      tagline: 'الأحياء الأرستقراطية والسفارات',
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
      count: '15+ عقار',
    },
    {
      name: 'فيلات المزة وكفرسوسة',
      gov: 'دمشق' as Governorate,
      regionName: 'المزة',
      tagline: 'أبراج حديثة ومناطق تجارية وسكنية',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      count: '24+ عقار',
    },
    {
      name: 'الشهباء والعزيزية (حلب)',
      gov: 'حلب' as Governorate,
      regionName: 'الشهباء',
      tagline: 'أحياء حلب الفاخرة والمناطق التجارية',
      img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
      count: '18+ عقار',
    },
    {
      name: 'الإنشاءات والدبلان (حمص)',
      gov: 'حمص' as Governorate,
      regionName: 'الإنشاءات',
      tagline: 'قلب حمص التجاري والأحياء الراقية',
      img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
      count: '14+ عقار',
    },
    {
      name: 'الشاطئ الأزرق والكورنيش (اللاذقية)',
      gov: 'اللاذقية' as Governorate,
      regionName: 'الشاطئ الأزرق',
      tagline: 'شاليهات وإطلالات بحرية ساحرة',
      img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      count: '16+ عقار وشاليه',
    },
    {
      name: 'الكورنيش البحري والفروسية (طرطوس)',
      gov: 'طرطوس' as Governorate,
      regionName: 'الكورنيش البحري',
      tagline: 'شقق وشاليهات بحرية ممتازة',
      img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80',
      count: '12+ عقار',
    },
    {
      name: 'يعفور والصبورة (ريف دمشق)',
      gov: 'ريف دمشق' as Governorate,
      regionName: 'يعفور',
      tagline: 'أرقى المزارع والفيلات والمستقلات',
      img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80',
      count: '12+ مزرعة وفيلا',
    },
    {
      name: 'قدسيا وجرمانا وصحنايا',
      gov: 'ريف دمشق' as Governorate,
      regionName: 'جرمانا',
      tagline: 'عقارات اقتصادية وحيوية قرب العاصمة',
      img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80',
      count: '30+ عقار',
    },
    {
      name: 'الحاضر والشريعة (حماة)',
      gov: 'حماة' as Governorate,
      regionName: 'الشريعة',
      tagline: 'أحياء حماة الهادئة والقريبة من العاصي',
      img: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80',
      count: '10+ عقار',
    },
  ];

  return (
    <section id="governorates" className="py-16 bg-slate-100 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              <MapPin className="w-4 h-4" />
              <span>التغطية الجغرافية الوطنية</span>
            </div>
            <h2 className="text-3xl font-extrabold font-alexandria text-slate-900">
              استكشف العقارات حسب المناطق والمحافظات
            </h2>
            <p className="text-sm text-slate-600">
              تصفية سريعة للعقارات المتاحة في أكثر الأحياء والمناطق طلباً في سوريا (14 محافظة)
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm">
            <Globe className="w-4 h-4 text-emerald-600" />
            <span>تغطية شاملة لجميع المحافظات الـ 14</span>
          </div>
        </div>

        {/* Region Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regionsList.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onSelectGovernorateAndRegion(item.gov, item.regionName)}
              className="group relative rounded-3xl overflow-hidden h-64 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-600/90 text-xs font-bold backdrop-blur-md">
                    {item.gov}
                  </span>
                  <span className="text-xs font-medium text-slate-300 bg-black/40 px-2.5 py-1 rounded-lg backdrop-blur-md">
                    {item.count}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-alexandria group-hover:text-emerald-300 transition-colors flex items-center justify-between">
                    <span>{item.name}</span>
                    <ChevronLeft className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-xs text-slate-300 font-light">
                    {item.tagline}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
