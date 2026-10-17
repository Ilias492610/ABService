import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";
import PageHero from "@/components/page-hero";
import WaterMeterCheck from "@/components/water-meter-check";
import { getPageDefinition } from "@/content/site-content.mjs";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { waterMeterCitations } from "@/libs/cited-sources.mjs";

export const metadata = buildPageMetadata(getPageDefinition("/tools/watermetercheck"));

export default function WaterMeterCheckPage() {
  return <>
    <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Advies", path: "/advies" }, { name: "Watermetercheck", path: "/tools/watermetercheck" }]} />
    <PageHero eyebrow="Gratis hulpmiddel · zonder account" title="Wat registreerde uw watermeter tijdens uw meetperiode?" intro="Vergelijk twee totale meterstanden van dezelfde eigen meter. U krijgt de geregistreerde hoeveelheid, het gemiddelde per uur en alle beperkingen van die observatie. Dit is geen lekdiagnose." ctaLabel="Start de watermetercheck" ctaHref="#watermetercheck" />
    <section className="section section-compact"><div className="shell narrow"><div className="warning-box"><strong>Eerst veilig kijken</strong><p>Lees de meter alleen af als die veilig bereikbaar is. Bij water nabij elektriciteit of onveilige toegang: stop en houd afstand. Raak geen installatie aan, open geen kast, bedien geen schakelaars en ga niet in het water voor deze check. Zoek bij onmiddellijk gevaar passende noodhulp. Wacht bij een actief waterlek of overstroming niet op een lange meting.</p></div></div></section>
    <section className="section" id="watermetercheck"><div className="shell"><WaterMeterCheck /></div></section>
    <section className="section section-muted"><div className="shell narrow prose-block">
      <p className="eyebrow">Voorbereiden en aflezen</p><h2>Twee totale standen van dezelfde meter</h2>
      <ol className="link-list"><li>Ga na of de meter alleen uw eigen watercircuit meet. Een gedeelde meter kan ook het gebruik van anderen registreren.</li><li>Lees de volledige totale stand en de eenheid op het display. De totale stand is iets anders dan debiet in m³/uur. Raadpleeg bij een onduidelijk display de uitleg van uw waterbedrijf.</li><li>Noteer een eerste totale stand. Gebruik gedurende de hele meetperiode geen water via kranen, toiletten of toestellen. Sluit ook automatisch gebruik uit, zoals een waterontharder of automatisch bijvullen; dit zijn voorbeelden, geen volledige lijst.</li><li>Lees dezelfde meter opnieuw af in dezelfde eenheid. Noteer hoeveel minuten er tussen beide aflezingen lagen. Zonder bekende meetduur kan de tool geen gemiddelde berekenen.</li></ol>
      <h2>Wat zegt de observatie wel en niet?</h2><p>Een positief verschil toont alleen geregistreerd water tijdens de gekozen periode. Onopgemerkt verbruik kan dat verklaren. Een onverklaard verschil vraagt beoordeling, maar deze check bepaalt geen oorzaak of locatie. Een nulverschil sluit een tijdelijk lek of een lek in een ander circuit niet uit.</p><p>Het gemiddelde per uur geldt alleen voor uw meetperiode. De check berekent geen jaarverlies, herstelkosten, verzekering, juridische kostenverdeling of herstelurgentie. Een dalende stand vraagt controle van meter en aflezing; de tool kan telleromloop of vervanging niet beoordelen.</p><p>Een probleem aan straat, meter of hoofdkraan meldt u bij uw eigen waterbedrijf. De Farys-bronnen helpen bij aflezen en vergelijken; ze maken Farys niet de bevoegde watermaatschappij voor elke woning. Meer context vindt u bij <Link href="/advies/watermeter-blijft-draaien">watermeter blijft draaien zonder bewust watergebruik</Link>.</p>
    </div></section>
    <section className="section"><div className="shell narrow prose-block"><h2>Officiële bronnen en uitgever</h2><p>Uitgegeven door <Link href="/over-ons">AB Service</Link>. Broninformatie nagekeken op <time dateTime="2026-10-11">11 oktober 2026</time>. Inhoud gewijzigd op <time dateTime="2026-10-11">11 oktober 2026</time>.</p><ul className="link-list">{waterMeterCitations.map(({ label, href }) => <li key={href}><a href={href} target="_blank" rel="noopener noreferrer">{label} ↗</a></li>)}</ul><p>De berekening gebeurt lokaal. Lees in ons <Link href="/privacy-policy">privacybeleid</Link> welke beperkte uitkomstcodes worden gebruikt en wat een optionele contactklik overneemt.</p></div></section>
  </>;
}
