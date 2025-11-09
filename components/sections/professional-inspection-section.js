import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

const checklistItems = [
  'Keuring door erkende technicus',
  'Zekerheid van conforme installatie en werking',
  'Wettelijke verplichting',
  'Officieel keuringsrapport',
];

const ProfessionalInspectionSection = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-y-12 px-4 py-10 md:px-6 md:py-[60px] lg:grid-cols-10 lg:gap-x-10 lg:px-8 lg:py-20">
        <div className="lg:col-span-4">
          <div className="relative lg:p-5">
            <div className="relative">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/635b2754-7bb1-4d9b-b25b-66d3de6e22f4-verwarmingbros-be/assets/images/keuring-1-2.jpg"
                alt="Technici die een cv-installatie inspecteren"
                width={460}
                height={552}
                unoptimized
                className="relative z-10 h-auto w-full rounded-2xl object-cover shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
              />
              <div className="absolute -bottom-4 -right-4 -z-0 h-3/5 w-3/5 rounded-2xl bg-[#2d7b6f]" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <h6 className="text-xs font-semibold uppercase tracking-[1px] text-[#2d7b6f]">
            Keuringsrapporten van alle gas installaties
          </h6>
          <h2 className="mt-4 text-2xl font-bold leading-[1.3] text-[#1a1a2e] md:text-[28px] lg:text-[36px]">
            Professionele keuring van uw cv-installatie
          </h2>
          <p className="mt-6 text-base leading-[1.6] text-[#4a4a4a]">
            Bij Verwarming Bros begrijpen we het belang van een perfect functionerende verwarmingsinstallatie. Voor u uw centrale stooktoestel in gebruik neemt, is een keuring door een erkende technicus verplicht.
          </p>
          <h3 className="mt-8 text-lg font-semibold text-[#1a1a2e]">
            Waarom is een keuring essentieel?
          </h3>
          <ul className="mt-4 space-y-3 text-[#1a1a2e]">
            {checklistItems.map((item) => (
              <li key={item} className="flex items-start">
                <Check className="mt-1 h-4 w-4 flex-shrink-0 text-[#2d7b6f]" />
                <span className="ml-2 text-base">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <p className="text-xs text-gray-500">vanaf</p>
            <p className="text-5xl font-bold leading-none text-[#2d7b6f]">€ 180</p>
            <p className="text-sm text-gray-500">excl. btw</p>
          </div>
          <a
            href="tel:0495799899"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-[#2d7b6f] px-8 py-[14px] text-base font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[#1f5f54]"
          >
            Bel ons voor een afspraak
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalInspectionSection;
