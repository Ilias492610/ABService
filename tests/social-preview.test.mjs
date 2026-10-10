import test from "node:test";
import assert from "node:assert/strict";
import * as previews from "../libs/social-preview.mjs";
import { renderToStaticMarkup } from "react-dom/server";
import { ImageResponse } from "next/og.js";

test("preview lookup exposes registered published pages only, without interpreting supplied paths", () => {
  assert.equal(previews.getSocialPreviewPage?.(["projecten", "gasketel-vervangen"])?.title,
    "Verouderde gasketel vervangen en installatie ingeregeld | AB Service");
  for (const slug of [undefined, [], ["installaties", "airconditioning"], ["niet-bestaand"], ["projecten/gasketel-vervangen"], ["..", "contact"], ["contact", ""], ["contact?naam=Test"]]) {
    assert.equal(previews.getSocialPreviewPage?.(slug), null);
  }
});

test("preview card renders the actual topic and produces a bounded 1200 by 630 PNG", async () => {
  const { SocialPreviewCard } = await import("../components/social-preview-card.mjs");
  const page = previews.getSocialPreviewPage(["projecten", "gasketel-vervangen"]);
  const card = SocialPreviewCard({ page });
  const markup = renderToStaticMarkup(card);
  assert.ok(markup.includes("Verouderde gasketel vervangen en installatie ingeregeld"));
  assert.ok(markup.includes("Praktijkcase"));
  assert.ok(markup.includes("AB Service"));
  assert.ok(!markup.includes("<img"));
  const response = new ImageResponse(card, { width: 1200, height: 630 });
  assert.equal(response.headers.get("content-type"), "image/png");
  const png = Buffer.from(await response.arrayBuffer());
  assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
  assert.ok(png.length < 150_000);
});

test("advice and longer titles render their own wording rather than generic company-only copy", async () => {
  const { SocialPreviewCard } = await import("../components/social-preview-card.mjs");
  const page = previews.getSocialPreviewPage(["advies", "onderhoudsattest-cv-ketel"]);
  const markup = renderToStaticMarkup(SocialPreviewCard({ page }));
  assert.ok(markup.includes("Advies"));
  assert.ok(markup.includes(previews.getSocialPreviewTitle(page)));
});
