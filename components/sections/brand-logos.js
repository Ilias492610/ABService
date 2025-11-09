import Image from 'next/image';

const brands = [
  {
    name: 'Bosch',
    logo:
      'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/672c335b-5eb0-457c-9053-b96b5a0b4e0e-verwarmingbros-be/assets/images/bosch-3.png',
  },
  {
    name: 'Buderus',
    logo:
      'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/672c335b-5eb0-457c-9053-b96b5a0b4e0e-verwarmingbros-be/assets/images/buderus-4.png',
  },
  {
    name: 'Bulex',
    logo:
      'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/672c335b-5eb0-457c-9053-b96b5a0b4e0e-verwarmingbros-be/assets/images/bulex-5.png',
  },
  {
    name: 'Junkers',
    logo:
      'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/672c335b-5eb0-457c-9053-b96b5a0b4e0e-verwarmingbros-be/assets/images/junkers-6.png',
  },
  {
    name: 'Vaillant',
    logo:
      'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/672c335b-5eb0-457c-9053-b96b5a0b4e0e-verwarmingbros-be/assets/images/vaillant-7.png',
  },
  {
    name: 'Viessmann',
    logo:
      'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/672c335b-5eb0-457c-9053-b96b5a0b4e0e-verwarmingbros-be/assets/images/viessmann-8.png',
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
