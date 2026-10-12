import { readFileSync } from "node:fs";
// Historical integrity only: no hash rebase or unknown-leaf replacement.
// Actual new behavior is independently tested against manufacturer source facts.
const f = JSON.parse(readFileSync(new URL("./buderus-gb172i2-source-facts.json", import.meta.url), "utf8"));
const restore = (value, current, previous) => value === current ? previous : value;
export function beforeGb172Guide(guide) {
  if (guide.slug !== "buderus" || !guide.catalogs.some(c => c.id === f.id)) return guide;
  return { ...guide, modelWarning: guide.modelWarning.replace(f.warning, f.before.warning),
    catalogs: guide.catalogs.filter(c => c.id !== f.id),
    codeEntryCount: guide.codeEntryCount - 69, codes: guide.codes.slice(0, -69) };
}
export function beforeGb172Registry(page) {
  if (page.path !== f.page.path) return page;
  return { ...page,
    title: restore(page.title, f.page.title, f.before.page.title),
    description: restore(page.description, f.page.description, f.before.page.description),
    lastModified: restore(page.lastModified, f.page.lastModified, f.before.page.lastModified) };
}
export function beforeGb172Metadata(metadata, slug) {
  if (slug !== "buderus") return metadata;
  const text = value => ({ ...value,
    title: restore(value.title, f.page.title, f.before.page.title),
    description: restore(value.description, f.page.description, f.before.page.description) });
  const alt = f.page.title.replace(/\s*\|\s*AB Service$/, "") + " — AB Service";
  return { ...text(metadata),
    openGraph: { ...text(metadata.openGraph),
      images: metadata.openGraph.images.map(image => ({ ...image,
        alt: restore(image.alt, alt, f.before.metadata.openGraph.images[0].alt) })) },
    twitter: text(metadata.twitter) };
}
export function beforeGb172Html(html, slug) {
  if (slug !== "buderus") return html;
  return html.replace(f.warning, f.before.warning)
    .replace('<p class="eyebrow">121 brongebonden codeverklaringen</p>', '<p class="eyebrow">52 brongebonden codeverklaringen</p>')
    .replace('<p class="fault-result-count" aria-live="polite">121 codeverklaringen zichtbaar</p>', '<p class="fault-result-count" aria-live="polite">52 codeverklaringen zichtbaar</p>')
    .replace(`<option value="${f.id}">${f.title}</option>`, "")
    .replace(/<section class="fault-group" aria-labelledby="buderus-logamax-gb172i2-title">[\s\S]*?<\/section>/, "");
}
export function beforeGb172Manifest(manifest) {
  if (!manifest.entries.some(e => e.id === f.id)) return manifest;
  const increments = { catalogAssignments: 1, distinctCatalogs: 1,
    displayedExplanationRows: 69, distinctCatalogExplanationRows: 69, distinctCatalogSourceURLs: 1 };
  return { ...manifest,
    purpose: manifest.purpose.replace(f.manifestPurposeSuffix, ""),
    incrementalUpdateDate: restore(manifest.incrementalUpdateDate, "2026-10-12", "2026-10-11"),
    counts: Object.fromEntries(Object.entries(manifest.counts).map(([key, value]) => [key, value - (increments[key] || 0)])),
    countBoundary: manifest.countBoundary.replace(f.manifestCountSuffix, ""),
    guides: manifest.guides.map(g => g.slug !== "buderus" ? g : { ...g,
      modelWarning: g.modelWarning.replace(f.warning, f.before.warning),
      explanationRowCount: g.explanationRowCount - 69, catalogIds: g.catalogIds.filter(id => id !== f.id) }),
    entries: manifest.entries.filter(e => e.id !== f.id),
    snapshots: manifest.snapshots.filter(s => s.id !== f.snapshotId) };
}
