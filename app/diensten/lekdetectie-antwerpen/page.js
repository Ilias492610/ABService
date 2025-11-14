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
  title: 'Lekdetectie Antwerpen | AB Service opsporing & herstelling',
  description:
    'AB Service spoort waterlekken op in Antwerpen met thermografie en akoestische detectie. Minimale breekwerken, snelle rapportage voor verzekering en herstel door vakmannen.',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Hoe werkt lekdetectie zonder breekwerk?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We gebruiken thermische camera\'s, vochtmetingen en akoestische detectie om het lek exact te lokaliseren. Zo vermijden we onnodige breekwerken en kunnen we gericht herstellen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Wat kost lekdetectie in Antwerpen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Een lekonderzoek start vanaf €180 excl. btw. U ontvangt vooraf een prijsindicatie en achteraf een gedetailleerd rapport voor de verzekering.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kunnen jullie het lek ook herstellen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ja. Onze loodgieters herstellen het lek meteen indien mogelijk. Is er extra materiaal nodig, dan plannen we direct een vervolgafspraak in zodat u snel geholpen bent.',
      },
    },
  ],
};

const detectionMethods = [
  {
    title: 'Thermografie',
    description:
      'Warmtecamera\'s tonen temperatuurverschillen in muren en vloeren, ideaal voor vloerverwarming en warmwaterleidingen.',
  },
  {
    title: 'Akoestische detectie',
    description:
      'Met speciale microfoons luisteren we naar het geluid van water onder druk om verborgen lekken in leidingen te lokaliseren.',
  },
  {
    title: 'Vocht- en drukmeting',
    description:
      'We meten vochtigheid en druk om de omvang van het lek te bepalen en bijkomende schade in kaart te brengen.',
  },
  {
    title: 'Endoscopie',
    description:
      'Met mini-camera\'s inspecteren we leidingen en holle ruimtes zonder grote breekwerken.',
  },
];

const LekdetectiePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Script id="faq-schema-lekdetectie" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqJsonLd)}
      </Script>
      <TopHeader />
      <MainNavigation />
      <main>
        <FadeInSection>
          <section className="bg-[#0f1e25] py-16 text-white md:py-20 lg:py-24">
            <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                Lekdetectie Antwerpen
              </p>
              <h1 className="text-[36px] font-bold leading-tight md:text-[46px]">
                Voorkom waterschade met lekdetectie zonder kap- en breekwerk
              </h1>
              <p className="text-base leading-relaxed text-white/80 md:text-lg">
                Onverklaarbare vochtplekken, geur van schimmel of stijgende waterfactuur? AB Service lokaliseert het lek
                razendsnel met professionele apparatuur. Zo beperken we schade en herstellen we uw installatie definitief.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                <a
                  href="tel:0484906966"
                  className="inline-flex items-center justify-center rounded-md bg-[#ffb703] px-8 py-3 text-sm font-semibold uppercase text-[#0f1e25] transition-colors hover:bg-[#ffd166]"
                >
                  Plan meteen een lekonderzoek
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md border border-white/60 px-8 py-3 text-sm font-semibold uppercase text-white transition-colors hover:bg-white hover:text-[#0f1e25]"
                >
                  Vraag een rapport aan
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
                  Snel duidelijkheid bij verborgen lekken
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#5a6c7d]">
                  Onzichtbare lekkages veroorzaken vaak grote schade. Onze lekdetectie-experts combineren verschillende
                  technieken om het lek exact te lokaliseren. Geen gokwerk, geen onnodige kapwerken. U ontvangt een
                  duidelijke rapportage voor verzekering en herstelling.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#e1e9ed] bg-[#f9fbfc] p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-[#ffb703]">
                      Residentieel & commercieel
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#5a6c7d]">
                      We werken voor particulieren, vastgoedbeheerders, verzekeringsmakelaars en facility managers.
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#e1e9ed] bg-[#f9fbfc] p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-[#ffb703]">
                      Rapport binnen 24 uur
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#5a6c7d]">
                      Inclusief foto\'s, meetresultaten en advies voor definitieve herstelling volgens verzekeringsnormen.
                    </p>
                  </div>
                </div>
              </article>
              <aside className="rounded-2xl bg-[#f6faf9] p-6 shadow-sm md:p-10">
                <h3 className="text-xl font-semibold text-[#1a2c3d]">Typische signalen van een verborgen lek</h3>
                <ul className="mt-4 space-y-3 text-sm text-[#5a6c7d]">
                  <li>Vochtplekken op muren of plafonds zonder duidelijke oorzaak</li>
                  <li>Schimmelvorming, muffe geur of loskomend behang</li>
                  <li>Warmteverlies in vloerverwarming of cv-installatie</li>
                  <li>Plots hoger waterverbruik of drukverlies</li>
                  <li>Knisperend geluid of water onder tegels</li>
                </ul>
              </aside>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <section className="bg-[#f7f9fa] py-16 md:py-20">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="text-center text-[30px] font-bold leading-tight text-[#1a2c3d] md:text-[34px]">
                Detectietechnieken zonder schade
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-relaxed text-[#5a6c7d]">
                Elke situatie vraagt een andere aanpak. Wij bepalen ter plaatse welke techniek het meest efficiënt is.
                Vaak combineren we meerdere methoden voor absolute zekerheid.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {detectionMethods.map((method) => (
                  <div key={method.title} className="rounded-xl border border-[#d9e4ea] bg-white p-6">
                    <h3 className="text-lg font-semibold text-[#1a2c3d]">{method.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5a6c7d]">{method.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.25}>
          <section className="bg-white py-16 md:py-20">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:gap-14">
              <article>
                <h2 className="text-[30px] font-bold leading-tight text-[#1a2c3d] md:text-[34px]">
                  Van detectie tot herstelling in één traject
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#5a6c7d]">
                  Na de detectie herstellen onze loodgieters het probleem meteen wanneer dat haalbaar is. Zo hoeft u geen
                  aparte aannemer te zoeken. Moet er meer gebeuren, dan plannen we dat meteen in en coördineren we de opvolging.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-[#5a6c7d]">
                  <li>Herstelling van badkamers, keukens en ondergrondse leidingen</li>
                  <li>Vervanging van defecte kranen, sifons en afvoeren</li>
                  <li>Renovatie van beschadigde wanden of vloeren in samenwerking met partners</li>
                  <li>Advies voor vochtpreventie en ventilatie</li>
                </ul>
              </article>
              <aside className="rounded-2xl bg-[#0f1e25] p-8 text-white">
                <h3 className="text-xl font-semibold">Samenwerking met verzekeringen</h3>
                <p className="mt-3 text-sm text-white/80">
                  U krijgt een gedetailleerd lekdetectierapport met foto\'s, meetdata en oorzaak-analyse. Dit document
                  voldoet aan de eisen van verzekeringsmaatschappijen, zodat u schade eenvoudig kunt claimen.
                </p>
                <p className="mt-4 text-sm text-white/80">
                  Heeft uw verzekeraar een specifieke procedure? Laat het ons weten, wij stemmen ons rapport hierop af.
                </p>
                <p className="mt-6 text-sm text-white/80">
                  Ontdek ook onze{' '}
                  <Link href="/diensten/spoedloodgieter-antwerpen" className="underline">
                    spoedloodgieterij
                  </Link>{' '}
                  en{' '}
                  <Link href="/diensten/badkamer-renovatie-antwerpen" className="underline">
                    badkamerrenovaties
                  </Link>
                  .
                </p>
              </aside>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.3}>
          <section className="bg-[#f7f9fa] py-16 md:py-20">
            <div className="mx-auto max-w-5xl px-6 text-center">
              <h2 className="text-[30px] font-bold leading-tight text-[#1a2c3d] md:text-[34px]">
                Klaar om uw lek snel op te sporen?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#5a6c7d]">
                Neem contact op voor een interventie binnen 24 uur. We bespreken telefonisch uw situatie en plannen
                meteen een bezoek in door een gecertificeerde lekdetectiespecialist.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-4 md:flex-row">
                <a
                  href="tel:0484906966"
                  className="inline-flex items-center justify-center rounded-md bg-[#ffb703] px-8 py-3 text-sm font-semibold uppercase text-[#0f1e25] transition-colors hover:bg-[#ffd166]"
                >
                  Bel voor lekdetectie
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md border border-[#0f1e25] px-8 py-3 text-sm font-semibold uppercase text-[#0f1e25] transition-colors hover:bg-[#0f1e25] hover:text-white"
                >
                  Stuur uw aanvraag
                </Link>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.35}>
          <section className="bg-white py-16 md:py-20">
            <div className="mx-auto max-w-4xl px-6">
              <h2 className="text-[30px] font-bold leading-tight text-[#1a2c3d] md:text-[34px]">
                FAQ lekdetectie Antwerpen
              </h2>
              <div className="mt-8 space-y-6">
                {[
                  {
                    question: 'Welke soorten lekken sporen jullie op?',
                    answer:
                      'We detecteren lekken in waterleidingen, verwarmingscircuits, vloerverwarming, daken en afvoerbuizen. Ook condensatie- en infiltratieproblemen brengen we in kaart.',
                  },
                  {
                    question: 'Hoe groot is de kans op breekwerk?',
                    answer:
                      'In 90% van de gevallen lokaliseren we het lek zonder breekwerk. Enkel wanneer structurele herstellingen nodig zijn, openen we plaatselijk de muur of vloer.',
                  },
                  {
                    question: 'Kunnen jullie met aannemers en verzekeringsdeskundigen samenwerken?',
                    answer:
                      'Zeker. We stemmen planning en rapportage af met uw aannemer, syndicus of expert zodat herstelwerken vlot verlopen.',
                  },
                  {
                    question: 'Is lekdetectie terugbetaalbaar?',
                    answer:
                      'Veel verzekeringen dekken lekdetectie en gevolgschade. Dankzij ons gedetailleerde rapport voldoet u aan de meeste polisvoorwaarden.',
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

export default LekdetectiePage;
