import test from "node:test";
import assert from "node:assert/strict";
import { getMaintenanceResult } from "../libs/maintenance-check.mjs";

const today = "2026-10-10";
const gas = { region: "vlaanderen", device: "central", fuel: "gas", power: "atleast20", lastDate: "2024-05-12", changed: "no" };
const check = (overrides = {}) => getMaintenanceResult({ ...gas, ...overrides }, today);

test("Flemish central gas at or above 20 kW gets a two-year planning date", () => {
  const result = check();
  assert.equal(result.kind, "periodic");
  assert.equal(result.intervalYears, 2);
  assert.equal(result.planningDate, "2026-05-12");
  assert.match(result.summary, /richtdatum/i);
  assert.ok(result.notes.some((note) => /3 maanden/.test(note)));
  assert.ok(result.notes.some((note) => /oorspronkelijke/.test(note)));
  assert.equal(result.service, "Onderhoud cv-ketel");
});

test("Flemish below-20 gas and liquid fuel do not get a fabricated mandatory date", () => {
  for (const fuel of ["gas", "liquid"]) {
    const result = check({ fuel, power: "below20" });
    assert.equal(result.kind, "recommended");
    assert.equal(result.intervalYears, null);
    assert.equal(result.planningDate, null);
  }
});

test("unknown Flemish power prevents a definitive gas or liquid interval", () => {
  for (const fuel of ["gas", "liquid"]) {
    const result = check({ fuel, power: "unknown" });
    assert.equal(result.kind, "unknown");
    assert.equal(result.planningDate, null);
    assert.match(result.summary, /vermogen/i);
  }
});

test("liquid and solid central fuel rules are yearly without offering unsupported services", () => {
  assert.equal(check({ fuel: "liquid" }).intervalYears, 1);
  const solid = check({ fuel: "solid", power: "below20" });
  assert.equal(solid.intervalYears, 1);
  assert.equal(solid.service, "Andere vraag");
  assert.match(solid.notes.join(" "), /bevoegde uitvoerder/i);
});

test("Brussels gas boilers do not inherit the Flemish power threshold", () => {
  for (const power of ["unknown", "below20", "atleast20"]) {
    const result = check({ region: "brussel", power });
    assert.equal(result.intervalYears, 2);
    assert.equal(result.planningDate, "2026-05-12");
    assert.match(result.source, /leefmilieu\.brussels/);
  }
});

test("Brussels gas water heater and Flemish separate water heater have distinct scopes", () => {
  assert.equal(check({ region: "brussel", device: "gas-water-heater", power: "unknown" }).intervalYears, 2);
  const separate = check({ device: "gas-water-heater" });
  assert.equal(separate.kind, "outside-scope");
  assert.equal(separate.planningDate, null);
});

test("Brussels liquid and solid boilers use a yearly rule", () => {
  for (const fuel of ["liquid", "solid"]) {
    assert.equal(check({ region: "brussel", fuel, power: "unknown" }).intervalYears, 1);
  }
});

test("electric devices and unknown regions receive no combustion deadline", () => {
  for (const overrides of [{ device: "electric" }, { region: "other" }, { region: "unknown" }, { device: "unknown" }, { fuel: "unknown" }]) {
    const result = check(overrides);
    assert.equal(result.planningDate, null);
    assert.equal(result.intervalYears, null);
  }
  assert.equal(getMaintenanceResult({}, today).kind, "unknown");
});

test("new or changed combustion installations prioritize inspection", () => {
  const result = check({ changed: "yes" });
  assert.equal(result.kind, "inspection");
  assert.equal(result.service, "Keuring cv-installatie");
  assert.equal(result.planningDate, null);
  assert.match(result.source, /verplichte-keuring/);
  assert.equal(check({ region: "brussel", changed: "yes" }).kind, "inspection");
});

test("unknown installation changes require clarification before a planning date", () => {
  assert.equal(check({ changed: "unknown" }).kind, "unknown");
  assert.equal(check({ changed: "unknown" }).planningDate, null);
});

test("new Brussels separate gas water heater requires initial periodic control, not central commissioning", () => {
  const result = check({ region: "brussel", device: "gas-water-heater", power: "unknown", changed: "yes" });
  assert.equal(result.kind, "inspection");
  assert.equal(result.service, "Boiler plaatsen of herstellen");
  assert.match(result.summary, /periodieke controle.*plaatsing/i);
  assert.doesNotMatch(result.summary, /EPB-oplevering/);
  assert.equal(result.planningDate, null);
});

test("no maintenance date can still explain the rule without inventing a date", () => {
  const result = check({ lastDate: "" });
  assert.equal(result.intervalYears, 2);
  assert.equal(result.planningDate, null);
  assert.match(result.notes.join(" "), /attest/i);
});

test("invalid, impossible, future or zero-padded-wrong dates are rejected", () => {
  for (const lastDate of ["2026-02-30", "2025-02-29", "2026-13-01", "2026-10-11", "2026-1-01", "not-a-date", "0000-01-01"]) {
    const result = check({ lastDate });
    assert.equal(result.kind, "invalid", lastDate);
    assert.equal(result.planningDate, null);
  }
  assert.equal(getMaintenanceResult(gas, "not-a-date").kind, "invalid");
});

test("leap-year anniversary clamps to valid February date", () => {
  assert.equal(check({ lastDate: "2024-02-29" }).planningDate, "2026-02-28");
  assert.equal(check({ fuel: "liquid", lastDate: "2024-02-29" }).planningDate, "2025-02-28");
});

test("unrecognized selections and contradictory gas-water-heater fuel are invalid", () => {
  for (const overrides of [{ region: "<script>" }, { device: "fake" }, { fuel: "fake" }, { power: "fake" }, { changed: "fake" }, { device: "gas-water-heater", fuel: "liquid" }]) {
    assert.equal(check(overrides).kind, "invalid");
  }
});
