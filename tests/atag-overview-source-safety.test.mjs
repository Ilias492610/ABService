import { beforeAvantaRegistry, beforeAvantaGuide, beforeAvantaManifestEntry, beforeAvantaManifestMirror } from "./fixtures/avanta-overview-source-safety.mjs";
import { beforeViessmannGuide, beforeViessmannRegistry, beforeViessmannManifestEntry, beforeViessmannManifestMirror } from "./fixtures/viessmann-overview-source-safety.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import {createHash} from "node:crypto";
import {readFile} from "node:fs/promises";
import {faultGuides,getFaultGuide} from "../content/fault-guides.mjs";
import {pageRegistry,getPageDefinition} from "../content/site-content.mjs";
import {buildPageMetadata,buildSitemapEntries} from "../libs/seo-data.mjs";
import {filterFaultCatalogs,getFaultDisplayStateNotice} from "../libs/fault-search.mjs";
import {renderFaultGuide} from "./helpers/fault-guide-runtime.mjs";
import {atagFacts as f,beforeAtagGuide,beforeAtagRegistry,beforeAtagMetadata,beforeAtagHtml} from "./fixtures/atag-overview-source-safety.mjs";
const guide=getFaultGuide("atag"),catalog=guide.catalogs[0];
const hash=v=>createHash("sha256").update(typeof v==="string"?v:JSON.stringify(v)).digest("hex");
const matches=(query,model="all")=>filterFaultCatalogs(guide.catalogs,query,model).flatMap(c=>c.codes.map(r=>r.code));
const row=code=>catalog.codes.find(r=>r.code===code);

test("ATAG scope bounds14 source rubrics, overlapping literal models and unknown devicefit",()=>{
  assert.equal(catalog.scope,f.scope);assert.equal(guide.modelWarning,f.warning);
  assert.equal(catalog.sourceLabel,f.label);assert.equal(catalog.sourceUrl,f.url);assert.equal(catalog.sourcePages,f.pages);
  assert.match(f.scope,/drie automatische.*elf andere/);assert.match(f.warning,/C105.*niet dezelfde melding als 105/);
});
test("all14 meanings actions and exact ordinal headings follow independent primary inputs",()=>{
  assert.equal(guide.catalogs.length,1);assert.deepEqual(catalog.codes.map(r=>r.code),f.groupIdentifiers);assert.equal(guide.codeEntryCount,14);
  for(const c of f.rowChanges){for(const [k,v]of Object.entries(c.after))assert.equal(row(c.beforeCode)[k],v,`${c.beforeCode}/${k}`);assert.equal(row(c.beforeCode).searchTerms,c.beforeCode);}
  assert.equal(f.allModels.length,20);assert.equal(f.modelsBySection.flat().length,107);
  assert.equal(f.modelsBySection[0].includes("i28C"),false);assert.equal(f.modelsBySection[0].includes("A244EC"),false);
});
test("programs retain three rows without forced reset or generic fault classification",()=>{
  for(const code of ["C105","BL67","Systeem ontluchten actief"]){assert.match(row(code).meaning,/programmawaarneming.*geen vastgestelde defectdiagnose/);assert.match(row(code).userAction,/zeven minuten.*Forceer geen reset of spanningsonderbreking/);assert.equal(getFaultDisplayStateNotice(guide.catalogs,code),null);}
  assert.doesNotMatch(row("105").meaning,/programmawaarneming/);
});
test("high low and unresolved pressure never become universal fill drain or numeric remedy",()=>{
  for(const code of ["C117","BL85"]){assert.match(row(code).userAction,/Vul niet bij en tap niet zelf water af/);assert.doesNotMatch(row(code).userAction,/vul- of ontluchtingsinstructie/);}
  for(const code of ["C118","FILL","108"])assert.match(row(code).userAction,/niet bij uitsluitend.*bevestigde lage druk.*exacte toestel.*geen universele drukwaarde/);
  assert.match(row("1P4").meaning,/te lage.*te hoge.*tegenstrijdige/);assert.match(row("1P4").userAction,/Kies geen vul- of aftaphandeling.*professioneel vaststellen/);
  for(const r of catalog.codes)assert.doesNotMatch(r.userAction,/\d[,.]\d.*bar|slang aansluiten|gaskraan openzetten|aantal keer.*resetten/i);
});
test("gas and radiator advice do not invent noflame or flow diagnoses or repeated resets",()=>{
  for(const code of ["C133","E02","105"]){assert.match(row(code).meaning,/geen specifieke oorzaak of vlamdiagnose/);assert.match(row(code).userAction,/gasgeur.*geen schakelaars.*112.*handleiding toestaat.*niet herhaaldelijk.*werk niet aan gaskraan/);assert.doesNotMatch(row(code).meaning,/geen correcte vlamvorming vastgesteld|brander vormt geen vlam/);}
  for(const code of ["C151","612"]){assert.match(row(code).meaning,/geen specifieke warmteafgifte- of doorstromingsdiagnose/);assert.match(row(code).userAction,/zichtbare radiatorkranen.*bewijst geen lage waterdruk.*vul niet bij uitsluitend/);}
});
test("exact and punctuated keys retain C105 versus105 and source-spelled model text search",()=>{
  for(const model of ["all",f.id]){
    for(const code of f.groupIdentifiers){assert.deepEqual(matches(code,model),[code]);const punct=code==="Systeem ontluchten actief"?" systeem ONTLUCHTEN actief ":` ${code.toLowerCase().split("").join(" : ")} `;assert.deepEqual(matches(punct,model),[code]);}
    assert.deepEqual(matches("A2442EC",model),f.groupIdentifiers.slice(0,5));assert.deepEqual(matches("i28ECZ",model),f.groupIdentifiers.filter((_,i)=>i<5||[8,10,11,12,13].includes(i)));assert.deepEqual(matches("Q25C",model),["BL67","BL85","FILL","E02"]);
    for(const name of f.allModels)for(const query of [name,` ${name.toLowerCase()} `])assert.deepEqual(matches(query,model),f.rowChanges.filter(r=>r.models.includes(name)).map(r=>r.beforeCode),query);
    for(const query of ["A244EC","i28C","UNKNOWN59"])assert.deepEqual(matches(query,model),[]);
    assert.equal(matches("",model).length,14);assert.equal(matches("  ",model).length,14);
  }
  assert.deepEqual(matches("C105","unknown-model"),[]);
  const other=getFaultGuide("bosch").catalogs;
  for(const query of [...f.allModels,"C105","105","sensor","waterdruk"])assert.deepEqual(filterFaultCatalogs([...guide.catalogs,...other],query).filter(c=>c.id!==f.id),filterFaultCatalogs(other,query),query);
});
test("ATAG metadata uses substantive realdate and restores exact genuine prior leaves",()=>{
  const page=getPageDefinition("/foutcodes/atag"),meta=buildPageMetadata(page);
  assert.equal(meta.description,f.description);assert.equal(meta.openGraph.description,f.description);assert.equal(meta.twitter.description,f.description);
  assert.equal(page.lastModified,"2026-10-11");assert.equal(meta.alternates.canonical,"https://www.abservice24.be/foutcodes/atag");assert.equal(meta.robots.index,true);
  assert.equal(buildSitemapEntries(pageRegistry).find(e=>e.url===meta.alternates.canonical).lastModified,"2026-10-11");
  assert.equal(hash(beforeAtagMetadata(meta,"atag")),f.preservation.metadata);assert.equal(hash(pageRegistry.map(beforeAvantaRegistry).map(beforeViessmannRegistry).map(beforeAtagRegistry)),f.preservation.allRegistry);
});
test("all14 SSR cards and entire13-guide preservation restore genuine64c1302 capture",async()=>{
  const html=await renderFaultGuide("atag");assert.equal((html.match(/class="fault-code-card"/g)||[]).length,14);
  assert.match(html,/\/contact\?dienst=Herstelling\+verwarming#aanvraagformulier/);
  assert.equal(hash(beforeAtagHtml(html,"atag")),f.preservation.html);assert.equal(hash(beforeAtagGuide(beforeViessmannGuide(guide))),f.preservation.guide);assert.equal(hash(beforeAtagGuide(beforeViessmannGuide(guide)).codes),f.preservation.codes);
  assert.equal(hash(faultGuides.filter(g=>g.slug!=="atag").map(beforeAvantaGuide).map(beforeViessmannGuide)),f.preservation.otherTwelveGuides);assert.equal(hash(faultGuides.map(beforeAvantaGuide).map(beforeViessmannGuide).map(beforeAtagGuide)),f.preservation.allGuides);
});
test("ATAG manifest records one originalHTML and107 literal nonexclusive model associations",async()=>{
  const m=JSON.parse(await readFile(new URL("../docs/seo/fault-code-model-coverage.json",import.meta.url),"utf8"));
  const e=m.entries.find(e=>e.id===f.id),s=m.snapshots.find(s=>s.id==="atag-overview-html");
  assert.equal(e.modelScope,f.scope);assert.equal(e.sourcePages,f.pages);assert.equal(e.language,"nl");assert.equal(e.sourceServiceMarket,"Nederland");assert.equal(e.market,null);
  assert.deepEqual(e.models,f.allModels);assert.equal(e.literalSectionCount,14);assert.equal(e.automaticProgramSectionCount,3);assert.equal(e.literalModelAssociationCount,107);
  assert.deepEqual(e.sections,f.rowChanges.map((r,i)=>({code:r.beforeCode,heading:r.heading,ordinal:i+1,models:r.models,classification:[0,5,10].includes(i)?"automatic-program-observation":null})));
  for(const k of ["revision","issueDate","articleNumbers","firmwareCompatibility","currentBelgianVariantCompatibility","newestEdition","boilerDestinationMarket"])assert.equal(e[k],null,k);
  assert.equal(s?.sha256,f.sha256);assert.equal(s?.bytes,f.bytes);assert.equal(s?.pageCount,null);assert.equal(s?.expectedSha256,null);assert.equal(s?.hashMatchesPriorRecord,null);
  assert.equal(hash(m.entries.filter(e=>e.id!==f.id).map(beforeAvantaManifestEntry).map(beforeViessmannManifestEntry)),f.preservation.otherEntries);assert.equal(hash(m.guides.filter(g=>g.slug!=="atag").map(beforeAvantaManifestMirror).map(beforeViessmannManifestMirror)),f.preservation.otherMirrors);assert.equal(hash(m.snapshots.filter(s=>!["atag-overview-html","viessmann-overview-html","remeha-avanta-overview-html","remeha-avanta-pagination-html"].includes(s.id))),f.preservation.oldSnapshots);
});
