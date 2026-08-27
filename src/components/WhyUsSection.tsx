import React from 'react';
import { ShieldCheck, Sun, MessageCircle, Clock, Award, Sparkles } from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'توثيق الملكية وسندات التمليك',
      desc: 'جميع العقارات المعروضة مفحوصة ومبينة نوع الملكية (طابو سبز 2400 سهم، حكم محكمة، مرسوم 66، سجل عقاري) بشفافية تامة.',
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400',
    },
    {
      icon: Sun,
      title: 'تدقيق منظومات الطاقة والخدمات',
      desc: 'تدقيق فني لتوفر منظومات الطاقة الشمسية، المولدات الكهربائية، والمصاعد الذكية لضمان جودة واستقرار السكن.',
      color: 'from-amber-500/20 to-yellow-500/10 text-amber-400',
    },
    {
      icon: MessageCircle,
      title: 'تواصل مباشر وسريع عبر واتساب',
      desc: 'ربط مباشر مع إدارة المنصة وأصحاب العقارات بروابط مجهزة تحتوي على رمز العقار والسعر لتسهيل المعاينة الفورية.',
      color: 'from-emerald-500/20 to-green-500/10 text-emerald-400',
    },
    {
      icon: Clock,
      title: 'تحديثات أسعار دقيقة ومستمرة',
      desc: 'قوائم عقارية متجددة لحظياً تعكس واقع السوق العقاري بالدولار والليرة السورية لحمايتك من الأسعار المبالغ فيها.',
      color: 'from-sky-500/20 to-blue-500/10 text-sky-400',
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-slate-950 text-white border-t border-slate-800/80 relative overflow-hidden bg-grid-pattern">
      {/* Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-bold border border-emerald-500/30 backdrop-blur-md shimmer-badge-wrapper">
            <Award className="w-4 h-4 text-amber-400" />
            <span>مزايـا وثقـة المنصـة</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black font-alexandria text-gradient-silver">
            لماذا يفضل الباحثون والمغتربون منصتنا؟
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
            صممنا الكتالوج العقاري ليكون الأسهل والأسرع والأكثر موثوقية للتصفح المباشر في دمشق وريفها وسائر المحافظات.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 sm:p-7 rounded-3xl space-y-4 group glass-card-hover"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg border border-white/10`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold font-alexandria text-white group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
