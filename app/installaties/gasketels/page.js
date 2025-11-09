import TopHeader from '@/components/sections/top-header';
import MainNavigation from '@/components/sections/main-navigation';
import BrandLogosCarousel from '@/components/sections/brand-logos-carousel';
import ReviewsSection from '@/components/sections/reviews-section';
import Footer from '@/components/sections/footer';
import WhatsAppFloatButton from '@/components/sections/whatsapp-float-button';
import CookieConsentBanner from '@/components/sections/cookie-consent-banner';
import GoogleRatingWidget from '@/components/sections/google-rating-widget';

const Hero = () => (
  <section className="bg-[#0f2740] py-20 text-white md:py-24">
    <div className="container mx-auto px-6">
      <h1 className="text-[34px] font-bold leading-tight md:text-[44px] lg:text-[52px]">
        Installatie van uw gasketel
      </h1>
      <p className="mt-2 text-lg tracking-wide uppercase text-[#9fe6d8]">
        Plaatsing of vervanging van uw ketel
      </p>
      <p className="mt-6 max-w-3xl text-base text-white/80 md:text-lg">
        Upgrade naar een efficiëntere en betrouwbare gasketel. Is uw huidige ketel oud, inefficiënt of storingsgevoelig?
        Dan is het tijd om te upgraden en optimaal comfort te ervaren. Wij bieden professionele gasketelvervanging met
        expertise en toewijding.
      </p>
    </div>
  </section>
);

const WhyReplace = () => (
  <section className="bg-white py-16 md:py-20">
    <div className="container mx-auto px-6">
      <h2 className="text-[28px] font-bold leading-tight text-[#1a2c3d] md:text-[32px]">
        Waarom zou u uw gasketel vervangen?
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {['Milieuvriendelijk', 'Verbeterde efficiëntie', 'Geavanceerde functies', 'Betrouwbaarheid en veiligheid'].map(
          (item) => (
            <div key={item} className="rounded-xl border border-[#e4edf0] bg-[#f8fbfc] p-5 text-sm text-[#4a5d58]">
              <strong className="block text-base text-[#1a2c3d]">{item}</strong>
            </div>
          )
        )}
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
          '✅ Betere efficiëntie – Moderne gasketels verbruiken minder energie, verlagen uw energiekosten en verkleinen uw ecologische voetafdruk.',
          '✅ Betrouwbaar & veilig – Geen zorgen over storingen of risico’s, geniet zorgeloos van warmte.',
          '✅ Slimme technologie – Programmeerbare thermostaten en intelligente regelingen zorgen voor optimaal gebruiksgemak.',
          '✅ Milieuvriendelijk – Minder uitstoot en een duurzamere keuze voor de toekomst.',
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
          '✅ Aanpassingen aan uw verwarmingssysteem – Op maat van uw behoeften.',
          '✅ Professionele service – Deskundig advies en vakkundige installatie.',
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
              'Ons ervaren team zorgt voor een nauwkeurige installatie, afgestemd op jouw wensen en de nieuwste technieken.',
          },
          {
            title: 'Maatwerkoplossingen',
            description:
              'Elk huis is uniek. Van nieuwe gasketels tot uitbreidingen of leidingaanpassingen, wij leveren kwaliteitswerk op maat.',
          },
          {
            title: 'Betrouwbare resultaten',
            description:
              'We werken met hoogwaardige materialen en hanteren strikte kwaliteitsnormen voor installaties die lang meegaan.',
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

const ContactSection = () => (
  <section className="bg-[#1a2c3d] py-16 text-white">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-[30px] font-bold leading-tight md:text-[36px]">Bel ons – Maak meteen uw afspraak</h2>
      <p className="mt-3 text-base text-white/80">
        Heeft u een vraag, feedback of wilt u meer weten over onze diensten? Wij staan voor u klaar!
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href="tel:0495799899"
          className="inline-flex items-center justify-center rounded-md bg-[#2f7a6f] px-8 py-3 text-sm font-semibold uppercase text-white transition-transform duration-150 hover:scale-[1.03]"
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

const GasketelsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopHeader />
      <MainNavigation />
      <main>
        <Hero />
        <WhyReplace />
        <Efficiency />
        <Works />
        <Highlights />
        <BrandLogosCarousel />
        <ReviewsSection />
        <ContactSection />
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

