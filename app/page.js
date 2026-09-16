import Link from "next/link";
import ContactCta from "@/components/contact-cta";
import PageHero from "@/components/page-hero";
import TrackedLink from "@/components/tracked-link";
import { business } from "@/content/business.mjs";
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
      <section className="section">
        <div className="shell related-grid">
          <div>
            <p className="eyebrow">Transparant contact</p>
            <h2>Geen score of belofte die we niet kunnen staven</h2>
            <p className="section-lead">
              Deze website toont geen vast reviewcijfer, gegarandeerde aankomsttijd, verzonnen
              prijs of niet-bewezen erkenning. Voor actuele onafhankelijke informatie kunt u het
              bedrijfsprofiel raadplegen zodra de profielkoppeling is geverifieerd.
            </p>
          </div>
          <div className="card">
            <h3>Rechtstreeks contact</h3>
            <p>
              Bel, mail of stuur een WhatsApp-bericht. Gevaarlijke situaties horen bij de
              bevoegde nood- of distributiediensten, niet bij een normaal webformulier.
            </p>
            <TrackedLink
              href={business.whatsappHref}
              eventName="whatsapp_click"
              eventProperties={{ location: "homepage_trust" }}
              target="_blank"
              rel="noreferrer"
            >
              Open WhatsApp →
            </TrackedLink>
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
