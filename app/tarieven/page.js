import Breadcrumbs from "@/components/breadcrumbs";
import ContactCta from "@/components/contact-cta";
import PageHero from "@/components/page-hero";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";

export const metadata = buildPageMetadata(getPageDefinition("/tarieven"));

const priceFactors = [
  ["Onderhoud", "Toesteltype, vermogen, bereikbaarheid, vervuiling, eerdere documenten en vereiste metingen."],
  ["Herstelling", "Diagnose, benodigde tijd, onderdelen, bereikbaarheid, vervolgwerk en de afgesproken planning."],
  ["Installatie", "Materiaalkeuze, dimensionering, leidingwerk, afvoer, regeling, bescherming, demontage en oplevering."],
  ["Sanitair", "Toestel, leidingtracé, afsluitbaarheid, afvoer, wandopbouw, bereikbaarheid en gewenste afwerking."],
];

export default function TarievenPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Tarieven", path: "/tarieven" }]} />
      <PageHero
        eyebrow="Prijsinformatie"
        title="Tarieven zonder lokprijs of verrassende belofte"
        intro="Een verantwoord bedrag volgt uit de werkelijke situatie. Deze pagina toont welke informatie nodig is om een aanvraag te beoordelen en welke onderdelen u in een offerte kunt laten verduidelijken."
        ctaLabel="Vraag een beoordeling aan"
      />
      <section className="section section-compact">
        <div className="shell narrow">
          <p className="answer-box">
            AB Service publiceert geen vast tarief zolang verplaatsing, diagnose, materiaal,
            toegang en scope niet als actuele prijslijst zijn bevestigd. Vraag vóór uitvoering
            welke kostenbasis geldt en laat grotere werkzaamheden schriftelijk afbakenen.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <p className="eyebrow">Prijsfactoren</p>
          <h2>Waarom de kost per opdracht verschilt</h2>
          <div className="cards-grid" style={{ marginTop: "2rem" }}>
            {priceFactors.map(([title, text]) => (
              <article className="card" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-muted">
        <div className="shell narrow prose-block">
          <p className="eyebrow">Offertecheck</p>
          <h2>Welke vragen maken een voorstel duidelijker?</h2>
          <ul className="check-list">
            <li>Zijn verplaatsing, diagnose en werkuren afzonderlijk of samen opgenomen?</li>
            <li>Welke materialen en hoeveelheden zijn inbegrepen?</li>
            <li>Is het toepasselijke btw-tarief vermeld en onder welke voorwaarden?</li>
            <li>Welke werken, afwerking en documenten vallen buiten de scope?</li>
            <li>Hoe worden onverwachte gebreken en meerwerk eerst gemeld en goedgekeurd?</li>
            <li>Wanneer zijn planning en prijs bindend bevestigd?</li>
          </ul>
        </div>
      </section>
      <section className="section">
        <div className="shell narrow prose-block">
          <p className="eyebrow">Sneller beoordelen</p>
          <h2>Bezorg meteen bruikbare informatie</h2>
          <p>
            Voeg merk, model, foto’s, foutcode, afmetingen en een korte omschrijving toe. Voor
            installatievragen helpen ook het huidige systeem, de gewenste wijziging en de
            toegankelijkheid. Een foto vervangt geen plaatsbezoek, maar voorkomt onnodige
            aannames.
          </p>
        </div>
      </section>
      <ContactCta title="Vraag een offerte op basis van echte informatie" />
    </>
  );
}
