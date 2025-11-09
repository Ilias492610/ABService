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

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeaderTopBar />
      <MainNavigation />
      <main>
        <PageHero />
        <UrgentRepairHero />
        <ServiceBenefits />
        <CvRepairServices />
        <BrandLogosCarousel />
        <GoogleReviews />
        <ContactCta />
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

