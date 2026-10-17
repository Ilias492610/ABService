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

test("stable mobile menu name retains every other navigation source byte", async () => {
  const source = await readFile(new URL("../components/header-navigation.js", import.meta.url), "utf8");
  const hash = (value) => createHash("sha256").update(value).digest("hex");
  assert.equal(hash(beforeMobileMenuNameSource(source)), "047cb3b5ffc35185cd993fe24b52697691569decdb69033f1e61f9e8abf4c479");
  const otherLabel = source.replace('<summary>Menu</summary>', '<summary aria-label="Andere naam">Menu</summary>');
  assert.equal(beforeMobileMenuNameSource(otherLabel), otherLabel);
  const wrongDestination = source.replace('href={child.href}', 'href="/verkeerde-bestemming"');
  assert.notEqual(hash(beforeMobileMenuNameSource(wrongDestination)), "047cb3b5ffc35185cd993fe24b52697691569decdb69033f1e61f9e8abf4c479");
});
