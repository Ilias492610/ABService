import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const checklistItems = [
  'Transparante service – rapport met naam, erkenningsnummer en handtekening van de technicus.',
  'Verplicht bij verhuur – wij zorgen dat de huurder een kopie ontvangt.',
  'Voor nieuwe installaties en wijzigingen – voldoet aan alle wettelijke eisen.',
];

const SimpleInspectionSection = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-10 md:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col items-center text-center">
          <h6 className="mb-4 text-xs font-semibold uppercase tracking-[1px] text-[#2d7b6f]">
            Eenvoudig en probleemloos
          </h6>
          <h2 className="mb-6 text-[22px] font-bold leading-[1.3] text-[#1a1a2e] md:text-[26px] lg:text-[32px]">
            Eenvoudige en zorgeloze keuring
          </h2>
          <p className="mb-8 max-w-3xl text-base leading-relaxed text-[#5a6c7d]">
            Wij maken de keuringsprocedure snel en eenvoudig. Onze erkende technici inspecteren uw cv-installatie grondig en bezorgen u een officieel keuringsrapport met het verbrandingsattest.
          </p>
          <ul className="w-full max-w-2xl space-y-4 text-left">
            {checklistItems.map((item) => (
              <li key={item} className="flex items-start gap-2 text-base text-[#1a1a2e]">
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-[#10B981]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-base font-semibold text-[#2d7b6f]">
            Maak vandaag nog een afspraak en verwarm zonder zorgen!
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-[#2d7b6f] px-8 py-[14px] text-base font-semibold uppercase text-white transition-transform duration-200 hover:scale-[1.02] hover:bg-[#1f5f54]"
          >
            Maak online een afspraak
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SimpleInspectionSection;
