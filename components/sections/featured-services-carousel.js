'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    label: 'Onderhoud & keuring',
    title: 'Onderhoud en keuring van gasketels',
    description:
      'We plannen snel een erkende technicus in voor Antwerpen en omgeving. Van jaarlijks onderhoud tot attesten na een aanpassing.',
    features: [
      'Reiniging en afstelling volgens voorschriften',
      'Offerte vooraf zonder verrassingen',
      'Attesten en rapporten onmiddellijk beschikbaar',
      'Advies voor efficiënt en veilig gebruik',
    ],
    image: '/Installatie.png',
    link: '/onderhoud',
  },
  {
    label: 'Airconditioning',
    title: 'Airconditioning installatie en onderhoud',
    description:
      'We installeren en onderhouden airconditioningsystemen voor een aangenaam klimaat in huis of kantoor. Van advies tot volledige installatie.',
    features: [
      'Energie-efficiënte systemen en onderhoud',
      'Snelle installatie met minimale hinder',
      'Garantie op installatie en onderdelen',
      'Onderhoudscontracten voor optimale prestaties',
    ],
    image: '/Klimaatregeling.png',
    link: '/installaties/airconditioning',
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
              <span className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-donkerblauw">
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
                      <Check className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-donkerblauw" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              <a
                href={activeSlide.link}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-donkerblauw px-6 text-base font-semibold text-white transition-transform duration-200 hover:scale-105 hover:bg-[#0e2a3d]"
              >
                Meer informatie
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative mx-auto aspect-square max-w-[600px] overflow-hidden rounded-xl bg-white shadow-[0_6px_18px_rgba(0,0,0,0.1)]">
                <Image
                  key={activeSlide.image}
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="object-cover object-top"
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
                current === index ? 'bg-donkerblauw' : 'bg-[#d1d5db]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServicesCarousel;
