import ServicePage from "@/components/service-page";
import { contentImages } from "@/content/media.mjs";
import { coreSources } from "@/content/core-sources.mjs";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";

export const metadata = buildPageMetadata(getPageDefinition("/onderhoud"));

export default function OnderhoudPage() {
  return (
    <ServicePage
      breadcrumb={[{ name: "Onderhoud", path: "/onderhoud" }]}
      eyebrow="Cv-ketelonderhoud"
      title="Onderhoud van uw cv-ketel in Antwerpen"
      intro="AB Service behandelt onderhoudsaanvragen in Antwerpen, Vlaanderen en Brussel. De juiste controle hangt af van het gewest, toesteltype, brandstof en vermogen. Bezorg uw toestelgegevens en laatste attest om uw afspraak voor te bereiden."
      answer="In Vlaanderen geldt voor centrale gasketels vanaf 20 kW doorgaans tweejaarlijks onderhoud; onder 20 kW is onderhoud aanbevolen. In Brussel geldt voor gasketels en afzonderlijke gaswaterverwarmers een tweejaarlijkse EPB-periodieke controle, zonder dezelfde Vlaamse vermogensgrens."
      contactService="Onderhoud cv-ketel"
      image={contentImages.maintenance}
      sections={[
        {
          eyebrow: "Vlaanderen",
          title: "Vermogen en brandstof bepalen de onderhoudsregel",
          paragraphs: [
            "Voor centrale gasketels vanaf 20 kW voert een erkende technicus gasvormige brandstof het verplichte tweejaarlijkse onderhoud uit. Bij centrale gas- of stookolietoestellen onder 20 kW legt deze regel geen verplichte onderhoudstermijn op; de overheid raadt onderhoud wel aan.",
            "Centrale stookolietoestellen vanaf 20 kW en toestellen op vaste brandstof volgen in Vlaanderen een jaarlijkse regel. Deze informatie bevestigt niet dat AB Service die brandstoftypes onderhoudt; bespreek die uitvoering met een bevoegde vakmens.",
          ],
        },
        {
          eyebrow: "Brussel",
          title: "EPB-periodieke controle van ketel of gaswaterverwarmer",
          paragraphs: [
            "In het Brussels Hoofdstedelijk Gewest moeten gasketels en afzonderlijke gaswaterverwarmers om de twee jaar een EPB-periodieke controle krijgen. De Brusselse regel gebruikt hiervoor niet de Vlaamse grens van 20 kW. Voor ketels op vloeibare of vaste brandstof geldt een jaarlijkse controle.",
            "De controle omvat onderhoud en een nazicht van veiligheid, goede werking en rendement. Vraag vooraf naar de juiste bevoegdheid voor uw toestel en gewest. Voor een elektrisch warmwatertoestel volgt u de fabrikantinstructies; het is geen gaswaterverwarmer.",
          ],
        },
        {
          eyebrow: "Planning",
          title: "Controleer de datum én de installatiegeschiedenis",
          paragraphs: [
            "Gebruik de gratis onderhoudscheck om de gewone regel voor uw toestel te vinden. Vergelijk de richtdatum met uw attest en de oorspronkelijke onderhoudscyclus; één bezoekdatum vertelt niet of een eerdere beurt vertraagd was.",
            "Een nieuwe of vervangen verwarmingsketel, een verplaatsing of een wijziging aan de verbranding kan een afzonderlijke controle vragen. In Brussel krijgt een nieuw of vervangen centraal verwarmingssysteem op gas een EPB-oplevering; voor een afzonderlijke gaswaterverwarmer geldt een eerste EPB-periodieke controle bij plaatsing.",
          ],
        },
        {
          eyebrow: "Voorbereiding",
          title: "Wat u bij uw aanvraag kunt doorgeven",
          items: [
            "Gewest, merk, model, brandstof en nominaal vermogen van het toestel",
            "Datum van het vorige onderhoud en een foto van het attest, indien beschikbaar",
            "Huidige druk, foutcode of afwijkend gedrag",
            "Toegangssituatie rond toestel, rookgasafvoer en technische ruimte",
          ],
        },
        {
          eyebrow: "Na afloop",
          title: "Vraag naar de juiste documenten",
          paragraphs: [
            "Welke controle, reiniging, meting of afstelling nodig is, hangt af van het toestel en de installatie. Als wettelijk onderhoud van toepassing is, hoort daar een correct ingevuld attest bij van de bevoegde erkende technicus.",
            "Vraag vóór de afspraak naar de erkenning die voor uw toestel en gewest vereist is. Bewaar in Vlaanderen minstens de laatste twee onderhoudsattesten; in Brussel bewaart u het attest van de EPB-periodieke controle bij uw installatiedocumenten.",
          ],
        },
      ]}
      steps={[
        { title: "Gegevens", text: "Bezorg toesteltype, vermogen en laatste documenten." },
        { title: "Beoordeling", text: "De onderhoudsvraag en vereisten worden nagekeken." },
        { title: "Afspraak", text: "Timing en verwachte scope worden bevestigd." },
        { title: "Documenten", text: "Bewaar het verslag of attest bij uw installatie." },
      ]}
      relatedLinks={[
        { label: "Merk en exact model doorgeven voor onafhankelijke service", href: "/merken" },
        { label: "Gratis onderhoudscheck voor Vlaanderen en Brussel", href: "/tools/onderhoudscheck" },
        { label: "Welke onderhoudsdocumenten bewaart u?", href: "/advies/onderhoudsattest-cv-ketel" },
        { label: "Wanneer is een cv-keuring nodig?", href: "/keuring" },
        { label: "Probleem of foutcode laten beoordelen", href: "/herstelling" },
        { label: "Wat te doen bij terugkerend drukverlies", href: "/advies/drukverlies-cv-ketel" },
        { label: "Hoe worden tarieven bepaald?", href: "/tarieven" },
      ]}
      faq={[
        [
          "Hoe vaak moet een gasketel worden onderhouden?",
          "In Vlaanderen geldt voor centrale gasketels vanaf 20 kW tweejaarlijks onderhoud; onder 20 kW is onderhoud aanbevolen. In Brussel krijgen gasketels en afzonderlijke gaswaterverwarmers om de twee jaar een EPB-periodieke controle, zonder dezelfde Vlaamse vermogensgrens.",
        ],
        [
          "Is periodiek onderhoud hetzelfde als een controle bij ingebruikname of wijziging?",
          "Nee. Ingebruikname of een wijziging kan een afzonderlijke controle vragen. In Brussel krijgt een nieuw of vervangen centraal verwarmingssysteem op gas een EPB-oplevering; bij plaatsing van een afzonderlijke gaswaterverwarmer geldt een eerste EPB-periodieke controle. De gewone onderhoudscyclus en die afzonderlijke controle hebben elk hun eigen aanleiding.",
        ],
        [
          "Welke gegevens helpen om de afspraak voor te bereiden?",
          "Bezorg het gewest, merk, exacte model, brandstof en nominaal vermogen, samen met de datum van het vorige onderhoud en een foto van het laatste attest. Meld ook foutcodes of afwijkend gedrag en toon de toegang rond het toestel.",
        ],
      ]}
      sourceLinks={[
        {
          label: "Vlaanderen: verplicht onderhoud van uw cv-installatie",
          href: "https://www.vlaanderen.be/verplicht-onderhoud-van-uw-cv-installatie-centrale-verwarming",
        },
        coreSources.technicianRecognition,
        {
          label: "Leefmilieu Brussel: verplicht onderhoud en EPB-periodieke controle",
          href: "https://leefmilieu.brussels/verwarmingsketel",
        },
        {
          label: "Leefmilieu Brussel: controles bij plaatsing, wijziging en gebruik",
          href: "https://leefmilieu.brussels/pro/regelgeving-en-inspectie/verplichtingen-en-vergunningen/technische-installaties-epb-controles-en-onderhoud",
        },
      ]}
    />
  );
}
