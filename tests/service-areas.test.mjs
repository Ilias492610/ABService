import test from "node:test";
import assert from "node:assert/strict";

import {
  antwerpDistricts,
  calculateAreaPriorityScore,
  indexableDistricts,
  provinceGroups,
  serviceAreas,
  serviceRegionHubs,
} from "../content/service-areas.mjs";

test("coverage registry contains the official 304 municipalities", () => {
  assert.equal(serviceAreas.length, 304);
  assert.equal(new Set(serviceAreas.map((area) => area.slug)).size, 304);
  assert.ok(serviceAreas.every((area) => area.served === true));
  assert.ok(serviceAreas.every((area) => area.indexable === false));
  assert.deepEqual(
    provinceGroups.map((group) => [group.name, group.areas.length]),
    [
      ["Antwerpen", 67],
      ["Limburg", 38],
      ["Oost-Vlaanderen", 55],
      ["Vlaams-Brabant", 63],
      ["West-Vlaanderen", 62],
      ["Brussels Hoofdstedelijk Gewest", 19],
    ]
  );
});

test("all ten Antwerp districts are registered without creating a second Antwerp page", () => {
  assert.equal(antwerpDistricts.length, 10);
  assert.equal(indexableDistricts.length, 9);
  assert.equal(antwerpDistricts.find((area) => area.slug === "antwerpen")?.canonicalPath, "/");
  assert.ok(indexableDistricts.every((area) => area.canonicalPath === `/loodgieter-${area.slug}`));
});

test("regional coverage has six unique published hubs", () => {
  assert.equal(serviceRegionHubs.length, 6);
  assert.equal(new Set(serviceRegionHubs.map((hub) => hub.title)).size, 6);
  assert.ok(serviceRegionHubs.every((hub) => hub.status === "published"));
  assert.ok(serviceRegionHubs.every((hub) => hub.summary.length > 120));
});

test("municipality prioritization cannot invent missing research scores", () => {
  assert.ok(serviceAreas.every((area) => area.priorityScore === null));
  assert.equal(
    calculateAreaPriorityScore({
      searchDemand: 5,
      searchConsoleOpportunity: 4,
      projectEvidence: 3,
      reviewEvidence: 2,
      commercialValue: 5,
      operationalAttractiveness: 4,
      organicCompetitionOpportunity: 2,
    }),
    25
  );
});
