// Historical captures remove only the independently tested named Task80 addition.
import { beforeAtagManualsGuide, beforeAtagManualsHtml, beforeAtagManualsManifest, beforeAtagManualsMetadata, beforeAtagManualsRegistry } from "./fixtures/atag-manuals-history.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { faultGuides, getFaultGuide } from "../content/fault-guides.mjs";
import { pageRegistry, getPageDefinition } from "../content/site-content.mjs";
import { buildPageMetadata } from "../libs/seo-data.mjs";
import { renderFaultGuide } from "./helpers/fault-guide-runtime.mjs";
import { beforeGb172Guide, beforeGb172Registry, beforeGb172Metadata, beforeGb172Html, beforeGb172Manifest } from "./fixtures/buderus-gb172i2-history.mjs";
const f=JSON.parse(await readFile(new URL("./fixtures/buderus-gb172i2-source-facts.json",import.meta.url),"utf8"));
const m=JSON.parse(await readFile(new URL("../docs/seo/fault-code-model-coverage.json",import.meta.url),"utf8"));
const hash=v=>createHash("sha256").update(typeof v==="string"?v:JSON.stringify(v)).digest("hex");

test("named GB172 addition reconstructs genuine pre-edit full guides registry metadata and SSR",async()=>{
 assert.equal(hash(faultGuides.map(beforeAtagManualsGuide).map(beforeGb172Guide)),f.before.preservation.allGuides);
 assert.equal(hash(pageRegistry.map(beforeAtagManualsRegistry).map(beforeGb172Registry)),f.before.preservation.allRegistry);
 assert.deepEqual(beforeGb172Metadata(beforeAtagManualsMetadata(buildPageMetadata(getPageDefinition(f.page.path)),"buderus"),"buderus"),f.before.metadata);
 assert.equal(hash(beforeGb172Html(beforeAtagManualsHtml(await renderFaultGuide("buderus"),"buderus"),"buderus")),f.before.preservation.buderusHtml);
});
test("manifest inverse removes only named new source assignments and recorded numeric increments",()=>{
 assert.equal(hash(beforeGb172Manifest(beforeAtagManualsManifest(m))),f.before.preservation.allManifest);
 assert.equal(hash(beforeGb172Manifest(beforeAtagManualsManifest(m)).entries),f.before.preservation.otherManifestEntries);
});
test("guide inverse retains wrong original rows counts warning suffixes and unknown fields",()=>{
 const base=structuredClone(getFaultGuide("buderus"));
 const changes=[g=>g.catalogs[0].codes[0].meaning="DRIFT",g=>g.codeEntryCount++,g=>g.modelWarning+=" DRIFT",g=>g.unexpectedLeaf={drift:true},g=>g.codes[0].meaning="DRIFT"];
 for(const mutate of changes){const g=structuredClone(base);mutate(g);assert.notEqual(hash(faultGuides.map(beforeAtagManualsGuide).map(x=>beforeGb172Guide(beforeAtagManualsGuide(x.slug==="buderus"?g:x)))),f.before.preservation.allGuides);}
});
test("registry and metadata inverses do not overwrite unexpected descriptions canonicals or unknown leaves",()=>{
 const p=getPageDefinition(f.page.path),metadata=buildPageMetadata(p);
 for(const change of [{priority:0.99},{description:"DRIFT"},{unexpectedLeaf:true}])assert.notDeepEqual(beforeGb172Registry(beforeAtagManualsRegistry({...p,...change})),f.before.page);
 for(const mutate of [x=>x.description="DRIFT",x=>x.alternates.canonical="https://invalid.test/",x=>x.openGraph.images[0].width=1,x=>x.unexpectedLeaf=true]){
  const x=structuredClone(metadata);mutate(x);assert.notDeepEqual(beforeGb172Metadata(beforeAtagManualsMetadata(x,"buderus"),"buderus"),f.before.metadata);
 }
});
test("manifest inverse preserves drift in all old source leaves and unknown fields",()=>{
 for(const mutate of [x=>x.entries[0].models=["DRIFT"],x=>x.entries[0].revision="DRIFT",x=>x.entries[0].market=["DRIFT"],x=>x.entries[0].component="DRIFT",x=>x.entries[0].unexpectedLeaf=true,x=>x.snapshots[0].sha256="DRIFT",x=>x.counts.displayedExplanationRows++,x=>x.guides.find(g=>g.slug==="buderus").explanationRowCount++,x=>x.guides.find(g=>g.slug==="buderus").modelWarning+=" DRIFT",x=>x.unexpectedLeaf=true]){
  const changed=structuredClone(m);mutate(changed);assert.notEqual(hash(beforeGb172Manifest(beforeAtagManualsManifest(changed))),f.before.preservation.allManifest);
 }
});
test("HTML inverse retains changes to original GB162 cards header classes and unexpected content",async()=>{
 const h=await renderFaultGuide("buderus");
 for(const change of [h.replace("6A 227","DRIFT"),h.replace('class="fault-code-card"','class="DRIFT"'),h+"<p>DRIFT</p>"])assert.notEqual(hash(beforeGb172Html(beforeAtagManualsHtml(change,"buderus"),"buderus")),f.before.preservation.buderusHtml);
});
test("named inverse is a no-op for other guides pages HTML and prior manifests",async()=>{
 const other=getFaultGuide("bulex"),p=getPageDefinition("/foutcodes/bulex"),h=await renderFaultGuide("bulex"),metadata=buildPageMetadata(p);
 assert.equal(beforeGb172Guide(beforeAtagManualsGuide(other)),other);assert.equal(beforeGb172Registry(beforeAtagManualsRegistry(p)),p);assert.equal(beforeGb172Html(beforeAtagManualsHtml(h,"bulex"),"bulex"),h);assert.equal(beforeGb172Metadata(beforeAtagManualsMetadata(metadata,"bulex"),"bulex"),metadata);
 const restored=beforeGb172Manifest(beforeAtagManualsManifest(m));assert.deepEqual(beforeGb172Manifest(beforeAtagManualsManifest(restored)),restored);
});
