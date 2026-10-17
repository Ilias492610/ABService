import { getContactCopy } from '../content/contact-localization.mjs';

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

export const validateContactInput = (input = {}, { locale = 'nl-BE' } = {}) => {
  const copy = getContactCopy(locale).errors;
  if (!input || typeof input !== "object" || Array.isArray(input)) input = {};
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

  if (!name) errors.name = copy.nameRequired;
  else if (name.length > 120) errors.name = copy.nameLength;

  if (!phone) errors.phone = copy.phoneRequired;
  else if (!phonePattern.test(phone) || phone.replace(/\D/g, "").length < 8) {
    errors.phone = copy.phoneInvalid;
  }

  if (email.length > 200) errors.email = copy.emailLength;
  else if (!emailPattern.test(email)) errors.email = copy.emailInvalid;

  if (address.length > 200) errors.address = copy.address;
  if (city.length > 100) errors.city = copy.city;
  if (postalCode.length > 20) errors.postalCode = copy.postalCode;
  if (service && !CONTACT_SERVICES.includes(service)) {
    errors.service = copy.service;
  }
  if (brand.length > 120) errors.brand = copy.brand;
  if (boilerType.length > 120) errors.boilerType = copy.boilerType;
  if (message.length > 3000) errors.message = copy.message;
  if (!consent) errors.consent = copy.consent;

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
