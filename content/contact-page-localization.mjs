const copy = {
  "fr-BE": {
    "home": "Accueil (en néerlandais)",
    "breadcrumbs": "Fil d’Ariane",
    "contact": "Contact",
    "title": "Présentez votre demande à AB Service",
    "intro": "Décrivez les travaux ou le problème aussi précisément que possible. Un délai, un prix ou un rendez-vous ne devient définitif qu’après examen et confirmation de votre demande par AB Service. AB Service intervient chez ses clients. Aucun accueil de la clientèle n’est prévu à l’adresse de l’entreprise.",
    "cta": "Accéder au formulaire",
    "form": "Formulaire de demande",
    "formHeading": "Quelles informations sont utiles ?",
    "imageAlt": "AB Service explique le fonctionnement d’une installation de chauffage",
    "direct": "Contact direct",
    "company": "Entreprise",
    "conversation": "Commencer une conversation",
    "warning": "Ce formulaire n’est pas un service d’urgence",
    "danger": "N’utilisez pas le formulaire en cas d’odeur de gaz, de suspicion de monoxyde de carbone (CO) ou de danger immédiat. Quittez les lieux et contactez le service d’urgence ou le gestionnaire de réseau compétent.",
    "call": "Appeler le",
    "heroAsideLabel": "Comment se déroule votre demande",
    "heroAsideHeading": "Les informations utiles pour nous contacter",
    "heroAside": "Indiquez le type d’appareil ou de travaux, le message d’erreur et les vérifications déjà effectuées. AB Service pourra ainsi mieux évaluer votre demande.",
    "tariffs": "Comprendre comment les prix et les devis sont établis (en néerlandais) →",
    "defaultCta": "Discutons de votre demande"
  },
  "en-BE": {
    "home": "Home (in Dutch)",
    "breadcrumbs": "Breadcrumb",
    "contact": "Contact",
    "title": "Tell AB Service what you need",
    "intro": "Describe the work or problem as clearly as possible. A timeframe, price or appointment is only final once AB Service has assessed and confirmed your request. AB Service works at customers’ premises. Customers are not received at the business address.",
    "cta": "Go to the form",
    "form": "Enquiry form",
    "formHeading": "What information helps?",
    "imageAlt": "AB Service explains a heating system",
    "direct": "Contact us directly",
    "company": "Enterprise number",
    "conversation": "Start a conversation",
    "warning": "Not an emergency contact channel",
    "danger": "Do not use the form if you smell gas, suspect carbon monoxide or face immediate danger. Leave the area and contact the appropriate emergency service or utility network operator.",
    "call": "Call",
    "heroAsideLabel": "How your enquiry works",
    "heroAsideHeading": "Help us understand your enquiry",
    "heroAside": "Include the type of appliance or work, any error message and what you have already checked. This helps AB Service assess your enquiry.",
    "tariffs": "Read how prices and quotations are determined (in Dutch) →",
    "defaultCta": "Discuss your enquiry"
  }
};
const requiredText = 'home breadcrumbs contact title intro cta form formHeading imageAlt direct company conversation warning danger call heroAsideLabel heroAsideHeading heroAside tariffs defaultCta'.split(' ');
for (const entry of Object.values(copy)) {
  for (const key of requiredText) {
    if (typeof entry[key] !== 'string' || !entry[key].trim()) throw new Error(`Invalid localized copy: contact-page.${key}`);
  }
}

export const getContactPageCopy = locale => {
  if (!Object.hasOwn(copy, locale)) throw new Error('Unsupported contact page locale');
  return copy[locale];
};

