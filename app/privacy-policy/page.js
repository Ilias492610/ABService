import Breadcrumbs from "@/components/breadcrumbs";
import PageHero from "@/components/page-hero";
import { business } from "@/content/business.mjs";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";

export const metadata = buildPageMetadata(getPageDefinition("/privacy-policy"));

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Privacybeleid", path: "/privacy-policy" }]} />
      <PageHero eyebrow="Privacy" title="Hoe AB Service website- en contactgegevens verwerkt" intro="Dit beleid beschrijft de systemen die de website daadwerkelijk gebruikt: het contactformulier, Mailgun voor e-mailbezorging en Vercel voor hosting en website-analyse." />
      <section className="section"><div className="shell legal-copy">
        <h2>1. Wie verwerkt uw gegevens?</h2><p>AB Service, ondernemingsnummer {business.vatId}, is het aanspreekpunt voor gegevens die u via deze website verstrekt. Voor privacyvragen kunt u mailen naar <a href={`mailto:${business.email}`}>{business.email}</a>.</p>
        <h2>2. Contactaanvragen</h2><p>Het formulier kan naam, telefoonnummer, e-mailadres, locatiegegevens, toestelgegevens en uw bericht bevatten. Deze gegevens worden gebruikt om uw vraag te beoordelen, contact op te nemen, een afspraak of offerte voor te bereiden en de communicatie te bewaren zolang dat voor de aanvraag, uitvoering of wettelijke verplichtingen nodig is.</p>
        <h2>3. E-mailbezorging</h2><p>Formulierberichten worden via Mailgun verzonden naar het ingestelde AB Service-adres. Deel geen gevoelige medische, financiële of identiteitsdocumenten via het vrije berichtveld.</p>
        <h2>4. Website-analyse</h2><p>De website gebruikt Vercel Analytics om geaggregeerd inzicht te krijgen in paginaweergaven, prestaties en beperkte interactiegebeurtenissen. Contactevents bevatten alleen context zoals paginalocatie en gekozen dienst; naam, e-mail, telefoon, adres en berichtinhoud worden niet als eventeigenschappen verstuurd. De website configureert momenteel geen Plausible, Google Analytics of Google Ads.</p>
        <h2>5. Technische verwerking</h2><p>Hosting-, beveiligings- en analyseleveranciers kunnen technische gegevens zoals IP-adres, browserinformatie, tijdstip en opgevraagde URL verwerken om de website te leveren, misbruik te voorkomen en prestaties te meten. Hun eigen bewaartermijnen en locaties volgen uit de toepasselijke leveranciersvoorwaarden.</p>
        <h2>6. Uw rechten</h2><p>U kunt vragen om inzage, correctie, verwijdering, beperking, overdraagbaarheid of bezwaar voor zover de toepasselijke regels dat toelaten. Vermeld voldoende informatie om uw verzoek te kunnen terugvinden, maar stuur geen identiteitsbewijs zonder dat dit noodzakelijk en veilig is afgesproken.</p>
        <h2>7. Wijzigingen</h2><p>Dit beleid is bijgewerkt op 16 september 2026. Bij een verandering van formulieren, analytics, advertenties of andere gegevensverwerking moet deze pagina worden aangepast voordat die wijziging wordt gepubliceerd.</p>
      </div></section>
    </>
  );
}
