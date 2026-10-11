// Independently read literal code column: official 0020109430_06, 06/13,
// §13.3, printed33–34/PDF35–36. Primary pixels and independent cell inventory
// retained under Task48; expectations never import production catalog data.
export const themaABFacts = {
  id: "bulex-thema-condens-ab",
  url: "https://www.bulex.be/themacondens/0020109430-06-1746866.pdf",
  sha256: "51d1fe0f4d8f352a456804e2acd8392e5140513ebfa407ae47ec95caec7dbd91",
  revision: "0020109430_06",
  issue: "06/13",
  pages: "§ 13.3, p. 33-34",
  models: ["F AS 12-A", "F AS 25-A", "F AS 30-A", "F AS 30-B", "F 25/30-A", "F 30/35-A", "F 25/30-B", "F 30/35-B"],
  codes: ["F22", "F83", "F28", "F29", "F 68", "F32", "F20", "F00", "F10", "F73", "F74", "F01", "F11", "F49", "F61", "F62", "F63", "F64", "F65", "F26", "F77", "F27", "F71", "F70", "F24", "F23", "F72", "F84", "F76", "F85", "F86"],
};

// The previous warning is retained literally for exact historical projection.
export const beforeThemaABWarning = "Deze catalogus bevat alle codes uit het officiële Belgische consumentenoverzicht en de volledige tabel uit 0020124551_02 voor uitsluitend THEMA Condens FAS 65, artikelnummer 0010010389, BEnl. Andere THEMA-varianten en revisies zijn niet gedekt. Dezelfde code kan per bron een andere betekenis hebben. Controleer het typeplaatje en de gebruikershandleiding van uw exacte toestel voordat u een betekenis toepast.";

export const themaABWarning = "Deze catalogus bevat het officiële Belgische consumentenoverzicht, de aparte tabel uit 0020124551_02 voor uitsluitend THEMA Condens FAS 65, artikelnummer 0010010389, BEnl, en de 31 genummerde codes uit historische handleiding 0020109430_06 (06/13) voor de acht hieronder genoemde THEMA Condens A/B-varianten. Andere THEMA-varianten en revisies zijn niet gedekt. F54 staat alleen in het algemene consumentenoverzicht, niet in deze twee modeltabellen. Dezelfde code kan per bron een andere betekenis hebben. Controleer het typeplaatje en de gebruikershandleiding van uw exacte toestel voordat u een betekenis toepast.";

export const themaABScope = "Historische installatiehandleiding 0020109430_06 (06/13), Nederlandse §13.3: alle 31 genummerde codes op p. 33-34. Alleen THEMA Condens F AS 12-A, F AS 25-A, F AS 30-A, F AS 30-B, F 25/30-A, F 30/35-A, F 25/30-B en F 30/35-B. De technische tabellen noemen BE/LU voor de aardgasvarianten en BE voor de propaanvarianten; controleer de bestemming en gasvariant van uw eigen toestel. Geen bewijs van de nieuwste revisie of firmwarecompatibiliteit; FAS 65 en andere varianten zijn niet inbegrepen. Vier regels met een streepje en één lege codecel krijgen hier geen verzonnen nummer. F54 en F67 staan niet in deze tabel; dat bewijst niet dat elke toestelvariant die codes nooit kan tonen. De technische behandeling is voor een bevoegde technicus; onderstaande eerste stappen zijn alleen veilige observaties. Controleer het typeplaatje en de gebruikershandleiding van uw exacte toestel.";

// Remove ONLY the source addition approved in Task48. Original Task46 captures
// remain unchanged; unrelated Bulex/other-brand markup still changes the hash.
export const beforeThemaABGuide = (guide) => guide.slug !== "bulex" ? guide : {
  ...guide,
  modelWarning: beforeThemaABWarning,
  catalogs: guide.catalogs.slice(0, 2),
  codeEntryCount: guide.codeEntryCount - (guide.catalogs[2]?.codes.length || 0),
  codes: guide.codes.slice(0, 43),
};

export const beforeThemaABHtml = (html) => html
  .replace(themaABWarning, beforeThemaABWarning)
  .replace('<p class="eyebrow">74 brongebonden codeverklaringen</p>', '<p class="eyebrow">43 brongebonden codeverklaringen</p>')
  .replace('<p class="fault-result-count" aria-live="polite">74 codeverklaringen zichtbaar</p>', '<p class="fault-result-count" aria-live="polite">43 codeverklaringen zichtbaar</p>')
  .replace('<option value="bulex-thema-condens-ab">THEMA Condens A/B (06/13)</option>', "")
  .replace(/<section class="fault-group" aria-labelledby="bulex-thema-condens-ab-title">[\s\S]*?<\/section>/, "");
