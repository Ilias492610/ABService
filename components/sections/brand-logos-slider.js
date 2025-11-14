"use client";

import Image from 'next/image';

const logos = [
  { src: '/bosch.png', alt: 'Bosch' },
  { src: '/buderus.png', alt: 'Buderus' },
  { src: '/bulex.png', alt: 'Bulex' },
  { src: '/junkers.png', alt: 'Junkers' },
  { src: '/vaillant.png', alt: 'Vaillant' },
  { src: '/viessmann.png', alt: 'Viessmann' },
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
          <div className="flex animate-marquee whitespace-nowrap">
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
      </div>
    </section>
  );
};

export default BrandLogosSlider;
