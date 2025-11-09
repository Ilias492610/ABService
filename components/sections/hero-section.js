'use client';

import { usePathname } from 'next/navigation';

const HeroSectionHome = () => (
  <section className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white py-32 overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center opacity-20"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920')" }}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/90" />
    <div className="relative container mx-auto px-4">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide mb-4 text-gray-300">
          Onderhoud • Herstelling • Installatie
        </p>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          De specialist in gasketels
          <br />
          <span className="text-[#2C9BA0]">rond Antwerpen en de Kempen</span>
        </h1>
        <p className="text-xl text-gray-200 mb-8 leading-relaxed">
          Wij zorgen voor een veilige en efficiënte werking van jouw verwarmingssysteem, zodat u altijd kunt genieten van warmte en comfort.
        </p>
        <div className="flex flex-col gap-4">
          <a
            href="/contact"
            className="bg-[#2C9BA0] hover:bg-[#1a7c80] text-white px-8 py-4 rounded-lg font-semibold transition-colors text-center"
          >
            Maak afspraak online
          </a>
          <a
            href="tel:0495799899"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-center"
          >
            Bel voor een afspraak
          </a>
        </div>
      </div>
    </div>
  </section>
);

const HeroSectionKeuring = () => (
  <section className="bg-[#e8ebed] py-16 md:py-20 lg:py-24">
    <div className="container mx-auto px-6 text-center md:px-10">
      <h1 className="text-[32px] font-bold leading-[1.2] tracking-[-0.02em] text-[#1a3847] md:text-[40px] lg:text-5xl">
        Keuring &amp; indienstname van uw gasketel
      </h1>
      <p className="mt-4 text-lg text-[#4a5d58]">
        Laat uw installatie keuren door een erkende technicus en verwarm zonder zorgen.
      </p>
    </div>
  </section>
);

const HeroSection = () => {
  const pathname = usePathname();

  if (pathname?.startsWith('/keuring')) {
    return <HeroSectionKeuring />;
  }

  return <HeroSectionHome />;
};

export default HeroSection;
