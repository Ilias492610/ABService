import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";
import ContactCta from "@/components/contact-cta";
import PageHero from "@/components/page-hero";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";

export const metadata = buildPageMetadata(getPageDefinition("/installaties"));

const offerings = [
  {
    title: "Gasketels",
    href: "/installaties/gasketels",
    text: "Beoordeling van de bestaande installatie, benodigd vermogen, plaatsing, rookgasafvoer en oplevering.",
  },
  {
    title: "Sanitair",
    href: "/installaties/sanitair",
    text: "Gerichte sanitaire installaties en loodgieterswerken op basis van de feitelijke scope en bereikbaarheid.",
  },
];

export default function InstallatiesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Installaties", path: "/installaties" }]} />
      <PageHero
        eyebrow="Installaties"
        title="Verwarming en sanitair installeren met een duidelijke scope"
        intro="Een goede installatie begint bij de bestaande situatie, het gebruik, de technische randvoorwaarden en een offerte die duidelijk maakt wat wel en niet inbegrepen is."
      />
      <section className="section">
        <div className="shell">
          <p className="eyebrow">Actief aanbod</p>
          <h2>Installatiewerk op basis van uw situatie</h2>
          <div className="cards-grid" style={{ marginTop: "2rem" }}>
            {offerings.map((offering) => (
              <article className="card" key={offering.href}>
                <h3>{offering.title}</h3>
                <p>{offering.text}</p>
                <Link href={offering.href}>Bekijk deze installatie →</Link>
              </article>
            ))}
            <article className="card">
              <h3>Airconditioning</h3>
              <p>
                Deze dienst wordt niet actief aangeboden of geïndexeerd via de website zolang
                de dienstverlening en vereiste certificering niet met actuele evidence zijn
                bevestigd.
              </p>
              <Link href="/contact">Vraag naar de actuele mogelijkheden →</Link>
            </article>
          </div>
        </div>
      </section>
      <section className="section section-dark">
        <div className="shell">
          <p className="eyebrow">Proces</p>
          <h2>Wat een bruikbare offerte nodig heeft</h2>
          <ol className="steps-grid">
            <li><span>1</span><h3>Inventarisatie</h3><p>Bestaande toestand, wensen en technische beperkingen.</p></li>
            <li><span>2</span><h3>Beoordeling</h3><p>Benodigde materialen, toegang en aansluitingen.</p></li>
            <li><span>3</span><h3>Offerte</h3><p>Scope, uitsluitingen, prijsbasis en praktische afspraken.</p></li>
            <li><span>4</span><h3>Oplevering</h3><p>Controle, uitleg en overeengekomen documenten.</p></li>
          </ol>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
