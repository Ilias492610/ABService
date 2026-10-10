import test from "node:test";
import assert from "node:assert/strict";
import { buildContactHref, readContactContext } from "../libs/contact-context.mjs";

test("service CTA preselects a valid service and retains a real form anchor", () => {
  const href = buildContactHref({ service: "Lekdetectie" });
  assert.equal(href, "/contact?dienst=Lekdetectie#aanvraagformulier");
  assert.deepEqual(readContactContext(new URL(href, "https://www.abservice24.be")), { service: "Lekdetectie" });
});

test("tool handoff lives in the fragment and only accepts defined planning choices", () => {
  const href = buildContactHref({ service: "Onderhoud cv-ketel", toolInput: {
    region: "brussel", device: "central", fuel: "gas", power: "unknown", lastDate: "2024-02-29", changed: "no",
    name: "Should not be forwarded", email: "private@example.test",
  } });
  const url = new URL(href, "https://www.abservice24.be");
  assert.equal(url.search, "");
  assert.ok(url.hash.startsWith("#aanvraagformulier?"));
  assert.ok(!href.includes("private"));
  const context = readContactContext(url);
  assert.equal(context.service, "Onderhoud cv-ketel");
  assert.match(context.message, /Brussel/);
  assert.match(context.message, /2024-02-29/);
  assert.ok(!context.message.includes("Should not be forwarded"));
});

test("untrusted service or fragment content cannot be injected into contact fields", () => {
  assert.equal(buildContactHref({ service: "fake<script>" }), "/contact#aanvraagformulier");
  assert.deepEqual(readContactContext(new URL("https://www.abservice24.be/contact?dienst=Invalid&email=private@example.test")), {});
  const context = readContactContext(new URL("https://www.abservice24.be/contact#aanvraagformulier?dienst=Onderhoud+cv-ketel&region=%3Cscript%3E&lastDate=private%40example.test"));
  assert.equal(context.service, "Onderhoud cv-ketel");
  assert.equal(context.message, undefined);
});

test("excessive or unrelated fragments are ignored", () => {
  assert.deepEqual(readContactContext({ search: "", hash: "#other?dienst=Lekdetectie" }), {});
  assert.deepEqual(readContactContext({ search: "", hash: `#aanvraagformulier?${"a".repeat(2000)}` }), {});
});

test("prototype property names are not valid planning choices", () => {
  const base = "https://www.abservice24.be/contact#aanvraagformulier?dienst=Onderhoud+cv-ketel&context=onderhoudscheck&device=central&fuel=gas&power=unknown&changed=no";
  for (const value of ["constructor", "toString", "__proto__"]) {
    const context = readContactContext(new URL(`${base}&region=${value}`));
    assert.equal(context.message, undefined);
  }
});
