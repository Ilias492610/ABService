import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/breadcrumbs";
import ContactCta from "@/components/contact-cta";
import PageHero from "@/components/page-hero";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";
import { getPublishedProjectsForHub, projects } from "@/content/projects.mjs";
import {
  antwerpDistricts,
  coverageSources,
  getProvinceGroup,
  getDistrictPublicHref,
  getServiceRegionHub,
  serviceRegionHubs,
} from "@/content/service-areas.mjs";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceRegionHubs.map((hub) => ({ regio: hub.slug }));
}

export async function generateMetadata({ params }) {
  const { regio } = await params;
  const hub = getServiceRegionHub(regio);
  if (!hub) return {};
  return buildPageMetadata(getPageDefinition(hub.path));
}

export default async function RegionPage({ params }) {
  const { regio } = await params;
  const hub = getServiceRegionHub(regio);
  const group = getProvinceGroup(regio);
  if (!hub || !group) notFound();

  const source = regio === "brussel" ? coverageSources[1] : coverageSources[0];
  const localProjects = getPublishedProjectsForHub(hub.groupName, projects);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Werkgebied", path: "/werkgebied" },
          { name: hub.name, path: hub.path },
        ]}
      />
      <PageHero
        eyebrow="Werkgebied"
        title={hub.heading}
        intro={hub.summary}
        ctaLabel={`Aanvraag uit ${hub.name}`}
      />
      <section className="section section-compact">
        <div className="shell narrow"><p className="answer-box">{hub.planningTip}</p></div>
      </section>
      <section className="section section-dark">
        <div className="shell related-grid">
          <div>
            <p className="eyebrow">Belangrijke plaatsen</p>
            <h2>Vroege onderzoekskandidaten</h2>
            <p>
              Deze plaatsen krijgen voorrang bij zoekdata- en evidenceonderzoek. Vermelding hier
              betekent niet dat er al een afzonderlijke landingspagina of lokale vestiging is.
            </p>
            <p>{hub.majorCities.join(" · ")}</p>
          </div>
          <div>
            <p className="eyebrow">Bewijsstatus</p>
            <h2>Lokale ervaring wordt controleerbaar toegevoegd</h2>
            {localProjects.length ? (
              <ul className="link-list">
                {localProjects.map((project) => (
                  <li key={project.path}><Link href={project.path}>{project.title}</Link></li>
                ))}
              </ul>
            ) : (
              <p>
                Projectcases en lokale reviews verschijnen hier pas na controle van werkbewijs,
                toestemming en authentieke foto’s. Zo blijft de informatie bruikbaar en betrouwbaar.
              </p>
            )}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell related-grid">
          <div className="prose-block">
            <p className="eyebrow">Dekking en planning</p>
            <h2>{group.areas.length} gemeenten in dit werkgebied</h2>
            <p>{hub.details}</p>
            <p>
              Een vermelding in deze lijst bevestigt het werkgebied, niet een vaste responstijd
              of automatische aanvaarding. AB Service bevestigt iedere afspraak afzonderlijk.
            </p>
          </div>
          <aside className="card">
            <h3>Kies uw dienst</h3>
            <ul className="link-list">
              <li><Link href="/onderhoud">Cv-ketelonderhoud</Link></li>
              <li><Link href="/herstelling">Verwarmingsherstelling</Link></li>
              <li><Link href="/keuring">Keuring cv-installatie</Link></li>
              <li><Link href="/installaties/sanitair">Sanitair en loodgieterswerk</Link></li>
              <li><Link href="/installaties/gasketels">Gasketelinstallatie</Link></li>
            </ul>
          </aside>
        </div>
      </section>
      {regio === "antwerpen" && (
        <section className="section section-muted">
          <div className="shell">
            <p className="eyebrow">Stad Antwerpen</p>
            <h2>De tien districten</h2>
            <p className="section-lead">
              Antwerpen verwijst naar de homepage. Acht districten hebben een indexeerbare lokale
              pagina; Berendrecht-Zandvliet-Lillo blijft noindex tot de zoekintentie is onderzocht.
              Samen vormen ze geen tweede service×plaats-matrix.
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
      )}
      <section className="section">
        <div className="shell">
          <p className="eyebrow">Gemeenten</p>
          <h2>Volledige lijst voor {hub.name}</h2>
          <ul className="area-name-grid area-name-grid-large">
            {group.areas.map((area) => <li key={area.slug}><span>{area.name}</span></li>)}
          </ul>
          <p className="source-note">
            Gebiedsindeling gecontroleerd via <a href={source.href} target="_blank" rel="noreferrer">{source.label} ↗</a>.
          </p>
        </div>
      </section>
      <section className="section section-muted">
        <div className="shell">
          <p className="eyebrow">Veelgestelde vragen</p>
          <h2>Praktisch over {hub.name}</h2>
          <div className="faq-list">
            {hub.faq.map(([question, answer]) => (
              <details key={question}><summary>{question}</summary><p>{answer}</p></details>
            ))}
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
