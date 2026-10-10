import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";
import ContentImage from "@/components/content-image";
import ContactCta from "@/components/contact-cta";
import PageHero from "@/components/page-hero";
import { serviceIntents } from "@/content/service-intents.mjs";
import { buildContactHref } from "@/libs/contact-context.mjs";

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
  faq = [],
  warning,
  image,
  contactService,
  editorial,
}) {
  const intent = serviceIntents[breadcrumb.at(-1)?.path];
  const service = contactService || intent?.service;
  const links = [...relatedLinks];
  for (const link of intent?.links || []) {
    if (!links.some((entry) => entry.href === link.href)) links.push(link);
  }
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, ...breadcrumb]} />
      <PageHero eyebrow={eyebrow} title={title} intro={intro} ctaHref={buildContactHref({ service })} />
      <section className="section section-compact">
        <div className="shell narrow">
          <p className="answer-box">{answer}</p>
          {editorial?.checkedAt && <p className="editorial-note">Uitgegeven door <Link href="/over-ons">AB Service</Link>. Broninformatie nagekeken op <time dateTime={editorial.checkedAt}>{new Intl.DateTimeFormat("nl-BE", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${editorial.checkedAt}T00:00:00Z`))}</time>.</p>}
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
            {section.links?.length > 0 && (
              <ul className="link-list">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label} →</Link>
                  </li>
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
      {faq.length > 0 && (
        <section className="section">
          <div className="shell narrow">
            <h2>Veelgestelde vragen</h2>
            <div className="faq-list">
              {faq.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}</summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
      {(links.length > 0 || sourceLinks.length > 0) && (
        <section className="section">
          <div className="shell related-grid">
            {links.length > 0 && (
              <div>
                <h2>Lees ook</h2>
                <ul className="link-list">
                  {links.map((link) => (
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
      <ContactCta service={service} />
    </>
  );
}
