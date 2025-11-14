import TopHeader from '@/components/sections/top-header';
import MainNavigation from '@/components/sections/main-navigation';
import HeroSection from '@/components/sections/hero-section';
import ThreeBenefits from '@/components/sections/three-benefits';
import BrandLogosSlider from '@/components/sections/brand-logos-slider';
import CompanyIntro from '@/components/sections/company-intro';
import ServicesGrid from '@/components/sections/services-grid';
import FeaturedServicesCarousel from '@/components/sections/featured-services-carousel';
import GoogleReviews from '@/components/sections/google-reviews';
import ContactSection from '@/components/sections/contact-section';
import Footer from '@/components/sections/footer';
import FloatingWhatsAppButton from '@/components/sections/floating-whatsapp-button';
import CookieConsentBanner from '@/components/sections/cookie-consent-banner';
import GoogleRatingWidget from '@/components/sections/google-rating-widget';
import FadeInSection from '@/components/animations/FadeInSection';

export const metadata = {
  title: 'Loodgieter Antwerpen | Onderhoud, Keuring & Herstellingen | AB Service',
  description:
    'AB Service ondersteunt Antwerpen met onderhoud van gasketels, erkende keuringen en betrouwbare herstellingen voor sanitair en verwarming. Plan vandaag nog uw afspraak.',
};

const HomePage = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      <TopHeader />
      <MainNavigation />
      <main>
        <FadeInSection>
          <HeroSection />
        </FadeInSection>
        <FadeInSection delay={0.1}>
          <ThreeBenefits />
        </FadeInSection>
        <FadeInSection delay={0.15}>
          <BrandLogosSlider />
        </FadeInSection>
        <FadeInSection delay={0.2}>
          <CompanyIntro />
        </FadeInSection>
        <FadeInSection delay={0.25}>
          <ServicesGrid />
        </FadeInSection>
        <FadeInSection delay={0.3}>
          <FeaturedServicesCarousel />
        </FadeInSection>
        <FadeInSection delay={0.35}>
          <GoogleReviews />
        </FadeInSection>
        <FadeInSection delay={0.4}>
          <ContactSection />
        </FadeInSection>
      </main>
      <Footer />
      <FloatingWhatsAppButton />
      <CookieConsentBanner />
      <div className="fixed bottom-6 right-6 z-[9998] md:bottom-8 md:right-8">
        <GoogleRatingWidget />
      </div>
    </div>
  );
};

export default HomePage;
