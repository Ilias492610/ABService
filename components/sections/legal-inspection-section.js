import { CheckCircle2 } from 'lucide-react';

const checklistItems = [
  {
    title: 'Veiligheid eerst',
    description: 'Controle op correcte plaatsing en mogelijke risico’s zoals koolmonoxide.',
  },
  {
    title: 'Optimale prestaties',
    description: 'Een goed afgestelde ketel werkt energiezuinig en betrouwbaar.',
  },
  {
    title: 'Voldoe aan de wet',
    description: 'Voorkom boetes en verzekeringsproblemen met een geldig keuringsrapport.',
  },
];

const LegalInspectionSection = () => {
  return (
    <section className="bg-[#f5f7f9]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-y-6 px-4 py-10 sm:px-6 md:py-[60px] lg:grid-cols-10 lg:gap-x-12 lg:px-8 lg:py-20">
        <div className="text-center lg:col-span-3 lg:text-left">
          <h6 className="text-xs font-semibold uppercase tracking-[0.1em] text-[#2d7b6f]">
            Wettelijk verplicht
          </h6>
        </div>
        <div className="lg:col-span-7">
          <h2 className="mb-6 text-[22px] font-bold leading-[1.3] text-[#1a1a2e] md:text-[26px] lg:text-[32px]">
            Verplichte keuring bij ingebruikname van uw cv-installatie
          </h2>
          <p className="mb-6 text-base leading-relaxed text-[#5a6c7d]">
            Laat uw nieuwe of aangepaste cv-installatie keuren door onze erkende technici. U ontvangt een officieel keuringsrapport en verbrandingsattest, zodat u met een gerust hart kunt verwarmen.
          </p>
          <ul className="space-y-4">
            {checklistItems.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-[#10B981]" />
                <p className="text-base text-[#1a1a2e]">
                  <span className="font-semibold">{item.title}</span> – {item.description}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-base font-semibold text-[#2d7b6f]">
            Laat uw installatie tijdig keuren en voorkom onverwachte problemen.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LegalInspectionSection;
