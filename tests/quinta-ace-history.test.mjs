import { beforeFaqRecognitionRegistry } from "./fixtures/faq-recognition-history.mjs";
import { beforeSanitaryReferralRegistry } from "./fixtures/sanitary-referral-history.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {createHash} from "node:crypto";
import {faultGuides,getFaultGuide} from "../content/fault-guides.mjs";
import {pageRegistry,getPageDefinition} from "../content/site-content.mjs";
import {buildPageMetadata} from "../libs/seo-data.mjs";
import {renderFaultGuide} from "./helpers/fault-guide-runtime.mjs";
import {beforeQuintaGuide,beforeQuintaRegistry,beforeQuintaMetadata,beforeQuintaHtml,beforeQuintaManifest} from "./fixtures/quinta-ace-history.mjs";

const f=JSON.parse(await readFile(new URL("./fixtures/quinta-ace-source-facts.json",import.meta.url),"utf8"));
const manifest=JSON.parse(await readFile(new URL("../docs/seo/fault-code-model-coverage.json",import.meta.url),"utf8"));
const hash=v=>createHash("sha256").update(typeof v==="string"?v:JSON.stringify(v)).digest("hex");

test("Quinta inverse restores full actual pre-edit guides registry metadata SSR and manifest hashes",async()=>{
 assert.equal(hash(faultGuides.map(beforeQuintaGuide)),f.before.preservation.allGuides);
 assert.equal(hash(pageRegistry.map(beforeFaqRecognitionRegistry).map(beforeSanitaryReferralRegistry).map(beforeQuintaRegistry)),f.before.preservation.allRegistry);
 assert.deepEqual(beforeQuintaMetadata(buildPageMetadata(getPageDefinition(f.page.path)),"remeha"),f.before.metadata);
 assert.equal(hash(beforeQuintaHtml(await renderFaultGuide("remeha"),"remeha")),f.before.preservation.remehaHtml);
 const restored=beforeQuintaManifest(manifest);assert.equal(hash(restored),f.before.preservation.allManifest);
 assert.equal(hash(restored.entries),f.before.preservation.allManifestEntries);assert.equal(hash(restored.snapshots),f.before.preservation.allSnapshots);
});

// Break: projecting expected objects would hide old text, unknown leaves or drift.
test("Quinta inverse preserves old rows unknown leaves numeric and warning drift",()=>{
 for(const mutate of [g=>g.catalogs[0].codes[0].meaning="DRIFT",g=>g.codes[0].meaning="DRIFT",g=>g.codeEntryCount++,g=>g.modelWarning+=" DRIFT",g=>g.unexpectedLeaf=true]){
  const g=structuredClone(getFaultGuide("remeha"));mutate(g);assert.notEqual(hash(faultGuides.map(x=>beforeQuintaGuide(x.slug==="remeha"?g:x))),f.before.preservation.allGuides);
 }
 for(const mutate of [m=>m.entries[0].models=["DRIFT"],m=>m.entries[0].unexpectedLeaf=true,m=>m.snapshots[0].sha256="DRIFT",m=>m.counts.displayedExplanationRows++,m=>m.guides.find(g=>g.slug==="remeha").explanationRowCount++,m=>m.guides.find(g=>g.slug==="remeha").modelWarning+=" DRIFT",m=>m.unexpectedLeaf=true]){
  const m=structuredClone(manifest);mutate(m);assert.notEqual(hash(beforeQuintaManifest(m)),f.before.preservation.allManifest);
 }
});

test("Quinta inverse keeps registry metadata canonical unknown leaves and nonexact title drift visible",()=>{
 const p=getPageDefinition(f.page.path),m=buildPageMetadata(p);
 for(const update of [{priority:0.99},{description:"DRIFT"},{title:"DRIFT"},{unexpectedLeaf:true}])assert.notDeepEqual(beforeQuintaRegistry({...p,...update}),f.before.page);
 for(const mutate of [m=>m.title="DRIFT",m=>m.description="DRIFT",m=>m.alternates.canonical="https://invalid.test/",m=>m.openGraph.images[0].width=1,m=>m.unexpectedLeaf=true]){
  const value=structuredClone(m);mutate(value);assert.notDeepEqual(beforeQuintaMetadata(value,"remeha"),f.before.metadata);
 }
});

test("Quinta SSR inverse preserves old card classes text unknown markup and wrong count drift",async()=>{
 const html=await renderFaultGuide("remeha");
 for(const value of [html.replace("E:01","DRIFT"),html.replace('class="fault-code-card"','class="DRIFT"'),html+"<p>DRIFT</p>",html.replace("887 brongebonden","888 brongebonden").replace("816 brongebonden","817 brongebonden").replace("756 brongebonden","757 brongebonden")])assert.notEqual(hash(beforeQuintaHtml(value,"remeha")),f.before.preservation.remehaHtml);
});

test("Quinta inverse is a no-op outside Remeha and idempotent after reversal",async()=>{
 const g=getFaultGuide("atag"),p=getPageDefinition("/foutcodes/atag"),m=buildPageMetadata(p),html=await renderFaultGuide("atag");
 assert.equal(beforeQuintaGuide(g),g);assert.equal(beforeQuintaRegistry(p),p);assert.equal(beforeQuintaMetadata(m,"atag"),m);assert.equal(beforeQuintaHtml(html,"atag"),html);
 const restored=beforeQuintaManifest(manifest);assert.deepEqual(beforeQuintaManifest(restored),restored);
 const guide=beforeQuintaGuide(getFaultGuide("remeha"));assert.deepEqual(beforeQuintaGuide(guide),guide);
});
