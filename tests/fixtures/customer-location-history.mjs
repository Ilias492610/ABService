import { readFileSync } from "node:fs";
const f = JSON.parse(readFileSync(new URL("./customer-location-facts.json", import.meta.url), "utf8"));
const beforePages = new Map(f.before.pages.map(({ page }) => [page.path, page]));

// Task90 inverse strips only the new date on the two previously undated rows.
// Wrong dates and every old/unknown field remain visible to historical checks.
export function beforeCustomerLocationRegistry(page) {
  const before = beforePages.get(page.path);
  if (!before || Object.hasOwn(before, "lastModified") || page.lastModified !== f.modifiedAt) return page;
  const { lastModified: _lastModified, ...rest } = page;
  return rest;
}

export function beforeCustomerLocationSitemapEntry(entry) {
  const before = f.before.sitemap.find(old => old.url === entry.url);
  if (!before || !["https://www.abservice24.be/", "https://www.abservice24.be/contact"].includes(entry.url)
    || Object.hasOwn(before, "lastModified") || entry.lastModified !== f.modifiedAt) return entry;
  const { lastModified: _lastModified, ...rest } = entry;
  return rest;
}
