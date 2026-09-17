import Link from "next/link";
import ContactCta from "@/components/contact-cta";
import ContentImage from "@/components/content-image";
import PageHero from "@/components/page-hero";
import GoogleReviews from "@/components/sections/google-reviews";
import { contentImages } from "@/content/media.mjs";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";

export const metadata = buildPageMetadata(getPageDefinition("/"));

const services = [
  {
    title: "Onderhoud van uw cv-ketel",
    text: "Duidelijke uitleg over het onderhoud, de wettelijke frequentie en de informatie die nodig is om uw toestel correct te beoordelen.",
    href: "/onderhoud",
  },
  {
    title: "Herstelling van verwarming",
    text: "Een gerichte aanvraag bij uitval, foutcodes, drukverlies of problemen met warm water, zonder een onhaalbare responstijd te beloven.",
    href: "/herstelling",
  },
  {
    title: "Keuring van een cv-installatie",
    text: "De keuring bij eerste ingebruikname of wijziging staat los van het periodieke onderhoud. Lees wanneer ze relevant is.",
    href: "/keuring",
  },
  {
    title: "Gasketelinstallatie",
    text: "Van beoordeling en dimensionering tot een duidelijke offerte, plaatsing, ingebruikname en overdracht van documenten.",
    href: "/installaties/gasketels",
  },
  {
    title: "Sanitair en loodgieterswerk",
    text: "Voor sanitaire toestellen, leidingen en gerichte loodgieterswerken in Antwerpen, op basis van de concrete situatie.",
    href: "/installaties/sanitair",
  },
  {
    title: "Tarieven en offertes",
    text: "Geen lokprijzen: bekijk welke factoren een onderhoud, herstelling of installatie bepalen en hoe een offerte tot stand komt.",
    href: "/tarieven",
  },
  {
    title: "Lekdetectie en waterlekken",
    text: "Gericht onderzoek en herstel bij vocht, zichtbaar lekverlies of een verdachte leiding of aansluiting.",
    href: "/diensten/lekdetectie",
  },
  {
    title: "Ontstopping en afvoer",
    text: "Beoordeling en ontstopping van bereikbare sanitaire afvoeren, met vervolgadvies bij terugkerende problemen.",
    href: "/diensten/ontstopping",
  },
  {
    title: "Alle diensten",
    text: "Bekijk ook boilers, leidingwerk, waterlekherstel en het loodgieterswerk binnen een badkamerrenovatie.",
    href: "/diensten",
  },
];

export default function HomePage() {
  return (
    <>
      <PageHero
        eyebrow="Loodgieter Antwerpen"
        title="Verwarming en sanitair, helder aangepakt"
        intro="AB Service behandelt aanvragen voor loodgieterswerk, sanitair, cv-ketelonderhoud, herstellingen, keuringen en gasketelinstallaties in Antwerpen. U krijgt eerst duidelijkheid over de situatie en de volgende stap."
        ctaLabel="Leg uw situatie voor"
      />
      <section className="section section-compact">
        <div className="shell narrow">
          <p className="answer-box">
            Een goede aanvraag begint met de juiste informatie. Vermeld het toesteltype, een
            eventuele foutcode, wat er precies gebeurt en voeg waar mogelijk duidelijke foto’s
            toe. AB Service beoordeelt daarna welke vervolgstap passend is.
          </p>
          <ContentImage image={contentImages.homeVisitMarketing} />
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <p className="eyebrow">Diensten</p>
          <h2>Waarmee kan AB Service helpen?</h2>
          <p className="section-lead">
            Elke pagina behandelt één duidelijke zoek- en klantvraag. Zo vindt u sneller de
            informatie die bij uw situatie past.
          </p>
          <div className="cards-grid" style={{ marginTop: "2rem" }}>
            {services.map((service) => (
              <article className="card" key={service.href}>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <Link href={service.href}>Lees verder →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-muted">
        <div className="shell related-grid">
          <div>
            <p className="eyebrow">Werkgebied</p>
            <h2>Antwerpen als basis, heel Vlaanderen en Brussel als werkgebied</h2>
            <p className="section-lead">
              AB Service neemt passende aanvragen aan uit alle Vlaamse en Brusselse gemeenten.
              Afstand, technische scope en planning worden vóór de afspraak beoordeeld.
            </p>
          </div>
          <div className="card">
            <h3>Controleer uw gemeente</h3>
            <p>
              Bekijk alle 304 gemeenten, de zes regionale overzichtspagina’s en de tien
              districten van Antwerpen.
            </p>
            <Link href="/werkgebied">Bekijk het volledige werkgebied →</Link>
          </div>
        </div>
      </section>
      <section className="section section-dark">
        <div className="shell">
          <p className="eyebrow">Eerst veilig handelen</p>
          <h2>Gasgeur of mogelijk koolstofmonoxide?</h2>
          <div className="related-grid">
            <div>
              <h3>Bij gasgeur</h3>
              <p>
                Gebruik geen vlammen of elektrische schakelaars. Ventileer alleen als dat veilig
                kan, verlaat de ruimte en contacteer vanop een veilige plaats de officiële
                nood- of distributiedienst.
              </p>
            </div>
            <div>
              <h3>Bij mogelijke CO</h3>
              <p>
                Ga onmiddellijk naar frisse lucht, waarschuw hulpdiensten en ga niet terug naar
                binnen. Start het toestel niet opnieuw voordat een bevoegde professional de
                situatie veilig heeft verklaard.
              </p>
            </div>
          </div>
        </div>
      </section>
      <GoogleReviews />
      <section className="section section-muted">
        <div className="shell related-grid">
          <div>
            <p className="eyebrow">Uitgevoerd werk</p>
            <h2>Bekijk praktijkcases van AB Service</h2>
            <p className="section-lead">
              Geanonimiseerde voorbeelden tonen het probleem, de uitgevoerde werkzaamheden en
              de controle bij oplevering.
            </p>
            <Link href="/projecten">Bekijk de projecten →</Link>
          </div>
          <div>
            <p className="eyebrow">Cv-ketelmerken</p>
            <h2>Onderhoud en herstelling voor 13 merken</h2>
            <p className="section-lead">
              Van Vaillant en Bulex tot Remeha, Buderus, Viessmann, ACV, ATAG en Ferroli.
            </p>
            <Link href="/merken">Bekijk alle merken →</Link>
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
