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
import GoogleRatingWidget from '@/components/sections/google-rating-widget';
import FadeInSection from '@/components/animations/FadeInSection';
import { getSEOTags } from '@/libs/seo';

export const metadata = getSEOTags({
  title: 'Gasketel keuren Antwerpen | Indienststelling en attesten | AB Service',
  description:
    'Laat uw nieuwe of aangepaste cv-installatie keuren door een erkende technicus in Antwerpen. AB Service levert officiële attesten en duidelijke rapporten.',
  keywords: [
    'gasketel keuren Antwerpen',
    'indienststelling verwarming Antwerpen',
    'keuringsattest cv ketel Antwerpen',
    'erkende technicus Antwerpen',
  ],
  canonicalUrlRelative: '/keuring',
  openGraph: {
    title: 'Keuring van cv-installaties in Antwerpen | AB Service',
    description:
      'AB Service verzorgt de verplichte keuring van cv-ketels in Antwerpen en bezorgt u meteen het officiële rapport.',
  },
});

const KeuringPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
      <MainNavigation />
      <main>
        <FadeInSection>
          <HeroSection />
        </FadeInSection>
        <FadeInSection delay={0.1}>
          <ProfessionalInspectionSection />
        </FadeInSection>
        <FadeInSection delay={0.2}>
          <LegalInspectionSection />
        </FadeInSection>
        <FadeInSection delay={0.25}>
          <SimpleInspectionSection />
        </FadeInSection>
        <FadeInSection delay={0.3}>
          <ReviewsSection />
        </FadeInSection>
        <FadeInSection delay={0.35}>
          <ContactCtaSection />
        </FadeInSection>
      </main>
      <Footer />
      <WhatsAppFloatButton />
      <CookieConsentBanner />
      <div className="fixed bottom-6 right-6 z-[9998] md:bottom-8 md:right-8">
        <GoogleRatingWidget />
      </div>
    </div>
  );
};

export default KeuringPage;

