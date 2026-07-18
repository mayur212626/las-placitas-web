import type { Metadata } from 'next';
import { Anton, Space_Grotesk } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollProgress from '@/components/ScrollProgress';
import Cursor from '@/components/Cursor';
import SparkTrail from '@/components/SparkTrail';
import SoundToggle from '@/components/SoundToggle';
import BackToTop from '@/components/BackToTop';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OrderModal from '@/components/OrderModal';
import { CartProvider } from '@/components/cart/CartProvider';
import CartDrawer from '@/components/cart/CartDrawer';
import { LanguageProvider } from '@/components/i18n/LanguageProvider';
import { FavoritesProvider } from '@/components/FavoritesProvider';
import { ToastProvider } from '@/components/ToastProvider';
import CommandPalette from '@/components/CommandPalette';
import Assistant from '@/components/Assistant';
import CookieBanner from '@/components/CookieBanner';
import TrackChipMount from '@/components/TrackChipMount';
import StructuredData from '@/components/StructuredData';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import { Analytics } from '@vercel/analytics/react';

const display = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const body = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const SITE_DESC =
  'Volcanic flavor. Authentic Mexican & Salvadoran food, born of fire and tradition since 1990. Two DC locations. Pupusas, fajitas, mariscos, homemade margaritas.';

export const metadata: Metadata = {
  metadataBase: new URL('https://las-placitas-web.vercel.app'),
  title: {
    default: 'LAS PLACITAS — Fire-Born Mexican & Salvadoran · Washington, DC',
    template: '%s · Las Placitas',
  },
  description: SITE_DESC,
  keywords: [
    'Las Placitas',
    'Mexican restaurant Washington DC',
    'Salvadoran food DC',
    'pupusas',
    'Capitol Hill restaurant',
    'fajitas',
    'mariscos',
    'margaritas',
  ],
  openGraph: {
    title: 'Las Placitas — Fire-Born Mexican & Salvadoran',
    description: SITE_DESC,
    type: 'website',
    locale: 'en_US',
    siteName: 'Las Placitas',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Las Placitas — Fire-Born Mexican & Salvadoran',
    description: SITE_DESC,
  },
};

export const viewport = {
  themeColor: '#0a0807',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
    >
      <body className="grain">
        <StructuredData />
        <ServiceWorkerRegister />
        <LanguageProvider>
          <Preloader />
          <SmoothScroll />
          <ScrollProgress />
          <Cursor />
          <SparkTrail />
          <SoundToggle />
          <BackToTop />
          <ToastProvider>
            <FavoritesProvider>
              <CartProvider>
                <OrderModal />
                <Navbar />
                <CartDrawer />
                <CommandPalette />
                <Assistant />
                <TrackChipMount />
                <CookieBanner />
                <a href="#content" className="skip-link">
                  Skip to content
                </a>
                <div id="content">{children}</div>
                <Footer />
              </CartProvider>
            </FavoritesProvider>
          </ToastProvider>
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
