import TopHeader from '@/components/sections/top-header';
import MainNavigation from '@/components/sections/main-navigation';
import BrandLogosCarousel from '@/components/sections/brand-logos-carousel';
import ReviewsSection from '@/components/sections/reviews-section';
import Footer from '@/components/sections/footer';
import WhatsAppFloatButton from '@/components/sections/whatsapp-float-button';
import CookieConsentBanner from '@/components/sections/cookie-consent-banner';
import GoogleRatingWidget from '@/components/sections/google-rating-widget';

const HeroSection = () => (
  <section className="bg-[#102030] py-20 text-white md:py-24">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="max-w-3xl">
        <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#9fe6d8]">
          Installatie van airconditioning
        </span>
        <h1 className="mt-6 text-[34px] font-bold leading-tight md:text-[44px] lg:text-[52px]">
          Comfort in elk seizoen met energiezuinige airco
        </h1>
        <p className="mt-4 text-lg text-white/80 md:text-xl">
          Een airconditioningsysteem van Verwarming Bros zorgt voor aangename temperaturen in huis – zowel tijdens warme
          zomers als frisse winters.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="tel:0495799899"
            className="inline-flex items-center justify-center rounded-md bg-[#2f7a6f] px-7 py-3 text-sm font-semibold uppercase text-white transition-transform duration-150 hover:scale-[1.03]"
          >
            Bel ons voor advies
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border border-white/60 px-7 py-3 text-sm font-semibold uppercase text-white transition-colors duration-150 hover:bg-white hover:text-[#102030]"
          >
            Vraag een offerte aan
          </a>
        </div>
      </div>
    </div>
  </section>
);

const BenefitsSection = () => (
  <section className="bg-white py-16 md:py-20">
    <div className="container mx-auto px-6 lg:px-12">
      <h2 className="text-[28px] font-bold leading-tight text-[#1a2c3d] md:text-[32px]">
        Waarom kiezen voor airconditioning van Verwarming Bros?
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Comfort zomer & winter', description: 'Koeling in de zomer, aangename warmte in de tussenseizoenen.' },
          { title: 'Energiezuinig', description: 'Nieuwste warmtepomptechnologie met een laag verbruik en hoog rendement.' },
          { title: 'Stille werking', description: 'Moderne toestellen maken nauwelijks geluid en passen in elk interieur.' },
          { title: 'Slimme bediening', description: 'Bedien uw installatie via een app of programmeerbare thermostaat.' },
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

const SystemsSection = () => (
  <section className="bg-[#f4f8f7] py-16 md:py-20">
    <div className="container mx-auto px-6 lg:px-12">
      <h2 className="text-[28px] font-bold leading-tight text-[#1a2c3d] md:text-[32px]">
        Aircosystemen afgestemd op uw woning
      </h2>
      <div className="mt-8 space-y-3 text-base text-[#4a5d58]">
        <p>
          ✅ Split-systemen – Ideaal voor één ruimte of een appartement. Discreet, efficiënt en stil in gebruik.
        </p>
        <p>
          ✅ Multi-split warmtepomp – Temperatuurregeling in meerdere kamers, elk met hun eigen instelling.
        </p>
        <p>
          ✅ Volledige totaaloplossingen – Integratie met bestaande verwarmingssystemen of vloerverwarming.
        </p>
      </div>
      <p className="mt-6 text-base font-semibold text-[#1a2c3d]">
        🔧 Wij zorgen voor advies, installatie en onderhoud zodat u jarenlang zorgeloos geniet van uw airco.
      </p>
    </div>
  </section>
);

const ServiceHighlightsSection = () => (
  <section className="bg-white py-16 md:py-20">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: 'Advies op maat',
            description: 'We analyseren uw woning en behoeften om het juiste aircosysteem te adviseren.',
          },
          {
            title: 'Erkende installateurs',
            description: 'Onze gecertificeerde techniekers leveren een nauwkeurige plaatsing en nette afwerking.',
          },
          {
            title: 'Complete service',
            description: 'Van offerte en installatie tot onderhoud en herstellingen: één aanspreekpunt voor alles.',
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
      <h2 className="text-[30px] font-bold leading-tight md:text-[36px]">Klaar voor frisse en comfortabele lucht?</h2>
      <p className="mt-3 text-base text-white/80">
        Bel ons of plan meteen uw afspraak. Wij staan klaar met professioneel advies en installatie.
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

const AirconditioningPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
      <MainNavigation />
      <main>
        <HeroSection />
        <BenefitsSection />
        <SystemsSection />
        <ServiceHighlightsSection />
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

export default AirconditioningPage;

