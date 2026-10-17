import Breadcrumbs from "@/components/breadcrumbs";
import ContentImage from "@/components/content-image";
import ContactForm from "@/components/sections/contact-form";
import PageHero from "@/components/page-hero";
import TrackedLink from "@/components/tracked-link";
import { business } from "@/content/business.mjs";
import { contentImages } from "@/content/media.mjs";
import { buildPageMetadata } from "@/libs/seo-data.mjs";
import { getPageDefinition } from "@/content/site-content.mjs";
import { CONTACT_SERVICES } from "@/libs/contact-validation.mjs";

export const metadata = buildPageMetadata(getPageDefinition("/contact"));

export default async function ContactPage({ searchParams }) {
  const params = await searchParams;
  const nativeStatus = params?.contact === "success" || params?.contact === "error" ? params.contact : undefined;
  const initialService = typeof params?.dienst === "string" && CONTACT_SERVICES.includes(params.dienst) ? params.dienst : "";
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <PageHero
        eyebrow="Contact"
        title="Leg uw vraag voor aan AB Service"
        intro="Omschrijf het werk of probleem zo concreet mogelijk. Een timing, prijs of afspraak is pas definitief nadat AB Service de aanvraag heeft beoordeeld en bevestigd. AB Service werkt bij klanten op locatie. Er is geen klantontvangst op het bedrijfsadres."
        ctaLabel="Ga naar het formulier"
        ctaHref="#aanvraagformulier"
      />
      <section className="section">
        <div className="shell contact-layout">
          <div id="aanvraagformulier" className="contact-form-panel" tabIndex={-1}>
            <p className="eyebrow">Aanvraagformulier</p>
            <h2>Welke informatie helpt?</h2>
            <ContactForm nativeStatus={nativeStatus} initialService={initialService} />
            <ContentImage image={contentImages.customerAdviceMarketing} />
          </div>
          <aside className="contact-aside">
            <h2>Rechtstreeks contact</h2>
            <dl>
              <div>
                <dt>Telefoon</dt>
                <dd><TrackedLink href={business.phoneHref} eventName="phone_click" eventProperties={{ location: "contact_aside" }}>{business.phoneDisplay}</TrackedLink></dd>
              </div>
              <div>
                <dt>E-mail</dt>
                <dd><TrackedLink href={`mailto:${business.email}`} eventName="email_click" eventProperties={{ location: "contact_aside" }}>{business.email}</TrackedLink></dd>
              </div>
              <div>
                <dt>WhatsApp</dt>
                <dd><TrackedLink href={business.whatsappHref} eventName="whatsapp_click" eventProperties={{ location: "contact_aside" }} target="_blank" rel="noreferrer">Start een gesprek</TrackedLink></dd>
              </div>
              <div><dt>Bereikbaarheid</dt><dd>{business.hoursLabel}</dd></div>
              <div><dt>Onderneming</dt><dd>{business.vatId}</dd></div>
            </dl>
            <div className="warning-box">
              <strong>Geen noodkanaal</strong>
              <p>Gebruik het formulier niet bij gasgeur, mogelijke CO of direct gevaar. Verlaat de ruimte en contacteer de bevoegde nood- of distributiedienst.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
