import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { buildIndexNowPayload, submitIndexNow } from "../libs/indexnow.mjs";

test("notifications deduplicate explicit published canonical URLs and reject unsupported or private inputs", () => {
  const payload = buildIndexNowPayload(["/foutcodes", "/foutcodes/remeha", "/foutcodes"]);
  assert.equal(payload.host, "www.abservice24.be");
  assert.deepEqual(payload.urlList, ["https://www.abservice24.be/foutcodes", "https://www.abservice24.be/foutcodes/remeha"]);
  assert.match(payload.key, /^[a-f0-9]{32}$/);
  assert.equal(payload.keyLocation, `https://www.abservice24.be/${payload.key}.txt`);
  for (const paths of [[], ["https://foreign.test/contact"], ["/contact?email=test@example.test"], ["/contact#aanvraagformulier"], ["/installaties/airconditioning"], ["/sitemap.xml"], ["/social/contact"], ["/loodgieter-gent"], ["//foreign.test/"], [null]]) {
    assert.throws(() => buildIndexNowPayload(paths));
  }
  assert.throws(() => buildIndexNowPayload("/foutcodes"));
  assert.throws(() => buildIndexNowPayload(Array(10_001).fill("/foutcodes")));
});

test("the publicly served UTF-8 proof contains the configured key", async () => {
  const payload = buildIndexNowPayload(["/foutcodes/remeha"]);
  const proof = await readFile(new URL(`../public/${payload.key}.txt`, import.meta.url), "utf8");
  assert.equal(proof.trim(), payload.key);
});

test("sparse input arrays are rejected before any network request", async () => {
  for (const paths of [Array(1), ["/foutcodes", , "/foutcodes/remeha"]]) {
    assert.throws(() => buildIndexNowPayload(paths));
    let calls = 0;
    await assert.rejects(() => submitIndexNow(paths, { fetcher: async () => {
      calls++;
      return new Response(buildIndexNowPayload(["/foutcodes"]).key, { headers: { "content-type": "text/plain" } });
    } }));
    assert.equal(calls, 0);
  }
});

test("transport verifies live proof before sending the bounded JSON batch and distinguishes 200 from 202", async () => {
  for (const httpStatus of [200, 202]) {
    const calls = [];
    const result = await submitIndexNow(["/foutcodes/remeha"], { fetcher: async (url, options) => {
      calls.push({ url, options });
      if (calls.length === 1) return new Response(buildIndexNowPayload(["/foutcodes/remeha"]).key, { headers: { "content-type": "text/plain; charset=utf-8" } });
      return new Response(null, { status: httpStatus });
    } });
    assert.equal(calls.length, 2);
    assert.match(calls[0].url, /^https:\/\/www\.abservice24\.be\/[a-f0-9]{32}\.txt$/);
    assert.equal(calls[0].options.redirect, "error");
    assert.equal(calls[1].url, "https://api.indexnow.org/indexnow");
    assert.equal(calls[1].options.method, "POST");
    assert.equal(calls[1].options.redirect, "error");
    assert.ok(calls.every((call) => call.options.signal instanceof AbortSignal));
    assert.equal(calls[1].options.headers["Content-Type"], "application/json; charset=utf-8");
    assert.deepEqual(JSON.parse(calls[1].options.body).urlList, ["https://www.abservice24.be/foutcodes/remeha"]);
    assert.deepEqual(result, { httpStatus, state: httpStatus === 200 ? "received" : "key-verification-pending", urlCount: 1 });
  }
});

test("bad proof and invalid paths fail before POST and rate limiting never retries", async () => {
  for (const response of [new Response("wrong", { headers: { "content-type": "text/plain" } }), new Response("wrong", { headers: { "content-type": "text/html" } }), new Response(null, { status: 302 })]) {
    let calls = 0;
    await assert.rejects(() => submitIndexNow(["/foutcodes"], { fetcher: async () => { calls++; return response; } }));
    assert.equal(calls, 1);
  }
  let calls = 0;
  await assert.rejects(() => submitIndexNow(["/contact?token=private"], { fetcher: async () => { calls++; return new Response(); } }));
  assert.equal(calls, 0);
  await assert.rejects(() => submitIndexNow(["/foutcodes"], { fetcher: async () => {
    calls++;
    return calls === 1 ? new Response(buildIndexNowPayload(["/foutcodes"]).key, { headers: { "content-type": "text/plain" } }) : new Response(null, { status: 429 });
  } }), /429/);
  assert.equal(calls, 2);
});

test("HTTP failures and network timeouts stay failures without retrying or claiming indexing", async () => {
  for (const httpStatus of [302, 400, 403, 422, 500]) {
    let calls = 0;
    await assert.rejects(() => submitIndexNow(["/foutcodes"], { fetcher: async () => {
      calls++;
      return calls === 1
        ? new Response(buildIndexNowPayload(["/foutcodes"]).key, { headers: { "content-type": "text/plain" } })
        : new Response(null, { status: httpStatus });
    } }), new RegExp(String(httpStatus)));
    assert.equal(calls, 2);
  }
  for (const failedCall of [1, 2]) {
    let calls = 0;
    await assert.rejects(() => submitIndexNow(["/foutcodes"], { fetcher: async () => {
      calls++;
      if (calls === failedCall) throw new DOMException("Request timed out", "TimeoutError");
      return new Response(buildIndexNowPayload(["/foutcodes"]).key, { headers: { "content-type": "text/plain" } });
    } }), { name: "TimeoutError" });
    assert.equal(calls, failedCall);
  }
});

test("CLI defaults to a local preview and does not accept an empty invocation", () => {
  const output = JSON.parse(execFileSync(process.execPath, ["scripts/indexnow.mjs", "/foutcodes/remeha"], { cwd: new URL("..", import.meta.url), encoding: "utf8" }));
  assert.deepEqual(output, { mode: "preview", urlCount: 1, urlList: ["https://www.abservice24.be/foutcodes/remeha"], sent: false });
  assert.throws(() => execFileSync(process.execPath, ["scripts/indexnow.mjs"], { cwd: new URL("..", import.meta.url), stdio: "pipe" }));
  assert.throws(() => execFileSync(process.execPath, ["scripts/indexnow.mjs", "--unknown", "/foutcodes"], { cwd: new URL("..", import.meta.url), stdio: "pipe" }));
});
