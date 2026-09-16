import Link from "next/link";
import { business } from "@/content/business.mjs";
import TrackedLink from "@/components/tracked-link";

const serviceLinks = [
  ["Onderhoud cv-ketel", "/onderhoud"],
  ["Herstelling verwarming", "/herstelling"],
  ["Keuring cv-installatie", "/keuring"],
  ["Gasketel installeren", "/installaties/gasketels"],
  ["Sanitair en loodgieterswerk", "/installaties/sanitair"],
  ["Tarieven en offertes", "/tarieven"],
];

const knowledgeLinks = [
  ["Foutcodes", "/foutcodes"],
  ["Drukverlies cv-ketel", "/advies/drukverlies-cv-ketel"],
  ["Veelgestelde vragen", "/faq"],
  ["Over AB Service", "/over-ons"],
  ["Contact", "/contact"],
  ["Privacybeleid", "/privacy-policy"],
  ["Algemene voorwaarden", "/algemene-voorwaarden"],
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="footer-brand">AB Service</p>
          <p>
            Praktische hulp bij verwarming, gasketels, sanitair en loodgieterswerk in
            Antwerpen. Elke aanvraag wordt beoordeeld op basis van de werkelijke situatie.
          </p>
          <dl className="business-facts">
            <div>
              <dt>Telefoon</dt>
              <dd>
                <TrackedLink
                  href={business.phoneHref}
                  eventName="phone_click"
                  eventProperties={{ location: "footer" }}
                >
                  {business.phoneDisplay}
                </TrackedLink>
              </dd>
            </div>
            <div>
              <dt>E-mail</dt>
              <dd>
                <TrackedLink
                  href={`mailto:${business.email}`}
                  eventName="email_click"
                  eventProperties={{ location: "footer" }}
                >
                  {business.email}
                </TrackedLink>
              </dd>
            </div>
            <div>
              <dt>BTW</dt>
              <dd>{business.vatId}</dd>
            </div>
          </dl>
        </div>
        <div>
          <h2>Diensten</h2>
          <ul>
            {serviceLinks.map(([label, href]) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Kennis en bedrijf</h2>
          <ul>
            {knowledgeLinks.map(([label, href]) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} AB Service</span>
        <span>Antwerpen · {business.vatId}</span>
      </div>
    </footer>
  );
}
