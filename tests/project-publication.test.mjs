import test from "node:test";
import assert from "node:assert/strict";

import {
  deriveAreaEvidence,
  getPublishedProjectsForHub,
  validateProjectForPublication,
} from "../content/projects.mjs";

const completeProject = {
  path: "/projecten/gasketel-vervangen-hoboken",
  title: "Gasketel vervangen in Hoboken",
  status: "published",
  service: "Gasketelinstallatie",
  province: "Antwerpen",
  city: "Antwerpen",
  district: "Hoboken",
  brand: "Niet van toepassing",
  approximateDate: "2026-08",
  problem: "De bestaande installatie was aan vervanging toe.",
  solution: "De overeengekomen installatie werd vervangen en gecontroleerd.",
  situation: "Bestaande ketel vervangen na technische beoordeling.",
  workPerformed: ["Oud toestel verwijderd", "Nieuw toestel geplaatst"],
  outcome: "Installatie opgeleverd volgens de schriftelijke scope.",
  authenticPhotos: [{ src: "/projecten/voorbeeld.webp", verified: true }],
  customerApproval: true,
  reviewApproved: false,
  reviewText: "",
  workEvidence: "Werkbon en factuur intern gecontroleerd.",
};

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
  const result = validateProjectForPublication(completeProject);

  assert.deepEqual(result, { ok: true, missing: [] });
});

test("published projects automatically strengthen their district and province hub", () => {
  const district = { name: "Hoboken", type: "district", prioritySignals: {} };
  const evidence = deriveAreaEvidence(district, [completeProject]);

  assert.equal(evidence.hasProjectEvidence, true);
  assert.equal(evidence.hasLocalReview, false);
  assert.equal(evidence.projectCount, 1);
  assert.deepEqual(getPublishedProjectsForHub("Antwerpen", [completeProject]), [completeProject]);
});
