export const auditExternalSources = async (sources, fetcher = fetch) => {
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
