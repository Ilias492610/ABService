const normalize = (value) => value
  .toLocaleLowerCase("nl-BE")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[:.\s/_-]+/g, "");

export const filterFaultCatalogs = (catalogs, query, catalogId = "all") => {
  const normalizedQuery = normalize(query.trim());
  return catalogs
    .filter((catalog) => catalogId === "all" || catalog.id === catalogId)
    .map((catalog) => ({
      ...catalog,
      codes: catalog.codes.filter((entry) => !normalizedQuery || normalize(`${entry.searchTerms} ${entry.meaning}`).includes(normalizedQuery)),
    }))
    .filter((catalog) => catalog.codes.length > 0);
};
