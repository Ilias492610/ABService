import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'Onderhoud',
    description:
      'Regelmatig onderhoud zorgt voor een zorgeloze werking en optimaal rendement van uw ketel.',
    price: '160',
    image:
      'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f15d975f-aef8-4250-b1e6-83d5198662e2-verwarmingbros-be/assets/images/onderhoudv2-11.jpg',
    alt: 'Technicus voert onderhoud uit aan een gasketel',
    link: '#',
  },
  {
    title: 'Herstelling',
    description:
      'Een goed werkende cv-ketel zorgt voor comfort, veiligheid en efficiëntie in uw huis.',
    price: '140',
    image:
      'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f15d975f-aef8-4250-b1e6-83d5198662e2-verwarmingbros-be/assets/images/installatie-12.jpg',
    alt: 'Technici die een herstelling uitvoeren aan een verwarmingssysteem',
    link: '#',
  },
  {
    title: 'Keuring & indienstname',
    description:
      'Voor ingebruikname is een keuring verplicht. Na de keuring ontvangt u een conformiteitsrapport.',
    price: '180',
    image:
      'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f15d975f-aef8-4250-b1e6-83d5198662e2-verwarmingbros-be/assets/images/keuring-2-15.jpg',
    alt: 'Technicus voert een keuring uit van een verwarmingsinstallatie',
    link: '#',
  },
];

const ServicesGrid = () => {
  return (
    <section className="bg-[#f7f9fa] py-20">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
        <div className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[2px] text-[#2f7a6f]">
            Kwaliteit boven kwantiteit
          </p>
          <h2 className="mb-[60px] text-[42px] font-bold leading-tight text-[#1a2c3d]">
            Ontdek onze dienstverlening
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
            >
              <div className="relative h-[240px] w-full">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-grow flex-col p-8">
                <h3 className="mb-4 text-[22px] font-semibold text-[#1a2c3d]">{service.title}</h3>
                <p className="mb-5 text-[15px] leading-[1.6] text-[#4a5568]">{service.description}</p>

                <div className="mb-5 text-center">
                  <p className="text-sm text-[#718096]">vanaf</p>
                  <p className="text-[32px] font-bold text-[#2f7a6f]">€{service.price}</p>
                  <p className="text-sm text-[#718096]">excl. btw</p>
                </div>

                <div className="mt-auto">
                  <a
                    href={service.link}
                    className="group flex w-full items-center justify-center gap-2 rounded-md bg-[#2f7a6f] py-3 text-[13px] font-semibold uppercase text-white transition-colors hover:bg-[#286b60]"
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
