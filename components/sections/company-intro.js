import Image from 'next/image';
import { Check, ArrowRight } from 'lucide-react';

const CompanyIntro = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-8 py-12">
        <div className="grid items-center gap-y-12 lg:grid-cols-2">
          <div className="relative">
            <div className="relative aspect-[8/7] overflow-hidden rounded-xl border-4 border-donkerblauw shadow-2xl">
              <Image
                src="/Technici.png"
                alt="Loodgieter van AB Service aan het werk in Antwerpen"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-xl bg-goudgeel/20"></div>
            <div className="absolute -top-4 -left-4 -z-20 h-32 w-32 rounded-full bg-donkerblauw/10"></div>
          </div>

          <div className="lg:pl-[60px]">
            <h6 className="mb-3 text-xs font-semibold tracking-[2px] text-donkerblauw [font-variant-caps:small-caps]">
              Uw loodgieter in Antwerpen
            </h6>
            <h2 className="mb-5 text-[36px] font-bold leading-[1.3] text-[#1a2c3d]">
              Loodgieters met 20 jaar ervaring in sanitair en verwarming
            </h2>
            <p className="mb-8 text-base leading-[1.7] text-[#5a6c7d]">
              AB Service is uw lokale partner voor gasketelonderhoud, sanitair herstellingen en erkende keuringen. Wij denken mee, werken proper en vertrekken pas wanneer alles weer perfect functioneert.
            </p>
            <ul className="mb-8 space-y-4">
              <li className="flex items-center text-base text-[#5a6c7d]">
                <Check className="mr-3 h-5 w-5 shrink-0 text-donkerblauw" />
                Zo snel mogelijk ter plaatse in regio Antwerpen
              </li>
              <li className="flex items-center text-base text-[#5a6c7d]">
                <Check className="mr-3 h-5 w-5 shrink-0 text-donkerblauw" />
                Transparante prijsafspraken en duidelijke communicatie
              </li>
              <li className="flex items-center text-base text-[#5a6c7d]">
                <Check className="mr-3 h-5 w-5 shrink-0 text-donkerblauw" />
                Onderhoud, herstellingen en keuringen met garantie
              </li>
            </ul>
            <a
              href="tel:0484906966"
              className="inline-flex items-center gap-2 rounded-md bg-donkerblauw px-8 py-[14px] text-sm font-semibold uppercase text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[#0e2a3d]"
            >
              Bel voor snelle interventie
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyIntro;
