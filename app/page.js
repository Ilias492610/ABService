"use client";

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

const HomePage = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      <TopHeader />
      <MainNavigation />
      <main>
        <HeroSection />
        <ThreeBenefits />
        <BrandLogosSlider />
        <CompanyIntro />
        <ServicesGrid />
        <FeaturedServicesCarousel />
        <GoogleReviews />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
      <CookieConsentBanner />
    </div>
  );
};

export default HomePage;
