import HeaderTopBar from '@/components/sections/header-top-bar';
import MainNavigation from '@/components/sections/main-navigation';
import PageHero from '@/components/sections/page-hero';
import UrgentRepairHero from '@/components/sections/urgent-repair-hero';
import ServiceBenefits from '@/components/sections/service-benefits';
import CvRepairServices from '@/components/sections/cv-repair-services';
import BrandLogosCarousel from '@/components/sections/brand-logos-carousel';
import GoogleReviews from '@/components/sections/google-reviews';
import ContactCta from '@/components/sections/contact-cta';
import Footer from '@/components/sections/footer';
import CookieConsentModal from '@/components/sections/cookie-consent-modal';
import WhatsAppFloatButton from '@/components/sections/whatsapp-float-button';
import GoogleRatingWidget from '@/components/sections/google-rating-widget';
import FadeInSection from '@/components/animations/FadeInSection';
import { getSEOTags } from '@/libs/seo';

export const metadata = getSEOTags({
  title: 'Contact loodgieter en warmtespecialist Antwerpen | AB Service',
  description:
    'Contacteer AB Service, uw loodgieter en warmtespecialist in Antwerpen, voor onderhoud, herstelling, installatie of keuring.',
  keywords: [
    'contact loodgieter Antwerpen',
    'warmtespecialist Antwerpen contact',
    'contact gasketel Antwerpen',
    'spoed loodgieter Antwerpen',
    'interventie verwarming Antwerpen',
    'AB Service contact',
  ],
  canonicalUrlRelative: '/contact',
  openGraph: {
    title: 'Contact loodgieter Antwerpen | AB Service',
    description:
      'Vraag snel een interventie of offerte aan bij uw loodgieter en warmtespecialist in Antwerpen.',
  },
});

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeaderTopBar />
      <MainNavigation />
      <main>
        <FadeInSection>
          <PageHero />
        </FadeInSection>
        <FadeInSection delay={0.1}>
          <UrgentRepairHero />
        </FadeInSection>
        <FadeInSection delay={0.2}>
          <ServiceBenefits />
        </FadeInSection>
        <FadeInSection delay={0.25}>
          <CvRepairServices />
        </FadeInSection>
        <FadeInSection delay={0.3}>
          <BrandLogosCarousel />
        </FadeInSection>
        <FadeInSection delay={0.35}>
          <GoogleReviews />
        </FadeInSection>
        <FadeInSection delay={0.4}>
          <ContactCta />
        </FadeInSection>
      </main>
      <Footer />
      <CookieConsentModal />
      <WhatsAppFloatButton />
      <div className="fixed bottom-6 right-6 z-[9998] md:bottom-8 md:right-8">
        <GoogleRatingWidget />
      </div>
    </div>
  );
};

export default ContactPage;
