import { beforeFaucetRegistry } from "./fixtures/faucet-context-history.mjs";
import { beforeFaqRecognitionRegistry } from "./fixtures/faq-recognition-history.mjs";
import { beforeSanitaryReferralRegistry } from "./fixtures/sanitary-referral-history.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {createHash} from "node:crypto";
import {getFaultGuide as liveGetFaultGuide,faultGuides as liveFaultGuides} from "../content/fault-guides.mjs";
import {getPageDefinition as liveGetPageDefinition,pageRegistry as livePageRegistry} from "../content/site-content.mjs";
import {buildPageMetadata as liveBuildPageMetadata,buildSitemapEntries} from "../libs/seo-data.mjs";
import {filterFaultCatalogs} from "../libs/fault-search.mjs";
import {renderFaultGuide as liveRenderFaultGuide} from "./helpers/fault-guide-runtime.mjs";
import {getCitedSources} from "../libs/cited-sources.mjs";
import {beforeQuintaGuide,beforeQuintaRegistry,beforeQuintaMetadata,beforeQuintaHtml,beforeQuintaManifest} from "./fixtures/quinta-ace-history.mjs";
const faultGuides=liveFaultGuides.map(beforeQuintaGuide);
const getFaultGuide=slug=>beforeQuintaGuide(liveGetFaultGuide(slug));
const pageRegistry=livePageRegistry.map(beforeQuintaRegistry);
const getPageDefinition=path=>beforeQuintaRegistry(liveGetPageDefinition(path));
const buildPageMetadata=p=>beforeQuintaMetadata(liveBuildPageMetadata(p),p.path==="/foutcodes/remeha"?"remeha":"");
const renderFaultGuide=async slug=>beforeQuintaHtml(await liveRenderFaultGuide(slug),slug);

const f=JSON.parse(await readFile(new URL("./fixtures/tzerra-ace-matic-source-facts.json",import.meta.url),"utf8"));
const guide=getFaultGuide("remeha");
const hash=v=>createHash("sha256").update(typeof v==="string"?v:JSON.stringify(v)).digest("hex");
const candidate=id=>{const c=guide.catalogs.find(c=>c.id===id);assert.ok(c,"missing independently scoped Tzerra source "+id);return c;};
const search=(q,id)=>filterFaultCatalogs(guide.catalogs,q,id).flatMap(c=>c.codes);
const esc=v=>v.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#x27;");

// Break: cross-model reuse changes a literal code, condition, class or locator.
test("Tzerra CU-GH16 exposes exactly18A33H46E source-local meanings classes and page pairs",()=>{
 assert.equal(guide.catalogs.length,16);assert.equal(guide.codeEntryCount,756);
 for(const expected of f.catalogs){const c=candidate(expected.id);
  assert.deepEqual(c.codes.map(r=>r.code),expected.rows.map(r=>r.code));
  for(const row of expected.rows){const actual=c.codes.find(r=>r.code===row.code);assert.equal(actual.meaning,row.meaning,row.code);assert.equal(actual.sourceClass,row.sourceClass,row.code);assert.equal(actual.sourcePage,row.sourcePage,row.code);}
 }
});

// Break: suffix truncation, alias widening or generic room-unit254 diagnoses a row.
test("all97 complete Tzerra identifiers resolve with punctuation without suffix or generic254 aliases",()=>{
 for(const c of f.catalogs){candidate(c.id);
  for(const r of c.rows)for(const query of [r.code," "+r.code.toLowerCase().split("").join(" : ")+" "])assert.deepEqual(search(query,c.id).map(x=>x.code),[r.code],query);
  assert.equal(search("",c.id).length,c.rows.length);
  for(const query of ["254","250","H03","E04","H3.54","E4.250","A02.06*","FILL","UNKNOWN83","0"+c.rows[0].code])assert.deepEqual(search(query,c.id),[],query);
 }
 assert.deepEqual(search("H03.254",f.catalogs[1].id).map(r=>r.code),["H03.254"]);
 assert.deepEqual(search("H03.54",f.catalogs[1].id).map(r=>r.code),["H03.54"]);
 assert.deepEqual(search("E04.250",f.catalogs[2].id).map(r=>r.code),["E04.250"]);
 assert.deepEqual(search("E04.50",f.catalogs[2].id).map(r=>r.code),["E04.50"]);
 assert.deepEqual(search("H01.09",f.catalogs[1].id),[]);
 assert.deepEqual(search("E99.99",f.catalogs[2].id),[]);
 assert.deepEqual(search("A02.06","unknown-model"),[]);
});

// Break: professional columns or heuristic gas/pressure actions become DIY.
test("every Tzerra row has an explicit source-bounded consumer action without professional repair",()=>{
 for(const c of f.catalogs){const actual=candidate(c.id);for(const row of c.rows)assert.equal(actual.codes.find(r=>r.code===row.code).userAction,f.actions[row.action],row.code);}
 const h=f.catalogs[1].id,e=f.catalogs[2].id;
 assert.match(search("H02.00",h)[0].userAction,/geen verzoek om een nieuwe reset.*geen instellingen.*netspanning niet/);
 assert.match(search("H01.00",h)[0].userAction,/automatisch opgelost.*bewijst niet.*extra reset/);
 assert.match(search("H02.70",h)[0].userAction,/SCB-09.*X9.*bewijst niet.*aanwezig/);
 assert.match(search("E04.29",e)[0].userAction,/geen verdere resets of spanningsonderbreking/);
 for(const code of ["E00.40","E00.41","E04.07","E01.17"])assert.equal(search(code,e)[0].userAction,f.actions.observe);
 for(const code of ["E02.32","E02.39"])assert.match(search(code,e)[0].userAction,/geen universeel vuldoel.*vul niet bij.*tap niet af/);
});

// Break: table-specific ambiguities and observed states are replaced by guesses.
test("Tzerra sensor phases tank options settings memory and ambiguous timing remain distinct",()=>{
 const a=f.catalogs[0].id,h=f.catalogs[1].id,e=f.catalogs[2].id;
 assert.match(search("A02.76",a)[0].meaning,/gereserveerd.*niet.*geheugendefect/);
 assert.match(search("A05.95",a)[0].meaning,/oplossingscel.*leeg/);
 assert.match(search("E00.04",e)[0].meaning,/inschakeling of ontsteking.*opstartcontrole/);
 assert.match(search("E00.06",e)[0].meaning,/tijdens ketelbedrijf/);
 for(const code of ["E00.16","E00.17"])assert.match(search(code,e)[0].meaning,/warmwaterboiler.*werkelijke boilerconfiguratie/);
 assert.match(search("E02.15",e)[0].meaning,/minimumtijd.*CSU.*time-out.*niet als maximumtijd/);
 assert.match(search("E04.07",e)[0].meaning,/aanvoertemperaturen.*niet.*aanvoer en retour/);
 assert.match(search("H01.21",h)[0].meaning,/sanitair-warmwaterbedrijf/);
 assert.match(search("H20.40",h)[0].meaning,/ontbreekt.*bewijst niet.*verkeerd gastype/);
});

test("Tzerra catalogs and guide bind only four BE-Lux cover models pairedJune2024books and actualCU-GH16",()=>{
 for(const expected of f.catalogs){const c=candidate(expected.id);for(const key of ["title","scope","sourceLabel","sourceUrl","sourcePages"])assert.equal(c[key],expected[key]);
  assert.match(c.scope,/28c, 28c G31, 35c en 25s.*België en Luxemburg.*CU-GH16/);
  assert.match(c.scope,/7875188-01-20062024.*7875187-01-20062024/);
  assert.match(c.scope,/Niet voor legacy Tzerra, Tzerra Ace/);
 }
 assert.equal(guide.modelWarning,f.warning);assert.match(guide.modelWarning,/OpenTherm.*generiek 254.*niet een veronderstelde alias/);
});

test("Tzerra broadens only existing Remeha metadata social description canonical and true change date",()=>{
 const p=getPageDefinition(f.page.path),m=buildPageMetadata(p);assert.deepEqual(p,f.page);
 assert.equal(m.title,f.page.title);assert.equal(m.description,f.page.description);assert.equal(m.openGraph.description,f.page.description);assert.equal(m.twitter.description,f.page.description);
 assert.equal(m.alternates.canonical,"https://www.abservice24.be/foutcodes/remeha");assert.equal(m.robots.index,true);
 assert.equal(buildSitemapEntries(pageRegistry.map(beforeFaucetRegistry).map(beforeFaqRecognitionRegistry)).find(e=>e.url===m.alternates.canonical).lastModified,"2026-10-12");
});

test("real Remeha SSR renders756 cards in16 source sections with exact97 meanings locators and enquiry anchor",async()=>{
 const html=await renderFaultGuide("remeha");assert.equal((html.match(/class="fault-code-card"/g)||[]).length,756);assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
 for(const c of f.catalogs){const section=html.match(new RegExp('<section class="fault-group" aria-labelledby="'+c.id+'-title">[\\s\\S]*?</section>'))?.[0];assert.ok(section,c.id);assert.equal((section.match(/class="fault-code-card"/g)||[]).length,c.rows.length);for(const row of c.rows){assert.ok(section.includes("<code>"+row.code+"</code>"),row.code);assert.ok(section.includes(esc(row.meaning)),row.code);assert.ok(section.includes(esc(row.sourcePage)),row.code);assert.ok(section.includes(esc(f.actions[row.action])),row.code);}}
 assert.match(html,/\/contact\?dienst=Herstelling\+verwarming#aanvraagformulier/);assert.match(html,/gasgeur/);
});

// Break: a locator cites the user book but its actual source context links only
// the installer book (even though the unused companionURL exists in data).
test("each real Tzerra SSR source context links both actual books with distinct installer and user labels",async()=>{
 const html=await renderFaultGuide("remeha");
 for(const c of f.catalogs){const section=html.match(new RegExp('<section class="fault-group" aria-labelledby="'+c.id+'-title">[\\s\\S]*?</section>'))?.[0];assert.ok(section,c.id);
  assert.ok(section.includes('href="'+f.sources.installer.URL+'"'),c.id+" installer source link");
  assert.ok(section.includes('href="'+f.sources.user.URL+'"'),c.id+" actual companion source link");
  assert.ok(section.includes("Gebruikersbron:"));
  assert.ok(section.includes("Remeha België — Tzerra Ace-Matic gebruikershandleiding 7875187-01-20062024"));
  assert.ok(section.includes("gebruiker tabel "+c.userTable+", p. "));
  assert.ok(section.includes("Remeha België — Tzerra Ace-Matic installatie- en servicehandleiding 7875188-01-20062024"));
 }
});

test("new visible Tzerra companion links enter source monitoring under their actual URL and group labels",()=>{
 const sources=getCitedSources();
 for(const c of f.catalogs)assert.ok(sources.some(s=>s.href===f.sources.user.URL&&s.label===`Remeha: ${c.title} — gebruikersbron`),c.id);
});

test("Tzerra manifest retains both measured originals and explicit unknown article serial firmware newest fit",async()=>{
 const m=beforeQuintaManifest(JSON.parse(await readFile(new URL("../docs/seo/fault-code-model-coverage.json",import.meta.url),"utf8")));assert.deepEqual(m.counts,f.expectedManifestCounts);assert.equal(m.snapshots.length,24);
 for(const c of f.catalogs){const e=m.entries.find(e=>e.id===c.id);assert.ok(e,c.id);assert.equal(e.modelScope,c.scope);assert.equal(e.sourcePages,c.sourcePages);assert.deepEqual(e.models,f.models);assert.deepEqual(e.market,f.market);assert.equal(e.controller,"CU-GH16");assert.equal(e.explanationRowCount,c.rows.length);assert.equal(e.primarySnapshot,"remeha-tzerra-ace-matic-installer-pdf");assert.equal(e.companionSnapshot,"remeha-tzerra-ace-matic-user-pdf");for(const field of ["articleNumbers","modelArticlePairs","firmwareCompatibility","controllerVariantCoverage","customerDeviceCompatibility","newestEdition"])assert.equal(e[field],null,field);}
 for(const kind of ["installer","user"]){const s=m.snapshots.find(s=>s.id==="remeha-tzerra-ace-matic-"+kind+"-pdf");assert.ok(s,kind);assert.equal(s.sha256,f.sources[kind].sha256);assert.equal(s.byteLength,f.sources[kind].byteLength);assert.equal(s.pageCount,f.sources[kind].physicalPageCount);assert.equal(s.expectedSha256,null);assert.equal(s.hashMatchesPriorRecord,null);}
});

test("original13 Remeha catalogs and all other12guides and registry entries retain actual pre-edit bytes",()=>{
 const ids=new Set(f.catalogs.map(c=>c.id));assert.equal(hash(guide.catalogs.filter(c=>!ids.has(c.id))),f.before.preservation.remehaCatalogs);
 assert.equal(hash(faultGuides.filter(g=>g.slug!=="remeha")),f.before.preservation.otherGuides);
 assert.equal(hash(pageRegistry.map(beforeFaucetRegistry).map(beforeFaqRecognitionRegistry).map(beforeSanitaryReferralRegistry).filter(p=>p.path!==f.page.path)),f.before.preservation.otherRegistry);
});
