const copy = {
  "nl-BE": {
    title:"Uw privacykeuze", intro:"AB Service gebruikt alleen na uw keuze Vercel-statistieken of externe Google-auteurfoto’s. Contact, WhatsApp en hulpmiddelen werken ook als u weigert. Wijzigen of intrekken kan altijd via Cookie-instellingen in de footer.",
    allow:"Statistieken toestaan", deny:"Alleen noodzakelijk", settings:"Cookie-instellingen", privacy:"Privacybeleid", save:"Keuzes opslaan", withdraw:"Alles intrekken", close:"Sluiten",
    necessary:"Noodzakelijk: uw keuze onthouden, maximaal 180 dagen. Altijd actief.", analytics:"Vercel-statistieken", analyticsHelp:"Paginaweergaven en beperkte, gefilterde klikgebeurtenissen. Geen formulierinhoud of meterstanden.",
    googlePhotos:"Externe Google-auteurfoto’s", photosHelp:"Uw browser maakt hiervoor verbinding met Google. Reviewteksten en score blijven ook zonder foto’s beschikbaar.",
    failed:"We konden uw keuze niet bewaren. Alles optioneel blijft nu uit. Probeer opnieuw of gebruik alleen noodzakelijke functies.",
    photoAction:"Google-auteurfoto’s laden", photoNote:"Foto’s alleen na uw keuze.", noscript:"Zonder JavaScript blijven statistieken en auteurfoto’s uit. Lees onze cookie-informatie.",
  },
  "fr-BE": {
    title:"Votre choix de confidentialité", intro:"AB Service n’active les statistiques Vercel ou les photos d’auteurs Google qu’après votre choix. Le contact, WhatsApp et les outils fonctionnent aussi si vous refusez. Vous pouvez modifier ou retirer votre choix via Préférences de cookies dans le pied de page.",
    allow:"Autoriser les statistiques", deny:"Nécessaire uniquement", settings:"Préférences de cookies", privacy:"Politique de confidentialité", save:"Enregistrer les choix", withdraw:"Tout retirer", close:"Fermer",
    necessary:"Nécessaire : mémoriser votre choix pendant 180 jours maximum. Toujours actif.", analytics:"Statistiques Vercel", analyticsHelp:"Pages vues et événements de clic limités et filtrés. Aucun contenu du formulaire ni relevé de compteur.",
    googlePhotos:"Photos d’auteurs depuis Google", photosHelp:"Votre navigateur se connecte alors à Google. Les textes des avis et la note restent disponibles sans les photos.",
    failed:"Nous n’avons pas pu enregistrer votre choix. Tout traitement facultatif reste désactivé pour le moment. Réessayez ou utilisez uniquement les fonctions nécessaires.",
    photoAction:"Charger les photos d’auteurs Google", photoNote:"Les photos ne sont chargées qu’après votre choix.", noscript:"Sans JavaScript, les statistiques et les photos d’auteurs restent désactivées. Consultez les informations sur les cookies.",
  },
  "en-BE": {
    title:"Your privacy choice", intro:"AB Service enables Vercel statistics or Google author photos only after your choice. Contact, WhatsApp and tools work if you refuse. You can change or withdraw your choice through Cookie settings in the footer at any time.",
    allow:"Allow statistics", deny:"Necessary only", settings:"Cookie settings", privacy:"Privacy policy", save:"Save choices", withdraw:"Withdraw all", close:"Close",
    necessary:"Necessary: remember your choice for up to 180 days. Always active.", analytics:"Vercel statistics", analyticsHelp:"Page views and limited, filtered click events. No form content or meter readings.",
    googlePhotos:"External Google author photos", photosHelp:"Your browser then connects to Google. Review texts and the rating remain available without photos.",
    failed:"We could not save your choice. All optional processing remains off for now. Try again or use only the necessary functions.",
    photoAction:"Load Google author photos", photoNote:"Photos load only after your choice.", noscript:"Without JavaScript, statistics and author photos stay off. Read our cookie information.",
  },
};
for (const entry of Object.values(copy)) {
  for (const key of Object.keys(copy["nl-BE"])) if (typeof entry[key] !== "string" || !entry[key].trim()) throw new Error("Incomplete cookie copy: " + key);
  Object.freeze(entry);
}
export function getCookieConsentCopy(locale = "nl-BE") {
  if (!Object.hasOwn(copy, locale)) throw new Error("Unsupported cookie locale");
  return copy[locale];
}
