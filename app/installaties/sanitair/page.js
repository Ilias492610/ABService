import ServicePage from "@/components/service-page";
import { contentImages } from "@/content/media.mjs";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";

export const metadata = buildPageMetadata(getPageDefinition("/installaties/sanitair"));

export default function SanitairPage() {
  return (
    <ServicePage
      breadcrumb={[
        { name: "Installaties", path: "/installaties" },
        { name: "Sanitair", path: "/installaties/sanitair" },
      ]}
      eyebrow="Loodgieterswerk"
      title="Sanitaire installatie en loodgieterswerk in Antwerpen"
      intro="Voor de plaatsing of aanpassing van sanitaire toestellen en leidingen is een duidelijke scope nodig: wat blijft, wat verandert en welke afwerking hoort bij de opdracht?"
      answer="Bezorg foto’s, maten, het gewenste toestel en informatie over de bestaande toevoer en afvoer. AB Service kan daarna beoordelen of de aanvraag binnen het actieve loodgieters- en sanitaire aanbod past en welke informatie nog ontbreekt."
      warning="Bij een actieve waterlek: sluit de watertoevoer alleen af als u de afsluiter veilig kunt bereiken. Vermijd contact met water rond elektrische onderdelen en schakel indien nodig de bevoegde noodhulp in."
      image={contentImages.sanitaryMarketing}
      sections={[
        {
          eyebrow: "Mogelijke scope",
          title: "Gerichte sanitaire werken",
          items: [
            "Plaatsing of vervanging van sanitaire toestellen",
            "Aanpassing van bereikbare toevoer- en afvoerleidingen",
            "Onderzoek van een duidelijk omschreven sanitair probleem",
            "Aansluiting en controle binnen de overeengekomen werkzone",
          ],
        },
        {
          eyebrow: "Afbakening",
          title: "Geen totaalrenovatie beloven zonder opname",
          paragraphs: [
            "Een volledige badkamer omvat vaak breekwerk, elektriciteit, ventilatie, tegels, schrijnwerk en coördinatie met andere vakmensen. AB Service voert het afgesproken loodgieters- en sanitaire deel uit; andere disciplines worden vooraf duidelijk toegewezen.",
            "Beschrijf het gewenste eindresultaat en wat al voorbereid is. Na beoordeling wordt vastgelegd welke onderdelen AB Service zelf uitvoert en welke door andere vakmensen gebeuren.",
          ],
        },
        {
          eyebrow: "Prijs",
          title: "Materiaal, toegang en herstelwerk bepalen de kost",
          paragraphs: [
            "Hetzelfde toestel kan in twee woningen een heel andere werkhoeveelheid vragen. Leidingtracé, afsluitbaarheid, bereikbaarheid, afvoer, wandopbouw en gewenste afwerking zijn daarom relevante prijsfactoren.",
          ],
        },
      ]}
      steps={[
        { title: "Foto’s", text: "Toon de ruimte, aansluitingen en het huidige toestel." },
        { title: "Maten", text: "Deel relevante afmetingen en productinformatie." },
        { title: "Scope", text: "Spreek af wat wordt geplaatst en afgewerkt." },
        { title: "Uitvoering", text: "Werk en controle volgen de overeengekomen scope." },
      ]}
      relatedLinks={[
        { label: "Alle installaties", href: "/installaties" },
        { label: "Badkamerrenovatie", href: "/diensten/badkamerrenovatie" },
        { label: "Praktijkcase: sanitair vernieuwd", href: "/projecten/sanitair-vernieuwd" },
        { label: "Tarieven en offertes", href: "/tarieven" },
        { label: "Contact opnemen", href: "/contact" },
      ]}
    />
  );
}
