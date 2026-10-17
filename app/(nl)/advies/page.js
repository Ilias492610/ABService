import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";
import PageHero from "@/components/page-hero";
import ContactCta from "@/components/contact-cta";
import { adviceGuides } from "@/content/advice-guides.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";
import { buildPageMetadata } from "@/libs/seo-data.mjs";

export const metadata = buildPageMetadata(getPageDefinition("/advies"));

export default function AdvicePage() {
  return <>
    <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Advies", path: "/advies" }]} />
    <PageHero eyebrow="Praktische antwoorden" title="Advies voor uw verwarming, warm water en sanitair" intro="Vind wat u veilig kunt controleren, welke gegevens nuttig zijn en wanneer technisch onderzoek nodig is. De uitleg maakt een onderscheid tussen toestellen, gewesten en uw echte situatie." ctaHref="/tools/onderhoudscheck" ctaLabel="Doe de gratis onderhoudscheck" />
    <section className="section"><div className="shell">
      <p className="eyebrow">Kies uw vraag</p><h2>Waar zoekt u een antwoord op?</h2>
      <div className="cards-grid advice-grid">
        <article className="info-card"><p className="eyebrow">Verwarming</p><h3><Link href="/advies/drukverlies-cv-ketel">Drukverlies bij de cv-ketel</Link></h3><p>Noteer het drukverloop, herken de grens van veilig bijvullen en bereid onderzoek naar terugkerend drukverlies voor.</p><Link href="/advies/drukverlies-cv-ketel">Lees het drukverliesadvies →</Link></article>
        {adviceGuides.map((guide) => <article key={guide.slug} className="info-card"><p className="eyebrow">{guide.category}</p><h3><Link href={guide.path}>{guide.title}</Link></h3><p>{guide.description}</p><Link href={guide.path}>Lees het advies →</Link></article>)}
      </div>
    </div></section>
    <section className="section"><div className="shell narrow prose-block"><p className="eyebrow">Watermeter · zonder account</p><h2>Hoeveel water registreerde uw meter?</h2><p>Vergelijk twee totale standen van dezelfde eigen meter tijdens een bekende periode zonder gewoon of automatisch watergebruik. De watermetercheck toont de geregistreerde hoeveelheid en de grenzen van die observatie. Ze stelt geen lekdiagnose.</p><Link href="/tools/watermetercheck" className="button">Vergelijk mijn meterstanden</Link></div></section>
    <section className="section section-muted"><div className="shell related-grid"><div><p className="eyebrow">Gratis en direct</p><h2>Wanneer is uw ketel aan onderhoud toe?</h2><p>De regels verschillen tussen Vlaanderen en Brussel. De onderhoudscheck houdt rekening met toestel, brandstof en vermogen. Een datum verschijnt alleen bij voldoende duidelijke invoer.</p><Link href="/tools/onderhoudscheck" className="button">Controleer mijn onderhoudsregel</Link></div><div><h2>Een foutmelding op het scherm?</h2><p>Gebruik de volledige code en het exacte toestelmodel. Een identieke code kan bij een andere toestelreeks iets anders betekenen.</p><Link href="/foutcodes">Doorzoek de modelgebonden foutcodes →</Link><p>Deze gidsen zijn uitgegeven door <Link href="/over-ons">AB Service</Link>, met bronverwijzingen bij technische en wettelijke uitleg. Ze vervangen geen controle aan de installatie.</p></div></div></section>
    <ContactCta title="Wilt u uw probleem laten beoordelen?" />
  </>;
}
