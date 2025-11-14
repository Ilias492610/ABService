'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

const maintenanceHighlights = [
  'Lokale Antwerpse techniekers met erkende certificaten',
  'Veilige werking dankzij verbrandings- en lektesten',
  'Optimaal rendement en lagere energiekosten',
];

const repairHighlights = [
  'Snelle diagnose en herstelling in elke Antwerpse wijk',
  'Veiligheid gegarandeerd bij gas- en waterproblemen',
  'Originele onderdelen en vakmanschap',
];

const ProfessionalMaintenance = () => {
  const pathname = usePathname();
  const isMaintenancePage = pathname?.startsWith('/onderhoud');

  if (isMaintenancePage) {
    return (
      <section className="bg-white py-16 md:py-20 lg:py-[120px]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-y-12 gap-x-16 px-6 lg:grid-cols-2 lg:px-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-donkerblauw">
              verzekerd van optimale prestaties in antwerpen
            </p>
            <h2 className="mt-4 text-[28px] font-bold leading-[1.3] text-[#1a2c3d] md:text-[32px]">
              Professioneel onderhoud van uw cv-installatie
            </h2>
            <div className="mt-6 space-y-4 text-base leading-[1.6] text-[#5a6c7d]">
              <p>
                Bij <span className="font-semibold text-[#1a2c3d]">AB Service</span> houden we gasketels, sanitair en airco in topconditie. Vanuit Antwerpen vertrekken we dagelijks voor onderhoud bij particulieren en bedrijven.
              </p>
              <p>
                Een periodieke controle voorkomt storingen, verlengt de levensduur van uw installatie en houdt uw garantie geldig. Zo geniet u het hele jaar door van zorgeloze warmte.
              </p>
            </div>
            <ul className="mt-6 space-y-4 text-[#5a6c7d]">
              {maintenanceHighlights.map((item) => (
                <li key={item} className="flex items-start">
                  <Check className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-donkerblauw" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="tel:0484906966"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-donkerblauw px-7 py-3.5 text-sm font-semibold uppercase text-white shadow-[0_2px_4px_rgba(21,58,91,0.15)] transition-colors hover:bg-[#0e2a3d]"
            >
              Plan onderhoud in Antwerpen
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="lg:pl-10">
            <div className="overflow-hidden rounded-2xl border-[12px] border-donkerblauw bg-donkerblauw">
              <Image
                src="/Onderhoudpagina.png"
                alt="Technieker voert onderhoud uit"
                width={800}
                height={533}
                unoptimized
                className="h-auto w-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 md:py-20 lg:py-[120px]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-y-12 gap-x-16 px-6 lg:grid-cols-2 lg:px-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-donkerblauw">
            snelle hulp in antwerpen
          </p>
          <h2 className="mt-4 text-[28px] font-bold leading-[1.3] text-[#1a2c3d] md:text-[32px]">
            Professionele herstelling van uw cv-ketel
          </h2>
          <div className="mt-6 space-y-4 text-base leading-[1.6] text-[#5a6c7d]">
            <p>
              Bij <span className="font-semibold text-[#1a2c3d]">AB Service</span> herstellen we alle merken en types gasketels. Onze techniekers zijn binnen Antwerpen snel ter plaatse en zorgen voor een duurzame oplossing zodat u opnieuw comfortabel kan verwarmen.
            </p>
            <p>
              Een defecte ketel kan leiden tot gevaarlijke situaties, hogere energiekosten of uitval tijdens koude dagen. Laat ons het probleem tijdig oplossen en voorkom onverwachte verrassingen.
            </p>
          </div>
          <ul className="mt-6 space-y-4 text-[#5a6c7d]">
            {repairHighlights.map((item) => (
              <li key={item} className="flex items-start">
                <Check className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-donkerblauw" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a
            href="tel:0484906966"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-donkerblauw px-7 py-3.5 text-sm font-semibold uppercase text-white shadow-[0_2px_4px_rgba(21,58,91,0.15)] transition-colors hover:bg-[#0e2a3d]"
          >
            Bel ons voor een afspraak
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="lg:pl-10">
          <div className="overflow-hidden rounded-2xl border-[18px] border-donkerblauw">
            <Image
              src="/boiler.png"
              alt="Technici inspecteren een cv-ketel"
              width={580}
              height={387}
              unoptimized
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalMaintenance;
