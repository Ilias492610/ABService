import Image from 'next/image';

const benefitsData = [
  {
    icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f15d975f-aef8-4250-b1e6-83d5198662e2-verwarmingbros-be/assets/icons/kwaliteit-1.png',
    title: 'Service van topkwaliteit',
    description: 'Vakkundige en betrouwbare vakmannen.',
    alt: 'Topkwaliteit icoon',
  },
  {
    icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f15d975f-aef8-4250-b1e6-83d5198662e2-verwarmingbros-be/assets/icons/time-managament-2.png',
    title: 'Snel & efficiënt',
    description: 'Snelle service met efficiënte oplossingen.',
    alt: 'Snel en efficiënt icoon',
  },
  {
    icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f15d975f-aef8-4250-b1e6-83d5198662e2-verwarmingbros-be/assets/icons/best-price-3.png',
    title: 'Marktconforme prijzen',
    description: 'Kwaliteit aan eerlijke en transparante prijzen.',
    alt: 'Marktconforme prijzen icoon',
  },
];

const ThreeBenefits = () => {
  return (
    <section className="relative z-10 md:-mt-24">
      <div className="mx-4 max-w-[1200px] rounded-lg bg-white px-8 py-[60px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] md:mx-auto">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {benefitsData.map((benefit) => (
            <div
              key={benefit.title}
              className="text-center transition-transform duration-300 ease-out hover:-translate-y-1"
            >
              <div className="mx-auto mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#e8f4f2]">
                <Image src={benefit.icon} alt={benefit.alt} width={32} height={32} unoptimized />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-[#1a2c3d]">{benefit.title}</h3>
              <p className="text-[15px] leading-[1.6] text-[#5a6c7d]">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreeBenefits;
