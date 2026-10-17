// Faithful AI-assisted translations of the existing 13 October policy, not a new retention policy.
const copy = {
  "fr-BE": {
    "name": "Politique de confidentialité",
    "eyebrow": "Confidentialité",
    "title": "Comment AB Service traite les données du site et des demandes de contact",
    "intro": "Cette politique décrit les systèmes effectivement utilisés par le site : le formulaire de contact, Mailgun pour l’acheminement des e-mails, Vercel pour l’hébergement et l’analyse, et Google Places pour les données actualisées du profil et des avis.",
    "headings": [
      "1. Qui traite vos données ?",
      "2. Demandes de contact",
      "3. Acheminement des e-mails",
      "4. Analyse du site",
      "5. Profil Google et avis",
      "6. Traitements techniques",
      "7. Vos droits",
      "8. Outils locaux et modifications"
    ],
    "controller": "AB Service, numéro d’entreprise {vat}, est votre interlocuteur pour les données que vous communiquez sur ce site. Pour toute question relative à la confidentialité, vous pouvez écrire à",
    "contact": "Le formulaire peut contenir votre nom, votre numéro de téléphone, votre adresse e-mail, des informations sur le lieu d’intervention et l’appareil, ainsi que votre message. Ces données servent à évaluer votre demande, à vous contacter, à préparer un rendez-vous ou un devis et à conserver les échanges aussi longtemps que nécessaire pour la demande, l’exécution des travaux ou les obligations légales.",
    "mailgun": "Les messages du formulaire sont envoyés via Mailgun à l’adresse configurée pour AB Service. Ne transmettez pas de documents médicaux, financiers ou d’identité sensibles dans le champ de message libre.",
    "analytics": "Le site configure Vercel Analytics afin d’obtenir une vue agrégée des pages consultées et d’un nombre limité d’événements d’interaction. La réception de ces événements dans les rapports n’a pas encore été confirmée ; cette configuration ne prouve pas que des visites ou des demandes ont été mesurées. Avant l’envoi à cet outil d’analyse, les paramètres d’URL et les fragments sont supprimés. Les événements de contact ne contiennent qu’un contexte prédéfini, comme l’emplacement de la page et le service choisi ; le nom, l’adresse e-mail, le téléphone, l’adresse et le contenu du message ne sont pas transmis comme propriétés d’événement. L’outil de vérification de l’entretien utilise uniquement des codes de choix limités pour la région et le résultat, sans la date d’entretien saisie. L’outil de vérification du compteur d’eau utilise uniquement un code de résultat fixe (observation, inconnu, situation dangereuse ou saisie non valide) et l’emplacement de la page ; un clic facultatif pour prendre contact inclut également le service choisi. Les relevés du compteur, la durée de mesure, l’unité et les quantités calculées ne sont pas transmis comme propriétés d’événement. Le site ne configure actuellement ni Plausible, ni Google Analytics, ni Google Ads.",
    "googleBefore": "La page d’accueil récupère via le serveur des données publiques actualisées du profil Google Places : notamment le nom, la note moyenne, le nombre d’avis et, lorsque Google les fournit, jusqu’à cinq textes d’avis avec attribution à leurs auteurs. Le lien flottant vers le profil demande uniquement la note actualisée via un point d’accès distinct sur le serveur. Ce contenu Places n’est ni récupéré à l’avance ni stocké par AB Service. L’identifiant technique Place ID peut toutefois être conservé durablement conformément aux règles de Google. Lorsque des photos d’auteurs sont disponibles, votre navigateur peut les charger directement auprès de Google. La ",
    "googleLink": "politique de confidentialité de Google",
    "googleAfter": " et les conditions Google Maps applicables régissent également ce traitement.",
    "technical": "Les prestataires d’hébergement, de sécurité et d’analyse peuvent traiter des données techniques telles que l’adresse IP, les informations du navigateur, l’heure et l’URL demandée pour fournir le site, prévenir les abus et mesurer les performances. Leurs propres durées et lieux de conservation sont définis dans les conditions applicables de ces prestataires.",
    "rights": "Vous pouvez demander l’accès, la rectification, l’effacement, la limitation du traitement ou la portabilité de vos données, ou vous opposer à leur traitement, dans la mesure prévue par les règles applicables. Fournissez suffisamment d’informations pour permettre de retrouver votre demande, mais n’envoyez pas de pièce d’identité sans qu’un besoin réel et un mode de transmission sécurisé aient été convenus.",
    "maintenance": "L’outil de vérification de l’entretien produit ses explications dans votre navigateur, sans compte et sans transmettre les données saisies comme demande de contact. Un résumé des informations choisies sur l’appareil et de l’éventuelle date d’entretien n’est repris dans le formulaire que si vous choisissez vous-même de prendre contact.",
    "water": "L’outil de vérification du compteur d’eau fonctionne lui aussi localement : les relevés du compteur, la durée de mesure, l’unité et les quantités calculées restent dans votre navigateur. L’outil ne les conserve pas et ne les transmet ni à un serveur, ni à un compte, ni dans une URL. Lors d’un clic facultatif pour prendre contact, seule la catégorie « différence positive » ou « différence nulle », ainsi que le service correspondant, est transmise au formulaire via le fragment de l’URL. Vos relevés et votre période de mesure ne figurent pas dans ce résumé. Vous pouvez modifier le texte repris ; une demande de contact n’est envoyée qu’après votre propre action dans le formulaire.",
    "updated": "Cette politique a été mise à jour le ",
    "date": "13 octobre 2026",
    "changes": ". Cette page sera adaptée en cas de modification des formulaires, des outils d’analyse, des publicités ou d’autres traitements de données."
  },
  "en-BE": {
    "name": "Privacy policy",
    "eyebrow": "Privacy",
    "title": "How AB Service processes website and contact information",
    "intro": "This policy describes the systems the website actually uses: the contact form, Mailgun for email delivery, Vercel for hosting and analytics, and Google Places for up-to-date profile and review information.",
    "headings": [
      "1. Who processes your information?",
      "2. Contact enquiries",
      "3. Email delivery",
      "4. Website analytics",
      "5. Google profile and reviews",
      "6. Technical processing",
      "7. Your rights",
      "8. Local tools and changes"
    ],
    "controller": "AB Service, enterprise number {vat}, is the point of contact for information you provide through this website. For privacy enquiries, email",
    "contact": "The form may contain your name, phone number, email address, location information, appliance details and message. This information is used to assess your enquiry, contact you, prepare an appointment or quotation, and keep the correspondence for as long as needed for the enquiry, the work or legal obligations.",
    "mailgun": "Form messages are sent through Mailgun to the configured AB Service email address. Do not share sensitive medical or financial information, or identity documents, in the free-text message field.",
    "analytics": "The website configures Vercel Analytics to provide aggregate insights into page views and limited interaction events. Receipt of these events in the reports has not yet been confirmed; this configuration does not prove that visits or enquiries have been measured. URL parameters and fragments are removed before information is sent to this analytics service. Contact events contain only predefined context, such as the page location and selected service; names, email addresses, phone numbers, addresses and message content are not sent as event properties. The maintenance check uses only limited selection codes for the region and result, not the maintenance date entered. The water meter check uses only a fixed result code (observation, unknown, unsafe or invalid input) and page location; an optional contact click also includes the selected service. Meter readings, measurement duration, unit and calculated quantities are not sent as event properties. The website does not currently configure Plausible, Google Analytics or Google Ads.",
    "googleBefore": "The homepage requests up-to-date public profile information from Google Places through the server, including the name, average rating, number of reviews and, when Google makes them available, up to five review texts with author attribution. The floating profile link requests only the current rating through a separate server endpoint. This Places content is not prefetched or stored by AB Service. Google’s policy does allow the technical Place ID to be retained permanently. When author photos are available, your browser may load them directly from Google. Google’s ",
    "googleLink": "privacy policy",
    "googleAfter": " and the applicable Google Maps terms also apply to this processing.",
    "technical": "Hosting, security and analytics providers may process technical information such as your IP address, browser information, the time and requested URL to deliver the website, prevent abuse and measure performance. Their own retention periods and processing locations are governed by the applicable provider terms.",
    "rights": "You may request access, correction, deletion, restriction, portability or object to processing to the extent permitted by the applicable rules. Provide enough information for us to locate your request, but do not send proof of identity unless this is necessary and a safe way to do so has been agreed.",
    "maintenance": "The maintenance check calculates its explanation in your browser, without an account and without submitting your input as an enquiry. Only if you choose to contact us is a summary of the selected appliance details and any maintenance date transferred to the form.",
    "water": "The water meter check also runs locally: meter readings, measurement duration, unit and calculated quantities stay in your browser. The tool does not store them or send them to a server, account or URL. If you choose the optional contact link, only the category of a positive difference or no difference, and the corresponding service, are passed to the form through the URL fragment. Your readings and measurement period are not included in that summary. You can edit the transferred text; a contact enquiry is only sent when you submit the form yourself.",
    "updated": "This policy was updated on ",
    "date": "13 October 2026",
    "changes": ". This page will be updated when forms, analytics, advertising or other data processing change."
  }
};
export const getPrivacyCopy = locale => {
  if (!Object.hasOwn(copy, locale)) throw new Error('Unsupported privacy locale');
  return copy[locale];
};

