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
import { beforeCalentaGuide, beforeCalentaManifestEntry, beforeCalentaManifestMirror } from "./fixtures/calenta-legacy-source-safety.mjs";
import { beforeAvantaRegistry, beforeAvantaGuide, beforeAvantaManifestEntry, beforeAvantaManifestMirror } from "./fixtures/avanta-overview-source-safety.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import {createHash} from "node:crypto";
import {readFile} from "node:fs/promises";
import {faultGuides as liveFaultGuides,getFaultGuide as liveGetFaultGuide} from "../content/fault-guides.mjs";
import {pageRegistry as livePageRegistry,getPageDefinition as liveGetPageDefinition} from "../content/site-content.mjs";
import {buildPageMetadata,buildSitemapEntries} from "../libs/seo-data.mjs";
import {filterFaultCatalogs,getFaultDisplayStateNotice} from "../libs/fault-search.mjs";
import {renderFaultGuide as liveRenderFaultGuide} from "./helpers/fault-guide-runtime.mjs";
import {viessmannFacts as f,beforeViessmannGuide,beforeViessmannRegistry,beforeViessmannMetadata,beforeViessmannHtml} from "./fixtures/viessmann-overview-source-safety.mjs";
const guide=getFaultGuide("viessmann"),catalog=guide.catalogs[0];
const hash=v=>createHash("sha256").update(typeof v==="string"?v:JSON.stringify(v)).digest("hex");
const row=code=>catalog.codes.find(r=>r.code===code);
const matches=(query,model="all")=>filterFaultCatalogs(guide.catalogs,query,model).flatMap(c=>c.codes.map(r=>r.code));

test("Viessmann consumer scope distinguishes one71row overview from appliancefit and installer measures",()=>{
  assert.equal(catalog.scope,f.scope);assert.equal(guide.modelWarning,f.warning);assert.equal(catalog.sourcePages,f.pages);
  assert.equal(catalog.sourceUrl,f.url);assert.equal(catalog.sourceLabel,f.label);
  assert.match(catalog.scope,/222-W, 222-F en 333-F.*niet per toestel/);assert.match(guide.modelWarning,/uitsluitend voor bevoegde vakmensen/);
});
test("all71 visible Viessmann meanings actions and source locators follow independent primary reading",()=>{
  assert.equal(guide.catalogs.length,1);assert.equal(guide.codeEntryCount,71);assert.deepEqual(catalog.codes.map(r=>r.code),f.groupIdentifiers);
  for(const c of f.rowChanges){for(const [k,v]of Object.entries(c.after))assert.equal(row(c.beforeCode)[k],v,`${c.beforeCode}/${k}`);assert.equal(row(c.beforeCode).searchTerms,f.groupIdentifiers.find(code=>code===c.beforeCode));}
  assert.equal(f.rowChanges.filter(c=>c.before.meaning!==c.after.meaning).length,24);
});
test("A4 high pressure and C5 pumpcommunication never recommend filling or bleeding",()=>{
  assert.equal(row("A4").userAction,f.actions.A4);assert.match(row("A4").userAction,/niet bijvullen of aftappen/);
  assert.equal(row("C5").userAction,f.actions.C5);assert.match(row("C5").userAction,/bewijst geen te lage waterdruk.*vul niet bij/);
  for(const code of ["A4","C5"])assert.doesNotMatch(row(code).userAction,/volg alleen de vul- of ontluchtingsinstructie|6 bar|slang aansluiten/);
});
test("overview reset gas flue and electrical measures stay professional-only for all71 cards",()=>{
  for(const r of catalog.codes){assert.match(r.userAction,/artikel- of fabricagenummer/);assert.match(r.userAction,/vakman|professioneel/);assert.doesNotMatch(r.userAction,/reset alleen wanneer|toets R betätigen|sluit de gastoevoer|Schakel het toestel uit/);}
  for(const code of ["E5","EB","F8","F2","B0"])assert.equal(row(code).userAction,f.actions.common);
});
test("source48 repetition58 ambiguous cause and F2 sensor wording do not invent diagnoses",()=>{
  assert.match(row("48").meaning,/kortsluiting.*net als bij 40.*geen onderbreking/);
  assert.match(row("58").meaning,/geen warm water.*oorzaakcel stelt geen sensordefect vast/);assert.doesNotMatch(row("58").meaning,/uitgevallen door de boilertemperatuursensor/);
  assert.equal(row("F2").meaning,f.meaningChanges.F2);assert.doesNotMatch(row("F2").meaning,/temperatuurbeveiliging/);
  assert.match(row("B7").meaning,/oorzaakcel stelt niet vast/);
});
test("Viessmann literal uppercase and punctuation searches preserve all71 exact keys without modelfit guesses",()=>{
  for(const model of ["all",f.id]){
    for(const [i,code]of f.groupIdentifiers.entries()){assert.deepEqual(matches(f.literalCodes[i],model),[code]);assert.deepEqual(matches(` ${code.toLowerCase().split("").join(" : ")} `,model),[code]);assert.equal(getFaultDisplayStateNotice(guide.catalogs,code),null);}
    for(const query of ["UNKNOWN60","ZZ99","Vitodens 100-W","Vitodens 200-W"])assert.deepEqual(matches(query,model),[]);
    assert.deepEqual(matches("",model),f.groupIdentifiers);assert.deepEqual(matches("  ",model),f.groupIdentifiers);
  }
  assert.deepEqual(matches("F2","unknown-model"),[]);
});
test("Viessmann metadata uses genuine12October date and only restores its accepted registry leaves",()=>{
  const p=getPageDefinition("/foutcodes/viessmann"),m=buildPageMetadata(p);
  assert.equal(p.lastModified,"2026-10-12");assert.equal(m.description,f.description);assert.equal(m.openGraph.description,f.description);assert.equal(m.twitter.description,f.description);
  assert.equal(m.alternates.canonical,"https://www.abservice24.be/foutcodes/viessmann");assert.equal(m.robots.index,true);
  assert.equal(buildSitemapEntries(pageRegistry).find(e=>e.url===m.alternates.canonical).lastModified,"2026-10-12");
  assert.equal(hash(beforeViessmannMetadata(m,"viessmann")),f.preservation.metadata);assert.equal(hash(pageRegistry.map(beforeAtagManualsRegistry).map(beforeGb172Registry).map(beforeAvantaRegistry).map(beforeViessmannRegistry)),f.preservation.allRegistry);
});
test("all71 SSR cards plus whole13 guides restore the genuine accepted6b128bc leaves",async()=>{
  const html=await renderFaultGuide("viessmann");assert.equal((html.match(/class="fault-code-card"/g)||[]).length,71);assert.match(html,/\/contact\?dienst=Herstelling\+verwarming#aanvraagformulier/);
  assert.equal(hash(beforeViessmannHtml(html,"viessmann")),f.preservation.html);assert.equal(hash(beforeViessmannGuide(guide)),f.preservation.guide);assert.equal(hash(beforeViessmannGuide(guide).codes),f.preservation.codes);
  assert.equal(hash(faultGuides.map(beforeAtagManualsGuide).map(beforeGb172Guide).filter(g=>g.slug!=="viessmann").map(beforeCalentaGuide).map(beforeAvantaGuide)),f.preservation.otherTwelveGuides);assert.equal(hash(faultGuides.map(beforeAtagManualsGuide).map(beforeGb172Guide).map(beforeCalentaGuide).map(beforeAvantaGuide).map(beforeViessmannGuide)),f.preservation.allGuides);
});
test("Viessmann manifest pins one originalHTML71literalrows without appliance or revision inventions",async()=>{
  const m=beforeGb172Manifest(beforeAtagManualsManifest(beforeTzerraManifest(JSON.parse(await readFile(new URL("../docs/seo/fault-code-model-coverage.json",import.meta.url),"utf8")))));const e=m.entries.find(e=>e.id===f.id),s=m.snapshots.find(s=>s.id==="viessmann-overview-html");
  assert.equal(e.modelScope,f.scope);assert.equal(e.sourcePages,f.pages);assert.equal(e.language,"de-DE");assert.equal(e.sourceServiceMarket,"Duitsland");assert.equal(e.literalTableRowCount,71);assert.deepEqual(e.literalCodes,f.literalCodes);
  assert.deepEqual(e.mentionedModels,["Vitodens 200-W","Vitodens 300-W","Vitodens 222-W","Vitodens 222-F","Vitodens 333-F"]);assert.equal(e.mainControlCount,22);assert.equal(e.documentControlCount,357);
  assert.equal(e.articlePublishedAt,"2024-05-30T14:21:20.867Z");assert.equal(e.articleModifiedAt,"2026-09-14T08:57:39.675Z");
  for(const k of ["models","revision","issueDate","market","articleNumbers","firmwareCompatibility","currentBelgianVariantCompatibility","newestEdition","boilerDestinationMarket"])assert.equal(e[k],null,k);
  assert.equal(s?.sha256,f.sha256);assert.equal(s?.bytes,f.bytes);for(const k of ["pageCount","expectedSha256","hashMatchesPriorRecord"])assert.equal(s?.[k],null);
  assert.equal(hash(m.entries.filter(e=>e.id!==f.id).map(beforeCalentaManifestEntry).map(beforeAvantaManifestEntry)),f.preservation.otherEntries);assert.equal(hash(m.guides.filter(g=>g.slug!=="viessmann").map(beforeCalentaManifestMirror).map(beforeAvantaManifestMirror)),f.preservation.otherMirrors);assert.equal(hash(m.snapshots.filter(s=>!["remeha-calenta-legacy-pdf","viessmann-overview-html","remeha-avanta-overview-html","remeha-avanta-pagination-html"].includes(s.id))),f.preservation.oldSnapshots);
});
