import ServicePage from "@/components/service-page";
import { contentImages } from "@/content/media.mjs";
import { coreSources } from "@/content/core-sources.mjs";
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
        {
          eyebrow: "Geur bij sanitair",
          title: "Geur bij sanitair: wat doorgeven en wie contacteren?",
          paragraphs: [
            "Beschrijf alleen wat u al weet: waar en wanneer u de geur merkt, bij welk sanitair toestel, of de afvoer normaal of traag loopt en of er recente werken waren. Is de plaats, bron of context onbekend, vermeld dan onbekend en ga niet gokken of extra onderzoek doen. Geur alleen is geen vaststelling van een verstopping; AB Service kan beoordelen of uw omschreven vraag binnen het sanitaire aanbod past.",
            "Aquafin behandelt geurklachten binnenshuis en buitenshuis afzonderlijk. Noteer waar de geur opvalt, maar leid daar zelf geen oorzaak of verantwoordelijke uit af.",
            "Bij een vraag over de openbare riolering in Vlaanderen: zoek via AquaFlanders uw werkelijke rioolbeheerder en volg diens meldprocedure. Contacteer Aquafin alleen als Aquafin de bevestigde beheerder is. De Vlaamse zoekhulp bepaalt geen beheerder voor Brussel; vraag daar de bevoegde instantie wie uw rioolbeheerder is. Dit is geen toezegging dat AB Service werk aan het openbare riool uitvoert.",
            "Bij direct gevaar: schakel de bevoegde noodhulp in en wacht niet op een online formulier.",
          ],
          links: [coreSources.sanitaryOdourAquafin, coreSources.sewerOperatorFlanders],
        },
      ]}
      steps={[
        { title: "Foto’s", text: "Toon de ruimte, aansluitingen en het huidige toestel." },
        { title: "Maten", text: "Deel relevante afmetingen en productinformatie." },
        { title: "Scope", text: "Spreek af wat wordt geplaatst en afgewerkt." },
        { title: "Uitvoering", text: "Werk en controle volgen de overeengekomen scope." },
      ]}
      faq={[[
        "Wat is het verschil tussen nadruppelen en lekken bij een aansluiting?",
        "De Belgische FAQ’s van hansgrohe behandelen kort nadruppelen uit de uitloop apart van lekkage bij de aansluitingen van een opbouwmengkraan en water aan het draaibare deel van een keukenmengkraan na het openen. Dat zijn verschillende meldingen, geen diagnose voor uw kraan. Beschrijf alleen wat u al hebt gezien: de lekplaats, wanneer het gebeurt en of het doorgaat nadat de kraan dicht is. Weet u dat niet, vermeld dan onbekend; ga niet extra testen of demonteren. Vermeld het merk en het type of artikelnummer als u die al kent. Een foto en deze observaties bewijzen niet welk onderdeel defect is; modelgebonden controle blijft nodig.",
      ]]}
      relatedLinks={[
        { label: "Water- en verwarmingsleidingen plaatsen of aanpassen", href: "/diensten/leidingen" },
        { label: "Een waterlek laten herstellen", href: "/diensten/waterlek-herstellen" },
        { label: "Alle installaties", href: "/installaties" },
        { label: "Badkamerrenovatie", href: "/diensten/badkamerrenovatie" },
        { label: "Praktijkcase: sanitair vernieuwd", href: "/projecten/sanitair-vernieuwd" },
        { label: "Tarieven en offertes", href: "/tarieven" },
        { label: "Contact opnemen", href: "/contact" },
      ]}
      sourceLinks={[coreSources.sanitaryOdourAquafin, coreSources.sewerOperatorFlanders, coreSources.faucetBathroomHansgrohe, coreSources.faucetKitchenHansgrohe]}
    />
  );
}
