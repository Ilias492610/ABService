import Link from 'next/link';
import Script from 'next/script';

import TopHeader from '@/components/sections/top-header';
import MainNavigation from '@/components/sections/main-navigation';
import Footer from '@/components/sections/footer';
import CookieConsentBanner from '@/components/sections/cookie-consent-banner';
import WhatsAppFloatButton from '@/components/sections/whatsapp-float-button';
import GoogleRatingWidget from '@/components/sections/google-rating-widget';
import FadeInSection from '@/components/animations/FadeInSection';

export const metadata = {
  title: 'Badkamer renovatie Antwerpen | AB Service totaalprojecten',
  description:
    'AB Service renoveert badkamers in Antwerpen van afbraak tot afwerking. Sanitair, leidingen, tegelwerk en maatmeubilair in één traject met garantie.',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Wat kost een badkamerrenovatie in Antwerpen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Een volledige badkamerrenovatie start vanaf €12.000 incl. btw. Na een kennismaking ontvangt u een gedetailleerde offerte op maat.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hoe lang duurt de renovatie?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gemiddeld duurt een badkamerrenovatie 10 tot 15 werkdagen, afhankelijk van de omvang. We stellen vooraf een duidelijke planning op.',
      },
    },
    {
      '@type': 'Question',
      name: 'Regelen jullie ook de afbraak en elektriciteit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, wij coördineren de volledige renovatie inclusief afbraak, sanitair, elektriciteit, ventilatie, tegelwerk en maatkasten.',
      },
    },
  ],
};

const processSteps = [
  {
    title: '1. Kennismaking & ontwerp',
    description:
      'We bespreken uw wensen, budget en timing. Indien gewenst zorgen we voor 3D-visualisaties en materiaaladvies.',
  },
  {
    title: '2. Offerte & planning',
    description:
      'Na akkoord bepalen we de startdatum en krijgt u een heldere planning per fase zodat u exact weet wat wanneer gebeurt.',
  },
  {
    title: '3. Uitvoering door vakspecialisten',
    description:
      'Onze loodgieters, tegelzetters en elektriciens werken nauw samen. We houden uw woning schoon en communiceren dagelijks over de vooruitgang.',
  },
  {
    title: '4. Oplevering & nazorg',
    description:
      'We testen alle installaties, voeren afregeling uit en leveren uw badkamer op met garanties en onderhoudsinstructies.',
  },
];

const materials = [
  'Merkkraanwerk van Grohe, Hansgrohe en Villeroy & Boch',
  'Inloopdouches met waterdichte wanden en antislipvloeren',
  'Waterverzachters en filters voor langere levensduur',
  'Maatwerkmeubilair met vochtbestendige materialen',
  'Verlichting en ventilatie afgestemd op uw ruimte',
];

const BadkamerRenovatiePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Script id="faq-schema-badkamer" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqJsonLd)}
      </Script>
      <TopHeader />
      <MainNavigation />
      <main>
        <FadeInSection>
          <section className="bg-[#0f1e25] py-16 text-white md:py-20 lg:py-24">
            <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                Badkamer renovatie Antwerpen
              </p>
              <h1 className="text-[36px] font-bold leading-tight md:text-[46px]">
                Van droomontwerp tot afgewerkte badkamer in één traject
              </h1>
              <p className="text-base leading-relaxed text-white/80 md:text-lg">
                AB Service begeleidt u van eerste idee tot oplevering. Wij zorgen voor sanitair, leidingen, tegelwerk,
                elektriciteit en ventilatie. Transparante communicatie, vaste aanspreekpunten en kwalitatieve afwerking.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                <a
                  href="tel:0484906966"
                  className="inline-flex items-center justify-center rounded-md bg-[#ffb703] px-8 py-3 text-sm font-semibold uppercase text-[#0f1e25] transition-colors hover:bg-[#ffd166]"
                >
                  Plan een werfbezoek
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md border border-white/60 px-8 py-3 text-sm font-semibold uppercase text-white transition-colors hover:bg-white hover:text-[#0f1e25]"
                >
                  Vraag een vrijblijvende offerte
                </Link>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <section className="bg-white py-16 md:py-20">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[minmax(0,_3fr)_minmax(0,_2fr)] md:gap-14">
              <article>
                <h2 className="text-[30px] font-bold leading-tight text-[#1a2c3d] md:text-[34px]">
                  Badkamerrenovatie op maat van uw woning
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#5a6c7d]">
                  Of u nu kiest voor een moderne inloopdouche, een compacte city-badkamer of een luxueuze wellnessruimte,
                  we vertalen uw wensen naar een functioneel ontwerp. We denken mee over leidingen, waterdruk, verlichting en
                  ventilatie zodat uw badkamer jarenlang meegaat.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-[#5a6c7d]">
                  <li>Vernieuwing van leidingen, afvoeren en waterverdeling</li>
                  <li>Installatie van badkamermeubels, douche, bad, toilet en wellness</li>
                  <li>Complete tegelwerken, epoxyvoegen en waterdichte wanden</li>
                  <li>Integratie van domotica, vloerverwarming en ventilatie</li>
                </ul>
              </article>
              <aside className="rounded-2xl bg-[#f6faf9] p-6 shadow-sm md:p-10">
                <h3 className="text-xl font-semibold text-[#1a2c3d]">Waarom kiezen voor AB Service?</h3>
                <ul className="mt-4 space-y-3 text-sm text-[#5a6c7d]">
                  <li>Eén aanspreekpunt voor het complete project</li>
                  <li>Strakke timing en dagelijkse werfopvolging</li>
                  <li>Eigen loodgieters, tegelzetters en elektriciens</li>
                  <li>Duidelijke prijsafspraken en offertes</li>
                  <li>Garantie op materialen en afwerking</li>
                </ul>
              </aside>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <section className="bg-[#f7f9fa] py-16 md:py-20">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="text-center text-[30px] font-bold leading-tight text-[#1a2c3d] md:text-[34px]">
                Onze renovatieaanpak in 4 stappen
              </h2>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {processSteps.map((step) => (
                  <div key={step.title} className="rounded-xl border border-[#d9e4ea] bg-white p-6">
                    <h3 className="text-lg font-semibold text-[#1a2c3d]">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5a6c7d]">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.25}>
          <section className="bg-white py-16 md:py-20">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[minmax(0,_2fr)_minmax(0,_3fr)] md:gap-14">
              <aside className="rounded-2xl bg-[#0f1e25] p-8 text-white">
                <h3 className="text-xl font-semibold">Materialen van topkwaliteit</h3>
                <p className="mt-3 text-sm text-white/80">
                  We werken enkel met betrouwbare merken. Tijdens de showroombezoeken kiest u samen met ons kraanwerk,
                  tegels en meubels die passen bij uw stijl en budget.
                </p>
                <ul className="mt-4 space-y-3 text-sm text-white/80">
                  {materials.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-[#ffb703]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </aside>
              <article>
                <h2 className="text-[30px] font-bold leading-tight text-[#1a2c3d] md:text-[34px]">
                  Projectcoördinatie van A tot Z
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#5a6c7d]">
                  Tijdens de renovatie heeft u één projectleider die alles coördineert. We stemmen planning af met
                  leveranciers, controleren leveringen en zorgen dat elke specialist perfect op elkaar aansluit.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#e1e9ed] bg-[#f9fbfc] p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-[#ffb703]">
                      Werfopvolging
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#5a6c7d]">
                      Dagelijks contact en updates via mail of WhatsApp zodat u altijd op de hoogte bent.
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#e1e9ed] bg-[#f9fbfc] p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-[#ffb703]">
                      Nazorg & service
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#5a6c7d]">
                      Na oplevering blijven we beschikbaar voor onderhoud, herstellingen en aanpassingen.
                    </p>
                  </div>
                </div>
                <p className="mt-6 text-sm text-[#5a6c7d]">
                  Ontdek ook onze{' '}
                  <Link href="/diensten/spoedloodgieter-antwerpen" className="underline">
                    spoedinterventies
                  </Link>{' '}
                  en onze{' '}
                  <Link href="/diensten/lekdetectie-antwerpen" className="underline">
                    lekdetectie in Antwerpen
                  </Link>
                  .
                </p>
              </article>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.3}>
          <section className="bg-[#f7f9fa] py-16 md:py-20">
            <div className="mx-auto max-w-5xl px-6 text-center">
              <h2 className="text-[30px] font-bold leading-tight text-[#1a2c3d] md:text-[34px]">
                Start vandaag met uw nieuwe badkamer
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#5a6c7d]">
                Maak een afspraak voor een plaatsbezoek in Antwerpen of omgeving. We luisteren naar uw wensen en stellen
                een realistisch plan en budget voor.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-4 md:flex-row">
                <a
                  href="tel:0484906966"
                  className="inline-flex items-center justify-center rounded-md bg-[#ffb703] px-8 py-3 text-sm font-semibold uppercase text-[#0f1e25] transition-colors hover:bg-[#ffd166]"
                >
                  Bel 0484 906 966
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md border border-[#0f1e25] px-8 py-3 text-sm font-semibold uppercase text-[#0f1e25] transition-colors hover:bg-[#0f1e25] hover:text-white"
                >
                  Contactformulier
                </Link>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.35}>
          <section className="bg-white py-16 md:py-20">
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="text-[30px] font-bold leading-tight text-[#1a2c3d] md:text-[34px]">
                FAQ badkamerrenovatie Antwerpen
              </h2>
              <div className="mt-8 space-y-6">
                {[
                  {
                    question: 'Kunnen jullie helpen bij het aanvragen van premies?',
                    answer:
                      'Ja, we begeleiden u bij de aanvraag van eventuele renovatie- of energiepremies en bezorgen de nodige attesten.',
                  },
                  {
                    question: 'Werken jullie ook in appartementen?',
                    answer:
                      'Zeker. We stemmen alles af met de syndicus, houden rekening met gemeenschappelijke ruimtes en beperken hinder voor buren.',
                  },
                  {
                    question: 'Is gedeeltelijke renovatie mogelijk?',
                    answer:
                      'Ja, we vernieuwen ook enkel douchezones, sanitair of tegelwerk. We bekijken samen wat de beste aanpak is.',
                  },
                  {
                    question: 'Hoe verloopt de betaling?',
                    answer:
                      'U betaalt volgens afgesproken schijven: voorschot, tussentijdse betaling en saldo bij oplevering.',
                  },
                ].map((faq) => (
                  <article key={faq.question} className="rounded-xl border border-[#e1e9ed] bg-[#f9fbfc] p-6">
                    <h3 className="text-lg font-semibold text-[#1a2c3d]">{faq.question}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#5a6c7d]">{faq.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
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

export default BadkamerRenovatiePage;
