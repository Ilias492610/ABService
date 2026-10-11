import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/breadcrumbs";
import ContactCta from "@/components/contact-cta";
import FaultCodeCatalog from "@/components/fault-code-catalog";
import PageHero from "@/components/page-hero";
import { faultGuides, getFaultGuide } from "@/content/fault-guides.mjs";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";
import { buildContactHref } from "@/libs/contact-context.mjs";

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
      <PageHero eyebrow={`${guide.brand} foutcodes`} title={`${guide.brand} foutcodes: catalogus met officiële bronnen`} intro={guide.modelWarning} ctaLabel="Bespreek uw storing" ctaHref={buildContactHref({ service: "Herstelling verwarming" })} />
      <section className="section section-compact"><div className="shell narrow"><div className="warning-box"><strong>Veiligheid en modelcontrole</strong><p>Een code is geen diagnose. Controleer eerst merk, exacte modelaanduiding, bouwjaar en de volledige hoofd- en subcode. Reset niet herhaaldelijk en open geen verbrandings-, gas- of elektrische onderdelen. Bij gasgeur of een CO-melding verlaat u de onveilige ruimte en neemt u vanuit een veilige plaats contact op met de bevoegde hulpdienst; bij vermoeden van CO-vergiftiging of direct gevaar belt u 112. Bedien in een ruimte met gasgeur geen elektrische schakelaars of toestellen. Blijf uit een natte zone met elektrische delen en ga niet terug naar binnen voor foto’s.</p></div></div></section>
      <section className="section">
        <div className="shell">
          <div className="fault-catalog-intro">
            <p className="eyebrow">{guide.codeEntryCount} brongebonden codeverklaringen</p>
            <h2>Zoek eerst uw code, controleer daarna de toestelreeks</h2>
            <p className="section-lead">De catalogus neemt alle foutcoderegels over binnen de hierboven afgebakende toestelreeks of het genoemde officiële merkoverzicht. Gecombineerde regels tonen alle bijbehorende subcodes of bereiken. Een code die niet in de bron voor uw toestelreeks staat, mag u niet op basis van een andere reeks interpreteren.</p>
          </div>
          {guide.slug === "bulex" && (
            <section className="answer-box" aria-labelledby="bulex-model-help-title">
              <h2 id="bulex-model-help-title">Bulex-model onbekend of niet in deze catalogus?</h2>
              <p>U kunt ook hulp vragen wanneer u de modelnaam niet kent of uw toestel hier niet terugvindt. Noteer de volledige code en wat er uitvalt. Zoek de modelnaam in uw handleiding of onderhoudsattest, of op een identificatie die u zonder iets te openen veilig kunt aflezen.</p>
              <p>Open de mantel niet om een model te zoeken en ga niet terug naar een onveilige ruimte voor foto’s. Kies geen ander model op goed geluk: de uitleg van een andere toestelreeks is geen diagnose voor uw ketel.</p>
              <p><a href={guide.documentationUrl} className="underline" target="_blank" rel="noreferrer">Zoek uw Bulex-gebruikshandleiding ↗</a> of <Link href={buildContactHref({ service: "Herstelling verwarming" })} className="underline">vraag hulp bij uw Bulex-storing</Link>. Vermeld gerust dat het model nog onbekend is.</p>
            </section>
          )}
          <FaultCodeCatalog brand={guide.brand} catalogs={guide.catalogs} />
          <div className="source-note">
            {guide.documentationUrl && <p>Handleiding zoeken: <a href={guide.documentationUrl} target="_blank" rel="noreferrer">{guide.documentationLabel} ↗</a>.</p>}
            <p>De technische herstelstappen uit installateurshandleidingen zijn bewust niet als doe-het-zelfinstructie overgenomen.</p>
          </div>
        </div>
      </section>
      <section className="section section-muted">
        <div className="shell related-grid">
          <div>
            <p className="eyebrow">Van code naar beoordeling</p>
            <h2>Service voor uw {guide.brand}-ketel</h2>
            <p>AB Service onderhoudt en herstelt {guide.brand}-toestellen als onafhankelijke dienstverlener. Geef de volledige code, exacte modelaanduiding en het verloop van de klacht mee. Onderzoek aan het toestel bepaalt welke herstelling nodig is.</p>
            <ul className="link-list">
              <li><Link href={`/merken/${guide.slug}`}>{guide.brand} onderhoud en herstelling</Link></li>
              <li><Link href="/herstelling">Herstelling van cv-ketel en verwarming</Link></li>
              <li><Link href="/onderhoud">Periodiek cv-ketelonderhoud</Link></li>
            </ul>
          </div>
          <div>
            <h2>Uw klacht duidelijk omschrijven</h2>
            <p>Noteer welke functies uitvallen en wat u veilig op het gebruikersdisplay kunt aflezen. Deze gidsen helpen bij het voorbereiden van uw aanvraag.</p>
            <ul className="link-list">
              <li><Link href="/advies/geen-warm-water">Geen warm water</Link></li>
              <li><Link href="/advies/radiator-blijft-koud">Radiator blijft koud</Link></li>
              <li><Link href="/advies/drukverlies-cv-ketel">Drukverlies bij de cv-ketel</Link></li>
              <li><Link href="/tools/onderhoudscheck">Onderhoudsregel voor uw toestel controleren</Link></li>
            </ul>
          </div>
        </div>
      </section>
      <ContactCta title={`Hulp nodig met een ${guide.brand}-storing?`} service="Herstelling verwarming" />
    </>
  );
}
