import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/content/site-content.mjs";
import { business } from "@/content/business.mjs";
import TrackedLink from "@/components/tracked-link";

function NavigationItems({ mobile = false }) {
  return navigation.map((item) => {
    if (item.children) {
      return (
        <details className={mobile ? "mobile-submenu" : "nav-submenu"} key={item.label}>
          <summary>{item.label}</summary>
          <div className="submenu-panel">
            <Link href={item.href}>Alle installaties</Link>
            {item.children.map((child) => (
              <Link key={child.href} href={child.href}>
                {child.label}
              </Link>
            ))}
          </div>
        </details>
      );
    }

    return (
      <Link key={item.href} href={item.href}>
        {item.label}
      </Link>
    );
  });
}

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="topline">
        <div className="shell topline-inner">
          <span>Loodgieter en verwarmingsservice in Antwerpen</span>
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
        <nav className="desktop-nav" aria-label="Hoofdnavigatie">
          <NavigationItems />
        </nav>
        <TrackedLink
          href={business.phoneHref}
          eventName="phone_click"
          eventProperties={{ location: "navigation" }}
          className="button button-small nav-call"
        >
          Bel AB Service
        </TrackedLink>
        <details className="mobile-menu">
          <summary aria-label="Menu openen">Menu</summary>
          <nav aria-label="Mobiele navigatie">
            <NavigationItems mobile />
          </nav>
        </details>
      </div>
    </header>
  );
}
