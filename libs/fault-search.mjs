import { buildFaultCodeAliases } from "./fault-code-aliases.mjs";

const normalize = (value) => value
  .toLocaleLowerCase("nl-BE")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[:.\s/_-]+/g, "");

const matchesNumberedIdentifier = (meaning, query) => {
  const identifiers = meaning.match(/\b(?:[a-z]{1,3}[\s:._-]*\d+|\d+[a-z]{1,3}(?:[\s:._-]*\d+)?)(?:[.:_-]\d+)*\b/gi) || [];
  return identifiers.some((identifier) => normalize(identifier) === query);
};

export const filterFaultCatalogs = (catalogs, query, catalogId = "all") => {
  const normalizedQuery = normalize(query.trim());
  const selectedCatalogs = catalogs.filter((catalog) => catalogId === "all" || catalog.id === catalogId);
  // Short manufacturer prefixes cover spaced codes without treating "sensor 2" as a code.
  const isCodeShaped = /^(?:[a-z]{1,3})?\d+(?:[a-z]{1,3}\d*)?$/.test(normalizedQuery);
  // EA also names a browsable letter family, even in catalogs with a standalone EA row.
  const isKnownAlias = normalizedQuery && normalizedQuery !== "ea" && selectedCatalogs.some((catalog) =>
    catalog.codes.some((entry) => buildFaultCodeAliases(entry.code).some((alias) => normalize(alias) === normalizedQuery))
  );

  return selectedCatalogs
    .map((catalog) => ({
      ...catalog,
      codes: catalog.codes.filter((entry) => !normalizedQuery || (isKnownAlias
        ? buildFaultCodeAliases(entry.code).some((alias) => normalize(alias) === normalizedQuery)
        : isCodeShaped
          ? matchesNumberedIdentifier(entry.meaning, normalizedQuery)
          : normalize(`${entry.searchTerms} ${entry.meaning}`).includes(normalizedQuery))),
    }))
    .filter((catalog) => catalog.codes.length > 0);
};
