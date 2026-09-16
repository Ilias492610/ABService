import ServicePage from "@/components/service-page";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";

export const metadata = buildPageMetadata(getPageDefinition("/keuring"));

export default function KeuringPage() {
  return (
    <ServicePage
      breadcrumb={[{ name: "Keuring", path: "/keuring" }]}
      eyebrow="Eerste ingebruikname"
      title="Keuring van een nieuwe of gewijzigde cv-installatie"
      intro="Een keuring bij eerste ingebruikname is een afzonderlijke controle na bepaalde plaatsingen of wijzigingen. Ze mag niet worden verward met het periodieke onderhoud van een bestaand toestel."
      answer="In Vlaanderen moet een nieuw of gewijzigd centraal stooktoestel vóór de eerste ingebruikname worden gekeurd in de situaties die de overheid omschrijft. Dat geldt onder meer bij plaatsing, vervanging, verplaatsing of relevante wijziging. De keuring moet worden uitgevoerd door een bevoegde erkende technicus."
      sections={[
        {
          eyebrow: "Wanneer",
          title: "Situaties waarin een eerste-keuring relevant kan zijn",
          items: [
            "Een nieuw centraal stooktoestel wordt geplaatst",
            "Een bestaand toestel wordt vervangen of verplaatst",
            "De installatie of afvoer wordt op een relevante manier gewijzigd",
            "Documenten bij ingebruikname ontbreken of moeten worden verduidelijkt",
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
            "De uitkomst moet correct worden vastgelegd. Een website kan geen goedkeuring voorspellen: toegankelijkheid, opstelling, verbranding, toevoer en afvoer moeten op de echte installatie worden beoordeeld.",
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
        { label: "Verschil met periodiek onderhoud", href: "/onderhoud" },
        { label: "Nieuwe gasketel laten beoordelen", href: "/installaties/gasketels" },
        { label: "Contact opnemen", href: "/contact" },
      ]}
      sourceLinks={[
        {
          label: "Vlaanderen: keuring van een nieuwe of gewijzigde cv-installatie",
          href: "https://www.vlaanderen.be/verplichte-keuring-van-een-nieuwe-of-gewijzigde-cv-installatie",
        },
      ]}
    />
  );
}
