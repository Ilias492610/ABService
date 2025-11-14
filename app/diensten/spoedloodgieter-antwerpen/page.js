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
  title: 'Spoedloodgieter Antwerpen | 24/7 AB Service',
  description:
    'AB Service is de spoedloodgieter in Antwerpen voor lekken, verstoppingen en verwarmingsproblemen. 24/7 bereikbaar en binnen het uur ter plaatse in alle districten.',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Wat kost een spoedloodgieter in Antwerpen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Een spoedinterventie in Antwerpen start vanaf €95 excl. btw. Na telefonisch contact ontvangt u meteen een indicatie van de totale kost op basis van uw situatie en het benodigde materiaal.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hoe snel kan AB Service ter plaatse zijn?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wij zijn 24/7 bereikbaar en streven ernaar om binnen 60 minuten ter plaatse te zijn in Antwerpen centrum, Deurne, Berchem, Merksem, Wilrijk en omliggende gemeenten.',
      },
    },
    {
      '@type': 'Question',
      name: 'Welke spoedproblemen lossen jullie op?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wij verhelpen dringende lekken, gesprongen leidingen, verstopte afvoeren, defecte boilers, cv-storingen en andere urgente sanitairproblemen. We laten alles proper achter en geven advies om herhaling te voorkomen.',
      },
    },
  ],
};

const coverageAreas = [
  'Antwerpen centrum',
  'Berchem',
  'Borgerhout',
  'Deurne',
  'Hoboken',
  'Merksem',
  'Wilrijk',
  'Edegem',
  'Schoten',
  'Zwijndrecht',
];

const SpoedLoodgieterPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Script id="faq-schema-spoed" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqJsonLd)}
      </Script>
      <TopHeader />
      <MainNavigation />
      <main>
        <FadeInSection>
          <section className="bg-[#0f1e25] py-16 text-white md:py-20 lg:py-24">
            <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                24/7 spoedloodgieter Antwerpen
              </p>
              <h1 className="text-[36px] font-bold leading-tight md:text-[46px]">
                Een lek of verstopping? Wij staan binnen het uur bij u voor de deur
              </h1>
              <p className="text-base leading-relaxed text-white/80 md:text-lg">
                AB Service biedt dag en nacht hulp bij gesprongen leidingen, waterlekken, verstopte afvoeren en
                cv-storingen. Onze ervaren loodgieters vertrekken vanuit Antwerpen en komen onmiddellijk naar uw
                woning of zaak, met volledig uitgeruste servicewagens.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                <a
                  href="tel:0484906966"
                  className="inline-flex items-center justify-center rounded-md bg-[#ffb703] px-8 py-3 text-sm font-semibold uppercase text-[#0f1e25] transition-colors hover:bg-[#ffd166]"
                >
                  Bel nu voor spoedservice
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md border border-white/60 px-8 py-3 text-sm font-semibold uppercase text-white transition-colors hover:bg-white hover:text-[#0f1e25]"
                >
                  Vraag een interventie aan
                </Link>
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <section className="bg-white py-16 md:py-20">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:gap-12">
              <article>
                <h2 className="text-[30px] font-bold leading-tight text-[#1a2c3d] md:text-[34px]">
                  Waarmee kunnen we u direct helpen?
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#5a6c7d]">
                  Onze spoedloodgieters lossen elk urgent probleem meteen op, met aandacht voor veiligheid en
                  waterschadebeperking. Tijdens het gesprek krijgt u een duidelijke prijsindicatie en praktische tips
                  om schade te beperken tot onze aankomst.
                </p>
                <ul className="mt-6 space-y-3 text-[#1a2c3d]">
                  {[
                    'Opsporen en dichten van waterlekken in leidingen, kranen en plafonds',
                    'Herstellen of vervangen van gesprongen leidingen en afsluitkranen',
                    'Verwijderen van verstoppingen in keuken, badkamer, toilet en regenput',
                    'Diagnose en reparatie van cv-ketels en warmwaterinstallaties',
                    'Permanente oplossing na noodherstelling met advies op maat',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm md:text-base">
                      <span className="mt-1 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-[#ffb703]" />
                      <span className="text-[#5a6c7d]">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
              <aside className="rounded-2xl bg-[#f6faf9] p-6 shadow-sm md:p-10">
                <h3 className="text-xl font-semibold text-[#1a2c3d]">
                  Transparante tarieven & duidelijke afspraken
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5a6c7d]">
                  Elke interventie start met een gratis telefonische diagnose. Zo weet u precies wat u kunt verwachten,
                  inclusief voorrijkosten en materialen. U ontvangt nadien een interventierapport voor uw verzekering.
                </p>
                <div className="mt-6 grid gap-4 text-sm text-[#5a6c7d]">
                  <div className="rounded-lg border border-[#d9e4ea] bg-white p-4">
                    <p className="font-semibold text-[#1a2c3d]">Spoedinterventie vanaf €95</p>
                    <p className="mt-1">Inclusief diagnose, voorrijkost en eerste hulp binnen het uur.</p>
                  </div>
                  <div className="rounded-lg border border-[#d9e4ea] bg-white p-4">
                    <p className="font-semibold text-[#1a2c3d]">Materialen volgens verbruik</p>
                    <p className="mt-1">We gebruiken kwaliteitsonderdelen zodat de herstelling duurzaam blijft.</p>
                  </div>
                  <div className="rounded-lg border border-[#d9e4ea] bg-white p-4">
                    <p className="font-semibold text-[#1a2c3d]">Tijdige opvolging</p>
                    <p className="mt-1">Na de interventie plannen we indien nodig een structurele herstelling in.</p>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <section className="bg-[#f7f9fa] py-16 md:py-20">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="text-center text-[30px] font-bold leading-tight text-[#1a2c3d] md:text-[34px]">
                Snelle hulp in heel Antwerpen en randgemeenten
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-relaxed text-[#5a6c7d]">
                Dankzij strategisch geplaatste teams kunnen we elke wijk snel bereiken. Wanneer u belt, koppelen we u
                rechtstreeks aan de dichtstbijzijnde technieker die onmiddellijk vertrekt.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {coverageAreas.map((area) => (
                  <div
                    key={area}
                    className="rounded-lg border border-[#d9e4ea] bg-white px-4 py-5 text-center text-sm font-semibold text-[#1a2c3d]"
                  >
                    {area}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-center text-sm text-[#5a6c7d]">
                Ook actief in: Kapellen, Brasschaat, Boom, Kontich en Aartselaar.
              </p>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.25}>
          <section className="bg-white py-16 md:py-20">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[minmax(0,_3fr)_minmax(0,_2fr)] md:gap-14">
              <article>
                <h2 className="text-[30px] font-bold leading-tight text-[#1a2c3d] md:text-[34px]">
                  Hoe verloopt een spoedinterventie?
                </h2>
                <ol className="mt-6 space-y-6">
                  {[
                    {
                      title: '1. Telefonische diagnose',
                      text: 'We analyseren uw probleem en geven meteen advies om de schade te beperken. U ontvangt een inschatting van prijs en aankomsttijd.',
                    },
                    {
                      title: '2. Snelle verplaatsing',
                      text: 'Onze technieker vertrekt direct met een uitgerust servicevoertuig. Bij aankomst wordt de situatie veiliggesteld en wateroverlast gestopt.',
                    },
                    {
                      title: '3. Definitieve oplossing',
                      text: 'We herstellen het probleem of voorzien een tijdelijke oplossing wanneer er extra onderdelen nodig zijn. Nadien krijgt u een interventierapport.',
                    },
                  ].map((step) => (
                    <li key={step.title} className="rounded-xl border border-[#e1e9ed] bg-[#f9fbfc] p-5">
                      <p className="text-sm font-semibold uppercase tracking-wide text-[#ffb703]">
                        {step.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[#5a6c7d]">{step.text}</p>
                    </li>
                  ))}
                </ol>
              </article>
              <aside className="rounded-2xl bg-[#0f1e25] p-8 text-white">
                <h3 className="text-xl font-semibold">Veelvoorkomende spoedsituaties</h3>
                <ul className="mt-4 space-y-3 text-sm text-white/80">
                  <li>Overlopende regenputten of kelders na hevige regenval</li>
                  <li>Barstende leidingen door vorst of ouderdom</li>
                  <li>Verstopt toilet in horeca of kantoor</li>
                  <li>Plotselinge cv-storing tijdens koude periodes</li>
                  <li>Warmwaterproductie valt volledig weg</li>
                </ul>
                <p className="mt-6 text-sm text-white/80">
                  Hulp nodig bij structurele werken? Lees meer over onze{' '}
                  <Link href="/diensten/lekdetectie-antwerpen" className="underline">
                    lekdetectie in Antwerpen
                  </Link>{' '}
                  en{' '}
                  <Link href="/diensten/badkamer-renovatie-antwerpen" className="underline">
                    badkamer renovaties
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
                Klaar voor een snelle interventie?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#5a6c7d]">
                Bel ons en een erkende loodgieter vertrekt onmiddellijk naar uw locatie. Voor niet-dringende vragen
                plannen we graag een afspraak in op een moment dat voor u past.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-4 md:flex-row">
                <a
                  href="tel:0484906966"
                  className="inline-flex items-center justify-center rounded-md bg-[#ffb703] px-8 py-3 text-sm font-semibold uppercase text-[#0f1e25] transition-colors hover:bg-[#ffd166]"
                >
                  Bel 24/7 0484 906 966
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
                FAQ over onze spoedloodgieterij in Antwerpen
              </h2>
              <div className="mt-8 space-y-6">
                {[
                  {
                    question: 'Wat kost een spoedloodgieter in Antwerpen?',
                    answer:
                      'De prijs is afhankelijk van de aard van het probleem en de gebruikte materialen. Reken op een starttarief van €95 excl. btw inclusief verplaatsing en eerste hulp. U ontvangt vooraf een duidelijke indicatie.',
                  },
                  {
                    question: 'Hoe snel kunnen jullie langskomen?',
                    answer:
                      'We streven ernaar binnen 60 minuten ter plaatse te zijn. Tijdens piekmomenten houden we u op de hoogte van de exacte aankomsttijd van onze technieker.',
                  },
                  {
                    question: 'Werken jullie ook voor bedrijven en vastgoedbeheerders?',
                    answer:
                      'Ja. We helpen particulieren, winkels, horeca en vastgoedbeheerders. Indien gewenst sluiten we onderhouds- en interventiecontracten af voor prioritair beheer.',
                  },
                  {
                    question: 'Kunnen jullie meteen definitief herstellen?',
                    answer:
                      'In de meeste gevallen wel. Als er specifieke onderdelen nodig zijn die niet voorradig zijn, voorzien we een veilige noodoplossing en plannen we de definitieve herstelling binnen de 24 uur.',
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

export default SpoedLoodgieterPage;
