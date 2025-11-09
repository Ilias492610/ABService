"use client";

import TopHeader from '@/components/sections/top-header';
import MainNavigation from '@/components/sections/main-navigation';
import HeroSection from '@/components/sections/hero-section';
import ProfessionalInspectionSection from '@/components/sections/professional-inspection-section';
import LegalInspectionSection from '@/components/sections/legal-inspection-section';
import SimpleInspectionSection from '@/components/sections/simple-inspection-section';
import ReviewsSection from '@/components/sections/reviews-section';
import ContactCtaSection from '@/components/sections/contact-cta-section';
import Footer from '@/components/sections/footer';
import WhatsAppFloatButton from '@/components/sections/whatsapp-float-button';
import CookieConsentBanner from '@/components/sections/cookie-consent-banner';

const KeuringPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
      <MainNavigation />
      <main>
        <HeroSection />
        <ProfessionalInspectionSection />
        <LegalInspectionSection />
        <SimpleInspectionSection />
        <ReviewsSection />
        <ContactCtaSection />
      </main>
      <Footer />
      <WhatsAppFloatButton />
      <CookieConsentBanner />
    </div>
  );
};

export default KeuringPage;

