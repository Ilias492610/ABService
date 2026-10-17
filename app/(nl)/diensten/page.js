import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";
import ContactCta from "@/components/contact-cta";
import PageHero from "@/components/page-hero";
import { additionalServices } from "@/content/additional-services.mjs";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";

export const metadata = buildPageMetadata(getPageDefinition("/diensten"));

const coreServices = [
  {
    title: "Onderhoud cv-ketel",
    href: "/onderhoud",
    text: "Periodiek onderhoud met aandacht voor toestelgegevens, wettelijke frequentie en attestering.",
  },
  {
    title: "Herstelling verwarming",
    href: "/herstelling",
    text: "Diagnose en herstel bij uitval, foutcodes, drukverlies of problemen met warm water.",
  },
  {
    title: "Keuring cv-installatie",
    href: "/keuring",
    text: "Informatie en aanvraag voor keuring bij eerste ingebruikname of een relevante wijziging.",
  },
  {
    title: "Gasketel installeren",
    href: "/installaties/gasketels",
    text: "Beoordeling, vervanging of plaatsing van een gasketel met een vooraf afgebakende offerte.",
  },
  {
    title: "Sanitair en loodgieterswerk",
    href: "/installaties/sanitair",
    text: "Plaatsing, vervanging en aanpassing van sanitaire toestellen en bereikbare aansluitingen.",
  },
];

export default function DienstenPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Diensten", path: "/diensten" }]} />
      <PageHero
        eyebrow="Diensten"
        title="Loodgieterswerk, verwarming en sanitair"
        intro="AB Service voert onderhoud, herstellingen, installaties, lekonderzoek, ontstoppingen en sanitaire werken uit. Kies de pagina die het best bij uw aanvraag past."
      />
      <section className="section">
        <div className="shell">
          <p className="eyebrow">Verwarming en sanitair</p>
          <h2>Alle actieve diensten</h2>
          <div className="cards-grid" style={{ marginTop: "2rem" }}>
            {[...coreServices, ...additionalServices.map((service) => ({
              title: service.title,
              href: service.path,
              text: service.description,
            }))].map((service) => (
              <article className="card" key={service.href}>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <Link href={service.href}>Bekijk deze dienst →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-muted">
        <div className="shell related-grid">
          <div>
            <p className="eyebrow">Merken</p>
            <h2>Onderhoud en herstelling voor veel ketelmerken</h2>
            <p className="section-lead">Bekijk per merk welke gegevens u bij uw aanvraag moet meesturen.</p>
            <Link href="/merken">Bekijk alle ketelmerken →</Link>
          </div>
          <div>
            <p className="eyebrow">Praktijk</p>
            <h2>Voorbeelden van uitgevoerd werk</h2>
            <p className="section-lead">Bekijk geanonimiseerde cases uit het werkgebied van AB Service.</p>
            <Link href="/projecten">Bekijk projecten →</Link>
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
