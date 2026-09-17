const brandService = (slug, brand, productFocus) =>
  Object.freeze({
    slug,
    brand,
    path: `/merken/${slug}`,
    productFocus,
    status: "published",
  });

export const brandServices = Object.freeze([
  brandService("vaillant", "Vaillant", "wandketels en cv-installaties van Vaillant"),
  brandService("bulex", "Bulex", "wandketels en cv-installaties van Bulex"),
  brandService("bosch", "Bosch", "cv-ketels en verwarmingssystemen van Bosch Home Comfort"),
  brandService("junkers", "Junkers", "courante en oudere Junkers cv-ketels"),
  brandService("remeha", "Remeha", "cv-ketels uit onder meer de Avanta-, Calenta-, Quinta- en Tzerra-reeksen"),
  brandService("buderus", "Buderus", "Logamax cv-ketels en andere Buderus verwarmingssystemen"),
  brandService("viessmann", "Viessmann", "Vitodens en andere Viessmann cv-ketels"),
  brandService("acv", "ACV", "Prestige, HeatMaster en andere ACV verwarmingssystemen"),
  brandService("intergas", "Intergas", "Intergas cv-ketels, afhankelijk van model en onderdelenbeschikbaarheid"),
  brandService("nefit-bosch", "Nefit Bosch", "Nefit Bosch cv-ketels, waaronder toestellen uit de ProLine-reeks"),
  brandService("atag", "ATAG", "ATAG cv-ketels en bijbehorende verwarmingsinstallaties"),
  brandService("itho-daalderop", "Itho Daalderop", "Itho Daalderop cv-ketels en warmwatertoestellen"),
  brandService("ferroli", "Ferroli", "Ferroli cv-ketels, waaronder toestellen uit de BlueSense-reeks"),
]);

export const getBrandService = (slug) =>
  brandServices.find((entry) => entry.slug === slug);
