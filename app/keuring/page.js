import ServicePage from "@/components/service-page";
import { contentImages } from "@/content/media.mjs";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";

export const metadata = buildPageMetadata(getPageDefinition("/keuring"));

export default function KeuringPage() {
  return (
    <ServicePage
      breadcrumb={[{ name: "Keuring", path: "/keuring" }]}
      eyebrow="Eerste ingebruikname"
      title="Keuring van een nieuwe of gewijzigde cv-installatie"
      intro="Na plaatsing, vervanging of een technische wijziging kan een afzonderlijke controle nodig zijn. De vereiste handeling en timing verschillen tussen Vlaanderen en Brussel; leg het gewest en de uitgevoerde wijziging daarom meteen uit."
      answer="In Vlaanderen wordt een nieuw of gewijzigd centraal stooktoestel in de toepasselijke situaties vóór ingebruikname gekeurd. In Brussel geldt voor een nieuw of vervangen centraal verwarmingssysteem op gas een EPB-oplevering binnen een maand na indienststelling. Een afzonderlijke gaswaterverwarmer krijgt bij plaatsing een eerste EPB-periodieke controle."
      contactService="Keuring cv-installatie"
      image={contentImages.inspection}
      sections={[
        {
          eyebrow: "Vlaanderen",
          title: "Keuring vóór ingebruikname of beoordeling na een wijziging",
          items: [
            "Een nieuw centraal stooktoestel wordt geplaatst",
            "Een bestaand toestel wordt vervangen of verplaatst",
            "De installatie of afvoer wordt op een relevante manier gewijzigd",
            "Documenten bij ingebruikname ontbreken of moeten worden verduidelijkt",
          ],
          paragraphs: [
            "Een nieuw centraal stooktoestel mag pas in gebruik worden genomen wanneer het keuringsrapport dat toestaat. Na een wijziging aan het verbrandingsgedeelte moet een erkende technicus de goede en veilige werking opnieuw beoordelen. Niet iedere hydraulische aanpassing is daarmee automatisch een nieuwe eerste-keuring.",
          ],
        },
        {
          eyebrow: "Brussel",
          title: "EPB-oplevering en periodieke controle hebben een andere functie",
          paragraphs: [
            "Bij plaatsing of vervanging van een centrale gasketel moet de EPB-oplevering uiterlijk binnen een maand na indienststelling gebeuren. De erkende EPB-verwarmingsadviseur moet de bevoegdheid hebben die bij het systeem past.",
            "Een afzonderlijk gaswaterverwarmingstoestel krijgt bij plaatsing of vervanging een eerste EPB-periodieke controle door een EPB-verwarmingsketeltechnicus. Bij een verplaatsing op hetzelfde systeem of een interventie aan de verbranding kunnen eveneens periodieke controles vereist zijn. Laat de juiste handeling bepalen op basis van wat daadwerkelijk veranderde.",
          ],
        },
        {
          eyebrow: "Voorbereiding",
          title: "Leg installatiegegevens en documenten klaar",
          paragraphs: [
            "Bezorg merk, model, vermogen, brandstof, plaatsingsdatum en informatie over de rookgasafvoer. Voeg beschikbare handleidingen, schema’s en eerdere verslagen toe.",
            "Een bedrijf is niet automatisch ‘erkend’ omdat het verwarmingswerk uitvoert. Controleer vóór de opdracht of de individuele technicus de erkenning bezit die voor uw installatie vereist is.",
          ],
        },
        {
          eyebrow: "Na de controle",
          title: "Bewaar het rapport bij de installatie",
          paragraphs: [
            "Bewaar het keuringsrapport of EPB-attest en volg eventuele opmerkingen op. De uitkomst volgt uit onderzoek van de werkelijke installatie: toegankelijkheid, opstelling, verbranding, toevoer en afvoer moeten ter plaatse worden beoordeeld.",
          ],
        },
      ]}
      steps={[
        { title: "Context", text: "Omschrijf wat werd geplaatst of gewijzigd." },
        { title: "Documenten", text: "Verzamel toestel- en installatiegegevens." },
        { title: "Bevoegdheid", text: "Controleer de vereiste erkenning." },
        { title: "Rapport", text: "Bewaar het ondertekende document zorgvuldig." },
      ]}
      relatedLinks={[
        { label: "Onderhoudsregel controleren met de gratis tool", href: "/tools/onderhoudscheck" },
        { label: "Onderhoudsattesten en ingebruiknamedocumenten", href: "/advies/onderhoudsattest-cv-ketel" },
        { label: "Verschil met periodiek onderhoud", href: "/onderhoud" },
        { label: "Nieuwe gasketel laten beoordelen", href: "/installaties/gasketels" },
        { label: "Contact opnemen", href: "/contact" },
      ]}
      sourceLinks={[
        {
          label: "Vlaanderen: keuring van een nieuwe of gewijzigde cv-installatie",
          href: "https://www.vlaanderen.be/verplichte-keuring-van-een-nieuwe-of-gewijzigde-cv-installatie",
        },
        {
          label: "Leefmilieu Brussel: controles bij plaatsing, wijziging en gebruik",
          href: "https://leefmilieu.brussels/pro/regelgeving-en-inspectie/verplichtingen-en-vergunningen/technische-installaties-epb-controles-en-onderhoud",
        },
      ]}
    />
  );
}
