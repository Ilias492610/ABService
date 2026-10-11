// Independently transcribed from the official source evidence read on 2026-10-11.
// Ignored evidence: wp07-{vaillant,bulex}-source-revalidation.md and their
// complete primary HTML/PDF extracts. These literals do not import production data.
// Vaillant's pypdf/Poppler inventories agree (12 HTML + 78 PDF); Bulex's
// primary web body and pypdf/pdfplumber inventories agree (14 HTML + 29 PDF).
// Document dates describe the printed revisions, not the date of this check.
export const sourceFacts = [
  {
    brand: "vaillant",
    id: "vaillant-publiek-overzicht",
    url: "https://www.vaillant.be/nl/advies/helpcentrum/foutcodes-ketel/",
    pages: "Online overzicht",
    codes: ["F.13", "F.20", "F.22", "F.23", "F.25", "F.27", "F.28", "F.29", "F.33", "F.61", "F.62", "F.75"],
  },
  {
    brand: "vaillant",
    id: "vaillant-ecotec-plus-cs",
    url: "https://support.vaillant.be/downloads/documenten/installatievoorschrift/0020282230-00-2764886.pdf",
    pages: "Bijlage D, p. 225-236",
    revision: "0020282230_00",
    printedDate: "02.05.2023",
    applicabilityPage: 180,
    pdfSha256: "9bdff233945a99dec524689293699382381814c02694e10fb9d8cb770325d938",
    models: [
      ["VC 15CS/1-5 (N-BE)", "0010024567"],
      ["VC 25CS/1-5 (N-BE)", "0010024568"],
      ["VC 35CS/1-5 (N-BE)", "0010024569"],
      ["VCW 32CS/1-5 (N-BE)", "0010024570"],
      ["VCW 36CS/1-5 (N-BE)", "0010024571"],
      ["VCW 40CS/1-5 (N-BE)", "0010024572"],
      ["VC 25CS/1-5 (P-BE)", "0010039097"],
      ["VCW 32CS/1-5 (P-BE)", "0010039098"],
      ["VCW 36CS/1-5 (P-BE)", "0010039099"],
    ],
    codes: [
      "F.000", "F.001", "F.002", "F.003", "F.010", "F.011", "F.012", "F.013",
      "F.020", "F.022", "F.023", "F.024", "F.025", "F.027", "F.028", "F.029",
      "F.032", "F.035", "F.040", "F.042", "F.044", "F.047", "F.049", "F.057",
      "F.061", "F.062", "F.063", "F.064", "F.065", "F.067", "F.068", "F.070",
      "F.071", "F.072", "F.074", "F.075", "F.076", "F.077", "F.078", "F.080",
      "F.081", "F.083", "F.084", "F.085", "F.087", "F.088", "F.089", "F.090",
      "F.092", "F.095", "F.096", "F.097", "F.105", "F.194", "F.195", "F.196",
      "F.317", "F.318", "F.320", "F.321", "F.322", "F.323", "F.324", "F.325",
      "F.326", "F.327", "F.330", "F.334", "F.336", "F.337", "F.338", "F.342",
      "F.343", "F.344", "F.347", "F.363", "F.707", "F.905",
    ],
  },
  {
    brand: "bulex",
    id: "bulex-publiek-overzicht",
    url: "https://www.bulex.be/particulier/diensten/foutcodes/",
    pages: "Online overzicht",
    // Body proof is the successful complete primary web reader, not the
    // direct HTTP 200 response whose body was Request Rejected.
    codes: ["F.1", "F.4", "F.5", "F.13", "F.14", "F.20", "F.23", "F.24", "F.28", "F.29", "F.54", "F.72", "F.75", "F.76"],
  },
  {
    brand: "bulex",
    id: "bulex-thema-condens",
    url: "https://www.bulex.be/themacondens/0020124551-02-1746869.pdf",
    pages: "Bijlage D, p. 37-38",
    revision: "0020124551_02",
    printedDate: "27.02.2015",
    marketLanguage: "BEnl",
    applicabilityPage: 10,
    pdfSha256: "bf04e261d24021cd9cb61431a8dce60d5728b236f9e70a3ac2b4663829977c1b",
    models: [["THEMA Condens FAS 65", "0010010389"]],
    codes: [
      "F.0", "F.1", "F.10", "F.11", "F.13", "F.20", "F.22", "F.23", "F.24",
      "F.25", "F.27", "F.28", "F.29", "F.32", "F.49", "F.61", "F.62",
      "F.63", "F.64", "F.65", "F.67", "F.70", "F.71", "F.72", "F.73",
      "F.74", "F.75", "F.77", "con",
    ],
  },
];
