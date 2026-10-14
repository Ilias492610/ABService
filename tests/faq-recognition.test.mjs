import test from "node:test";
import assert from "node:assert/strict";
import {createHash} from "node:crypto";
import {readFileSync} from "node:fs";
import {createRequire} from "node:module";
import {renderFaq,faqRoute} from "./helpers/faq-runtime.mjs";
import {faqRecognitionHtml,beforeFaqRecognitionHtml,beforeFaqRecognitionSource,beforeFaqRecognitionProtectedBytes,beforeFaqRecognitionRegistry,beforeFaqRecognitionSitemapEntry,beforeFaqRecognitionCoreSources,beforeFaqRecognitionCitations} from "./fixtures/faq-recognition-history.mjs";
import {pageRegistry,getPageDefinition} from "../content/site-content.mjs";
import {coreSources} from "../content/core-sources.mjs";
import {getCitedSources} from "../libs/cited-sources.mjs";
import {buildPageMetadata,buildSitemapEntries} from "../libs/seo-data.mjs";
import {buildGlobalSchemaGraph} from "../libs/schema-data.mjs";
const {parse}=createRequire(import.meta.url)("next/dist/compiled/node-html-parser");
const hash=value=>createHash("sha256").update(typeof value==="string"?value:JSON.stringify(value)).digest("hex");
const question="Hoe controleer ik de erkenning voor verplicht ketelonderhoud?";
const urls=["https://www.vlaanderen.be/erkenning-als-technicus-vloeibare-brandstof-of-technicus-gasvormige-brandstof","https://leefmilieu.brussels/burgers/diensten-en-aanvragen/erkende-en-geregistreerde-professionals-vinden/vind-een-epb-professional"];

// Missing or hidden disclosure, wrong authority/region or a company credential claim is a real content defect.
test("the real FAQ gives one native person-and-region recognition lookup without certifying AB",()=>{
  const dom=parse(renderFaq());
  const disclosures=dom.querySelectorAll("details").filter(node=>node.querySelector("summary")?.textContent===question);
  assert.equal(disclosures.length,1);assert.equal(dom.querySelectorAll("details").length,13);
  const entry=disclosures[0];assert.equal(entry.parentNode.previousElementSibling.textContent,"Onderhoud en keuring");
  assert.equal(entry.outerHTML,faqRecognitionHtml);
  assert.match(entry.textContent,/naam en het erkenningsnummer van de technicus/);
  assert.match(entry.textContent,/Vlaanderen[\s\S]*juiste brandstof[\s\S]*Brusselse EPB-periodieke controle/);
  assert.match(entry.textContent,/erkenning bij uw toestel en de handeling past/);
  assert.doesNotMatch(entry.textContent,/AB Service is erkend|Abder is erkend|alle toestellen|automatisch geldig|gratis|verzeker|garantie/);
  assert.deepEqual(entry.querySelectorAll("a").map(link=>link.getAttribute("href")),urls);
  for(let node=entry;node?.tagName;node=node.parentNode){assert.equal(node.hasAttribute("hidden"),false);assert.equal(node.hasAttribute("inert"),false);assert.notEqual(node.getAttribute("aria-hidden"),"true");assert(!["SCRIPT","TEMPLATE","NOSCRIPT"].includes(node.tagName));}
});

// Removing only the named new answer must retain all old questions, groups, hero, contacts and links.
test("the complete original FAQ and metadata survive one exact addition inverse",()=>{
  assert.equal(hash(beforeFaqRecognitionHtml(renderFaq())),"648d35d86926804ac403cd1b734db0e45d25bf2e9acc6c3042f80ba5c7222bba");
  assert.equal(hash(faqRoute.metadata),"db817774a5fdb6f44307a9259dec817bbf2ce86b0a5df2dae26c0339d1de0724");
});

// Tailwind's base reset removes default underlining; these source links must remain visibly distinguishable.
test("official lookup links carry the existing visible underline treatment",()=>{
  const entry=parse(renderFaq()).querySelectorAll("details").find(node=>node.querySelector("summary")?.textContent===question);
  assert(entry);
  for(const link of entry.querySelectorAll("a"))assert.equal(link.getAttribute("class"),"underline");
});

// A source omitted from central monitoring or a wrong source label/URL cannot earn availability monitoring.
test("both useful official entries reach central citation monitoring with exact labels",()=>{
  const citations=getCitedSources().filter(row=>urls.includes(row.href));
  assert.deepEqual(citations,[{label:"Vlaanderen: overzichtslijsten voor erkende brandstoftechnici",href:urls[0]},{label:"Leefmilieu Brussel: EPB-professionals per handeling",href:urls[1]}]);
  assert.equal(Object.keys(beforeFaqRecognitionCoreSources(coreSources)).length,11);
  assert.equal(beforeFaqRecognitionCitations(getCitedSources()).length,111);
});

// Wrong path/date/unknown metadata must stay visible instead of being broadly normalized.
test("only the meaningful FAQ update gets a named date inverse and old protected sources remain exact",()=>{
  assert.equal(getPageDefinition("/faq").lastModified,"2026-10-14");
  for(const [path,digest] of [["app/faq/page.js","1babbf6cc8406e2f9137fa4595258ff1bc66345f510202a3fbaa792424d57ca0"],["content/core-sources.mjs","27a21fd678e453be40d1dea2940f949c6224c63d86cc4d30138644b95f9aa43e"]]){const source=readFileSync(new URL("../"+path,import.meta.url),"utf8");assert.equal(hash(beforeFaqRecognitionSource(source,path)),digest);assert.notEqual(hash(beforeFaqRecognitionSource(source+"\n// unrelated drift\n",path)),digest);}
  const base={path:"/faq",title:"old",status:"published"},current={...base,lastModified:"2026-10-14"};
  assert.deepEqual(beforeFaqRecognitionRegistry(current),base);
  for(const mutation of [{...current,lastModified:"2026-10-13"},{...current,path:"/wrong"}])assert.deepEqual(beforeFaqRecognitionRegistry(mutation),mutation);
  assert.deepEqual(beforeFaqRecognitionRegistry({...current,unknown:true}),{...base,unknown:true});
  const entry={url:"https://www.abservice24.be/faq",priority:0.6};assert.deepEqual(beforeFaqRecognitionSitemapEntry({...entry,lastModified:"2026-10-14"}),entry);
  assert.equal(pageRegistry.length,82);
});

// Exact inverses must not conceal a wrong new citation, duplicate answer or drift in any old answer.
test("answer and source inverses expose wrong new fields duplicates and unrelated old content",()=>{
  const html=renderFaq();assert(html.includes(faqRecognitionHtml));
  for(const mutation of [html.replace(urls[0],"https://wrong.invalid/"),html.replace("Vlaamse overzichtslijsten","Gratis erkende AB-technici"),html.replace(faqRecognitionHtml,faqRecognitionHtml+faqRecognitionHtml),html.replace("Mag ik een foutcode resetten?","Mag ik eindeloos resetten?")])assert.notEqual(hash(beforeFaqRecognitionHtml(mutation)),"648d35d86926804ac403cd1b734db0e45d25bf2e9acc6c3042f80ba5c7222bba");
  const wrong={...coreSources,recognitionListsFlanders:{...coreSources.recognitionListsFlanders,href:"https://wrong.invalid/"}};assert.equal(beforeFaqRecognitionCoreSources(wrong).recognitionListsFlanders.href,"https://wrong.invalid/");
});

// These whole-data hashes were captured before Task123, not regenerated from its changed consumers.
test("complete before registry sitemap metadata schema core sources and citations survive only named additions",()=>{
  const checks=[
    [pageRegistry.map(beforeFaqRecognitionRegistry),"f63dfda5e2a5d1f0f0a2d80cb2de9617997433e23d6736945545db1d3f0bd5e9"],
    [buildSitemapEntries(pageRegistry).map(beforeFaqRecognitionSitemapEntry),"69537487d0ea4ca79f10f6f6105c22d9fae6cf8c776158f922b57436b3c53e7a"],
    [pageRegistry.map(page=>({path:page.path,metadata:buildPageMetadata(page)})),"39a6706db98a24de4bd46903b56ab96b49f56c89ba53e65ef60c03aedd877295"],
    [buildGlobalSchemaGraph(),"19e9d1cdec2007b78743d16741f43204878d3c0b3cf0e2c9228845e40f72a0f3"],
    [beforeFaqRecognitionCoreSources(coreSources),"654d73e0b65e1d1f60960f597ae70e12f4963adc4daa5bfc667ccf72e0ed0e16"],
    [beforeFaqRecognitionCitations(getCitedSources()),"6d15c0345e97b14b2e4a298af18e2f91f41f09ce602056657f79f1dc519f45c3"],
  ];
  for(const [actual,digest] of checks)assert.equal(hash(actual),digest);
  const drift=structuredClone(pageRegistry);drift.find(page=>page.path==="/").description+=" drift";
  assert.notEqual(hash(drift.map(beforeFaqRecognitionRegistry)),checks[0][1]);
  const entries=buildSitemapEntries(pageRegistry);entries.find(entry=>entry.url==="https://www.abservice24.be/").priority=0;
  assert.notEqual(hash(entries.map(beforeFaqRecognitionSitemapEntry)),checks[1][1]);
});

// A text-only compatibility adapter must never decode or hide changes in historical protected binaries.
test("named source-byte inverse leaves every unrelated buffer and binary intact",()=>{
  const bytes=Buffer.from([0x89,0x50,0x4e,0x47,0x00,0xff,0xfe]);
  for(const path of ["app/apple-icon.png","unknown/path.js","app/globals.css"])
    assert.equal(beforeFaqRecognitionProtectedBytes(bytes,path),bytes);
  for(const path of ["app/faq/page.js","content/core-sources.mjs"]){
    const source=readFileSync(new URL("../"+path,import.meta.url));
    assert.equal(beforeFaqRecognitionProtectedBytes(source,path),beforeFaqRecognitionSource(source.toString("utf8"),path));
    assert.notEqual(beforeFaqRecognitionProtectedBytes(Buffer.concat([source,Buffer.from("\n// drift\n")]),path),beforeFaqRecognitionProtectedBytes(source,path));
  }
});
