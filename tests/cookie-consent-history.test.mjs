import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {createHash} from "node:crypto";
import rows from "./fixtures/cookie-consent-history.json" with {type:"json"};
import {beforeCookieConsentSource,beforeCookieConsentBytes,beforeCookieConsentHtml,beforeCookieConsentRegistry,beforeCookieConsentCopy} from "./fixtures/cookie-consent-history.mjs";
const hash = source => createHash("sha256").update(source).digest("hex");

test("unrelated binary assets pass through without UTF8 decoding", () => {
  const image=Buffer.from([0x89,0x50,0xff,0x00]);
  assert.equal(beforeCookieConsentBytes(image,"app/apple-icon.png"),image);
});

test("consent source inverse restores only named actual transitions, not extra or duplicate drift", async () => {
  for (const row of rows.filter(row => !row.kind || row.kind === "source")) {
    const source = await readFile(new URL("../" + (row.actualPath || row.path),import.meta.url),"utf8");
    assert.equal(hash(beforeCookieConsentSource(source,row.path)),row.beforeSha256,row.path);
    assert.notEqual(hash(beforeCookieConsentSource(source+"\n// extra drift",row.path)),row.beforeSha256);
    assert.equal(beforeCookieConsentSource(source,"unknown"),source);
    for (const change of row.changes) {
      assert.notEqual(hash(beforeCookieConsentSource(source+change.after,row.path)),row.beforeSha256);
      assert.notEqual(hash(beforeCookieConsentSource(source.replace(change.after,change.after+"// injected"),row.path)),row.beforeSha256);
    }
  }
});

test("cookie history never erases unknown HTML, registry fields, dates or privacy wording", () => {
  for (const row of rows.filter(row=>row.kind === "html")) {
    const current=row.changes.map(change=>change.after).join("")+"<p>untouched</p>";
    assert.equal(beforeCookieConsentHtml(current,row.path),row.changes.map(change=>change.before).join("")+"<p>untouched</p>");
    assert.equal(beforeCookieConsentHtml(current,"unknown"),current);
    const drift=current.replace(row.changes[0].after,row.changes[0].after.replace("<",'<span data-drift="">')+"</span>");
    assert.notEqual(beforeCookieConsentHtml(drift,row.path),beforeCookieConsentHtml(current,row.path));
    assert.ok(beforeCookieConsentHtml(current+row.changes[0].after,row.path).includes(row.changes[0].after));
  }
  for (const row of rows.filter(row=>row.kind === "registry")) {
    assert.deepEqual(beforeCookieConsentRegistry([row.after]),[row.before]);
    for(const mutation of [{unknown:true},{lastModified:"2026-10-16"},{title:"wrong"},{path:"/wrong"}]) {
      const page={...row.after,...mutation};assert.equal(beforeCookieConsentRegistry([page])[0],page);
    }
  }
  for (const row of rows.filter(row=>row.kind === "copy")) {
    const copy=Object.fromEntries(row.changes.map(change=>[change.key,change.after]));
    assert.deepEqual(beforeCookieConsentCopy(copy,row.locale),Object.fromEntries(row.changes.map(change=>[change.key,change.before])));
    const drift={...copy,unknown:true,analytics:copy.analytics+"drift"};
    assert.equal(beforeCookieConsentCopy(drift,row.locale).unknown,true);
    assert.equal(beforeCookieConsentCopy(drift,row.locale).analytics,drift.analytics);
  }
});
