import { normalizeContactLocale } from './localization.mjs';

// Presentation only; validation rules and submitted service values stay shared.
const copy = {
  "nl-BE": {
    "note": "Velden met een * zijn verplicht. Vermeld geen gevoelige medische of financiële gegevens.",
    "name": "Naam *",
    "phone": "Telefoon *",
    "email": "E-mail *",
    "service": "Waarover gaat uw aanvraag?",
    "chooseService": "Kies een dienst",
    "address": "Straat en huisnummer (optioneel)",
    "city": "Gemeente (optioneel)",
    "postalCode": "Postcode (optioneel)",
    "brand": "Merk en model (optioneel)",
    "boilerType": "Type of productcode (optioneel)",
    "message": "Wat gebeurt er en sinds wanneer?",
    "consentBefore": "Ik heb het ",
    "privacy": "privacybeleid",
    "consentAfter": " gelezen en geef toestemming om mijn gegevens te gebruiken voor deze aanvraag. *",
    "submit": "Aanvraag verzenden",
    "submitting": "Aanvraag verzenden…",
    "pending": "Uw aanvraag wordt verzonden…",
    "success": "Uw aanvraag is verzonden. Een afspraak of timing is pas bevestigd na rechtstreeks contact.",
    "nativeError": "De aanvraag kon niet worden verzonden. Controleer de ingevulde velden en uw privacyakkoord, of probeer het later opnieuw.",
    "summary": "Controleer de gemarkeerde velden en probeer opnieuw.",
    "transport": "De aanvraag kon niet worden verzonden. Probeer het later opnieuw of neem rechtstreeks contact op.",
    "invalid": "Controleer de ingevulde velden en uw akkoord met het privacybeleid.",
    "server": "Serverfout bij het verzenden van de aanvraag. Probeer het later opnieuw.",
    "recipient": "Geen ontvanger ingesteld voor contactaanvragen.",
    "errors": {
      "nameRequired": "Vul uw naam in.",
      "nameLength": "Gebruik maximaal 120 tekens voor uw naam.",
      "phoneRequired": "Vul uw telefoonnummer in.",
      "phoneInvalid": "Vul een geldig telefoonnummer in.",
      "emailLength": "Gebruik maximaal 200 tekens voor uw e-mailadres.",
      "emailInvalid": "Vul een geldig e-mailadres in.",
      "address": "Gebruik maximaal 200 tekens voor het adres.",
      "city": "Gebruik maximaal 100 tekens voor de gemeente.",
      "postalCode": "Gebruik maximaal 20 tekens voor de postcode.",
      "service": "Kies een geldige dienst of laat het veld leeg.",
      "brand": "Gebruik maximaal 120 tekens voor merk en model.",
      "boilerType": "Gebruik maximaal 120 tekens voor type of productcode.",
      "message": "Gebruik maximaal 3000 tekens voor uw toelichting.",
      "consent": "Bevestig dat u het privacybeleid heeft gelezen."
    }
  },
  "fr-BE": {
    "note": "Les champs marqués d’un * sont obligatoires. Ne communiquez pas de données médicales ou financières sensibles.",
    "name": "Nom *",
    "phone": "Téléphone *",
    "email": "E-mail *",
    "service": "Quel est l’objet de votre demande ?",
    "chooseService": "Choisissez un service",
    "address": "Rue et numéro (facultatif)",
    "city": "Commune (facultatif)",
    "postalCode": "Code postal (facultatif)",
    "brand": "Marque et modèle (facultatif)",
    "boilerType": "Type ou code produit (facultatif)",
    "message": "Que se passe-t-il et depuis quand ?",
    "consentBefore": "J’ai lu la ",
    "privacy": "politique de confidentialité",
    "consentAfter": " et j’autorise l’utilisation de mes données pour cette demande. *",
    "submit": "Envoyer la demande",
    "submitting": "Envoi de la demande…",
    "pending": "Votre demande est en cours d’envoi…",
    "success": "Votre demande a été envoyée. Un rendez-vous ou un délai ne sera confirmé qu’après un contact direct.",
    "nativeError": "La demande n’a pas pu être envoyée. Vérifiez les champs remplis et votre accord concernant la confidentialité, ou réessayez plus tard.",
    "summary": "Vérifiez les champs signalés et réessayez.",
    "transport": "La demande n’a pas pu être envoyée. Réessayez plus tard ou contactez-nous directement.",
    "invalid": "Vérifiez les champs remplis et votre accord avec la politique de confidentialité.",
    "server": "Une erreur du serveur a empêché l’envoi de la demande. Réessayez plus tard.",
    "recipient": "Aucun destinataire n’est configuré pour les demandes de contact.",
    "services": [
      "Entretien de chaudière",
      "Réparation de chauffage",
      "Contrôle de l’installation de chauffage",
      "Installation de chaudière au gaz",
      "Sanitaires ou plomberie",
      "Recherche de fuite",
      "Réparation de fuite d’eau",
      "Débouchage",
      "Installation ou réparation de chauffe-eau",
      "Pose ou modification de canalisations",
      "Rénovation de salle de bains",
      "Autre demande"
    ],
    "errors": {
      "nameRequired": "Indiquez votre nom.",
      "nameLength": "Limitez votre nom à 120 caractères.",
      "phoneRequired": "Indiquez votre numéro de téléphone.",
      "phoneInvalid": "Indiquez un numéro de téléphone valide.",
      "emailLength": "Limitez votre adresse e-mail à 200 caractères.",
      "emailInvalid": "Indiquez une adresse e-mail valide.",
      "address": "Limitez l’adresse à 200 caractères.",
      "city": "Limitez le nom de la commune à 100 caractères.",
      "postalCode": "Limitez le code postal à 20 caractères.",
      "service": "Choisissez un service valide ou laissez ce champ vide.",
      "brand": "Limitez la marque et le modèle à 120 caractères.",
      "boilerType": "Limitez le type ou le code produit à 120 caractères.",
      "message": "Limitez vos explications à 3 000 caractères.",
      "consent": "Confirmez que vous avez lu la politique de confidentialité."
    }
  },
  "en-BE": {
    "note": "Fields marked with * are required. Do not include sensitive medical or financial information.",
    "name": "Name *",
    "phone": "Phone *",
    "email": "Email *",
    "service": "What is your enquiry about?",
    "chooseService": "Choose a service",
    "address": "Street and house number (optional)",
    "city": "Town or municipality (optional)",
    "postalCode": "Postcode (optional)",
    "brand": "Make and model (optional)",
    "boilerType": "Type or product code (optional)",
    "message": "What is happening, and when did it start?",
    "consentBefore": "I have read the ",
    "privacy": "privacy policy",
    "consentAfter": " and consent to my information being used for this enquiry. *",
    "submit": "Send enquiry",
    "submitting": "Sending enquiry…",
    "pending": "Your enquiry is being sent…",
    "success": "Your enquiry has been sent. An appointment or timeframe is only confirmed after direct contact.",
    "nativeError": "Your enquiry could not be sent. Check the information you entered and your privacy consent, or try again later.",
    "summary": "Check the highlighted fields and try again.",
    "transport": "Your enquiry could not be sent. Try again later or contact us directly.",
    "invalid": "Check the information you entered and your agreement with the privacy policy.",
    "server": "A server error prevented your enquiry from being sent. Try again later.",
    "recipient": "No recipient is configured for contact enquiries.",
    "services": [
      "Central heating boiler maintenance",
      "Heating repair",
      "Central heating system inspection",
      "Gas boiler installation",
      "Sanitary installations or plumbing",
      "Leak detection",
      "Water leak repair",
      "Drain unblocking",
      "Water heater installation or repair",
      "Pipe installation or alterations",
      "Bathroom renovation",
      "Other enquiry"
    ],
    "errors": {
      "nameRequired": "Enter your name.",
      "nameLength": "Use no more than 120 characters for your name.",
      "phoneRequired": "Enter your phone number.",
      "phoneInvalid": "Enter a valid phone number.",
      "emailLength": "Use no more than 200 characters for your email address.",
      "emailInvalid": "Enter a valid email address.",
      "address": "Use no more than 200 characters for the address.",
      "city": "Use no more than 100 characters for the town or municipality.",
      "postalCode": "Use no more than 20 characters for the postcode.",
      "service": "Choose a valid service or leave the field blank.",
      "brand": "Use no more than 120 characters for the make and model.",
      "boilerType": "Use no more than 120 characters for the type or product code.",
      "message": "Use no more than 3000 characters for your description.",
      "consent": "Confirm that you have read the privacy policy."
    }
  }
};

for (const entry of Object.values(copy)) {
  for (const key of Object.keys(copy['nl-BE'])) {
    if (key !== 'errors' && (typeof entry[key] !== 'string' || !entry[key])) throw new Error(`Missing contact copy: ${key}`);
  }
  for (const key of Object.keys(copy['nl-BE'].errors)) if (!entry.errors[key]) throw new Error(`Missing validation copy: ${key}`);
  Object.freeze(entry.errors);
  if (entry.services) Object.freeze(entry.services);
  Object.freeze(entry);
}
Object.freeze(copy);
export const getContactCopy = locale => copy[normalizeContactLocale(locale)];

