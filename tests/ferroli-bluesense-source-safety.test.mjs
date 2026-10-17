const livePageRegistry = beforeLocalizationRegistry(beforeCookieConsentRegistry(fullLocalizedRegistry));
import { beforeFaucetRegistry } from "./fixtures/faucet-context-history.mjs";
import { beforeFaqRecognitionRegistry } from "./fixtures/faq-recognition-history.mjs";
import { beforeSanitaryReferralRegistry } from "./fixtures/sanitary-referral-history.mjs";
// Reconstruct only independently tested Task83 before earlier named history inverses.
import {beforeTzerraGuide,beforeTzerraRegistry,beforeTzerraHtml,beforeTzerraManifest} from "./fixtures/tzerra-ace-matic-history.mjs";
const faultGuides=liveFaultGuides.map(beforeTzerraGuide);
const getFaultGuide=slug=>beforeTzerraGuide(liveGetFaultGuide(slug));
const pageRegistry=livePageRegistry.map(beforeTzerraRegistry);
const getPageDefinition=path=>beforeTzerraRegistry(liveGetPageDefinition(path));
const renderFaultGuide=async slug=>beforeTzerraHtml(await liveRenderFaultGuide(slug),slug);
// Historical captures remove only the independently tested named Task80 addition.
import { beforeAtagManualsGuide, beforeAtagManualsManifest, beforeAtagManualsRegistry } from "./fixtures/atag-manuals-history.mjs";
// Reconstruct only the separately verified Task77 addition for historical hashes.
import { beforeGb172Guide, beforeGb172Registry, beforeGb172Manifest } from "./fixtures/buderus-gb172i2-history.mjs";
import { beforeCalentaGuide } from "./fixtures/calenta-legacy-source-safety.mjs";
import { beforeAvantaGuide, beforeAvantaRegistry } from "./fixtures/avanta-overview-source-safety.mjs";
import { beforeViessmannGuide, beforeViessmannRegistry } from "./fixtures/viessmann-overview-source-safety.mjs";
import { beforeAtagGuide, beforeAtagRegistry } from "./fixtures/atag-overview-source-safety.mjs";
import { beforeIthoGuide, beforeIthoRegistry } from "./fixtures/itho-base-cube-source-safety.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import {createHash} from "node:crypto";
import {readFile} from "node:fs/promises";
import {faultGuides as liveFaultGuides,getFaultGuide as liveGetFaultGuide} from "../content/fault-guides.mjs";
import {pageRegistry as fullLocalizedRegistry,getPageDefinition as liveGetPageDefinition} from "../content/site-content.mjs";
import { beforeLocalizationRegistry } from "./fixtures/localization-release-history.mjs";
import {buildPageMetadata,buildSitemapEntries} from "../libs/seo-data.mjs";
import {filterFaultCatalogs} from "../libs/fault-search.mjs";
import {buildFaultCodeAliases} from "../libs/fault-code-aliases.mjs";
import {renderFaultGuide as liveRenderFaultGuide} from "./helpers/fault-guide-runtime.mjs";
import {ferroliFacts as facts,beforeFerroliGuide,beforeFerroliRegistry,beforeFerroliMetadata,beforeFerroliHtml} from "./fixtures/ferroli-bluesense-source-safety.mjs";
const guide=getFaultGuide("ferroli"),catalog=guide.catalogs[0];
const hash=v=>createHash("sha256").update(typeof v==="string"?v:JSON.stringify(v)).digest("hex");
const row=code=>catalog.codes.find(r=>r.code===code);

test("Ferroli source scope, historical12variants and unresolved current device-fit limits are explicit",()=>{
  assert.equal(catalog.scope,facts.scope);assert.equal(guide.modelWarning,facts.warning);assert.equal(catalog.sourceLabel,facts.label);assert.equal(guide.sourceLabel,facts.label);assert.equal(catalog.sourceUrl,facts.url);assert.equal(catalog.sourcePages,facts.pages);
  assert.equal(facts.models.length,12);assert.match(guide.modelWarning,/historische Nederlandse.*geen overzicht voor alle/);assert.match(guide.modelWarning,/Artikelnummers, actuele firmware en de nieuwste revisie.*niet vastgesteld/);
});
test("exact37 original blocks preserve38 literal A/F identifiers, sharedA23A24 and distinctA63A65",()=>{
  assert.equal(guide.codeEntryCount,37);assert.deepEqual(catalog.codes.map(r=>r.code),facts.groupIdentifiers);
  assert.deepEqual(catalog.codes.flatMap(r=>buildFaultCodeAliases(r.code).filter(a=>!a.includes(" / "))),facts.sourceIdentifiers);
  const search=q=>filterFaultCatalogs(guide.catalogs,q,facts.id).flatMap(c=>c.codes.map(r=>r.code));
  for(const code of facts.sourceIdentifiers)assert.equal(search(code).length,1,code);
  assert.deepEqual(search("A23"),["A23 / A24"]);assert.deepEqual(search("a24"),["A23 / A24"]);
  for(const code of [...facts.excluded,"A07","F16","UNKNOWN56"])assert.deepEqual(search(code),[],code);
  assert.equal(search("").length,37);assert.match(catalog.scope,/FH.*d1\/d2\/d3.*geen foutcodes/);
});
test("independent exact15 source meaning corrections and all37 local user actions match",()=>{
  assert.equal(facts.rowChanges.length,37);assert.equal(facts.rowChanges.filter(c=>Object.hasOwn(c.after,"meaning")).length,15);
  for(const c of facts.rowChanges)for(const[k,v]of Object.entries(c.after))assert.equal(row(c.beforeCode)[k],v,`${c.beforeCode} ${k}`);
});
test("A cause-resolved-before-reset and F ineffective-reset controls retain local exceptions",()=>{
  for(const r of catalog.codes){if(r.code.startsWith("A")){assert.match(r.userAction,/oorzaak.*verholpen vóór een reset/);assert.match(r.userAction,/omzeil de resetbegrenzing niet/);assert.doesNotMatch(r.userAction,/reset alleen wanneer/);}else assert.match(r.userAction,/F-code.*resettoets geen effect/);assert.match(r.userAction,/installateur/);}
  for(const code of ["F20","F21"])assert.match(row(code).meaning,/blijft.*functioneren/);
  assert.match(row("F40").meaning,/hoger dan 2,8 bar.*schakelt.*uit/);
  assert.match(row("F64").userAction,/Onderbreek niet zelf de netspanning/);assert.doesNotMatch(row("F64").userAction,/stekker.*uit|spanningsloos maken|reset alleen wanneer/);
});
test("high pressure, flow monitoring and pressure sensor faults never point to filling or DIY components",()=>{
  for(const code of ["A26","F21","F40"]){assert.match(row(code).userAction,/Vul het toestel niet bij en tap niet zelf water af/);assert.doesNotMatch(row(code).userAction,/vul- of ontluchtingsinstructie/);}
  for(const code of ["A41","F47","F34","F35"])assert.doesNotMatch(row(code).userAction,/vul- of ontluchtingsinstructie|reset alleen wanneer/);
  for(const code of ["F47","F34","F35","A63","A65","F50","F66"])assert.match(row(code).userAction,/werk niet aan.*bekabeling, printplaat of netspanning/);
  for(const code of ["F20","F37"])assert.match(row(code).userAction,/lage displaywaarde alleen bewijst niet dat bijvullen nodig/);
  assert.match(row("A26").meaning,/één uur.*drie keer.*F40/);assert.match(row("A04").meaning,/F07.*drie keer.*24 uur/);assert.match(row("A41").meaning,/drie keer.*minstens 1 °C na 15 seconden.*niet automatisch.*lage waterdruk/);
});
test("recovery thresholds remain model-bound and diagnostic checks are not asserted causes",()=>{
  for(const code of ["F08","F09"])assert.match(row(code).meaning,/hoger dan 99 °C.*onder 89 °C.*alleen.*warmtevraag/);
  assert.doesNotMatch(row("F12").meaning,/niet aangesloten of defect/);assert.doesNotMatch(row("F13").meaning,/niet aangesloten of kortgesloten/);assert.match(row("F13").meaning,/controlepunten, geen vastgestelde oorzaak/);
  assert.doesNotMatch(row("F35").meaning,/50|60|netfrequentie|230/);
  assert.doesNotMatch(row("A63").meaning,/intern/);assert.doesNotMatch(row("A65").meaning,/intern/);
});
test("only substantively changed Ferroli metadata and sitemap have the real modification date",()=>{
  const page=getPageDefinition("/foutcodes/ferroli"),meta=buildPageMetadata(page);assert.equal(meta.description,facts.description);assert.equal(meta.openGraph.description,facts.description);assert.equal(meta.twitter.description,facts.description);assert.equal(page.lastModified,"2026-10-11");assert.equal(meta.alternates.canonical,"https://www.abservice24.be/foutcodes/ferroli");assert.equal(meta.robots.index,true);assert.equal(buildSitemapEntries(pageRegistry.map(beforeFaucetRegistry).map(beforeFaqRecognitionRegistry)).find(e=>e.url===meta.alternates.canonical).lastModified,"2026-10-11");assert.equal(hash(beforeFerroliMetadata(meta,"ferroli")),facts.preservation.metadata);
});
test("complete actual37-card SSR and every untouched element restore exact genuine ab6ecdd HTML",async()=>{
  const html=await renderFaultGuide("ferroli");assert.equal((html.match(/class="fault-code-card"/g)||[]).length,37);assert.equal((html.match(/<option /g)||[]).length,2);for(const value of [facts.scope,facts.warning,facts.label])assert.ok(html.includes(value));assert.match(html,/\/contact\?dienst=Herstelling\+verwarming#aanvraagformulier/);assert.equal(hash(beforeFerroliHtml(html,"ferroli")),facts.preservation.html);
});
test("all13 complete guides and82 registry entries preserve every leaf outside exact declared Ferroli changes",()=>{
  assert.equal(hash(beforeFerroliGuide(guide)),facts.preservation.guide);assert.equal(hash(beforeFerroliGuide(guide).codes),facts.preservation.codes);assert.equal(hash(faultGuides.map(beforeAtagManualsGuide).map(beforeGb172Guide).filter(g=>g.slug!=="ferroli").map(beforeCalentaGuide).map(beforeAvantaGuide).map(beforeViessmannGuide).map(beforeAtagGuide).map(beforeIthoGuide)),facts.preservation.otherTwelveGuides);assert.equal(hash(faultGuides.map(beforeAtagManualsGuide).map(beforeGb172Guide).map(beforeCalentaGuide).map(beforeAvantaGuide).map(beforeViessmannGuide).map(beforeAtagGuide).map(beforeIthoGuide).map(beforeFerroliGuide)),facts.preservation.allGuides);assert.equal(hash(pageRegistry.map(beforeFaucetRegistry).map(beforeFaqRecognitionRegistry).map(beforeSanitaryReferralRegistry).map(beforeAtagManualsRegistry).map(beforeGb172Registry).map(beforeAvantaRegistry).map(beforeViessmannRegistry).map(beforeAtagRegistry).map(beforeIthoRegistry).map(beforeFerroliRegistry)),facts.preservation.allRegistry);assert.equal(faultGuides.map(beforeAtagManualsGuide).map(beforeGb172Guide).reduce((n,g)=>n+g.codeEntryCount,0),1596);
});
test("Ferroli manifest ties only verified historical fields to retained original PDF and leaves device-fit unknown",async()=>{
  const m=beforeGb172Manifest(beforeAtagManualsManifest(beforeTzerraManifest(JSON.parse(await readFile(new URL("../docs/seo/fault-code-model-coverage.json",import.meta.url),"utf8"))))),e=m.entries.find(e=>e.id===facts.id),s=m.snapshots.find(s=>s.id==="ferroli-bluesense-pdf");
  assert.equal(e.modelScope,facts.scope);assert.equal(e.sourceLabel,facts.label);assert.deepEqual(e.models,facts.models);assert.equal(e.issueDate,facts.issueMonth);assert.equal(e.issueDatePrecision,"month");assert.equal(e.language,"nl");assert.equal(e.documentNumber,facts.document);assert.equal(e.revision,facts.revision);assert.equal(e.literalCodeGroupCount,37);assert.equal(e.literalIndividualCodeCount,38);assert.equal(e.literalAlarmCodeCount,16);assert.equal(e.literalFaultCodeCount,22);assert.equal(e.normalStateCodeCount,4);for(const k of ["articleNumbers","market","firmwareCompatibility","currentBelgianVariantCompatibility","newestEdition"])assert.equal(e[k],null);assert.equal(s.sha256,facts.sha256);assert.equal(s.pageCount,facts.pageCount);assert.equal(s.expectedSha256,null);assert.equal(s.hashMatchesPriorRecord,null);
});
import { beforeCookieConsentRegistry } from "./fixtures/cookie-consent-history.mjs";
