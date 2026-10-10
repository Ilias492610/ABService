import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

test("public Bing ownership proof matches the provider users contract", () => {
  const proofPath = new URL("../public/BingSiteAuth.xml", import.meta.url);
  assert.equal(existsSync(proofPath), true, "public/BingSiteAuth.xml must exist");

  const proof = readFileSync(proofPath, "utf8");
  const normalizedProof = proof.replace(/>\s+</g, "><").trim();
  assert.equal(
    normalizedProof,
    '<?xml version="1.0"?><users><user>327109A47C3DB277099FDE021C393644</user></users>',
  );
});
