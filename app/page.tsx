import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import GallerySection from './components/GallerySection';
import PricingSection from './components/PricingSection';
import ReviewsSection from './components/ReviewsSection';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <GallerySection />
        <PricingSection />
        <ReviewsSection />
        <BookingSection />
      </main>
      <Footer />
    </>
  );
}
