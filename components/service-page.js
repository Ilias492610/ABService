import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";
import ContentImage from "@/components/content-image";
import ContactCta from "@/components/contact-cta";
import PageHero from "@/components/page-hero";

export default function ServicePage({
  breadcrumb,
  eyebrow,
  title,
  intro,
  answer,
  sections,
  steps,
  relatedLinks = [],
  sourceLinks = [],
  warning,
  image,
}) {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, ...breadcrumb]} />
      <PageHero eyebrow={eyebrow} title={title} intro={intro} />
      <section className="section section-compact">
        <div className="shell narrow">
          <p className="answer-box">{answer}</p>
          {warning && (
            <aside className="warning-box">
              <strong>Veiligheid eerst</strong>
              <p>{warning}</p>
            </aside>
          )}
          <ContentImage image={image} />
        </div>
      </section>
      {sections.map((section, index) => (
        <section className={index % 2 ? "section section-muted" : "section"} key={section.title}>
          <div className="shell narrow prose-block">
            <p className="eyebrow">{section.eyebrow || `Stap ${index + 1}`}</p>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.items && (
              <ul className="check-list">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}
      {steps?.length > 0 && (
        <section className="section section-dark">
          <div className="shell">
            <p className="eyebrow">Werkwijze</p>
            <h2>Van aanvraag tot duidelijke afspraak</h2>
            <ol className="steps-grid">
              {steps.map((step, index) => (
                <li key={step.title}>
                  <span>{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}
      {(relatedLinks.length > 0 || sourceLinks.length > 0) && (
        <section className="section">
          <div className="shell related-grid">
            {relatedLinks.length > 0 && (
              <div>
                <h2>Lees ook</h2>
                <ul className="link-list">
                  {relatedLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>{link.label} →</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {sourceLinks.length > 0 && (
              <div>
                <h2>Officiële informatie</h2>
                <ul className="link-list">
                  {sourceLinks.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} target="_blank" rel="noreferrer">
                        {link.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
      <ContactCta />
    </>
  );
}
