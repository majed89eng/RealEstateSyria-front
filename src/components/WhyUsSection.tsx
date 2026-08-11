import React from 'react';
import { ShieldCheck, Sun, MessageCircle, Clock, Award } from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'توثيق الملكية السورية',
      desc: 'جميع العقارات المعروضة مفحوصة ومبينة نوع الملكية (طابو سبز 2400 سهم، حكم محكمة، سجل عقاري) بوضوح تام.',
    },
    {
      icon: Sun,
      title: 'توضيح منظومات الطاقة والخدمات',
      desc: 'تدقيق وجود منظومات الطاقة الشمسية، المولدات الكهربائية، والمصاعد الشغالة لضمان راحة السكن.',
    },
    {
      icon: MessageCircle,
      title: 'تواصل مباشر عبر واتساب',
      desc: 'ربط مباشر مع المسؤولين بروابط مجهزة تحتوي على رمز العقار والسعر دون الحاجة لتسجيل حسابات.',
    },
    {
      icon: Clock,
      title: 'تحديثات سوقية مستمرة',
      desc: 'قوائم عقارية متجددة يومياً تعكس واقع السوق العقاري السوري بكل شفافية.',
    },
  ];

  return (
    <section id="why-us" className="py-16 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <Award className="w-4 h-4" />
            <span>مزايـا المنصـة</span>
          </div>
          <h2 className="text-3xl font-extrabold font-alexandria">
            لماذا يفضل الزوار البحث عبر منصتنا؟
          </h2>
          <p className="text-sm text-slate-600">
            صممنا الكتالوج العقاري ليكون الأسهل والأسرع للتصفح المباشر في دمشق وريفها
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-emerald-500/40 hover:shadow-lg transition-all duration-300 space-y-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-alexandria text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
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
