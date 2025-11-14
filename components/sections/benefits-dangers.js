import { CheckCircle2, TriangleAlert } from 'lucide-react';

const contentByVariant = {
  maintenance: {
    badge: 'preventief onderhoud',
    heading: 'Waarom jaarlijks onderhoud in Antwerpen loont',
    intro:
      'Onze Antwerpse techniekers houden uw gasketel, sanitair en airco in topconditie. Zo vermijdt u onverwachte uitval en blijft uw energieverbruik onder controle.',
    benefits: [
      {
        title: 'Maximaal rendement',
        description: 'Een gereinigde en afgestelde installatie verbruikt minder energie en houdt uw factuur laag.',
      },
      {
        title: 'Geldige attesten',
        description: 'U ontvangt het wettelijk onderhoudsverslag, ideaal voor verzekeringen en verhuur.',
      },
      {
        title: 'Langere levensduur',
        description: 'Preventief vervangen van pakkingen en onderdelen voorkomt dure vervangingen.',
      },
      {
        title: 'Lokale opvolging',
        description: 'Snelle service vanuit Antwerpen voor vragen of bijkomende interventies.',
      },
    ],
    dangers: [
      { description: 'Hoger gasverbruik door vervuilde branders of warmtewisselaars.' },
      { description: 'Risico op CO-ontwikkeling of waterlekken door te late controle.' },
      { description: 'Garantieproblemen doordat wettelijke onderhoudsattesten ontbreken.' },
    ],
    closing: 'Kies voor een onderhoudspartner in Antwerpen en geniet van zorgeloze warmte.',
  },
  repair: {
    badge: 'efficiënt en betrouwbaar',
    heading: 'Waarom tijdige herstelling belangrijk is',
    intro:
      'Onze ervaren techniekers herstellen cv-ketels en sanitair in Antwerpen snel en professioneel. Zo vermijdt u gevaarlijke situaties en bijkomende schade.',
    benefits: [
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
    ],
    dangers: [
      { description: 'Hogere energiekosten door verminderde prestaties.' },
      { description: 'Risico op koolmonoxidevorming, gevaarlijk voor de gezondheid.' },
      { description: 'Brandgevaar door ophoping van vuil en defecten.' },
    ],
    closing: 'Laat problemen meteen aanpakken en verwarm opnieuw met een gerust hart.',
  },
};

const BenefitsDangers = ({ variant = 'repair' }) => {
  const { badge, heading, intro, benefits, dangers, closing } =
    contentByVariant[variant] ?? contentByVariant.repair;

  return (
    <section className="bg-[#f4f8f8] py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-donkerblauw">
            {badge}
          </p>
          <h2 className="text-[30px] font-bold leading-[1.3] text-[#1a2c3d] md:text-[36px]">{heading}</h2>
          <p className="mt-4 text-base leading-relaxed text-[#5a6c7d]">{intro}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 text-[24px] font-semibold text-[#1a2c3d]">
              Voordelen op een rij
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

        <p className="mt-12 text-center text-base text-[#5a6c7d]">{closing}</p>
      </div>
    </section>
  );
};

export default BenefitsDangers;
