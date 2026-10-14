import { beforeSanitaryReferralRegistry } from "./fixtures/sanitary-referral-history.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {createHash} from "node:crypto";
import {getFaultGuide as liveGetFaultGuide,faultGuides as liveFaultGuides} from "../content/fault-guides.mjs";
import {getPageDefinition as liveGetPageDefinition,pageRegistry as livePageRegistry} from "../content/site-content.mjs";
import {buildPageMetadata as liveBuildPageMetadata,buildSitemapEntries} from "../libs/seo-data.mjs";
import {filterFaultCatalogs} from "../libs/fault-search.mjs";
import {getCitedSources} from "../libs/cited-sources.mjs";
import {renderFaultGuide as liveRenderFaultGuide} from "./helpers/fault-guide-runtime.mjs";
import {beforeCalentaAceGuide,beforeCalentaAceRegistry,beforeCalentaAceMetadata,beforeCalentaAceHtml,beforeCalentaAceManifest} from "./fixtures/calenta-ace-history.mjs";
const getFaultGuide=slug=>beforeCalentaAceGuide(liveGetFaultGuide(slug));
const faultGuides=liveFaultGuides.map(beforeCalentaAceGuide);
const getPageDefinition=path=>beforeCalentaAceRegistry(liveGetPageDefinition(path));
const pageRegistry=livePageRegistry.map(beforeCalentaAceRegistry);
const buildPageMetadata=p=>beforeCalentaAceMetadata(liveBuildPageMetadata(p),p.path==="/foutcodes/remeha"?"remeha":"");
const renderFaultGuide=async slug=>beforeCalentaAceHtml(await liveRenderFaultGuide(slug),slug);

// Frozen before product, derived from original source/inventory and root capture.
const f=JSON.parse(await readFile(new URL("./fixtures/quinta-ace-source-facts.json",import.meta.url),"utf8"));
const guide=getFaultGuide("remeha");
const candidate=id=>{const c=guide.catalogs.find(c=>c.id===id);assert.ok(c,"missing independently scoped Quinta source "+id);return c;};
const search=(q,id)=>filterFaultCatalogs(guide.catalogs,q,id).flatMap(c=>c.codes);
const hash=v=>createHash("sha256").update(typeof v==="string"?v:JSON.stringify(v)).digest("hex");
const esc=v=>v.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#x27;");

// Break: a class is missing, a range is inferred or another model meaning copied.
test("Quinta exposes14A21H25E literal rows in printed order with source-specific meanings and locators",()=>{
 for(const expected of f.catalogs){const c=candidate(expected.id);
  assert.deepEqual(c.codes.map(r=>r.code),expected.rows.map(r=>r.code));
  for(const row of expected.rows){const actual=c.codes.find(r=>r.code===row.code);
   for(const key of ["meaning","sourceClass","sourcePage"])assert.equal(actual[key],row[key],row.code+" "+key);
  }
 }
 assert.equal(guide.catalogs.length,19);assert.equal(guide.codeEntryCount,816);
});

// Break: code truncation/normalization blends models, or clearing loses rows.
test("all60 full Quinta identifiers resolve punctuation without unknown codes or cross-model blending",()=>{
 for(const c of f.catalogs){candidate(c.id);
  for(const row of c.rows)for(const query of [row.code,row.code.toLowerCase().split("").join(" : "),row.code.replaceAll("."," ")])assert.deepEqual(search(query,c.id).map(r=>r.code),[row.code],query);
  for(const query of ["254","UNKNOWN84","A99.99","H99.99","E99.99","H01","E04","0"+c.rows[0].code])assert.deepEqual(search(query,c.id),[],query);
  assert.equal(search("",c.id).length,c.rows.length);
 }
 assert.deepEqual(search("H01.00","unknown-model"),[]);
 assert.equal(search("", "all").length,816);
 for(const code of ["H01.00","H01.08","H02.38","H02.70","H03.17","E00.04","E00.06","E02.15"]){
  const fifth=code[0]==="H"?f.catalogs[1]:f.catalogs[2];
  const other=guide.catalogs.find(c=>c.id==="remeha-tzerra-ace-matic-cu-"+(code[0]==="H"?"temporary":"locking"));
  assert.notEqual(search(code,fifth.id)[0].meaning,search(code,other.id)[0].meaning,code);
 }
});

// Break: heuristic pressure/reset/technical remediation replaces safe observation.
test("each Quinta action reads an already visible code and hands continuing conditions to a professional",()=>{
 for(const expected of f.catalogs){const c=candidate(expected.id);for(const row of expected.rows){
  const actual=c.codes.find(r=>r.code===row.code);assert.equal(actual.userAction,row.userAction,row.code);
  assert.match(actual.userAction,/Lees de volledige zichtbare code/);assert.match(actual.userAction,/aanhoudende of terugkerende melding.*bevoegde installateur of leverancier/);
 }}
 const h=f.catalogs[1].id,e=f.catalogs[2].id;
 assert.match(search("H02.00",h)[0].userAction,/geen extra reset of stroomonderbreking/);
 assert.match(search("H03.17",h)[0].userAction,/onderbreek de controle niet en voer geen reset uit/);
 assert.match(search("E04.10",e)[0].userAction,/geen extra start.*niet naar vonk of vlam/);
});

// Break: private research/editorial instructions leak into customer guidance.
test("Quinta customer text directly addresses the reader without writer instructions or search-demand jargon",()=>{
 for(const c of f.catalogs){const actual=candidate(c.id);assert.doesNotMatch(actual.scope,/zoekvraag/);
  for(const row of actual.codes)assert.doesNotMatch(row.userAction,/voorstellen/);
 }
 assert.doesNotMatch(search("E02.15",f.catalogs[2].id)[0].meaning,/Tzerra-minimumtijd/);
});

// Break: unresolved source ambiguities are silently filled with plausible claims.
test("Quinta keeps source column tensions and absent thresholds visible",()=>{
 for(const c of f.catalogs)candidate(c.id);
 const a=f.catalogs[0].id,h=f.catalogs[1].id,e=f.catalogs[2].id;
 assert.match(search("H01.08",h)[0].meaning,/temperatuurstijging.*warmtewisselaar.*geen tijds- of stijgsnelheidseenheid/);
 assert.match(search("H02.38",h)[0].meaning,/waterhardheid.*streepje.*geen verdere oorzaak, hardheidswaarde/);
 assert.match(search("H03.17",h)[0].meaning,/controletoestand.*professionele herstart.*geen duurgrens/);
 assert.match(search("A02.69",a)[0].meaning,/demomodus.*niet een bewezen defect/);
 assert.match(search("A02.76",a)[0].meaning,/opslagruimte.*parameters.*geen bewering van een RAM-defect/);
 assert.match(search("E00.07",e)[0].meaning,/twee manieren.*retourtemperatuur.*oplossingskolom.*aanvoer en retour.*installateur/);
 assert.match(search("E01.04",e)[0].meaning,/vijf.*vlamverlies.*5x fout onbedoeld foutverlies opgetreden/);
 assert.match(search("E02.15",e)[0].meaning,/externe CSU.*niet vastgesteld.*geen minimale duur/);
 assert.match(search("E04.03",e)[0].meaning,/niet expliciet welk meetpunt/);
 assert.match(search("E04.07",e)[0].meaning,/aanvoersensor 1 en aanvoersensor 2.*niet om aanvoer tegenover retour/);
});

test("Quinta source context binds only45to115 BE models combined2019edition and printed software baseline",()=>{
 for(const expected of f.catalogs){const c=candidate(expected.id);for(const key of ["title","scope","sourceLabel","sourceUrl","sourcePages"])assert.equal(c[key],expected[key]);
  assert.match(c.scope,/45, 65, 90 en 115.*België.*CU-GH08/);
  assert.match(c.scope,/CU-GH08 software 1.4.*MK3 software 1.29.*SCB-10 software 0.5/);
  assert.match(c.scope,/SCB-10-uitbreiding hangt af van de installatie/);assert.match(c.scope,/Niet voor Quinta Ace 160/);
 }
 assert.equal(guide.modelWarning,f.warning);
});

test("Quinta broadens existing Remeha metadata while keeping canonical true date and route status",()=>{
 const p=getPageDefinition(f.page.path),m=buildPageMetadata(p);assert.deepEqual(p,f.page);
 for(const value of [m,m.openGraph,m.twitter]){assert.equal(value.title,f.page.title);assert.equal(value.description,f.page.description);}
 assert.equal(m.alternates.canonical,"https://www.abservice24.be/foutcodes/remeha");assert.equal(m.robots.index,true);
 assert.equal(buildSitemapEntries(pageRegistry).find(e=>e.url===m.alternates.canonical).lastModified,"2026-10-13");
});

test("real Remeha SSR renders816 cards with all60 Quinta meanings actions locators and actual source links",async()=>{
 const html=await renderFaultGuide("remeha");assert.equal((html.match(/class="fault-code-card"/g)||[]).length,816);assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
 for(const c of f.catalogs){const section=html.match(new RegExp('<section class="fault-group" aria-labelledby="'+c.id+'-title">[\\s\\S]*?</section>'))?.[0];assert.ok(section,c.id);
  assert.equal((section.match(/class="fault-code-card"/g)||[]).length,c.rows.length);
  assert.ok(section.includes('href="'+f.source.URL+'"'));
  for(const row of c.rows){assert.ok(section.includes("<code>"+row.code+"</code>"));for(const key of ["meaning","userAction","sourcePage"])assert.ok(section.includes(esc(row[key])),row.code+" "+key);}
 }
 assert.match(html,/\/contact\?dienst=Herstelling\+verwarming#aanvraagformulier/);assert.match(html,/gasgeur/);
 for(const c of f.catalogs)assert.ok(getCitedSources().some(s=>s.href===f.source.URL&&s.label===`Remeha: ${c.title}`));
});

test("Quinta manifest adds one measured combined original while article serial current fit remain unknown",async()=>{
 const m=beforeCalentaAceManifest(JSON.parse(await readFile(new URL("../docs/seo/fault-code-model-coverage.json",import.meta.url),"utf8")));assert.deepEqual(m.counts,f.expectedManifestCounts);assert.equal(m.snapshots.length,25);
 for(const c of f.catalogs){const entry=m.entries.find(e=>e.id===c.id);assert.ok(entry,c.id);
  assert.equal(entry.modelScope,c.scope);assert.equal(entry.sourcePages,c.sourcePages);assert.equal(entry.explanationRowCount,c.rows.length);
  assert.deepEqual(entry.models,f.source.models);assert.deepEqual(entry.market,f.source.market);assert.equal(entry.controller,"CU-GH08");assert.deepEqual(entry.sourceSoftwareBaseline,f.source.sourceSoftwareBaseline);
  assert.equal(entry.primarySnapshot,"remeha-quinta-ace-combined-pdf");assert.deepEqual(entry.tableIds,[c.table]);
  for(const field of ["articleNumbers","modelArticlePairs","serials","firmwareCompatibility","controllerVariantCoverage","customerDeviceCompatibility","newestEdition"])assert.equal(entry[field],null,field);
 }
 const s=m.snapshots.find(s=>s.id==="remeha-quinta-ace-combined-pdf");assert.ok(s);
 for(const key of ["sha256","byteLength","pageCount"])assert.equal(s[key],f.source[key]);assert.equal(s.url,f.source.URL);assert.equal(s.expectedSha256,null);assert.equal(s.hashMatchesPriorRecord,null);
});

test("all16 pre-Quinta Remeha catalogs and other12guides registry entries retain captured hashes",()=>{
 const ids=new Set(f.catalogs.map(c=>c.id));assert.equal(hash(guide.catalogs.filter(c=>!ids.has(c.id))),f.before.preservation.remehaCatalogs);
 assert.equal(hash(faultGuides.filter(g=>g.slug!=="remeha")),f.before.preservation.otherGuides);
 assert.equal(hash(pageRegistry.map(beforeSanitaryReferralRegistry).filter(p=>p.path!==f.page.path)),f.before.preservation.otherRegistry);
});
