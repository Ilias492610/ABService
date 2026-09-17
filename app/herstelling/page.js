import ServicePage from "@/components/service-page";
import { contentImages } from "@/content/media.mjs";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";

export const metadata = buildPageMetadata(getPageDefinition("/herstelling"));

export default function HerstellingPage() {
  return (
    <ServicePage
      breadcrumb={[{ name: "Herstelling", path: "/herstelling" }]}
      eyebrow="Verwarming en warm water"
      title="Herstelling van cv-ketel en verwarming"
      intro="Geen verwarming, geen warm water, drukverlies of een terugkerende foutcode? Noteer wat u ziet en doet, zodat AB Service de aanvraag gericht kan beoordelen."
      answer="Een foutcode is een aanwijzing, geen volledige diagnose. Vermeld het exacte toestelmodel, de code, wanneer het probleem begon en of er gasgeur, waterverlies, lawaai of stroomuitval is. Een afspraak en interventietijd zijn pas bevestigd na contact."
      warning="Ruikt u gas, vermoedt u koolstofmonoxide of ziet u water bij elektrische onderdelen? Vermijd vlammen en schakelaars, verlaat de ruimte wanneer nodig en contacteer de bevoegde nood- of distributiedienst. Gebruik het toestel niet opnieuw tot de situatie veilig is verklaard."
      image={contentImages.diagnosticsMarketing}
      sections={[
        {
          eyebrow: "Eerste controle",
          title: "Wat u veilig kunt noteren",
          items: [
            "Exacte merk- en modelaanduiding en de volledige foutcode",
            "Huidige waterdruk zoals zichtbaar op het toestel",
            "Of verwarming, warm water of beide uitvallen",
            "Wanneer de storing optreedt en of ze na één reset terugkeert",
            "Foto’s van het display en de installatie, zonder afscherming te verwijderen",
          ],
        },
        {
          eyebrow: "Niet doen",
          title: "Vermijd herhaald resetten en zelf sleutelen",
          paragraphs: [
            "Een enkele reset volgens de gebruikershandleiding kan in sommige gevallen passend zijn. Blijft de code terugkomen, stop dan. Herhaald resetten kan een onderliggend probleem verbergen en maakt een onveilige situatie niet veilig.",
            "Open geen verbrandingsruimte, gasblok of elektrische behuizing. Controleer alleen handelingen die expliciet voor gebruikers in de handleiding staan.",
          ],
        },
        {
          eyebrow: "Prijs",
          title: "Waarom een herstelling geen vast bedrag heeft",
          paragraphs: [
            "De kost hangt af van diagnose, bereikbaarheid, benodigde onderdelen, bijkomend herstelwerk en de afgesproken timing. Een foutcode alleen bepaalt niet welk onderdeel defect is.",
            "Vraag vooraf hoe onderzoek, verplaatsing, onderdelen en vervolgwerk in de offerte of werkbon worden behandeld.",
          ],
        },
      ]}
      steps={[
        { title: "Melding", text: "Deel toestelgegevens, symptomen en foto’s." },
        { title: "Risicocheck", text: "Veiligheidsinformatie krijgt voorrang." },
        { title: "Diagnose", text: "De oorzaak wordt ter plaatse onderzocht." },
        { title: "Vervolg", text: "Werk en onderdelen worden afgestemd en vastgelegd." },
      ]}
      relatedLinks={[
        { label: "Zoek een foutcode op", href: "/foutcodes" },
        { label: "Veilige controle bij drukverlies", href: "/advies/drukverlies-cv-ketel" },
        { label: "Onderhoud van een cv-ketel", href: "/onderhoud" },
        { label: "Tarieven en offertes", href: "/tarieven" },
      ]}
    />
  );
}
