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

export const metadata: Metadata = {
  title: 'li_zagar_tan | Моментальный загар в Вильнюсе',
  description: 'Профессиональный моментальный загар (spray tan) в Вильнюсе. Безопасный, натуральный результат за 30 минут. Эффект 7-10 дней. Запись через Treatwell.',
  keywords: 'spray tan, моментальный загар, purškiamas įdegis, Vilnius, Вильнюс, li_zagar_tan',
  openGraph: {
    title: 'li_zagar_tan | Моментальный загар в Вильнюсе',
    description: 'Профессиональный моментальный загар за 30 минут. Эффект 7-10 дней.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lt">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
