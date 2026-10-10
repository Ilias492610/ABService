// Independent inventory: genuine manufacturer PDF, NL chapter 11, actual code column.
// Expected values never import product catalogs. PDF and printed pages coincide.
export const sourceFacts = Object.freeze({
  productUrl: "https://www.remeha.be/product/calenta-ace-matic",
  sourceUrl: "https://edge.sitecorecloud.io/bdrthermea1-platform-production-864a/media/Project/RemehaBE/RemehaBE/Documentatie/Consument/01---Gasketels/Calenta-Ace-Matic/NL/ML-ISM-7871265-04-Calenta-Ace-Matic.pdf",
  revision: "7871265-05-04072025",
  sha256: "c58f444fde56791dfecf1676417fe165277f9a46ed4a09f751218e3abc8b59be",
  models: Object.freeze(["25s", "35s", "30c", "40c"]),
  market: "België en Luxemburg",
  language: "nl",
});

// Before adding Ace-Matic: exact legacy catalogs, including meanings/actions/scopes.
export const legacyCatalogDigest = "4fc8cb3b77ed93c97e7b68999218e11b0fba541d443f8edfb9f5cec4e160a4e7";

export const sourceTables = [
  {
    id: "remeha-calenta-ace-matic-cu-warnings", component: "CU-GH-21", table: 227,
    pages: "369", count: 18, status: /waarschuwingen/i,
    codes: [
      "A00.34", "A02.06", "A02.18", "A02.33", "A02.34", "A02.36", "A02.37", "A02.45", "A02.46", "A02.48", "A02.49", "A02.55", "A02.76", "A02.80", "A05.29", "A05.30", "A05.95", "A08.02",
    ],
  },
  {
    id: "remeha-calenta-ace-matic-cu-blocking", component: "CU-GH-21", table: 228,
    pages: "370–373", count: 41, status: /tijdelijke blokkeringen/i,
    codes: [
      "H00.42", "H00.81", "H01.00", "H01.05", "H01.08", "H01.09", "H01.14", "H01.18", "H01.21",
      "H01.26", "H02.00", "H02.02", "H02.03", "H02.04", "H02.05", "H02.07", "H02.12", "H02.31", "H02.38", "H02.70", "H02.91",
      "H02.92", "H02.93", "H03.00", "H03.01", "H03.02", "H03.05", "H03.08", "H03.09", "H03.17", "H03.26", "H03.28", "H03.31", "H03.45",
      "H03.54", "H03.254", "H08.07", "H08.09", "H20.36", "H20.39", "H20.40",
    ],
  },
  {
    id: "remeha-calenta-ace-matic-cu-locking", component: "CU-GH-21", table: 229,
    pages: "373–377", count: 47, status: /permanente storingen/i,
    codes: [
      "E00.04", "E00.05", "E00.06", "E00.07",
      "E00.16", "E00.17", "E00.40", "E00.41", "E00.44", "E00.45", "E01.12", "E01.17", "E01.20", "E02.13", "E02.15", "E02.17", "E02.32",
      "E02.35", "E02.39", "E02.47", "E04.00", "E04.01", "E04.02", "E04.03", "E04.04", "E04.05", "E04.06", "E04.07", "E04.10", "E04.11", "E04.12",
      "E04.13", "E04.14", "E04.15", "E04.17", "E04.18", "E04.23", "E04.24", "E04.25",
      "E04.26", "E04.27", "E04.28", "E04.29", "E04.50", "E04.54", "E04.250", "E04.254",
    ],
  },
  {
    id: "remeha-calenta-ace-matic-scb-warnings", component: "SCB-10", table: 230,
    pages: "378–382", count: 60, status: /waarschuwingen/i,
    codes: [
      "A.00.00", "A.00.01", "A.00.28", "A.00.29", "A.00.30", "A.00.32", "A.00.33", "A.00.34", "A.00.40", "A.00.41", "A.00.42", "A.00.69", "A.00.70",
      "A.00.74", "A.00.81", "A.00.109", "A.00.110", "A.00.111", "A.00.112", "A.00.113", "A.00.114", "A.01.21", "A.01.23", "A.02.06", "A.02.18",
      "A.02.33", "A.02.34", "A.02.36", "A.02.37", "A.02.45", "A.02.46", "A.02.48", "A.02.49", "A.02.54", "A.02.55", "A.02.69", "A.02.76", "A.02.80", "A.02.85", "A.03.17",
      "A.05.29", "A.05.30", "A.05.77", "A.05.79", "A.05.90", "A.05.93", "A.05.95", "A.08.02", "A.08.06", "A.10.33", "A.10.45", "A.10.46", "A.10.47", "A.10.50", "A.10.54",
      "A.10.56", "A.21.01", "A.21.02", "A.21.05", "A.21.06",
    ],
  },
  {
    id: "remeha-calenta-ace-matic-scb-blocking", component: "SCB-10", table: 231,
    pages: "382–392", count: 134, status: /tijdelijke blokkeringen/i,
    codes: [
      "H.00.00", "H.00.01", "H.00.02", "H.00.04", "H.00.05", "H.00.06", "H.00.16", "H.00.17",
      "H.00.18", "H.00.28", "H.00.29", "H.00.30", "H.00.36", "H.00.37", "H.00.42", "H.00.69", "H.00.70", "H.00.71", "H.00.72", "H.00.74",
      "H.00.75", "H.00.76", "H.00.77", "H.00.78", "H.00.79", "H.00.80", "H.00.81", "H.00.105", "H.00.106", "H.00.107",
      "H.00.108", "H.01.00", "H.01.05", "H.01.06", "H.01.07", "H.01.08", "H.01.09",
      "H.01.13", "H.01.14", "H.01.15", "H.01.18", "H.01.21", "H.02.00", "H.02.02", "H.02.03", "H.02.04", "H.02.05", "H.02.07", "H.02.09", "H.02.10", "H.02.12", "H.02.15", "H.02.16",
      "H.02.18", "H.02.31", "H.02.36", "H.02.38", "H.02.40", "H.02.45", "H.02.46", "H.02.47", "H.02.48", "H.02.49", "H.02.50", "H.02.55", "H.02.60", "H.02.61", "H.02.62", "H.02.63", "H.02.64", "H.02.65", "H.02.66", "H.02.67",
      "H.02.70", "H.02.79", "H.02.80", "H.02.84", "H.03.00", "H.03.01", "H.03.02", "H.03.05", "H.03.07", "H.03.08", "H.03.09", "H.03.17", "H.03.26", "H.03.28", "H.03.31", "H.03.32", "H.03.33", "H.03.34", "H.03.35", "H.03.36",
      "H.03.37", "H.03.38", "H.03.39", "H.03.40", "H.03.41", "H.03.254", "H.08.07", "H.08.08", "H.08.09", "H.10.00", "H.10.01", "H.10.02", "H.10.03", "H.10.04", "H.10.05",
      "H.10.09", "H.10.10", "H.10.11", "H.10.12", "H.10.13", "H.10.14", "H.10.18", "H.10.19", "H.10.20",
      "H.10.21", "H.10.22", "H.10.23", "H.10.27", "H.10.28", "H.10.29", "H.10.30", "H.10.36", "H.10.37",
      "H.10.38", "H.10.39", "H.10.59", "H.20.36", "H.20.39", "H.20.40", "H.21.00", "H.21.07",
    ],
  },
];
