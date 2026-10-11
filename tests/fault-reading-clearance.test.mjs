import { beforeIthoHtml } from "./fixtures/itho-base-cube-source-safety.mjs";
import { beforeFerroliHtml } from "./fixtures/ferroli-bluesense-source-safety.mjs";
import { beforeNefitHtml } from "./fixtures/nefit-proline-source-safety.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { createHarness } from "./helpers/wp12-runtime.mjs";
import { renderFaultGuide } from "./helpers/fault-guide-runtime.mjs";
import { beforeIntergasHtml } from "./fixtures/intergas-prestige-source-context.mjs";
import { readingMarker, beforeFaultReadingHtml, acceptedReadingHtmlHashes } from "./fixtures/fault-reading-clearance.mjs";
const visible=h=>[h.all(".whatsapp-button").length,h.all(".google-rating-popup").length];

test("initial fault reading geometry clears pending controls while keeping an existing reader focus", async()=>{
  const h=await createHarness("floating",{deferEffects:true,zones:[{selector:".fault-guide-reading",visible:true}]});
  try{assert.deepEqual(visible(h),[1,1]);const link=h.addZone("a",true,h.zoneNodes[0]);link.focus();h.flushEffects();assert.deepEqual(visible(h),[0,0]);assert.equal(h.document.activeElement,link);h.observers.at(-1).emit(h.zoneNodes[0],false);h.render();assert.deepEqual(visible(h),[1,1]);}finally{h.dispose();}
});
for(const selector of [".whatsapp-button",".google-rating-link",".google-rating-close"]){
  test(`fault reading hands owned ${selector} focus to header and only restores after all zones leave`,async()=>{
    const h=await createHarness("floating",{zones:[{selector:".fault-guide-reading",visible:false},{selector:"form",visible:false}]});
    try{const [reading,form]=h.zoneNodes;h.query(selector).focus();h.observers.at(-1).emit(reading,true);h.render();assert.deepEqual(visible(h),[0,0]);assert.equal(h.document.activeElement,h.brand);assert.equal(h.brand.focusOptions.preventScroll,true);h.observers.at(-1).emit(form,true);h.render();h.observers.at(-1).emit(reading,false);h.render();assert.deepEqual(visible(h),[0,0]);h.observers.at(-1).emit(form,false);h.render();assert.deepEqual(visible(h),[1,1]);}finally{h.dispose();}
  });
}
test("fault reading entry retains unrelated source-link focus instead of stealing it",async()=>{
  const h=await createHarness("floating",{zones:[{selector:".fault-guide-reading",visible:false}]});
  try{const link=h.addZone("a",true,h.zoneNodes[0]);link.focus();h.observers.at(-1).emit(h.zoneNodes[0],true);h.render();assert.deepEqual(visible(h),[0,0]);assert.equal(h.document.activeElement,link);}finally{h.dispose();}
});
test("wrapped fault reading arriving after navigation clears controls and detached or stale regions release them",async()=>{
  const h=await createHarness("floating");
  try{h.navigate("/foutcodes/acv");const wrapper=h.addZone(".route-wrapper"),reading=h.addZone(".fault-guide-reading",true,wrapper);h.mutations.at(-1).emit([wrapper]);h.render();assert.deepEqual(visible(h),[0,0]);assert.equal(h.observers.at(-1).targets.has(reading),true);h.main.children=h.main.children.filter(n=>n!==wrapper);h.mutations.at(-1).emit([],[wrapper]);h.render();assert.deepEqual(visible(h),[1,1]);h.observers.at(-1).emit(reading,true);h.render();assert.deepEqual(visible(h),[1,1]);}finally{h.dispose();}
});
test("fault reading navigation and stale callbacks cannot reopen an explicitly dismissed Google popup",async()=>{
  const h=await createHarness("floating",{zones:[{selector:".fault-guide-reading",visible:false}]});
  try{h.brand.focus();h.click(h.query(".google-rating-close"));assert.deepEqual(visible(h),[1,0]);const reading=h.zoneNodes[0],observer=h.observers.at(-1),mutation=h.mutations.at(-1);observer.emit(reading,true);h.render();assert.deepEqual(visible(h),[0,0]);h.navigate("/foutcodes/bulex");assert.equal(observer.disconnected,true);assert.equal(mutation.disconnected,true);assert.deepEqual(visible(h),[1,0]);observer.emit(reading,true);h.render();assert.deepEqual(visible(h),[1,0]);h.observers.at(-1).emit(reading,true);h.render();assert.deepEqual(visible(h),[0,0]);h.observers.at(-1).emit(reading,false);h.render();assert.deepEqual(visible(h),[1,0]);}finally{h.dispose();}
});
test("all13 real routes mark the complete existing fault reading region and preserve every other HTML element",async()=>{
  for(const [slug,expected]of acceptedReadingHtmlHashes){const html=await renderFaultGuide(slug);assert.equal(html.split(readingMarker).length,2,slug);const start=html.indexOf(readingMarker);assert.ok(start<html.indexOf('class="fault-catalog-intro"'));assert.ok(start<html.indexOf('class="fault-catalog"'));assert.ok(html.indexOf('class="source-note"')>start);assert.match(html,/<section class="contact-cta">/);const retained=beforeIntergasHtml(beforeNefitHtml(beforeFerroliHtml(beforeIthoHtml(beforeFaultReadingHtml(html),slug),slug),slug),slug);assert.equal(createHash("sha256").update(retained).digest("hex"),expected,slug);}
});
