import test from "node:test";
import assert from "node:assert/strict";
import { createHarness } from "./helpers/wp12-runtime.mjs";

// Before the marker is in the real observer selector, widgets cover the new links.
test("visible tariffs service context clears floating controls while retaining card focus and restores after exit", async () => {
  const h = await createHarness("floating", { deferEffects: true, zones: [{ selector: ".tariff-service-context", visible: true }] });
  const visible = () => [h.all(".whatsapp-button").length, h.all(".google-rating-popup").length];
  try {
    assert.deepEqual(visible(), [1, 1]);
    const cardLink = h.addZone("a", true, h.zoneNodes[0]);
    cardLink.focus();
    h.flushEffects();
    assert.deepEqual(visible(), [0, 0]);
    assert.equal(h.document.activeElement, cardLink);
    h.observers.at(-1).emit(h.zoneNodes[0], false);
    h.render();
    assert.deepEqual(visible(), [1, 1]);
  } finally { h.dispose(); }
});
