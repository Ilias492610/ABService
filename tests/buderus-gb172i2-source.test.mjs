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
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { faultGuides as liveFaultGuides, getFaultGuide as liveGetFaultGuide } from "../content/fault-guides.mjs";
import { pageRegistry as livePageRegistry, getPageDefinition as liveGetPageDefinition } from "../content/site-content.mjs";
import { filterFaultCatalogs } from "../libs/fault-search.mjs";
import { buildFaultCodeAliases } from "../libs/fault-code-aliases.mjs";
import { buildPageMetadata, buildSitemapEntries } from "../libs/seo-data.mjs";
import { renderFaultGuide as liveRenderFaultGuide } from "./helpers/fault-guide-runtime.mjs";
const f=JSON.parse(await readFile(new URL("./fixtures/buderus-gb172i2-source-facts.json",import.meta.url),"utf8"));
const guide=getFaultGuide("buderus"), candidate=()=>{const c=guide.catalogs.find(c=>c.id===f.id);assert.ok(c,"missing exact GB172i.2 catalog, not an alias for GB162");return c;};
const hash=v=>createHash("sha256").update(typeof v==="string"?v:JSON.stringify(v)).digest("hex");
const search=q=>filterFaultCatalogs(guide.catalogs,q,f.id).flatMap(c=>c.codes);

// Break: omitted/added/misclassified source codes reach the selected model table.
test("GB172i.2 exposes every69 source group with exact classes meanings and page locators",()=>{
 const c=candidate();assert.equal(c.codes.length,69);assert.equal(guide.codeEntryCount,121);
 assert.deepEqual(c.codes.map(r=>r.code),f.source.groups.map(([,code])=>code));
 for(const [page,code,kind,meaning] of f.source.groups){const r=c.codes.find(r=>r.code===code);assert.equal(r.meaning,meaning,code);assert.equal(r.sourceClass,kind,code);assert.equal(r.sourcePage,`Tabel 69, p. ${page}; klasse ${f.classLabels[String(kind)]}`,code);}
 assert.deepEqual(c.codes.filter(r=>r.sourceClass===null).map(r=>r.code),["1023","2969","2972"]);
 assert.equal(c.codes.find(r=>r.code==="1010").sourceClass,"O");assert.match(c.codes.find(r=>r.code==="1010").meaning,/geen communicatie.*EMS/i);
});

// Break: an interior range disappears or an invented nearby/model-class alias matches.
test("all97 numeric identifiers resolve only to their documented group and model",()=>{
 const c=candidate(),literal=c.codes.flatMap(r=>buildFaultCodeAliases(r.code).filter(a=>/^\d+$/.test(a)));
 assert.deepEqual(literal,f.source.expandedNumericIdentifiers);assert.equal(new Set(literal).size,97);
 for(const q of f.source.expandedNumericIdentifiers){const rows=search(q);assert.equal(rows.length,1,q);assert.ok(buildFaultCodeAliases(rows[0].code).includes(q));}
 for(const [query,expected] of [["243","242-263"],["262","242-263"],["2915","2914-2916"],["2926","2923-2927"],["2962","2961 / 2962"]])assert.equal(search(query)[0]?.code,expected,query);
 for(const q of ["24","241","264","2913","2917","2922","2929","2960","2964","2967","2982","0200","6A227","F.227","O1010","W1023","LoPr","GB172i","GB162"])assert.deepEqual(search(q),[],q);
 assert.equal(filterFaultCatalogs(guide.catalogs,"6A227","buderus-logamax-gb162-v2")[0]?.codes[0]?.code,"6A 227");
 assert.deepEqual(filterFaultCatalogs(guide.catalogs,"227","buderus-logamax-gb162-v2"),[]);
});

// Break: generic pressure/gas heuristics copy installer remedies into consumer cards.
test("GB172i.2 has explicit observation actions without reset fill wiring or gas procedures",()=>{
 const c=candidate();
 for(const r of c.codes){
  const expected=["2980","2981"].includes(r.code)?f.actions.lock:r.sourceClass==="O"&&r.code!=="1010"?f.actions.ordinary:r.sourceClass==="W"?f.actions.service:f.actions.general;
  assert.equal(r.userAction,expected,r.code);assert.doesNotMatch(r.userAction,/reset alleen|vul water|ontlucht de|controleer.*bekabeling|open.*gaskraan|schakel.*weer in|22.*28|196\s*V/i);
 }
 assert.doesNotMatch(c.codes.find(r=>r.code==="1010").userAction,/geen defect|geen actie nodig/i);
 assert.match(c.codes.find(r=>r.code==="2968").meaning,/wordt bijgevuld.*geen bijvulinstructie/i);
 for(const q of ["2980","2981"])assert.match(search(q)[0].userAction,/alleen.*vakman.*servicedienst.*oorzaak.*installatietest ter plaatse.*geen herhaalde resets/i);
});

// Break: customers apply this factory table to another generation, gas variant or firmware.
test("GB172i.2 scope preserves four exact Belgian model article pairs and professional boundaries",()=>{
 const c=candidate();assert.equal(c.scope,f.scope);assert.equal(c.title,f.title);assert.equal(c.sourceLabel,f.label);assert.equal(c.sourceUrl,f.source.sourceURL);assert.equal(c.sourcePages,"Tabel 69, §10.1.2, p. 46–50");assert.equal(guide.modelWarning,f.warning);
 for(const [model,article] of f.source.modelArticlePairs)assert.ok(c.scope.includes(`${model} — ${article}`));
 assert.match(c.scope,/O is bedrijfsstatus, B blokkering, V vergrendeling en W servicedisplay/);
 assert.match(c.scope,/1010 is O.*EMS/);assert.match(c.scope,/1023, 2969 en 2972 leeg/);assert.match(c.scope,/firmware, controllerdekking en nieuwste editie zijn niet vastgesteld/);
});

test("Buderus metadata broadens only this existing route with a substantive12October date",()=>{
 const p=getPageDefinition("/foutcodes/buderus"),m=buildPageMetadata(p);
 assert.deepEqual(p,f.page);assert.equal(m.description,f.page.description);assert.equal(m.title,f.page.title);assert.equal(m.openGraph.description,f.page.description);assert.equal(m.twitter.description,f.page.description);
 assert.equal(m.alternates.canonical,"https://www.abservice24.be/foutcodes/buderus");assert.equal(m.robots.index,true);assert.equal(buildSitemapEntries(pageRegistry).find(e=>e.url===m.alternates.canonical).lastModified,"2026-10-12");
});

// Exercise the actual server-rendered client component, not a mock row list.
test("real Buderus SSR exposes121 cards with visible source classes scopes and unchanged contact anchors",async()=>{
 const html=await renderFaultGuide("buderus");assert.equal((html.match(/class="fault-code-card"/g)||[]).length,121);assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
 const section=html.match(/<section class="fault-group" aria-labelledby="buderus-logamax-gb172i2-title">[\s\S]*?<\/section>/)?.[0];assert.ok(section,"missing real new model section");assert.equal((section.match(/class="fault-code-card"/g)||[]).length,69);
 for(const [page,code,kind,meaning]of f.source.groups){assert.ok(section.includes(`<code>${code}</code>`),code);assert.ok(section.includes(meaning),code);assert.ok(section.includes(`Tabel 69, p. ${page}; klasse ${f.classLabels[String(kind)]}`),code);}
 assert.ok(section.includes("7736902479"));assert.ok(section.includes("geen herhaalde resets"));assert.match(html,/\/contact\?dienst=Herstelling\+verwarming#aanvraagformulier/);assert.match(html,/gasgeur/);
});

test("GB172i.2 model manifest binds actual source identity without invented revision or firmware",async()=>{
 const m=beforeAtagManualsManifest(beforeTzerraManifest(JSON.parse(await readFile(new URL("../docs/seo/fault-code-model-coverage.json",import.meta.url),"utf8")))),e=m.entries.find(e=>e.id===f.id),s=m.snapshots.find(s=>s.id===f.snapshotId);assert.ok(e,"missing source manifest entry");assert.ok(s,"missing pinned manufacturer original");
 assert.equal(e.explanationRowCount,69);assert.equal(e.literalNumericIdentifierCount,97);assert.deepEqual(e.modelArticlePairs,f.source.modelArticlePairs);assert.equal(e.documentNumber,"6721852651");assert.equal(e.observedIssue,"2026/06");assert.equal(e.issueDate,"2026-06");assert.equal(e.issueDatePrecision,"month");assert.equal(e.language,"nl");assert.deepEqual(e.market,["België"]);assert.deepEqual(e.tableIds,[69]);assert.equal(e.primarySnapshot,f.snapshotId);
 for(const field of ["revision","firmwareCompatibility","controllerVariantCoverage","customerDeviceCompatibility","newestEdition"])assert.equal(e[field],null,field);
 assert.equal(s.sha256,f.source.sha256);assert.equal(s.byteLength,11483647);assert.equal(s.pageCount,68);assert.equal(s.expectedSha256,null);assert.equal(s.hashMatchesPriorRecord,null);
 assert.deepEqual(m.counts,{guides:13,catalogAssignments:39,distinctCatalogs:33,displayedExplanationRows:1665,distinctCatalogExplanationRows:1423,distinctCatalogSourceURLs:19});assert.equal(m.snapshots.length,20);
});

// A named addition must not change any existing model, source table or other URL.
test("original GB162 catalog other12guides and other registry retain genuine pre-edit captures",()=>{
 assert.equal(hash(guide.catalogs[0]),f.before.preservation.gb162Catalog);assert.equal(hash(faultGuides.map(beforeAtagManualsGuide).filter(g=>g.slug!=="buderus")),f.before.preservation.otherGuides);assert.equal(hash(pageRegistry.map(beforeSanitaryReferralRegistry).map(beforeAtagManualsRegistry).filter(p=>p.path!=="/foutcodes/buderus")),f.before.preservation.otherRegistry);
});
