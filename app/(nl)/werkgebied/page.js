import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";
import ContactCta from "@/components/contact-cta";
import MunicipalityFilter from "@/components/municipality-filter";
import PageHero from "@/components/page-hero";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";
import {
  antwerpDistricts,
  buildCoverageDirectoryGroups,
  coverageSources,
  getDistrictPublicHref,
  serviceRegionHubs,
} from "@/content/service-areas.mjs";

export const metadata = buildPageMetadata(getPageDefinition("/werkgebied"));

const directoryGroups = buildCoverageDirectoryGroups();

export default function WorkAreaPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Werkgebied", path: "/werkgebied" }]} />
      <PageHero
        eyebrow="Werkgebied"
        title="AB Service in heel Vlaanderen en Brussel"
        intro="AB Service neemt passende aanvragen aan uit alle 285 Vlaamse en 19 Brusselse gemeenten. De technische vraag, afstand en planning worden vóór een afspraak beoordeeld."
        ctaLabel="Controleer uw aanvraag"
      />
      <section className="section section-compact">
        <div className="shell narrow">
          <p className="answer-box">
            Uw gemeente staat in het werkgebied. Dat is geen belofte van onmiddellijke
            beschikbaarheid: een concrete afspraak volgt na beoordeling van dienst, locatie,
            technische informatie en bereikbaarheid.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div className="coverage-stats" aria-label="Omvang van het werkgebied">
            <div><strong>285</strong><span>Vlaamse gemeenten</span></div>
            <div><strong>19</strong><span>Brusselse gemeenten</span></div>
            <div><strong>10</strong><span>Antwerpse districten</span></div>
          </div>
          <p className="eyebrow">Regio’s</p>
          <h2>Kies een provincie of het Brussels Gewest</h2>
          <div className="cards-grid">
            {serviceRegionHubs.map((hub) => (
              <article className="card" key={hub.slug}>
                <h3>{hub.name}</h3>
                <p>{hub.summary}</p>
                <Link href={hub.path}>Bekijk {hub.name} →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-muted">
        <div className="shell">
          <p className="eyebrow">Stad Antwerpen</p>
          <h2>Hulp in de tien Antwerpse districten</h2>
          <p className="section-lead">
            We bekijken vóór een afspraak welke dienst nodig is, waar de hulp nodig is en wat
            past in de planning. Bekijk de gelinkte districten voor meer informatie.
          </p>
          <ul className="district-link-grid">
            {antwerpDistricts.map((district) => (
              <li key={district.slug}>
                {getDistrictPublicHref(district) ? (
                  <Link href={getDistrictPublicHref(district)}>{district.name}</Link>
                ) : (
                  <span>{district.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <p className="eyebrow">Alle gemeenten</p>
          <h2>Zoek uw gemeente of district</h2>
          <p className="section-lead">
            Zoek in de lijst van 304 gemeenten en tien Antwerpse districten op uw woonplaats.
            Via de regiopagina’s en gelinkte gemeenten leest u meer over de dienstverlening daar.
          </p>
          <MunicipalityFilter groups={directoryGroups} />
          <div className="source-note">
            <p><strong>Officiële bronnen voor de gebiedsindeling:</strong></p>
            {coverageSources.map((source) => (
              <p key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label} ↗</a></p>
            ))}
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
