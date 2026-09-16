import test from "node:test";
import assert from "node:assert/strict";

import { validateProjectForPublication } from "../content/projects.mjs";

test("project publication gate rejects an unevidenced case study", () => {
  const result = validateProjectForPublication({
    title: "Ketel vervangen",
    status: "published",
    city: "Hoboken",
  });

  assert.equal(result.ok, false);
  assert.ok(result.missing.includes("authenticPhotos"));
  assert.ok(result.missing.includes("customerApproval"));
  assert.ok(result.missing.includes("workEvidence"));
});

test("project publication gate accepts a complete consented case record", () => {
  const result = validateProjectForPublication({
    title: "Gasketel vervangen in Hoboken",
    status: "published",
    service: "Gasketelinstallatie",
    city: "Hoboken",
    approximateDate: "2026-08",
    situation: "Bestaande ketel vervangen na technische beoordeling.",
    workPerformed: ["Oud toestel verwijderd", "Nieuw toestel geplaatst"],
    outcome: "Installatie opgeleverd volgens de schriftelijke scope.",
    authenticPhotos: [{ src: "/projecten/voorbeeld.webp", verified: true }],
    customerApproval: true,
    workEvidence: "Werkbon en factuur intern gecontroleerd.",
  });

  assert.deepEqual(result, { ok: true, missing: [] });
});
