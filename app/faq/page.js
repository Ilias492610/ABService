import Script from 'next/script';

import TopHeader from '@/components/sections/top-header';
import MainNavigation from '@/components/sections/main-navigation';
import Footer from '@/components/sections/footer';
import CookieConsentBanner from '@/components/sections/cookie-consent-banner';
import WhatsAppFloatButton from '@/components/sections/whatsapp-float-button';
import GoogleRatingWidget from '@/components/sections/google-rating-widget';
import FadeInSection from '@/components/animations/FadeInSection';

export const metadata = {
  title: 'FAQ Loodgieter Antwerpen | Veelgestelde vragen AB Service',
  description:
    'Antwoorden op veelgestelde vragen over loodgieterij, spoedservice, lekdetectie en badkamerrenovaties in Antwerpen door AB Service.',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Hoe snel kan een loodgieter langskomen in Antwerpen?',
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
      name: 'Kan ik een offerte krijgen voor een badkamerrenovatie?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Zeker. Na een plaatsbezoek stellen we een gedetailleerde offerte op inclusief planning, materialen en afwerking.',
      },
    },
  ],
};

const faqSections = [
  {
    title: 'Spoedloodgieterij',
    questions: [
      {
        question: 'Wat moet ik doen bij een gesprongen leiding?',
        answer:
          'Sluit indien mogelijk de hoofdkraan af en bel ons meteen. Geef aan waar het lek zich bevindt en of er elektriciteit in de buurt is. Wij begeleiden u telefonisch terwijl we onderweg zijn.',
      },
      {
        question: 'Welke spoedproblemen lossen jullie op?',
        answer:
          'We verhelpen waterlekken, verstopte afvoeren, wc-overlopen, cv-storingen, defecte boilers en dringende sanitairproblemen in woningen en bedrijven.',
      },
      {
        question: 'Zijn er extra kosten voor interventies buiten kantooruren?',
        answer:
          'Voor nacht- en weekendinterventies rekenen we een toeslag aan. U ontvangt altijd vooraf een indicatie van de totale kostprijs.',
      },
    ],
  },
  {
    title: 'Lekdetectie',
    questions: [
      {
        question: 'Moet er altijd gebroken worden bij lekdetectie?',
        answer:
          'Nee. Dankzij thermografie, akoestische detectie en vochtmetingen bepalen we meestal exact waar het lek zit zonder breekwerk. Enkel voor herstelling openen we gericht de muur of vloer.',
      },
      {
        question: 'Kan ik lekdetectie laten terugbetalen?',
        answer:
          'Veel brandverzekeringen vergoeden lekdetectie en gevolgschade. Ons rapport voldoet aan de vereisten van de meeste verzekeraars.',
      },
      {
        question: 'Hoe snel ontvang ik het rapport?',
        answer:
          'Binnen 24 uur ontvangt u een digitaal rapport met foto\'s, meetdata en advies. Dit document kan u doorsturen naar uw verzekeraar of syndicus.',
      },
    ],
  },
  {
    title: 'Badkamerrenovatie',
    questions: [
      {
        question: 'Werken jullie met eigen mensen?',
        answer:
          'Ja, onze loodgieters en tegelzetters maken deel uit van het vaste team. Voor elektriciteit en maatwerkmeubilair werken we met vaste partners.',
      },
      {
        question: 'Kan ik tijdens de werken thuis blijven?',
        answer:
          'Absoluut. We houden rekening met uw gezinssituatie, beschermen vloeren en ruimen dagelijks op. U kan tijdens de renovatie thuis blijven indien er water en elektriciteit beschikbaar blijven.',
      },
      {
        question: 'Hoe verloopt de betaling?',
        answer:
          'We werken met overzichtelijke schijven: voorschot, tussentijdse betaling en saldo bij oplevering. Dit wordt vooraf afgesproken in de offerte.',
      },
    ],
  },
  {
    title: 'Algemeen',
    questions: [
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
                Antwoorden op veelgestelde vragen over onze loodgietersdiensten
              </h1>
              <p className="text-base leading-relaxed text-white/80 md:text-lg">
                Vind hier praktische info over spoedinterventies, lekdetectie, badkamerrenovaties en algemene werking.
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
