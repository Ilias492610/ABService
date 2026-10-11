import { beforeAtagGuide, beforeAtagRegistry } from "./fixtures/atag-overview-source-safety.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { faultGuides, getFaultGuide } from "../content/fault-guides.mjs";
import { pageRegistry, getPageDefinition } from "../content/site-content.mjs";
import { buildPageMetadata, buildSitemapEntries } from "../libs/seo-data.mjs";
import { filterFaultCatalogs, getFaultDisplayStateNotice } from "../libs/fault-search.mjs";
import { renderFaultGuide } from "./helpers/fault-guide-runtime.mjs";
import { ithoFacts as f, beforeIthoGuide, beforeIthoRegistry, beforeIthoMetadata, beforeIthoHtml } from "./fixtures/itho-base-cube-source-safety.mjs";

const guide = getFaultGuide("itho-daalderop"), catalog = guide.catalogs[0];
const hash = value => createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");
const row = code => catalog.codes.find(r => r.code === code);

test("Itho source scope establishes three NL models and explicitly excludes HP COOL Cube", () => {
  assert.equal(catalog.scope, f.scope); assert.equal(guide.modelWarning, f.warning);
  assert.equal(catalog.sourceLabel, f.label); assert.equal(guide.sourceLabel, f.label);
  assert.equal(catalog.sourceUrl, f.url); assert.equal(catalog.sourcePages, f.pages);
  assert.match(catalog.scope, /30 diagnostische vermeldingen/); assert.match(catalog.scope, /HP \(COOL\) Cube/);
  assert.match(guide.modelWarning, /imprintdatum.*geen afzonderlijk.*revisie of uitgiftedatum/);
});

test("exact26 keys retain3warnings10blockings13faults and exclude ordinary/component states", () => {
  assert.deepEqual(catalog.codes.map(r => r.code), f.groupIdentifiers); assert.equal(guide.codeEntryCount, 26);
  assert.equal(catalog.codes.filter(r => r.code[0] === "W").length, 3);
  assert.equal(catalog.codes.filter(r => r.code[0] === "B").length, 10);
  assert.equal(catalog.codes.filter(r => r.code[0] === "E").length, 13);
  for (const code of f.groupIdentifiers) {
    for (const query of [code, ` ${code[0].toLowerCase()} : ${code.slice(1)} `]) {
      assert.deepEqual(filterFaultCatalogs(guide.catalogs, query, f.id).flatMap(c => c.codes.map(r => r.code)), [code]);
    }
  }
  for (const code of ["Stand-by","ECO","WARM WATER UIT","Continu groen","W11","B02","E01","UNKNOWN58"]) {
    assert.deepEqual(filterFaultCatalogs(guide.catalogs, code, f.id), [], code);
  }
  assert.equal(filterFaultCatalogs(guide.catalogs, "")[0].codes.length, 26);
});

test("all26 independent local actions and printed row pages plus8 meaning refinements match", () => {
  assert.equal(f.rowChanges.length, 26); assert.equal(f.rowChanges.filter(c => Object.hasOwn(c.after,"meaning")).length, 8);
  for (const c of f.rowChanges) for (const [key,value] of Object.entries(c.after)) assert.equal(row(c.beforeCode)[key], value, `${c.beforeCode}/${key}`);
  assert.match(row("B00").meaning, /Sensor open.*118 °C.*138 °C/);
  assert.match(row("B01").meaning, /Sensor kortgesloten.*-10 °C.*rookgas lager dan 10 °C.*zonder minteken/);
  assert.match(row("B25").meaning, /bedrijf 0,5 bar.*opstarten 1 bar.*geblokkeerd/);
  assert.match(row("E21").meaning, /schakelt.*uit.*105 °C/);
});

test("ordinary Base Cube states return sourced context instead of incidental prose faults, without suppressing other catalogs", () => {
  const states = ["Stand-by","Starten","Verwarmen Warm water","Verwarmen CV","Stoppen","Antipendel","Nadraaien Warm water","Pompen CV","Vorstbeveiliging","ECO","ECO COMFORT","WARM WATER UIT"];
  for (const state of states) {
    assert.deepEqual(filterFaultCatalogs(guide.catalogs,state,f.id),[]);
    const notice = getFaultDisplayStateNotice(guide.catalogs,state,f.id);
    assert.equal(notice?.title,"Bedrijfstoestand, geen W/B/E-code");
    assert.equal(notice?.sourceUrl,f.url); assert.equal(notice?.sourceLabel,f.label);
    assert.equal(notice?.sourcePage,"§ 7.2.1, p. 79");
    assert.match(notice?.text,/normale.*bedrijfstoestand.*geen waarschuwing, blokkering of storing/);
    assert.match(notice?.text,/uitsluitend.*drie.*NL.*niet.*HP \(COOL\) Cube/);
    assert.equal(getFaultDisplayStateNotice(guide.catalogs,state,"unknown-model"),null);
  }
  const other = getFaultGuide("bosch").catalogs;
  assert.equal(getFaultDisplayStateNotice(other,"ECO"),null);
  assert.deepEqual(filterFaultCatalogs([...guide.catalogs,...other],"ECO").filter(c=>c.id!==f.id),filterFaultCatalogs(other,"ECO"));
  for (const query of ["sensor","waterdruk","E35",""]) {
    assert.equal(getFaultDisplayStateNotice(guide.catalogs,query),null);
    assert.ok(filterFaultCatalogs(guide.catalogs,query).flatMap(c=>c.codes).length>0);
  }
});

test("W continues, B automatically resumes, E locks and reset contexts never become powercycling", () => {
  for (const r of catalog.codes) {
    if (r.code[0] === "W") assert.match(r.userAction, /W-waarschuwing.*in bedrijf.*functie.*uitgeschakeld of genegeerd/);
    if (r.code[0] === "B") { assert.match(r.userAction, /B-blokkering.*hervat.*verdwijnt/); assert.doesNotMatch(r.userAction, /reset alleen wanneer/); }
    if (r.code[0] === "E") assert.match(r.userAction, /E-storing vergrendelend.*RESET-toets.*niet met een spanningsonderbreking.*niet tot extra pogingen/);
    assert.doesNotMatch(r.userAction, /draai de stekker|stekker omkeren|vervang de sensor|vervang de regelunit/);
  }
  assert.match(row("B12").userAction, /enige minuten zonder opnieuw.*RESET.*geen verdere gebruikershandeling/);
  assert.match(row("B12").userAction, /Onderbreek niet de netspanning/);
  assert.match(guide.modelWarning, /p\. 80.*15 seconden.*p\. 82.*vijf minuten.*ander diagnoseverloop.*Combineer.*niet/);
});

test("highpressure and flow are distinct from confirmed lowpressure, sensor variants stay professional", () => {
  assert.match(row("W10").userAction, /Vul het toestel niet bij en tap niet zelf water af/);
  assert.doesNotMatch(row("W10").userAction, /vul- of ontluchtingsinstructie/);
  assert.match(row("E16").userAction, /bewijst geen lage waterdruk.*zichtbare drukweergave.*radiatorkranen.*Vul niet bij uitsluitend/);
  for (const code of ["B00","B01","B05","B10","B22","E30","E33"]) {
    assert.match(row(code).userAction, /werk niet aan sensoren, bekabeling, printplaat of netspanning/);
    assert.doesNotMatch(row(code).userAction, /Schakel het toestel uit/);
  }
  assert.match(row("B25").userAction, /lage displaywaarde alleen bewijst niet.*bevestigde lage druk.*niet uit te schakelen/);
  for (const code of ["W31","E00","E22"]) {
    assert.match(row(code).userAction, /rookgasgeur.*CO-melding.*verlaat.*112/);
    assert.match(row(code).userAction, /zonneboiler-naverwarmer.*niet zomaar uit/);
  }
});

test("substantive Itho metadata uses realdate and preserves exact genuine registry and metadata leaves", () => {
  const page = getPageDefinition("/foutcodes/itho-daalderop"), meta = buildPageMetadata(page);
  assert.equal(meta.description, f.description); assert.equal(meta.openGraph.description, f.description); assert.equal(meta.twitter.description, f.description);
  assert.equal(page.lastModified, "2026-10-11"); assert.equal(meta.alternates.canonical, "https://www.abservice24.be/foutcodes/itho-daalderop");
  assert.equal(meta.robots.index, true); assert.equal(buildSitemapEntries(pageRegistry).find(e => e.url === meta.alternates.canonical).lastModified,"2026-10-11");
  assert.equal(hash(beforeIthoMetadata(meta,"itho-daalderop")),f.preservation.metadata);
  assert.equal(hash(pageRegistry.map(beforeAtagRegistry).map(beforeIthoRegistry)),f.preservation.allRegistry);
});

test("all26 SSR cards and all13 guide leaves restore exact genuine c7b44be capture", async () => {
  const html = await renderFaultGuide("itho-daalderop");
  assert.equal((html.match(/class="fault-code-card"/g)||[]).length,26);
  for (const v of [f.scope,f.warning,f.label]) assert.ok(html.includes(v));
  assert.match(html,/\/contact\?dienst=Herstelling\+verwarming#aanvraagformulier/);
  assert.equal(hash(beforeIthoHtml(html,"itho-daalderop")),f.preservation.html);
  assert.equal(hash(beforeIthoGuide(beforeAtagGuide(guide))),f.preservation.guide); assert.equal(hash(beforeIthoGuide(beforeAtagGuide(guide)).codes),f.preservation.codes);
  assert.equal(hash(faultGuides.filter(g=>g.slug!=="itho-daalderop").map(beforeAtagGuide)),f.preservation.otherTwelveGuides);
  assert.equal(hash(faultGuides.map(beforeAtagGuide).map(beforeIthoGuide)),f.preservation.allGuides);
});

test("Itho manifest records original document ID,26keys30entries and explicit devicefit unknowns", async () => {
  const m = JSON.parse(await readFile(new URL("../docs/seo/fault-code-model-coverage.json",import.meta.url),"utf8"));
  const e = m.entries.find(e=>e.id===f.id), s=m.snapshots.find(s=>s.id==="itho-base-cube-pdf");
  assert.equal(e.modelScope,f.scope); assert.equal(e.sourceLabel,f.label); assert.equal(e.sourcePages,f.pages);
  assert.deepEqual(e.models,f.models); assert.equal(e.market,"NL"); assert.equal(e.language,"nl");
  assert.equal(e.documentNumber,f.document); assert.equal(e.imprintLiteral,f.imprint); assert.equal(e.imprintDateObserved,f.imprintDate);
  for(const k of ["revision","issueDate","articleNumbers","firmwareCompatibility","currentBelgianVariantCompatibility","newestEdition"]) assert.equal(e[k],null,k);
  assert.equal(e.literalDistinctCodeCount,26); assert.equal(e.literalDiagnosticEntryCount,30);
  assert.deepEqual(e.sensorVariantCounts,{B00:3,B01:3}); assert.equal(e.normalStateRowCount,9);
  assert.equal(s.sha256,f.sha256); assert.equal(s.pageCount,f.pageCount); assert.equal(s.bytes,f.bytes);
  assert.equal(s.expectedSha256,null); assert.equal(s.hashMatchesPriorRecord,null);
});
