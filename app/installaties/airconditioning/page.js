import Script from 'next/script';

import TopHeader from '@/components/sections/top-header';
import MainNavigation from '@/components/sections/main-navigation';
import BrandLogosCarousel from '@/components/sections/brand-logos-carousel';
import ReviewsSection from '@/components/sections/reviews-section';
import Footer from '@/components/sections/footer';
import WhatsAppFloatButton from '@/components/sections/whatsapp-float-button';
import CookieConsentBanner from '@/components/sections/cookie-consent-banner';
import GoogleRatingWidget from '@/components/sections/google-rating-widget';
import FadeInSection from '@/components/animations/FadeInSection';
import { getSEOTags } from '@/libs/seo';

export const metadata = getSEOTags({
  title: 'Airco installateur Antwerpen | Warmtepomp airconditioning | AB Service',
  description:
    'AB Service plaatst energiezuinige airconditioning in Antwerpen en randgemeenten. Persoonlijk advies, plaatsing door erkende koeltechniekers en onderhoud op maat.',
  keywords: [
    'airco installateur Antwerpen',
    'warmtepomp airco Antwerpen',
    'koeltechnieker Antwerpen',
    'airconditioning plaatsen Antwerpen',
  ],
  canonicalUrlRelative: '/installaties/airconditioning',
  openGraph: {
    title: 'Airconditioning op maat in Antwerpen | AB Service',
    description: 'Comfort in elke ruimte met warmtepomp-airco en onderhoud door AB Service in Antwerpen.',
  },
});

const coverageAreas = [
  'Antwerpen centrum',
  'Berchem',
  'Borgerhout',
  'Deurne',
  'Hoboken',
  'Merksem',
  'Wilrijk',
  'Edegem',
  'Mortsel',
  'Schoten',
  'Boom',
  'Aartselaar',
];

const faqItems = [
  {
    question: 'Wat kost een airco-installatie in Antwerpen?',
    answer:
      'De prijs van een airco-installatie hangt af van verschillende factoren zoals het type systeem, aantal units en uw specifieke situatie. We bieden altijd een gratis plaatsbezoek en offerte op maat, zodat u een transparante prijs krijgt zonder verrassingen.',
  },
  {
    question: 'Hoelang duurt de plaatsing van een airco?',
    answer:
      'Een standaardinstallatie wordt in één werkdag afgewerkt. Bij multi-split systemen of extra afwerking kan er een tweede dag nodig zijn. We plannen op voorhand zodat u niet voor verrassingen staat.',
  },
  {
    question: 'Voorziet AB Service ook onderhoud en F-gassen attesten?',
    answer:
      'Ja. Onze erkende koeltechniekers leveren het F-gassen attest af bij oplevering en nemen desgewenst jaarlijks onderhoud, controle en reiniging van filters op in een servicecontract.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

const HeroSection = () => (
  <section className="bg-donkerblauw py-20 text-white md:py-24">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="max-w-3xl">
        <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-goudgeel">
          Airconditioning Antwerpen
        </span>
        <h1 className="mt-6 text-[34px] font-bold leading-tight md:text-[44px] lg:text-[52px]">
          Comfort in elk seizoen met energiezuinige airco
        </h1>
        <p className="mt-4 text-lg text-white/80 md:text-xl">
          AB Service plaatst warmtepomp-airco&apos;s op maat voor woningen, appartementen en handelszaken in Antwerpen.
          We combineren advies, gecertificeerde plaatsing en onderhoud zodat u het hele jaar door geniet van frisse of
          juist behaaglijke lucht.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="tel:0484906966"
            className="inline-flex items-center justify-center rounded-md bg-goudgeel px-7 py-3 text-sm font-semibold uppercase text-donkerblauw transition-colors duration-150 hover:bg-white hover:text-donkerblauw"
          >
            Bel ons voor advies
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border border-white/60 px-7 py-3 text-sm font-semibold uppercase text-white transition-colors duration-150 hover:bg-white hover:text-donkerblauw"
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
        Waarom kiezen voor airconditioning van AB Service?
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Comfort zomer & winter', description: 'Koeling in de zomer, aangename warmte in tussenseizoen dankzij invertertechnologie.' },
          { title: 'Energiezuinig', description: 'Warmtepomp-airco&apos;s realiseren COP-waarden tot 5, ideaal voor stadswoningen en appartementen.' },
          { title: 'Stille werking', description: 'Binnen-units met fluistermodus, perfect voor slaapkamers en bureauruimtes.' },
          { title: 'Slimme bediening', description: 'Koppel uw airco aan slimme thermostaten of beheer alles via een gebruiksvriendelijke app.' },
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
        Aircosystemen afgestemd op Antwerpen en randgemeenten
      </h2>
      <div className="mt-8 space-y-3 text-base text-[#4a5d58]">
        <p>
          ✅ Split-systemen – Ideaal voor één ruimte of stadsappartement. Discreet weggewerkt en stil in gebruik.
        </p>
        <p>
          ✅ Multi-split warmtepomp – Temperatuurregeling in meerdere kamers, elk met een eigen temperatuurregeling.
        </p>
        <p>
          ✅ Volledige totaaloplossingen – Integratie met bestaande verwarmingssystemen, vloerverwarming of domotica.
        </p>
      </div>
      <p className="mt-6 text-base font-semibold text-[#1a2c3d]">
        🔧 Wij zorgen voor advies, installatie, F-gassen attesten en onderhoud zodat u jarenlang zorgeloos geniet van uw airco.
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
            description: 'We analyseren uw woning in Antwerpen, afmetingen en isolatie om het juiste aircosysteem te adviseren.',
          },
          {
            title: 'Erkende koeltechniekers',
            description: 'Onze F-gassen gecertificeerde techniekers leveren een nauwkeurige plaatsing en nette afwerking.',
          },
          {
            title: 'Complete service',
            description: 'Van offerte en installatie tot onderhoud, herstellingen en luchtkwaliteitmeting: één aanspreekpunt voor alles.',
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
        Bel ons of plan meteen uw afspraak. Wij staan klaar met professioneel advies, snelle plaatsing en onderhoud op maat.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href="tel:0484906966"
          className="inline-flex items-center justify-center rounded-md bg-donkerblauw px-8 py-3 text-sm font-semibold uppercase text-white transition-transform duration-150 hover:scale-[1.03]"
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
      <Script id="faq-schema-airco" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqJsonLd)}
      </Script>
      <TopHeader />
      <MainNavigation />
      <main>
        <FadeInSection>
          <HeroSection />
        </FadeInSection>
        <FadeInSection delay={0.1}>
          <BenefitsSection />
        </FadeInSection>
        <FadeInSection delay={0.2}>
          <SystemsSection />
        </FadeInSection>
        <FadeInSection delay={0.25}>
          <ServiceHighlightsSection />
        </FadeInSection>
        <FadeInSection delay={0.3}>
          <BrandLogosCarousel />
        </FadeInSection>
        <FadeInSection delay={0.35}>
          <ReviewsSection />
        </FadeInSection>
        <FadeInSection delay={0.4}>
          <section className="bg-donkerblauw py-16 text-white">
            <div className="container mx-auto max-w-6xl px-6 text-center">
              <h2 className="text-[28px] font-bold leading-tight md:text-[32px]">Installaties in Antwerpen en omliggende gemeenten</h2>
              <p className="mt-4 text-base text-white/80">
                Onze techniekers staan in voor airco-projecten bij particulieren, winkels en kantoren in de volledige Antwerpse regio.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {coverageAreas.map((area) => (
                  <div
                    key={area}
                    className="rounded-lg border border-white/25 bg-white/10 px-4 py-4 text-sm font-semibold uppercase tracking-wide"
                  >
                    {area}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-white/70">Ook actief in Kapellen, Brasschaat, Kontich en Zwijndrecht.</p>
            </div>
          </section>
        </FadeInSection>
        <FadeInSection delay={0.45}>
          <section className="bg-white py-16 md:py-20">
            <div className="container mx-auto max-w-5xl px-6">
              <h2 className="text-[28px] font-bold leading-tight text-[#1a2c3d] md:text-[32px]">Veelgestelde vragen</h2>
              <div className="mt-8 space-y-6">
                {faqItems.map((item) => (
                  <div key={item.question} className="rounded-2xl border border-[#d9e4ea] bg-[#f8fbfc] p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-[#1a2c3d]">{item.question}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#5a6c7d]">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>
        <FadeInSection delay={0.5}>
          <ContactSection />
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

export default AirconditioningPage;

