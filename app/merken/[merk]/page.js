import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/breadcrumbs";
import ContactCta from "@/components/contact-cta";
import ContentImage from "@/components/content-image";
import PageHero from "@/components/page-hero";
import { brandServices, getBrandService } from "@/content/brand-services.mjs";
import { contentImages } from "@/content/media.mjs";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";

export const dynamicParams = false;
export const generateStaticParams = () => brandServices.map(({ slug }) => ({ merk: slug }));

export async function generateMetadata({ params }) {
  const { merk } = await params;
  const definition = getPageDefinition(`/merken/${merk}`);
  return definition ? buildPageMetadata(definition) : { robots: { index: false, follow: false } };
}

export default async function BrandServicePage({ params }) {
  const { merk } = await params;
  const entry = getBrandService(merk);
  if (!entry) notFound();

  return (
    <>
      <Breadcrumbs items={[
        { name: "Home", path: "/" },
        { name: "Ketelmerken", path: "/merken" },
        { name: entry.brand, path: entry.path },
      ]} />
      <PageHero
        eyebrow={`${entry.brand} cv-ketel`}
        title={`${entry.brand} onderhoud en herstelling`}
        intro={`AB Service voert onderhoud, diagnose en herstelling uit voor ${entry.productFocus}. Een gerichte aanvraag begint met het exacte toestelmodel, de productcode en de volledige foutmelding.`}
      />
      <section className="section section-compact">
        <div className="shell narrow">
          <p className="answer-box">
            Stuur een duidelijke foto van het typeplaatje en display. Beschrijf of verwarming,
            warm water of beide uitvallen en of de fout na één toegestane reset terugkomt.
          </p>
          <ContentImage image={contentImages.boilerServiceMarketing} />
        </div>
      </section>
      <section className="section">
        <div className="shell narrow prose-block">
          <p className="eyebrow">Mogelijke opdrachten</p>
          <h2>Service voor uw {entry.brand}-installatie</h2>
          <ul className="check-list">
            <li>Periodiek onderhoud na controle van type, vermogen en installatie</li>
            <li>Diagnose bij een foutcode, uitval, lawaai of onvoldoende warm water</li>
            <li>Onderzoek bij drukverlies of een terugkerende storing</li>
            <li>Herstelling en vervanging van onderdelen na technische diagnose</li>
            <li>Advies wanneer herstel technisch of economisch niet meer passend is</li>
          </ul>
          <div className="warning-box">
            <strong>Specifiek voor {entry.brand}</strong>
            <p>{entry.requestNote}</p>
          </div>
        </div>
      </section>
      <section className="section section-muted">
        <div className="shell related-grid">
          <div>
            <p className="eyebrow">Voorbereiden</p>
            <h2>Model en onderdelen vooraf controleren</h2>
            <p className="section-lead">
              Dezelfde merknaam omvat meerdere generaties en toestelreeksen. Beschikbaarheid van
              documentatie en onderdelen wordt daarom per toestel beoordeeld.
            </p>
          </div>
          <div className="card">
            <h3>Zoek uw foutcode</h3>
            <p>Gebruik de brongebonden catalogus voor {entry.brand} als eerste veilige oriëntatie.</p>
            <Link href={`/foutcodes/${entry.slug}`}>Bekijk {entry.brand}-foutcodes →</Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell narrow prose-block">
          <p className="eyebrow">Onafhankelijke service</p>
          <h2>Geen fabrikant- of dealerclaim</h2>
          <p>
            AB Service is een onafhankelijke dienstverlener. Deze pagina vermeldt het merk om
            duidelijk te maken voor welke toestellen onderhoud en herstelling worden uitgevoerd;
            ze suggereert geen officiële samenwerking of exclusieve erkenning door {entry.brand}.
          </p>
          <p><Link href="/merken">Bekijk alle ondersteunde ketelmerken →</Link></p>
        </div>
      </section>
      <ContactCta title={`Hulp nodig voor uw ${entry.brand}-ketel?`} />
    </>
  );
}
