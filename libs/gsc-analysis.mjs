// Local export analysis only: no account access, search-volume estimates or ranking promises.
export const parseCsv = (input) => {
  if (typeof input !== "string") throw new TypeError("CSV input must be text.");
  const text = input.replace(/^\uFEFF/, "");
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  let closed = false;
  const finishField = () => { row.push(field); field = ""; closed = false; };
  const finishRow = () => {
    finishField();
    if (!(row.length === 1 && row[0].trim() === "")) rows.push(row);
    row = [];
  };
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (quoted) {
      if (char === '"' && text[index + 1] === '"') { field += '"'; index += 1; }
      else if (char === '"') { quoted = false; closed = true; }
      else field += char;
    } else if (char === ",") finishField();
    else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[index + 1] === "\n") index += 1;
      finishRow();
    } else if (char === '"') {
      if (field !== "" || closed) throw new Error("Malformed CSV: unexpected quote.");
      quoted = true;
    } else if (closed) {
      if (char !== " " && char !== "\t") throw new Error("Malformed CSV: text after closing quote.");
    } else field += char;
  }
  if (quoted) throw new Error("Malformed CSV: unclosed quote.");
  if (field !== "" || row.length || closed) finishRow();
  return rows;
};

const normalizeHeader = (value) => value.trim().toLowerCase().normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
const headerAliases = {
  query: ["query", "queries", "topqueries", "zoekopdracht", "zoekopdrachten", "meestuitgevoerdezoekopdrachten"],
  page: ["page", "pages", "toppages", "pagina", "paginas", "url"],
  clicks: ["clicks", "click", "klikken", "aantalklikken"],
  impressions: ["impressions", "impression", "vertoningen", "aantalvertoningen"],
  ctr: ["ctr", "clickthroughrate", "klikfrequentie"],
  position: ["position", "averageposition", "positie", "gemiddeldepositie"],
};

const parseMetric = (raw, field, rowNumber) => {
  let value = String(raw).trim().replace(/[\s\u00a0\u202f]/g, "");
  const percentage = value.endsWith("%");
  if (percentage) value = value.slice(0, -1);
  if (percentage && field !== "ctr") throw new Error(`Row ${rowNumber}: ${field} cannot be a percentage.`);
  if (field === "clicks" || field === "impressions") {
    if (/^\d{1,3}([.,]\d{3})+$/.test(value)) value = value.replace(/[.,]/g, "");
    if (!/^\d+$/.test(value)) throw new Error(`Row ${rowNumber}: invalid integer ${field}.`);
  } else {
    if (value.includes(",") && value.includes(".")) {
      const decimal = value.lastIndexOf(",") > value.lastIndexOf(".") ? "," : ".";
      value = value.replace(decimal === "," ? /\./g : /,/g, "");
    }
    value = value.replace(",", ".");
    if (!/^\d+(?:\.\d+)?$/.test(value)) throw new Error(`Row ${rowNumber}: invalid ${field}.`);
  }
  let number = Number(value);
  if (!Number.isFinite(number) || number < 0) throw new Error(`Row ${rowNumber}: invalid ${field}.`);
  if ((field === "clicks" || field === "impressions") && !Number.isSafeInteger(number)) {
    throw new Error(`Row ${rowNumber}: ${field} is outside safe integer precision.`);
  }
  if (field === "ctr") {
    // Standard GSC exports use %. A bare 0..1 is a ratio; a bare >1..100 is a percentage.
    if (percentage || number > 1) number /= 100;
    if (number > 1) throw new Error(`Row ${rowNumber}: CTR exceeds 100%.`);
  }
  return number;
};

export const parseGscCsv = (csv, { kind } = {}) => {
  if (!["queries", "pages", "pairs"].includes(kind)) throw new Error("Choose CSV kind queries, pages or pairs.");
  const [header, ...rows] = parseCsv(csv);
  if (!header) throw new Error("CSV is empty; required columns are missing.");
  const indexes = {};
  for (const [index, label] of header.entries()) {
    const normalized = normalizeHeader(label);
    const canonical = Object.keys(headerAliases).find((key) => headerAliases[key].includes(normalized));
    if (canonical) {
      if (indexes[canonical] !== undefined) throw new Error(`Duplicate ${canonical} column.`);
      indexes[canonical] = index;
    }
  }
  const dimensions = kind === "queries" ? ["query"] : kind === "pages" ? ["page"] : ["query", "page"];
  for (const name of [...dimensions, "clicks", "impressions", "ctr", "position"]) {
    if (indexes[name] === undefined) throw new Error(`Missing required ${name} column for ${kind}.`);
  }
  if (kind !== "pairs" && indexes.query !== undefined && indexes.page !== undefined) {
    throw new Error("CSV contains both query and page; supply it as paired data.");
  }
  const seen = new Set();
  return rows.map((row, index) => {
    const rowNumber = index + 2;
    if (row.length !== header.length) throw new Error(`Row ${rowNumber}: inconsistent column count.`);
    const entry = {};
    for (const dimension of dimensions) {
      entry[dimension] = row[indexes[dimension]].trim();
      if (!entry[dimension]) throw new Error(`Row ${rowNumber}: empty ${dimension}.`);
    }
    if (entry.page) {
      let url;
      try { url = new URL(entry.page); } catch { throw new Error(`Row ${rowNumber}: invalid page URL.`); }
      if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) {
        throw new Error(`Row ${rowNumber}: invalid page URL.`);
      }
    }
    const key = JSON.stringify(dimensions.map((dimension) => entry[dimension]));
    if (seen.has(key)) throw new Error(`Row ${rowNumber}: duplicate ${dimensions.join("/ ")} dimensions; export a single aggregate table.`);
    seen.add(key);
    entry.clicks = parseMetric(row[indexes.clicks], "clicks", rowNumber);
    entry.impressions = parseMetric(row[indexes.impressions], "impressions", rowNumber);
    entry.exportedCtr = parseMetric(row[indexes.ctr], "ctr", rowNumber);
    entry.position = parseMetric(row[indexes.position], "position", rowNumber);
    if (entry.clicks > entry.impressions) throw new Error(`Row ${rowNumber}: clicks exceed impressions.`);
    if (entry.impressions === 0 && (entry.exportedCtr !== 0 || entry.position !== 0)) {
      throw new Error(`Row ${rowNumber}: nonzero CTR/position without impressions.`);
    }
    if (entry.impressions > 0 && entry.position === 0) throw new Error(`Row ${rowNumber}: position must be positive with impressions.`);
    entry.observedCtr = entry.impressions ? entry.clicks / entry.impressions : 0;
    return entry;
  });
};

export const isBrandQuery = (query) =>
  /(?:^|[^\p{L}\p{N}])ab[\s-]*service(?:24)?(?=$|[^\p{L}\p{N}])/iu.test(query);

const candidate = (row) => {
  const strikingDistance = row.position >= 8 && row.position <= 20;
  return {
    ...row,
    strikingDistance,
    priorityHeuristic: row.impressions * (1 - row.observedCtr) * (strikingDistance ? 2 : 1),
  };
};
const sortCandidates = (rows) => rows.sort((a, b) => b.priorityHeuristic - a.priorityHeuristic || b.impressions - a.impressions);
const tokens = (value) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .split(/[^a-z0-9]+/).filter((word) => word.length >= 3 && !["van", "een", "het", "voor", "met", "bij", "aan"].includes(word));

export const buildGscAnalysis = ({ queriesCsv, pagesCsv, pairsCsv, minImpressions = 10 } = {}) => {
  if (!Number.isSafeInteger(minImpressions) || minImpressions < 10) {
    throw new Error("minImpressions must be an integer of at least 10.");
  }
  const queries = parseGscCsv(queriesCsv, { kind: "queries" });
  const pages = parseGscCsv(pagesCsv, { kind: "pages" });
  const pairs = pairsCsv === undefined ? [] : parseGscCsv(pairsCsv, { kind: "pairs" });
  const eligible = (row) => row.impressions >= minImpressions && !isBrandQuery(row.query);
  const queryCandidates = sortCandidates(queries.filter(eligible).map(candidate));
  const pageCandidates = sortCandidates(pages.filter((row) => row.impressions >= minImpressions).map(candidate));
  const pairedCandidates = sortCandidates(pairs.filter(eligible).map((row) => ({ ...candidate(row), certainty: "observed-pair" })));
  const exactKeys = new Set(pairs.map((row) => JSON.stringify([row.query, row.page])));
  const inferredMatches = [];
  for (const query of queryCandidates) {
    const queryTokens = new Set(tokens(query.query));
    for (const page of pageCandidates) {
      if (exactKeys.has(JSON.stringify([query.query, page.page]))) continue;
      let path = new URL(page.page).pathname;
      try { path = decodeURIComponent(path); } catch { /* Keep the exported path when decoding fails. */ }
      const sharedTokens = [...new Set(tokens(path))].filter((word) => queryTokens.has(word));
      if (sharedTokens.length) inferredMatches.push({
        query: query.query,
        page: page.page,
        sharedTokens,
        certainty: "inferred",
        warning: "Lexical overlap only: query-to-page linkage is not observed and remains uncertain. No page totals are assigned to this query.",
      });
    }
  }
  return {
    method: {
      minImpressions,
      queryFilter: "Non-brand queries with at least the minimum observed impressions.",
      strikingDistance: "Observed average position 8 through 20 inclusive; not a guaranteed ranking or improvement.",
      priority: "Editorial heuristic: impressions × (1 − observed CTR) × 2 for position 8–20, otherwise × 1. This is a review order, not predicted clicks or a target CTR curve.",
      ctr: "Observed CTR = clicks / impressions. Exported CTR is retained separately because CSV percentages may be rounded. Bare CTR 0..1 is a ratio; bare >1..100 is a percentage.",
      pairing: "Only supplied CSV rows containing both query and page establish observed pairing. Independent-export lexical matches remain inferred.",
    },
    summary: { queryRows: queries.length, pageRows: pages.length, pairedRows: pairs.length, eligibleNonBrandQueries: queryCandidates.length },
    queryCandidates,
    highImpressionQueries: [...queryCandidates].sort((a, b) => b.impressions - a.impressions),
    pageCandidates,
    pairedCandidates,
    inferredMatches,
    limitations: [
      "Only the supplied export observations are analyzed. Date range, search type, country, device and filters must be recorded externally and aligned before comparison.",
      "Exported impressions are not keyword search volume. No keyword difficulty, traffic forecast, expected CTR or ranking improvement is invented.",
      "GSC anonymization and row/export limits mean query and page totals need not reconcile; separate exports do not prove query-to-page linkage.",
      "Clicks and contact interactions do not establish qualified leads, accepted work, revenue, current indexing or field Core Web Vitals.",
    ],
  };
};
