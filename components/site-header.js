import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/content/site-content.mjs";
import { business } from "@/content/business.mjs";
import TrackedLink from "@/components/tracked-link";
import HeaderNavigation from "@/components/header-navigation";
import { LocalizedHeader } from "@/components/localized-shell";
import LanguageSwitcher from "@/components/language-switcher";

export default function SiteHeader({ locale = "nl-BE" } = {}) {
  if (locale !== "nl-BE") return <LocalizedHeader locale={locale} />;
  return (
    <header className="site-header">
      <div className="topline">
        <div className="shell topline-inner">
          <span>{business.availabilityLabel} · Loodgieter en verwarmingsservice in Antwerpen</span>
          <div className="topline-links">
            <TrackedLink
              href={business.phoneHref}
              eventName="phone_click"
              eventProperties={{ location: "header" }}
            >
              {business.phoneDisplay}
            </TrackedLink>
            <TrackedLink
              href={`mailto:${business.email}`}
              eventName="email_click"
              eventProperties={{ location: "header" }}
            >
              {business.email}
            </TrackedLink>
          </div>
        </div>
      </div>
      <div className="shell nav-row">
        <Link href="/" className="brand" aria-label="AB Service home">
          <Image src="/LogoZ.png" alt="" width={48} height={48} priority />
          <span>
            <strong>AB Service</strong>
            <small>Verwarming &amp; sanitair</small>
          </span>
        </Link>
        <HeaderNavigation navigation={navigation} />
        <TrackedLink
          href={business.phoneHref}
          eventName="phone_click"
          eventProperties={{ location: "navigation" }}
          className="button button-small nav-call"
        >
          Bel AB Service
        </TrackedLink>
        <HeaderNavigation navigation={navigation} mobile />
      </div>
      <div className="shell localized-contact-languages"><LanguageSwitcher /></div>
    </header>
  );
}
