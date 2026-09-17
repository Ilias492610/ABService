import { calculateAreaPriorityScore } from "./service-area-scoring.mjs";

export const projects = Object.freeze([
  Object.freeze({
    path: "/projecten/cv-ketel-storing-gediagnosticeerd",
    slug: "cv-ketel-storing-gediagnosticeerd",
    title: "Terugkerende cv-ketelstoring onderzocht en hersteld",
    status: "published",
    service: "Herstelling verwarming",
    servicePath: "/herstelling",
    province: "Antwerpen",
    city: "Regio Antwerpen",
    district: "",
    brand: "Merk geanonimiseerd",
    approximateDate: "Periode niet gepubliceerd",
    problem: "De cv-ketel viel herhaaldelijk uit en leverde niet betrouwbaar verwarming en warm water.",
    solution: "De storing werd systematisch onderzocht, het betrokken onderdeel werd aangepakt en de installatie werd daarna opnieuw gecontroleerd.",
    situation: "Een terugkerende ketelstoring waarvoor één reset geen blijvende oplossing gaf.",
    workPerformed: [
      "Foutmelding, toestelgegevens en installatieconditie gecontroleerd",
      "Oorzaak afgebakend met gerichte diagnose",
      "Afgesproken herstel uitgevoerd",
      "Werking van verwarming en warm water gecontroleerd",
    ],
    outcome: "De installatie functioneerde bij de oplevercontrole opnieuw zonder de gemelde uitval.",
    authenticPhotos: [
      { src: "/media/marketing-diagnose.webp", alt: "AB Service voert een diagnose uit aan een geopende cv-ketel", width: 1280, height: 960, verified: true },
    ],
    customerApproval: true,
    reviewApproved: false,
    reviewText: "",
    workEvidence: "Door de eigenaar bevestigd uitgevoerd werk; klant- en toestelgegevens zijn geanonimiseerd.",
  }),
  Object.freeze({
    path: "/projecten/gasketel-vervangen",
    slug: "gasketel-vervangen",
    title: "Verouderde gasketel vervangen en installatie ingeregeld",
    status: "published",
    service: "Gasketelinstallatie",
    servicePath: "/installaties/gasketels",
    province: "Antwerpen",
    city: "Regio Antwerpen",
    district: "",
    brand: "Merk geanonimiseerd",
    approximateDate: "Periode niet gepubliceerd",
    problem: "De bestaande gasketel was aan vervanging toe en de aansluitingen moesten vooraf worden beoordeeld.",
    solution: "Na opname werd de bestaande ketel vervangen, werden de bereikbare aansluitingen aangepast en werd de installatie gecontroleerd.",
    situation: "Vervanging van een bestaande wandketel binnen een vooraf afgesproken technische scope.",
    workPerformed: [
      "Bestaande installatie en aansluitingen opgenomen",
      "Oude ketel veilig verwijderd",
      "Nieuwe ketel en afgesproken aansluitingen geplaatst",
      "Installatie gecontroleerd en bediening toegelicht",
    ],
    outcome: "De nieuwe installatie werd werkend opgeleverd volgens de overeengekomen scope.",
    authenticPhotos: [
      { src: "/media/marketing-ketelservice.webp", alt: "AB Service werkt aan de aansluitingen van een wandketel", width: 1280, height: 960, verified: true },
    ],
    customerApproval: true,
    reviewApproved: false,
    reviewText: "",
    workEvidence: "Door de eigenaar bevestigd uitgevoerd werk; klant- en toestelgegevens zijn geanonimiseerd.",
  }),
  Object.freeze({
    path: "/projecten/waterlek-leiding-herstellen",
    slug: "waterlek-leiding-herstellen",
    title: "Waterlek gelokaliseerd en bereikbare leiding hersteld",
    status: "published",
    service: "Lekdetectie en waterlekherstel",
    servicePath: "/diensten/lekdetectie",
    province: "Antwerpen",
    city: "Regio Antwerpen",
    district: "",
    brand: "Niet van toepassing",
    approximateDate: "Periode niet gepubliceerd",
    problem: "Er was zichtbaar vocht en de exacte bron moest eerst worden afgebakend om onnodig openbreken te vermijden.",
    solution: "De bereikbare aansluitingen en het vermoedelijke leidingtraject werden gecontroleerd, waarna het beschadigde deel plaatselijk werd hersteld.",
    situation: "Een waterlek aan bereikbaar sanitair leidingwerk met risico op verdere vochtschade.",
    workPerformed: [
      "Zichtbare vochtsporen en leidingverloop beoordeeld",
      "Betrokken watercircuit veilig afgesloten",
      "Lekkend leidingdeel of koppeling hersteld",
      "Bereikbare werkzone na herstel gecontroleerd",
    ],
    outcome: "Bij de eindcontrole was aan de herstelde werkzone geen zichtbare lekkage meer aanwezig.",
    authenticPhotos: [
      { src: "/media/sanitair-leidingwerk.webp", alt: "Bereikbaar sanitair leidingwerk tijdens werkzaamheden van AB Service", width: 1024, height: 1024, verified: true },
    ],
    customerApproval: true,
    reviewApproved: false,
    reviewText: "",
    workEvidence: "Door de eigenaar bevestigd uitgevoerd werk; adres en klantgegevens zijn geanonimiseerd.",
  }),
  Object.freeze({
    path: "/projecten/sanitair-vernieuwd",
    slug: "sanitair-vernieuwd",
    title: "Sanitair toestel en aansluitingen vernieuwd",
    status: "published",
    service: "Sanitair en loodgieterswerk",
    servicePath: "/installaties/sanitair",
    province: "Antwerpen",
    city: "Regio Antwerpen",
    district: "",
    brand: "Niet van toepassing",
    approximateDate: "Periode niet gepubliceerd",
    problem: "Een bestaand sanitair toestel en de bereikbare aansluitingen moesten worden vervangen.",
    solution: "Het oude toestel werd verwijderd, de aansluitingen werden waar nodig aangepast en het nieuwe toestel werd geplaatst.",
    situation: "Gerichte sanitaire vernieuwing zonder volledige badkamerrenovatie.",
    workPerformed: [
      "Maten en bestaande toevoer en afvoer gecontroleerd",
      "Bestaand toestel gedemonteerd",
      "Bereikbare aansluitingen aangepast",
      "Nieuw toestel geplaatst en werking gecontroleerd",
    ],
    outcome: "Het sanitaire toestel en de bereikbare aansluitingen werden gebruiksklaar opgeleverd.",
    authenticPhotos: [
      { src: "/media/marketing-sanitair.webp", alt: "AB Service vernieuwt de aansluiting van een sanitair toestel", width: 1280, height: 960, verified: true },
    ],
    customerApproval: true,
    reviewApproved: false,
    reviewText: "",
    workEvidence: "Door de eigenaar bevestigd uitgevoerd werk; klantgegevens zijn niet gepubliceerd.",
  }),
  Object.freeze({
    path: "/projecten/afvoer-ontstopt",
    slug: "afvoer-ontstopt",
    title: "Verstopte sanitaire afvoer vrijgemaakt",
    status: "published",
    service: "Ontstopping",
    servicePath: "/diensten/ontstopping",
    province: "Antwerpen",
    city: "Regio Antwerpen",
    district: "",
    brand: "Niet van toepassing",
    approximateDate: "Periode niet gepubliceerd",
    problem: "Een sanitaire afvoer liep niet meer door en veroorzaakte lokaal terugstaand water.",
    solution: "De bereikbare afvoer werd geopend, de blokkering werd verwijderd en de doorstroming werd gecontroleerd.",
    situation: "Lokale verstopping aan een bereikbare sanitaire afvoer.",
    workPerformed: [
      "Getroffen afvoer en nabijgelegen toestellen gecontroleerd",
      "Bereikbare sifon en afvoerverbinding geopend",
      "Blokkering verwijderd",
      "Doorstroming en verbindingen gecontroleerd",
    ],
    outcome: "De afvoer liep bij de eindcontrole opnieuw normaal door.",
    authenticPhotos: [
      { src: "/media/sanitair-leidingwerk.webp", alt: "Sanitair afvoerwerk tijdens een interventie van AB Service", width: 1024, height: 1024, verified: true },
    ],
    customerApproval: true,
    reviewApproved: false,
    reviewText: "",
    workEvidence: "Door de eigenaar bevestigd uitgevoerd werk; exacte locatie is geanonimiseerd.",
  }),
  Object.freeze({
    path: "/projecten/badkamer-leidingwerk",
    slug: "badkamer-leidingwerk",
    title: "Leidingwerk en sanitair voor badkamervernieuwing",
    status: "published",
    service: "Badkamerrenovatie",
    servicePath: "/diensten/badkamerrenovatie",
    province: "Antwerpen",
    city: "Regio Antwerpen",
    district: "",
    brand: "Niet van toepassing",
    approximateDate: "Periode niet gepubliceerd",
    problem: "De indeling van een badkamer veranderde, waardoor toevoer- en afvoerpunten moesten worden aangepast.",
    solution: "Het leidingtracé werd afgestemd op de nieuwe indeling en de afgesproken sanitaire aansluitpunten werden voorbereid en geplaatst.",
    situation: "Loodgieters- en sanitair werk als onderdeel van een badkamerrenovatie.",
    workPerformed: [
      "Nieuwe indeling en toestelposities gecontroleerd",
      "Toevoer- en afvoerleidingen aangepast",
      "Aansluitpunten voor de gekozen toestellen voorbereid",
      "Bereikbaar leidingwerk vóór afwerking gecontroleerd",
    ],
    outcome: "De sanitaire aansluitpunten waren gereed voor de afgesproken toestellen en verdere afwerking.",
    authenticPhotos: [
      { src: "/media/marketing-sanitair.webp", alt: "AB Service voert sanitair werk uit in een badkamer", width: 1280, height: 960, verified: true },
    ],
    customerApproval: true,
    reviewApproved: false,
    reviewText: "",
    workEvidence: "Door de eigenaar bevestigd uitgevoerd werk; adres en klantgegevens zijn geanonimiseerd.",
  }),
]);

const requiredProjectFields = [
  "path",
  "title",
  "status",
  "service",
  "province",
  "city",
  "brand",
  "approximateDate",
  "problem",
  "solution",
  "situation",
  "workPerformed",
  "outcome",
  "authenticPhotos",
  "customerApproval",
  "reviewApproved",
  "workEvidence",
];

export const validateProjectForPublication = (project = {}) => {
  const missing = requiredProjectFields.filter((field) => {
    const value = project[field];
    if (field === "customerApproval") return value !== true;
    if (field === "reviewApproved") return typeof value !== "boolean";
    if (field === "authenticPhotos") {
      return !Array.isArray(value) || value.length === 0 || value.some((photo) => photo.verified !== true);
    }
    if (field === "workPerformed") return !Array.isArray(value) || value.length === 0;
    return typeof value !== "string" || value.trim() === "";
  });

  if (
    project.reviewApproved === true &&
    (typeof project.reviewText !== "string" || project.reviewText.trim() === "")
  ) {
    missing.push("reviewText");
  }

  return { ok: missing.length === 0, missing };
};

const normalize = (value) => String(value ?? "").trim().toLocaleLowerCase("nl-BE");

export const getPublishedProjects = (entries = projects) =>
  entries.filter(
    (project) => project.status === "published" && validateProjectForPublication(project).ok
  );

export const getProject = (slug, entries = projects) =>
  getPublishedProjects(entries).find((project) => project.slug === slug);

export const getPublishedProjectsForHub = (province, entries = projects) =>
  getPublishedProjects(entries).filter(
    (project) => normalize(project.province) === normalize(province)
  );

export const deriveAreaEvidence = (area, entries = projects) => {
  const matchingProjects = getPublishedProjects(entries).filter((project) =>
    area.type === "district"
      ? normalize(project.district) === normalize(area.name)
      : normalize(project.city) === normalize(area.name)
  );
  const hasLocalReview = matchingProjects.some(
    (project) =>
      project.reviewApproved === true &&
      typeof project.reviewText === "string" &&
      project.reviewText.trim() !== ""
  );
  const prioritySignals = {
    ...area.prioritySignals,
    projectEvidence: matchingProjects.length >= 2 ? 5 : matchingProjects.length === 1 ? 3 : 0,
    reviewEvidence: hasLocalReview ? 3 : 0,
  };

  return Object.freeze({
    ...area,
    hasProjectEvidence: matchingProjects.length > 0,
    hasLocalReview,
    projectCount: matchingProjects.length,
    matchingProjects: Object.freeze(matchingProjects),
    prioritySignals: Object.freeze(prioritySignals),
    priorityScore: calculateAreaPriorityScore(prioritySignals),
  });
};
