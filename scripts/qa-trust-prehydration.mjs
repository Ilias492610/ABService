// Optional native-browser gate; no Playwright product dependency is required.
// Hold actual application script requests while CSS and initial HTML load.
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

const modulePath = process.env.PLAYWRIGHT_MODULE;
assert.ok(modulePath, "Provide PLAYWRIGHT_MODULE for this optional browser gate");
const { chromium } = await import(modulePath.startsWith("/") ? pathToFileURL(modulePath).href : modulePath);
const origin = new URL(process.env.AB_QA_ORIGIN || "http://127.0.0.1:3186").origin;
assert.ok(origin === "https://www.abservice24.be" || /^http:\/\/127\.0\.0\.1:\d+$/.test(origin), "Only a loopback build or canonical host is allowed");
const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
const rows = [], attemptedWrites = [];
let requests = 0;
try {
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    for (const profile of [{ path: "/faq", target: ".faq-list summary" }, { path: "/contact", target: "form textarea" }]) {
      const context = await browser.newContext({ viewport, javaScriptEnabled: true, reducedMotion: "reduce" });
      const held = [], scriptPaths = new Set();
      let released = false, ratingRequested = false;
      const release = () => { released = true; for (const resolve of held.splice(0)) resolve(); };
      await context.route("**/*", async route => {
        const request = route.request(), url = new URL(request.url());
        requests++;
        if (request.method() !== "GET") { attemptedWrites.push(request.method()); return route.abort(); }
        if (url.origin !== origin) return route.abort();
        if (url.pathname === "/api/google-rating") {
          ratingRequested = true;
          return route.fulfill({ status: 503, contentType: "application/json", body: "{}" });
        }
        if (request.resourceType() === "script" && !released) {
          scriptPaths.add(url.pathname);
          await new Promise(resolve => held.push(resolve));
        }
        return route.continue();
      });
      const page = await context.newPage(), pageerrors = [], consoleMessages = [];
      page.setDefaultTimeout(12_000);
      page.on("pageerror", error => pageerrors.push(error.message));
      page.on("console", message => {
        if (["warning", "error"].includes(message.type())) consoleMessages.push({ type: message.type(), text: message.text().slice(0, 400) });
      });
      try {
        const response = await page.goto(origin + profile.path, { waitUntil: "commit" });
        assert.equal(response.status(), 200);
        const target = page.locator(profile.target).last();
        await target.waitFor({ state: "visible" });
        // This CSS property proves the stylesheet has arrived before inspection.
        await page.waitForFunction(() => {
          const link = document.querySelector(".whatsapp-button");
          return link && getComputedStyle(link).backgroundColor === "rgb(37, 211, 102)";
        });
        assert.ok(held.length > 0, "Actual application scripts are held, not merely a nominal delay");
        assert.equal(ratingRequested, false, "No provider effect before hydration");
        for (const selector of [".whatsapp-button", ".google-rating-popup"]) {
          assert.equal(await page.locator(selector).evaluate(node => getComputedStyle(node).position), "static", "Pending contact link stays in document flow");
        }
        assert.equal(await page.locator(".google-rating-close").isVisible(), false, "No inert close control before hydration");
        assert.equal(await page.locator(".google-rating-close").isDisabled(), true);
        await target.evaluate((node, y) => {
          const box = node.getBoundingClientRect();
          window.scrollBy({ top: box.top + box.height / 2 - y, behavior: "instant" });
        }, viewport.height - 50);
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        const hit = await target.evaluate(node => {
          const box = node.getBoundingClientRect(), x = box.right - 16, y = box.top + Math.min(20, box.height / 2);
          const top = document.elementFromPoint(x, y);
          return { x, y, reached: node === top || node.contains(top), target: top?.className || top?.tagName, box: { top: box.top, right: box.right, bottom: box.bottom } };
        });
        console.log(JSON.stringify({ path: profile.path, viewport, stage: "pending-edge", heldScripts: scriptPaths.size, hit }));
        assert.equal(hit.reached, true, "Native control receives the actual edge pointer before hydration");
        await page.mouse.click(hit.x, hit.y);
        if (profile.path === "/faq") {
          assert.equal(await target.evaluate(node => node.parentElement.open), true);
          await target.focus(); await page.keyboard.press("Enter");
          assert.equal(await target.evaluate(node => node.parentElement.open), false);
          await page.keyboard.press("Space");
          assert.equal(await target.evaluate(node => node.parentElement.open), true);
        }
        assert.equal(await target.evaluate(node => document.activeElement === node), true);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        const heldScripts = scriptPaths.size;
        release();
        await page.waitForFunction(() => !document.querySelector(".google-rating-popup,.whatsapp-button"));
        assert.equal(await target.evaluate(node => document.activeElement === node), true, "Hydration clearance retains native control focus");
        if (profile.path === "/faq") assert.equal(await target.evaluate(node => node.parentElement.open), true);
        // Away from protected content, retain the original floating channels.
        await page.goto(origin + "/foutcodes/remeha");
        await page.evaluate(() => window.scrollTo({ top: 2400, behavior: "instant" }));
        await page.waitForFunction(() => [".whatsapp-button", ".google-rating-popup"].every(selector => {
          const node = document.querySelector(selector);
          return node && getComputedStyle(node).position === "fixed";
        }));
        assert.equal(await page.locator(".whatsapp-button").getAttribute("href"), "https://wa.me/32484906966?text=Hallo%2C%20ik%20heb%20een%20vraag.");
        assert.equal(await page.locator(".google-rating-link").getAttribute("href"), "https://maps.google.com/?cid=4063521367014109489");
        assert.equal(await page.locator(".whatsapp-button svg").count(), 1);
        assert.equal(await page.locator(".google-rating-link svg").count(), 1);
        assert.equal(await page.locator(".google-rating-close").isDisabled(), false);
        assert.equal(await page.locator(".google-rating-close").isVisible(), true);
        await page.locator(".google-rating-close").focus(); await page.keyboard.press("Enter");
        assert.equal(await page.locator(".google-rating-popup").count(), 0);
        assert.equal(await page.locator(".whatsapp-button").evaluate(node => document.activeElement === node), true);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        assert.deepEqual(pageerrors, []);
        rows.push({ ...profile, viewport, heldScripts, pendingFlow: true, edgePointer: true, nativeFocus: true, hydratedClearance: true, floatingRestoration: true, consoleMessages });
      } finally { release(); await context.close(); }
    }
  }
  assert.equal(rows.length, 4);
  assert.deepEqual(attemptedWrites, []);
  console.log(JSON.stringify({ origin, profiles: rows.length, rows, requests, attemptedWrites, boundary: "Artificial held-script test, not field timing/frequency. Controlled rating503 produces expected resource console errors; external/nonGET firewall excludes actual provider/mail/events/customers. No physical/assistive/field CWV proof." }, null, 2));
} finally { await browser.close(); }
