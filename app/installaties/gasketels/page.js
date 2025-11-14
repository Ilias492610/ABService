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
  title: 'Gasketel installeren Antwerpen | Condensatieketel vervanging | AB Service',
  description:
    'AB Service vervangt en installeert gasketels in Antwerpen. Energiezuinige condensatieketels met attesten, premieadvies en onderhoud door erkende techniekers.',
  keywords: [
    'gasketel installeren Antwerpen',
    'condensatieketel vervangen Antwerpen',
    'cv installateur Antwerpen',
    'verwarming installatie Antwerpen',
  ],
  canonicalUrlRelative: '/installaties/gasketels',
  openGraph: {
    title: 'Condensatieketels op maat in Antwerpen | AB Service',
    description: 'Laat uw gasketel plaatsen of vervangen door de erkende installateurs van AB Service in Antwerpen.',
  },
});

const coverageAreas = [
  'Antwerpen centrum',
  'Berchem',
  'Borgerhout',
  'Deurne',
  'Ekeren',
  'Hoboken',
  'Merksem',
  'Wilrijk',
  'Edegem',
  'Kontich',
  'Schilde',
  'Schoten',
];

const faqItems = [
  {
    question: 'Wat is het verschil tussen een condensatieketel en mijn huidige toestel?',
    answer:
      'Een condensatieketel recupereert warmte uit rookgassen en haalt zo rendementen tot 109%. U verbruikt minder gas en verlaagt uw uitstoot. Tijdens het plaatsbezoek controleren we of de schoorsteen en afvoer geschikt zijn of aangepast moeten worden.',
  },
  {
    question: 'Hoe verloopt de vervanging van mijn gasketel?',
    answer:
      'We starten met een inspectie van leidingen, schouw en gasdichtheid. Daarna plannen we de demontage van uw oude toestel en plaatsen we de nieuwe ketel, expansievat en regelingen. We testen, vullen en ontluchten het systeem en leveren alle attesten netjes af.',
  },
  {
    question: 'Helpen jullie ook bij onderhoud en keuring?',
    answer:
      'Ja. Na de installatie voorzien we het eerste onderhoud, registreren we de keuring en plannen we desgewenst een jaarlijks onderhoudscontract zodat uw ketel optimaal blijft presteren.',
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

const Hero = () => (
  <section className="bg-donkerblauw py-20 text-white md:py-24">
    <div className="container mx-auto px-6">
      <div className="max-w-3xl">
        <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-goudgeel">
          Condensatieketels Antwerpen
        </span>
        <h1 className="text-[34px] font-bold leading-tight md:text-[44px] lg:text-[52px]">
          Nieuwe gasketel nodig? Wij regelen de volledige installatie
        </h1>
        <p className="mt-2 text-lg tracking-wide uppercase text-goudgeel">
          Plaatsing of vervanging van uw ketel in Antwerpen
        </p>
        <p className="mt-6 max-w-3xl text-base text-white/80 md:text-lg">
          Uw huidige ketel verbruikt te veel of valt stil op koude dagen? AB Service plaatst energiezuinige condensatieketels
          in Antwerpen en zorgt voor een feilloze overstap. Van rookgasafvoer tot regeling: alles wordt professioneel afgewerkt.
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
            className="inline-flex items-center justify-center rounded-md border border-white/60 px-7 py-3 text-sm font-semibold uppercase text-white transition-colors duration-150 hover:bg-white hover:text-donkerblauw"
          >
            Vraag een offerte aan
          </a>
        </div>
      </div>
    </div>
  </section>
);

const WhyReplace = () => (
  <section className="bg-white py-16 md:py-20">
    <div className="container mx-auto px-6">
      <h2 className="text-[28px] font-bold leading-tight text-[#1a2c3d] md:text-[32px]">
        Waarom een nieuwe gasketel laten plaatsen door AB Service?
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: 'Milieuvriendelijk',
            description:
              'Condensatiemodellen reduceren gasverbruik en CO₂-uitstoot zodat u klaar bent voor strengere normen.',
          },
          {
            title: 'Verbeterde efficiëntie',
            description:
              'Rendement tot 109% dankzij warmteterugwinning, slimme modulerende pompen en weersafhankelijke regelaars.',
          },
          {
            title: 'Smart home integratie',
            description:
              'Koppel uw ketel aan slimme thermostaten of zone-regelingen voor maximaal comfort per ruimte.',
          },
          {
            title: 'Veiligheid & zekerheid',
            description:
              'Erkende installateurs zorgen voor conform gasdichtheidsrapport, verbrandingsanalyse en garantie-registratie.',
          },
        ].map((item) => (
          <div key={item.title} className="rounded-xl border border-[#e4edf0] bg-[#f8fbfc] p-6 text-sm text-[#4a5d58]">
            <strong className="block text-base text-[#1a2c3d]">{item.title}</strong>
            <p className="mt-2 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Efficiency = () => (
  <section className="bg-[#f4f8f7] py-16 md:py-20">
    <div className="container mx-auto px-6">
      <h2 className="text-[28px] font-bold leading-tight text-[#1a2c3d] md:text-[32px]">
        Geniet van ultiem comfort met een moderne gasketel
      </h2>
      <div className="mt-6 space-y-3 text-base text-[#4a5d58]">
        {[
          '✅ Betere efficiëntie – Moderne gasketels verbruiken minder gas, verlagen uw energiekosten en verkleinen uw voetafdruk.',
          '✅ Betrouwbaar & veilig – Met ingebouwde beveiligingen, automatische ontluchting en vorstbeveiliging bent u gerust.',
          '✅ Slimme technologie – Programmeerbare of slimme thermostaten stemmen het verbruik af op uw levensstijl.',
          '✅ Premievoordeel – Wij begeleiden u bij de aanvraag van Vlaamse premies en eventuele stedelijke subsidies.',
        ].map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
      <p className="mt-6 text-base font-semibold text-[#1a2c3d]">
        🔧 Kies voor een energiezuinige en betrouwbare verwarmingsoplossing!
      </p>
    </div>
  </section>
);

const Works = () => (
  <section className="bg-white py-16 md:py-20">
    <div className="container mx-auto px-6">
      <h2 className="text-[28px] font-bold leading-tight text-[#1a2c3d] md:text-[32px]">
        Kwalitatieve installatiewerken voor optimaal comfort
      </h2>
      <div className="mt-6 space-y-3 text-base text-[#4a5d58]">
        {[
          '✅ Vervanging van uw oude gasketel – Efficiënter, veiliger en zuiniger.',
          '✅ Aanpassingen aan leidingen en schouw – We verzorgen rookgasafvoeren, condensafvoer en gasleidingen.',
          '✅ Professionele service – Deskundig advies, vlotte planning en duidelijke communicatie.',
        ].map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
      <p className="mt-6 text-base font-semibold text-[#1a2c3d]">
        🔧 Maak van uw huis een warme en comfortabele oase! Neem contact met ons op voor een afspraak op maat.
      </p>
    </div>
  </section>
);

const Highlights = () => (
  <section className="bg-[#f8fbfc] py-16 md:py-20">
    <div className="container mx-auto px-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: 'Deskundige installateurs',
            description:
              'Ons team van erkende gasinstallateurs zorgt voor een correcte dimensionering en perfecte afwerking.',
          },
          {
            title: 'Maatwerkoplossingen',
            description:
              'Elk huis is uniek. We stemmen het vermogen en hydraulische schema af op uw situatie voor optimale prestaties.',
          },
          {
            title: 'Betrouwbare resultaten',
            description:
              'We werken met topmerken zoals Remeha, Vaillant en Bulex en hanteren strikte kwaliteitsnormen.',
          },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-[#dfe8ec] bg-white p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-[#1a2c3d]">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#5a6c7d]">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CoverageSection = () => (
  <section className="bg-[#0f1e25] py-16 text-white">
    <div className="container mx-auto max-w-6xl px-6 text-center">
      <h2 className="text-[28px] font-bold leading-tight md:text-[32px]">Gasketel-installaties in heel Antwerpen</h2>
      <p className="mt-4 text-base text-white/80">
        We bedienen zowel rijwoningen, appartementen als handelspanden in de volledige Antwerpse regio.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
);

const FaqSection = () => (
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
);

const ContactSection = () => (
  <section className="bg-[#1a2c3d] py-16 text-white">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-[30px] font-bold leading-tight md:text-[36px]">Bel ons – Maak meteen uw afspraak</h2>
      <p className="mt-3 text-base text-white/80">
        Heeft u een vraag, feedback of wilt u meer weten over onze diensten? Wij staan voor u klaar!
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

const GasketelsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Script id="faq-schema-gasketels" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqJsonLd)}
      </Script>
      <TopHeader />
      <MainNavigation />
      <main>
        <FadeInSection>
          <Hero />
        </FadeInSection>
        <FadeInSection delay={0.1}>
          <WhyReplace />
        </FadeInSection>
        <FadeInSection delay={0.2}>
          <Efficiency />
        </FadeInSection>
        <FadeInSection delay={0.25}>
          <Works />
        </FadeInSection>
        <FadeInSection delay={0.3}>
          <Highlights />
        </FadeInSection>
        <FadeInSection delay={0.35}>
          <BrandLogosCarousel />
        </FadeInSection>
        <FadeInSection delay={0.4}>
          <ReviewsSection />
        </FadeInSection>
        <FadeInSection delay={0.45}>
          <CoverageSection />
        </FadeInSection>
        <FadeInSection delay={0.5}>
          <FaqSection />
        </FadeInSection>
        <FadeInSection delay={0.55}>
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

export default GasketelsPage;

