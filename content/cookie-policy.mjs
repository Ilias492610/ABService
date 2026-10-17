export { COOKIE_POLICY_UPDATED } from "./cookie-policy-date.mjs";
const copy = {
  "nl-BE": {
    title:"Cookies en uw voorkeuren",
    necessary:"AB Service gebruikt de noodzakelijke cookie ab_service_consent om alleen de versie, het keuzetijdstip en uw twee keuzes te onthouden, maximaal 180 dagen op deze website. Deze bevat geen identificatienummer of klantgegevens. Ontbreekt een geldige keuze, dan blijven beide optionele doelen uit. Na afloop vragen we opnieuw.",
    analytics:"Vercel-statistieken zijn optioneel en starten alleen na uw keuze. Vercel ontvangt de hieronder beschreven beperkte pagina- en eventgegevens. De SDK kan het veld __va_attribution in lokale browseropslag gebruiken; deze opslag heeft niet vanzelf een browservervaldatum. Deze site wist dat bekende veld bij intrekken of waargenomen verval. We activeren geen advertentietracking of aanvullende gebruikersidentificatie.",
    photos:"Google-auteurfoto’s hebben een afzonderlijke optionele keuze. Alleen daarna kan uw browser Google benaderen voor het beeld, met technische aanvraaggegevens zoals uw IP-adres en browserinformatie. De officiële reviewteksten, score en bronvermelding blijven zonder fototoestemming beschikbaar. De fotokeuze zet statistieken niet aan.",
    withdrawal:"U kunt weigeren of uw keuzes wijzigen en beide toestemmingen intrekken via Cookie-instellingen in de footer. Contact, telefoon, WhatsApp en hulpmiddelen blijven werken. Intrekken verhindert nieuwe optionele verwerking door deze site; reeds gestarte aanvragen, verzonden gegevens of ontvangen beelden kunnen niet worden teruggenomen. Bij mislukte opslag blijft alles optioneel in het huidige document uit en melden we dat bewaren niet lukte.",
    providers:"Hosting- en beveiligingsverkeer staat los van optionele statistieken. Uitgaande links naar Google of WhatsApp openen hun eigen dienstverlening onder hun eigen voorwaarden. De bewaartermijn van deze voorkeurscookie is niet de bewaartermijn van uw contactaanvraag.",
  },
  "fr-BE": {
    title:"Cookies et vos préférences",
    necessary:"AB Service utilise le cookie nécessaire ab_service_consent pour mémoriser uniquement la version, la date du choix et vos deux préférences, pendant 180 jours maximum sur ce site. Il ne contient aucun identifiant ni donnée de client. Sans choix valide, les deux traitements facultatifs restent désactivés. À l’expiration, nous vous demandons à nouveau votre choix.",
    analytics:"Les statistiques Vercel sont facultatives et ne démarrent qu’après votre choix. Vercel reçoit les données limitées de pages et d’événements décrites ci-dessous. Le SDK peut utiliser le champ __va_attribution dans le stockage local du navigateur, qui n’a pas de date d’expiration automatique. Ce site efface ce champ connu lors du retrait ou de l’expiration constatée. Nous n’activons ni suivi publicitaire ni identification supplémentaire des utilisateurs.",
    photos:"Les photos d’auteurs Google font l’objet d’un choix facultatif distinct. Ce n’est qu’ensuite que votre navigateur peut contacter Google pour l’image, avec des données techniques telles que votre adresse IP et des informations de navigateur. Les textes officiels des avis, la note et les sources restent disponibles sans consentement aux photos. Le choix des photos n’active pas les statistiques.",
    withdrawal:"Vous pouvez refuser, modifier vos choix ou retirer les deux consentements via Préférences de cookies dans le pied de page. Le contact, le téléphone, WhatsApp et les outils restent disponibles. Le retrait empêche de nouveaux traitements facultatifs par ce site ; il ne peut annuler les requêtes déjà lancées, les données envoyées ou les images reçues. Si l’enregistrement échoue, tout traitement facultatif reste désactivé dans le document actuel et un message vous informe de l’échec.",
    providers:"Le trafic d’hébergement et de sécurité est distinct des statistiques facultatives. Les liens sortants vers Google ou WhatsApp ouvrent leurs propres services selon leurs conditions. La durée de ce cookie de préférence n’est pas la durée de conservation de votre demande de contact.",
  },
  "en-BE": {
    title:"Cookies and your preferences",
    necessary:"AB Service uses the necessary ab_service_consent cookie to remember only the version, the time of your choice and your two preferences, for up to 180 days on this website. It contains no user identifier or customer data. Without a valid choice, both optional purposes stay off. We ask again after expiry.",
    analytics:"Vercel statistics are optional and start only after your choice. Vercel receives the limited page and event data described below. The SDK may use the __va_attribution field in browser local storage, which has no automatic browser expiry. This site removes that known field on withdrawal or observed expiry. We do not enable advertising tracking or additional user identification.",
    photos:"Google author photos have a separate optional choice. Only then may your browser contact Google for the image, with technical request data such as your IP address and browser information. Official review texts, the rating and sources remain available without photo consent. Choosing photos does not enable statistics.",
    withdrawal:"You can refuse, change your choices or withdraw both permissions through Cookie settings in the footer. Contact, phone, WhatsApp and tools keep working. Withdrawal prevents new optional processing by this site; requests already started, data already sent or images received cannot be recalled. If saving fails, all optional processing stays off in the current document and we explain that your choice could not be saved.",
    providers:"Hosting and security traffic is separate from optional statistics. Outgoing Google or WhatsApp links open their own services under their own terms. The lifetime of this preference cookie is not the retention period for your contact enquiry.",
  },
};
export function getCookiePolicy(locale = "nl-BE") {
  if (!Object.hasOwn(copy,locale)) throw new Error("Unsupported cookie policy locale");
  return copy[locale];
}
