export const heroMarker = '<section class="page-hero fault-guide-hero">';
export const beforeFaultHeroHtml = html => html.replace(heroMarker, '<section class="page-hero">');
export const intergasCountBefore = "De drie gegroepeerde bronregels blijven samen en hun 20 genummerde meldingen zijn afzonderlijk doorzoekbaar.";
export const intergasCountAfter = "De 11 bronregels bevatten samen 20 afzonderlijk doorzoekbare genummerde meldingen. De drie gegroepeerde bronregels blijven samen; die bevatten samen 12 van deze meldingen.";
export const beforeIntergasCountGuide = guide => guide.slug !== "intergas" ? guide : {
  ...guide, catalogs: guide.catalogs.map(c => ({ ...c, scope: c.scope.replace(intergasCountAfter, intergasCountBefore) })),
};
