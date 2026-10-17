"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function closeDisclosures(root) {
  if (!root) return;
  for (const details of root.querySelectorAll("details[open]")) details.open = false;
  if (root.matches("details")) root.open = false;
}

export default function HeaderNavigation({ navigation, mobile = false }) {
  const root = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    closeDisclosures(root.current);
  }, [pathname]);

  const selectDestination = (event) => {
    const link = event.target.closest("a[href]");
    if (link && root.current?.contains(link)) closeDisclosures(root.current);
  };
  const dismissDisclosure = (event) => {
    if (event.key !== "Escape" || event.defaultPrevented || !root.current?.contains(event.target)) return;
    const details = event.target.closest("details[open]");
    if (!details || !root.current.contains(details)) return;
    const summary = Array.from(details.children).find(child => child.tagName === "SUMMARY");
    if (!summary) return;
    event.preventDefault();
    closeDisclosures(details);
    summary.focus();
  };
  const items = navigation.map((item) => item.children ? (
    <details className={mobile ? "mobile-submenu" : "nav-submenu"} key={item.label}>
      <summary>{item.label}</summary>
      <div className="submenu-panel">
        <Link href={item.href}>{item.overviewLabel || `Alle ${item.label.toLowerCase()}`}</Link>
        {item.children.map((child) => (
          <Link key={child.href} href={child.href}>{child.label}</Link>
        ))}
      </div>
    </details>
  ) : <Link key={item.href} href={item.href}>{item.label}</Link>);

  return mobile ? (
    <details className="mobile-menu" ref={root} onClick={selectDestination} onKeyDown={dismissDisclosure}>
      <summary>Menu</summary>
      <nav aria-label="Mobiele navigatie">{items}</nav>
    </details>
  ) : (
    <nav className="desktop-nav" aria-label="Hoofdnavigatie" ref={root} onClick={selectDestination} onKeyDown={dismissDisclosure}>
      {items}
    </nav>
  );
}
