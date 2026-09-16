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
          <h2>Tien districten, zonder dubbele Antwerpen-pagina</h2>
          <p className="section-lead">
            De homepage blijft de hoofdlanding voor “loodgieter Antwerpen”. Acht andere
            districten hebben een indexeerbare pagina met controleerbare lokale context;
            Berendrecht-Zandvliet-Lillo blijft voorlopig een niet-geïndexeerde onderzoeksroute.
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
          <h2>Doorzoek de volledige lijst</h2>
          <p className="section-lead">
            Alle 304 gemeenten en tien Antwerpse districten staan in de pagina zelf en blijven
            ook zonder JavaScript leesbaar. Alleen bestemmingen met voldoende eigen inhoud zijn
            klikbaar.
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
