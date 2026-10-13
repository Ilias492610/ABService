import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {createHash} from "node:crypto";
import {createElement} from "react";
import {renderToStaticMarkup} from "react-dom/server";
import postcss from "postcss";
import {renderFaultGuide} from "./helpers/fault-guide-runtime.mjs";
import {loadContactModule} from "./helpers/contact-runtime.mjs";
import {business} from "../content/business.mjs";
import {getFaultGuide} from "../content/fault-guides.mjs";
import {getPageDefinition,pageRegistry} from "../content/site-content.mjs";
import {beforeQuintaHtml,beforeQuintaRegistry} from "./fixtures/quinta-ace-history.mjs";
const f=JSON.parse(await readFile(new URL("./fixtures/quinta-ace-source-facts.json",import.meta.url),"utf8")),r=f.reading;
const hash=v=>createHash("sha256").update(v).digest("hex");

// Break: the early link moves after the long warning or jumps past emergency advice.
test("Remeha provides a native entrance before the full warning landing on complete safety before lookup",async()=>{
 const html=await renderFaultGuide("remeha"),start=html.indexOf(r.entranceHtml),intro=html.indexOf('class="hero-intro"');
 assert.ok(start>=0,"missing early native Remeha entrance");assert.ok(start<intro);
 assert.equal((html.match(/href="#remeha-foutcode-veiligheid"/g)||[]).length,1);
 const safety=html.indexOf(r.safetyMarker);assert.ok(safety>intro&&safety<html.indexOf('class="fault-catalog"'));
 const section=html.slice(safety,html.indexOf("</section>",safety)+10);
 assert.equal(section.replace(r.safetyMarker,r.beforeSafetyMarker),r.beforeSafetyHtml);
 assert.ok(html.includes(getFaultGuide("remeha").modelWarning));
 assert.equal((html.match(/class="fault-code-card"/g)||[]).length,816);
});

// Break: target offset/focus styling no longer protects the rendered native anchor.
test("rendered safety target uses a scoped header clearance and its ordinary link retains visible keyboard focus",async()=>{
 const html=await renderFaultGuide("remeha"),css=postcss.parse(await readFile(new URL("../app/globals.css",import.meta.url),"utf8"));
 assert.ok(html.includes(r.safetyMarker));
 const target=css.nodes.find(n=>n.type==="rule"&&n.selector===".remeha-fault-safety");assert.ok(target,"missing scoped safety offset");
 assert.equal(target.nodes.find(n=>n.prop==="scroll-margin-top")?.value,"calc(var(--header-offset) + 1rem)");
 const focus=css.nodes.find(n=>n.type==="rule"&&n.selector===":focus-visible");assert.match(focus.nodes.find(n=>n.prop==="outline").value,/3px solid/);
 assert.ok(!r.entranceHtml.includes("onclick")&&!r.entranceHtml.includes("tabindex"));
});

test("all12 other guides and PageHero without its optional slot retain actual before-fix markup",async()=>{
 for(const [slug,expected]of r.beforeOtherGuideHtml)assert.equal(hash(await renderFaultGuide(slug)),expected,slug);
 const Link=({children,...props})=>createElement("a",props,children);
 const tracked=await loadContactModule("components/tracked-link.js",{"next/link":Link,"@vercel/analytics":{track:()=>{}}});
 const hero=await loadContactModule("components/page-hero.js",{"next/link":Link,"@/components/tracked-link":tracked,"@/content/business.mjs":{business}});
 assert.equal(hash(renderToStaticMarkup(createElement(hero.default,{eyebrow:"Voorbeeld",title:"Titel",intro:"Inleiding"}))),r.beforeDefaultHero);
});

// Break: naturalization drops a source-column difference or leaves private register jargon.
test("new Quinta wording states positive heat recovery meaning and both temperature columns in ordinary Dutch",()=>{
 const guide=getFaultGuide("remeha"),newWarning=guide.modelWarning.slice(guide.modelWarning.indexOf(" Quinta Ace 45/65/90/115"));
 assert.equal(guide.modelWarning,r.copyRecord.warning.after);
 assert.doesNotMatch(newWarning,/letterlijke bronrijen|model-artikelparen|serials|regelaarfit/);
 for(const c of f.catalogs){const actual=guide.catalogs.find(a=>a.id===c.id);assert.equal(actual.scope,c.scope);assert.doesNotMatch(actual.scope,/letterlijke bronrijen|model-artikelparen|serials|regelaar-\/toestelfit/);}
 for(const m of r.copyRecord.meanings){const id=m.code==="H02.70"?"remeha-quinta-ace-cu-blocking":"remeha-quinta-ace-cu-locking";assert.equal(guide.catalogs.find(c=>c.id===id).codes.find(row=>row.code===m.code).meaning,m.after);}
 const h=guide.catalogs.find(c=>c.id===f.catalogs[1].id).codes.find(r=>r.code==="H02.70");assert.doesNotMatch(h.meaning,/SCB09/);
 const e=guide.catalogs.find(c=>c.id===f.catalogs[2].id).codes.find(r=>r.code==="E00.07");assert.match(e.meaning,/twee manieren.*retourtemperatuur.*oplossingskolom.*aanvoer en retour.*installateur/);
});

test("named layout inverse keeps historical SSR exact without hiding entrance safety class anchor text or count drift",async()=>{
 const html=await renderFaultGuide("remeha");assert.equal(hash(beforeQuintaHtml(html,"remeha")),f.before.preservation.remehaHtml);
 assert.ok(html.includes(r.entranceHtml)&&html.includes(r.safetyMarker));
 for(const bad of [html.replace('class="remeha-fault-entrance"','class="remeha-fault-entrance extra"'),html.replace("Naar veiligheid en codezoeker","DRIFT"),html.replace('href="#remeha-foutcode-veiligheid"','href="#fault-search"'),html.replace('id="remeha-foutcode-veiligheid"','id="DRIFT"'),html.replace("section-compact remeha-fault-safety","section-compact remeha-fault-safety extra"),html.replace("Een code is geen diagnose.","DRIFT"),html.replace("816 brongebonden","817 brongebonden"),html+"<p>DRIFT</p>"]){assert.notEqual(hash(beforeQuintaHtml(bad,"remeha")),f.before.preservation.remehaHtml);}
});

test("only Remeha has the true13October candidate date and its inverse preserves wrong date drift",()=>{
 const p=getPageDefinition("/foutcodes/remeha");assert.equal(p.lastModified,"2026-10-13");
 assert.deepEqual(beforeQuintaRegistry(p),f.before.page);
 assert.equal(beforeQuintaRegistry({...p,lastModified:"2026-10-14"}).lastModified,"2026-10-14");
 assert.equal(hash(JSON.stringify(pageRegistry.filter(p=>p.path!==f.page.path))),f.before.preservation.otherRegistry);
});
