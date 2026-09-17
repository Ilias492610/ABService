import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";
import ContactCta from "@/components/contact-cta";
import PageHero from "@/components/page-hero";
import { getPublishedProjects } from "@/content/projects.mjs";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";

export const metadata = buildPageMetadata(getPageDefinition("/projecten"));

export default function ProjectenPage() {
  const projects = getPublishedProjects();

  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Projecten", path: "/projecten" }]} />
      <PageHero
        eyebrow="Praktijkcases"
        title="Uitgevoerd werk voor verwarming en sanitair"
        intro="Deze geanonimiseerde praktijkcases tonen welke problemen AB Service heeft aangepakt, welke werkzaamheden zijn uitgevoerd en wat bij de oplevercontrole werd vastgesteld."
      />
      <section className="section section-compact">
        <div className="shell narrow">
          <p className="answer-box">
            Om de privacy van klanten te beschermen worden namen, adressen, exacte projectdata
            en herkenbare toestelgegevens niet gepubliceerd.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <p className="eyebrow">{projects.length} cases</p>
          <h2>Van diagnose tot sanitair leidingwerk</h2>
          <div className="project-grid">
            {projects.map((project, index) => {
              const photo = project.authenticPhotos[0];
              return (
                <article className="project-card" key={project.path}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(max-width: 680px) calc(100vw - 2rem), (max-width: 1100px) 50vw, 33vw"
                    priority={index === 0}
                  />
                  <div>
                    <p className="eyebrow">{project.service}</p>
                    <h3>{project.title}</h3>
                    <p>{project.problem}</p>
                    <Link href={project.path}>Bekijk deze praktijkcase →</Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <ContactCta title="Een soortgelijke opdracht bespreken?" />
    </>
  );
}
