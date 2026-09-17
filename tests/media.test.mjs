import test from "node:test";
import assert from "node:assert/strict";
import { stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { contentImages } from "../content/media.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("owner-confirmed content images are lightweight WebP assets with useful alt text", async () => {
  const images = Object.values(contentImages);

  assert.ok(images.length >= 11);
  assert.ok(images.every((image) => image.ownerConfirmed === true));
  assert.ok(images.every((image) => image.role === "owned-photo"));
  assert.ok(images.every((image) => image.projectEvidence === true));
  assert.ok(images.every((image) => image.alt.length >= 25));
  assert.ok(images.every((image) => !image.alt.toLowerCase().includes("illustratief")));
  assert.ok(images.every((image) => !("caption" in image)));
  assert.ok(images.every((image) => image.src.startsWith("/media/") && image.src.endsWith(".webp")));

  for (const image of images) {
    const file = await stat(path.join(root, "public", image.src));
    assert.ok(file.size <= 250 * 1024, `${image.src} is zwaarder dan 250 KiB`);
  }
});

test("registered images retain owner provenance", () => {
  assert.ok(
    Object.values(contentImages).every((image) => image.sourceType === "owner-archive")
  );
});
