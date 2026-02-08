import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import TopHeader from "@/components/sections/top-header";
import MainNavigation from "@/components/sections/main-navigation";
import Footer from "@/components/sections/footer";
import WhatsAppFloatButton from "@/components/sections/whatsapp-float-button";
import CookieConsentBanner from "@/components/sections/cookie-consent-banner";
import GoogleRatingWidget from "@/components/sections/google-rating-widget";
import FadeInSection from "@/components/animations/FadeInSection";
import { getSEOTags } from "@/libs/seo";
import { foutcodesBrands, getFoutcodeBrand } from "@/libs/foutcodes-data";

export const dynamicParams = false;

export const generateStaticParams = () =>
  foutcodesBrands.map((brand) => ({ merk: brand.slug }));

export const generateMetadata = ({ params }) => {
  const brand = getFoutcodeBrand(params.merk);

  if (!brand) {
    return getSEOTags({
      title: "Foutcodes | AB Service",
      canonicalUrlRelative: "/foutcodes",
    });
  }

  return getSEOTags({
    title: `${brand.brand} foutcodes | Uitleg en oplossingen | AB Service`,
    description: `${brand.summary} Bekijk de betekenis van veel gemelde ${brand.brand} storingscodes en wanneer u best een technicus inschakelt.`,
    keywords: brand.keywords,
    canonicalUrlRelative: `/foutcodes/${brand.slug}`,
    openGraph: {
      title: `${brand.brand} foutcodes in Antwerpen | AB Service`,
      description: `Praktische gids met veelvoorkomende ${brand.brand} foutcodes en eerste stappen bij storingen.`,
    },
  });
};

const FoutcodeBrandPage = ({ params }) => {
  const brand = getFoutcodeBrand(params.merk);

  if (!brand) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: brand.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const relatedBrands = foutcodesBrands.filter((item) => item.slug !== brand.slug).slice(0, 3);
  const getCodeNumber = (code) => {
    const numeric = code.replace(/[^0-9]/g, "");
    return Number.parseInt(numeric, 10);
  };
  const sortedCodes = [...brand.codes].sort(
    (a, b) => getCodeNumber(a.code) - getCodeNumber(b.code)
  );
  const useRangeBlocks = Array.isArray(brand.ranges) && brand.ranges.length > 0;
  const isNumericRangeMode = brand.rangeMode === "numeric-f";
  const rangeBlocks = useRangeBlocks
    ? brand.ranges.map((range) => ({
        ...range,
        codes: isNumericRangeMode
          ? sortedCodes.filter((item) => {
              const codeNumber = getCodeNumber(item.code);
              if (Number.isNaN(codeNumber)) {
                return false;
              }
              return codeNumber >= range.start && codeNumber <= range.end;
            })
          : [],
      }))
    : [];

  return (
    <div className="min-h-screen bg-white">
      <Script id={`foutcodes-${brand.slug}-schema`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(schema)}
      </Script>
      <TopHeader />
      <MainNavigation />
      <main>
        <FadeInSection>
          <section className="bg-[#0f1e25] py-16 text-white md:py-20">
            <div className="mx-auto max-w-5xl px-6">
              <Link href="/foutcodes" className="text-sm text-white/70 hover:text-white">
                ← Terug naar alle foutcodes
              </Link>
              <h1 className="mt-3 text-[34px] font-bold leading-tight md:text-[44px]">
                {brand.brand} foutcodes: betekenis en eerste stappen
              </h1>
              <p className="mt-5 max-w-3xl text-base text-white/80 md:text-lg">{brand.intro}</p>
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <section className="bg-white py-14">
            <div className="mx-auto max-w-5xl px-6">
              <h2 className="text-[28px] font-bold text-[#1a2c3d] md:text-[34px]">
                Overzicht veelvoorkomende {brand.brand} storingscodes
              </h2>
              <p className="mt-3 text-sm text-[#5a6c7d]">
                Let op: codes kunnen verschillen per model en bouwjaar. Gebruik deze info als eerste leidraad.
              </p>

              {useRangeBlocks ? (
                <div className="mt-8 space-y-8">
                  {rangeBlocks.map((range) => (
                    <article key={range.label} className="rounded-xl border border-[#dbe5ea]">
                      <div className="border-b border-[#e4edf2] bg-[#f4f8fa] px-5 py-4">
                        <h3 className="text-lg font-semibold text-[#1a2c3d]">{range.label}</h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                          <thead className="bg-[#f9fcfd] text-left">
                            <tr>
                              <th className="px-5 py-3 text-sm font-semibold text-[#1a2c3d]">Code</th>
                              <th className="px-5 py-3 text-sm font-semibold text-[#1a2c3d]">Betekenis</th>
                              <th className="px-5 py-3 text-sm font-semibold text-[#1a2c3d]">Eerste stap</th>
                            </tr>
                          </thead>
                          <tbody>
                            {range.codes.length === 0 ? (
                              <tr>
                                <td className="px-5 py-4 text-sm text-[#5a6c7d]" colSpan={3}>
                                  {isNumericRangeMode
                                    ? "Geen model-onafhankelijke code in deze range voor de geselecteerde toestellen."
                                    : "Deze foutcodereeks is modelafhankelijk. Gebruik uw exact toesteltype voor de juiste detailbetekenis."}
                                </td>
                              </tr>
                            ) : (
                              range.codes.map((item) => (
                                <tr key={`${range.label}-${item.code}`} className="border-t border-[#e4edf2] align-top">
                                  <td className="px-5 py-4 text-sm font-semibold text-donkerblauw">{item.code}</td>
                                  <td className="px-5 py-4 text-sm text-[#1a2c3d]">{item.issue}</td>
                                  <td className="px-5 py-4 text-sm text-[#5a6c7d]">{item.action}</td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="mt-7 overflow-hidden rounded-xl border border-[#dbe5ea]">
                  <table className="min-w-full bg-white">
                    <thead className="bg-[#f1f6f8] text-left">
                      <tr>
                        <th className="px-5 py-3 text-sm font-semibold text-[#1a2c3d]">Code</th>
                        <th className="px-5 py-3 text-sm font-semibold text-[#1a2c3d]">Betekenis</th>
                        <th className="px-5 py-3 text-sm font-semibold text-[#1a2c3d]">Eerste stap</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedCodes.map((item) => (
                        <tr key={item.code} className="border-t border-[#e4edf2] align-top">
                          <td className="px-5 py-4 text-sm font-semibold text-donkerblauw">{item.code}</td>
                          <td className="px-5 py-4 text-sm text-[#1a2c3d]">{item.issue}</td>
                          <td className="px-5 py-4 text-sm text-[#5a6c7d]">{item.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <section className="bg-[#f4f8fa] py-14">
            <div className="mx-auto max-w-5xl px-6">
              <h2 className="text-[28px] font-bold text-[#1a2c3d] md:text-[34px]">
                FAQ over {brand.brand} foutcodes
              </h2>
              <div className="mt-7 space-y-4">
                {brand.faq.map((item) => (
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
            <div className="mx-auto grid max-w-5xl gap-6 px-6 md:grid-cols-3">
              {relatedBrands.map((related) => (
                <Link
                  key={related.slug}
                  href={`/foutcodes/${related.slug}`}
                  className="rounded-xl border border-[#dbe5ea] bg-[#f8fbfc] p-5 transition-colors hover:border-[#a8c3d2]"
                >
                  <h3 className="text-xl font-semibold text-[#1a2c3d]">{related.brand}</h3>
                  <p className="mt-2 text-sm text-[#5a6c7d]">{related.summary}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-donkerblauw">
                    Bekijk {related.brand} codes →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </FadeInSection>

        <FadeInSection delay={0.3}>
          <section className="bg-white pb-14">
            <div className="mx-auto max-w-5xl px-6">
              <div className="rounded-2xl bg-donkerblauw p-8 text-white md:p-10">
                <h2 className="text-[28px] font-bold leading-tight md:text-[34px]">
                  Blijft {brand.brand} dezelfde foutcode geven?
                </h2>
                <p className="mt-3 text-white/85">
                  Noteer de code en bel ons. AB Service doet diagnose en herstelling in Antwerpen en omgeving.
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
                    Vraag interventie aan
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

export default FoutcodeBrandPage;
