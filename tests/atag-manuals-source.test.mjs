import { beforeSanitaryReferralRegistry } from "./fixtures/sanitary-referral-history.mjs";
// Reconstruct only independently tested Task83 before earlier named history inverses.
import {beforeTzerraGuide,beforeTzerraRegistry,beforeTzerraHtml,beforeTzerraManifest} from "./fixtures/tzerra-ace-matic-history.mjs";
const faultGuides=liveFaultGuides.map(beforeTzerraGuide);
const getFaultGuide=slug=>beforeTzerraGuide(liveGetFaultGuide(slug));
const pageRegistry=livePageRegistry.map(beforeTzerraRegistry);
const getPageDefinition=path=>beforeTzerraRegistry(liveGetPageDefinition(path));
const renderFaultGuide=async slug=>beforeTzerraHtml(await liveRenderFaultGuide(slug),slug);
import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {createHash} from "node:crypto";
import {faultGuides as liveFaultGuides,getFaultGuide as liveGetFaultGuide} from "../content/fault-guides.mjs";
import {pageRegistry as livePageRegistry,getPageDefinition as liveGetPageDefinition} from "../content/site-content.mjs";
import {buildPageMetadata,buildSitemapEntries} from "../libs/seo-data.mjs";
import {filterFaultCatalogs} from "../libs/fault-search.mjs";
import {renderFaultGuide as liveRenderFaultGuide} from "./helpers/fault-guide-runtime.mjs";
const f=JSON.parse(await readFile(new URL("./fixtures/atag-manuals-source-facts.json",import.meta.url),"utf8"));
const guide=getFaultGuide("atag");
const hash=v=>createHash("sha256").update(typeof v==="string"?v:JSON.stringify(v)).digest("hex");
const candidate=id=>{const c=guide.catalogs.find(c=>c.id===id);assert.ok(c,"missing separately scoped source catalog "+id);return c;};
const search=(q,id)=>filterFaultCatalogs(guide.catalogs,q,id).flatMap(c=>c.codes);
const escape=v=>v.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#x27;");

// Break: omitted, conflated, mistranscribed or artificially classified model rows.
test("two ATAG manuals expose exact17/19 source rows with model-local meanings and page locators",()=>{
 assert.equal(guide.catalogs.length,3);assert.equal(guide.codeEntryCount,50);
 for(const expected of f.catalogs){
  const c=candidate(expected.id);assert.deepEqual(c.codes.map(r=>r.code),expected.rows.map(r=>r.code));
  for(const row of expected.rows){const actual=c.codes.find(r=>r.code===row.code);assert.equal(actual.meaning,row.meaning,row.code);assert.equal(actual.sourceClass,null,row.code);assert.equal(actual.sourcePage,row.sourcePage,row.code);}
 }
 assert.notEqual(search("110",f.catalogs[0].id)[0].meaning,search("110",f.catalogs[1].id)[0].meaning);
 assert.match(search("201",f.catalogs[0].id)[0].meaning,/Combi/);
 assert.match(search("203",f.catalogs[0].id)[0].meaning,/Solo/);
});

// Break: a range/prefix heuristic merges another family or invents an absent entry.
test("all36 literal identifiers resolve in only their selected source with prefixes and negative controls",()=>{
 for(const c of f.catalogs){
  candidate(c.id);
  for(const row of c.rows)for(const query of [row.code," "+row.code.toLowerCase().split("").join(" : ")+" "])assert.deepEqual(search(query,c.id).map(r=>r.code),[row.code],query);
  assert.equal(search("",c.id).length,c.rows.length);assert.equal(search(" ",c.id).length,c.rows.length);
  for(const query of ["UNKNOWN80","C105","C118","BL67","FILL","9999","0"+c.rows[0].code,"140*","118*"])assert.deepEqual(search(query,c.id),[],query);
 }
 for(const query of ["105","118","142","180","181"])assert.deepEqual(search(query,f.catalogs[0].id),[],query);
 for(const query of ["101","102","1P4","1P9","140","201","203","304","501","612"])assert.deepEqual(search(query,f.catalogs[1].id),[],query);
 assert.deepEqual(search("105","unknown-model"),[]);
 assert.deepEqual(search("C105","atag-officieel-overzicht").map(r=>r.code),["C105"]);
 assert.deepEqual(search("105","all").map(r=>r.code),["105","105"]);
});

// Break: a shared heuristic exports professional pressure, pump or reset remedies.
test("every manual row uses an explicit safe action and distinguishes professional footnotes and reset limits",()=>{
 for(const c of f.catalogs)for(const row of c.rows)assert.equal(candidate(c.id).codes.find(r=>r.code===row.code).userAction,f.actions[row.action],row.code);
 for(const [id,code]of [[f.catalogs[0].id,"140"],[f.catalogs[1].id,"118"]])assert.match(search(code,id)[0].userAction,/pomp-ingreep.*alleen.*installateur.*geen gebruikershandeling.*werk niet aan pomp/);
 assert.match(search("304",f.catalogs[0].id)[0].userAction,/niet opnieuw te resetten.*netspanning.*onderliggende oorzaak/);
 for(const code of ["108","1P4","109"])assert.match(search(code,f.catalogs[0].id)[0].userAction,/geen universele vuldoelen.*vul niet bij.*tap niet af/);
 assert.doesNotMatch(search("61",f.catalogs[1].id)[0].meaning,/reset alleen mogelijk door spanningsonderbreking/);
});

// Break: program/nonfault states become diagnoses or differing pressure pages are unified.
test("i32EC program and nonfault meanings remain distinct and118 preserves the two page thresholds",()=>{
 const id=f.catalogs[1].id;candidate(id);
 assert.match(search("105",id)[0].meaning,/programma.*zeven minuten.*bedrijfstoestand.*geen vastgestelde storing/);
 for(const code of ["180","181"]){assert.match(search(code,id)[0].meaning,/Geen storing/);assert.match(search(code,id)[0].userAction,/bewijst niet.*probleemloos.*geen servicetest/);}
 assert.match(search("118",id)[0].meaning,/0,7 bar.*Gebruikerspagina 13.*1 bar.*niet tot een vuldoel/);
 assert.doesNotMatch(search("118",id)[0].userAction,/vul.*1.*bar|slang aansluiten|schroevendraaier|pomp.*deblokkeren/);
});

// Break: conformity names/PIN or discovery host silently expand actual device fit.
test("ATAG scope binds exact historical six iZone technical models and onlyi32EC Belgian destination",()=>{
 for(const expected of f.catalogs){const c=candidate(expected.id);assert.equal(c.title,expected.title);assert.equal(c.scope,expected.scope);assert.equal(c.sourceLabel,expected.sourceLabel);assert.equal(c.sourceUrl,expected.source.sourceURL);assert.equal(c.sourcePages,expected.sourcePages);assert.match(c.scope,/artikelnummers, serials, firmware, controllerdekking en nieuwste editie zijn niet vastgesteld/);}
 assert.equal(guide.modelWarning,f.warning);
 for(const name of ["i24SZ","i35SZ","i20CZ","i22ECZ","i30CZ","i32ECZ"])assert.ok(candidate(f.catalogs[0].id).scope.includes(name));
 assert.match(candidate(f.catalogs[0].id).scope,/17 veelvoorkomende.*geen volledige/);
 assert.match(candidate(f.catalogs[1].id).scope,/uitsluitend voor i32EC.*alleen dit model.*bestemming B.*conformiteitsverklaring.*geen aanvullende/);
});

test("ATAG metadata broadens only the existing canonical and true12October sitemap date",()=>{
 const p=getPageDefinition(f.page.path),m=buildPageMetadata(p);assert.deepEqual(p,f.page);
 assert.equal(m.title,f.page.title);assert.equal(m.description,f.page.description);assert.equal(m.openGraph.description,f.page.description);assert.equal(m.twitter.description,f.page.description);
 assert.equal(m.alternates.canonical,"https://www.abservice24.be/foutcodes/atag");assert.equal(m.robots.index,true);
 assert.equal(buildSitemapEntries(pageRegistry).find(e=>e.url===m.alternates.canonical).lastModified,"2026-10-12");
});

// Real server rendered modules, not fixture-generated markup or mock cards.
test("real ATAG SSR exposes50 cards separate source sections operating states and unchanged enquiry anchor",async()=>{
 const html=await renderFaultGuide("atag");assert.equal((html.match(/class="fault-code-card"/g)||[]).length,50);assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
 for(const c of f.catalogs){const section=html.match(new RegExp('<section class="fault-group" aria-labelledby="'+c.id+'-title">[\\s\\S]*?</section>'))?.[0];assert.ok(section,c.id);assert.equal((section.match(/class="fault-code-card"/g)||[]).length,c.rows.length);for(const row of c.rows){assert.ok(section.includes("<code>"+row.code+"</code>"),row.code);assert.ok(section.includes(escape(row.meaning)),row.code);assert.ok(section.includes(escape(row.sourcePage)),row.code);}}
 assert.match(html,/\/contact\?dienst=Herstelling\+verwarming#aanvraagformulier/);assert.match(html,/gasgeur/);
});

test("ATAG model manifest pins two actual originals and explicitly unknown current compatibility",async()=>{
 const m=beforeTzerraManifest(JSON.parse(await readFile(new URL("../docs/seo/fault-code-model-coverage.json",import.meta.url),"utf8")));assert.deepEqual(m.counts,f.expectedManifestCounts);assert.equal(m.snapshots.length,22);
 for(const c of f.catalogs){const e=m.entries.find(e=>e.id===c.id),s=m.snapshots.find(s=>s.id===c.snapshotId);assert.ok(e,c.id);assert.ok(s,c.snapshotId);assert.equal(e.modelScope,c.scope);assert.equal(e.sourcePages,c.sourcePages);assert.deepEqual(e.models,c.source.technicalModels);assert.deepEqual(e.market,["België"]);assert.equal(e.boilerDestinationMarket,"B");assert.equal(e.primarySnapshot,c.snapshotId);assert.equal(e.explanationRowCount,c.rows.length);assert.equal(e.observedIssue,c.source.printedIdentifierAndIssue.split(" / ")[1]);for(const field of ["revision","articleNumbers","modelArticlePairs","firmwareCompatibility","controllerVariantCoverage","customerDeviceCompatibility","newestEdition"])assert.equal(e[field],null,field);assert.equal(s.sha256,c.source.sha256);assert.equal(s.byteLength,c.source.byteLength);assert.equal(s.pageCount,c.source.physicalPageCount);assert.equal(s.expectedSha256,null);assert.equal(s.hashMatchesPriorRecord,null);}
});

test("original ATAG overview and other12guide/registry values retain actual pre-edit captures",()=>{
 assert.equal(hash(guide.catalogs[0]),f.before.preservation.atagCatalog);
 assert.equal(hash(faultGuides.filter(g=>g.slug!=="atag")),f.before.preservation.otherGuides);
 assert.equal(hash(pageRegistry.map(beforeSanitaryReferralRegistry).filter(p=>p.path!==f.page.path)),f.before.preservation.otherRegistry);
});
