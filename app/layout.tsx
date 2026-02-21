import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from './context/LanguageContext';
import StructuredData from './components/StructuredData';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';

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
    twitter: {
      card: 'summary_large_image',
      title: 'li_zagar_tan | Purškiamas įdegis Vilniuje',
      description: 'Profesionalus purškiamas įdegis (spray tan) Vilniuje. Saugus, natūralus rezultatas per 30 minučių.',
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
    twitter: {
      card: 'summary_large_image',
      title: 'li_zagar_tan | Моментальный загар в Вильнюсе',
      description: 'Профессиональный моментальный загар (spray tan) в Вильнюсе. Безопасный, натуральный результат за 30 минут.',
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
    twitter: {
      card: 'summary_large_image',
      title: 'li_zagar_tan | Spray Tan in Vilnius',
      description: 'Professional spray tan in Vilnius. Safe, natural result in 30 minutes.',
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('language')?.value || 'lt') as keyof typeof metadataByLanguage;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://li-zagar-tan.vercel.app';

  const metadata = metadataByLanguage[lang] || metadataByLanguage['lt'];

  return {
    ...metadata,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: '/',
      languages: {
        'lt-LT': '/?lang=lt',
        'ru-RU': '/?lang=ru',
        'en-US': '/?lang=en',
      },
    },
  };
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
      <head>
        <StructuredData />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider defaultLanguage={lang as any}>{children}</LanguageProvider>

        {/* Google Analytics - Replace with actual Measurement ID */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}

        {/* Meta Pixel - Replace with actual Pixel ID */}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
