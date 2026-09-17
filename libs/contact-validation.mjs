const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9][0-9\s()./-]{6,38}[0-9]$/;

export const CONTACT_SERVICES = Object.freeze([
  "Onderhoud cv-ketel",
  "Herstelling verwarming",
  "Keuring cv-installatie",
  "Installatie gasketel",
  "Sanitair of loodgieterswerk",
  "Lekdetectie",
  "Waterlek herstellen",
  "Ontstopping",
  "Boiler plaatsen of herstellen",
  "Leidingen plaatsen of aanpassen",
  "Badkamerrenovatie",
  "Andere vraag",
]);

const clean = (value) => (typeof value === "string" ? value.trim() : "");

export const validateContactInput = (input = {}) => {
  const name = clean(input.name);
  const phone = clean(input.phone);
  const email = clean(input.email).toLowerCase();
  const address = clean(input.address || input.street);
  const city = clean(input.city);
  const postalCode = clean(input.postalCode);
  const service = clean(input.service);
  const brand = clean(input.brand);
  const boilerType = clean(input.boilerType || input.type);
  const message = clean(input.message);
  const consent =
    input.consent === true || input.consent === "true" || input.consent === "on";
  const errors = {};

  if (!name) errors.name = "Vul uw naam in.";
  else if (name.length > 120) errors.name = "Gebruik maximaal 120 tekens voor uw naam.";

  if (!phone) errors.phone = "Vul uw telefoonnummer in.";
  else if (!phonePattern.test(phone) || phone.replace(/\D/g, "").length < 8) {
    errors.phone = "Vul een geldig telefoonnummer in.";
  }

  if (email.length > 200) errors.email = "Gebruik maximaal 200 tekens voor uw e-mailadres.";
  else if (!emailPattern.test(email)) errors.email = "Vul een geldig e-mailadres in.";

  if (address.length > 200) errors.address = "Gebruik maximaal 200 tekens voor het adres.";
  if (city.length > 100) errors.city = "Gebruik maximaal 100 tekens voor de gemeente.";
  if (postalCode.length > 20) errors.postalCode = "Gebruik maximaal 20 tekens voor de postcode.";
  if (service && !CONTACT_SERVICES.includes(service)) {
    errors.service = "Kies een geldige dienst of laat het veld leeg.";
  }
  if (brand.length > 120) errors.brand = "Gebruik maximaal 120 tekens voor merk en model.";
  if (boilerType.length > 120) errors.boilerType = "Gebruik maximaal 120 tekens voor type of productcode.";
  if (message.length > 3000) errors.message = "Gebruik maximaal 3000 tekens voor uw toelichting.";
  if (!consent) errors.consent = "Bevestig dat u het privacybeleid heeft gelezen.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      name,
      phone,
      email,
      address,
      city,
      postalCode,
      service,
      brand,
      boilerType,
      message,
      consent: true,
    },
  };
};
