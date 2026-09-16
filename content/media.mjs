const illustration = (src, width, height, alt) =>
  Object.freeze({
    src,
    width,
    height,
    alt,
    caption: "Illustratief beeld uit het beeldarchief van AB Service; geen klantcase.",
    ownerConfirmed: true,
    role: "illustration",
    projectEvidence: false,
  });

export const contentImages = Object.freeze({
  maintenance: illustration(
    "/Onderhoud.png",
    1024,
    1024,
    "Illustratieve weergave van onderhoud aan een cv-ketel"
  ),
  repair: illustration(
    "/Technici.png",
    1024,
    1024,
    "Illustratieve weergave van technisch onderzoek aan een cv-installatie"
  ),
  installation: illustration(
    "/Installatie.png",
    1024,
    1024,
    "Illustratieve weergave van installatiewerk voor verwarming"
  ),
  gasBoiler: illustration(
    "/boiler.png",
    1024,
    1536,
    "Illustratieve weergave van een wandgemonteerde gasketel"
  ),
  sanitary: illustration(
    "/Onderhoudpagina.png",
    1024,
    1024,
    "Illustratieve weergave van sanitaire installatie en leidingwerk"
  ),
  pressureLoss: illustration(
    "/Herstelling.png",
    1536,
    1024,
    "Illustratieve weergave van controle bij een verwarmingsstoring"
  ),
});
