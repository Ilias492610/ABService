import Image from "next/image";
import Link from "next/link";
import TrackedLink from "@/components/tracked-link";
import HeaderNavigation from "@/components/header-navigation";
import LanguageSwitcher from "@/components/language-switcher";
import CookiePreferencesLink from "@/components/cookie-preferences-link";
import { navigation } from "@/content/site-content.mjs";
import { business } from "@/content/business.mjs";
import { legalIdentity } from "@/content/legal-identity.mjs";
import { getLocaleCopy, localizeLink, localizeNavigation } from "@/content/localization.mjs";

export function LocalizedSeat({ locale }) {
  const copy = getLocaleCopy(locale);
  return <div data-registered-seat=""><p><strong>{copy.seatLabel}:</strong> {legalIdentity.registeredSeatAddress}</p><p>{copy.seatGuidance}</p></div>;
}

export function LocalizedHeader({ locale }) {
  const copy = getLocaleCopy(locale), items = localizeNavigation(navigation, locale);
  return (
    <header className="site-header">
      <div className="topline"><div className="shell topline-inner">
        <span>{copy.availability} · {copy.topline}</span>
        <div className="topline-links"><TrackedLink href={business.phoneHref} eventName="phone_click" eventProperties={{location:"header"}}>{business.phoneDisplay}</TrackedLink><TrackedLink href={`mailto:${business.email}`} eventName="email_click" eventProperties={{location:"header"}}>{business.email}</TrackedLink></div>
      </div></div>
      <div className="shell nav-row">
        <Link href="/" className="brand" aria-label={copy.homeLabel}><Image src="/LogoZ.png" alt="" width={48} height={48} priority /><span><strong>AB Service</strong><small>{copy.brand}</small></span></Link>
        <HeaderNavigation navigation={items} labels={copy.nav} />
        <TrackedLink href={business.phoneHref} eventName="phone_click" eventProperties={{location:"navigation"}} className="button button-small nav-call">{copy.call}</TrackedLink>
        <HeaderNavigation navigation={items} labels={copy.nav} mobile />
      </div>
      <div className="shell localized-contact-languages"><LanguageSwitcher locale={locale} /></div>
    </header>
  );
}

export function LocalizedFooter({ locale, serviceLinks, areaLinks, knowledgeLinks }) {
  const copy = getLocaleCopy(locale);
  const list = (title, entries) => <div><h2>{title}</h2><ul>{entries.map(([label, path])=>{
    const link = localizeLink(locale, path, label);
    return <li key={path}><Link href={link.href}>{link.label}</Link></li>;
  })}</ul></div>;
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div><p className="footer-brand">AB Service</p><p>{copy.footer}</p>
          <dl className="business-facts">
            <div><dt>{copy.phone}</dt><dd><TrackedLink href={business.phoneHref} eventName="phone_click" eventProperties={{location:"footer"}}>{business.phoneDisplay}</TrackedLink></dd></div>
            <div><dt>{copy.email}</dt><dd><TrackedLink href={`mailto:${business.email}`} eventName="email_click" eventProperties={{location:"footer"}}>{business.email}</TrackedLink></dd></div>
            <div><dt>{copy.availability}</dt><dd>{copy.hours}</dd></div>
            <div><dt>{copy.vat}</dt><dd>{business.vatId}</dd></div>
          </dl><LocalizedSeat locale={locale} />
        </div>
        {list(copy.services,serviceLinks)}{list(copy.serviceArea,areaLinks)}{list(copy.knowledge,knowledgeLinks)}
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} AB Service</span><span>{copy.area} · {business.vatId}</span><CookiePreferencesLink locale={locale} /></div>
    </footer>
  );
}
