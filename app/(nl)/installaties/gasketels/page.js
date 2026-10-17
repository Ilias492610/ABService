import ServicePage from "@/components/service-page";
import { contentImages } from "@/content/media.mjs";
import { coreSources } from "@/content/core-sources.mjs";
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
      answer="Vraag een beoordeling aan met foto’s en toestelgegevens. Na controle ontvangt u een voorstel waarin de gekozen oplossing, materialen, werk, uitsluitingen, btw en afspraken duidelijk worden omschreven."
      image={contentImages.boilerServiceMarketing}
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
            "AB Service onderhoudt en herstelt meerdere courante ketelmerken als onafhankelijke dienstverlener. Een merkvermelding is geen claim van officiële fabrikant- of dealerstatus. De geschikte oplossing wordt per installatie besproken.",
          ],
        },
        {
          eyebrow: "Controle en overdracht",
          title: "Controle en documenten afspreken",
          paragraphs: [
            "Leg vóór uw akkoord vast welke controle bij de installatie hoort. De controle is een afzonderlijke handeling naast de plaatsing en het latere periodiek onderhoud; de vereisten verschillen tussen Vlaanderen en Brussel.",
            "Vraag welke individuele professional de vereiste erkenning voor het gewest en de handeling bezit. Dat AB Service verwarmingswerk uitvoert, bewijst geen persoonlijke erkenning. Een afspraak over documenten is geen toezegging van goedkeuring.",
          ],
          items: [
            "Welke controle bij deze installatie en dit gewest hoort, en wie de controle organiseert",
            "Welke rapporten, attesten en overige documenten inbegrepen zijn, en wie de documenten ontvangt en bewaart",
          ],
          links: [
            { label: "Controle bij plaatsing of wijziging verduidelijken", href: "/keuring" },
            { label: "Attesten en installatiedocumenten bewaren en doorgeven", href: "/advies/onderhoudsattest-cv-ketel" },
          ],
        },
        {
          eyebrow: "Premies",
          title: "Controleer actuele steun rechtstreeks bij de overheid",
          paragraphs: [
            "In Vlaanderen is Mijn VerbouwPremie voor gascondensatieketels stopgezet. Controleer vóór uw investering de actuele voorwaarden voor renovatiesteun en financiering bij de Vlaamse overheid en uw Energiehuis. Een offerte houdt geen toezegging van financiële steun in.",
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
        { label: "Ondersteunde ketelmerken", href: "/merken" },
        { label: "Praktijkcase: gasketel vervangen", href: "/projecten/gasketel-vervangen" },
      ]}
      sourceLinks={[
        coreSources.renovationSupport,
        coreSources.renovationLoan,
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
