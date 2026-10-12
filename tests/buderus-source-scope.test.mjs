import { beforeAvantaRegistry, beforeAvantaGuide } from "./fixtures/avanta-overview-source-safety.mjs";
import { beforeViessmannRegistry, beforeViessmannGuide } from "./fixtures/viessmann-overview-source-safety.mjs";
import { beforeAtagGuide, beforeAtagRegistry } from "./fixtures/atag-overview-source-safety.mjs";
import { beforeIthoGuide, beforeIthoRegistry } from "./fixtures/itho-base-cube-source-safety.mjs";
import { beforeFerroliRegistry, beforeFerroliGuide } from "./fixtures/ferroli-bluesense-source-safety.mjs";
import { beforeNefitGuide, beforeNefitRegistry } from "./fixtures/nefit-proline-source-safety.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { buderusCatalogs } from "../content/additional-fault-catalogs.mjs";
import { bulexCatalogs } from "../content/fault-catalogs.mjs";
import { faultGuides, getFaultGuide } from "../content/fault-guides.mjs";
import { pageRegistry, getPageDefinition } from "../content/site-content.mjs";
import { filterFaultCatalogs } from "../libs/fault-search.mjs";
import { buildFaultCodeAliases } from "../libs/fault-code-aliases.mjs";
import { buildPageMetadata, buildSitemapEntries } from "../libs/seo-data.mjs";
import { sourceFacts as facts } from "./fixtures/buderus-gb162-v2-source-facts.mjs";
import { beforeThemaABGuide } from "./fixtures/bulex-thema-condens-ab.mjs";
import { beforeBoschScopeGuide, beforeBoschScopeRegistry } from "./fixtures/bosch-junkers-source-boundaries.mjs";
import { beforeAcvGuide, beforeAcvRegistry } from "./fixtures/acv-prestige-source-safety.mjs";
import { beforeIntergasGuide, beforeIntergasRegistry } from "./fixtures/intergas-prestige-source-context.mjs";

const catalog = buderusCatalogs[0];
const search = (query) => filterFaultCatalogs(buderusCatalogs, query, catalog.id).flatMap(c => c.codes);
const row = (code) => catalog.codes.find(entry => entry.code === code);
const sorted = (values) => [...values].sort();

// Catches omitted locking faults, imported operating states, invented aliases,
// subcode loss and a falsely universal interpretation of the source table.
test("Buderus exposes 52 explanations for the selected 74 of 88 literal source rows", () => {
  const result = search("");
  const selected = facts.inventory.map(([code]) => code).filter(code => !facts.exclusions.includes(code));
  const actual = result.flatMap(entry => buildFaultCodeAliases(entry.code).filter(code => !code.includes("/") && !code.includes("-")));
  assert.equal(result.length, facts.selectedGroups);
  assert.equal(getFaultGuide("buderus").codeEntryCount, facts.selectedGroups);
  assert.equal(selected.length, facts.selectedCombinations);
  assert.equal(facts.inventory.length, 88);
  assert.deepEqual([33,34,35,36,37].map(page => facts.inventory.filter(([,p]) => p === page).length), [13,12,16,16,31]);
  assert.deepEqual(sorted(actual), sorted(selected));
  for (const code of selected) {
    for (const query of [code, code.replaceAll(" ", ""), ` ${code.replaceAll(" ", "  ")} `]) {
      assert.equal(search(query).length, 1, query);
      assert.ok(buildFaultCodeAliases(search(query)[0].code).includes(code), query);
    }
  }
});

test("ordinary, component-test and reset states stay outside Buderus fault search", () => {
  for (const code of facts.exclusions) {
    const result = search(code);
    assert.ok(result.every(entry => !buildFaultCodeAliases(entry.code).includes(code)), code);
    // Letter-only reset text follows ordinary prose search; it must not import
    // a reset code, but can match words within a documented fault description.
    if (!["HrE", "rE"].includes(code)) assert.deepEqual(result, [], code);
  }
  for (const code of ["OY 276", "H7", "HO7", "EI 242", "E1 246", "E1 256", "EH 254", "EF 250", "EP 263", "9L 239", "5C 0226"]) {
    assert.deepEqual(search(code), [], code);
  }
});

test("grouped cross-prefix, range and EL aliases retain distinct literal combinations", () => {
  for (const [group, expected] of facts.groupedAliases) {
    assert.deepEqual(buildFaultCodeAliases(row(group).code).filter(code => !code.includes("/")), expected);
    for (const code of expected) assert.equal(search(code)[0].code, group);
  }
  assert.notEqual(search("6C228")[0].meaning, search("6C306")[0].meaning);
  assert.match(search("6C228")[0].meaning, /voor.*branderstart/i);
  assert.match(search("6C306")[0].meaning, /na.*doven/i);
});

test("installation labels and visible scope disclose exact models, issue and excluded states", () => {
  assert.equal(catalog.sourceUrl, facts.url);
  assert.equal(catalog.sourcePages, facts.pages);
  assert.ok(catalog.codes.every(entry => entry.sourcePage === facts.pages));
  assert.match(catalog.title, /GB162-70\/85\/100 V2/);
  for (const text of [catalog.scope, catalog.sourceLabel, getFaultGuide("buderus").modelWarning]) {
    assert.match(text, /installatiehandleiding/i);
    assert.ok(text.includes(facts.document));
    assert.ok(text.includes(facts.issue));
    assert.match(text, /BE.*Nederland/i);
    assert.doesNotMatch(text, /nieuwste|bedieningshandleiding|volledige foutcodetabel/i);
  }
  for (const model of facts.models) assert.ok(catalog.scope.includes(model), model);
  assert.match(catalog.scope, /52.*74/);
  assert.match(catalog.scope, /bedrijf.*componenttest.*reset.*weggelaten/i);
  assert.match(getFaultGuide("buderus").modelWarning, /typeplaatje.*configuratie.*gebruikershandleiding/i);
});

test("blank-kind faults and mixed-kind EL meanings are retained without invented classification", () => {
  assert.deepEqual(["blocking", "locking", "both", "unmarked"].map(kind => facts.inventory.filter(([, ,k]) => k === kind).length), [10,58,1,19]);
  for (const code of ["2F 260", "2P 212", "2U 213", "8Y 232", "H07"]) {
    assert.equal(search(code).length, 1);
    assert.doesNotMatch(search(code)[0].meaning, /blokkerend|vergrendelend/i);
  }
  assert.match(catalog.scope, /2F 260.*2P 212.*2U 213.*8Y 232.*H07.*zonder.*classificatie/i);
  assert.equal(search("EL259")[0].meaning, search("EL290")[0].meaning);
  assert.doesNotMatch(search("EL290")[0].meaning, /blokkerend|vergrendelend/i);
});

test("Swiss flue sensor faults require the documented component and actual device verification", () => {
  for (const code of ["1U 317", "1Y 318"]) {
    assert.match(search(code)[0].meaning, /rookgastemperatuursensor.*Zwitserland.*aanwezig/i);
    assert.match(search(code)[0].userAction, /professioneel controleren/i);
  }
  assert.match(catalog.scope, /p\. 8.*Zwitserland.*component/i);
});

test("5C is a diagnostic session indication with professional help if persistent or unexpected", () => {
  const entry = search("5 C 226")[0];
  assert.ok(entry, "missing locking 5C 226");
  assert.match(entry.meaning, /diagnosetool.*aangesloten/i);
  assert.match(entry.meaning, /onverwacht.*blijft/i);
  assert.match(entry.meaning, /technisch beoordelen/i);
  assert.doesNotMatch(entry.meaning, /defect|test.*start|activeer/i);
  assert.match(entry.userAction, /mantel niet.*technische diagnose/i);
  assert.doesNotMatch(entry.userAction, /reset|aansluiten|vervang/i);
});

test("3F timing, failed sensor test, controller diagnosis and H07 output limits match the source", () => {
  assert.match(search("3F273")[0].meaning, /maximaal 2 minuten.*meer dan 24 uur.*veiligheidscontrole/i);
  assert.match(search("3F273")[0].meaning, /onverwacht.*blijft.*technisch/i);
  assert.doesNotMatch(search("3F273")[0].meaning, /defect/i);
  assert.match(search("4E278")[0].meaning, /sensortest.*mislukt/i);
  assert.doesNotMatch(search("4E278")[0].meaning, /automatisch/i);
  assert.match(search("7L280")[0].meaning, /branderautomaat.*defect/i);
  assert.match(search("H07")[0].meaning, /waterdruk.*verwarming.*warmwater/i);
});

test("all twelve controller and KIM groups give real electrical output with casing and wiring boundaries", () => {
  assert.equal(facts.electricalGroups.length, 12);
  for (const code of facts.electricalGroups) {
    const entry = search(code)[0];
    assert.equal(entry.userAction, row("4E 278").userAction, code);
    assert.match(entry.userAction, /mantel niet.*sensoren, bekabeling, printplaat of netspanning.*technische diagnose/i);
    assert.doesNotMatch(entry.userAction, /reset|gastoevoer|vul|ontlucht/i);
  }
});

test("true ignition and gas-valve faults retain gas guidance; pressure remains manual-bound", () => {
  for (const code of ["6A 227", "6C 228", "6C 306", "6L 229", "6P 269", "9L 234"]) {
    const entry = search(code)[0];
    assert.match(entry.userAction, /gasgeur.*geen schakelaars.*exacte toestel.*toestaat/i);
  }
  const reference = bulexCatalogs[1].codes.find(entry => entry.code === "F.22").userAction;
  for (const code of ["2E 207", "2F 260", "2L 266", "H07"]) {
    assert.equal(search(code)[0].userAction, reference);
    assert.match(search(code)[0].userAction, /uitsluitend de zichtbare installatiedruk.*gebruikershandleiding.*exacte toestel/i);
    assert.doesNotMatch(search(code)[0].userAction, /2 bar|overbrug|vervang/i);
  }
});

test("real metadata and sitemap expose the selected Buderus model scope and substantive date", () => {
  const page = getPageDefinition("/foutcodes/buderus");
  const metadata = buildPageMetadata(page);
  assert.match(metadata.description, /GB162-70\/85\/100 V2.*selectie.*2021\/07/i);
  assert.doesNotMatch(metadata.description, /volledige|alle.*Buderus|nieuwste/i);
  assert.equal(metadata.openGraph.description, metadata.description);
  assert.equal(metadata.twitter.description, metadata.description);
  assert.equal(metadata.alternates.canonical, "https://www.abservice24.be/foutcodes/buderus");
  assert.equal(metadata.robots.index, true);
  assert.equal(page.lastModified, "2026-10-11");
  assert.equal(buildSitemapEntries(pageRegistry).find(entry => entry.url === metadata.alternates.canonical).lastModified, "2026-10-11");
});

test("non-Buderus fault guidance and fault-guide registry preserve the historical baseline", () => {
  // Digests frozen before production edits at 906a0ea; intentional integrity
  // guard only, separate from independently transcribed manufacturer facts.
  const digest = value => createHash("sha256").update(JSON.stringify(value)).digest("hex");
  // Only subsequently approved 25L/Bulex A/B additions and Task49 named Bosch
  // scopes/warnings are removed; all immutable historical captures stay fixed.
  // projection. Its independent complete inventories and pre-edit eight-catalog
  // digest are enforced by calenta-ace-matic-25l.test.mjs. Never rebase this hash.
  const historicalGuides = faultGuides.filter(guide => guide.slug !== "buderus").map(currentGuide => {
    const guide = beforeAvantaGuide(currentGuide);
    if (guide.slug !== "remeha") return beforeThemaABGuide(beforeBoschScopeGuide(beforeAcvGuide(beforeIntergasGuide(beforeNefitGuide(beforeFerroliGuide(beforeIthoGuide(beforeAtagGuide(beforeViessmannGuide(guide)))))))));
    const oldWarning = "Kies uw toestelreeks en generatie: Avanta volgt de officiële Belgische Storingswijzer; legacy Calenta 15s/25s/28c/35s/40c volgt de E- en Su-tabellen van handleiding 117061-08. Calenta Ace-Matic 25s/35s/30c/40c volgt revisie 7871265-05-04072025, met afzonderlijke CU-GH-21-tabellen en SCB-10-tabellen die alleen gelden als de uitbreiding en betrokken componenten aanwezig zijn. De betekenis hangt af van model, generatie en configuratie. Calenta Ace-Matic 25L, Calenta Ace, Tzerra, Quinta en andere revisies vallen niet onder deze dekking.";
    const newWarning = "Kies uw toestelreeks en generatie: Avanta volgt de officiële Belgische Storingswijzer; legacy Calenta 15s/25s/28c/35s/40c volgt de E- en Su-tabellen van handleiding 117061-08. Calenta Ace-Matic 25s/35s/30c/40c volgt revisie 7871265-05-04072025. Calenta Ace-Matic 25L heeft eigen tabellen uit de afzonderlijke handleiding 7871254-04-04072025. Kies hieronder het juiste model en de component CU-GH-21 of SCB-10; SCB-10-tabellen gelden alleen als de uitbreiding en betrokken componenten aanwezig zijn. De betekenis hangt af van model, generatie en configuratie. Calenta Ace, Tzerra, Quinta en andere revisies vallen niet onder deze dekking.";
    return { ...guide, modelWarning: guide.modelWarning.replace(newWarning, oldWarning),
      catalogs: guide.catalogs.slice(0, 8), codeEntryCount: guide.codeEntryCount - 300,
      codes: guide.codes.slice(0, 359) };
  });
  assert.equal(digest(historicalGuides), "5b20e74a82abe8770b7772b18915a1ac0a38cc25c6eb1b55329717a5659e18e1");
  // Historical fault-guide integrity only: unrelated website content may receive
  // intentional substantive updates without changing manufacturer source facts.
  assert.equal(digest(pageRegistry.filter(page => page.path.startsWith("/foutcodes/") && page.path !== "/foutcodes/buderus").map(beforeAvantaRegistry).map(beforeViessmannRegistry).map(beforeAtagRegistry).map(beforeIthoRegistry).map(beforeFerroliRegistry).map(beforeNefitRegistry).map(beforeIntergasRegistry).map(beforeAcvRegistry).map(beforeBoschScopeRegistry)), "f548cbddfc9b3e17ea9a732e71d0bae5aa5a95fe6e7b08dad518ae8edfc17537");
});
