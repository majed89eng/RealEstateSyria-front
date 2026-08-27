import type { Metadata } from 'next';
import './globals.css';
import { CurrencyProvider } from '../context/CurrencyContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import { AuthProvider } from '../context/AuthContext';

export const metadata: Metadata = {
  title: 'عقارات سوريا | المنصة العقارية الأولى في دمشق وريفها وسائر المحافظات',
  description:
    'منصة عرض وتصفح عقارات سورية متميزة في دمشق وريف دمشق وحلب وحمص وحماة. شقق، فيلات، مزارع ومكاتب تجارية للبيع وللإيجار مع تسعير دقيق بالدولار والليرة والتواصل المباشر عبر واتساب.',
  keywords: [
    'عقارات سوريا',
    'عقارات دمشق',
    'شقق للبيع دمشق',
    'عقارات ريف دمشق',
    'عقارات أبو رمانة',
    'عقارات المزة',
    'عقارات يعفور',
    'عقارات ضاحية قدسيا',
    'عقارات حلب',
    'عقارات حمص',
  ],
  metadataBase: new URL('https://realestate-syria.com'),
  openGraph: {
    title: 'عقارات سوريا | المنصة العقارية الأولى في دمشق وريفها',
    description: 'تصفح أرقى الشقق، الفيلات، والمكاتب التجارية بأسعار دقيقة ومواصفات حقيقية في سوريا.',
    type: 'website',
    locale: 'ar_SY',
    siteName: 'عقارات سوريا',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-slate-950 text-slate-100 font-cairo antialiased selection:bg-emerald-500 selection:text-white">
        <AuthProvider>
          <CurrencyProvider>
            <FavoritesProvider>{children}</FavoritesProvider>
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
