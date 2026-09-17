import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/breadcrumbs";
import ContactCta from "@/components/contact-cta";
import FaultCodeCatalog from "@/components/fault-code-catalog";
import PageHero from "@/components/page-hero";
import { faultGuides, getFaultGuide } from "@/content/fault-guides.mjs";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";

export const dynamicParams = false;
export const generateStaticParams = () => faultGuides.map((guide) => ({ merk: guide.slug }));

export async function generateMetadata({ params }) {
  const { merk } = await params;
  const definition = getPageDefinition(`/foutcodes/${merk}`);
  return definition ? buildPageMetadata(definition) : { robots: { index: false, follow: false } };
}

export default async function FaultGuidePage({ params }) {
  const { merk } = await params;
  const guide = getFaultGuide(merk);
  if (!guide) notFound();

  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Foutcodes", path: "/foutcodes" }, { name: guide.brand, path: `/foutcodes/${guide.slug}` }]} />
      <PageHero eyebrow={`${guide.brand} foutcodes`} title={`${guide.brand} foutcodes: catalogus met officiële bronnen`} intro={guide.modelWarning} />
      <section className="section section-compact"><div className="shell narrow"><div className="warning-box"><strong>Veiligheid en modelcontrole</strong><p>Een code is geen diagnose. Controleer eerst merk, exacte modelaanduiding, bouwjaar en de volledige hoofd- en subcode. Reset niet herhaaldelijk en open geen verbrandings-, gas- of elektrische onderdelen. Bij gasgeur, een CO-melding, rookgasgeur of water bij elektrische delen: bedien het toestel niet verder.</p></div></div></section>
      <section className="section">
        <div className="shell">
          <div className="fault-catalog-intro">
            <p className="eyebrow">{guide.codeEntryCount} brongebonden codeverklaringen</p>
            <h2>Zoek eerst uw code, controleer daarna de toestelreeks</h2>
            <p className="section-lead">De catalogus neemt alle foutcoderegels over binnen de hierboven afgebakende toestelreeks of het genoemde officiële merkoverzicht. Gecombineerde regels tonen alle bijbehorende subcodes of bereiken. Een code die niet in de bron voor uw toestelreeks staat, mag u niet op basis van een andere reeks interpreteren.</p>
          </div>
          <FaultCodeCatalog brand={guide.brand} catalogs={guide.catalogs} />
          <div className="source-note">
            {guide.documentationUrl && <p>Handleiding zoeken: <a href={guide.documentationUrl} target="_blank" rel="noreferrer">{guide.documentationLabel} ↗</a>.</p>}
            <p>De technische herstelstappen uit installateurshandleidingen zijn bewust niet als doe-het-zelfinstructie overgenomen.</p>
          </div>
        </div>
      </section>
      <ContactCta title={`Hulp nodig met een ${guide.brand}-storing?`} />
    </>
  );
}
