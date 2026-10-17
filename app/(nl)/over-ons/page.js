import Link from "next/link";
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
      <PageHero eyebrow="Over AB Service" title="Uw aanspreekpunt voor verwarming en sanitair" intro="AB Service is 24/7 bereikbaar voor loodgieterswerk en verwarmingsvragen in Antwerpen, Vlaanderen en Brussel. Van een waterlek tot cv-ketelonderhoud: vertel wat u nodig hebt, zodat het werk en de afspraak kunnen worden afgestemd." />
      <section className="section">
        <div className="shell narrow prose-block">
          <p className="eyebrow">Werkwijze</p>
          <h2>Van concrete vraag naar afgebakende opdracht</h2>
          <p>Een aanvraag wordt beoordeeld aan de hand van toestelgegevens, foto’s, symptomen, technische randvoorwaarden en de gewenste uitkomst. Waar een plaatsbezoek nodig is, kan dat eerst worden afgesproken.</p>
          <p>De werkzaamheden, planning en prijs worden afgestemd via rechtstreeks contact of een schriftelijke offerte. Vermeld uw gemeente, het toestel of leidingwerk en wanneer het probleem begon.</p>
          <ul className="check-list">
            <li>Verwarming: onderhoud, herstelling, keuring en gasketelinstallatie</li>
            <li>Sanitair: gerichte installaties en loodgieterswerk</li>
            <li>Lekken, ontstoppingen, boilers, leidingwerk en badkamerrenovatie</li>
            <li>Werkgebied: Antwerpen, heel Vlaanderen en het Brussels Hoofdstedelijk Gewest</li>
            <li>Bereikbaar: {business.hoursLabel}</li>
            <li>Ondernemingsnummer: {business.vatId}</li>
          </ul>
        </div>
      </section>
      <section className="section section-muted">
        <div className="shell narrow prose-block">
          <p className="eyebrow">Onafhankelijke service</p>
          <h2>Onderhoud en herstelling voor uw ketelmerk</h2>
          <p>AB Service werkt als onafhankelijke dienstverlener aan de vermelde ketelmerken. Vermeld het exacte model en de volledige foutmelding zodat documentatie, onderdelen en de passende aanpak kunnen worden nagekeken.</p>
          <ul className="link-list">
            <li><Link href="/merken">Bekijk de ketelmerken</Link></li>
            <li><Link href="/werkgebied">Controleer uw gemeente in het werkgebied</Link></li>
            <li><Link href="/advies">Praktisch advies voor uw installatie</Link></li>
            <li><Link href="/tools/onderhoudscheck">Controleer de onderhoudsregel voor uw toestel</Link></li>
          </ul>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
