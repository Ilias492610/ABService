import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";
import ContactCta from "@/components/contact-cta";
import PageHero from "@/components/page-hero";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";

export const metadata = buildPageMetadata(getPageDefinition("/faq"));

const groups = [
  {
    title: "Onderhoud en keuring",
    questions: [
      ["Moet elke gasketel jaarlijks worden onderhouden?", "Nee. In Vlaanderen geldt voor centrale stooktoestellen op gas vanaf 20 kW in het algemeen een tweejaarlijkse onderhoudsplicht. Voor lagere vermogens is onderhoud aanbevolen, maar de wettelijke situatie verschilt."],
      ["Is onderhoud hetzelfde als een keuring?", "Nee. Periodiek onderhoud gaat over een bestaande installatie. Een keuring bij eerste ingebruikname is een afzonderlijke controle na bepaalde plaatsingen, vervangingen of wijzigingen."],
      ["Wie mag een verplicht onderhoud of keuring uitvoeren?", "Dat hangt af van brandstof en handeling. Wanneer een erkenning vereist is, moet de uitvoerende technicus de passende actuele erkenning bezitten."],
    ],
  },
  {
    title: "Herstelling en veiligheid",
    questions: [
      ["Mag ik een foutcode resetten?", "Volg alleen de gebruikershandleiding van uw exacte toestel. Hoogstens één reset kan passend zijn; komt de storing terug, laat de oorzaak onderzoeken."],
      ["Wat doe ik bij gasgeur?", "Gebruik geen vlammen of elektrische schakelaars. Ventileer alleen als dat veilig kan, verlaat de ruimte en bel vanop een veilige plaats de bevoegde nood- of distributiedienst."],
      ["Garandeert AB Service een aankomsttijd?", "Nee. De website belooft geen 24/7-bereikbaarheid, interventie binnen een vast aantal minuten of herstelling op dezelfde dag. Timing is pas bevestigd na rechtstreeks contact."],
    ],
  },
  {
    title: "Prijs en aanvraag",
    questions: [
      ["Waarom staan er geen vaste prijzen op de website?", "De kost hangt af van diagnose, materiaal, toegang, toesteltype, werkvolume en planning. Zonder actuele bewezen prijslijst zou een vast bedrag misleidend zijn."],
      ["Welke informatie moet ik meesturen?", "Merk, model, foutcode, duidelijke foto’s, de huidige situatie en wat u precies wilt laten doen. Voor installaties helpen ook afmetingen en informatie over bestaande leidingen en afvoer."],
      ["Is een formulierinzending al een afspraak?", "Nee. De verzending bevestigt alleen dat de aanvraag is ontvangen. Een afspraak, timing en prijs worden afzonderlijk bevestigd."],
    ],
  },
  {
    title: "Lekken, afvoer en renovatie",
    questions: [
      ["Voert AB Service lekdetectie en waterlekherstel uit?", "Ja. Deel de zichtbare signalen, de locatie en foto’s. De geschikte onderzoeksmethode en het mogelijke herstel hangen af van leidingtype en bereikbaarheid."],
      ["Kan AB Service een verstopte afvoer aanpakken?", "Ja, voor bereikbare sanitaire afvoeren. Vermeld altijd welke chemische producten al zijn gebruikt en of meerdere afvoeren tegelijk problemen geven."],
      ["Doet AB Service volledige badkamerrenovaties?", "AB Service voert het afgesproken loodgieters- en sanitaire deel uit. Wie sloop, elektriciteit, ventilatie, waterdichting, tegels en andere afwerking verzorgt, wordt vooraf duidelijk vastgelegd."],
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }]} />
      <PageHero eyebrow="Veelgestelde vragen" title="Heldere antwoorden over verwarming en sanitair" intro="Lees eerst het korte antwoord en ga via de links naar de volledige dienstinformatie. Voor uw specifieke installatie blijft een beoordeling nodig." />
      <section className="section">
        <div className="shell narrow">
          {groups.map((group) => (
            <section key={group.title} style={{ marginBottom: "3rem" }}>
              <h2>{group.title}</h2>
              <div className="faq-list">
                {group.questions.map(([question, answer]) => (
                  <details key={question}>
                    <summary>{question}</summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
          <p>Meer context: <Link href="/onderhoud">onderhoud</Link>, <Link href="/keuring">keuring</Link>, <Link href="/herstelling">herstelling</Link>, <Link href="/diensten">alle diensten</Link> en <Link href="/tarieven">tarieven</Link>.</p>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
