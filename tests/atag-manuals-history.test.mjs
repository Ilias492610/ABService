const livePageRegistry = beforeLocalizationRegistry(fullLocalizedRegistry);
import { beforeFaucetRegistry } from "./fixtures/faucet-context-history.mjs";
import { beforeFaqRecognitionRegistry } from "./fixtures/faq-recognition-history.mjs";
import { beforeSanitaryReferralRegistry } from "./fixtures/sanitary-referral-history.mjs";
// Reconstruct only independently tested Task83 before earlier named history inverses.
import {beforeTzerraGuide,beforeTzerraRegistry,beforeTzerraHtml,beforeTzerraManifest} from "./fixtures/tzerra-ace-matic-history.mjs";
const faultGuides=liveFaultGuides.map(beforeTzerraGuide);
const getFaultGuide=slug=>beforeTzerraGuide(liveGetFaultGuide(slug));
const pageRegistry=livePageRegistry.map(beforeTzerraRegistry);
const getPageDefinition=path=>beforeTzerraRegistry(liveGetPageDefinition(path));
const renderFaultGuide=async slug=>beforeTzerraHtml(await liveRenderFaultGuide(slug),slug);
import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {createHash} from "node:crypto";
import {faultGuides as liveFaultGuides,getFaultGuide as liveGetFaultGuide} from "../content/fault-guides.mjs";
import {pageRegistry as fullLocalizedRegistry,getPageDefinition as liveGetPageDefinition} from "../content/site-content.mjs";
import { beforeLocalizationRegistry } from "./fixtures/localization-release-history.mjs";
import {buildPageMetadata} from "../libs/seo-data.mjs";
import {renderFaultGuide as liveRenderFaultGuide} from "./helpers/fault-guide-runtime.mjs";
import {beforeAtagManualsGuide,beforeAtagManualsRegistry,beforeAtagManualsMetadata,beforeAtagManualsHtml,beforeAtagManualsManifest} from "./fixtures/atag-manuals-history.mjs";
const f=JSON.parse(await readFile(new URL("./fixtures/atag-manuals-source-facts.json",import.meta.url),"utf8"));
const manifest=beforeTzerraManifest(JSON.parse(await readFile(new URL("../docs/seo/fault-code-model-coverage.json",import.meta.url),"utf8")));
const hash=v=>createHash("sha256").update(typeof v==="string"?v:JSON.stringify(v)).digest("hex");

test("named ATAG addition restores actual pre-edit guides registry metadata and SSR without hash rebasing",async()=>{
 assert.equal(hash(faultGuides.map(beforeAtagManualsGuide)),f.before.preservation.allGuides);
 assert.equal(hash(pageRegistry.map(beforeFaucetRegistry).map(beforeFaqRecognitionRegistry).map(beforeSanitaryReferralRegistry).map(beforeAtagManualsRegistry)),f.before.preservation.allRegistry);
 assert.deepEqual(beforeAtagManualsMetadata(buildPageMetadata(getPageDefinition(f.page.path)),"atag"),f.before.metadata);
 assert.equal(hash(beforeAtagManualsHtml(await renderFaultGuide("atag"),"atag")),f.before.preservation.atagHtml);
});
test("ATAG manifest inverse removes only two named entries originals references and numeric increments",()=>{
 assert.equal(hash(beforeAtagManualsManifest(manifest)),f.before.preservation.allManifest);
 assert.equal(hash(beforeAtagManualsManifest(manifest).entries),f.before.preservation.otherManifestEntries);
 assert.equal(hash(beforeAtagManualsManifest(manifest).snapshots),f.before.preservation.allSnapshots);
});
test("ATAG guide inverse keeps unknown leaves old overview drift and wrong row counts detectable",()=>{
 const base=getFaultGuide("atag");
 for(const mutate of [x=>x.catalogs[0].codes[0].meaning="DRIFT",x=>x.codes[0].meaning="DRIFT",x=>x.codeEntryCount++,x=>x.modelWarning+=" DRIFT",x=>x.unexpectedLeaf=true]){
  const g=structuredClone(base);mutate(g);assert.notEqual(hash(faultGuides.map(x=>beforeAtagManualsGuide(x.slug==="atag"?g:x))),f.before.preservation.allGuides);
 }
});
test("ATAG metadata registry inverse does not overwrite unrelated canonicals descriptions or unknown leaves",()=>{
 const page=getPageDefinition(f.page.path),metadata=buildPageMetadata(page);
 for(const update of [{priority:0.99},{description:"DRIFT"},{unexpectedLeaf:true}])assert.notDeepEqual(beforeAtagManualsRegistry({...page,...update}),f.before.page);
 for(const mutate of [x=>x.description="DRIFT",x=>x.alternates.canonical="https://invalid.test/",x=>x.openGraph.images[0].width=1,x=>x.unexpectedLeaf=true]){
  const m=structuredClone(metadata);mutate(m);assert.notDeepEqual(beforeAtagManualsMetadata(m,"atag"),f.before.metadata);
 }
});
test("ATAG manifest inverse preserves all old source drift wrong increments and unknown fields",()=>{
 for(const mutate of [x=>x.entries[0].models=["DRIFT"],x=>x.entries[0].revision="DRIFT",x=>x.entries[0].unexpectedLeaf=true,x=>x.snapshots[0].sha256="DRIFT",x=>x.counts.displayedExplanationRows++,x=>x.guides.find(g=>g.slug==="atag").explanationRowCount++,x=>x.guides.find(g=>g.slug==="atag").modelWarning+=" DRIFT",x=>x.unexpectedLeaf=true]){
  const m=structuredClone(manifest);mutate(m);assert.notEqual(hash(beforeAtagManualsManifest(m)),f.before.preservation.allManifest);
 }
});
test("ATAG HTML inverse retains original cards classes appended unknown content and wrong counts",async()=>{
 const html=await renderFaultGuide("atag");
 for(const update of [html.replace("C105","DRIFT"),html.replace('class="fault-code-card"','class="DRIFT"'),html+"<p>DRIFT</p>",html.replace("50 brongebonden","51 brongebonden")])assert.notEqual(hash(beforeAtagManualsHtml(update,"atag")),f.before.preservation.atagHtml);
});
test("ATAG history inverse is a no-op on other models pages metadata HTML and already restored manifests",async()=>{
 const other=getFaultGuide("buderus"),page=getPageDefinition("/foutcodes/buderus"),meta=buildPageMetadata(page),html=await renderFaultGuide("buderus");
 assert.equal(beforeAtagManualsGuide(other),other);assert.equal(beforeAtagManualsRegistry(page),page);assert.equal(beforeAtagManualsMetadata(meta,"buderus"),meta);assert.equal(beforeAtagManualsHtml(html,"buderus"),html);
 const restored=beforeAtagManualsManifest(manifest);assert.deepEqual(beforeAtagManualsManifest(restored),restored);
});
