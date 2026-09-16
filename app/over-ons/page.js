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
      <PageHero eyebrow="Over AB Service" title="Eén duidelijk aanspreekpunt voor verwarming en sanitair" intro="AB Service behandelt aanvragen in Antwerpen voor loodgieterswerk, sanitair, gasketels, onderhoud, herstellingen en keuringen. Deze pagina beperkt zich bewust tot informatie die op dit moment kan worden onderbouwd." />
      <section className="section">
        <div className="shell narrow prose-block">
          <p className="eyebrow">Werkwijze</p>
          <h2>Van concrete vraag naar afgebakende opdracht</h2>
          <p>Een aanvraag wordt beoordeeld aan de hand van toestelgegevens, foto’s, symptomen, technische randvoorwaarden en de gewenste uitkomst. Waar een plaatsbezoek nodig is, kan dat eerst worden afgesproken.</p>
          <p>De uiteindelijke scope, planning en prijs volgen uit rechtstreeks contact of een schriftelijke offerte. Zo wordt niet via marketingtekst beloofd wat pas na beoordeling bekend kan zijn.</p>
          <ul className="check-list">
            <li>Verwarming: onderhoud, herstelling, keuring en gasketelinstallatie</li>
            <li>Sanitair: gerichte installaties en loodgieterswerk</li>
            <li>Primair werkgebied dat door de eigenaar is bevestigd: Antwerpen</li>
            <li>Ondernemingsnummer: {business.vatId}</li>
          </ul>
        </div>
      </section>
      <section className="section section-muted">
        <div className="shell narrow prose-block">
          <p className="eyebrow">Bewust niet geclaimd</p>
          <h2>Vertrouwen zonder verzonnen bewijs</h2>
          <p>Deze website noemt geen oprichtingsjaar, teamgrootte, gegarandeerde responstijd, reviewscore, fabrikantpartnerschap, erkenning of breed servicegebied zolang de bijbehorende evidence niet beschikbaar is. Authentieke projecten en klantbewijzen kunnen later via de publicatiegate worden toegevoegd.</p>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
