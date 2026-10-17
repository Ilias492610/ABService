import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {createHash} from "node:crypto";
import row from "./fixtures/google-review-diagnostics-history.json" with {type:"json"};
import {beforeGoogleReviewDiagnosticsBytes} from "./fixtures/google-review-diagnostics-history.mjs";
const hash=bytes=>createHash("sha256").update(bytes).digest("hex");

test("diagnostic source history restores only the named change and leaves extra or duplicate drift visible",async()=>{
  const bytes=await readFile(new URL("../"+row.path,import.meta.url));
  assert.equal(hash(bytes),row.afterSha256);
  assert.equal(hash(beforeGoogleReviewDiagnosticsBytes(bytes,row.path)),row.beforeSha256);
  assert.equal(beforeGoogleReviewDiagnosticsBytes(bytes,"unrelated"),bytes);
  const binary=Buffer.from([0xff,0x89,0x00]);assert.equal(beforeGoogleReviewDiagnosticsBytes(binary,"app/icon.png"),binary);
  assert.notEqual(hash(beforeGoogleReviewDiagnosticsBytes(Buffer.concat([bytes,Buffer.from("\n// unapproved drift")]),row.path)),row.beforeSha256);
  for(const change of row.changes){
    assert.notEqual(hash(beforeGoogleReviewDiagnosticsBytes(Buffer.from(bytes.toString()+change.after),row.path)),row.beforeSha256);
    assert.notEqual(hash(beforeGoogleReviewDiagnosticsBytes(Buffer.from(bytes.toString().replace(change.after,change.after+"// unapproved drift")),row.path)),row.beforeSha256);
  }
});
