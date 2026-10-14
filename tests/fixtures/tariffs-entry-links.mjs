// Frozen, independently specified additions. No broad anchor/whitespace cleanup.
export const tariffEntryAnchors = Object.freeze([
  '<a class="underline" href="/onderhoud">Voorbereiding op cv-ketelonderhoud →</a>',
  '<a class="underline" href="/herstelling">Hoe een herstelling wordt beoordeeld →</a>',
  '<a class="underline" href="/installaties/gasketels">Gasketel plaatsen of vervangen →</a>',
  '<a class="underline" href="/installaties/sanitair">Scope en voorbereiding van sanitairwerk →</a>',
]);
export function beforeTariffEntryLinks(html) {
  for (const anchor of tariffEntryAnchors) html = html.replace(anchor, "");
  return html.replace('class="section tariff-service-context"', 'class="section"');
}

// Restore only the inspected Task120 source changes for the older whole-site pin.
// Wrong labels, destinations, branches, other imports and copy still fail its hash.
export function beforeTariffEntrySource(source) {
  const replacements = [
    ['import Link from "next/link";\n', ""],
    [', "/onderhoud", "Voorbereiding op cv-ketelonderhoud"', ""],
    [', "/herstelling", "Hoe een herstelling wordt beoordeeld"', ""],
    [', "/installaties/gasketels", "Gasketel plaatsen of vervangen"', ""],
    [', "/installaties/sanitair", "Scope en voorbereiding van sanitairwerk"', ""],
    ["priceFactors.map(([title, text, href, label])", "priceFactors.map(([title, text])"],
    ['                {href && <Link className="underline" href={href}>{label} →</Link>}\n', ""],
    ['className="section tariff-service-context"', 'className="section"'],
  ];
  for (const [addition, before] of replacements) source = source.replace(addition, before);
  return source;
}

export const beforeTariffEntryProtectionSource = source => source.replace(", .tariff-service-context", "");
export const beforeTariffEntryProtectionCss = source => source.replace('.tariff-service-context a { scroll-margin-block: calc(var(--header-offset) + 1rem) 1rem; }\n', "");
