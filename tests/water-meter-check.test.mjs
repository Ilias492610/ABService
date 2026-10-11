import test from "node:test";
import assert from "node:assert/strict";
import { getWaterMeterObservation, waterMeterSources } from "../libs/water-meter-check.mjs";

const valid = Object.freeze({
  safeAccess: "yes", waterNearElectricity: "no", meterScope: "own",
  waterUse: "none", unit: "m3", firstReading: "12.345",
  secondReading: "12.346", minutes: "60",
});
const check = (overrides = {}) => getWaterMeterObservation({ ...valid, ...overrides });
const noCalculation = (result, status) => {
  assert.equal(result?.status, status);
  assert.equal(result.differenceLitres, null);
  assert.equal(result.litresPerHour, null);
  assert.equal(result.nextService, null);
};

// These fixtures catch subtraction tails, wrong units, duration scaling and rounding.
for (const [label, overrides, difference, hourly] of [
  ["one litre in cubic metres", {}, 1, 1],
  ["comma decimals", { firstReading: " 12,345 ", secondReading: "12,346", minutes: " 30,000 " }, 1, 2],
  ["thousandth of a litre", { unit: "litres", firstReading: "0.001", secondReading: "0.002" }, 0.001, 0.001],
  ["litre units with commas", { unit: "litres", firstReading: "0,100", secondReading: "0,225", minutes: "15" }, 0.125, 0.5],
  ["zero readings", { firstReading: "0", secondReading: "0" }, 0, 0],
  ["equal nonzero readings", { firstReading: "123", secondReading: "123" }, 0, 0],
  ["fractional duration", { unit: "litres", firstReading: "0", secondReading: "1", minutes: "1.5" }, 1, 40],
  ["hourly rounding down", { unit: "litres", firstReading: "0", secondReading: "1", minutes: "7" }, 1, 8.571],
  ["hourly half rounds up", { unit: "litres", firstReading: "0", secondReading: "0.001", minutes: "120" }, 0.001, 0.001],
  ["duration minimum", { minutes: "1" }, 1, 60],
  ["duration maximum", { minutes: "10080" }, 1, 0.006],
  ["largest cubic-metre reading", { firstReading: "0", secondReading: "9999999.999", minutes: "1" }, 9999999999, 599999999940],
  ["largest litre reading", { unit: "litres", firstReading: "9999999.998", secondReading: "9999999.999" }, 0.001, 0.001],
  ["leading decimal zeroes", { firstReading: "00000012.345", secondReading: "00000012.346" }, 1, 1],
]) {
  test(`observes ${label} without floating-point tails`, () => {
    const result = check(overrides);
    assert.equal(result?.status, "observation");
    assert.equal(result.differenceLitres, difference);
    assert.equal(result.litresPerHour, hourly);
    assert.ok(!Object.is(result.differenceLitres, -0));
    assert.ok(!Object.is(result.litresPerHour, -0));
    assert.equal(result.nextService, difference > 0 ? "Lekdetectie" : "Andere vraag");
  });
}

test("positive observation describes registration and leaves cause and leak location undetermined", () => {
  const result = check();
  assert.equal(result?.status, "observation");
  assert.match(result.summary, /geregistreerd.*periode/i);
  assert.match(result.limitations.join(" "), /geen.*(?:bewezen|bevestigd).*lek/i);
  assert.match(result.limitations.join(" "), /oorzaak.*plaats|oorzaak.*locatie/i);
});

test("zero observation does not exclude intermittent or other-circuit leaks", () => {
  const result = check({ secondReading: valid.firstReading });
  assert.equal(result?.status, "observation");
  assert.match(result.summary, /sluit.*(?:tijdelijk|onderbroken|intermitterend)/i);
  assert.match(result.summary, /ander.*circuit/i);
});

test("all observations state meter, hidden consumers, billing limits and own provider guidance", () => {
  for (const secondReading of ["12.345", "12.346"]) {
    const result = check({ secondReading });
    assert.equal(result?.status, "observation");
    const text = result.limitations.join(" ");
    assert.match(text, /zelfde.*totale.*meter|totale.*zelfde.*meter/i);
    assert.match(text, /zelfde eenheid/i);
    assert.match(text, /automatisch.*verbruik|verbruik.*automatisch/i);
    assert.match(text, /herstelkosten.*verzekering.*juridische/i);
    assert.match(text, /straat.*meter.*hoofdkraan/i);
    assert.match(text, /eigen waterbedrijf/i);
  }
});

test("unsafe access overrides missing and malformed unrelated fields", () => {
  for (const input of [
    { safeAccess: "no" },
    { ...valid, safeAccess: "no", firstReading: "nonsense", minutes: null, unit: "constructor" },
    { waterNearElectricity: "yes", safeAccess: "bad", meterScope: 3 },
    { ...valid, waterNearElectricity: "yes", secondReading: "-1" },
  ]) {
    const result = getWaterMeterObservation(input);
    noCalculation(result, "unsafe");
    const text = `${result.summary} ${result.limitations.join(" ")}`;
    assert.match(text, /afstand/i);
    assert.match(text, /raak.*elektrische installatie.*niet|elektrische installatie.*niet.*aan/i);
    assert.match(text, /onmiddellijk gevaar.*noodhulp/i);
    assert.doesNotMatch(text, /(?:bedien|sluit|open|demonteer).*(?:schakelaar|kraan|kast)/i);
  }
});

test("malformed enums are rejected before unknown scope or missing readings", () => {
  for (const field of ["safeAccess", "waterNearElectricity", "meterScope", "waterUse", "unit"]) {
    for (const value of ["constructor", "__proto__", "toString", "YES", "", " own ", null, undefined, 0, true, {}]) {
      const input = { ...valid, [field]: value, firstReading: "" };
      noCalculation(getWaterMeterObservation(input), "invalid");
    }
  }
});

test("malformed numeric syntax is never coerced to a valid or unknown reading", () => {
  for (const field of ["firstReading", "secondReading", "minutes"]) {
    for (const value of ["-1", "+1", "1e3", "Infinity", "NaN", "0x10", "1 000", "1_000", "1,000.000", "1.2.3", "1,,2", ".5", "1.", "1.0000", "water", "0".repeat(33), " ".repeat(32) + "1", 1, NaN, Infinity, null, undefined, {}, [], true]) {
      noCalculation(check({ [field]: value, meterScope: "unknown" }), "invalid");
    }
  }
});

test("reading and duration operational bounds reject values just outside the allowed range", () => {
  for (const field of ["firstReading", "secondReading"]) {
    for (const value of ["10000000", "9999999.9999", "99999999999999999999999999999999"]) {
      noCalculation(check({ [field]: value }), "invalid");
    }
  }
  for (const minutes of ["0", "0.999", "10080.001", "10081"]) {
    noCalculation(check({ minutes }), "invalid");
  }
  assert.match(check({ minutes: "0" }).summary, /1.*10080.*minuten/i);
  assert.match(check({ firstReading: "10000000" }).summary, /9999999[,.]999/);
});

test("empty, whitespace and absent numeric fields are unknown rather than zero", () => {
  for (const field of ["firstReading", "secondReading", "minutes"]) {
    for (const value of ["", " ", "\t\n"]) {
      const result = check({ [field]: value });
      noCalculation(result, "unknown");
      assert.match(result.summary, field === "minutes" ? /periode|minuten|duur/i : /stand/i);
    }
    const input = { ...valid };
    delete input[field];
    noCalculation(getWaterMeterObservation(input), "unknown");
  }
});

test("missing or unknown enum fields each prevent calculation and explain their requirement", () => {
  const guidance = {
    safeAccess: /veilig|toegang/i,
    waterNearElectricity: /elektriciteit|elektrische/i,
    meterScope: /eigen.*meter|meter.*eigen/i,
    waterUse: /gewoon.*automatisch|normaal.*automatisch/i,
    unit: /eenheid|m³|liter/i,
  };
  for (const [field, expected] of Object.entries(guidance)) {
    for (const remove of [false, true]) {
      const input = { ...valid, [field]: "unknown" };
      if (remove) delete input[field];
      const result = getWaterMeterObservation(input);
      noCalculation(result, "unknown");
      assert.match(result.summary, expected);
    }
  }
  noCalculation(getWaterMeterObservation(), "unknown");
  noCalculation(getWaterMeterObservation({}), "unknown");
});

test("shared meters and possible consumers cannot support an own-leak observation", () => {
  const shared = check({ meterScope: "shared" });
  noCalculation(shared, "unknown");
  assert.match(shared.summary, /gedeeld.*anderen|anderen.*gedeeld/i);
  const usage = check({ waterUse: "possible" });
  noCalculation(usage, "unknown");
  assert.match(usage.summary, /hele periode/i);
  assert.match(usage.summary, /automatisch/i);
});

test("descending readings are unknown without guessing rollover or replacement", () => {
  const result = check({ firstReading: "9999999.999", secondReading: "0" });
  noCalculation(result, "unknown");
  assert.match(result.summary, /lager|dalende/i);
  assert.match(result.summary, /aflezing.*eenheid|eenheid.*aflezing/i);
});

test("invalid containers are rejected with the complete public result shape", () => {
  for (const input of [null, [], "", "yes", 42, false, () => {}]) {
    const result = getWaterMeterObservation(input);
    noCalculation(result, "invalid");
    assert.deepEqual(Object.keys(result).sort(), ["status", "title", "summary", "differenceLitres", "litresPerHour", "limitations", "nextService"].sort());
    assert.equal(typeof result.title, "string");
    assert.equal(typeof result.summary, "string");
    assert.ok(Array.isArray(result.limitations));
  }
});

test("calls are deterministic, do not mutate inputs, and expose no private handoff payload", () => {
  const input = Object.freeze({ ...valid, email: "private@example.test", meterId: "private-meter", freeText: "private-message" });
  const snapshot = { ...input };
  const first = getWaterMeterObservation(input);
  const second = getWaterMeterObservation(input);
  assert.equal(first?.status, "observation");
  assert.deepEqual(first, second);
  assert.deepEqual(input, snapshot);
  assert.deepEqual(Object.keys(first).sort(), ["status", "title", "summary", "differenceLitres", "litresPerHour", "limitations", "nextService"].sort());
  assert.doesNotMatch(JSON.stringify(first), /private@example|private-meter|private-message/);
  first.limitations.push("Changed by caller");
  assert.deepEqual(getWaterMeterObservation(input), second);
});

test("source references provide official test, reading and Vlaanderen context for the renderer", () => {
  assert.equal(waterMeterSources?.test, "https://www.farys.be/nl/hoe-spoor-ik-zelf-lekken-op-de-lektest");
  assert.equal(waterMeterSources.meterReading, "https://www.farys.be/nl/hoe-lees-ik-de-meterstand");
  assert.equal(waterMeterSources.digitalMeter, "https://www.farys.be/nl/welke-gegevens-kan-ik-aflezen-van-de-digitale-watermeter");
  assert.equal(waterMeterSources.vlaanderen, "https://www.vlaanderen.be/bouwen-wonen-en-energie/water/een-lek-in-de-waterleiding");
  assert.ok(Object.isFrozen(waterMeterSources));
});
