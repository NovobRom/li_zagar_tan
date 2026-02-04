import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from './context/LanguageContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

import { cookies } from 'next/headers';

const metadataByLanguage = {
  lt: {
    title: 'li_zagar_tan | Purškiamas įdegis Vilniuje',
    description: 'Profesionalus purškiamas įdegis (spray tan) Vilniuje. Saugus, natūralus rezultatas per 30 minučių. Efektas išlieka 7-10 dienų. Registracija per Treatwell.',
    keywords: 'purškiamas įdegis, spray tan, Vilnius, li_zagar_tan',
    openGraph: {
      title: 'li_zagar_tan | Purškiamas įdegis Vilniuje',
      description: 'Profesionalus purškiamas įdegis per 30 minučių. Efektas išlieka 7-10 dienų.',
      type: 'website',
    },
  },
  ru: {
    title: 'li_zagar_tan | Моментальный загар в Вильнюсе',
    description: 'Профессиональный моментальный загар (spray tan) в Вильнюсе. Безопасный, натуральный результат за 30 минут. Эффект 7-10 дней. Запись через Treatwell.',
    keywords: 'spray tan, моментальный загар, purškiamas įdegis, Vilnius, Вильнюс, li_zagar_tan',
    openGraph: {
      title: 'li_zagar_tan | Моментальный загар в Вильнюсе',
      description: 'Профессиональный моментальный загар за 30 минут. Эффект 7-10 дней.',
      type: 'website',
    },
  },
  en: {
    title: 'li_zagar_tan | Spray Tan in Vilnius',
    description: 'Professional spray tan in Vilnius. Safe, natural result in 30 minutes. Effect lasts 7-10 days. Book via Treatwell.',
    keywords: 'spray tan, Vilnius, li_zagar_tan, tanning',
    openGraph: {
      title: 'li_zagar_tan | Spray Tan in Vilnius',
      description: 'Professional spray tan in 30 minutes. Effect lasts 7-10 days.',
      type: 'website',
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('language')?.value || 'lt') as keyof typeof metadataByLanguage;
  return metadataByLanguage[lang] || metadataByLanguage['lt'];
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = cookieStore.get('language')?.value || 'lt';

  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider defaultLanguage={lang as any}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
