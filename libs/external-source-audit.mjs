import { request as httpRequest } from "node:http";
import { request as httpsRequest } from "node:https";

const fetchSource = (href, options, redirects = 0) => new Promise((resolve, reject) => {
  const url = new URL(href);
  if (!["https:", "http:"].includes(url.protocol)) return reject(new Error("Unsupported source protocol"));
  const request = (url.protocol === "https:" ? httpsRequest : httpRequest)(url, {
    method: "GET", headers: options.headers, signal: options.signal,
    // Vendor consent/cookie headers can exceed Node fetch's default 16 KiB limit.
    maxHeaderSize: 128 * 1024,
  }, (response) => {
    const status = response.statusCode || 0;
    const location = response.headers.location;
    response.destroy();
    if (status >= 300 && status < 400 && location) {
      if (redirects >= 5) return reject(new Error("Source redirect limit exceeded"));
      return resolve(fetchSource(new URL(location, url).href, options, redirects + 1));
    }
    resolve({ status });
  });
  request.on("error", reject);
  request.end();
});

export const auditExternalSources = async (sources, fetcher = fetchSource) => {
  const seen = new Set();
  const uniqueSources = sources.filter((source) => {
    if (seen.has(source.href)) return false;
    seen.add(source.href);
    return true;
  });
  const results = [];

  for (const source of uniqueSources) {
    try {
      const response = await fetcher(source.href, {
        method: "GET",
        redirect: "follow",
        headers: { "User-Agent": "ABServiceSourceAudit/1.0" },
        signal: AbortSignal.timeout(20_000),
      });
      results.push({
        label: source.label,
        href: source.href,
        status: response.status,
        ok: response.status >= 200 && response.status < 400,
      });
    } catch (error) {
      results.push({
        label: source.label,
        href: source.href,
        status: 0,
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return results;
};
