import test from "node:test";
import assert from "node:assert/strict";

import { contentImages } from "../content/media.mjs";

test("owner-supplied legacy images are used transparently as illustrations", () => {
  const images = Object.values(contentImages);

  assert.ok(images.length >= 5);
  assert.ok(images.every((image) => image.ownerConfirmed === true));
  assert.ok(images.every((image) => image.role === "illustration"));
  assert.ok(images.every((image) => image.projectEvidence === false));
  assert.ok(images.every((image) => image.alt.startsWith("Illustratieve")));
  assert.ok(images.every((image) => image.caption.includes("geen klantcase")));
});
