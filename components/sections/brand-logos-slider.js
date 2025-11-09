'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const logos = [
  {
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f15d975f-aef8-4250-b1e6-83d5198662e2-verwarmingbros-be/assets/images/bosch-2.png',
    alt: 'Bosch',
  },
  {
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f15d975f-aef8-4250-b1e6-83d5198662e2-verwarmingbros-be/assets/images/buderus-3.png',
    alt: 'Buderus',
  },
  {
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f15d975f-aef8-4250-b1e6-83d5198662e2-verwarmingbros-be/assets/images/bulex-4.png',
    alt: 'Bulex',
  },
  {
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f15d975f-aef8-4250-b1e6-83d5198662e2-verwarmingbros-be/assets/images/junkers-5.png',
    alt: 'Junkers',
  },
  {
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f15d975f-aef8-4250-b1e6-83d5198662e2-verwarmingbros-be/assets/images/vaillant-6.png',
    alt: 'Vaillant',
  },
  {
    src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f15d975f-aef8-4250-b1e6-83d5198662e2-verwarmingbros-be/assets/images/viessmann-7.png',
    alt: 'Viessmann',
  },
];

const BrandLogosSlider = () => {
  return (
    <section className="w-full bg-[#f4f8f8] py-12">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-marquee {
              animation: none;
            }
          }
        `}
      </style>
      <div className="flex flex-col items-center gap-12">
        <div className="group w-full overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
            {[...logos, ...logos].map((logo, index) => (
              <div key={`${logo.alt}-${index}`} className="mx-10 flex-shrink-0">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={60}
                  unoptimized
                  className="max-h-[60px] w-auto object-contain grayscale opacity-60 transition-all duration-300 ease-in-out hover:grayscale-0 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
        <a
          href="https://vb-badkamers.be/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md bg-[#2f7a6f] px-7 py-3 text-sm font-semibold uppercase text-white transition-transform duration-300 hover:brightness-110"
        >
          Bekijk onze badkamersite
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </div>
    </section>
  );
};

export default BrandLogosSlider;
