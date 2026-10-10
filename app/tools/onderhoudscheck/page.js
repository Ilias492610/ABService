import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";
import MaintenanceCheck from "@/components/maintenance-check";
import PageHero from "@/components/page-hero";
import { getPageDefinition } from "@/content/site-content.mjs";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { maintenanceSources } from "@/libs/maintenance-check.mjs";

export const metadata = buildPageMetadata(getPageDefinition("/tools/onderhoudscheck"));

export default function MaintenanceCheckPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Advies", path: "/advies" }, { name: "Onderhoudscheck", path: "/tools/onderhoudscheck" }]} />
      <PageHero eyebrow="Gratis hulpmiddel · zonder account" title="Wanneer moet mijn cv-ketel onderhouden worden?" intro="Bekijk de gebruikelijke onderhoudsregel voor uw toestel in Vlaanderen of Brussel. Vul enkele gegevens in en krijg direct uitleg, een officiële bron en waar mogelijk een richtdatum voor uw planning." ctaLabel="Start de onderhoudscheck" ctaHref="#onderhoudscheck" />
      <section className="section" id="onderhoudscheck">
        <div className="shell"><MaintenanceCheck /></div>
      </section>
      <section className="section section-muted">
        <div className="shell narrow prose-block">
          <p className="eyebrow">De regels naast elkaar</p>
          <h2>Welke onderhoudsfrequentie geldt doorgaans?</h2>
          <div className="table-scroll"><table className="rule-table">
            <caption>Periodieke regels gecontroleerd op 10 oktober 2026</caption>
            <thead><tr><th scope="col">Gewest en toestel</th><th scope="col">Gebruikelijke regel</th></tr></thead>
            <tbody>
              <tr><th scope="row">Vlaanderen: centrale gasketel vanaf 20 kW</th><td>Tweejaarlijks</td></tr>
              <tr><th scope="row">Vlaanderen: centrale stookolieketel vanaf 20 kW</th><td>Jaarlijks</td></tr>
              <tr><th scope="row">Vlaanderen: centraal toestel op vaste brandstof</th><td>Jaarlijks</td></tr>
              <tr><th scope="row">Vlaanderen: centrale gas- of stookolieketel onder 20 kW</th><td>Onderhoud aanbevolen; geen vaste verplichting onder deze regel</td></tr>
              <tr><th scope="row">Brussel: gasketel of afzonderlijke gaswaterverwarmer</th><td>Tweejaarlijkse EPB-periodieke controle</td></tr>
              <tr><th scope="row">Brussel: ketel op vloeibare of vaste brandstof</th><td>Jaarlijks</td></tr>
            </tbody>
          </table></div>
          <p>De uitkomst helpt bij plannen. De volgende datum op uw attest en de oorspronkelijke cyclus blijven leidend. In Vlaanderen vermeldt de overheid een mogelijke verlenging tot drie maanden; de daaropvolgende cyclus verschuift daardoor niet mee.</p>
          <p>Een nieuw, vervangen, verplaatst of gewijzigd toestel kan een aparte ingebruiknamecontrole vragen. Lees daarover bij <Link href="/keuring">keuring van een cv-installatie</Link>. Voor een storing is <Link href="/herstelling">herstelling</Link> de passende aanvraag.</p>
          <p>Deze calculator bevestigt geen veilige werking of wettelijke conformiteit. De regels voor stookolie en vaste brandstof staan hier ter informatie; de dienstverlening moet met een bevoegde uitvoerder worden afgestemd.</p>
        </div>
      </section>
      <section className="section"><div className="shell related-grid">
        <div><h2>Wat legt u klaar?</h2><ul className="check-list"><li>Toestelmerk, exact model en maximumvermogen</li><li>Laatste onderhoudsdocumenten en eventuele ingebruiknamerapporten</li><li>Gewest, brandstof en informatie over recente wijzigingen</li></ul><p>Meer uitleg: <Link href="/advies/onderhoudsattest-cv-ketel">uw onderhoudsattest bewaren en nakijken</Link> en <Link href="/onderhoud">cv-ketelonderhoud aanvragen</Link>.</p></div>
        <div><h2>Bronnen en verantwoordelijke</h2><p>Uitgegeven door <Link href="/over-ons">AB Service</Link>. Regels gecontroleerd op <time dateTime="2026-10-10">10 oktober 2026</time>.</p><ul className="link-list"><li><a href={maintenanceSources.vlaanderen} target="_blank" rel="noopener noreferrer">Vlaanderen: verplicht onderhoud ↗</a></li><li><a href={maintenanceSources.brussel} target="_blank" rel="noopener noreferrer">Leefmilieu Brussel: EPB-periodieke controle ↗</a></li></ul></div>
      </div></section>
    </>
  );
}
