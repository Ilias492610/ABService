import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/breadcrumbs";
import ContactCta from "@/components/contact-cta";
import ContentImage from "@/components/content-image";
import PageHero from "@/components/page-hero";
import { getProject, getPublishedProjects } from "@/content/projects.mjs";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";

export const dynamicParams = false;
export const generateStaticParams = () => getPublishedProjects().map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const definition = getPageDefinition(`/projecten/${slug}`);
  return definition ? buildPageMetadata(definition) : { robots: { index: false, follow: false } };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <Breadcrumbs items={[
        { name: "Home", path: "/" },
        { name: "Projecten", path: "/projecten" },
        { name: project.title, path: project.path },
      ]} />
      <PageHero
        eyebrow={project.service}
        title={project.title}
        intro={project.situation}
      />
      <section className="section section-compact">
        <div className="shell narrow">
          <dl className="project-facts">
            <div><dt>Werkgebied</dt><dd>{project.city}, provincie {project.province}</dd></div>
            <div><dt>Periode</dt><dd>{project.approximateDate}</dd></div>
            <div><dt>Merk</dt><dd>{project.brand}</dd></div>
          </dl>
          <ContentImage image={project.authenticPhotos[0]} />
        </div>
      </section>
      <section className="section">
        <div className="shell narrow prose-block">
          <p className="eyebrow">Aanleiding</p>
          <h2>Het gemelde probleem</h2>
          <p>{project.problem}</p>
        </div>
      </section>
      <section className="section section-muted">
        <div className="shell narrow prose-block">
          <p className="eyebrow">Uitvoering</p>
          <h2>Welke werken zijn uitgevoerd?</h2>
          <ul className="check-list">
            {project.workPerformed.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p>{project.solution}</p>
        </div>
      </section>
      <section className="section">
        <div className="shell narrow prose-block">
          <p className="eyebrow">Resultaat</p>
          <h2>Controle bij oplevering</h2>
          <p>{project.outcome}</p>
          <p className="source-note">
            De case is geanonimiseerd. Klantnaam, exact adres, exacte datum en herkenbare
            toestelgegevens zijn bewust niet gepubliceerd.
          </p>
          <p><Link href={project.servicePath}>Bekijk de dienst {project.service.toLowerCase()} →</Link></p>
        </div>
      </section>
      <ContactCta title="Wilt u een vergelijkbare opdracht bespreken?" />
    </>
  );
}
