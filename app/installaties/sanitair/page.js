import TopHeader from '@/components/sections/top-header';
import MainNavigation from '@/components/sections/main-navigation';
import BrandLogosCarousel from '@/components/sections/brand-logos-carousel';
import ReviewsSection from '@/components/sections/reviews-section';
import Footer from '@/components/sections/footer';
import WhatsAppFloatButton from '@/components/sections/whatsapp-float-button';
import CookieConsentBanner from '@/components/sections/cookie-consent-banner';
import GoogleRatingWidget from '@/components/sections/google-rating-widget';

const HeroSection = () => (
  <section className="bg-[#123247] py-20 text-white md:py-24">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="max-w-3xl">
        <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#ffcaa4]">
          Sanitair & badkamers
        </span>
        <h1 className="mt-6 text-[34px] font-bold leading-tight md:text-[44px] lg:text-[52px]">
          Sanitair op maat: van leidingen tot luxueuze badkamers
        </h1>
        <p className="mt-4 text-lg text-white/80 md:text-xl">
          Verwarming Bros verzorgt uw volledige sanitairproject – vernieuwingswerken, warmwaterinstallaties en badkamers op maat.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="tel:0495799899"
            className="inline-flex items-center justify-center rounded-md bg-[#2f7a6f] px-7 py-3 text-sm font-semibold uppercase text-white transition-transform duration-150 hover:scale-[1.03]"
          >
            Bel voor een afspraak
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border border-white/60 px-7 py-3 text-sm font-semibold uppercase text-white transition-colors duration-150 hover:bg-white hover:text-[#123247]"
          >
            Vraag ons voorstel aan
          </a>
        </div>
      </div>
    </div>
  </section>
);

const ServicesSection = () => (
  <section className="bg-white py-16 md:py-20">
    <div className="container mx-auto px-6 lg:px-12">
      <h2 className="text-[28px] font-bold leading-tight text-[#1a2c3d] md:text-[32px]">Wat kunnen we voor u doen?</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: 'Complete badkamerrenovaties',
            description: 'Van het uitbreken tot de plaatsing van nieuwe toestellen, tegels en afwerking – wij realiseren uw droombadkamer.',
          },
          {
            title: 'Warmwaterinstallaties',
            description: 'Installatie en vervanging van boilers, doorstromers en leidingwerk voor comfortabel warm water in huis.',
          },
          {
            title: 'Herstellingen & modernisering',
            description: 'Snelle interventies bij lekken of storingen en opfrissing van bestaande sanitaire installaties.',
          },
        ].map((item) => (
          <div key={item.title} className="rounded-xl border border-[#e4edf0] bg-[#f8fbfc] p-6">
            <h3 className="text-lg font-semibold text-[#1a2c3d]">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#5a6c7d]">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AdvantagesSection = () => (
  <section className="bg-[#f4f8f7] py-16 md:py-20">
    <div className="container mx-auto px-6 lg:px-12">
      <h2 className="text-[28px] font-bold leading-tight text-[#1a2c3d] md:text-[32px]">
        Sanitairwerken met oog voor detail
      </h2>
      <div className="mt-8 space-y-3 text-base text-[#4a5d58]">
        <p>✅ Persoonlijke aanpak – We luisteren naar uw wensen en werken samen naar de ideale oplossing.</p>
        <p>✅ Hoogwaardige materialen – Duurzame producten van betrouwbare partners voor een lange levensduur.</p>
        <p>✅ Professionele plaatsing – Een nette afwerking en respect voor uw woning staan centraal.</p>
      </div>
      <p className="mt-6 text-base font-semibold text-[#1a2c3d]">
        🔧 Maak uw sanitair klaar voor de toekomst met Verwarming Bros.
      </p>
    </div>
  </section>
);

const WorkProcessSection = () => (
  <section className="bg-white py-16 md:py-20">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: 'Deskundige installateurs',
            description: 'Ons team beschikt over jaren ervaring in sanitair en verwarmingsinstallaties.',
          },
          {
            title: 'Maatwerkoplossingen',
            description: 'Elke badkamer en installatie is uniek – wij stemmen alles af op uw leefruimte.',
          },
          {
            title: 'Betrouwbare opvolging',
            description: 'Na oplevering blijven we beschikbaar voor onderhoud, herstel of toekomstige uitbreidingen.',
          },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-[#dfe8ec] bg-[#f8fbfc] p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-[#1a2c3d]">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#5a6c7d]">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ContactSection = () => (
  <section className="bg-[#1a2c3d] py-16 text-white">
    <div className="container mx-auto px-6 text-center md:px-12">
      <h2 className="text-[30px] font-bold leading-tight md:text-[36px]">Samenwerken aan uw sanitairproject?</h2>
      <p className="mt-3 text-base text-white/80">
        Contacteer ons voor een vrijblijvend gesprek of een gedetailleerde offerte. Wij begeleiden u van A tot Z.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href="tel:0495799899"
          className="inline-flex items-center justify-center rounded-md bg-[#2f7a6f] px-8 py-3 text-sm font-semibold uppercase text-white transition-transform duration-150 hover:scale-[1.03]"
        >
          Bel ons
        </a>
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-md border border-white/70 px-8 py-3 text-sm font-semibold uppercase text-white transition-colors duration-150 hover:bg-white hover:text-[#1a2c3d]"
        >
          Maak een afspraak
        </a>
      </div>
    </div>
  </section>
);

const SanitairPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
      <MainNavigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <AdvantagesSection />
        <WorkProcessSection />
        <BrandLogosCarousel />
        <ReviewsSection />
        <ContactSection />
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

export default SanitairPage;

