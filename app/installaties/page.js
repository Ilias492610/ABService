import Link from 'next/link';
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
  title: 'Installaties verwarming en sanitair Antwerpen | AB Service',
  description:
    'AB Service plaatst gasketels, sanitair en airco in Antwerpen en randgemeenten. Eén aanspreekpunt voor advies, plaatsing en onderhoud. Vraag uw vrijblijvende offerte.',
  keywords: [
    'installatie gasketel Antwerpen',
    'sanitair plaatsen Antwerpen',
    'airco installateur Antwerpen',
    'loodgieter installaties Antwerpen',
  ],
  canonicalUrlRelative: '/installaties',
  openGraph: {
    title: 'Installaties door AB Service in Antwerpen',
    description:
      'Nieuwe gasketel, sanitair of airco nodig in Antwerpen? AB Service begeleidt u van studie tot oplevering.',
  },
});

const offerings = [
  {
    title: 'Gasketels & condensatieketels',
    description:
      'Plaatsing en vervanging van energiezuinige ketels met aandacht voor premies, rookgasafvoer en perfecte afregeling.',
    href: '/installaties/gasketels',
  },
  {
    title: 'Sanitair & badkamers',
    description:
      'Complete badkamerprojecten, leidingwerk en warmwaterinstallaties met duurzame materialen die tegen een stootje kunnen.',
    href: '/installaties/sanitair',
  },
  {
    title: 'Airconditioning & warmtepomp',
    description:
      'Comfort in elke kamer dankzij fluisterstille warmtepomp-airco’s met slimme bediening en zuinig verbruik.',
    href: '/installaties/airconditioning',
  },
];

const processSteps = [
  {
    title: 'Analyse ter plaatse',
    description:
      'We bekijken uw woning, bestaande installatie en comfortwensen om de juiste techniek en het vermogen te bepalen.',
  },
  {
    title: 'Transparante offerte',
    description:
      'U ontvangt een duidelijk voorstel met werkplanning, materialen en eventuele subsidie- of premieaanvraag.',
  },
  {
    title: 'Professionele plaatsing',
    description:
      'Onze erkende techniekers installeren alles volgens de veiligheidsnormen en verlaten uw woning netjes.',
  },
  {
    title: 'Nazorg & onderhoud',
    description:
      'Na oplevering krijgt u een uitleg over de bediening en plannen we indien gewenst onderhoud of keuring in.',
  },
];

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
  'Schoten',
  'Zwijndrecht',
];

const faqItems = [
  {
    question: 'Wat kost een nieuwe installatie van een gasketel in Antwerpen?',
    answer:
      'Voor een condensatieketel met plaatsing start de investering doorgaans rond €2.650 excl. btw, afhankelijk van vermogen, rookgasafvoer en gekozen merk. We bekijken ter plaatse welke oplossing voor uw woning het meest rendabel is en bezorgen u een vrijblijvende offerte.',
  },
  {
    question: 'Regelen jullie ook de keuring en premieaanvragen?',
    answer:
      'Ja. AB Service werkt samen met erkende keuringsorganismen en helpt u bij het invullen van premieaanvragen van Fluvius of de stad Antwerpen. Zo bent u zeker dat uw installatie voldoet aan alle richtlijnen.',
  },
  {
    question: 'Hoe snel kan mijn installatie ingepland worden?',
    answer:
      'Voor dringende vervangingen plannen we vaak binnen 5 tot 7 werkdagen. Bij totaalprojecten stemmen we de werken af met andere aannemers zodat uw renovatie zonder vertraging verloopt.',
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
  <section className="bg-[#0f1e25] py-16 text-white md:py-20 lg:py-24">
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 text-center lg:text-left">
      <span className="inline-flex items-center self-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#ffd166] lg:self-start">
        Installaties Antwerpen
      </span>
      <h1 className="text-[34px] font-bold leading-tight md:text-[44px] lg:text-[52px]">
        Nieuwe installaties zonder zorgen voor verwarming, sanitair en airco
      </h1>
      <p className="text-base leading-relaxed text-white/80 md:text-lg lg:max-w-3xl">
        AB Service is uw erkende installateur in Antwerpen voor condensatieketels, sanitair en warmtepomp-airco&apos;s. We combineren technisch advies met een vlekkeloze uitvoering zodat uw woning klaar is voor de toekomst.
      </p>
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row lg:justify-start">
        <a
          href="tel:0484906966"
          className="inline-flex items-center justify-center rounded-md bg-[#ffb703] px-8 py-3 text-sm font-semibold uppercase text-[#0f1e25] transition-colors hover:bg-[#ffd166]"
        >
          Bel rechtstreeks met een technieker
        </a>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-md border border-white/60 px-8 py-3 text-sm font-semibold uppercase text-white transition-colors hover:bg-white hover:text-[#0f1e25]"
        >
          Vraag uw offerte aan
        </Link>
      </div>
    </div>
  </section>
);

const OfferingsSection = () => (
  <section className="bg-white py-16 md:py-20">
    <div className="mx-auto max-w-6xl px-6">
      <h2 className="text-[30px] font-bold leading-tight text-[#1a2c3d] md:text-[34px]">
        Eén partner voor elke installatie
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5a6c7d]">
        Uw project verdient maatwerk. Daarom combineren we technische berekeningen, materiaalkeuze en planning in één traject. Ontdek onze belangrijkste installaties en klik door voor detailinformatie.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {offerings.map((item) => (
          <div key={item.title} className="flex h-full flex-col rounded-2xl border border-[#d9e4ea] bg-[#f8fbfc] p-7 shadow-sm">
            <h3 className="text-lg font-semibold text-[#1a2c3d]">{item.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[#5a6c7d]">{item.description}</p>
            <Link
              href={item.href}
              className="mt-6 inline-flex items-center text-sm font-semibold text-[#0f1e25] transition-colors hover:text-[#ffb703]"
            >
              Lees meer over {item.title.toLowerCase()} →
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const WhyChooseSection = () => (
  <section className="bg-[#f7f9fa] py-16 md:py-20">
    <div className="mx-auto max-w-6xl px-6">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <article>
          <h2 className="text-[30px] font-bold leading-tight text-[#1a2c3d] md:text-[34px]">
            Waarom Antwerpenaars voor AB Service kiezen
          </h2>
          <ul className="mt-6 space-y-4 text-sm text-[#5a6c7d] md:text-base">
            <li>
              <span className="font-semibold text-[#1a2c3d]">Lokale ploegen</span> – We vertrekken vanuit Antwerpen zodat we snel kunnen meten, monteren en bijsturen tijdens uw project.
            </li>
            <li>
              <span className="font-semibold text-[#1a2c3d]">Sterke merken</span> – We werken met Remeha, Vaillant, Daikin en kwaliteitsbeslag dat lang meegaat en makkelijk te onderhouden is.
            </li>
            <li>
              <span className="font-semibold text-[#1a2c3d]">Transparante communicatie</span> – Eén contactpersoon blijft bereikbaar tijdens elke fase zodat u nooit voor verrassingen staat.
            </li>
            <li>
              <span className="font-semibold text-[#1a2c3d]">Regelgeving onder controle</span> – Wij volgen de EPB- en AREI-eisen, attesten en keuringen op zodat uw installatie direct conform is.
            </li>
          </ul>
        </article>
        <aside className="rounded-2xl border border-[#d9e4ea] bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-[#1a2c3d]">Wat u mag verwachten</h3>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-[#5a6c7d]">
            <p>✔ Gratis plaatsbezoek voor een nauwkeurige offerte.</p>
            <p>✔ Opvolging van aanvraag tot nazorg met duidelijke planning.</p>
            <p>✔ Veiligheids- en kwaliteitscontrole bij oplevering.</p>
            <p>✔ Mogelijkheid tot onderhoudscontract voor maximale levensduur.</p>
          </div>
        </aside>
      </div>
    </div>
  </section>
);

const ProcessSection = () => (
  <section className="bg-white py-16 md:py-20">
    <div className="mx-auto max-w-6xl px-6">
      <h2 className="text-[30px] font-bold leading-tight text-[#1a2c3d] md:text-[34px]">
        Zo verloopt uw project stap voor stap
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step) => (
          <div key={step.title} className="rounded-2xl border border-[#d9e4ea] bg-[#f8fbfc] p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#1a2c3d]">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#5a6c7d]">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CoverageSection = () => (
  <section className="bg-[#0f1e25] py-16 text-white">
    <div className="mx-auto max-w-6xl px-6 text-center">
      <h2 className="text-[30px] font-bold leading-tight md:text-[34px]">Installaties in heel Antwerpen en de rand</h2>
      <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
        Onze techniekers bedienen zowel particuliere woningen als appartementen en handelszaken in de volledige regio Antwerpen.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {coverageAreas.map((area) => (
          <div
            key={area}
            className="rounded-lg border border-white/20 bg-white/5 px-4 py-4 text-sm font-semibold uppercase tracking-wide"
          >
            {area}
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-white/70">
        Ook actief in Boom, Aartselaar, Brasschaat, Kapellen en Wommelgem.
      </p>
    </div>
  </section>
);

const FaqSection = () => (
  <section className="bg-white py-16 md:py-20">
    <div className="mx-auto max-w-5xl px-6">
      <h2 className="text-[30px] font-bold leading-tight text-[#1a2c3d] md:text-[34px]">Veelgestelde vragen</h2>
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
  <section className="bg-[#123247] py-16 text-white md:py-20">
    <div className="mx-auto max-w-4xl px-6 text-center">
      <h2 className="text-[30px] font-bold leading-tight md:text-[36px]">Maak vandaag nog een afspraak</h2>
      <p className="mt-3 text-base leading-relaxed text-white/80">
        Bel ons voor dringende vervangingen of plan uw renovatie via het contactformulier. We antwoorden dezelfde werkdag.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href="tel:0484906966"
          className="inline-flex items-center justify-center rounded-md bg-[#ffb703] px-8 py-3 text-sm font-semibold uppercase text-[#0f1e25] transition-colors hover:bg-[#ffd166]"
        >
          Bel 0484 90 69 66
        </a>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-md border border-white/60 px-8 py-3 text-sm font-semibold uppercase text-white transition-colors hover:bg-white hover:text-[#0f1e25]"
        >
          Vraag uw offerte
        </Link>
      </div>
    </div>
  </section>
);

const InstallatiesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Script id="faq-schema-installaties" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqJsonLd)}
      </Script>
      <TopHeader />
      <MainNavigation />
      <main>
        <FadeInSection>
          <HeroSection />
        </FadeInSection>
        <FadeInSection delay={0.1}>
          <OfferingsSection />
        </FadeInSection>
        <FadeInSection delay={0.2}>
          <WhyChooseSection />
        </FadeInSection>
        <FadeInSection delay={0.25}>
          <ProcessSection />
        </FadeInSection>
        <FadeInSection delay={0.3}>
          <BrandLogosCarousel />
        </FadeInSection>
        <FadeInSection delay={0.35}>
          <ReviewsSection />
        </FadeInSection>
        <FadeInSection delay={0.4}>
          <CoverageSection />
        </FadeInSection>
        <FadeInSection delay={0.45}>
          <FaqSection />
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

export default InstallatiesPage;

