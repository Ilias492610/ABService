const illustration = (src, width, height, alt) =>
  Object.freeze({
    src,
    width,
    height,
    alt,
    caption: "Illustratief beeld uit het beeldarchief van AB Service; geen klantcase.",
    ownerConfirmed: true,
    sourceType: "owner-archive",
    role: "illustration",
    projectEvidence: false,
  });

const generatedMarketingImage = (src, alt) =>
  Object.freeze({
    src,
    width: 1280,
    height: 960,
    alt,
    caption:
      "Illustratief, AI-gegenereerd marketingbeeld; geen klantcase, geen echte medewerker en geen projectbewijs.",
    ownerConfirmed: true,
    sourceType: "generated-marketing",
    role: "illustration",
    projectEvidence: false,
  });

export const contentImages = Object.freeze({
  maintenance: illustration(
    "/media/onderhoud-cv.webp",
    1024,
    1024,
    "Illustratieve weergave van onderhoud aan een cv-ketel"
  ),
  repair: illustration(
    "/media/herstelling-verwarming.webp",
    1024,
    1024,
    "Illustratieve weergave van technisch onderzoek aan een cv-installatie"
  ),
  installation: illustration(
    "/media/installatie-verwarming.webp",
    1024,
    1024,
    "Illustratieve weergave van installatiewerk voor verwarming"
  ),
  gasBoiler: illustration(
    "/media/gasketel-installatie.webp",
    1024,
    1536,
    "Illustratieve weergave van een wandgemonteerde gasketel"
  ),
  sanitary: illustration(
    "/media/sanitair-leidingwerk.webp",
    1024,
    1024,
    "Illustratieve weergave van sanitaire installatie en leidingwerk"
  ),
  pressureLoss: illustration(
    "/media/drukverlies-controle.webp",
    1280,
    853,
    "Illustratieve weergave van controle bij een verwarmingsstoring"
  ),
  inspection: illustration(
    "/media/keuring-cv.webp",
    1280,
    853,
    "Illustratieve weergave van een controle aan een verwarmingsinstallatie"
  ),
  boilerServiceMarketing: generatedMarketingImage(
    "/media/marketing-ketelservice.webp",
    "Illustratieve weergave van een technicus bij een wandketel"
  ),
  sanitaryMarketing: generatedMarketingImage(
    "/media/marketing-sanitair.webp",
    "Illustratieve weergave van sanitaire werkzaamheden aan een wastafel"
  ),
  customerAdviceMarketing: generatedMarketingImage(
    "/media/marketing-klantadvies.webp",
    "Illustratieve weergave van uitleg over een verwarmingsinstallatie"
  ),
  homeVisitMarketing: generatedMarketingImage(
    "/media/marketing-huisbezoek.webp",
    "Illustratieve weergave van de start van een technisch huisbezoek"
  ),
  diagnosticsMarketing: generatedMarketingImage(
    "/media/marketing-diagnose.webp",
    "Illustratieve weergave van een diagnose aan een wandketel"
  ),
});
