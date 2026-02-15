import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import GallerySection from './components/GallerySection';
import SafetySection from './components/SafetySection';
import PreparationSection from './components/PreparationSection';
import TrainingSection from './components/TrainingSection';
import PricingSection from './components/PricingSection';
import ReviewsSection from './components/ReviewsSection';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';
import { getHeroImage } from './actions/settings';

export default async function Home() {
  const heroImageUrl = await getHeroImage();
  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection heroImageUrl={heroImageUrl} />
        <AboutSection />
        <GallerySection />
        <SafetySection />
        <PreparationSection />
        <TrainingSection />
        <PricingSection />
        <ReviewsSection />
        <BookingSection />
      </main>
      <Footer />
    </>
  );
}
