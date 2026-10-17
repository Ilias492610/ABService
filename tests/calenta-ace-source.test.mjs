const pageRegistry = beforeLocalizationRegistry(beforeCookieConsentRegistry(fullLocalizedRegistry));
import { beforeFaucetRegistry } from "./fixtures/faucet-context-history.mjs";
import { beforeFaqRecognitionRegistry } from "./fixtures/faq-recognition-history.mjs";
import { beforeSanitaryReferralRegistry } from "./fixtures/sanitary-referral-history.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {createHash} from "node:crypto";
import {getFaultGuide,faultGuides} from "../content/fault-guides.mjs";
import {getPageDefinition,pageRegistry as fullLocalizedRegistry} from "../content/site-content.mjs";
import { beforeLocalizationRegistry } from "./fixtures/localization-release-history.mjs";
import {buildPageMetadata,buildSitemapEntries} from "../libs/seo-data.mjs";
import {filterFaultCatalogs} from "../libs/fault-search.mjs";
import {getCitedSources} from "../libs/cited-sources.mjs";
import {renderFaultGuide} from "./helpers/fault-guide-runtime.mjs";
import {beforeCustomerLocationRegistry} from "./fixtures/customer-location-history.mjs";
const f=JSON.parse(await readFile(new URL("./fixtures/calenta-ace-source-facts.json",import.meta.url),"utf8"));
const guide=getFaultGuide("remeha");
const catalog=id=>{const c=guide.catalogs.find(c=>c.id===id);assert.ok(c,"missing bounded Calenta Ace2018 catalog "+id);return c;};
const search=(q,id)=>filterFaultCatalogs(guide.catalogs,q,id).flatMap(c=>c.codes);
const row=code=>catalog(f.catalogs.find(c=>c.sourceClass===code[0]).id).codes.find(r=>r.code===code);
const hash=v=>createHash("sha256").update(typeof v==="string"?v:JSON.stringify(v)).digest("hex");
const esc=v=>v.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#x27;");

// Break: missing literal row, invented range or a meaning borrowed from another edition.
test("Calenta Ace2018 exposes17A24H30E exact ordered source meanings and installer-only row locators",()=>{
 for(const expected of f.catalogs){const c=catalog(expected.id);assert.deepEqual(c.codes.map(r=>r.code),expected.rows.map(r=>r.code));
  for(const r of expected.rows){const actual=c.codes.find(a=>a.code===r.code);for(const k of ["meaning","userAction","sourceClass","sourcePage"])assert.equal(actual[k],r[k],r.code+" "+k);}
 }
 assert.equal(guide.catalogs.length,22);assert.equal(guide.codeEntryCount,887);
});

test("all71 Calenta full identifiers resolve punctuation within their model and reject examples ranges and generic aliases",()=>{
 for(const c of f.catalogs){catalog(c.id);for(const r of c.rows)for(const q of [r.code,r.code.toLowerCase().split("").join(" : "),r.code.replaceAll("."," ")])assert.deepEqual(search(q,c.id).map(a=>a.code),[r.code],q);
  for(const q of ["E04.08","A99.99","H99.99","E99.99","H01","E04","254","32","UNKNOWN87","0"+c.rows[0].code])assert.deepEqual(search(q,c.id),[],q);
  assert.equal(search("",c.id).length,c.rows.length);
 }
 assert.equal(search("","all").length,887);assert.deepEqual(search("H01.00","unknown-model"),[]);
 for(const code of ["H01.00","H03.17","E01.24","E02.15","E04.03","E04.23"]){const id="remeha-quinta-ace-cu-"+(code[0]==="H"?"blocking":"locking");assert.notEqual(row(code).meaning,search(code,id)[0].meaning,code);}
});

test("Calenta customer actions record visible context without exporting technical remedies",()=>{
 for(const c of f.catalogs)for(const expected of c.rows){const actual=catalog(c.id).codes.find(r=>r.code===expected.code);assert.equal(actual.userAction,expected.userAction);assert.match(actual.userAction,/Lees de volledige zichtbare code/);assert.match(actual.userAction,/aanhoudende of terugkerende melding.*bevoegde installateur/);
  assert.doesNotMatch(actual.userAction,/\d+\s*(?:bar|seconden|minuten)|stel .* in|schakel .*uit en aan|controleer .*bedrading|vervang /i);
 }
 assert.match(row("H02.00").userAction,/start geen extra reset/);assert.match(row("H03.17").userAction,/onderbreek de controle niet/);assert.match(row("A02.69").userAction,/leverancier/);assert.match(row("E04.10").userAction,/Zoek niet naar vonk of vlam/);
});

test("Calenta preserves column tensions and differentiates filling states and procedure states",()=>{
 assert.match(row("E04.01").meaning,/Laag.*kortgesloten.*boven/);assert.match(row("E04.02").meaning,/kortsl.*verwijderde.*beneden.*open/);
 assert.match(row("E04.03").meaning,/aanvoertemperatuur.*veiligheidswaarde.*stijging.*warmtewisselaar/);
 assert.match(row("E01.24").meaning,/verbrandingsfouten.*24 uur.*geresette/);assert.match(row("E02.15").meaning,/configuratieopslageenheid.*CSU-time-out.*E-vergrendeling.*geen minimale duur/);
 assert.match(row("A02.36").meaning,/blokkering.*A-waarschuwing/);assert.match(row("E02.78").meaning,/warm en koud.*cv- en SWW.*ander leidingpaar/);
 assert.match(row("E04.07").meaning,/twee aanvoer.*niet over aanvoer tegenover retour/);assert.match(row("H03.00").meaning,/niet fout of ontbreken/);
 assert.match(row("H03.17").meaning,/wordt uitgevoerd.*streepje.*geen duurgrens of herstartadvies/);assert.match(row("H01.00").meaning,/professionele herstart.*geen automatisch herstel.*geen vervanging/);
 assert.match(row("H02.31").meaning,/Na spanningsuitval.*lager.*vuldruk/);assert.match(row("A02.33").meaning,/te lang.*gestopt/);assert.match(row("A02.34").meaning,/start niet.*te kort/);
 assert.match(row("E02.32").meaning,/te lang.*vergrendeling/);assert.match(row("E02.39").meaning,/stijgt onvoldoende.*vergrendeling/);
 assert.match(row("A02.76").meaning,/aangepaste parameters.*niet.*32 storingen/);assert.match(row("E00.16").meaning,/warmwatertank.*boilersensor/);assert.match(row("E00.44").meaning,/uittredetemperatuursensor/);
});

test("Calenta context binds exact2018 BE models and labels companion as general context rather than matching rows",()=>{
 for(const expected of f.catalogs){const c=catalog(expected.id);for(const k of ["title","scope","sourceLabel","sourceUrl","sourcePages","companionSourceLabel","companionSourceUrl"])assert.equal(c[k],expected[k]);
  assert.match(c.scope,/15ds, 25ds, 25\/28, 35ds en 35\/39.*België.*7688047-v.01-08052018.*CU-GH08.*HMI T-control/);
  assert.match(c.scope,/geen overeenkomende volledige tabel/);assert.doesNotMatch(c.scope,/software 1.4|software 1.29|optionele SCB-10/);
 }
 assert.equal(guide.modelWarning,f.warning);assert.ok(guide.modelWarning.includes("Legacy Tzerra, Tzerra Ace en andere revisies vallen niet onder deze dekking."));
 assert.doesNotMatch(guide.modelWarning.slice(guide.modelWarning.indexOf(" Calenta Ace 15ds/")),/serials|regelaarfit|model-artikelparen|zoekvraag|letterlijke bronrijen/);
});

test("Calenta keeps existing Remeha title canonical status and actual13October date while description explains bounded expansion",()=>{
 const p=getPageDefinition(f.page.path),m=buildPageMetadata(p);assert.deepEqual(p,f.page);for(const value of [m,m.openGraph,m.twitter])assert.equal(value.description,f.page.description);
 assert.equal(m.alternates.canonical,"https://www.abservice24.be/foutcodes/remeha");assert.equal(m.robots.index,true);
 assert.equal(buildSitemapEntries(pageRegistry.map(beforeFaucetRegistry).map(beforeFaqRecognitionRegistry)).find(e=>e.url===m.alternates.canonical).lastModified,"2026-10-13");
});

test("real SSR renders887 cards and all71 current Calenta meanings safe actions installer locators and separate links",async()=>{
 const html=await renderFaultGuide("remeha");assert.equal((html.match(/class="fault-code-card"/g)||[]).length,887);assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
 for(const c of f.catalogs){const section=html.match(new RegExp('<section class="fault-group" aria-labelledby="'+c.id+'-title">[\\s\\S]*?</section>'))?.[0];assert.ok(section,c.id);assert.equal((section.match(/class="fault-code-card"/g)||[]).length,c.rows.length);
  for(const URL of [f.sources.installer.URL,f.sources.user.URL])assert.ok(section.includes('href="'+URL+'"'));
  assert.ok(section.includes(esc(c.companionSourceLabel)));for(const r of c.rows){assert.ok(section.includes("<code>"+r.code+"</code>"));for(const k of ["meaning","userAction","sourcePage"])assert.ok(section.includes(esc(r[k])),r.code+" "+k);}
 }
 assert.ok(html.indexOf('id="remeha-foutcode-veiligheid"')<html.indexOf('class="fault-catalog"'));assert.match(html,/gasgeur/);assert.match(html,/\/contact\?dienst=Herstelling\+verwarming#aanvraagformulier/);
 for(const URL of [f.sources.installer.URL,f.sources.user.URL])assert.ok(getCitedSources().some(s=>s.href===URL));
});

test("Calenta manifest measures two originals and three entries without claiming software currentfit or empty known-none identity",async()=>{
 const m=JSON.parse(await readFile(new URL("../docs/seo/fault-code-model-coverage.json",import.meta.url),"utf8"));assert.deepEqual(m.counts,f.expectedManifestCounts);assert.equal(m.snapshots.length,27);
 for(const kind of ["installer","user"]){const s=m.snapshots.find(s=>s.id===`remeha-calenta-ace-${kind}-pdf`);assert.ok(s);for(const k of ["sha256","byteLength","pageCount"])assert.equal(s[k],f.sources[kind][k]);assert.equal(s.url,f.sources[kind].URL);assert.equal(s.expectedSha256,null);assert.equal(s.hashMatchesPriorRecord,null);}
 for(const c of f.catalogs){const e=m.entries.find(e=>e.id===c.id);assert.ok(e);assert.equal(e.explanationRowCount,c.rows.length);assert.equal(e.modelScope,c.scope);assert.equal(e.sourcePages,c.sourcePages);assert.deepEqual(e.models,f.sources.installer.models);assert.deepEqual(e.market,["België"]);assert.deepEqual(e.tableIds,[c.table]);assert.equal(e.issueDate,"2018-05-08");assert.equal(e.archiveModifiedDate,"2018-05-31");assert.equal(e.companionSourceRole,"general-class-reporting-and-problem-context-not-matching-code-table");
  for(const k of ["articleNumbers","modelArticlePairs","serials","sourceSoftwareBaseline","firmwareCompatibility","controllerVariantCoverage","customerDeviceCompatibility","newestEdition"])assert.equal(e[k],null,k);
 }
});

test("all19 old Remeha catalogs and other12guides retain actual captured hashes",()=>{
 const ids=new Set(f.catalogs.map(c=>c.id));assert.equal(hash(guide.catalogs.filter(c=>!ids.has(c.id))),f.before.preservation.remehaCatalogs);assert.equal(hash(faultGuides.filter(g=>g.slug!=="remeha")),f.before.preservation.otherGuides);assert.equal(hash(pageRegistry.map(beforeFaucetRegistry).map(beforeFaqRecognitionRegistry).map(beforeSanitaryReferralRegistry).filter(p=>p.path!==f.page.path).map(beforeCustomerLocationRegistry)),f.before.preservation.otherRegistry);
});
import { beforeCookieConsentRegistry } from "./fixtures/cookie-consent-history.mjs";
