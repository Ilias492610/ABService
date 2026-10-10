import { business } from "../content/business.mjs";
import { indexNow } from "../content/indexnow.mjs";
import { CONTENT_STATUS, pageRegistry } from "../content/site-content.mjs";

export function buildIndexNowPayload(paths) {
  if (!Array.isArray(paths) || paths.length === 0 || paths.length > 10_000) {
    throw new Error("Geef 1 tot 10.000 expliciete gepubliceerde paden op.");
  }
  const published = new Set(pageRegistry
    .filter((page) => page.status === CONTENT_STATUS.PUBLISHED)
    .map((page) => page.path));
  if (Array.from(paths).some((path) => typeof path !== "string" || !published.has(path))) {
    throw new Error("Alleen exacte gepubliceerde paden zonder query of fragment zijn toegestaan.");
  }
  const origin = business.canonicalOrigin;
  return {
    host: new URL(origin).host,
    key: indexNow.key,
    keyLocation: `${origin}/${indexNow.key}.txt`,
    urlList: [...new Set(paths)].map((path) => `${origin}${path}`),
  };
}

export async function submitIndexNow(paths, { fetcher = fetch } = {}) {
  // Validate before any external request, including the ownership preflight.
  const payload = buildIndexNowPayload(paths);
  const proof = await fetcher(payload.keyLocation, {
    method: "GET",
    redirect: "error",
    signal: AbortSignal.timeout(15_000),
  });
  if (proof.status !== 200 || !/^text\/plain(?:\s*;|$)/i.test(proof.headers.get("content-type") || "")) {
    await proof.body?.cancel();
    throw new Error("IndexNow-bewijs is niet rechtstreeks beschikbaar als tekstbestand.");
  }
  if ((await proof.text()).trim() !== payload.key) {
    throw new Error("IndexNow-bewijs komt niet overeen; er is niets verstuurd.");
  }
  const response = await fetcher(indexNow.endpoint, {
    method: "POST",
    redirect: "error",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(15_000),
  });
  await response.body?.cancel();
  if (![200, 202].includes(response.status)) {
    throw new Error(`IndexNow antwoordde HTTP ${response.status}; geen automatische herhaling.`);
  }
  return {
    httpStatus: response.status,
    state: response.status === 200 ? "received" : "key-verification-pending",
    urlCount: payload.urlList.length,
  };
}
