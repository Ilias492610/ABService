import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { once } from "node:events";
import { spawn } from "node:child_process";
import { pageRegistry } from "../content/site-content.mjs";
import { business } from "../content/business.mjs";

test("production crawl fails for a broken icon declared inside an otherwise valid manifest", async (t) => {
  const published = pageRegistry.filter((page) => page.status === "published");
  const server = createServer((request, response) => {
    const path = new URL(request.url, "http://localhost").pathname;
    if (path === "/sitemap.xml") {
      return response.end(`<urlset>${published.map((page) => `<url><loc>${business.canonicalOrigin}${page.path}</loc></url>`).join("")}</urlset>`);
    }
    if (path === "/robots.txt") return response.end(`Disallow: /api/\nSitemap: ${business.canonicalOrigin}/sitemap.xml`);
    if (path === "/manifest.webmanifest") {
      response.setHeader("Content-Type", "application/manifest+json");
      return response.end(JSON.stringify({ icons: [{ src: "/missing-icon.png" }] }));
    }
    const page = pageRegistry.find((entry) => entry.path === path);
    if (!page) return response.writeHead(404).end('<html><head><meta name="robots" content="noindex"></head><body>Missing</body></html>');
    const links = path === "/" ? published.map((entry) => `<a href="${entry.path}">${entry.title}</a>`).join("") : '<a href="/">Home</a>';
    response.setHeader("Content-Type", "text/html");
    response.end(`<html lang="nl-BE"><head><title>${page.title}</title><meta name="description" content="${page.description}"><link rel="canonical" href="${business.canonicalOrigin}${page.path}"><meta name="robots" content="${page.status === "published" ? "index" : "noindex"}, follow">${path === "/" ? '<link rel="manifest" href="/manifest.webmanifest">' : ""}</head><body><h1>${page.title}</h1>${links}</body></html>`);
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => server.close());
  const child = spawn(process.execPath, ["scripts/seo-audit.mjs", `http://127.0.0.1:${server.address().port}`], {
    cwd: new URL("..", import.meta.url), stdio: ["ignore", "pipe", "pipe"],
  });
  let output = "";
  child.stdout.on("data", (data) => { output += data; });
  child.stderr.on("data", (data) => { output += data; });
  const [code] = await once(child, "exit");
  assert.equal(code, 1);
  assert.match(output, /missing-icon\.png.*404/);
});
