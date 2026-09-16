import ServicePage from "@/components/service-page";
import { contentImages } from "@/content/media.mjs";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";

export const metadata = buildPageMetadata(getPageDefinition("/installaties/gasketels"));

export default function GasketelsPage() {
  return (
    <ServicePage
      breadcrumb={[
        { name: "Installaties", path: "/installaties" },
        { name: "Gasketels", path: "/installaties/gasketels" },
      ]}
      eyebrow="Gasketelinstallatie"
      title="Een gasketel laten plaatsen of vervangen in Antwerpen"
      intro="De juiste oplossing hangt af van de woning, warmte- en warmwaterbehoefte, bestaande leidingen, regeling en rookgasafvoer. Daarom volgt een betrouwbare prijs pas na voldoende technische informatie."
      answer="AB Service werkt niet met een verzonnen online vanafprijs. Vraag een beoordeling aan met foto’s en toestelgegevens. Na controle kan een voorstel de gekozen oplossing, materialen, werk, uitsluitingen, btw en afspraken duidelijk omschrijven."
      image={contentImages.gasBoiler}
      sections={[
        {
          eyebrow: "Beoordeling",
          title: "Niet alleen het toestel telt",
          items: [
            "Warmteverlies, gebruikspatroon en gewenste warmwatercapaciteit",
            "Staat van leidingen, radiatoren, regeling en condensafvoer",
            "Mogelijkheden voor luchttoevoer en rookgasafvoer",
            "Bereikbaarheid, bescherming en afvoer van oud materiaal",
          ],
        },
        {
          eyebrow: "Offerte",
          title: "Leg de volledige scope schriftelijk vast",
          paragraphs: [
            "Een offerte hoort duidelijk te maken welke materialen, aansluitingen, aanpassingen, werkuren en documenten inbegrepen zijn. Ook uitsluitingen en mogelijke meerwerken verdienen een heldere beschrijving.",
            "Deze website noemt geen vaste merken of fabrikantpartners zolang de actuele commerciële of technische relatie niet is bevestigd. De geschikte oplossing wordt per installatie besproken.",
          ],
        },
        {
          eyebrow: "Premies",
          title: "Controleer actuele steun rechtstreeks bij de overheid",
          paragraphs: [
            "Premies en financieringsmaatregelen veranderen. De vroegere renovatiepremie voor een gasketel is stopgezet; alleen beperkte uitzonderingen of financieringsregels kunnen nog relevant zijn. Neem geen investeringsbeslissing op basis van oude marketingteksten.",
          ],
        },
      ]}
      steps={[
        { title: "Aanvraag", text: "Deel woning- en installatiegegevens." },
        { title: "Opname", text: "Technische randvoorwaarden worden beoordeeld." },
        { title: "Voorstel", text: "Oplossing en scope worden schriftelijk vastgelegd." },
        { title: "Plaatsing", text: "Uitvoering en oplevering volgen de afspraak." },
      ]}
      relatedLinks={[
        { label: "Installatie-overzicht", href: "/installaties" },
        { label: "Keuring bij eerste ingebruikname", href: "/keuring" },
        { label: "Prijsfactoren en offertes", href: "/tarieven" },
      ]}
      sourceLinks={[
        {
          label: "Vlaanderen/VEKA: wijzigingen aan premies en leningen",
          href: "https://www.vlaanderen.be/veka/webinar-over-premies-leningen-kortingen-en-warmtepompklaar-op-23-januari-2025",
        },
      ]}
    />
  );
}
