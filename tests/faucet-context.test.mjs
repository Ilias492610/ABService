const pageRegistry = beforeLocalizationRegistry(fullLocalizedRegistry);
import test from "node:test";
import assert from "node:assert/strict";
import {createHash} from "node:crypto";
import {createRequire} from "node:module";
import {renderSanitary,sanitaryRoute} from "./helpers/sanitary-runtime.mjs";
import {faucetQuestion,faucetHtml,faucetRecords,beforeFaucetHtml,beforeFaucetRegistry,beforeFaucetSitemapEntry,beforeFaucetCoreSources,beforeFaucetCitations,beforeFaucetProtectedBytes} from "./fixtures/faucet-context-history.mjs";
import {pageRegistry as fullLocalizedRegistry,getPageDefinition} from "../content/site-content.mjs";
import { beforeLocalizationRegistry } from "./fixtures/localization-release-history.mjs";
import {coreSources} from "../content/core-sources.mjs";
import {getCitedSources} from "../libs/cited-sources.mjs";
import {buildPageMetadata,buildSitemapEntries} from "../libs/seo-data.mjs";
import {buildGlobalSchemaGraph} from "../libs/schema-data.mjs";
const {parse}=createRequire(import.meta.url)("next/dist/compiled/node-html-parser");
const hash=value=>createHash("sha256").update(typeof value==="string"?value:JSON.stringify(value)).digest("hex");

test("real sanitary FAQ distinguishes observed leak places and timing without diagnosing or certifying",()=>{
  const dom=parse(renderSanitary()),details=dom.querySelectorAll("details");
  assert.equal(details.length,1);assert.equal(details[0].querySelector("summary").textContent,faucetQuestion);
  assert(renderSanitary().includes(faucetHtml));
  assert.match(details[0].textContent,/Belgische FAQ’s van hansgrohe.*nadruppelen.*uitloop.*aansluitingen.*draaibare deel.*na het openen/);
  assert.match(details[0].textContent,/geen diagnose.*al hebt gezien.*onbekend.*niet extra testen of demonteren/);
  assert.match(details[0].textContent,/type of artikelnummer als u die al kent.*bewijzen niet.*modelgebonden controle blijft nodig/);
  assert.doesNotMatch(details[0].textContent,/altijd normaal|onschuldig|veilig om|vervang|schroef|rubber|garantie|AB Service is erkend|vakman gecontroleerd/);
  assert.equal(details[0].hasAttribute("open"),false);
  for(let node=details[0];node?.tagName;node=node.parentNode){assert.equal(node.hasAttribute("hidden"),false);assert.notEqual(node.getAttribute("aria-hidden"),"true");assert(!["SCRIPT","TEMPLATE","NOSCRIPT"].includes(node.tagName));}
});
test("exact FAQ and citation inverse retains complete old sanitary content and contacts",()=>{
  assert.equal(hash(beforeFaucetHtml(renderSanitary())),"05c6dab2b8095db4ea2a650ed67af63b2dcf9f13e4a061726ca2b5766ca107b1");
  assert.equal(sanitaryRoute.metadata.title,"Sanitaire installatie en loodgieterswerk | AB Service");
});
test("both primary manufacturer references are visible and centrally monitored",()=>{
  const dom=parse(renderSanitary());
  for(const [key,value]of Object.entries(faucetRecords)){
    assert.deepEqual(coreSources[key],value);
    const links=dom.querySelectorAll("a").filter(link=>link.getAttribute("href")===value.href);
    assert.equal(links.length,1);assert.equal(links[0].textContent,value.label+" ↗");
    assert.equal(links[0].getAttribute("rel"),"noreferrer");
    assert.deepEqual(getCitedSources().filter(row=>row.href===value.href),[value]);
  }
  assert.equal(Object.keys(coreSources).length,15);assert.equal(getCitedSources().length,115);
});
test("only meaningful sanitation date advances and exact inverses preserve all historical data",()=>{
  assert.equal(getPageDefinition("/installaties/sanitair").lastModified,"2026-10-15");
  for(const [actual,digest]of [
    [pageRegistry.map(beforeFaucetRegistry),"ed8a631f2faa135ecf71da40908684762a099eae2d4b643c960d5a8c74d2d13f"],
    [buildSitemapEntries(pageRegistry).map(beforeFaucetSitemapEntry),"9c4a13689e37ac06ed4ba3bb35ae47087e2b88ac527fa1c76c201028b0330106"],
    [beforeFaucetCoreSources(coreSources),"f3debd3b29f1bfeaf076503f17c9e18b783b9f3fdaf3703b78b01fc95ee2cbd5"],
    [beforeFaucetCitations(getCitedSources()),"f5ea63f14f60ef8b2810ce5ee2210a9ca2c102d1650f815967ab90f433661db3"],
    [pageRegistry.map(page=>({path:page.path,metadata:buildPageMetadata(page)})),"39a6706db98a24de4bd46903b56ab96b49f56c89ba53e65ef60c03aedd877295"],
    [buildGlobalSchemaGraph(),"19e9d1cdec2007b78743d16741f43204878d3c0b3cf0e2c9228845e40f72a0f3"],
  ])assert.equal(hash(actual),digest);
});
test("named inverse cannot hide wrong new content duplicate answers source changes or unrelated binary drift",()=>{
  const html=renderSanitary();assert(html.includes(faucetHtml));
  for(const changed of [html.replace("geen diagnose","zekere diagnose"),html.replace(faucetHtml,faucetHtml+faucetHtml),html.replace("Gerichte sanitaire werken","DRIFT"),html.replace(faucetRecords.faucetKitchenHansgrohe.href,"https://wrong.invalid/")])assert.notEqual(hash(beforeFaucetHtml(changed)),"05c6dab2b8095db4ea2a650ed67af63b2dcf9f13e4a061726ca2b5766ca107b1");
  const wrong={...coreSources,faucetKitchenHansgrohe:{...coreSources.faucetKitchenHansgrohe,href:"https://wrong.invalid/"}};assert.equal(beforeFaucetCoreSources(wrong).faucetKitchenHansgrohe.href,"https://wrong.invalid/");
  for(const value of [{path:"/wrong",lastModified:"2026-10-15"},{path:"/installaties/sanitair",lastModified:"2026-10-16"}])assert.equal(beforeFaucetRegistry(value),value);
  const bytes=Buffer.from([0x89,0,0xff,0xfe]);assert.equal(beforeFaucetProtectedBytes(bytes,"app/apple-icon.png"),bytes);
});
