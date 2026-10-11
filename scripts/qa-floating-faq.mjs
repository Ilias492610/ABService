// Optional real-browser regression gate. No product dependency is required.
// Supply PLAYWRIGHT_MODULE as an installed module path, CHROME_PATH as a browser
// executable, and AB_QA_ORIGIN as a built local server or the canonical host.
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
const paths = ["/loodgieter-borsbeek", "/faq", "/onderhoud", "/werkgebied/antwerpen"];
try {
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    for (const variant of [{ js: true, rating: null }, { js: true, rating: 4.7 }, { js: false, rating: null }]) {
      const context = await browser.newContext({ viewport, javaScriptEnabled: variant.js, reducedMotion: "reduce" });
      let ratingRequested = false;
      await context.route("**/*", route => {
        const request = route.request(), url = new URL(request.url());
        requests++;
        if (request.method() !== "GET") { attemptedWrites.push(request.method()); return route.abort(); }
        if (url.origin !== origin) return route.abort();
        if (url.pathname === "/api/google-rating") {
          ratingRequested = true;
          return route.fulfill({ status: variant.rating === null ? 503 : 200, contentType: "application/json", body: JSON.stringify(variant.rating === null ? {} : { rating: { rating: 4.7, googleMapsUri: "https://maps.google.com/?cid=4063521367014109489" } }) });
        }
        return route.continue();
      });
      const page = await context.newPage(), errors = [];
      page.setDefaultTimeout(15_000);
      page.on("pageerror", error => errors.push(error.message));
      for (const path of paths) {
        const response = await page.goto(origin + path);
        assert.equal(response.status(), 200);
        const summary = page.locator(".faq-list summary").last();
        assert.ok(await summary.count(), path);
        // Reproduce an ordinary viewport-edge position, rather than centre a
        // target to sidestep fixed controls or force a click through an overlay.
        await summary.evaluate((node, y) => {
          const box = node.getBoundingClientRect();
          window.scrollBy({ top: box.top + box.height / 2 - y, behavior: "instant" });
        }, viewport.height - 50);
        // Disabled-script pages do not deliver animation-frame callbacks.
        // Geometry/hit testing below remains real browser evidence in that mode.
        if (variant.js) await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        if (variant.js) {
          await page.waitForFunction(() => !document.querySelector(".google-rating-popup,.whatsapp-button"), null, { timeout: 2000 });
        } else {
          for (const selector of [".google-rating-popup", ".whatsapp-button"]) {
            assert.notEqual(await page.locator(selector).evaluate(node => getComputedStyle(node).position), "fixed", "static-session link must not overlay page content");
          }
          assert.equal(await page.locator(".google-rating-close").isVisible(), false, "no inert static-session close control");
        }
        const hit = await summary.evaluate(node => {
          const box = node.getBoundingClientRect(), x = box.right - 16, y = box.top + Math.min(20, box.height / 2);
          const top = document.elementFromPoint(x, y);
          return { x, y, reached: node === top || node.contains(top), target: top?.className || top?.tagName, box: { top: box.top, right: box.right, bottom: box.bottom } };
        });
        console.log(JSON.stringify({ path, viewport, variant, stage: "edge-hit", hit }));
        assert.equal(hit.reached, true, "FAQ receives the actual edge pointer");
        await page.mouse.click(hit.x, hit.y);
        assert.equal(await summary.evaluate(node => node.parentElement.open), true);
        assert.ok(await summary.locator("..").locator("p").isVisible());
        await summary.focus();
        await page.keyboard.press("Enter");
        assert.equal(await summary.evaluate(node => node.parentElement.open), false);
        assert.equal(await summary.evaluate(node => document.activeElement === node), true, "FAQ focus is not stolen");
        await page.keyboard.press("Space");
        assert.equal(await summary.evaluate(node => node.parentElement.open), true);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        rows.push({ path, viewport, variant, edgePointer: true, nativeKeyboard: true });
      }
      // A nonprotected position must retain both original channels. The long
      // source-bound catalogue supplies a position away from hero/FAQ/footer.
      await page.goto(origin + "/foutcodes/remeha");
      await page.evaluate(() => window.scrollTo({ top: 2400, behavior: "instant" }));
      await page.locator(".whatsapp-button").waitFor({ state: "visible" });
      if (variant.js) await page.locator(".google-rating-popup").waitFor({ state: "visible" });
      assert.equal(await page.locator(".whatsapp-button").getAttribute("href"), "https://wa.me/32484906966?text=Hallo%2C%20ik%20heb%20een%20vraag.");
      assert.equal(await page.locator(".whatsapp-button svg").count(), 1);
      assert.equal(await page.locator(".google-rating-link").getAttribute("href"), "https://maps.google.com/?cid=4063521367014109489");
      assert.equal(await page.locator(".google-rating-link svg").count(), 1);
      if (variant.js && variant.rating !== null) {
        await page.locator(".google-rating-row b").waitFor();
        assert.equal(await page.locator(".google-rating-row b").innerText(), "4,7");
      }
      assert.ok(!variant.js || ratingRequested, "hydrated provider fixture actually reached");
      if (variant.js) {
        for (const selector of [".google-rating-popup", ".whatsapp-button"]) {
          assert.equal(await page.locator(selector).evaluate(node => getComputedStyle(node).position), "fixed", "ordinary hydrated appearance is retained");
        }
        await page.locator(".google-rating-close").focus();
        await page.keyboard.press("Enter");
        assert.equal(await page.locator(".google-rating-popup").count(), 0);
        assert.equal(await page.locator(".whatsapp-button").evaluate(node => document.activeElement === node), true);
        // Real internal navigation preserves explicit dismissal; do not reload
        // the document and accidentally test a fresh widget instance instead.
        await page.locator(".site-header .brand").click();
        await page.waitForURL(origin + "/");
        await page.locator(".page-hero .button-row").evaluate(node => window.scrollBy({ top: node.getBoundingClientRect().bottom + 1, behavior: "instant" }));
        await page.locator(".whatsapp-button").waitFor({ state: "visible" });
        assert.equal(await page.locator(".google-rating-popup").count(), 0, "dismissal survives native route and clearance restoration");
      }
      assert.deepEqual(errors, []);
      await context.close();
    }
  }
  assert.equal(rows.length, 24);
  assert.deepEqual(attemptedWrites, []);
  console.log(JSON.stringify({ origin, profiles: rows.length, rows, requests, attemptedWrites, boundary: "Headless desktop/mobile reduced-motion native FAQ edge and keyboard checks. Controlled ratings and external/nonGET firewall; no real provider, receipt, physical-device/assistive, field CWV or customer result." }, null, 2));
} finally { await browser.close(); }
