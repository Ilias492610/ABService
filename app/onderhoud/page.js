import ServicePage from "@/components/service-page";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";

export const metadata = buildPageMetadata(getPageDefinition("/onderhoud"));

export default function OnderhoudPage() {
  return (
    <ServicePage
      breadcrumb={[{ name: "Onderhoud", path: "/onderhoud" }]}
      eyebrow="Cv-ketelonderhoud"
      title="Onderhoud van uw cv-ketel in Antwerpen"
      intro="Periodiek onderhoud ondersteunt een veilige, zuinige en betrouwbare werking. De wettelijke onderhoudsfrequentie hangt af van brandstof en vermogen; onderhoud is niet hetzelfde als een keuring bij eerste ingebruikname."
      answer="In Vlaanderen moet een centraal stooktoestel op gas met een vermogen vanaf 20 kW in het algemeen om de twee jaar worden onderhouden door een erkende technicus gasvormige brandstof. Voor toestellen onder 20 kW is periodiek onderhoud aanbevolen, maar niet op dezelfde manier wettelijk verplicht."
      sections={[
        {
          eyebrow: "Verschil",
          title: "Onderhoud is geen eerste-keuring",
          paragraphs: [
            "Bij onderhoud wordt de bestaande installatie gecontroleerd en onderhouden volgens de toepasselijke regels en technische noden. Een keuring bij eerste ingebruikname is een afzonderlijk moment, bijvoorbeeld na plaatsing, vervanging, verplaatsing of een relevante wijziging.",
            "Vraag bij twijfel welke handeling u nodig heeft. Het toesteltype, nominale vermogen, brandstof, bouwjaar en de laatste documenten helpen om dat correct te bepalen.",
          ],
        },
        {
          eyebrow: "Voorbereiding",
          title: "Wat u bij uw aanvraag kunt doorgeven",
          items: [
            "Merk, model en nominale vermogen van het toestel",
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
            "AB Service publiceert geen erkenningsnummer op deze website zolang dat nummer niet als eigenaarsevidence is bevestigd. Vraag die informatie vóór de afspraak wanneer erkenning voor uw opdracht vereist is.",
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
        { label: "Wanneer is een cv-keuring nodig?", href: "/keuring" },
        { label: "Probleem of foutcode laten beoordelen", href: "/herstelling" },
        { label: "Hoe worden tarieven bepaald?", href: "/tarieven" },
      ]}
      sourceLinks={[
        {
          label: "Vlaanderen: verplicht onderhoud van uw cv-installatie",
          href: "https://www.vlaanderen.be/verplicht-onderhoud-van-uw-cv-installatie-centrale-verwarming",
        },
        {
          label: "Vlaanderen: informatie over erkende technici",
          href: "https://www.vlaanderen.be/natuur-milieu-en-klimaat/informatie-voor-de-technicus-vloeibare-en-technicus-gasvormige-brandstof-cv-ketel",
        },
      ]}
    />
  );
}
