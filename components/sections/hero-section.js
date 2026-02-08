'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

const HeroSectionHome = () => (
  <section className="relative w-full overflow-hidden bg-gray-900 pt-20 pb-16 text-white">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('/achtergrond.png')" }}
    />
    <div className="absolute inset-0 bg-[#0f1e25]/90" />
    <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center">
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
        Warmtespecialist Antwerpen & Omgeving
      </p>
      <h1 className="mb-6 text-[42px] font-bold leading-tight md:text-[50px] lg:text-[54px]">
        Loodgieter en warmtespecialist in Antwerpen voor onderhoud en herstellingen
      </h1>
      <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
        Voor gasketelonderhoud, loodgieterswerk, sanitair herstel en erkende keuringen rekent u op AB Service. Onze loodgieters en warmtespecialisten plannen snel een afspraak in Antwerpen, Deurne, Wilrijk, Merksem en omliggende gemeenten.
      </p>
      
      {/* 20 jaar ervaring badge - subtle */}
      <div className="mb-8">
        <Image
          src="/20-jaar-ervaring-logo.svg"
          alt="20 jaar ervaring"
          width={96}
          height={96}
          className="mx-auto h-auto w-20 opacity-70 md:w-24"
        />
      </div>

      <div className="mb-12 flex w-full max-w-sm flex-col gap-4">
        <a
          href="tel:0484906966"
          className="w-full rounded-md bg-[#ffb703] px-8 py-4 text-sm font-semibold uppercase tracking-wide text-[#0f1e25] transition-colors hover:bg-[#ffd166]"
        >
          Bel voor een afspraak
        </a>
        <a
          href="/contact"
          className="w-full rounded-md border border-white/70 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-[#0f1e25]"
        >
          Maak afspraak online
        </a>
      </div>
    </div>
  </section>
);

// Keuring variant and router-based switch (restored)
const HeroSectionKeuring = () => (
  <section className="bg-donkerblauw py-16 md:py-20 lg:py-24">
    <div className="container mx-auto px-6 text-center md:px-10">
      <h1 className="text-[32px] font-bold leading-[1.2] tracking-[-0.02em] text-white md:text-[40px] lg:text-5xl">
        Keuring &amp; indienstname van uw gasketel
      </h1>
      <p className="mt-4 text-lg text-white/80">
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
