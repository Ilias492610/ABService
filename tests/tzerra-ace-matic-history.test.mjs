const livePageRegistry = beforeLocalizationRegistry(fullLocalizedRegistry);
import { beforeFaucetRegistry } from "./fixtures/faucet-context-history.mjs";
import { beforeFaqRecognitionRegistry } from "./fixtures/faq-recognition-history.mjs";
import { beforeSanitaryReferralRegistry } from "./fixtures/sanitary-referral-history.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {createHash} from "node:crypto";
import {faultGuides as liveFaultGuides,getFaultGuide as liveGetFaultGuide} from "../content/fault-guides.mjs";
import {pageRegistry as fullLocalizedRegistry,getPageDefinition as liveGetPageDefinition} from "../content/site-content.mjs";
import { beforeLocalizationRegistry } from "./fixtures/localization-release-history.mjs";
import {buildPageMetadata as liveBuildPageMetadata} from "../libs/seo-data.mjs";
import {renderFaultGuide as liveRenderFaultGuide} from "./helpers/fault-guide-runtime.mjs";
import {beforeQuintaGuide,beforeQuintaRegistry,beforeQuintaMetadata,beforeQuintaHtml,beforeQuintaManifest} from "./fixtures/quinta-ace-history.mjs";
const faultGuides=liveFaultGuides.map(beforeQuintaGuide);
const getFaultGuide=slug=>beforeQuintaGuide(liveGetFaultGuide(slug));
const pageRegistry=livePageRegistry.map(beforeQuintaRegistry);
const getPageDefinition=path=>beforeQuintaRegistry(liveGetPageDefinition(path));
const buildPageMetadata=p=>beforeQuintaMetadata(liveBuildPageMetadata(p),p.path==="/foutcodes/remeha"?"remeha":"");
const renderFaultGuide=async slug=>beforeQuintaHtml(await liveRenderFaultGuide(slug),slug);
import {beforeTzerraGuide,beforeTzerraRegistry,beforeTzerraMetadata,beforeTzerraHtml,beforeTzerraManifest} from "./fixtures/tzerra-ace-matic-history.mjs";
const f=JSON.parse(await readFile(new URL("./fixtures/tzerra-ace-matic-source-facts.json",import.meta.url),"utf8"));
const manifest=beforeQuintaManifest(JSON.parse(await readFile(new URL("../docs/seo/fault-code-model-coverage.json",import.meta.url),"utf8")));
const hash=v=>createHash("sha256").update(typeof v==="string"?v:JSON.stringify(v)).digest("hex");

test("named Tzerra inverse restores actual pre-edit full guide registry metadata and SSR capture",async()=>{
 assert.equal(hash(faultGuides.map(beforeTzerraGuide)),f.before.preservation.allGuides);
 assert.equal(hash(pageRegistry.map(beforeFaucetRegistry).map(beforeFaqRecognitionRegistry).map(beforeSanitaryReferralRegistry).map(beforeTzerraRegistry)),f.before.preservation.allRegistry);
 assert.deepEqual(beforeTzerraMetadata(buildPageMetadata(getPageDefinition(f.page.path)),"remeha"),f.before.metadata);
 assert.equal(hash(beforeTzerraHtml(await renderFaultGuide("remeha"),"remeha")),f.before.preservation.remehaHtml);
});
test("named Tzerra manifest inverse removes only3tables2originals mirrors and97rowincrements",()=>{
 assert.equal(hash(beforeTzerraManifest(manifest)),f.before.preservation.allManifest);
 assert.equal(hash(beforeTzerraManifest(manifest).entries),f.before.preservation.allManifestEntries);
 assert.equal(hash(beforeTzerraManifest(manifest).snapshots),f.before.preservation.allSnapshots);
});
test("Tzerra inverse does not hide earlier model row drift count drift or unknown guide leaves",()=>{
 assert.equal(hash(faultGuides.map(beforeTzerraGuide)),f.before.preservation.allGuides);
 for(const mutate of [g=>g.catalogs[0].codes[0].meaning="DRIFT",g=>g.codes[0].meaning="DRIFT",g=>g.codeEntryCount++,g=>g.modelWarning+=" DRIFT",g=>g.unexpectedLeaf=true]){
  const g=structuredClone(getFaultGuide("remeha"));mutate(g);
  assert.notEqual(hash(faultGuides.map(x=>beforeTzerraGuide(x.slug==="remeha"?g:x))),f.before.preservation.allGuides);
 }
});
test("Tzerra registry metadata inverse keeps unknown fields bad canonical image and nonexact titles visible",()=>{
 assert.equal(hash(pageRegistry.map(beforeFaucetRegistry).map(beforeFaqRecognitionRegistry).map(beforeSanitaryReferralRegistry).map(beforeTzerraRegistry)),f.before.preservation.allRegistry);
 const p=getPageDefinition(f.page.path),m=buildPageMetadata(p);
 assert.deepEqual(beforeTzerraMetadata(m,"remeha"),f.before.metadata);
 for(const update of [{priority:0.99},{description:"DRIFT"},{title:"DRIFT"},{unexpectedLeaf:true}])assert.notDeepEqual(beforeTzerraRegistry({...p,...update}),f.before.page);
 for(const mutate of [m=>m.title="DRIFT",m=>m.description="DRIFT",m=>m.alternates.canonical="https://invalid.test/",m=>m.openGraph.images[0].width=1,m=>m.unexpectedLeaf=true]){
  const value=structuredClone(m);mutate(value);assert.notDeepEqual(beforeTzerraMetadata(value,"remeha"),f.before.metadata);
 }
});
test("Tzerra manifest inverse preserves old snapshot fields unknown leaves and erroneous increments",()=>{
 assert.equal(hash(beforeTzerraManifest(manifest)),f.before.preservation.allManifest);
 for(const mutate of [m=>m.entries[0].models=["DRIFT"],m=>m.entries[0].unexpectedLeaf=true,m=>m.snapshots[0].sha256="DRIFT",m=>m.counts.displayedExplanationRows++,m=>m.guides.find(g=>g.slug==="remeha").explanationRowCount++,m=>m.guides.find(g=>g.slug==="remeha").modelWarning+=" DRIFT",m=>m.unexpectedLeaf=true]){
  const value=structuredClone(manifest);mutate(value);assert.notEqual(hash(beforeTzerraManifest(value)),f.before.preservation.allManifest);
 }
});
test("Tzerra SSR inverse preserves old card text classes unknown markup and bad result counts",async()=>{
 const html=await renderFaultGuide("remeha");assert.equal(hash(beforeTzerraHtml(html,"remeha")),f.before.preservation.remehaHtml);
 for(const value of [html.replace("E:01","DRIFT"),html.replace('class="fault-code-card"','class="DRIFT"'),html+"<p>DRIFT</p>",html.replace("756 brongebonden","757 brongebonden")])assert.notEqual(hash(beforeTzerraHtml(value,"remeha")),f.before.preservation.remehaHtml);
});
test("Tzerra inverse is a no-op outside Remeha and idempotent after its own exact reversal",async()=>{
 const g=getFaultGuide("atag"),p=getPageDefinition("/foutcodes/atag"),m=buildPageMetadata(p),html=await renderFaultGuide("atag");
 assert.equal(beforeTzerraGuide(g),g);assert.equal(beforeTzerraRegistry(p),p);assert.equal(beforeTzerraMetadata(m,"atag"),m);assert.equal(beforeTzerraHtml(html,"atag"),html);
 assert.equal(hash(beforeTzerraManifest(manifest)),f.before.preservation.allManifest);
 const restored=beforeTzerraManifest(manifest);assert.deepEqual(beforeTzerraManifest(restored),restored);
});
