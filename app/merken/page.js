import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";
import ContactCta from "@/components/contact-cta";
import PageHero from "@/components/page-hero";
import { brandServices } from "@/content/brand-services.mjs";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";

export const metadata = buildPageMetadata(getPageDefinition("/merken"));

export default function MerkenPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Ketelmerken", path: "/merken" }]} />
      <PageHero
        eyebrow="Cv-ketelmerken"
        title="Onderhoud en herstelling voor courante ketelmerken"
        intro="AB Service onderhoudt en herstelt cv-ketels van onderstaande merken. Vermeld altijd het exacte model, de productcode en een eventuele foutcode zodat onderdelen en documentatie vooraf kunnen worden beoordeeld."
      />
      <section className="section section-compact">
        <div className="shell narrow">
          <p className="answer-box">
            AB Service werkt als onafhankelijke dienstverlener. Een merkpagina betekent niet dat
            AB Service een officiële dealer, fabrikantendienst of erkende merkpartner is.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <p className="eyebrow">13 merken</p>
          <h2>Kies het merk op uw toestel</h2>
          <div className="cards-grid" style={{ marginTop: "2rem" }}>
            {brandServices.map((entry) => (
              <article className="card" key={entry.slug}>
                <h3>{entry.brand}</h3>
                <p>Onderhoud, diagnose en herstelling voor {entry.productFocus}.</p>
                <Link href={entry.path}>Bekijk {entry.brand}-service →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ContactCta title="Onderhoud of een storing aan uw cv-ketel?" />
    </>
  );
}
