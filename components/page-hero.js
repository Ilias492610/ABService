import Link from "next/link";
import TrackedLink from "@/components/tracked-link";
import { business } from "@/content/business.mjs";

export default function PageHero({
  eyebrow,
  title,
  intro,
  preIntro = null,
  ctaLabel = "Bespreek uw aanvraag",
  ctaHref = "/contact#aanvraagformulier",
  protectReading = false,
}) {
  return (
    <section className={protectReading ? "page-hero fault-guide-hero" : "page-hero"}>
      <div className="shell hero-grid">
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
          {preIntro}
          <p className="hero-intro">{intro}</p>
          <div className="button-row">
            <Link href={ctaHref} className="button">
              {ctaLabel}
            </Link>
            <TrackedLink
              href={business.phoneHref}
              eventName="phone_click"
              eventProperties={{ location: "hero" }}
              className="button button-secondary"
            >
              Bel {business.phoneDisplay}
            </TrackedLink>
          </div>
        </div>
        <aside className="hero-aside" aria-label="Zo verloopt uw aanvraag">
          <strong>Gericht contact</strong>
          <p>
            Vermeld het type toestel of werk, de foutmelding en wat u al heeft gecontroleerd.
            Zo kan AB Service uw vraag beter beoordelen.
          </p>
          <Link href="/tarieven">Lees hoe prijzen en offertes worden bepaald →</Link>
        </aside>
      </div>
    </section>
  );
}
