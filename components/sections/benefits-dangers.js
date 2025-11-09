import { CheckCircle2, TriangleAlert } from 'lucide-react';

const benefits = [
  {
    title: 'Veiligheid',
    description: 'Voorkomt koolmonoxidelekken en andere risico’s.',
  },
  {
    title: 'Efficiëntie',
    description: 'Een vakkundig herstelde ketel verbruikt minder energie.',
  },
  {
    title: 'Langere levensduur',
    description: 'Beperkt slijtage en voorkomt dure vervangingen.',
  },
  {
    title: 'Betrouwbaarheid',
    description: 'Geen onverwachte uitval tijdens koude dagen.',
  },
];

const dangers = [
  { description: 'Hogere energiekosten door verminderde prestaties.' },
  { description: 'Risico op koolmonoxidevorming, gevaarlijk voor de gezondheid.' },
  { description: 'Brandgevaar door ophoping van vuil en defecten.' },
];

const BenefitsDangers = () => {
  return (
    <section className="bg-[#f4f8f8] py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#2f7a6f]">
            efficient en betrouwbaar
          </p>
          <h2 className="text-[30px] font-bold leading-[1.3] text-[#1a2c3d] md:text-[36px]">
            Waarom tijdige herstelling belangrijk is
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#5a6c7d]">
            Onze ervaren techniekers herstellen uw cv-ketel snel en professioneel. Zo vermijdt u gevaarlijke situaties en onnodige kosten.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 text-[24px] font-semibold text-[#1a2c3d]">
              Voordelen van een snelle herstelling
            </h3>
            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit.title} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-[#28a745]" />
                  <p className="text-sm leading-relaxed text-[#5a6c7d]">
                    <span className="font-semibold text-[#1a2c3d]">{benefit.title}</span> – {benefit.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-[24px] font-semibold text-[#1a2c3d]">
              Gevaren van uitstel
            </h3>
            <ul className="space-y-4">
              {dangers.map((danger, index) => (
                <li key={index} className="flex items-start gap-3">
                  <TriangleAlert className="mt-1 h-5 w-5 flex-shrink-0 text-[#ff9800]" />
                  <p className="text-sm leading-relaxed text-[#5a6c7d]">{danger.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 text-center text-base text-[#5a6c7d]">
          Kies voor zekerheid en laat uw cv-ketel tijdig herstellen!
        </p>
      </div>
    </section>
  );
};

export default BenefitsDangers;
