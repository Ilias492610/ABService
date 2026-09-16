import test from "node:test";
import assert from "node:assert/strict";

import { validateContactInput } from "../libs/contact-validation.mjs";

test("contact validation rejects missing required fields without returning personal data", () => {
  const result = validateContactInput({
    name: "",
    phone: "",
    email: "not-an-email",
    consent: false,
  });

  assert.equal(result.ok, false);
  assert.deepEqual(result.errors, {
    name: "Vul uw naam in.",
    phone: "Vul uw telefoonnummer in.",
    email: "Vul een geldig e-mailadres in.",
    consent: "Bevestig dat u het privacybeleid heeft gelezen.",
  });
  assert.ok(!("data" in result));
});

test("contact validation normalizes an accepted submission", () => {
  const result = validateContactInput({
    name: "  Jan Peeters ",
    phone: " 0484 90 69 66 ",
    email: " JAN@EXAMPLE.BE ",
    consent: "on",
    service: " Herstelling verwarming ",
    message: " Geen warm water. ",
  });

  assert.equal(result.ok, true);
  assert.deepEqual(result.data, {
    name: "Jan Peeters",
    phone: "0484 90 69 66",
    email: "jan@example.be",
    address: "",
    city: "",
    postalCode: "",
    service: "Herstelling verwarming",
    brand: "",
    boilerType: "",
    message: "Geen warm water.",
    consent: true,
  });
});

test("contact validation rejects implausible phone numbers and oversized fields", () => {
  const result = validateContactInput({
    name: "N".repeat(121),
    phone: "123",
    email: `${"a".repeat(190)}@example.be`,
    address: "A".repeat(201),
    city: "C".repeat(101),
    postalCode: "1".repeat(21),
    brand: "B".repeat(121),
    boilerType: "T".repeat(121),
    message: "M".repeat(3001),
    consent: true,
  });

  assert.equal(result.ok, false);
  assert.deepEqual(result.errors, {
    name: "Gebruik maximaal 120 tekens voor uw naam.",
    phone: "Vul een geldig telefoonnummer in.",
    email: "Gebruik maximaal 200 tekens voor uw e-mailadres.",
    address: "Gebruik maximaal 200 tekens voor het adres.",
    city: "Gebruik maximaal 100 tekens voor de gemeente.",
    postalCode: "Gebruik maximaal 20 tekens voor de postcode.",
    brand: "Gebruik maximaal 120 tekens voor merk en model.",
    boilerType: "Gebruik maximaal 120 tekens voor type of productcode.",
    message: "Gebruik maximaal 3000 tekens voor uw toelichting.",
  });
  assert.ok(!("data" in result));
});

test("contact validation rejects an unrecognized service value", () => {
  const result = validateContactInput({
    name: "Jan Peeters",
    phone: "0484 90 69 66",
    email: "jan@example.be",
    service: "Injected\r\nSubject",
    consent: true,
  });

  assert.equal(result.ok, false);
  assert.equal(result.errors.service, "Kies een geldige dienst of laat het veld leeg.");
});
