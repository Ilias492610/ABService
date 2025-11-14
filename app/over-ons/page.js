import Image from 'next/image';
import Link from 'next/link';

import TopHeader from '@/components/sections/top-header';
import MainNavigation from '@/components/sections/main-navigation';
import Footer from '@/components/sections/footer';
import CookieConsentBanner from '@/components/sections/cookie-consent-banner';
import WhatsAppFloatButton from '@/components/sections/whatsapp-float-button';
import GoogleRatingWidget from '@/components/sections/google-rating-widget';
import FadeInSection from '@/components/animations/FadeInSection';

export const metadata = {
  title: 'Over AB Service | Loodgieter Antwerpen sinds 2004',
  description:
    'Maak kennis met AB Service: loodgieters met meer dan 20 jaar ervaring in Antwerpen voor lekdetectie, sanitair en gasketelonderhoud.',
};

const values = [
  {
    title: 'Lokale verankering',
    description:
      'Onze werkplaats bevindt zich in Antwerpen. We kennen elke wijk en staan snel bij klanten in de stad en randgemeenten.',
  },
  {
    title: 'Persoonlijke service',
    description:
      'We werken met een vast team dat elke opdracht opvolgt. Heldere communicatie en duidelijke afspraken staan centraal.',
  },
  {
    title: 'Technische expertise',
    description:
      'We investeren voortdurend in opleiding en meetapparatuur zodat we elk sanitair en verwarmingsprobleem efficiënt oplossen.',
  },
  {
    title: 'Service na oplevering',
    description:
      'Ook na de werken blijven we beschikbaar voor onderhoud, nazorg en snelle interventies. Klanten krijgen prioriteit bij spoedgevallen.',
  },
];

const teamMembers = [
  {
    name: 'Technisch team',
    role: 'Senior loodgieters',
    description:
      'Ervaren loodgieters die elk project in Antwerpen begeleiden van diagnose tot afwerking.',
  },
  {
    name: 'Planning & support',
    role: 'Klantendienst',
    description:
      'Coördineert alle afspraken, volgt dossiers op en houdt klanten op de hoogte tijdens de werken.',
  },
  {
    name: 'Sanitair specialisten',
    role: 'Sanitair & afwerking',
    description:
      'Zorgen voor nette sanitairwerken, afwerking op maat en duurzame materialen.',
  },
  {
    name: 'Interventieploeg',
    role: 'Onderhoud & herstellingen',
    description:
      'Staat klaar voor onderhoud, herstellingen en keuringen met duidelijke rapportage.',
  },
];

const OverOnsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
      <MainNavigation />
      <main>
        <FadeInSection>
          <section className="bg-[#0f1e25] py-16 text-white md:py-20 lg:py-24">
            <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                Over AB Service
              </p>
              <h1 className="text-[36px] font-bold leading-tight md:text-[46px]">
                Loodgieterij met hart voor Antwerpen en haar bewoners
              </h1>
              <p className="text-base leading-relaxed text-white/80 md:text-lg">
                We zijn loodgieters met meer dan 20 jaar ervaring in het plaatsen, herstellen en onderhouden van sanitair en verwarming. Met een deskundig team en moderne technologie helpen we particulieren, appartementen, horeca en bedrijven.
              </p>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <section className="bg-white py-16 md:py-20">
            <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[minmax(0,_3fr)_minmax(0,_2fr)] md:gap-16">
              <article>
                <h2 className="text-[30px] font-bold leading-tight text-[#1a2c3d] md:text-[34px]">
                  Onze geschiedenis in een notendop
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#5a6c7d]">
                  In 2004 startte AB Service als zelfstandige loodgieter in Antwerpen. Door mond-tot-mondreclame groeiden we uit tot een vaste waarde met een compact kernteam en een netwerk van gespecialiseerde partners voor elektriciteit, tegelwerk en schrijnwerk.
                </p>
                <p className="mt-4 text-base leading-relaxed text-[#5a6c7d]">
                  We investeren in professionele meetapparatuur, permanente opleiding en een moderne planningstool. Zo combineren we ambacht met technologie en blijven we flexibel voor spoedinterventies.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-sm uppercase text-[#ffb703]">
                  <span>SNELLE INTERVENTIES</span>
                  <span>VOCHT- EN LEKDETECTIE</span>
                  <span>SANITAIR & RENOVATIE</span>
                  <span>ERVAREN PROJECTLEIDING</span>
                </div>
              </article>
              <aside className="rounded-2xl bg-[#f6faf9] p-6 shadow-sm md:p-10">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src="/Technici.png"
                    alt="Team loodgieters van AB Service uit Antwerpen"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 text-sm text-[#5a6c7d]">
                  Klanten waarderen onze persoonlijke aanpak en stiptheid.
                </p>
              </aside>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <section className="bg-[#f7f9fa] py-16 md:py-20">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="text-center text-[30px] font-bold leading-tight text-[#1a2c3d] md:text-[34px]">
                Onze waarden
              </h2>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {values.map((value) => (
                  <div key={value.title} className="rounded-xl border border-[#d9e4ea] bg-white p-6">
                    <h3 className="text-lg font-semibold text-[#1a2c3d]">{value.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5a6c7d]">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.25}>
          <section className="bg-white py-16 md:py-20">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="text-[30px] font-bold leading-tight text-[#1a2c3d] md:text-[34px]">
                Maak kennis met het team
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {teamMembers.map((member) => (
                  <div key={member.name} className="rounded-xl border border-[#e1e9ed] bg-[#f9fbfc] p-6">
                    <h3 className="text-lg font-semibold text-[#1a2c3d]">{member.name}</h3>
                    <p className="text-sm uppercase tracking-wide text-[#ffb703]">{member.role}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#5a6c7d]">{member.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.3}>
          <section className="bg-[#f7f9fa] py-16 md:py-20">
            <div className="mx-auto max-w-5xl px-6 text-center">
              <h2 className="text-[30px] font-bold leading-tight text-[#1a2c3d] md:text-[34px]">
                Partners & erkenningen
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#5a6c7d]">
                We werken samen met erkende leveranciers, verzekeringsdeskundigen en architecten. Dankzij onze certificaten
                voor gasinstallaties en lekdetectie voldoen we aan alle veiligheidsnormen.
              </p>
              <p className="mt-6 text-sm text-[#5a6c7d]">
                Voor dossiers van verzekeringsmaatschappijen leveren we de nodige rapporten en attesten aan. Particulieren
                en bedrijven kunnen rekenen op transparante communicatie en duidelijke prijsafspraken.
              </p>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.35}>
          <section className="bg-white py-16 md:py-20">
            <div className="mx-auto max-w-5xl px-6 text-center">
              <h2 className="text-[30px] font-bold leading-tight text-[#1a2c3d] md:text-[34px]">
                Samenwerken?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#5a6c7d]">
                Bent u syndicus, verzekeringsmakelaar of aannemer? We bouwen graag een duurzame samenwerking uit.
                Contacteer ons en we plannen een kennismakingsgesprek.
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
                  Contact opnemen
                </Link>
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

export default OverOnsPage;
