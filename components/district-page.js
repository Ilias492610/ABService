import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";
import ContactCta from "@/components/contact-cta";
import PageHero from "@/components/page-hero";
import { getDistrict } from "@/content/service-areas.mjs";

const services = [
  ["Cv-ketelonderhoud", "/onderhoud"],
  ["Herstelling van verwarming", "/herstelling"],
  ["Sanitair en loodgieterswerk", "/installaties/sanitair"],
  ["Gasketelinstallatie", "/installaties/gasketels"],
];

const answerFor = (question, district) => {
  if (question.startsWith("Werkt") || question.startsWith("Komt") || question.startsWith("In welke")) {
    return `Ja. ${district.name} behoort tot het bevestigde werkgebied. Een concrete afspraak volgt nadat AB Service de dienst, locatie, technische situatie en planning heeft beoordeeld.`;
  }
  if (question.includes("prijs") || question.includes("offerte")) {
    return "Nee, één foto is zelden voldoende voor een betrouwbare prijs. Materiaal, bereikbaarheid, aansluitingen, omvang en eventuele vervolgdiagnose bepalen de uiteindelijke scope.";
  }
  return `Vermeld bij een aanvraag in ${district.name} het adres of de buurt, woningtype, verdieping, merk en model, zichtbare foutcode en bereikbaarheid. Voeg overzichts- en detailfoto’s toe zonder het toestel te openen.`;
};

export default function DistrictPage({ slug }) {
  const district = getDistrict(slug);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Werkgebied", path: "/werkgebied" },
          { name: "Provincie Antwerpen", path: "/werkgebied/antwerpen" },
          { name: district.name, path: district.canonicalPath },
        ]}
      />
      <PageHero
        eyebrow={`Loodgieter ${district.name}`}
        title={`Verwarming en sanitair in ${district.name}`}
        intro={district.intro}
        ctaLabel={`Aanvraag uit ${district.name}`}
      />
      <section className="section section-compact">
        <div className="shell narrow">
          <p className="answer-box">
            AB Service bedient {district.name}. Een afspraak en timing worden pas bevestigd nadat
            de locatie, technische vraag en praktische bereikbaarheid zijn beoordeeld.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="shell related-grid">
          <div className="prose-block">
            <p className="eyebrow">Lokale context</p>
            <h2>Wat bij een aanvraag in {district.name} telt</h2>
            <p>{district.localContext}</p>
            <p>{district.preparation}</p>
          </div>
          <aside className="card">
            <h3>Beschikbare diensten</h3>
            <ul className="link-list">
              {services.map(([label, href]) => (
                <li key={href}><Link href={href}>{label}</Link></li>
              ))}
            </ul>
            <Link href="/tarieven">Hoe prijs en offerte worden bepaald →</Link>
          </aside>
        </div>
      </section>
      <section className="section section-muted">
        <div className="shell">
          <p className="eyebrow">Praktische antwoorden</p>
          <h2>Veelgestelde vragen over {district.name}</h2>
          <div className="faq-list">
            {district.faq.map((question) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answerFor(question, district)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <p className="eyebrow">In de buurt</p>
          <h2>Andere Antwerpse districten</h2>
          <ul className="inline-links">
            {district.nearby.map((nearbySlug) => {
              const nearby = getDistrict(nearbySlug);
              return (
                <li key={nearbySlug}>
                  <Link href={nearby.canonicalPath}>{nearby.name}</Link>
                </li>
              );
            })}
            <li><Link href="/werkgebied/antwerpen">Heel provincie Antwerpen</Link></li>
          </ul>
          <p className="source-note">
            Lokale benamingen zijn gebaseerd op de officiële Antwerpse districts- en wijkindeling;
            ze zijn geen bewering over uitgevoerde projecten of lokale reviews.
          </p>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
