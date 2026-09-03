import React from 'react';
import { MapPin, ChevronLeft, Globe, Sparkles } from 'lucide-react';
import { Governorate } from '../types/property';
import { Tilt3DCard } from './ui/Tilt3DCard';

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
      name: 'الحاضر والشريعة (حماة)',
      gov: 'حماة' as Governorate,
      regionName: 'الشريعة',
      tagline: 'أحياء حماة الهادئة والقريبة من العاصي',
      img: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80',
      count: '10+ عقار',
    },
  ];

  return (
    <section id="governorates" className="py-20 bg-slate-950 text-white relative border-y border-slate-800/80 overflow-hidden bg-grid-pattern">
      {/* Ambient Radial Vignette */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-bold border border-emerald-500/30 backdrop-blur-md shadow-lg">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>التغطية والمواقع الجغرافية</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-alexandria text-gradient-silver">
              استكشف العقارات حسب المناطق والمحافظات
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              تصفية واستكشاف فوري للعقارات في (دمشق، ريف دمشق، حلب، حمص، حماة)
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-900/90 px-4 py-2.5 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>تغطية المحافظات الخمس الرئيسية</span>
          </div>
        </div>

        {/* Region Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {regionsList.map((item, idx) => (
            <Tilt3DCard
              key={idx}
              maxTilt={7}
              scale={1.02}
              glare={true}
              glareOpacity={0.12}
              className="h-64 cursor-pointer"
              onClick={() => onSelectGovernorateAndRegion(item.gov, item.regionName)}
            >
              <div className="group relative rounded-3xl overflow-hidden h-full shadow-3d-card hover:shadow-3d-card-hover border border-slate-800/90 hover:border-emerald-500/50 transition-all duration-300 ring-1 ring-white/10 preserve-3d">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between text-white preserve-3d">
                  <div className="flex items-center justify-between translate-z-md">
                    <span className="px-3 py-1 rounded-full bg-emerald-600/90 text-xs font-bold backdrop-blur-md shadow-md">
                      {item.gov}
                    </span>
                    <span className="text-xs font-medium text-slate-200 bg-slate-950/70 border border-white/10 px-2.5 py-1 rounded-xl backdrop-blur-md shadow-sm">
                      {item.count}
                    </span>
                  </div>

                  <div className="space-y-1 translate-z-lg">
                    <h3 className="text-lg sm:text-xl font-bold font-alexandria text-white group-hover:text-emerald-300 transition-colors flex items-center justify-between">
                      <span>{item.name}</span>
                      <ChevronLeft className="w-5 h-5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:-translate-x-1" />
                    </h3>
                    <p className="text-xs text-slate-300 font-normal line-clamp-1">
                      {item.tagline}
                    </p>
                  </div>
                </div>
              </div>
            </Tilt3DCard>
          ))}
        </div>

      </div>
    </section>
  );
};
