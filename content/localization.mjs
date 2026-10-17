import { business } from './business.mjs';

export const LOCALES = Object.freeze(['nl-BE', 'fr-BE', 'en-BE']);
export const LANGUAGE_NAMES = Object.freeze({'nl-BE':'Nederlands','fr-BE':'Français','en-BE':'English'});
const contacts = Object.freeze({'nl-BE':'/contact','fr-BE':'/fr/contact','en-BE':'/en/contact'});
const privacy = Object.freeze({'nl-BE':'/privacy-policy','fr-BE':'/fr/confidentialite','en-BE':'/en/privacy'});
const groups = [contacts, privacy];
export const normalizeContactLocale = value => LOCALES.includes(value) ? value : 'nl-BE';
export const getContactRoute = locale => contacts[normalizeContactLocale(locale)];
export const getPrivacyRoute = locale => privacy[normalizeContactLocale(locale)];
export const getLanguagePaths = path => groups.find(group => Object.values(group).includes(path));
export const getLanguageAlternates = path => {
  const group = getLanguagePaths(path);
  return group ? Object.fromEntries(Object.entries(group).map(([locale, route]) => [locale, new URL(route, business.canonicalOrigin).href])) : undefined;
};

const links = {
  'fr-BE': {
    '/':'Accueil','/diensten':'Tous les services','/onderhoud':'Entretien de chaudière','/herstelling':'Réparation de chauffage','/keuring':'Contrôle de l’installation de chauffage',
    '/installaties/gasketels':'Installation de chaudière au gaz','/installaties/sanitair':'Sanitaires et plomberie','/diensten/lekdetectie':'Recherche de fuite','/diensten/waterlek-herstellen':'Réparation de fuite d’eau',
    '/diensten/ontstopping':'Débouchage','/diensten/boiler':'Chauffe-eau','/diensten/leidingen':'Canalisations','/diensten/badkamerrenovatie':'Rénovation de salle de bains','/merken':'Marques de chaudières','/projecten':'Réalisations',
    '/tarieven':'Tarifs et devis','/foutcodes':'Codes d’erreur','/advies':'Conseils pratiques','/tools/onderhoudscheck':'Vérification de l’entretien','/advies/drukverlies-cv-ketel':'Perte de pression de la chaudière',
    '/werkgebied':'Zone d’intervention','/faq':'Questions fréquentes','/over-ons':'À propos d’AB Service','/algemene-voorwaarden':'Conditions générales',
    '/werkgebied/antwerpen':'Province d’Anvers','/werkgebied/limburg':'Limbourg','/werkgebied/oost-vlaanderen':'Flandre-Orientale','/werkgebied/vlaams-brabant':'Brabant flamand','/werkgebied/west-vlaanderen':'Flandre-Occidentale','/werkgebied/brussel':'Bruxelles',
    '/contact':'Contact','/privacy-policy':'Politique de confidentialité',
  },
  'en-BE': {
    '/':'Home','/diensten':'All services','/onderhoud':'Boiler maintenance','/herstelling':'Heating repair','/keuring':'Heating system inspection',
    '/installaties/gasketels':'Gas boiler installation','/installaties/sanitair':'Sanitary installations and plumbing','/diensten/lekdetectie':'Leak detection','/diensten/waterlek-herstellen':'Water leak repair',
    '/diensten/ontstopping':'Drain unblocking','/diensten/boiler':'Water heaters','/diensten/leidingen':'Pipework','/diensten/badkamerrenovatie':'Bathroom renovation','/merken':'Boiler brands','/projecten':'Projects',
    '/tarieven':'Prices and quotations','/foutcodes':'Error codes','/advies':'Practical advice','/tools/onderhoudscheck':'Maintenance check','/advies/drukverlies-cv-ketel':'Boiler pressure loss',
    '/werkgebied':'Service area','/faq':'Frequently asked questions','/over-ons':'About AB Service','/algemene-voorwaarden':'Terms and conditions',
    '/werkgebied/antwerpen':'Antwerp province','/werkgebied/limburg':'Limburg','/werkgebied/oost-vlaanderen':'East Flanders','/werkgebied/vlaams-brabant':'Flemish Brabant','/werkgebied/west-vlaanderen':'West Flanders','/werkgebied/brussel':'Brussels',
    '/contact':'Contact','/privacy-policy':'Privacy policy',
  },
};
const copy = {
  'nl-BE': {
    skip:'Ga naar de inhoud', language:'Taal', otherContacts:'Contact in andere talen', contactFR:'Contact — Français', contactEN:'Contact — English',
    availability:business.availabilityLabel, hours:business.hoursLabel, phone:'Telefoon', email:'E-mail', vat:'BTW', area:'Vlaanderen en Brussel',
    topline:'Loodgieter en verwarmingsservice in Antwerpen', brand:'Verwarming & sanitair', homeLabel:'AB Service home', call:'Bel AB Service',
    nav:{menu:'Menu',mobile:'Mobiele navigatie',desktop:'Hoofdnavigatie'}, services:'Diensten', advice:'Advies', knowledge:'Kennis en bedrijf', serviceArea:'Werkgebied',
    seatLabel:'Maatschappelijke zetel (juridisch adres)', seatGuidance:'Geen klantontvangst op dit adres. AB Service werkt bij klanten op locatie.',
    footer:'Praktische hulp bij verwarming, gasketels, sanitair en loodgieterswerk in Vlaanderen en Brussel. Elke aanvraag wordt beoordeeld op basis van de werkelijke situatie, locatie en planning.',
    whatsapp:'Contacteer AB Service via WhatsApp', greeting:'Hallo, ik heb een vraag.', googleFallback:'Bekijk ons profiel', googleClose:'Sluit Google-beoordeling', dutch:'',
  },
  'fr-BE': {
    skip:'Aller au contenu', language:'Choisir la langue', otherContacts:'Contact dans une autre langue', contactFR:'Contact — Français', contactEN:'Contact — English',
    availability:'Joignable 24 h/24 et 7 j/7', hours:'24 heures sur 24, 7 jours sur 7', phone:'Téléphone', email:'E-mail', vat:'TVA', area:'Flandre et Bruxelles',
    topline:'Plomberie et service de chauffage à Anvers', brand:'Chauffage et sanitaires', homeLabel:'AB Service — accueil (en néerlandais)', call:'Appeler AB Service',
    nav:{menu:'Menu',mobile:'Navigation mobile',desktop:'Navigation principale'}, services:'Services', advice:'Conseils', knowledge:'Conseils et entreprise', serviceArea:'Zone d’intervention',
    seatLabel:'Siège social (adresse légale)', seatGuidance:'Aucun accueil de la clientèle à cette adresse. AB Service intervient chez ses clients.',
    footer:'Une aide pratique pour le chauffage, les chaudières au gaz, les sanitaires et la plomberie en Flandre et à Bruxelles. Chaque demande est évaluée selon la situation réelle, le lieu d’intervention et le planning.',
    whatsapp:'Contacter AB Service sur WhatsApp', greeting:'Bonjour, j’ai une question.', googleFallback:'Voir notre profil', googleClose:'Fermer l’encart d’avis Google', dutch:'en néerlandais',
  },
  'en-BE': {
    skip:'Skip to content', language:'Language', otherContacts:'Contact in another language', contactFR:'Contact — Français', contactEN:'Contact — English',
    availability:'Contactable 24/7', hours:'24 hours a day, 7 days a week', phone:'Phone', email:'Email', vat:'VAT number', area:'Flanders and Brussels',
    topline:'Plumbing and heating services in Antwerp', brand:'Heating & plumbing', homeLabel:'AB Service home (in Dutch)', call:'Call AB Service',
    nav:{menu:'Menu',mobile:'Mobile navigation',desktop:'Main navigation'}, services:'Services', advice:'Advice', knowledge:'Advice and company information', serviceArea:'Service area',
    seatLabel:'Registered office (legal address)', seatGuidance:'Customers are not received at this address. AB Service works at customers’ premises.',
    footer:'Practical help with heating, gas boilers, sanitary installations and plumbing in Flanders and Brussels. Each enquiry is assessed based on the actual situation, location and schedule.',
    whatsapp:'Contact AB Service on WhatsApp', greeting:'Hello, I have a question.', googleFallback:'View our profile', googleClose:'Close Google rating', dutch:'in Dutch',
  },
};
for (const locale of LOCALES) {
  for (const key of Object.keys(copy['nl-BE'])) {
    if (key === 'nav') {
      for (const name of ['menu','mobile','desktop']) if (typeof copy[locale].nav?.[name] !== 'string' || !copy[locale].nav[name]) throw new Error('Missing translated navigation: '+locale+' '+name);
    } else if (typeof copy[locale][key] !== 'string' || (key !== 'dutch' && !copy[locale][key])) throw new Error('Missing translated copy: '+locale+' '+key);
  }
  Object.freeze(copy[locale].nav); Object.freeze(copy[locale]);
}
Object.freeze(copy);
export const getLocaleCopy = locale => {
  if (!LOCALES.includes(locale)) throw new Error('Unsupported locale');
  return copy[locale];
};
export const getWhatsAppHref = locale => locale === 'nl-BE' ? business.whatsappHref : `https://wa.me/32484906966?text=${encodeURIComponent(getLocaleCopy(locale).greeting)}`;
export const localizeLink = (locale, href, originalLabel) => {
  if (locale === 'nl-BE') return {href, label:originalLabel};
  const words = getLocaleCopy(locale), label = links[locale][href];
  if (!label) throw new Error('Missing translated link: '+href);
  if (href === '/contact') return {href:getContactRoute(locale), label};
  if (href === '/privacy-policy') return {href:getPrivacyRoute(locale), label};
  return {href, label:`${label} (${words.dutch})`};
};
export const localizeNavigation = (navigation, locale) => locale === 'nl-BE' ? navigation : navigation.map(item => {
  const translated = localizeLink(locale, item.href, item.label);
  return item.children ? {...translated, label:item.href === '/diensten' ? getLocaleCopy(locale).services : getLocaleCopy(locale).advice, overviewLabel:translated.label, children:item.children.map(child=>localizeLink(locale,child.href,child.label))} : translated;
});

// Candidates join the central published registry only with their complete routes
// in the final release task; these definitions alone create no public URL.
export const localizedPageCandidates = [
  {path:'/fr/contact',locale:'fr-BE',title:'Contacter AB Service',description:'AB Service est joignable 24 h/24 et 7 j/7 pour vos demandes de plomberie et de chauffage.'},
  {path:'/en/contact',locale:'en-BE',title:'Contact AB Service',description:'Contact AB Service about plumbing, heating, maintenance, repairs and installations. Enquiries are assessed before confirmation.'},
  {path:'/fr/confidentialite',locale:'fr-BE',title:'Politique de confidentialité | AB Service',description:'Comment AB Service traite les données des demandes de contact et de l’utilisation du site, et quels sont vos droits.'},
  {path:'/en/privacy',locale:'en-BE',title:'Privacy policy | AB Service',description:'How AB Service processes information from contact enquiries and website use, and what rights you have.'},
].map(page=>({...page,status:'published',lastModified:'2026-10-17',changeFrequency:'yearly',priority:page.path.endsWith('contact')?0.8:0.3}));
