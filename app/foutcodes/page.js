import Link from "next/link";
import Script from "next/script";
import TopHeader from "@/components/sections/top-header";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import WhatsAppFloatButton from "@/components/sections/whatsapp-float-button";
import CookieConsentBanner from "@/components/sections/cookie-consent-banner";
import GoogleRatingWidget from "@/components/sections/google-rating-widget";
import FadeInSection from "@/components/animations/FadeInSection";
import { getSEOTags } from "@/libs/seo";
import { foutcodesBrands } from "@/libs/foutcodes-data";

export const metadata = getSEOTags({
  title: "Foutcodes gasketel Antwerpen | Uitleg per merk | AB Service",
  description:
    "Bekijk veelvoorkomende foutcodes van cv-ketels per merk. Krijg direct inzicht in de storing en wat u veilig eerst kan controleren in Antwerpen.",
  keywords: [
    "foutcodes gasketel",
    "cv ketel foutcode",
    "ketel storing Antwerpen",
    "Vaillant Bulex Bosch Junkers foutcodes",
  ],
  canonicalUrlRelative: "/foutcodes",
  openGraph: {
    title: "Foutcodes gasketel per merk | AB Service Antwerpen",
    description:
      "Origineel overzicht van vaak voorkomende ketel-foutcodes met eerste veilige stappen en interventieadvies.",
  },
});

const faqItems = [
  {
    question: "Wat moet ik eerst doen bij een foutcode?",
    answer:
      "Noteer de code exact, controleer druk en gasaanvoer indien veilig, en vermijd herhaald resetten.",
  },
  {
    question: "Kan ik een foutcode zelf oplossen?",
    answer:
      "Sommige meldingen zoals lage druk kan u soms zelf corrigeren. Terugkerende storingen vereisen altijd een professionele diagnose.",
  },
  {
    question: "Zijn foutcodes hetzelfde voor elk model?",
    answer:
      "Nee, de betekenis kan verschillen per reeks en bouwjaar. Controleer altijd uw handleiding naast algemene info.",
  },
];

const FoutcodesHubPage = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <Script id="foutcodes-hub-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(schema)}
      </Script>
      <TopHeader />
      <MainNavigation />
      <main>
        <FadeInSection>
          <section className="bg-[#0f1e25] py-16 text-white md:py-20">
            <div className="mx-auto max-w-5xl px-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                Foutcodes Gasketel
              </p>
              <h1 className="mt-3 text-[34px] font-bold leading-tight md:text-[44px]">
                Foutcode op uw ketel? Vind de juiste uitleg per merk
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-base text-white/80 md:text-lg">
                Deze pagina bundelt veelvoorkomende foutcodes van populaire merken in Antwerpen.
                U krijgt per code een praktische eerste stap en duidelijk advies wanneer interventie nodig is.
              </p>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <section className="bg-white py-14 md:py-16">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="text-[30px] font-bold leading-tight text-[#1a2c3d] md:text-[36px]">
                Kies uw merk
              </h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {foutcodesBrands.map((brand) => (
                  <article
                    key={brand.slug}
                    className="rounded-xl border border-[#dbe5ea] bg-[#f8fbfc] p-6 transition-colors hover:border-[#a8c3d2]"
                  >
                    <h3 className="text-2xl font-semibold text-[#1a2c3d]">{brand.brand}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#5a6c7d]">{brand.summary}</p>
                    <Link
                      href={`/foutcodes/${brand.slug}`}
                      className="mt-6 inline-flex rounded-md bg-donkerblauw px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0e2736]"
                    >
                      Bekijk {brand.brand} foutcodes
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <section className="bg-[#f4f8fa] py-14 md:py-16">
            <div className="mx-auto max-w-5xl px-6">
              <h2 className="text-[28px] font-bold text-[#1a2c3d] md:text-[34px]">
                Veelgestelde vragen over ketel-foutcodes
              </h2>
              <div className="mt-7 space-y-4">
                {faqItems.map((item) => (
                  <article key={item.question} className="rounded-xl border border-[#dbe5ea] bg-white p-6">
                    <h3 className="text-lg font-semibold text-[#1a2c3d]">{item.question}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5a6c7d]">{item.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.25}>
          <section className="bg-white py-14">
            <div className="mx-auto max-w-5xl px-6">
              <div className="rounded-2xl bg-donkerblauw p-8 text-white md:p-10">
                <h2 className="text-[28px] font-bold leading-tight md:text-[34px]">
                  Komt de foutcode terug?
                </h2>
                <p className="mt-3 text-white/85">
                  Noteer de code en bel AB Service. Wij analyseren de storing en zorgen voor een snelle herstelling in Antwerpen en omgeving.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="tel:0484906966"
                    className="inline-flex items-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-donkerblauw"
                  >
                    Bel 0484 906 966
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center rounded-md border border-white px-5 py-3 text-sm font-semibold text-white"
                  >
                    Contactformulier
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </FadeInSection>
      </main>
      <Footer />
      <WhatsAppFloatButton />
      <CookieConsentBanner />
      <div className="fixed bottom-6 right-6 z-[9998] md:bottom-8 md:right-8">
        <GoogleRatingWidget />
      </div>
    </div>
  );
};

export default FoutcodesHubPage;
