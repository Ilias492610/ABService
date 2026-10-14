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
import {beforeCalentaAceGuide,beforeCalentaAceRegistry,beforeCalentaAceMetadata,beforeCalentaAceHtml,beforeCalentaAceManifest} from "./fixtures/calenta-ace-history.mjs";
const f=JSON.parse(await readFile(new URL("./fixtures/calenta-ace-source-facts.json",import.meta.url),"utf8"));
const q=JSON.parse(await readFile(new URL("./fixtures/quinta-ace-source-facts.json",import.meta.url),"utf8"));
const manifest=JSON.parse(await readFile(new URL("../docs/seo/fault-code-model-coverage.json",import.meta.url),"utf8"));
const hash=v=>createHash("sha256").update(typeof v==="string"?v:JSON.stringify(v)).digest("hex");

// Break: inverse drops unknown fields or masks an old row instead of only this cohort.
test("Calenta inverse restores complete actual19catalog816row guides registry metadata SSR and manifest hashes",async()=>{
 assert.equal(hash(faultGuides.map(beforeCalentaAceGuide)),f.before.preservation.allGuides);
 assert.equal(hash(pageRegistry.map(beforeFaqRecognitionRegistry).map(beforeSanitaryReferralRegistry).map(beforeCalentaAceRegistry)),f.before.preservation.allRegistry);
 assert.deepEqual(beforeCalentaAceMetadata(buildPageMetadata(getPageDefinition(f.page.path)),"remeha"),f.before.metadata);
 assert.equal(hash(beforeCalentaAceHtml(await renderFaultGuide("remeha"),"remeha")),f.before.preservation.remehaHtml);
 const m=beforeCalentaAceManifest(manifest);assert.equal(hash(m),f.before.preservation.allManifest);assert.equal(hash(m.entries),f.before.preservation.allManifestEntries);assert.equal(hash(m.snapshots),f.before.preservation.allSnapshots);
});

test("Calenta inverse retains old row unknown leaf warning count and old source-link drift",()=>{
 for(const mutate of [g=>g.catalogs[0].codes[0].meaning="DRIFT",g=>g.codes[0].meaning="DRIFT",g=>g.catalogs[0].sourceUrl="https://invalid.test/",g=>g.codeEntryCount++,g=>g.modelWarning+=" DRIFT",g=>g.unexpectedLeaf=true]){const g=structuredClone(getFaultGuide("remeha"));mutate(g);assert.notEqual(hash(faultGuides.map(x=>beforeCalentaAceGuide(x.slug==="remeha"?g:x))),f.before.preservation.allGuides);}
 for(const mutate of [m=>m.entries[0].models=["DRIFT"],m=>m.entries[0].unexpectedLeaf=true,m=>m.entries[0].sourceURL="https://invalid.test/",m=>m.snapshots[0].sha256="DRIFT",m=>m.counts.displayedExplanationRows++,m=>m.guides.find(g=>g.slug==="remeha").explanationRowCount++,m=>m.guides.find(g=>g.slug==="remeha").modelWarning+=" DRIFT",m=>m.unexpectedLeaf=true,m=>m.incrementalUpdateDate="2026-10-14"]){const m=structuredClone(manifest);mutate(m);assert.notEqual(hash(beforeCalentaAceManifest(m)),f.before.preservation.allManifest);}
});

test("Calenta inverse keeps registry metadata wrong date canonical unknown leaves and nonexact description drift visible",()=>{
 const p=getPageDefinition(f.page.path),m=buildPageMetadata(p);
 for(const update of [{priority:0.99},{lastModified:"2026-10-14"},{description:"DRIFT"},{title:"DRIFT"},{unexpectedLeaf:true}])assert.notDeepEqual(beforeCalentaAceRegistry({...p,...update}),f.before.page);
 for(const mutate of [m=>m.title="DRIFT",m=>m.description="DRIFT",m=>m.alternates.canonical="https://invalid.test/",m=>m.openGraph.images[0].width=1,m=>m.unexpectedLeaf=true]){const value=structuredClone(m);mutate(value);assert.notDeepEqual(beforeCalentaAceMetadata(value,"remeha"),f.before.metadata);}
});

test("Calenta SSR inverse preserves old card text class links unknown markup entrance safety and count drift",async()=>{
 const html=await renderFaultGuide("remeha");
 for(const bad of [html.replace("E:01","DRIFT"),html.replace('class="fault-code-card"','class="DRIFT"'),html.replace(q.source.URL,"https://invalid.test/"),html+"<p>DRIFT</p>",html.replace("887 brongebonden","888 brongebonden"),html.replace("887 codeverklaringen zichtbaar","888 codeverklaringen zichtbaar"),html.replace("Naar veiligheid en codezoeker","DRIFT"),html.replace('id="remeha-foutcode-veiligheid"','id="DRIFT"'),html.replace("Een code is geen diagnose.","DRIFT")])assert.notEqual(hash(beforeCalentaAceHtml(bad,"remeha")),f.before.preservation.remehaHtml);
});

test("Calenta inverse is a no-op outside Remeha and idempotent after exact reversal",async()=>{
 const g=getFaultGuide("atag"),p=getPageDefinition("/foutcodes/atag"),m=buildPageMetadata(p),html=await renderFaultGuide("atag");
 assert.equal(beforeCalentaAceGuide(g),g);assert.equal(beforeCalentaAceRegistry(p),p);assert.equal(beforeCalentaAceMetadata(m,"atag"),m);assert.equal(beforeCalentaAceHtml(html,"atag"),html);
 const old=beforeCalentaAceManifest(manifest);assert.deepEqual(beforeCalentaAceManifest(old),old);const guide=beforeCalentaAceGuide(getFaultGuide("remeha"));assert.deepEqual(beforeCalentaAceGuide(guide),guide);
});

test("all12 other SSR guides and exact early entrance plus safety markup remain unchanged",async()=>{
 for(const [slug,expected] of q.reading.beforeOtherGuideHtml)assert.equal(hash(await renderFaultGuide(slug)),expected,slug);
 const html=await renderFaultGuide("remeha");assert.ok(html.includes(q.reading.entranceHtml));assert.ok(html.includes(q.reading.safetyMarker));const start=html.indexOf(q.reading.safetyMarker),safety=html.slice(start,html.indexOf("</section>",start)+10);assert.equal(safety.replace(q.reading.safetyMarker,q.reading.beforeSafetyMarker),q.reading.beforeSafetyHtml);
});
