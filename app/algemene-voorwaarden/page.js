import Breadcrumbs from "@/components/breadcrumbs";
import PageHero from "@/components/page-hero";
import { business } from "@/content/business.mjs";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";

export const metadata = buildPageMetadata(getPageDefinition("/algemene-voorwaarden"));

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Algemene voorwaarden", path: "/algemene-voorwaarden" }]} />
      <PageHero eyebrow="Voorwaarden" title="Afspraken horen bij de concrete offerte of opdracht" intro="Deze webpagina vervangt geen ondertekende offerte, werkbon of dwingend consumentenrecht. De specifieke scope, prijs, planning en betalingsafspraken moeten bij iedere opdracht duidelijk worden bevestigd." />
      <section className="section"><div className="shell legal-copy">
        <h2>1. Toepassing</h2><p>Voor een opdracht gelden de voorwaarden en gegevens die in de aanvaarde offerte, opdrachtbevestiging of werkbon zijn opgenomen, samen met het toepasselijke Belgische recht. Bij strijdigheid heeft dwingend recht voorrang.</p>
        <h2>2. Offerte en scope</h2><p>Een aanvraag via website, telefoon, e-mail of WhatsApp is nog geen aanvaarde opdracht. Een voorstel hoort de werkzaamheden, materialen, uitsluitingen, prijsbasis, btw en praktische afspraken voldoende duidelijk te beschrijven.</p>
        <h2>3. Onvoorziene omstandigheden</h2><p>Verborgen gebreken, onveilige situaties, ontbrekende toegang of bijkomend werk kunnen de oorspronkelijke scope beïnvloeden. Materieel meerwerk wordt eerst gemeld en waar nodig afzonderlijk overeengekomen.</p>
        <h2>4. Veiligheid en toegang</h2><p>De klant zorgt voor veilige en redelijke toegang tot de overeengekomen werkzone en meldt gekende risico’s. Werk kan worden onderbroken wanneer uitvoering niet veilig of wettig mogelijk is.</p>
        <h2>5. Uitvoering en oplevering</h2><p>De specifieke planning wordt rechtstreeks bevestigd. Na uitvoering ontvangt de klant de documenten die voor de afgesproken opdracht van toepassing zijn. Controleer bij oplevering of zichtbare punten overeenkomen met de overeengekomen scope.</p>
        <h2>6. Prijs en betaling</h2><p>Prijs, voorschot, betaaltermijn en wijze van betaling volgen uit de aanvaarde offerte of factuur. Deze website publiceert daarover geen algemene bedragen of termijnen die ten onrechte voor iedere opdracht zouden gelden.</p>
        <h2>7. Klachten en aansprakelijkheid</h2><p>Meld een probleem zo snel mogelijk met een duidelijke omschrijving en bewijs, zodat onderzoek en een passende reactie mogelijk zijn. Wettelijke rechten en aansprakelijkheidsregels blijven van toepassing; deze pagina bevat geen beperking die dwingend recht uitsluit.</p>
        <h2>8. Contact</h2><p>AB Service · {business.vatId} · <a href={business.phoneHref}>{business.phoneDisplay}</a> · <a href={`mailto:${business.email}`}>{business.email}</a>.</p>
        <p><strong>Publicatiecontrole:</strong> bijgewerkt op 16 september 2026. Laat definitieve commerciële voorwaarden juridisch beoordelen voordat aanvullende boete-, garantie-, annulatie- of bevoegde-rechtbankclausules worden toegevoegd.</p>
      </div></section>
    </>
  );
}
