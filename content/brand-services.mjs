const brandService = (slug, brand, productFocus, requestNote) =>
  Object.freeze({
    slug,
    brand,
    path: `/merken/${slug}`,
    productFocus,
    requestNote,
    status: "published",
  });

export const brandServices = Object.freeze([
  brandService(
    "vaillant",
    "Vaillant",
    "wandketels en cv-installaties van Vaillant",
    "Noteer de volledige code inclusief de letter F, voorloopnullen en punten. Vermeld ook of het om een ecoTEC-reeks of een ander model gaat; dezelfde cijfercombinatie is niet automatisch universeel."
  ),
  brandService(
    "bulex",
    "Bulex",
    "wandketels en cv-installaties van Bulex",
    "Bezorg de exacte toestelnaam, bijvoorbeeld de volledige THEMA- of andere reeksnaam, en neem punten en letters uit de displaycode letterlijk over."
  ),
  brandService(
    "bosch",
    "Bosch",
    "cv-ketels en verwarmingssystemen van Bosch Home Comfort",
    "Bij Bosch is de generatie belangrijk. Stuur daarom naast de displaycode ook een foto van het typeplaatje, zodat Serie 7000i, 9000i, Cerapur Maxx en oudere generaties niet door elkaar worden gehaald."
  ),
  brandService(
    "junkers",
    "Junkers",
    "courante en oudere Junkers cv-ketels",
    "Oudere Junkers-toestellen kunnen codes delen met Bosch-documentatie, maar de betekenis blijft modelafhankelijk. Vermeld toestelnaam, bouwjaar indien bekend en eventuele subcode."
  ),
  brandService(
    "remeha",
    "Remeha",
    "cv-ketels uit onder meer de Avanta-, Calenta-, Quinta- en Tzerra-reeksen",
    "Schrijf de volledige Remeha-reeks en code over. Een melding uit de Avanta Storingswijzer mag niet zonder modelcontrole worden toegepast op Calenta, Quinta of Tzerra."
  ),
  brandService(
    "buderus",
    "Buderus",
    "Logamax cv-ketels en andere Buderus verwarmingssystemen",
    "Buderus kan een hoofdcode en aanvullende servicecode tonen. Fotografeer beide schermen en noteer de volledige Logamax-modelaanduiding."
  ),
  brandService(
    "viessmann",
    "Viessmann",
    "Vitodens en andere Viessmann cv-ketels",
    "Vermeld naast Vitodens-model en foutcode ook het product- of serienummer van het typeplaatje. Viessmann-documentatie wordt per productcode en regeling afgebakend."
  ),
  brandService(
    "acv",
    "ACV",
    "Prestige, HeatMaster en andere ACV verwarmingssystemen",
    "Maak duidelijk of het om Prestige, HeatMaster of een andere ACV-reeks gaat. Neem de volledige E-code en de zichtbare regel- of displayversie mee in de aanvraag."
  ),
  brandService(
    "intergas",
    "Intergas",
    "Intergas cv-ketels, afhankelijk van model en onderdelenbeschikbaarheid",
    "Vermeld het exacte Intergas-model en de getoonde numerieke code. Planning en onderdelen worden vooraf beoordeeld, zeker bij oudere of minder courante toestellen."
  ),
  brandService(
    "nefit-bosch",
    "Nefit Bosch",
    "Nefit Bosch cv-ketels, waaronder toestellen uit de ProLine-reeks",
    "Noteer bij een Nefit Bosch-toestel zowel de hoofdcode als eventuele aanvullende cijfers en vermeld de volledige ProLine- of andere reeksnaam."
  ),
  brandService(
    "atag",
    "ATAG",
    "ATAG cv-ketels en bijbehorende verwarmingsinstallaties",
    "Geef de exacte ATAG-typeaanduiding en volledige letter-cijfercode door. Het openbare overzicht omvat meerdere modellen en vervangt geen modelspecifieke diagnose."
  ),
  brandService(
    "itho-daalderop",
    "Itho Daalderop",
    "Itho Daalderop cv-ketels en warmwatertoestellen",
    "Stuur een foto van het productlabel en vermeld of het toestel bijvoorbeeld uit de Base Cube-reeks komt. Waarschuwingen, blokkeringen en storingen zijn verschillende meldingsniveaus."
  ),
  brandService(
    "ferroli",
    "Ferroli",
    "Ferroli cv-ketels, waaronder toestellen uit de BlueSense-reeks",
    "Neem bij Ferroli de letter A of F en alle cijfers exact over en vermeld de volledige toestelreeks. De openbare catalogus op deze site is specifiek afgebakend tot BlueSense."
  ),
]);

export const getBrandService = (slug) =>
  brandServices.find((entry) => entry.slug === slug);
