import Image from 'next/image';
import { Check, ArrowRight } from 'lucide-react';

const CompanyIntro = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-8 py-20">
        <div className="grid items-center gap-y-12 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-xl border-8 border-[#2f7a6f] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f15d975f-aef8-4250-b1e6-83d5198662e2-verwarmingbros-be/assets/images/bros-10.jpg"
                alt="Technici van Verwarming Bros"
                width={558}
                height={398}
                unoptimized
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          <div className="lg:pl-[60px]">
            <h6 className="mb-3 text-xs font-semibold tracking-[2px] text-[#2f7a6f] [font-variant-caps:small-caps]">
              Verwarming Bros
            </h6>
            <h2 className="mb-5 text-[36px] font-bold leading-[1.3] text-[#1a2c3d]">
              Uw verwarming bij ons in de hoofdrol!
            </h2>
            <p className="mb-8 text-base leading-[1.7] text-[#5a6c7d]">
              Deskundig in onderhoud, reparatie en installatie van gasketels. Snel, efficiënt en altijd
              gericht op uw comfort en veiligheid.
            </p>
            <ul className="mb-8 space-y-4">
              <li className="flex items-center text-base text-[#5a6c7d]">
                <Check className="mr-3 h-5 w-5 shrink-0 text-[#2f7a6f]" />
                +10 jaar ervaring
              </li>
              <li className="flex items-center text-base text-[#5a6c7d]">
                <Check className="mr-3 h-5 w-5 shrink-0 text-[#2f7a6f]" />
                Kwalitatieve service
              </li>
              <li className="flex items-center text-base text-[#5a6c7d]">
                <Check className="mr-3 h-5 w-5 shrink-0 text-[#2f7a6f]" />
                7/7 bereikbaarheid bij storingen
              </li>
            </ul>
            <a
              href="tel:0495799899"
              className="inline-flex items-center gap-2 rounded-md bg-[#2d7a6e] px-8 py-[14px] text-sm font-semibold uppercase text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[#256459]"
            >
              Bel ons voor een afspraak
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyIntro;
