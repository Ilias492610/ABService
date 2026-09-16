import test from "node:test";
import assert from "node:assert/strict";

import {
  getIndexableEntries,
  indexablePages,
  navigation,
  pageRegistry,
} from "../content/site-content.mjs";

test("indexable output excludes noindex and draft entries", () => {
  const entries = [
    { path: "/published", status: "published" },
    { path: "/temporary", status: "noindex" },
    { path: "/future", status: "draft" },
  ];

  assert.deepEqual(getIndexableEntries(entries), [entries[0]]);
});

test("the public route registry publishes tariffs and withholds unsupported pages", () => {
  const indexablePaths = indexablePages.map((entry) => entry.path);

  assert.ok(indexablePaths.includes("/tarieven"));
  assert.ok(!indexablePaths.includes("/installaties/airconditioning"));
  assert.ok(!indexablePaths.includes("/foutcodes/bosch"));
  assert.ok(!indexablePaths.includes("/foutcodes/junkers"));

  assert.equal(
    pageRegistry.find((entry) => entry.path === "/installaties/airconditioning")?.status,
    "noindex"
  );
});

test("primary navigation links only to published destinations", () => {
  const publishedPaths = new Set(indexablePages.map((page) => page.path));
  const navPaths = navigation.flatMap((item) =>
    item.children ? item.children.map((child) => child.href) : [item.href]
  );

  assert.ok(navPaths.includes("/tarieven"));
  assert.ok(!navPaths.includes("/installaties/airconditioning"));
  assert.ok(navPaths.every((path) => publishedPaths.has(path)));
});
