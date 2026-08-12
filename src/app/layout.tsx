import type { Metadata } from 'next';
import { Cairo, Alexandria } from 'next/font/google';
import './globals.css';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
});

const alexandria = Alexandria({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-alexandria',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'عقارات سوريا | المنصة العقارية الأولى في دمشق وريفها',
  description: 'منصة عرض وتصفح عقارات سورية متميزة في دمشق وريف دمشق. شقق، فيلات، مزارع ومكاتب تجارية للبيع وللإيجار مع تواصل مباشر عبر واتساب.',
  keywords: ['عقارات دمشق', 'شقق للبيع دمشق', 'عقارات ريف دمشق', 'عقارات أبو رمانة', 'عقارات المزة', 'عقارات المالكي', 'عقارات مشروع دمر', 'عقارات سوريا'],
  openGraph: {
    title: 'عقارات سوريا | المنصة العقارية الأولى في دمشق وريفها',
    description: 'تصفح أرقى الشقق، الفيلات، والمكاتب التجارية بأسعار دقيقة ومواصفات حقيقية في سوريا.',
    type: 'website',
    locale: 'ar_SY',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${alexandria.variable}`}>
      <body className="bg-slate-50 text-slate-900 font-cairo antialiased selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
