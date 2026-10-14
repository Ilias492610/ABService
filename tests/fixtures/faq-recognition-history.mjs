// Independently frozen Task123 additions, never a broad HTML/source/date cleanup.
export const faqRecognitionHtml = '<details><summary>Hoe controleer ik de erkenning voor verplicht ketelonderhoud?</summary><p>Vraag vóór de afspraak naar de naam en het erkenningsnummer van de technicus die het werk uitvoert. In Vlaanderen raadpleegt u de <a class="underline" href="https://www.vlaanderen.be/erkenning-als-technicus-vloeibare-brandstof-of-technicus-gasvormige-brandstof">Vlaamse overzichtslijsten</a> voor de juiste brandstof. Voor een Brusselse EPB-periodieke controle kiest u de passende <a class="underline" href="https://leefmilieu.brussels/burgers/diensten-en-aanvragen/erkende-en-geregistreerde-professionals-vinden/vind-een-epb-professional">EPB-verwarmingsketeltechnici</a>. Laat bevestigen dat de erkenning bij uw toestel en de handeling past; alleen een bedrijfsnaam of logo is niet genoeg.</p></details>';
export const faqRecognitionQuestionSource = '      [\n        "Hoe controleer ik de erkenning voor verplicht ketelonderhoud?",\n        <>Vraag vóór de afspraak naar de naam en het erkenningsnummer van de technicus die het werk uitvoert. In Vlaanderen raadpleegt u de <a className="underline" href={coreSources.recognitionListsFlanders.href}>Vlaamse overzichtslijsten</a> voor de juiste brandstof. Voor een Brusselse EPB-periodieke controle kiest u de passende <a className="underline" href={coreSources.recognitionListsBrussels.href}>EPB-verwarmingsketeltechnici</a>. Laat bevestigen dat de erkenning bij uw toestel en de handeling past; alleen een bedrijfsnaam of logo is niet genoeg.</>,\n      ],\n';
const sourceRecords = Object.freeze({
  recognitionListsFlanders: { label: 'Vlaanderen: overzichtslijsten voor erkende brandstoftechnici', href: 'https://www.vlaanderen.be/erkenning-als-technicus-vloeibare-brandstof-of-technicus-gasvormige-brandstof' },
  recognitionListsBrussels: { label: 'Leefmilieu Brussel: EPB-professionals per handeling', href: 'https://leefmilieu.brussels/burgers/diensten-en-aanvragen/erkende-en-geregistreerde-professionals-vinden/vind-een-epb-professional' },
});
const sourceAdditions = [
  '  recognitionListsFlanders: {\n    label: "Vlaanderen: overzichtslijsten voor erkende brandstoftechnici",\n    href: "https://www.vlaanderen.be/erkenning-als-technicus-vloeibare-brandstof-of-technicus-gasvormige-brandstof",\n  },\n',
  '  recognitionListsBrussels: {\n    label: "Leefmilieu Brussel: EPB-professionals per handeling",\n    href: "https://leefmilieu.brussels/burgers/diensten-en-aanvragen/erkende-en-geregistreerde-professionals-vinden/vind-een-epb-professional",\n  },\n',
];
export const beforeFaqRecognitionHtml = html => html.replace(faqRecognitionHtml, '');
export function beforeFaqRecognitionSource(source, path) {
  if (path === 'app/faq/page.js') return source.replace('import { coreSources } from "@/content/core-sources.mjs";\n', '').replace(faqRecognitionQuestionSource, '');
  if (path === 'content/core-sources.mjs') for (const addition of sourceAdditions) source = source.replace(addition, '');
  return source;
}
// Decode only the two named text consumers; unrelated protected binaries stay byte-identical.
export function beforeFaqRecognitionProtectedBytes(bytes, path) {
  return ['app/faq/page.js', 'content/core-sources.mjs'].includes(path)
    ? beforeFaqRecognitionSource(bytes.toString('utf8'), path)
    : bytes;
}
export function beforeFaqRecognitionCoreSources(sources) {
  const restored = { ...sources };
  for (const [key, expected] of Object.entries(sourceRecords)) if (JSON.stringify(restored[key]) === JSON.stringify(expected)) delete restored[key];
  return restored;
}
export function beforeFaqRecognitionCitations(citations) {
  return citations.filter(citation => !Object.values(sourceRecords).some(expected => JSON.stringify(citation) === JSON.stringify(expected)));
}
export function beforeFaqRecognitionRegistry(page) {
  if (page.path !== '/faq' || page.lastModified !== '2026-10-14') return page;
  const { lastModified: _lastModified, ...rest } = page;
  return rest;
}
export function beforeFaqRecognitionSitemapEntry(entry) {
  if (entry.url !== 'https://www.abservice24.be/faq' || entry.lastModified !== '2026-10-14') return entry;
  const { lastModified: _lastModified, ...rest } = entry;
  return rest;
}
