import test from "node:test";
import assert from "node:assert/strict";
import { stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { contentImages } from "../content/media.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("registered content images are lightweight WebP assets excluded from project evidence", async () => {
  const images = Object.values(contentImages);

  assert.ok(images.length >= 11);
  assert.ok(images.every((image) => image.ownerConfirmed === true));
  assert.ok(images.every((image) => image.role === "illustration"));
  assert.ok(images.every((image) => image.projectEvidence === false));
  assert.ok(images.every((image) => image.alt.startsWith("Illustratieve")));
  assert.ok(images.every((image) => !("caption" in image)));
  assert.ok(images.every((image) => image.src.startsWith("/media/") && image.src.endsWith(".webp")));

  for (const image of images) {
    const file = await stat(path.join(root, "public", image.src));
    assert.ok(file.size <= 250 * 1024, `${image.src} is zwaarder dan 250 KiB`);
  }
});

test("edited marketing images are never registered as documentary evidence", () => {
  const generatedImages = Object.values(contentImages).filter(
    (image) => image.sourceType === "generated-marketing"
  );

  assert.ok(generatedImages.length >= 4);
  assert.ok(generatedImages.every((image) => image.projectEvidence === false));
});
