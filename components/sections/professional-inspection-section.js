import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

const checklistItems = [
  'Keuring door een lokale erkende technicus uit Antwerpen',
  'Zekerheid van conforme installatie en veilige werking',
  'Voldoet aan de Vlaamse en stedelijke verplichtingen',
  'Officieel keuringsrapport en verbrandingsattest',
];

const ProfessionalInspectionSection = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-y-12 px-4 py-10 md:px-6 md:py-[60px] lg:grid-cols-10 lg:gap-x-10 lg:px-8 lg:py-20">
        <div className="lg:col-span-4">
          <div className="relative lg:p-5">
            <div className="relative">
              <Image
                src="/keuringsrapport.png"
                alt="Technici die een cv-installatie inspecteren"
                width={550}
                height={660}
                unoptimized
                className="relative z-10 h-auto w-full rounded-2xl object-cover shadow-[0_8px_24px_rgba(0,0,0,0.12)] border-[12px] border-donkerblauw"
              />
              <div className="absolute -bottom-6 -right-6 -z-10 h-4/5 w-4/5 rounded-2xl bg-donkerblauw opacity-80" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <h6 className="text-xs font-semibold uppercase tracking-[1px] text-donkerblauw">
            Keuringsrapporten voor Antwerpse gasinstallaties
          </h6>
          <h2 className="mt-4 text-2xl font-bold leading-[1.3] text-[#1a1a2e] md:text-[28px] lg:text-[36px]">
            Professionele keuring van uw cv-installatie
          </h2>
          <p className="mt-6 text-base leading-[1.6] text-[#4a4a4a]">
            Bij AB Service verzorgen we de indienststelling van nieuwe toestellen in Antwerpen en omgeving. Voor u uw centrale stooktoestel in gebruik neemt, is een keuring door een erkende technicus verplicht.
          </p>
          <h3 className="mt-8 text-lg font-semibold text-[#1a1a2e]">
            Waarom is een keuring essentieel?
          </h3>
          <ul className="mt-4 space-y-3 text-[#1a1a2e]">
            {checklistItems.map((item) => (
              <li key={item} className="flex items-start">
                <Check className="mt-1 h-4 w-4 flex-shrink-0 text-donkerblauw" />
                <span className="ml-2 text-base">{item}</span>
              </li>
            ))}
          </ul>
          <a
            href="tel:0484906966"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-donkerblauw px-8 py-[14px] text-base font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[#0e2a3d]"
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
