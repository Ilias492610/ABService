import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";
import ContactCta from "@/components/contact-cta";
import PageHero from "@/components/page-hero";
import { getDistrict, getDistrictPublicHref } from "@/content/service-areas.mjs";
import { deriveAreaEvidence, projects } from "@/content/projects.mjs";

const services = [
  ["Cv-ketelonderhoud", "/onderhoud"],
  ["Herstelling van verwarming", "/herstelling"],
  ["Sanitair en loodgieterswerk", "/installaties/sanitair"],
  ["Gasketelinstallatie", "/installaties/gasketels"],
];

export default function DistrictPage({ slug }) {
  const district = deriveAreaEvidence(getDistrict(slug), projects);

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
        title={district.heading}
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
      {district.matchingProjects.length > 0 && (
        <section className="section section-dark">
          <div className="shell">
            <p className="eyebrow">Echte projecten</p>
            <h2>Gecontroleerde projecten in {district.name}</h2>
            <ul className="link-list">
              {district.matchingProjects.map((project) => (
                <li key={project.path}><Link href={project.path}>{project.title}</Link></li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <section className="section section-muted">
        <div className="shell">
          <p className="eyebrow">Praktische antwoorden</p>
          <h2>Veelgestelde vragen over {district.name}</h2>
          <div className="faq-list">
            {district.faq.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
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
                  {getDistrictPublicHref(nearby) ? (
                    <Link href={getDistrictPublicHref(nearby)}>{nearby.name}</Link>
                  ) : (
                    <span>{nearby.name}</span>
                  )}
                </li>
              );
            })}
            <li><Link href="/werkgebied/antwerpen">Heel provincie Antwerpen</Link></li>
          </ul>
          <p className="source-note">
            Lokale benamingen zijn gebaseerd op <a href={district.localSource.href} target="_blank" rel="noreferrer">{district.localSource.label} ↗</a>;
            ze zijn geen bewering over uitgevoerde projecten of lokale reviews.
          </p>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
