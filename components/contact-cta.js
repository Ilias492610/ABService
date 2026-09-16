import Link from "next/link";
import { business } from "@/content/business.mjs";
import TrackedLink from "@/components/tracked-link";

export default function ContactCta({ title = "Wilt u uw situatie bespreken?", text }) {
  return (
    <section className="contact-cta">
      <div className="shell cta-card">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>{title}</h2>
          <p>
            {text ||
              "Bezorg de belangrijkste gegevens via het formulier of neem rechtstreeks contact op. Een afspraak of prijs is pas bevestigd na beoordeling van uw aanvraag."}
          </p>
        </div>
        <div className="button-row">
          <Link href="/contact" className="button">
            Naar het contactformulier
          </Link>
          <TrackedLink
            href={business.whatsappHref}
            eventName="whatsapp_click"
            eventProperties={{ location: "cta" }}
            className="button button-secondary"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
