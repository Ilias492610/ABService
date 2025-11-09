'use client';

import { useState } from 'react';
import { Phone, ChevronDown } from 'lucide-react';

const faqData = [
  {
    question: 'Welke diensten bieden jullie aan?',
    answer: 'Wij bieden herstelling, installatie, onderhoud en keuring van gasketels aan.',
  },
  {
    question: 'Kan ik voor alle merken terecht bij jullie?',
    answer: 'Wij bieden diensten aan voor Bosch, Buderus, Bulex, Junkers, Vaillant en Viessmann.',
  },
  {
    question: 'Zijn jullie prijzen inclusief btw?',
    answer: 'Al onze vermelde prijzen zijn exclusief btw.',
  },
  {
    question: 'Maken jullie een gratis offerte?',
    answer:
      'Natuurlijk. Maak online een afspraak of bel ons, en we plannen meteen een afspraak in om ter plaatse jullie noden te bekijken, volledig gratis!',
  },
];

const FaqItem = ({ item, isOpen, onToggle }) => (
  <div className="overflow-hidden rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between px-6 py-5 text-left text-lg font-semibold text-[#1a2c3d]"
      aria-expanded={isOpen}
    >
      {item.question}
      <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    {isOpen && (
      <div className="px-6 pb-6 text-base leading-relaxed text-[#5a6c7d]">
        {item.answer}
      </div>
    )}
  </div>
);

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-[#dfe8e6] py-16 lg:py-20">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-5 lg:flex-row lg:gap-20">
        <div className="lg:w-2/5">
          <p className="mb-2 text-sm font-bold uppercase tracking-[1.2px] text-[#2f7a6f]">FAQS</p>
          <h2 className="text-[32px] font-bold leading-tight text-[#1a2c3d] lg:text-[36px]">
            Veelgestelde vragen
          </h2>
          <p className="mt-4 text-base text-[#5a6c7d]">
            Hier vindt u antwoorden op de meest gestelde vragen over onze diensten. Niet gevonden wat u zocht? Bel ons
            voor meer informatie.
          </p>
          <a
            href="tel:0495799899"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#2f7a6f] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#27685f]"
          >
            <Phone className="h-4 w-4" />
            Bel ons
          </a>
        </div>

        <div className="lg:w-3/5 space-y-4">
          {faqData.map((item, index) => (
            <FaqItem
              key={item.question}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
