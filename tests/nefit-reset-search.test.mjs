import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { getFaultGuide } from "../content/fault-guides.mjs";
import { pageRegistry } from "../content/site-content.mjs";
import { buildPageMetadata } from "../libs/seo-data.mjs";
import * as search from "../libs/fault-search.mjs";
import { loadContactModule } from "./helpers/contact-runtime.mjs";
import { renderFaultGuide } from "./helpers/fault-guide-runtime.mjs";

// Independent literal input: original 6720646227 (04/2013, NL), table25
// p34 physicalrow39: rE / blank classification / reset being executed.
// A blank classification is NOT the reason for calling this a reset state.
// Genuine accepted c7b44be capture predates Task57/58 product and tests.
const nefit = getFaultGuide("nefit-bosch");
const id = "nefit-proline-hrc";
const variants = ["rE", "RE", "re", "r.e", "r e", " R:E "];
const title = "rE: reset wordt uitgevoerd";
const text = "De historische ProLine HRC-handleiding 6720646227 (04/2013, NL), tabel 25 op p. 34, vermeldt bij rE: “Een reset van het cv-toestel wordt uitgevoerd.” Deze melding bewijst niet dat de oorzaak van een storing verholpen is. Noteer bij een aanhoudende of terugkerende storing het exacte toesteltype en de volledige displaymelding; voer geen herhaalde resets uit.";
const url = "https://www.nefit-bosch.nl/media/country_pool/professioneel/installateurs/installatie-instructie_proline.pdf";
const label = "Nefit ProLine HRC - installatie-instructie 6720646227 (04/2013, NL)";
const summarize = groups => groups.map(g => [g.id, g.codes.map(r => r.code)]);
const hash = value => createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");
const notice = (...args) => {
  assert.equal(typeof search.getFaultDisplayStateNotice, "function", "Source-bound display-state notice API exists");
  return search.getFaultDisplayStateNotice(...args);
};

test("Nefit exact rE state suppresses irrelevant prose matches in all and selected model", () => {
  // Removing the state exclusion recreates fourteen unrelated fault groups.
  for (const query of variants) for (const model of ["all", id]) {
    assert.deepEqual(search.filterFaultCatalogs(nefit.catalogs, query, model), [], `${query}/${model}`);
  }
});

test("rE notice is historical source-bound reset information, not a repair or diagnosis", () => {
  for (const query of variants) for (const model of ["all", id]) {
    assert.deepEqual(notice(nefit.catalogs, query, model), {
      title, text, sourceUrl: url, sourceLabel: label, sourcePage: "tabel 25, p. 34",
    });
  }
});

test("state notice is absent for unselected models and other queries or brands", () => {
  assert.equal(notice(nefit.catalogs, "rE", "geen-model"), null);
  for (const query of ["", " \t ", "reset", "retourtemperatuur", "relais", "UNKNOWN57", "rE1", "HrE"]) {
    assert.equal(notice(nefit.catalogs, query), null, query);
  }
  assert.equal(notice(getFaultGuide("bosch").catalogs, "rE"), null);
});

test("Bosch and Junkers real HrE/rE aliases survive the Nefit-only exception", () => {
  for (const slug of ["bosch", "junkers"]) {
    const catalogs = getFaultGuide(slug).catalogs;
    for (const query of [...variants, "HrE"]) {
      assert.deepEqual(summarize(search.filterFaultCatalogs(catalogs, query)), [["bosch-cerapur-maxx", ["HrE / rE"]]]);
      assert.deepEqual(summarize(search.filterFaultCatalogs(catalogs, query, "bosch-cerapur-maxx")), [["bosch-cerapur-maxx", ["HrE / rE"]]]);
    }
    assert.deepEqual(summarize(search.filterFaultCatalogs([...nefit.catalogs, ...catalogs], "rE")), [["bosch-cerapur-maxx", ["HrE / rE"]]]);
  }
});

test("natural short words, selected con fallback and incomplete EA family remain useful", () => {
  assert.deepEqual(summarize(search.filterFaultCatalogs(nefit.catalogs, "retourtemperatuur")), [[id, ["2U 213", "CA 286"]]]);
  assert.deepEqual(summarize(search.filterFaultCatalogs(nefit.catalogs, " RETÓUR TEMPERATUUR ")), [[id, ["2U 213", "CA 286"]]]);
  assert.deepEqual(summarize(search.filterFaultCatalogs(getFaultGuide("bulex").catalogs, "con", "bulex-publiek-overzicht")), [["bulex-publiek-overzicht", ["F.29"]]]);
  assert.equal(search.filterFaultCatalogs(getFaultGuide("bosch").catalogs, "EA").reduce((n, c) => n + c.codes.length, 0), 45);
});

test("state searches never fabricate a fault row or mutate the catalog", () => {
  const before = JSON.stringify(nefit.catalogs);
  for (const query of variants) search.filterFaultCatalogs(nefit.catalogs, query);
  assert.equal(JSON.stringify(nefit.catalogs), before);
  assert.equal(nefit.codes.length, 54);
  assert.ok(!nefit.codes.some(row => row.code === "rE"));
  assert.deepEqual(search.filterFaultCatalogs(nefit.catalogs, " \t "), nefit.catalogs);
});

// The whole real component, actual search exports and real event handlers run.
// Only React's hook host is replaced; memoization/timing/native focus are browser gates.
async function componentHarness() {
  const states = []; let position = 0;
  const { default: Catalog } = await loadContactModule("components/fault-code-catalog.js", {
    "@/libs/fault-search.mjs": search,
    react: { ...React, useMemo: callback => callback(), useState(initial) {
      const index = position++;
      if (!(index in states)) states[index] = initial;
      return [states[index], value => { states[index] = value; }];
    } },
  });
  const render = () => { position = 0; return Catalog({ brand: nefit.brand, catalogs: nefit.catalogs }); };
  const nodes = (tree, predicate) => {
    if (Array.isArray(tree)) return tree.flatMap(node => nodes(node, predicate));
    if (!React.isValidElement(tree)) return [];
    return [...(predicate(tree) ? [tree] : []), ...nodes(tree.props.children, predicate)];
  };
  const change = (elementId, value) => {
    const [node] = nodes(render(), n => n.props.id === elementId); assert.ok(node);
    node.props.onChange({ target: { value } }); return render();
  };
  return { render, nodes, change };
}

test("real search change renders sourced status instead of fourteen fault cards", async () => {
  const h = await componentHarness();
  assert.equal(h.nodes(h.render(), n => n.props.className === "fault-code-card").length, 54);
  const tree = h.change("fault-code-search", "rE");
  assert.equal(h.nodes(tree, n => n.props.className === "fault-code-card").length, 0);
  const [status] = h.nodes(tree, n => n.props.role === "status"); assert.ok(status);
  const html = renderToStaticMarkup(status);
  assert.ok(html.includes(title)); assert.ok(html.includes(text));
  const [source] = h.nodes(status, n => n.type === "a"); assert.ok(source);
  assert.equal(source.props.href, url); assert.equal(source.props.target, "_blank"); assert.equal(source.props.rel, "noreferrer");
  assert.equal(React.Children.toArray(source.props.children).join(""), label + " ↗");
  assert.ok(!html.includes("Geen overeenkomst gevonden"));
});

test("real clear restores full cards and an unselected state gets ordinary empty feedback", async () => {
  const h = await componentHarness(); h.change("fault-code-search", "rE");
  const unknown = h.change("fault-model-filter", "geen-model");
  assert.ok(renderToStaticMarkup(unknown).includes("Geen overeenkomst gevonden"));
  assert.ok(!renderToStaticMarkup(unknown).includes(title));
  h.change("fault-model-filter", id);
  assert.ok(renderToStaticMarkup(h.render()).includes(title));
  const cleared = h.change("fault-code-search", "");
  assert.equal(h.nodes(cleared, n => n.props.className === "fault-code-card").length, 54);
  assert.equal(h.nodes(cleared, n => n.props.role === "status").length, 0);
});

test("Nefit default SSR, full content and metadata retain genuine accepted hashes", async () => {
  const page = pageRegistry.find(p => p.path === "/foutcodes/nefit-bosch");
  assert.equal(hash(nefit), "e0731080dafc5a69fc92890466690b3e97a7784c0079319a95fedc843e8c6ec7");
  assert.equal(hash(nefit.codes), "b76d6c8ecdba344fe24ea7a34f49c2300a06ae8a7dfea5f02d8120ce003c3292");
  assert.equal(hash(await renderFaultGuide("nefit-bosch")), "31a5c7e6dd89a81a5e8cf1a90608259e772728979ba8071e858ba4cda410c1b8");
  assert.equal(hash(buildPageMetadata(page)), "d7383afb7f8ce7e09f521f532837c6cbec999b7bf63af2d7655eb03e471d9eb7");
});
