import ServicePage from "@/components/service-page";
import { contentImages } from "@/content/media.mjs";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";

export const metadata = buildPageMetadata(
  getPageDefinition("/advies/drukverlies-cv-ketel")
);

export default function DrukverliesCvKetelPage() {
  return (
    <ServicePage
      breadcrumb={[
        { name: "Drukverlies cv-ketel", path: "/advies/drukverlies-cv-ketel" },
      ]}
      eyebrow="Cv-installatie controleren"
      title="Drukverlies bij uw cv-ketel: wat kunt u veilig controleren?"
      intro="Een kleine verandering na ontluchten of afkoelen is iets anders dan druk die telkens opnieuw wegvalt. Terugkerend drukverlies vraagt onderzoek naar de installatie, niet alleen opnieuw bijvullen."
      answer="De juiste installatiedruk is model- en installatieafhankelijk. Bosch noemt in zijn algemene bijvulgids 1,5 tot 2 bar, maar dat bereik is geen universele waarde voor ieder toestel. Volg altijd de handleiding en drukmarkering van uw eigen cv-ketel."
      warning="Vul niet voortdurend bij en open geen toestelbehuizing. Stop bij water rond elektrische delen, gasgeur of aanwijzingen voor rookgas- of koolstofmonoxidegevaar en schakel de bevoegde hulp in."
      image={contentImages.pressureLoss}
      sections={[
        {
          eyebrow: "Eerst vastleggen",
          title: "Noteer wanneer en hoeveel de druk daalt",
          items: [
            "Lees de druk af wanneer de installatie koud is en noteer datum en waarde",
            "Controleer of het verlies volgt op ontluchten, bijvullen of een verwarmingscyclus",
            "Kijk zonder iets te demonteren naar zichtbare druppels, vochtsporen of een lekkende kraan",
            "Noteer merk, exact model en eventuele fout- of subcode",
          ],
        },
        {
          eyebrow: "Mogelijke oorzaken",
          title: "Drukverlies is een symptoom, geen diagnose",
          paragraphs: [
            "Volgens de Bosch-gebruikersinformatie kan dalende druk onder meer samenhangen met een lekkage, een probleem aan het expansievat of een ventiel. Ook na ontluchten kan de druk tijdelijk lager worden. Welke oorzaak werkelijk speelt, moet aan de installatie worden vastgesteld.",
            "Water kan buiten het toestel zichtbaar zijn, maar een probleem kan ook alleen tijdens opwarming optreden. Dat is een reden om het drukverloop te noteren in plaats van op basis van één meterstand een onderdeel aan te wijzen.",
          ],
        },
        {
          eyebrow: "Veilige grens",
          title: "Bijvullen alleen volgens de exacte handleiding",
          paragraphs: [
            "Gebruik uitsluitend de vulprocedure, aansluitpunten en drukgrenzen uit de gebruikershandleiding van uw toestel en installatie. Stop wanneer de werkwijze of afsluiters niet duidelijk zijn.",
            "Daalt de druk opnieuw, loopt de druk bij opwarming sterk op of moet u regelmatig water toevoegen, vraag dan technisch onderzoek. Herhaald bijvullen verhelpt de oorzaak niet.",
          ],
        },
      ]}
      steps={[
        { title: "Noteer", text: "Leg koude druk, tijdstip, model en foutcode vast." },
        { title: "Kijk", text: "Controleer alleen zichtbare leidingen en radiatoren op vocht." },
        { title: "Handleiding", text: "Volg uitsluitend de modelspecifieke gebruikersprocedure." },
        { title: "Onderzoek", text: "Laat terugkerend drukverlies technisch diagnosticeren." },
      ]}
      relatedLinks={[
        { label: "Cv-ketel of verwarming laten herstellen", href: "/herstelling" },
        { label: "Foutcodes per merk", href: "/foutcodes" },
        { label: "Onderhoud van uw cv-ketel", href: "/onderhoud" },
      ]}
      sourceLinks={[
        {
          label: "Bosch Home Comfort: cv-ketel bijvullen en druk controleren",
          href: "https://www.bosch-homecomfort.com/be/nl/residentieel/info-advies/je-bosch-oplossing-uitgelegd!/verwarming-op-gas/cv-ketel-bijvullen/",
        },
      ]}
    />
  );
}
