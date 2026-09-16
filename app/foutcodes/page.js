import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";
import ContactCta from "@/components/contact-cta";
import PageHero from "@/components/page-hero";
import { faultGuides } from "@/content/fault-guides.mjs";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";

export const metadata = buildPageMetadata(getPageDefinition("/foutcodes"));

export default function FaultCodesPage() {
  const published = faultGuides.filter((guide) => guide.status === "published");
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Foutcodes", path: "/foutcodes" }]} />
      <PageHero eyebrow="Cv-ketel foutcodes" title="Gebruik een foutcode als aanwijzing, niet als diagnose" intro="Een code kan per model en bouwjaar verschillen. Noteer daarom altijd merk, exacte modelaanduiding en de volledige code en controleer de gebruikershandleiding van uw toestel." />
      <section className="section section-compact"><div className="shell narrow"><div className="warning-box"><strong>Stop bij gevaar</strong><p>Bij gasgeur, mogelijke koolstofmonoxide, rookgasproblemen of water bij elektrische delen: bedien het toestel niet verder en schakel de bevoegde hulp in.</p></div></div></section>
      <section className="section">
        <div className="shell">
          <p className="eyebrow">Geverifieerde gidsen</p>
          <h2>Kies het merk dat op uw toestel staat</h2>
          <div className="cards-grid" style={{ marginTop: "2rem" }}>
            {published.map((guide) => (
              <article className="card" key={guide.slug}>
                <h3>{guide.brand}</h3>
                <p>{guide.modelWarning}</p>
                <Link href={`/foutcodes/${guide.slug}`}>Bekijk {guide.brand}-codes →</Link>
              </article>
            ))}
            <article className="card"><h3>Bosch en Junkers</h3><p>De eerdere pagina’s bevatten geen voldoende onderbouwde modelspecifieke codes. Ze blijven daarom buiten de zoekindex tot officiële bronkoppeling per code beschikbaar is.</p><Link href="/contact">Vraag hulp met uw exacte model →</Link></article>
          </div>
        </div>
      </section>
      <ContactCta title="Komt de code terug na één toegestane reset?" text="Noteer de code en het exacte toestelmodel. Open geen gas- of elektrische onderdelen en laat de oorzaak beoordelen." />
    </>
  );
}
