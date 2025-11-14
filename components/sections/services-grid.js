import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Onderhoud',
    description:
      'Gasketel- en sanitair onderhoud met controle van debieten, dichtingen en veiligheid zodat uw installatie betrouwbaar blijft.',
    price: 'Vanaf 95',
    image: '/Herstelling.png',
    alt: 'Technieker voert onderhoud uit aan gasketel in Antwerpen',
    link: '/onderhoud',
  },
  {
    title: 'Keuring',
    description:
      'Erkende keuringen en attesten voor nieuwe of aangepaste installaties in Antwerpen, inclusief duidelijke rapportage.',
    price: 'Vanaf 120',
    image: '/Keuring.png',
    alt: 'Technicus controleert gasketel tijdens keuring in Deurne',
    link: '/keuring',
  },
  {
    title: 'Sanitair & badkamer herstelling',
    description:
      'Herstellingen aan leidingen, kranen, douche en bad met duurzame materialen en nette afwerking zonder grote verbouwingen.',
    price: 'Op maat',
    image: '/Onderhoud.png',
    alt: 'Loodgieter voert sanitair herstelling uit in badkamer te Wilrijk',
    link: '/installaties/sanitair',
  },
];

const ServicesGrid = () => {
  return (
    <section className="bg-[#f7f9fa] py-20">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
        <div className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[2px] text-donkerblauw">
            Diensten van AB Service
          </p>
          <h2 className="mb-[60px] text-[42px] font-bold leading-tight text-[#1a2c3d]">
            Loodgieterij voor elke uitdaging in Antwerpen
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="flex h-full flex-col overflow-hidden rounded-xl bg-achtergrond shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
            >
              <div className="relative h-[350px] w-full">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center"
                />
              </div>

              <div className="flex flex-grow flex-col p-8">
                <h3 className="mb-4 text-[22px] font-semibold text-[#1a2c3d]">{service.title}</h3>
                <p className="mb-5 text-[15px] leading-[1.6] text-[#4a5568]">{service.description}</p>

                <div className="mt-auto">
                  <a
                    href={service.link}
                    className="group flex w-full items-center justify-center gap-2 rounded-md bg-donkerblauw py-3 text-[13px] font-semibold uppercase text-white transition-colors hover:bg-[#0e2a3d]"
                  >
                    Meer informatie
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
