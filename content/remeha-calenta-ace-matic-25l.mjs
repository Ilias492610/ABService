import { calentaAceMaticCatalogs } from "./remeha-calenta-ace-matic.mjs";

export const calentaAceMatic25LSource = Object.freeze({
  productUrl: "https://www.remeha.be/product/calenta-ace-matic",
  sourceUrl: "https://edge.sitecorecloud.io/bdrthermea1-platform-production-864a/media/Project/RemehaBE/RemehaBE/Documentatie/Consument/01---Gasketels/Calenta-Ace-Matic/NL/7871254-Calenta-Ace-Matic-25L-ISM-SCB10-BE-de-fr-nl.pdf",
  revision: "7871254-04-04072025",
  sha256: "415d7c7523048df22196e153c534008140f8c0eb378d6ce7c21fe929bd4490db",
  models: Object.freeze(["25L"]),
  market: "België en Luxemburg",
  language: "nl",
});

// Both actual PDF code, description AND installer columns were independently
// compared row by row: these five NL tables match exactly. Reuse only the
// reviewed explanations/safe actions, not the other model's source or scope.
// This does not establish firmware, configuration or cross-generation coverage.
const tables = [
  ["cu-warnings", "CU-GH-21", 224, "346"],
  ["cu-blocking", "CU-GH-21", 225, "347–350"],
  ["cu-locking", "CU-GH-21", 226, "350–354"],
  ["scb-warnings", "SCB-10", 227, "355–359"],
  ["scb-blocking", "SCB-10", 228, "359–369"],
];

export const calentaAceMatic25LCatalogs = Object.freeze(tables.map(([suffix, component, table, pages]) => {
  const reviewed = calentaAceMaticCatalogs.find(({ id }) => id === `remeha-calenta-ace-matic-${suffix}`);
  const sourcePages = `NL tabel ${table}, p. ${pages}`;
  return Object.freeze({
    id: `remeha-calenta-ace-matic-25l-${suffix}`,
    title: reviewed.title.replace("Calenta Ace-Matic", "Calenta Ace-Matic 25L"),
    scope: `Deze tabel geldt uitsluitend voor Calenta Ace-Matic 25L voor België en Luxemburg, revisie 7871254-04-04072025, component ${component}, NL tabel ${table}. ${component === "SCB-10" ? "Alleen voor een aanwezige SCB-10-uitbreiding met de betrokken aangesloten componenten. " : "Codes van de SCB-10-uitbreiding staan afzonderlijk. "}Niet voor 25s/35s/30c/40c, Calenta Ace, legacy Calenta, Avanta, Tzerra, Quinta of andere revisies. Controleer het typeplaatje en de configuratie; dit is geen overzicht van alle Remeha-codes.`,
    sourceLabel: "Remeha België — Calenta Ace-Matic 25L installatie- en servicehandleiding 7871254-04-04072025",
    sourceUrl: calentaAceMatic25LSource.sourceUrl,
    sourcePages,
    codes: Object.freeze(reviewed.codes.map((entry) => Object.freeze({ ...entry, sourcePage: sourcePages }))),
  });
}));
