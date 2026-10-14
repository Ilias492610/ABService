import { readFileSync } from "node:fs";
const additions = JSON.parse(readFileSync(new URL("./sanitary-referral-source-additions.json", import.meta.url), "utf8"));

// Task112 restores only its approved new date on the previously undated route.
// Every other field, wrong date and other path remains visible to old guards.
export function beforeSanitaryReferralRegistry(page) {
  if (page.path !== "/installaties/sanitair" || page.lastModified !== "2026-10-14") return page;
  const { lastModified: _lastModified, ...rest } = page;
  return rest;
}
export function beforeSanitaryReferralSitemapEntry(entry) {
  if (entry.url !== "https://www.abservice24.be/installaties/sanitair" || entry.lastModified !== "2026-10-14") return entry;
  const { lastModified: _lastModified, ...rest } = entry;
  return rest;
}
// Root-authorized exact additive source inverse for registered-seat history only.
// Frozen literal additions, not a regenerated diff or a broad source pattern.
export function beforeSanitaryReferralSource(source, path) {
  if (!Object.hasOwn(additions, path)) return source;
  for (const addition of additions[path]) source = source.replace(addition, "");
  return source;
}
