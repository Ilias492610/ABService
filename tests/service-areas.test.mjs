import test from "node:test";
import assert from "node:assert/strict";

import {
  antwerpDistricts,
  buildCoverageDirectoryGroups,
  calculateAreaPriorityScore,
  getDistrictPublicHref,
  indexableDistricts,
  isDistrictPublishable,
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

test("coverage directory search data includes Antwerp districts without inventing links", () => {
  const groups = buildCoverageDirectoryGroups();
  const districts = groups.find((group) => group.slug === "antwerp-districts");

  assert.equal(districts.areas.length, 10);
  assert.equal(districts.areas.find((area) => area.name === "Wilrijk")?.href, "/loodgieter-wilrijk");
  assert.equal(
    getDistrictPublicHref(
      antwerpDistricts.find((area) => area.slug === "berendrecht-zandvliet-lillo")
    ),
    null
  );
});

test("all ten Antwerp districts are registered without creating a second Antwerp page", () => {
  assert.equal(antwerpDistricts.length, 10);
  assert.equal(indexableDistricts.length, 8);
  assert.equal(antwerpDistricts.find((area) => area.slug === "antwerpen")?.canonicalPath, "/");
  assert.equal(
    antwerpDistricts.find((area) => area.slug === "berendrecht-zandvliet-lillo")?.indexable,
    false
  );
  assert.ok(indexableDistricts.every((area) => area.canonicalPath === `/loodgieter-${area.slug}`));
  assert.ok(indexableDistricts.every((area) => isDistrictPublishable(area)));
});

test("regional coverage has six unique published hubs", () => {
  assert.equal(serviceRegionHubs.length, 6);
  assert.equal(new Set(serviceRegionHubs.map((hub) => hub.title)).size, 6);
  assert.ok(serviceRegionHubs.every((hub) => hub.status === "published"));
  assert.ok(serviceRegionHubs.every((hub) => hub.summary.length > 120));
  assert.ok(serviceRegionHubs.every((hub) => hub.heading.toLowerCase().includes("loodgieter")));
});

test("published district pages have explicit answers, source provenance and unique substantive copy", () => {
  const fingerprints = indexableDistricts.map((district) => {
    assert.ok(district.heading.toLowerCase().includes("loodgieter"));
    assert.equal(
      district.localSource.href,
      "https://www.antwerpen.be/assets-proxy/b6b7cf63-3c94-4413-9374-4a36f88fd401"
    );
    assert.equal(district.localSource.verifiedStatus, 200);
    assert.ok(
      district.faq.every(
        (entry) => Array.isArray(entry) && entry.length === 2 && entry[1].length >= 80
      )
    );

    const words = [
      district.intro,
      district.localContext,
      district.preparation,
      ...district.faq.flat(),
    ]
      .join(" ")
      .toLowerCase()
      .replace(/[^a-z0-9à-ÿ]+/g, " ")
      .trim()
      .split(/\s+/);
    const grams = new Set();
    for (let index = 0; index <= words.length - 8; index += 1) {
      grams.add(words.slice(index, index + 8).join(" "));
    }
    return { name: district.name, grams };
  });

  for (let left = 0; left < fingerprints.length; left += 1) {
    for (let right = left + 1; right < fingerprints.length; right += 1) {
      const a = fingerprints[left];
      const b = fingerprints[right];
      const overlap = [...a.grams].filter((gram) => b.grams.has(gram)).length;
      const union = new Set([...a.grams, ...b.grams]).size;
      assert.ok(overlap / union < 0.2, `${a.name} and ${b.name} are too similar`);
    }
  }
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
  assert.equal(
    calculateAreaPriorityScore({
      searchDemand: 6,
      searchConsoleOpportunity: 4,
      projectEvidence: 3,
      reviewEvidence: 2,
      commercialValue: 5,
      operationalAttractiveness: 4,
      organicCompetitionOpportunity: 2,
    }),
    null
  );
});
