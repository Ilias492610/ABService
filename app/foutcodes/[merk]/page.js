import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/breadcrumbs";
import ContactCta from "@/components/contact-cta";
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
      <PageHero eyebrow={`${guide.brand} foutcodes`} title={`${guide.brand} foutcodes: betekenis en veilige eerste stap`} intro={guide.modelWarning} />
      <section className="section section-compact"><div className="shell narrow"><div className="warning-box"><strong>Veiligheid en modelcontrole</strong><p>Gebruik de informatie alleen als algemene oriëntatie. Volg de handleiding van uw exacte toestel. Reset niet herhaaldelijk en open geen verbrandings-, gas- of elektrische onderdelen.</p></div></div></section>
      <section className="section">
        <div className="shell narrow">
          {guide.codes.length > 0 ? (
            <>
              <h2>Veel gezochte {guide.brand}-codes</h2>
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Code</th><th>Algemene betekenis</th><th>Veilige eerste stap</th></tr></thead>
                  <tbody>{guide.codes.map((item) => <tr key={item.code}><td><strong>{item.code}</strong></td><td>{item.meaning}</td><td>{item.userAction}</td></tr>)}</tbody>
                </table>
              </div>
              <p style={{ marginTop: "1.25rem" }}>Bron: <a href={guide.sourceUrl} target="_blank" rel="noreferrer">{guide.sourceLabel} ↗</a>. Raadpleeg daarnaast de handleiding van uw model.</p>
            </>
          ) : (
            <div className="answer-box">Er worden op deze pagina nog geen codebetekenissen gepubliceerd. Deel het exacte model en de volledige code voor een gerichte beoordeling.</div>
          )}
        </div>
      </section>
      <ContactCta title={`Hulp nodig met een ${guide.brand}-storing?`} />
    </>
  );
}
