import Script from 'next/script';

import TopHeader from '@/components/sections/top-header';
import MainNavigation from '@/components/sections/main-navigation';
import Footer from '@/components/sections/footer';
import CookieConsentBanner from '@/components/sections/cookie-consent-banner';
import WhatsAppFloatButton from '@/components/sections/whatsapp-float-button';
import GoogleRatingWidget from '@/components/sections/google-rating-widget';
import FadeInSection from '@/components/animations/FadeInSection';
import { getSEOTags } from '@/libs/seo';

export const metadata = getSEOTags({
  title: 'FAQ Gasketels & Verwarming Antwerpen | AB Service',
  description:
    'Antwoorden op veelgestelde vragen over gasketelonderhoud, loodgieterswerken, herstellingen en interventies in Antwerpen.',
  keywords: [
    'faq loodgieter Antwerpen',
    'faq gasketel Antwerpen',
    'warmtespecialist Antwerpen vragen',
    'veelgestelde vragen verwarming Antwerpen',
    'AB Service FAQ',
  ],
  canonicalUrlRelative: '/faq',
});

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Hoe snel kan een technicus voor gasketels langskomen in Antwerpen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Voor spoedgevallen zijn we 24/7 bereikbaar en mikken we op een interventie binnen 60 minuten in Antwerpen en randgemeenten.',
      },
    },
    {
      '@type': 'Question',
      name: 'Werken jullie ook in het weekend en op feestdagen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja, onze spoedploeg is alle dagen bereikbaar. Voor geplande werken stemmen we de planning af met uw agenda.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kan ik een offerte krijgen voor onderhoud of een nieuwe gasketel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zeker. Na een plaatsbezoek stellen we een duidelijke offerte op voor onderhoud, herstelling of installatie van uw gasketel.',
      },
    },
  ],
};

const faqSections = [
  {
    title: 'Spoed herstelling gasketel',
    questions: [
      {
        question: 'Wat moet ik doen bij een storing op mijn gasketel?',
        answer:
          'Noteer de foutcode en controleer of de cv-druk voldoende is. Vermijd herhaald resetten en bel ons meteen voor een veilige diagnose.',
      },
      {
        question: 'Welke spoedproblemen lossen jullie op?',
        answer:
          'We verhelpen cv-storingen, foutcodes, drukproblemen, uitval van warm water en defecte ketelonderdelen in woningen en bedrijven.',
      },
      {
        question: 'Zijn er extra kosten voor interventies buiten kantooruren?',
        answer:
          'Voor nacht- en weekendinterventies rekenen we een toeslag aan. U ontvangt altijd vooraf een indicatie van de totale kostprijs.',
      },
    ],
  },
  {
    title: 'Diagnose en foutcodes',
    questions: [
      {
        question: 'Kan ik een foutcode zelf oplossen?',
        answer:
          'Sommige meldingen zoals lage waterdruk kan u beperkt zelf controleren. Bij terugkerende of onbekende foutcodes is professionele diagnose noodzakelijk.',
      },
      {
        question: 'Waarom komt dezelfde foutcode steeds terug?',
        answer:
          'Terugkerende codes wijzen vaak op een onderliggend technisch probleem zoals sensorfouten, circulatieproblemen of verbrandingsafwijkingen.',
      },
      {
        question: 'Werken jullie op alle ketelmerken?',
        answer:
          'Ja. We werken dagelijks op onder meer Vaillant, Bulex, Bosch en Junkers en houden rekening met model- en generatieverschillen.',
      },
    ],
  },
  {
    title: 'Onderhoud en installatie',
    questions: [
      {
        question: 'Hoe vaak moet een gasketel onderhouden worden?',
        answer:
          'Voor de meeste toestellen is periodiek onderhoud wettelijk of technisch aanbevolen. We adviseren het juiste onderhoudsschema op basis van uw installatie.',
      },
      {
        question: 'Kunnen jullie ook een nieuwe gasketel plaatsen?',
        answer:
          'Ja, we verzorgen vervanging en nieuwe installaties met correcte dimensionering, afstelling en oplevering volgens de geldende normen.',
      },
      {
        question: 'Ontvang ik een duidelijke offerte vooraf?',
        answer:
          'Ja. U ontvangt vooraf een heldere offerte met scope, materialen en uitvoering, zonder verborgen kosten.',
      },
    ],
  },
  {
    title: 'Algemeen',
    questions: [
      {
        question: 'Doen jullie ook loodgieterswerken in Antwerpen?',
        answer:
          'Ja. Naast verwarmingswerken voeren we ook loodgieterswerken uit zoals lekherstellingen, sanitaire aanpassingen en vervanging van kranen of leidingen in Antwerpen en randgemeenten.',
      },
      {
        question: 'In welke regio werken jullie?',
        answer:
          'We bedienen Antwerpen centrum, alle districten (Berchem, Deurne, Borgerhout, Merksem, Wilrijk, Hoboken) en randgemeenten zoals Brasschaat, Edegem, Schoten, Kontich en Boom.',
      },
      {
        question: 'Welke betaalmiddelen accepteren jullie?',
        answer:
          'U kan betalen via bancontact, overschrijving of cash. Bedrijven ontvangen een factuur per e-mail. Particulieren krijgen een werkbon of factuur na interventie.',
      },
      {
        question: 'Kunnen jullie samenwerken met mijn architect of syndicus?',
        answer:
          'Ja, we stemmen planning en communicatie af met uw architect, syndicus of aannemer zodat het project vlot verloopt.',
      },
    ],
  },
];

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Script id="faq-schema-main" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqJsonLd)}
      </Script>
      <TopHeader />
      <MainNavigation />
      <main>
        <FadeInSection>
          <section className="bg-[#0f1e25] py-16 text-white md:py-20 lg:py-24">
            <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                FAQ AB Service
              </p>
              <h1 className="text-[36px] font-bold leading-tight md:text-[46px]">
                Antwoorden op veelgestelde vragen over gasketels en verwarming
              </h1>
              <p className="text-base leading-relaxed text-white/80 md:text-lg">
                Vind hier praktische info over spoedinterventies, foutcodes, onderhoud, loodgieterswerken en algemene werking.
                Staat uw vraag er niet tussen? Contacteer ons, we helpen u graag verder.
              </p>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <section className="bg-white py-16 md:py-20">
            <div className="mx-auto max-w-5xl px-6">
              {faqSections.map((section, index) => (
                <div key={section.title} className={index > 0 ? 'mt-10' : ''}>
                  <h2 className="text-[28px] font-bold leading-tight text-[#1a2c3d] md:text-[32px]">
                    {section.title}
                  </h2>
                  <div className="mt-6 space-y-5">
                    {section.questions.map((qa) => (
                      <article key={qa.question} className="rounded-xl border border-[#e1e9ed] bg-[#f9fbfc] p-6">
                        <h3 className="text-lg font-semibold text-[#1a2c3d]">{qa.question}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-[#5a6c7d]">{qa.answer}</p>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
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

export default FAQPage;
