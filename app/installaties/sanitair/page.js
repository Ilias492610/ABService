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
  title: 'Sanitair installateur Antwerpen | Badkamerrenovatie & leidingen | AB Service',
  description:
    'AB Service realiseert sanitair installaties en badkamerrenovaties in Antwerpen. Eén aanspreekpunt voor leidingen, toestellen, warm water en afwerking.',
  keywords: [
    'sanitair installateur Antwerpen',
    'badkamerrenovatie Antwerpen',
    'leidingwerk plaatsen Antwerpen',
    'sanitair aannemer Antwerpen',
  ],
  canonicalUrlRelative: '/installaties/sanitair',
  openGraph: {
    title: 'Sanitair en badkamers op maat in Antwerpen | AB Service',
    description: 'Van leidingen tot volledige badkamerrenovatie: AB Service verzorgt uw sanitairproject in Antwerpen.',
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
  'Kontich',
  'Schilde',
  'Schoten',
];

const faqItems = [
  {
    question: 'Hoe verloopt een badkamerrenovatie met AB Service?',
    answer:
      'We starten met een plaatsbezoek en bespreken uw wensen, budget en timing. Daarna ontvangt u een gedetailleerde planning inclusief afbraak, leidingwerk, plaatsing van toestellen en afwerking. Onze loodgieters coördineren het volledige traject en zorgen voor een propere oplevering.',
  },
  {
    question: 'Werken jullie ook samen met andere aannemers?',
    answer:
      'Ja, we stemmen onze planning af met elektriciens, tegelzetters of interieurarchitecten. AB Service blijft uw aanspreekpunt zodat u maar met één partij hoeft te communiceren.',
  },
  {
    question: 'Kan ik bij jullie terecht voor dringende sanitair herstellingen?',
    answer:
      'Zeker. Naast totaalprojecten helpen we bij lekkende leidingen, defecte boilers en verstopte afvoeren. Zo blijft uw installatie in topconditie tussen renovaties door.',
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
          Sanitair Antwerpen
        </span>
        <h1 className="mt-6 text-[34px] font-bold leading-tight md:text-[44px] lg:text-[52px]">
          Sanitair op maat: van leidingen tot luxueuze badkamers
        </h1>
        <p className="mt-4 text-lg text-white/80 md:text-xl">
          AB Service verzorgt uw volledige sanitairproject in Antwerpen: vernieuwingswerken, warmwaterinstallaties en
          hoogwaardige afwerking. U krijgt één aanspreekpunt dat alle werken coördineert.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="tel:0484906966"
            className="inline-flex items-center justify-center rounded-md bg-goudgeel px-7 py-3 text-sm font-semibold uppercase text-donkerblauw transition-colors duration-150 hover:bg-white hover:text-donkerblauw"
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
            description:
              'Van het uitbreken tot de plaatsing van nieuwe toestellen, tegels en afwerking – wij realiseren uw droombadkamer met oog voor detail.',
          },
          {
            title: 'Warmwaterinstallaties',
            description:
              'Installatie en vervanging van boilers, doorstromers, circulatieleidingen en waterverzachters voor maximaal comfort.',
          },
          {
            title: 'Herstellingen & modernisering',
            description:
              'Snelle interventies bij lekken of storingen, en modernisering van bestaande sanitaire installaties en afvoeren.',
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
        <p>✅ Hoogwaardige materialen – We werken met merken als Grohe, Geberit en Villeroy &amp; Boch voor een lange levensduur.</p>
        <p>✅ Professionele plaatsing – Nette afwerking met respect voor uw woning, inclusief stofbeperkende maatregelen.</p>
      </div>
      <p className="mt-6 text-base font-semibold text-[#1a2c3d]">
        🔧 Maak uw sanitair klaar voor de toekomst met AB Service.
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
            description: 'Elke badkamer en installatie is uniek – wij stemmen leidingen, toestellen en afwerking af op uw leefruimte.',
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
          href="tel:0484906966"
          className="inline-flex items-center justify-center rounded-md bg-goudgeel px-8 py-3 text-sm font-semibold uppercase text-donkerblauw transition-colors duration-150 hover:bg-white hover:text-donkerblauw"
        >
          Bel ons
        </a>
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-md bg-goudgeel px-8 py-3 text-sm font-semibold uppercase text-donkerblauw transition-colors duration-150 hover:bg-white hover:text-donkerblauw"
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
      <Script id="faq-schema-sanitair" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqJsonLd)}
      </Script>
      <TopHeader />
      <MainNavigation />
      <main>
        <FadeInSection>
          <HeroSection />
        </FadeInSection>
        <FadeInSection delay={0.1}>
          <ServicesSection />
        </FadeInSection>
        <FadeInSection delay={0.2}>
          <AdvantagesSection />
        </FadeInSection>
        <FadeInSection delay={0.25}>
          <WorkProcessSection />
        </FadeInSection>
        <FadeInSection delay={0.3}>
          <BrandLogosCarousel />
        </FadeInSection>
        <FadeInSection delay={0.35}>
          <ReviewsSection />
        </FadeInSection>
        <FadeInSection delay={0.4}>
          <section className="bg-[#0f1e25] py-16 text-white">
            <div className="container mx-auto max-w-6xl px-6 text-center">
              <h2 className="text-[28px] font-bold leading-tight md:text-[32px]">
                Sanitairprojecten in Antwerpen en omstreken
              </h2>
              <p className="mt-4 text-base text-white/80">
                Van het historisch centrum tot de randgemeenten: onze loodgieters kennen de ondergronden en leidingsituaties door en door.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {coverageAreas.map((area) => (
                  <div
                    key={area}
                    className="rounded-lg border border-white/20 bg-white/10 px-4 py-4 text-sm font-semibold uppercase tracking-wide"
                  >
                    {area}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-white/70">Daarnaast actief in Brasschaat, Kapellen, Boom en Zwijndrecht.</p>
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

export default SanitairPage;

