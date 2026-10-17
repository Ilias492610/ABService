import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { navigation } from "../content/site-content.mjs";
import { createHarness } from "./helpers/wp12-runtime.mjs";
import { loadContactModule } from "./helpers/contact-runtime.mjs";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { beforeMobileMenuNameSource } from "./fixtures/mobile-menu-name-history.mjs";
import { beforeNavigationEscapeSource } from "./fixtures/navigation-escape-history.mjs";
import { beforeLocalizationShellSource } from "./fixtures/localization-shell-history.mjs";

test("real server header renders both native nav trees and original identity/contact channels", async () => {
  const link = ({ children, ...props }) => React.createElement("a", props, children);
  const { default: HeaderNavigation } = await loadContactModule("components/header-navigation.js", {
    "next/link": link, "next/navigation": { usePathname: () => "/" },
  });
  const { default: SiteHeader } = await loadContactModule("components/site-header.js", {
    "next/link": link,
    "next/image": ({ priority: _priority, ...props }) => React.createElement("img", props),
    "@/content/site-content.mjs": { navigation },
    "@/content/business.mjs": await import("../content/business.mjs"),
    "@/components/header-navigation": HeaderNavigation,
    "@/components/tracked-link": ({ eventName: _name, eventProperties: _properties, ...props }) => link(props),
  });
  const html = renderToStaticMarkup(React.createElement(SiteHeader));
  assert.match(html, /<nav[^>]*aria-label="Hoofdnavigatie"/);
  assert.match(html, /<details[^>]*class="mobile-menu"/);
  assert.match(html, /<summary>Menu<\/summary>/, "mobile disclosure keeps the visible Menu name in either native state");
  assert.match(html, /<nav aria-label="Mobiele navigatie"/);
  assert.match(html, /href="\/" class="brand" aria-label="AB Service home"/);
  assert.match(html, /src="\/LogoZ.png"/);
  assert.match(html, /href="tel:\+32484906966"/);
  assert.match(html, /href="mailto:info@abservice24.be"/);
  assert.match(html, /Bel AB Service/);
  assert.equal((html.match(/href="\/diensten"/g) || []).length, 2);
});

test("server navigation retains native labels and supplied destinations", async () => {
  const h = await createHarness("navigation");
  try {
    const html = renderToStaticMarkup(h.render());
    assert.match(html, /<nav[^>]*aria-label="Hoofdnavigatie"/);
    for (const item of navigation) {
      const label = item.children ? item.overviewLabel || `Alle ${item.label.toLowerCase()}` : item.label;
      assert.ok(html.includes(`href="${item.href}">${label}</a>`), item.href);
      for (const child of item.children || []) assert.ok(html.includes(`href="${child.href}">${child.label}</a>`), child.href);
    }
    assert.doesNotMatch(html, /role="dialog"|aria-modal/);
  } finally { h.dispose(); }
});

for (const mobile of [false, true]) {
  test(`${mobile ? "mobile" : "desktop"} destination selection closes native menus without preventing navigation`, async () => {
    const h = await createHarness("navigation", { mobile });
    try {
      const root = h.query(mobile ? ".mobile-menu" : ".desktop-nav");
      const details = root.querySelector("details") || root;
      root.open = true; details.open = true;
      const link = details.querySelector("a");
      const event = h.click(root, link);
      assert.equal(details.open, false);
      if (mobile) assert.equal(root.open, false);
      assert.equal(event.defaultPrevented, false);
      assert.equal(link.props.href, "/diensten");
    } finally { h.dispose(); }
  });
  test(`${mobile ? "mobile" : "desktop"} pathname change closes disclosures; unchanged pathname and summary retain native state`, async () => {
    const h = await createHarness("navigation", { mobile });
    try {
      const root = h.query(mobile ? ".mobile-menu" : ".desktop-nav");
      const details = root.querySelector("details") || root;
      root.open = true; details.open = true;
      h.click(root, details.querySelector("summary"));
      assert.equal(details.open, true);
      h.navigate("/"); assert.equal(details.open, true);
      h.navigate("/contact"); assert.equal(details.open, false);
      if (mobile) assert.equal(root.open, false);
      details.open = true; h.navigate("/"); assert.equal(details.open, false);
    } finally { h.dispose(); }
  });
}

for (const focusedTag of ["summary", "a"]) {
  test(`desktop Escape from ${focusedTag} closes its owning disclosure and returns its summary focus`, async () => {
    const h = await createHarness("navigation");
    try {
      const [details, sibling] = h.all("details");
      details.open = true; sibling.open = true;
      const target = details.querySelector(focusedTag); target.focus();
      const event = h.keydown(target, "Escape");
      assert.equal(details.open, false);
      assert.equal(sibling.open, true, "does not choose an arbitrary sibling controller");
      assert.equal(h.document.activeElement, details.querySelector("summary"));
      assert.equal(event.defaultPrevented, true);
    } finally { h.dispose(); }
  });
}

test("mobile Escape closes the focused submenu first, then its parent with direct-summary focus", async () => {
  const h = await createHarness("navigation", { mobile: true });
  try {
    const root = h.query(".mobile-menu"), submenu = root.querySelector("details");
    root.open = true; submenu.open = true;
    const link = submenu.querySelector("a"); link.focus();
    assert.equal(h.keydown(link, "Escape").defaultPrevented, true);
    assert.equal(submenu.open, false); assert.equal(root.open, true);
    assert.equal(h.document.activeElement, submenu.querySelector("summary"));
    assert.equal(h.keydown(h.document.activeElement, "Escape").defaultPrevented, true);
    assert.equal(root.open, false);
    assert.equal(h.document.activeElement, root.children.find(child => child.tagName === "SUMMARY"));
  } finally { h.dispose(); }
});

test("mobile Escape from a top-level link resets all descendants before reopening", async () => {
  const h = await createHarness("navigation", { mobile: true });
  try {
    const root = h.query(".mobile-menu"), submenu = root.querySelector("details");
    root.open = true; submenu.open = true;
    const home = root.querySelector("a"); home.focus();
    h.keydown(home, "Escape");
    assert.equal(root.open, false); assert.equal(submenu.open, false);
    assert.equal(h.document.activeElement, root.children.find(child => child.tagName === "SUMMARY"));
    root.open = true; assert.equal(submenu.open, false);
  } finally { h.dispose(); }
});

test("navigation does not intercept other keys, consumed Escape, closed disclosures or outside targets", async () => {
  const h = await createHarness("navigation");
  try {
    const root = h.query(".desktop-nav"), details = root.querySelector("details"), summary = details.querySelector("summary");
    for (const key of ["Enter", " ", "Tab", "ArrowDown"]) {
      details.open = true; summary.focus();
      assert.equal(h.keydown(summary, key).defaultPrevented, false);
      assert.equal(details.open, true); assert.equal(h.document.activeElement, summary);
    }
    const link = details.querySelector("a"); link.focus();
    h.keydown(link, "Escape", { defaultPrevented: true });
    assert.equal(details.open, true); assert.equal(h.document.activeElement, link);
    details.open = false; summary.focus();
    assert.equal(h.keydown(summary, "Escape").defaultPrevented, false);
    assert.equal(h.document.activeElement, summary);
    details.open = true; h.brand.focus();
    const event = { key: "Escape", target: h.brand, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } };
    root.props.onKeyDown?.(event);
    assert.equal(details.open, true); assert.equal(h.document.activeElement, h.brand);
    assert.equal(event.defaultPrevented, false);
  } finally { h.dispose(); }
});

test("stable mobile menu name retains every other navigation source byte", async () => {
  const source = beforeLocalizationShellSource(await readFile(new URL("../components/header-navigation.js", import.meta.url), "utf8"), "components/header-navigation.js");
  const hash = (value) => createHash("sha256").update(value).digest("hex");
  assert.equal(hash(beforeMobileMenuNameSource(beforeNavigationEscapeSource(source))), "047cb3b5ffc35185cd993fe24b52697691569decdb69033f1e61f9e8abf4c479");
  const otherLabel = source.replace('<summary>Menu</summary>', '<summary aria-label="Andere naam">Menu</summary>');
  assert.equal(beforeMobileMenuNameSource(otherLabel), otherLabel);
  const wrongDestination = source.replace('href={child.href}', 'href="/verkeerde-bestemming"');
  assert.notEqual(hash(beforeMobileMenuNameSource(beforeNavigationEscapeSource(wrongDestination))), "047cb3b5ffc35185cd993fe24b52697691569decdb69033f1e61f9e8abf4c479");
});
