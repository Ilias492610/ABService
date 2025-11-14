import { ShieldCheck, Timer, Tag } from 'lucide-react';

const benefitsData = [
  {
    key: 'speed',
    title: 'Zo snel mogelijk ter plaatse',
    description: 'We plannen onmiddellijk een technieker in voor Antwerpen en omliggende gemeenten.',
  },
  {
    key: 'price',
    title: 'Transparante prijzen',
    description: 'Duidelijke tarieven vooraf, inclusief verplaatsing en materialen.',
  },
  {
    key: 'quality',
    title: 'Erkend vakmanschap',
    description: 'Gecertificeerde loodgieters met meer dan 20 jaar ervaring.',
  },
];

const renderIcon = (key) => {
  const map = {
    quality: ShieldCheck,
    speed: Timer,
    price: Tag,
  };
  const Icon = map[key] ?? ShieldCheck;
  return <Icon size={40} strokeWidth={1.6} className="text-[#123247]" aria-hidden />;
};

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
                {renderIcon(benefit.key)}
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
