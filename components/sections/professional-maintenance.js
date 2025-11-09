'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

const maintenanceHighlights = [
  'Wettelijke verplichting en geldige garantie',
  'Veilige werking – controle op lekken en verbranding',
  'Optimaal rendement en lagere energiekosten',
];

const repairHighlights = [
  'Snelle diagnose en herstelling',
  'Veiligheid gegarandeerd',
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
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2f7a6f]">
              verzekerd van optimale prestaties
            </p>
            <h2 className="mt-4 text-[28px] font-bold leading-[1.3] text-[#1a2c3d] md:text-[32px]">
              Professioneel onderhoud van uw cv-ketel
            </h2>
            <div className="mt-6 space-y-4 text-base leading-[1.6] text-[#5a6c7d]">
              <p>
                Bij <span className="font-semibold text-[#1a2c3d]">Verwarming Bros</span> houden we uw gasketel in topconditie. Regelmatig onderhoud is essentieel voor een veilige, efficiënte en betrouwbare werking van uw installatie.
              </p>
              <p>
                Door ons onderhoud voorkomt u storingen, verlengt u de levensduur van de ketel en blijft uw garantie geldig. Zo geniet u het hele jaar door van zorgeloze warmte.
              </p>
            </div>
            <ul className="mt-6 space-y-4 text-[#5a6c7d]">
              {maintenanceHighlights.map((item) => (
                <li key={item} className="flex items-start">
                  <Check className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-[#2f7a6f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <p className="text-base text-[#5a6c7d]">vanaf</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-[#2f7a6f]">€ 160</span>
                <span className="text-sm font-semibold text-[#5a6c7d]">excl. btw</span>
              </div>
            </div>
            <a
              href="tel:0495799899"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-[#2f7a6f] px-7 py-3.5 text-sm font-semibold uppercase text-white shadow-[0_2px_4px_rgba(43,122,109,0.15)] transition-colors hover:bg-[#27685f]"
            >
              Plan onderhoud
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="lg:pl-10">
            <div className="overflow-hidden rounded-2xl border-[18px] border-[#2f7a6f]">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/672c335b-5eb0-457c-9053-b96b5a0b4e0e-verwarmingbros-be/assets/images/onderhoud-2.jpg"
                alt="Technieker voert onderhoud uit"
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
  }

  return (
    <section className="bg-white py-16 md:py-20 lg:py-[120px]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-y-12 gap-x-16 px-6 lg:grid-cols-2 lg:px-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2f7a6f]">
            verzekerd van optimale prestaties
          </p>
          <h2 className="mt-4 text-[28px] font-bold leading-[1.3] text-[#1a2c3d] md:text-[32px]">
            Professionele herstelling van uw cv-ketel
          </h2>
          <div className="mt-6 space-y-4 text-base leading-[1.6] text-[#5a6c7d]">
            <p>
              Bij <span className="font-semibold text-[#1a2c3d]">Verwarming Bros</span> herstellen we alle merken en types gasketels. Onze ervaren techniekers sporen storingen snel op en zorgen voor een duurzame oplossing zodat u opnieuw comfortabel kan verwarmen.
            </p>
            <p>
              Een defecte ketel kan leiden tot gevaarlijke situaties, hogere energiekosten of uitval tijdens koude dagen. Laat ons het probleem tijdig oplossen en voorkom onverwachte verrassingen.
            </p>
          </div>
          <ul className="mt-6 space-y-4 text-[#5a6c7d]">
            {repairHighlights.map((item) => (
              <li key={item} className="flex items-start">
                <Check className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-[#2f7a6f]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <p className="text-base text-[#5a6c7d]">vanaf</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-[#2f7a6f]">€ 140</span>
              <span className="text-sm font-semibold text-[#5a6c7d]">excl. btw</span>
            </div>
          </div>
          <a
            href="tel:0495799899"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-[#2f7a6f] px-7 py-3.5 text-sm font-semibold uppercase text-white shadow-[0_2px_4px_rgba(43,122,109,0.15)] transition-colors hover:bg-[#27685f]"
          >
            Bel ons voor een afspraak
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="lg:pl-10">
          <div className="overflow-hidden rounded-2xl border-[18px] border-[#2f7a6f]">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/672c335b-5eb0-457c-9053-b96b5a0b4e0e-verwarmingbros-be/assets/images/onderhoud-2.jpg"
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
