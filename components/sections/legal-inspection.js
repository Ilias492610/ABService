import { ArrowRight, Check } from 'lucide-react';

const obligations = [
  {
    title: 'Wettelijke verplichting',
    description: 'Een tweejaarlijkse controle is verplicht in Vlaanderen.',
  },
  {
    title: 'Veiligheid & efficiëntie',
    description: 'Voorkomt storingen en zorgt voor optimaal rendement.',
  },
  {
    title: 'Verzekering',
    description: 'Zonder keuringsattest riskeert u problemen bij schadegevallen.',
  },
];

const advantages = [
  {
    title: 'Grondige reiniging',
    description: 'Behoudt het maximale rendement van uw ketel.',
  },
  {
    title: 'Optimale werking',
    description: 'Een correcte afstelling verlaagt het verbruik.',
  },
  {
    title: 'Minder storingen',
    description: 'Voorkomt onverwachte defecten en duurdere herstellingen.',
  },
  {
    title: 'Ervaren techniekers',
    description: 'Wij detecteren problemen vroegtijdig en geven advies.',
  },
];

const LegalInspection = () => {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#2f7a6f]">
            wettelijke verplichting
          </p>
          <h2 className="text-3xl font-bold text-[#1a2c3d] md:text-4xl">
            Tweejaarlijkse keuring is verplicht en slim
          </h2>
          <p className="mt-4 text-base text-[#5a6c7d]">
            Regelmatig onderhoud houdt uw ketel veilig, efficiënt en betrouwbaar. Wij zorgen voor een officieel attest zodat u volledig in orde bent met de regelgeving.
          </p>
          <ul className="mt-8 space-y-4">
            {obligations.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <Check className="mt-1 h-5 w-5 flex-shrink-0 text-[#28a745]" />
                <p className="text-sm leading-relaxed text-[#5a6c7d]">
                  <span className="font-semibold text-[#1a2c3d]">{item.title}</span> – {item.description}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-semibold text-[#1a2c3d]">Voorkom risico’s en plan tijdig een keuring.</p>
          <p className="mt-2 text-sm text-[#5a6c7d]">
            Een slecht onderhouden ketel kan leiden tot gevaarlijke situaties en hoge kosten. Met een grondige controle van Verwarming Bros verwarmt u zorgeloos.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#2f7a6f] px-8 py-3.5 text-sm font-semibold uppercase text-white shadow-[0_2px_4px_rgba(43,122,109,0.15)] transition-colors hover:bg-[#27685f]"
          >
            Maak online een afspraak
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="lg:col-span-5">
          <div className="space-y-4">
            {advantages.map((advantage) => (
              <div key={advantage.title} className="flex items-start justify-between gap-4 rounded-xl bg-[#f4f8f8] p-6">
                <div>
                  <h4 className="text-base font-semibold text-[#1a2c3d]">{advantage.title}</h4>
                  <p className="mt-1 text-sm text-[#5a6c7d]">{advantage.description}</p>
                </div>
                <Check className="mt-1 h-5 w-5 flex-shrink-0 text-[#28a745]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalInspection;
