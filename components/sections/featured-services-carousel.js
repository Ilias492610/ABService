'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    label: 'Installatie van een nieuwe cv-ketel',
    title: 'Verwarming en sanitair warm water',
    description:
      'Een offerte voor de vervanging van uw cv-ketel wordt volledig gratis opgesteld. Voor kleine of beperkte werken rekenen wij wel een interventievergoeding aan. De uiteindelijke prijs is steeds afhankelijk van uw specifieke situatie, uw persoonlijke voorkeuren en de gekozen technische oplossingen.',
    features: [
      'Gratis en vrijblijvende offerte',
      'Begeleiding bij aanvraag premies en subsidies',
      'Snelle en vakkundige service',
      'Gebruik van kwaliteitsmerken en duurzame oplossingen',
      'Professionele installatie door erkende techniekers',
    ],
    image:
      'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f15d975f-aef8-4250-b1e6-83d5198662e2-verwarmingbros-be/assets/images/offerte-13.jpg',
  },
  {
    label: 'Het hele jaar comfort met Haier airconditioning',
    title: 'Klimaatregeling',
    description:
      'Door de warme zomers is een airco geen luxe meer, maar een slimme investering in comfort. Met een Haier airconditioner geniet u van koeling én energiezuinige verwarming. Verwarming Bros zorgt steeds voor een vakkundige installatie en vervanging.',
    features: [],
    image:
      'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f15d975f-aef8-4250-b1e6-83d5198662e2-verwarmingbros-be/assets/images/Airomainpage-16.png',
  },
  {
    label: 'Dagelijks zacht, kalkvrij water met WaterGenius',
    title: 'Waterbehandelingssysteem',
    description:
      'Geniet elke dag van zacht, zuiver water en zeg vaarwel tegen kalkaanslag. Met een WaterGenius waterontharder kiest u voor meer comfort, stralend sanitair en een langere levensduur van uw toestellen. Verwarming Bros staat in voor professionele plaatsing én vervanging, steeds met de juiste expertise en zorg.',
    features: [],
    image:
      'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f15d975f-aef8-4250-b1e6-83d5198662e2-verwarmingbros-be/assets/images/waterverzachtermainpage-14.png',
  },
];

const AUTO_ROTATE_MS = 5000;

const FeaturedServicesCarousel = () => {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, AUTO_ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [total]);

  const activeSlide = useMemo(() => slides[current], [current]);

  const goTo = (indexDelta) => {
    setCurrent((prev) => {
      const next = (prev + indexDelta + total) % total;
      return next;
    });
  };

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-[#f6faf9] p-8 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,_45fr)_minmax(0,_55fr)] lg:items-center">
            <div className="order-2 flex flex-col lg:order-1">
              <span className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-[#2f7a6f]">
                {activeSlide.label}
              </span>
              <h2 className="mb-4 text-[36px] font-bold leading-[1.3] text-[#1a2c3d]">
                {activeSlide.title}
              </h2>
              <p className="mb-6 text-base leading-[1.7] text-[#5a6c7d]">
                {activeSlide.description}
              </p>

              {activeSlide.features && activeSlide.features.length > 0 && (
                <ul className="mb-8 space-y-3">
                  {activeSlide.features.map((feature) => (
                    <li key={feature} className="flex items-start text-base text-[#5a6c7d]">
                      <Check className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-[#48bb78]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              <a
                href="#"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#2f7a6f] px-6 text-base font-semibold text-white transition-transform duration-200 hover:scale-105 hover:bg-[#27685f]"
              >
                Meer informatie
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative mx-auto aspect-square max-w-[520px] overflow-hidden rounded-xl bg-white shadow-[0_6px_18px_rgba(0,0,0,0.1)]">
                <Image
                  key={activeSlide.image}
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => goTo(-1)}
            aria-label="Vorige slide"
            className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1a2c3d] shadow-lg transition hover:bg-slate-100 lg:flex"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => goTo(1)}
            aria-label="Volgende slide"
            className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#1a2c3d] shadow-lg transition hover:bg-slate-100 lg:flex"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Ga naar slide ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                current === index ? 'bg-[#2f7a6f]' : 'bg-[#d1d5db]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServicesCarousel;
