import test from "node:test";
import assert from "node:assert/strict";

import { areaDrafts, brandDrafts, serviceDrafts } from "../content/content-backlog.mjs";

test("unsupported area pages remain drafts while owner-confirmed brands and services leave the backlog", () => {
  const backlog = [...areaDrafts, ...brandDrafts, ...serviceDrafts];

  assert.ok(backlog.length >= 20);
  assert.ok(backlog.every((entry) => entry.status === "draft"));
  assert.ok(backlog.every((entry) => entry.missingEvidence.length > 0));
  assert.deepEqual(brandDrafts, []);
  assert.deepEqual(serviceDrafts, []);
});
