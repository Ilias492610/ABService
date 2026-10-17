import Breadcrumbs from "@/components/breadcrumbs";
import PageHero from "@/components/page-hero";
import RegisteredSeat from "@/components/registered-seat";
import { business } from "@/content/business.mjs";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";

export const metadata = buildPageMetadata(getPageDefinition("/privacy-policy"));

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Privacybeleid", path: "/privacy-policy" }]} />
      <PageHero eyebrow="Privacy" title="Hoe AB Service website- en contactgegevens verwerkt" intro="Dit beleid beschrijft de systemen die de website daadwerkelijk gebruikt: het contactformulier, Mailgun voor e-mailbezorging, Vercel voor hosting en analyse, en Google Places voor actuele profiel- en beoordelingsgegevens." />
      <section className="section"><div className="shell legal-copy">
        <h2>1. Wie verwerkt uw gegevens?</h2><p>AB Service, ondernemingsnummer {business.vatId}, is het aanspreekpunt voor gegevens die u via deze website verstrekt. Voor privacyvragen kunt u mailen naar <a href={`mailto:${business.email}`}>{business.email}</a>.</p>
        <RegisteredSeat />
        <h2>2. Contactaanvragen</h2><p>Het formulier kan naam, telefoonnummer, e-mailadres, locatiegegevens, toestelgegevens en uw bericht bevatten. Deze gegevens worden gebruikt om uw vraag te beoordelen, contact op te nemen, een afspraak of offerte voor te bereiden en de communicatie te bewaren zolang dat voor de aanvraag, uitvoering of wettelijke verplichtingen nodig is.</p>
        <h2>3. E-mailbezorging</h2><p>Formulierberichten worden via Mailgun verzonden naar het ingestelde AB Service-adres. Deel geen gevoelige medische, financiële of identiteitsdocumenten via het vrije berichtveld.</p>
        <h2>4. Website-analyse</h2><p>De website configureert Vercel Analytics voor geaggregeerd inzicht in paginaweergaven en beperkte interactiegebeurtenissen. De ontvangst van deze gebeurtenissen in de rapportage is nog niet bevestigd; deze configuratie bewijst geen gemeten bezoeken of aanvragen. Voor verzending naar deze analyse worden URL-parameters en fragmenten verwijderd. Contactevents bevatten alleen vooraf bepaalde context zoals paginalocatie en gekozen dienst; naam, e-mail, telefoon, adres en berichtinhoud worden niet als eventeigenschappen verstuurd. De onderhoudscheck gebruikt alleen beperkte keuzecodes voor gewest en uitkomst, niet de ingevoerde onderhoudsdatum. De watermetercheck gebruikt alleen een vaste uitkomstcode (observatie, onbekend, onveilig of ongeldige invoer) en paginalocatie; een optionele contactklik bevat ook de gekozen dienst. Meterstanden, meetduur, eenheid en berekende hoeveelheden worden niet als eventeigenschappen verstuurd. De website configureert momenteel geen Plausible, Google Analytics of Google Ads.</p>
        <h2>5. Google-profiel en beoordelingen</h2><p>De homepage vraagt via de server actuele publieke profielgegevens op uit Google Places, waaronder de naam, gemiddelde score, het aantal beoordelingen en — wanneer Google ze beschikbaar stelt — maximaal vijf reviewteksten met auteursvermelding. De zwevende profielkoppeling vraagt via een afzonderlijk serverendpoint alleen de actuele score op. Deze Places-inhoud wordt niet vooraf opgehaald of door AB Service opgeslagen. De technische Place ID mag volgens het Google-beleid wel blijvend worden bewaard. Wanneer auteursfoto’s beschikbaar zijn, kan uw browser die rechtstreeks bij Google laden. Op deze verwerking zijn ook het <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">privacybeleid van Google</a> en de toepasselijke Google Maps-voorwaarden van toepassing.</p>
        <h2>6. Technische verwerking</h2><p>Hosting-, beveiligings- en analyseleveranciers kunnen technische gegevens zoals IP-adres, browserinformatie, tijdstip en opgevraagde URL verwerken om de website te leveren, misbruik te voorkomen en prestaties te meten. Hun eigen bewaartermijnen en locaties volgen uit de toepasselijke leveranciersvoorwaarden.</p>
        <h2>7. Uw rechten</h2><p>U kunt vragen om inzage, correctie, verwijdering, beperking, overdraagbaarheid of bezwaar voor zover de toepasselijke regels dat toelaten. Vermeld voldoende informatie om uw verzoek te kunnen terugvinden, maar stuur geen identiteitsbewijs zonder dat dit noodzakelijk en veilig is afgesproken.</p>
        <h2>8. Lokale hulpmiddelen en wijzigingen</h2><p>De onderhoudscheck berekent zijn uitleg in uw browser zonder account en zonder de invoer als aanvraag te versturen. Alleen als u zelf kiest voor contact, wordt een samenvatting van de gekozen toestelgegevens en eventuele onderhoudsdatum naar het formulier overgenomen.</p><p>Ook de watermetercheck werkt lokaal: meterstanden, meetduur, eenheid en berekende hoeveelheden blijven in uw browser. De tool bewaart ze niet en stuurt ze niet naar een server, account of URL. Bij een optionele contactklik gaat uitsluitend de categorie positief verschil of nulverschil en de bijbehorende dienst via het URL-fragment naar het formulier. Uw standen en meetperiode komen niet in die samenvatting. U kunt de overgenomen tekst aanpassen; verzending van een contactaanvraag gebeurt pas na uw eigen formulieractie.</p><p>Dit beleid is bijgewerkt op <time dateTime="2026-10-13">13 oktober 2026</time>. Bij een verandering van formulieren, analytics, advertenties of andere gegevensverwerking wordt deze pagina aangepast.</p>
      </div></section>
    </>
  );
}
