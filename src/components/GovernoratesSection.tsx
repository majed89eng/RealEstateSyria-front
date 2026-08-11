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
      name: 'مشروع دمر وضاحية قدسيا',
      gov: 'دمشق' as Governorate,
      regionName: 'مشروع دمر',
      tagline: 'إطلالات جبلية وهواء نقي وخدمات هادئة',
      img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
      count: '18+ عقار',
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
  ];

  return (
    <section id="governorates" className="py-16 bg-slate-100 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              <MapPin className="w-4 h-4" />
              <span>التغطية الجغرافية</span>
            </div>
            <h2 className="text-3xl font-extrabold font-alexandria text-slate-900">
              استكشف العقارات حسب المناطق السكنية
            </h2>
            <p className="text-sm text-slate-600">
              تصفية سريعة للعقارات المتاحة في أكثر الأحياء طلباً في دمشق وريف دمشق
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm">
            <Globe className="w-4 h-4 text-emerald-600" />
            <span>قريباً: التوسع لجميع المحافظات (حلب، حمص، اللاذقية، طرطوس)</span>
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
