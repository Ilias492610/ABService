const ownerPhoto = (src, width, height, alt) =>
  Object.freeze({
    src,
    width,
    height,
    alt,
    ownerConfirmed: true,
    sourceType: "owner-archive",
    role: "owned-photo",
    projectEvidence: true,
  });

const ownerMarketingPhoto = (src, alt) =>
  Object.freeze({
    src,
    width: 1280,
    height: 960,
    alt,
    ownerConfirmed: true,
    sourceType: "owner-archive",
    role: "owned-photo",
    projectEvidence: true,
  });

export const contentImages = Object.freeze({
  maintenance: ownerPhoto(
    "/media/onderhoud-cv.webp",
    1024,
    1024,
    "AB Service voert onderhoud uit aan een cv-ketel"
  ),
  repair: ownerPhoto(
    "/media/herstelling-verwarming.webp",
    1024,
    1024,
    "AB Service onderzoekt een cv-installatie"
  ),
  installation: ownerPhoto(
    "/media/installatie-verwarming.webp",
    1024,
    1024,
    "Installatiewerk voor verwarming door AB Service"
  ),
  gasBoiler: ownerPhoto(
    "/media/gasketel-installatie.webp",
    1024,
    1536,
    "Wandgemonteerde gasketel bij installatiewerk"
  ),
  sanitary: ownerPhoto(
    "/media/sanitair-leidingwerk.webp",
    1024,
    1024,
    "Sanitaire installatie en leidingwerk door AB Service"
  ),
  pressureLoss: ownerPhoto(
    "/media/drukverlies-controle.webp",
    1280,
    853,
    "Controle van een verwarmingsinstallatie bij een storing"
  ),
  inspection: ownerPhoto(
    "/media/keuring-cv.webp",
    1280,
    853,
    "Controle aan een verwarmingsinstallatie door AB Service"
  ),
  boilerServiceMarketing: ownerMarketingPhoto(
    "/media/marketing-ketelservice.webp",
    "AB Service werkt aan een wandketel"
  ),
  sanitaryMarketing: ownerMarketingPhoto(
    "/media/marketing-sanitair.webp",
    "AB Service voert sanitaire werkzaamheden uit aan een wastafel"
  ),
  customerAdviceMarketing: ownerMarketingPhoto(
    "/media/marketing-klantadvies.webp",
    "AB Service geeft uitleg over een verwarmingsinstallatie"
  ),
  homeVisitMarketing: ownerMarketingPhoto(
    "/media/marketing-huisbezoek.webp",
    "AB Service bij de start van een technisch huisbezoek"
  ),
  diagnosticsMarketing: ownerMarketingPhoto(
    "/media/marketing-diagnose.webp",
    "AB Service voert een diagnose uit aan een wandketel"
  ),
});
