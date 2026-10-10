import assert from "node:assert/strict";
import { chromium } from "/Users/hamda/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";

const base = process.env.CONTACT_QA_BASE || "http://127.0.0.1:3111";
assert.equal(new URL(base).hostname, "127.0.0.1", "QA is local only");
const browser = await chromium.launch({ headless: true, executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
try {
  const native = await browser.newContext({ javaScriptEnabled: false, reducedMotion: "reduce" });
  const page = await native.newPage();
  for (const [status, text] of [["success", /Uw aanvraag is verzonden/], ["error", /De aanvraag kon niet worden verzonden/]]) {
    await page.goto(`${base}/contact?contact=${status}#aanvraagformulier`);
    assert.match(await page.locator("[role=status]").innerText(), text);
  }
  await page.goto(`${base}/contact?contact=private-marker#aanvraagformulier`);
  assert.equal(await page.locator("[role=status]").count(), 0);
  await page.locator("#name").fill("WP01 synthetic privacy marker");
  await page.locator("#phone").fill("0000000000");
  await page.locator("#email").fill("wp01@example.invalid");
  await page.locator("#message").fill("Synthetic no-mail test");
  await page.locator("#consent").check({ force: true });
  let observed;
  await page.route("**/*", async (route) => {
    if (route.request().isNavigationRequest()) {
      observed = { method: route.request().method(), url: route.request().url(), body: route.request().postData() };
      await route.abort();
    } else await route.continue();
  });
  await page.locator("button[type=submit]").click({ force: true });
  assert.equal(observed.method, "POST");
  assert.equal(observed.url, `${base}/api/contact`);
  assert.match(observed.body, /email=wp01%40example.invalid/);
  console.log("PASS native POST/privacy boundary; success/error feedback rendered with JavaScript disabled; unknown status ignored");
  await native.close();

  for (const [name, viewport] of [["desktop", { width: 1440, height: 1000 }], ["mobile", { width: 390, height: 844 }]]) {
    const context = await browser.newContext({ viewport, reducedMotion: "reduce" });
    await context.addInitScript(() => { window.qaEvents = []; window.va = (...args) => window.qaEvents.push(args); });
    let calls = 0;
    let respond;
    let release;
    await context.route("**/*", async (route) => {
      const request = route.request();
      if (request.url() === `${base}/api/contact`) {
        calls++;
        assert.equal(request.method(), "POST");
        assert.equal(JSON.parse(request.postData()).email, "wp01@example.invalid");
        await respond(route);
      } else if (new URL(request.url()).origin !== base || request.method() === "POST") await route.abort();
      else await route.continue();
    });
    const page = await context.newPage();
    await page.goto(`${base}/contact#aanvraagformulier`);
    await page.locator("#name").fill("WP01 synthetic");
    await page.waitForFunction(() => window.qaEvents.some(([type, event]) => type === "event" && event.name === "contact_form_start"));
    await page.locator("button[type=submit]").click();
    await page.waitForFunction(() => document.activeElement?.id === "phone");
    assert.equal(calls, 0);
    await page.locator("#phone").fill("0000000000");
    await page.locator("#email").fill("wp01@example.invalid");
    await page.locator("#consent").check();
    const fillAgain = async () => {
      await page.locator("#name").fill("WP01 synthetic");
      await page.locator("#phone").fill("0000000000");
      await page.locator("#email").fill("wp01@example.invalid");
      await page.locator("#consent").check();
    };
    respond = async (route) => {
      await new Promise((resolve) => { release = resolve; });
      await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
    };
    await page.evaluate(() => {
      const form = document.querySelector("form");
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });
    await page.waitForFunction(() => document.querySelector("form").getAttribute("aria-busy") === "true");
    while (!release) await new Promise((resolve) => setTimeout(resolve, 10));
    assert.equal(calls, 1);
    assert.equal(await page.locator("button[type=submit]").isDisabled(), true);
    assert.match(await page.locator("[role=status]").innerText(), /wordt verzonden/);
    release();
    await page.waitForFunction(() => document.querySelector(".form-status.success"));
    assert.match(await page.locator("[role=status]").innerText(), /pas bevestigd na rechtstreeks contact/);
    let successCount = 1;
    for (const [label, response] of [
      ["missing ok", { status: 200, contentType: "application/json", body: '{}' }],
      ["false ok", { status: 200, contentType: "application/json", body: '{"ok":false}' }],
      ["non-JSON", { status: 200, contentType: "text/plain", body: 'synthetic private marker' }],
      ["HTTP", { status: 500, contentType: "application/json", body: '{"error":"synthetic private marker"}' }],
      ["network", null],
    ]) {
      await fillAgain();
      respond = (route) => response ? route.fulfill(response) : route.abort();
      await page.locator("button[type=submit]").click();
      await page.waitForFunction(() => document.activeElement?.getAttribute("role") === "status");
      assert.match(await page.locator("[role=status]").innerText(), /kon niet worden verzonden/);
      assert.doesNotMatch(await page.locator("[role=status]").innerText(), /synthetic private marker|Unexpected|JSON/);
      assert.equal(await page.locator("button[type=submit]").isDisabled(), false);
      const events = await page.evaluate(() => window.qaEvents.filter(([type]) => type === "event").map(([, event]) => event));
      assert.equal(events.filter((event) => event.name === "contact_form_success").length, successCount, label);
      assert.equal(events.at(-1).name, "contact_form_failure", label);
      assert.doesNotMatch(JSON.stringify(events), /wp01@example|0000000000|WP01 synthetic|synthetic private marker/);
      respond = (route) => route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
      await page.locator("button[type=submit]").click();
      await page.waitForFunction(() => document.querySelector(".form-status.success"));
      successCount++;
    }
    const handoff = "#aanvraagformulier?dienst=Onderhoud+cv-ketel&context=onderhoudscheck&region=brussel&device=central&fuel=gas&power=unknown&changed=no&lastDate=2024-02-29&email=private-marker";
    // Context is consumed on initial mount; leave the route before testing a fresh handoff.
    await page.goto(base);
    await page.goto(`${base}/contact${handoff}`);
    await page.waitForFunction(() => window.location.hash === "#aanvraagformulier");
    assert.equal(await page.locator("#service").inputValue(), "Onderhoud cv-ketel");
    assert.match(await page.locator("#message").inputValue(), /2024-02-29/);
    assert.doesNotMatch(await page.locator("#message").inputValue(), /private-marker/);
    assert.equal(await page.locator("#email").inputValue(), "");
    const layout = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      panelTop: document.getElementById("aanvraagformulier").getBoundingClientRect().top,
      headerBottom: document.querySelector("header").getBoundingClientRect().bottom,
    }));
    assert.equal(layout.overflow, false);
    assert.ok(layout.panelTop >= layout.headerBottom, JSON.stringify(layout));
    console.log(`PASS ${name}: validation/focus; concurrent pending one request; explicit success caveat; five transport failures/focus/privacy and deliberate retry; leap-date fragment consumption; anchor clears header; no horizontal overflow`);
    await context.close();
  }
} finally {
  await browser.close();
}
