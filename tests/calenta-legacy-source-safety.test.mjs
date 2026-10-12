import test from "node:test";
import assert from "node:assert/strict";
import {createHash} from "node:crypto";
import {readFile} from "node:fs/promises";
import {faultGuides,getFaultGuide} from "../content/fault-guides.mjs";
import {pageRegistry} from "../content/site-content.mjs";
import {buildPageMetadata,buildSitemapEntries} from "../libs/seo-data.mjs";
import {filterFaultCatalogs} from "../libs/fault-search.mjs";
import {renderFaultGuide} from "./helpers/fault-guide-runtime.mjs";
import {calentaFacts as f,expectedCalentaCatalogs,beforeCalentaGuide,beforeCalentaHtml,beforeCalentaManifestEntry,beforeCalentaManifestMirror} from "./fixtures/calenta-legacy-source-safety.mjs";
const hash=v=>createHash("sha256").update(typeof v==="string"?v:JSON.stringify(v)).digest("hex");
const guide=getFaultGuide("remeha"),selected=guide.catalogs.filter(c=>f.ids.includes(c.id));

// Break: loss of literal E/Su identity, invented missing codes, unsupported STB
// diagnosis or silent PSU/PCU resolution reaches the real customer catalog.
test("historical Calenta retains23E19Su identities and three source-bounded meanings",()=>{
  assert.deepEqual(selected.map(c=>c.codes.map(r=>r.code)),[f.ePages.map(([c])=>c),f.suPages.map(([c])=>c)]);
  assert.deepEqual(selected.flatMap(c=>c.codes.map(r=>r.meaning)),expectedCalentaCatalogs.flatMap(c=>c.codes.map(r=>r.meaning)));
  assert.equal(selected.flatMap(c=>c.codes).filter(r=>r.meaning!==f.before.catalogs.flatMap(c=>c.codes).find(b=>b.code===r.code).meaning).length,3);
});

// Break: consumer sees an installer reset/fill/shutdown procedure inferred by
// the generic action helper rather than source-bound local observation advice.
test("all42 Calenta cards use observation advice and configuration-qualified components",()=>{
  for(const c of selected)for(const row of c.codes){
    const want=expectedCalentaCatalogs.find(x=>x.id===c.id).codes.find(r=>r.code===row.code);
    assert.equal(row.userAction,want.userAction,row.code);
    assert.equal(row.searchTerms,f.before.catalogs.find(x=>x.id===c.id).codes.find(r=>r.code===row.code).searchTerms);
    assert.doesNotMatch(row.userAction,/reset alleen|bijvullen|vul- of|schakel het toestel uit|vervang|toegangscode|p17/i);
    if(f.optionalCodes.includes(row.code))assert.match(row.userAction,/alleen bij aanwezigheid/);
  }
});

test("Su20 is ordinary no-action context and Su16–20 memory absence is explicit",()=>{
  const su=selected[1],normal=su.codes.find(r=>r.code==="Su:20");
  assert.equal(normal.userAction,f.normalAction);
  assert.match(normal.userAction,/geen actie nodig/);assert.match(normal.userAction,/op zichzelf geen defect/);
  for(const row of su.codes)assert.equal(row.userAction.includes(f.memoryNote),f.memoryCodes.includes(row.code),row.code);
  assert.match(su.codes.find(r=>r.code==="Su:18").meaning,/PSU.*PCU.*geen eenduidige printdiagnose/);
});

test("each Calenta card resolves to its actual section and printed versus PDF page",()=>{
  for(const c of selected)for(const row of c.codes){
    const want=expectedCalentaCatalogs.find(x=>x.id===c.id).codes.find(r=>r.code===row.code);
    assert.equal(row.sourcePage,want.sourcePage,row.code);
    assert.equal(c.sourceUrl,f.url);assert.equal(c.sourcePages,f.before.catalogs.find(b=>b.id===c.id).sourcePages);
  }
});

test("Calenta consumer scope separates historical models professional tables and St9 from E",()=>{
  assert.equal(selected[0].scope,f.scopeE);assert.equal(selected[1].scope,f.scopeSu);assert.equal(guide.modelWarning,f.warning);
  assert.equal(hash(guide.catalogs.filter(c=>!f.ids.includes(c.id))),f.before.preservation.remeha.otherElevenCatalogs);
  assert.equal(hash(faultGuides.filter(g=>g.slug!=="remeha")),f.before.preservation.remeha.otherTwelveGuides);
});

test("real Calenta searches preserve exact family and E00 Su0 AvantaE0 distinctions",()=>{
  for(const [index,pages]of [f.ePages,f.suPages].entries())for(const [code]of pages){
    for(const query of [code,` ${code.toLowerCase().split("").join(" : ")} `]){
      const groups=filterFaultCatalogs(guide.catalogs,query,f.ids[index]);
      assert.deepEqual(groups.map(g=>g.id),[f.ids[index]]);assert.deepEqual(groups[0].codes.map(r=>r.code),[code]);
    }
  }
  assert.deepEqual(filterFaultCatalogs(guide.catalogs,"Su:0",f.ids[0]),[]);
  assert.deepEqual(filterFaultCatalogs(guide.catalogs,"E:00",f.ids[1]),[]);
  assert.deepEqual(filterFaultCatalogs(guide.catalogs,"E:0",f.ids[0]),[]);
  assert.deepEqual(filterFaultCatalogs(guide.catalogs,"E:13",f.ids[0]),[]);
  assert.deepEqual(filterFaultCatalogs(guide.catalogs,"Su:12",f.ids[1]),[]);
  assert.deepEqual(filterFaultCatalogs(guide.catalogs,"E:0","remeha-avanta")[0].codes.map(r=>r.code),["E:0"]);
});

test("real SSR exposes source-bounded Calenta cards while all other leaves and metadata survive",async()=>{
  const html=await renderFaultGuide("remeha");
  assert.equal((html.match(/class="fault-code-card"/g)||[]).length,659);
  for(const phrase of ["geen actie nodig","geen eenduidige printdiagnose","niet in het storingsgeheugen opgeslagen","PDF-pagina 85"])assert.ok(html.includes(phrase));
  assert.match(html,/\/contact\?dienst=Herstelling\+verwarming#aanvraagformulier/);assert.match(html,/gasgeur/i);
  assert.equal(hash(beforeCalentaHtml(html,"remeha")),f.before.preservation.remeha.html);
  assert.equal(hash(beforeCalentaGuide(guide)),f.before.preservation.remeha.guide);
  assert.equal(hash(faultGuides.map(beforeCalentaGuide)),f.before.preservation.allGuides);
  assert.equal(hash(pageRegistry),f.before.preservation.allRegistry);
  const p=pageRegistry.find(p=>p.path==="/foutcodes/remeha"),meta=buildPageMetadata(p);
  assert.equal(hash(meta),f.before.preservation.remeha.metadata);assert.equal(p.lastModified,"2026-10-12");
  assert.equal(buildSitemapEntries(pageRegistry).find(e=>e.url==="https://www.abservice24.be/foutcodes/remeha").lastModified,"2026-10-12");
});

test("legacy manifest joins both tables to one actual PDF without inventing issue or device fit",async()=>{
  const m=JSON.parse(await readFile(new URL("../docs/seo/fault-code-model-coverage.json",import.meta.url),"utf8"));
  const snapshot=m.snapshots.find(s=>s.id===f.snapshotId);
  assert.equal(snapshot?.sha256,f.sha256);assert.equal(snapshot?.byteLength,f.bytes);assert.equal(snapshot?.pageCount,f.pages);
  for(const [index,id]of f.ids.entries()){
    const e=m.entries.find(e=>e.id===id);assert.equal(e.primarySnapshot,f.snapshotId);assert.equal(e.language,"nl-BE");
    assert.equal(e.revision,"117061-08");assert.equal(e.observedFooter,"080715 - 117061-08");
    assert.equal(e.audienceRestriction,"installation and service by recognized installers");
    assert.equal(e.modelScope,index===0?f.scopeE:f.scopeSu);assert.equal(e.explanationRowCount,index===0?23:19);
    assert.deepEqual(e.literalCodes,(index===0?f.ePages:f.suPages).map(([c])=>c));
    for(const k of ["issueDate","articleNumbers","firmwareCompatibility","currentBelgianVariantCompatibility","newestEdition"])assert.equal(e[k],null,k);
  }
  assert.equal(m.guides.find(g=>g.slug==="remeha").modelWarning,f.warning);
  assert.equal(hash(m.entries.filter(e=>!f.ids.includes(e.id))),f.before.preservation.remeha.otherEntries);
  assert.equal(hash(m.guides.filter(g=>g.slug!=="remeha")),f.before.preservation.remeha.otherMirrors);
  assert.equal(hash(m.snapshots.filter(s=>s.id!==f.snapshotId)),f.before.preservation.oldSnapshots);
  const restored={...m,entries:m.entries.map(beforeCalentaManifestEntry),guides:m.guides.map(beforeCalentaManifestMirror),snapshots:m.snapshots.filter(s=>s.id!==f.snapshotId)};
  assert.equal(hash(restored),f.before.preservation.manifest);
});

// The source explicitly permits a communication message for an expected but
// missing SCU (printed p.83 and p.100), not only an installed/present board.
test("SCU communication messages remain applicable when the expected board is absent",()=>{
  const note="Deze melding kan ook optreden als een verwachte SCU-print ontbreekt. De code bewijst niet dat de uitbreiding aanwezig is.";
  for(const code of ["E:38","Su:13"]){
    const r=selected.flatMap(c=>c.codes).find(r=>r.code===code);
    assert.ok(r.userAction.endsWith(note),code);
    assert.doesNotMatch(r.userAction,/geldt alleen bij aanwezigheid|autodetect|bedrading controleren|print vervangen/i);
  }
});

test("manifest inverse preserves untouched and unknown leaves so drift fails the original hash",async()=>{
  const m=JSON.parse(await readFile(new URL("../docs/seo/fault-code-model-coverage.json",import.meta.url),"utf8"));
  for(const id of f.ids){
    const original=m.entries.find(e=>e.id===id);
    for(const [key,value]of Object.entries({models:["UNSUPPORTED"],documentNumber:"UNSUPPORTED",market:["UNSUPPORTED"],component:"UNSUPPORTED",tableIds:["UNSUPPORTED"],unexpectedLeaf:{unsupported:true}})){
      const changed={...original,[key]:value},restored=beforeCalentaManifestEntry(changed);
      assert.deepEqual(restored[key],value,`${id}: ${key} must not be masked`);
      const beforeEntry=f.before.entries.find(e=>e.id===id);
      assert.notEqual(hash(restored),hash(beforeEntry),`${id}: ${key} must break preservation`);
    }
  }
});
