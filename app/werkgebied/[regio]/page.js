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

const regionalCopy = {
  antwerpen: {
    intro: "AB Service behandelt verwarmings- en sanitaire aanvragen in provincie Antwerpen: van de stad en haar districten via de zuidrand en de Mechelse regio tot de Kempen. Bezorg uw gemeente, toestelgegevens en vraag om de afspraak voor te bereiden.",
    details: "Kies hieronder de passende dienst voor cv-ketelonderhoud, een herstelling, keuring, gasketelinstallatie of sanitair werk. Bij een aanvraag in de stad Antwerpen helpt ook de vermelding van het district.",
  },
  limburg: {
    intro: "AB Service neemt aanvragen aan uit de Limburgse gemeenten. Meld het soort werk en de toestand van uw installatie, zodat de benodigde aanpak en de verplaatsing vooraf kunnen worden afgestemd.",
    details: "Van Hasselt en Genk tot Noord- en Zuid-Limburg: vermeld het exacte adres voor uw aanvraag en wie toegang tot het toestel kan geven. Planning volgt na beoordeling van de opdracht en de praktische bereikbaarheid.",
  },
  "oost-vlaanderen": {
    intro: "Voor verwarming, sanitair en loodgieterswerk in Oost-Vlaanderen kunt u uw aanvraag aan AB Service voorleggen. Vermeld de gemeente, het probleem of gewenste werk en de toegang tot de installatie.",
    details: "Het werkgebied loopt van Gent en het Waasland tot de Denderstreek en Vlaamse Ardennen. Geef bij herstellingen ook aan of de klacht voortdurend optreedt of alleen tijdens een bepaalde verwarmings- of gebruikscyclus.",
  },
  "vlaams-brabant": {
    intro: "AB Service bedient Vlaams-Brabant, waaronder de Vlaamse Rand en de Leuvense regio. Bezorg bij uw aanvraag de toestelgegevens en vermeld of toegang, parking of een gemeenschappelijke technische ruimte vooraf moet worden geregeld.",
    details: "Bij een appartementsgebouw helpen verdieping, gemeenschappelijke afsluiters en contact met de gebouwbeheerder om het werk voor te bereiden. De benodigde dienst en afspraak worden voor uw concrete situatie afgestemd.",
  },
  "west-vlaanderen": {
    intro: "AB Service behandelt aanvragen in West-Vlaanderen, aan de kust en in het binnenland. Omschrijf uw installatie of loodgieterswerk en geef gemeente en gewenste afspraakcontext mee om de verplaatsing voor te bereiden.",
    details: "Het werkgebied omvat onder meer Brugge, de Westhoek en de regio Kortrijk-Roeselare. Meld welke toestellen of leidingen betrokken zijn en wat al werd gecontroleerd, zodat de opdracht vóór de afspraak kan worden besproken.",
  },
  brussel: {
    intro: "AB Service neemt aanvragen aan uit de 19 gemeenten van het Brussels Hoofdstedelijk Gewest. Vermeld bij appartementen de verdieping, toegang tot technische lokalen en eventuele contactpersoon van het gebouw.",
    details: "Geef de Brusselse gemeente, parkeer- en toegangssituatie en toestelgegevens mee. Voor ketelonderhoud en controles gelden Brusselse EPB-regels; de juiste handeling hangt onder meer af van het toestel en de installatiegeschiedenis.",
  },
};

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
  const copy = regionalCopy[regio];
  const practicalQuestions = [
    [`Kan ik vanuit ${hub.name} een aanvraag doen?`, `Ja. AB Service behandelt aanvragen uit de ${group.areas.length} gemeenten in dit werkgebied. De werkzaamheden en afspraak worden afgestemd op uw concrete situatie.`],
    ["Welke gegevens helpen bij de planning?", hub.planningTip],
    ["Wanneer staat de afspraak vast?", "De afspraak en verwachte werkzaamheden worden na rechtstreeks contact bevestigd. Vermeld wie toegang kan geven en welke praktische afspraken nodig zijn."],
  ];

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
        intro={copy.intro}
        ctaLabel={`Aanvraag uit ${hub.name}`}
      />
      <section className="section section-compact">
        <div className="shell narrow"><p className="answer-box">{hub.planningTip}</p></div>
      </section>
      <section className="section section-dark">
        <div className="shell related-grid">
          <div>
            <p className="eyebrow">Belangrijke plaatsen</p>
            <h2>Plaatsen in dit werkgebied</h2>
            <p>Onder meer deze plaatsen zijn opgenomen. Verderop vindt u de volledige gemeentelijst om uw woonplaats te controleren.</p>
            <p>{hub.majorCities.join(" · ")}</p>
          </div>
          <div>
            <p className="eyebrow">{localProjects.length ? "Praktijk" : "Voorbereiding"}</p>
            <h2>{localProjects.length ? "Uitgevoerde werkzaamheden in deze regio" : "Uw aanvraag gericht voorbereiden"}</h2>
            {localProjects.length ? (
              <ul className="link-list">
                {localProjects.map((project) => (
                  <li key={project.path}><Link href={project.path}>{project.title}</Link></li>
                ))}
              </ul>
            ) : (
              <p>Beschrijf wat u wilt laten uitvoeren of sinds wanneer het probleem optreedt. Merk, model en bestaande documenten helpen om de juiste vervolgstap te bespreken.</p>
            )}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell related-grid">
          <div className="prose-block">
            <p className="eyebrow">Dekking en planning</p>
            <h2>{group.areas.length} gemeenten in dit werkgebied</h2>
            <p>{copy.details}</p>
            <p>De afspraak en benodigde werkzaamheden worden na rechtstreeks contact bevestigd.</p>
          </div>
          <aside className="card">
            <h3>Kies uw dienst</h3>
            <ul className="link-list">
              <li><Link href="/onderhoud">Cv-ketelonderhoud</Link></li>
              <li><Link href="/herstelling">Verwarmingsherstelling</Link></li>
              <li><Link href="/keuring">Keuring cv-installatie</Link></li>
              <li><Link href="/installaties/sanitair">Sanitair en loodgieterswerk</Link></li>
              <li><Link href="/installaties/gasketels">Gasketelinstallatie</Link></li>
              <li><Link href="/diensten/lekdetectie">Lekdetectie</Link></li>
              <li><Link href="/diensten/ontstopping">Ontstopping</Link></li>
              <li><Link href="/tools/onderhoudscheck">Gratis onderhoudscheck</Link></li>
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
              Geef uw district mee wanneer u een aanvraag voor de stad Antwerpen doet. Via de
              beschikbare links vindt u aanvullende informatie over uw omgeving.
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
            {practicalQuestions.map(([question, answer]) => (
              <details key={question}><summary>{question}</summary><p>{answer}</p></details>
            ))}
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
