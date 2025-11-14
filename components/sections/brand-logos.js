import Image from 'next/image';

const brands = [
  {
    name: 'Bosch',
    logo: '/bosch.png',
  },
  {
    name: 'Buderus',
    logo: '/buderus.png',
  },
  {
    name: 'Bulex',
    logo: '/bulex.png',
  },
  {
    name: 'Junkers',
    logo: '/junkers.png',
  },
  {
    name: 'Vaillant',
    logo: '/vaillant.png',
  },
  {
    name: 'Viessmann',
    logo: '/viessmann.png',
  },
];

const BrandLogos = () => {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-2 items-center gap-x-10 gap-y-12 md:grid-cols-3 lg:grid-cols-6">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex h-[60px] w-full items-center justify-center grayscale transition-all duration-300 hover:grayscale-0"
            >
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                width={180}
                height={60}
                unoptimized
                className="h-auto max-h-[60px] w-auto max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandLogos;
