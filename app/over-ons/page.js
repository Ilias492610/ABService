import Breadcrumbs from "@/components/breadcrumbs";
import ContactCta from "@/components/contact-cta";
import PageHero from "@/components/page-hero";
import { business } from "@/content/business.mjs";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";

export const metadata = buildPageMetadata(getPageDefinition("/over-ons"));

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Over AB Service", path: "/over-ons" }]} />
      <PageHero eyebrow="Over AB Service" title="Eén duidelijk aanspreekpunt voor verwarming en sanitair" intro="AB Service behandelt aanvragen voor loodgieterswerk, sanitair, gasketels, boilers, leidingen, lekken, ontstoppingen, onderhoud, herstellingen, keuringen en installaties. De scope wordt per opdracht duidelijk afgestemd." />
      <section className="section">
        <div className="shell narrow prose-block">
          <p className="eyebrow">Werkwijze</p>
          <h2>Van concrete vraag naar afgebakende opdracht</h2>
          <p>Een aanvraag wordt beoordeeld aan de hand van toestelgegevens, foto’s, symptomen, technische randvoorwaarden en de gewenste uitkomst. Waar een plaatsbezoek nodig is, kan dat eerst worden afgesproken.</p>
          <p>De uiteindelijke scope, planning en prijs volgen uit rechtstreeks contact of een schriftelijke offerte. Zo wordt niet via marketingtekst beloofd wat pas na beoordeling bekend kan zijn.</p>
          <ul className="check-list">
            <li>Verwarming: onderhoud, herstelling, keuring en gasketelinstallatie</li>
            <li>Sanitair: gerichte installaties en loodgieterswerk</li>
            <li>Lekken, ontstoppingen, boilers, leidingwerk en badkamerrenovatie</li>
            <li>Primair werkgebied dat door de eigenaar is bevestigd: Antwerpen</li>
            <li>Ondernemingsnummer: {business.vatId}</li>
          </ul>
        </div>
      </section>
      <section className="section section-muted">
        <div className="shell narrow prose-block">
          <p className="eyebrow">Bewust niet geclaimd</p>
          <h2>Vertrouwen zonder verzonnen bewijs</h2>
          <p>Deze website noemt geen onbevestigd oprichtingsjaar, teamgrootte, gegarandeerde responstijd, erkenning of fabrikantpartnerschap. Merkpagina’s beschrijven onafhankelijke service en de projecten zijn geanonimiseerd om klantgegevens te beschermen.</p>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
