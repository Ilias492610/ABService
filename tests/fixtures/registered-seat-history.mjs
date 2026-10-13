import { readFileSync } from "node:fs";
const f = JSON.parse(readFileSync(new URL("./registered-seat-facts.json", import.meta.url), "utf8"));
const paths = new Set(["/privacy-policy", "/algemene-voorwaarden"]);
const urls = new Set(["https://www.abservice24.be/privacy-policy", "https://www.abservice24.be/algemene-voorwaarden"]);

// Only the two exactly known legal dates are inversed. Old and unknown fields,
// wrong dates, unrelated paths and wrong URLs survive for historical checks.
export function beforeRegisteredSeatRegistry(page) {
  if (!paths.has(page.path) || page.lastModified !== "2026-10-13") return page;
  const before = f.before.registry.find(old => old.path === page.path);
  if (Object.hasOwn(before, "lastModified")) return { ...page, lastModified: before.lastModified };
  const { lastModified: _lastModified, ...rest } = page;
  return rest;
}

export function beforeRegisteredSeatSitemapEntry(entry) {
  if (!urls.has(entry.url) || entry.lastModified !== "2026-10-13") return entry;
  const before = f.before.sitemap.find(old => old.url === entry.url);
  if (Object.hasOwn(before, "lastModified")) return { ...entry, lastModified: before.lastModified };
  const { lastModified: _lastModified, ...rest } = entry;
  return rest;
}

const block = '<div data-registered-seat=""><p><strong>Maatschappelijke zetel (juridisch adres):</strong> Voorzorgstraat 12A bus 1, 2660 Antwerpen</p><p>Geen klantontvangst op dit adres. AB Service werkt bij klanten op locatie.</p></div>';
export function beforeRegisteredSeatHtml(html, path) {
  if (!["footer", "/privacy-policy", "/algemene-voorwaarden"].includes(path)) return html;
  let restored = html.replace(block, "");
  if (path === "/privacy-policy") restored = restored.replace('Dit beleid is bijgewerkt op <time dateTime="2026-10-13">13 oktober 2026</time>.', 'Dit beleid is bijgewerkt op <time dateTime="2026-10-11">11 oktober 2026</time>.');
  if (path === "/algemene-voorwaarden") restored = restored.replace('Publicatiecontrole:</strong> bijgewerkt op 13 oktober 2026.', 'Publicatiecontrole:</strong> bijgewerkt op 17 september 2026.');
  return restored;
}
