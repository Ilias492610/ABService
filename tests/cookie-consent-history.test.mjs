import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {createHash} from "node:crypto";
import rows from "./fixtures/cookie-consent-history.json" with {type:"json"};
import {beforeCookieConsentSource,beforeCookieConsentBytes} from "./fixtures/cookie-consent-history.mjs";
const hash = source => createHash("sha256").update(source).digest("hex");

test("unrelated binary assets pass through without UTF8 decoding", () => {
  const image=Buffer.from([0x89,0x50,0xff,0x00]);
  assert.equal(beforeCookieConsentBytes(image,"app/apple-icon.png"),image);
});

test("consent source inverse restores only named actual transitions, not extra or duplicate drift", async () => {
  for (const row of rows) {
    const source = await readFile(new URL("../" + row.path,import.meta.url),"utf8");
    assert.equal(hash(beforeCookieConsentSource(source,row.path)),row.beforeSha256,row.path);
    assert.notEqual(hash(beforeCookieConsentSource(source+"\n// extra drift",row.path)),row.beforeSha256);
    assert.equal(beforeCookieConsentSource(source,"unknown"),source);
    for (const change of row.changes) {
      assert.notEqual(hash(beforeCookieConsentSource(source+change.after,row.path)),row.beforeSha256);
      assert.notEqual(hash(beforeCookieConsentSource(source.replace(change.after,change.after+"// injected"),row.path)),row.beforeSha256);
    }
  }
});
