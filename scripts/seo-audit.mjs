import { pageRegistry } from "../content/site-content.mjs";
import { business } from "../content/business.mjs";
import { auditHtml, findUnreachablePages } from "../libs/html-audit.mjs";
import { buildAuditTargets } from "../libs/seo-audit-targets.mjs";

const baseUrl = (process.argv[2] || process.env.AUDIT_BASE_URL || business.canonicalOrigin).replace(/\/$/, "");
const expectedPublished = pageRegistry.filter((page) => page.status === "published");
const expectedNoindex = pageRegistry.filter((page) => page.status === "noindex");
const failures = [];

const canonicalUrl = (path) => buildAuditTargets(baseUrl, path).canonicalUrl;
const normalizeCanonical = (url) => url.replace(/\/$/, "");
const record = (condition, message) => {
  if (!condition) failures.push(message);
};

const fetchPage = async (url) => {
  const response = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(15_000) });
  return { response, html: await response.text() };
};

const sitemapResult = await fetchPage(`${baseUrl}/sitemap.xml`);
record(sitemapResult.response.status === 200, `sitemap geeft ${sitemapResult.response.status}`);
const sitemapUrls = [...sitemapResult.html.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const expectedSitemapUrls = expectedPublished.map((page) => canonicalUrl(page.path));
record(
  JSON.stringify([...sitemapUrls].sort()) === JSON.stringify([...expectedSitemapUrls].sort()),
  "sitemap wijkt af van de published-registry"
);
for (const match of sitemapResult.html.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  const loc = match[1].match(/<loc>(.*?)<\/loc>/)?.[1];
  const lastmod = match[1].match(/<lastmod>(.*?)<\/lastmod>/)?.[1];
  if (!lastmod) continue;
  const page = expectedPublished.find((entry) => canonicalUrl(entry.path) === loc);
  record(Boolean(page?.lastModified) && lastmod.slice(0, 10) === page.lastModified.slice(0, 10), `${loc}: lastmod wijkt af van de bijgehouden wijzigingsdatum`);
}

const robotsResult = await fetchPage(`${baseUrl}/robots.txt`);
record(robotsResult.response.status === 200, `robots.txt geeft ${robotsResult.response.status}`);
record(robotsResult.html.includes(`${business.canonicalOrigin}/sitemap.xml`), "robots.txt verwijst niet naar de sitemap");
record(robotsResult.html.includes("Disallow: /api/"), "robots.txt schermt /api/ niet af");

const auditedPages = [];
for (const page of [...expectedPublished, ...expectedNoindex]) {
  const targets = buildAuditTargets(baseUrl, page.path);
  const { response, html } = await fetchPage(targets.fetchUrl);
  record(response.status === 200, `${page.path} geeft ${response.status}`);
  record(response.url === targets.fetchUrl, `${page.path} redirect naar ${response.url}`);
  record(page.status !== "published" || !/noindex/i.test(response.headers.get("x-robots-tag") || ""), `${page.path}: indexeerbare pagina heeft X-Robots-Tag noindex`);

  const audit = auditHtml({ html, url: targets.fetchUrl, indexable: page.status === "published", expectedLanguage: page.locale || "nl-BE" });
  for (const issue of audit.issues) failures.push(`${page.path}: ${issue}`);
  record(
    normalizeCanonical(audit.canonical) === normalizeCanonical(targets.canonicalUrl),
    `${page.path}: canonical is ${audit.canonical || "leeg"}`
  );
  auditedPages.push({ page, url: targets.fetchUrl, response, ...audit });
}

for (const field of ["title", "description"]) {
  const seen = new Map();
  for (const result of auditedPages.filter((item) => item.page.status === "published")) {
    const value = result[field];
    if (!value) continue;
    if (seen.has(value)) failures.push(`dubbele ${field}: ${seen.get(value)} en ${result.page.path}`);
    seen.set(value, result.page.path);
  }
}

const internalLinks = new Set(auditedPages.flatMap((page) => page.internalLinks));
for (const link of internalLinks) {
  const response = await fetch(link, { redirect: "manual", signal: AbortSignal.timeout(15_000) });
  record(response.status < 400, `interne link ${link} geeft ${response.status}`);
  record(response.status < 300, `interne link ${link} redirect met ${response.status}`);
  await response.body?.cancel();
}

const publishedResults = auditedPages.filter((result) => result.page.status === "published");
for (const url of findUnreachablePages(publishedResults, `${baseUrl}/`)) {
  failures.push(`gepubliceerde pagina ${url} is niet bereikbaar vanuit de homepage`);
}
const pagesByPath = new Map(auditedPages.map((result) => [new URL(result.url).pathname, result]));
for (const result of auditedPages) {
  for (const link of result.fragmentLinks) {
    const destination = pagesByPath.get(new URL(link.url).pathname);
    if (destination) record(destination.documentIds.includes(link.fragment), `${result.page.path}: anker ${link.url}#${link.fragment} ontbreekt`);
  }
}

const localAsset = (href) => {
  const target = new URL(href);
  if (target.origin === new URL(baseUrl).origin) return target.href;
  if (target.origin === business.canonicalOrigin) return `${baseUrl}${target.pathname}${target.search}`;
  return null;
};
const assets = new Set(auditedPages.flatMap((result) => result.assets).map(localAsset).filter(Boolean));
for (const asset of assets) {
  try {
    const response = await fetch(asset, { redirect: "manual", signal: AbortSignal.timeout(15_000) });
    record(response.status === 200, `asset ${asset} geeft ${response.status}`);
    record(!/text\/html/i.test(response.headers.get("content-type") || ""), `asset ${asset} geeft HTML in plaats van een bestand`);
    if (/\.webmanifest(?:\?|$)/.test(asset) && response.ok) {
      const manifest = await response.json();
      for (const icon of manifest.icons || []) {
        if (icon.src) {
          const href = localAsset(new URL(icon.src, asset).href);
          if (href) assets.add(href);
        }
      }
    } else {
      await response.body?.cancel();
    }
  } catch (error) {
    failures.push(`asset ${asset}: ${error.message}`);
  }
}

const missing = await fetchPage(`${baseUrl}/seo-audit-niet-bestaand`);
record(missing.response.status === 404, `404-test geeft ${missing.response.status}`);
const missingAudit = auditHtml({ html: missing.html, url: missing.response.url, indexable: false });
record(missingAudit.robots.toLowerCase().includes("noindex"), "404 bevat geen noindex");
record(!missingAudit.canonical, `404 bevat onjuiste canonical ${missingAudit.canonical}`);

if (failures.length > 0) {
  console.error(`SEO-audit mislukt met ${failures.length} probleem/problemen:`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(`SEO-audit geslaagd: ${auditedPages.length} pagina's, ${internalLinks.size} interne links en ${assets.size} assets gecontroleerd; alle gepubliceerde pagina's bereikbaar.`);
}
