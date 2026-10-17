import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup,renderToString} from 'react-dom/server';
import {createRequire} from 'node:module';
import {loadContactModule} from './helpers/contact-runtime.mjs';
import {pageRegistry} from '../content/site-content.mjs';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import history from './fixtures/localization-release-history.json' with {type:'json'};
import {beforeLocalizationRegistry,beforeLocalizationReleaseHtml,beforeLocalizationReleaseSource} from './fixtures/localization-release-history.mjs';
import {resolveRouteSourcePath} from './helpers/route-source-path.mjs';
const {parse}=createRequire(import.meta.url)('next/dist/compiled/node-html-parser');
for(const [locale,path,phrases] of [
 ['fr-BE','/fr/confidentialite',['Aucun accueil de la clientèle','aussi longtemps que nécessaire','La réception de ces événements dans les rapports n’a pas encore été confirmée','votre navigateur peut les charger directement auprès de Google','L’outil ne les conserve pas','13 octobre 2026']],
 ['en-BE','/en/privacy',['Customers are not received','for as long as needed','Receipt of these events in the reports has not yet been confirmed','your browser may load them directly from Google','The tool does not store them','13 October 2026']],
])test(locale+' privacy is complete and preserves every operational limitation and real counterpart',async()=>{
 const Link=({children,...props})=>React.createElement('a',props,children);
 const {default:Page,metadata}=await loadContactModule('app'+path+'/page.js',{'next/link':Link,'@vercel/analytics':{track(){}}});
 const html=renderToStaticMarkup(React.createElement(Page)),dom=parse(html);
 assert.equal(dom.querySelectorAll('h1').length,1);assert.equal(dom.querySelectorAll('.legal-copy h2').length,8);
 for(const text of ['BE0792.534.639','Voorzorgstraat 12A bus 1, 2660 Antwerpen','info@abservice24.be','Mailgun','Vercel Analytics','Google Places','Place ID',...phrases])assert(html.includes(text),text);
 assert.doesNotMatch(html,/30 (days|jours)|human-reviewed|legal compliance|conformité juridique/);
 assert.equal(dom.querySelector('time').getAttribute('dateTime'),'2026-10-13');
 assert.equal(metadata.alternates.canonical,'https://www.abservice24.be'+path);
 const nav=dom.querySelector('.language-switcher');assert.deepEqual(nav.querySelectorAll('a').map(a=>a.getAttribute('href')),['/privacy-policy','/fr/confidentialite','/en/privacy']);
 assert.equal(dom.querySelector('a[href="https://policies.google.com/privacy"]').getAttribute('rel'),'noopener noreferrer');
 assert(html.includes(locale==='fr-BE'?'href="/fr/contact#aanvraagformulier"':'href="/en/contact#aanvraagformulier"'));
});
test('registry contains exactly the four complete new locale pages and retains the old 82 entries',()=>{
 const newPages=pageRegistry.filter(page=>page.locale);assert.equal(newPages.length,4);assert.deepEqual(newPages.map(p=>p.path).sort(),['/en/contact','/en/privacy','/fr/confidentialite','/fr/contact']);assert.equal(pageRegistry.length,86);assert.equal(pageRegistry.filter(p=>p.status==='published').length,84);
});
for(const path of ['/contact','/privacy-policy'])test('Dutch '+path+' has genuine reciprocal language links and page language schema',async()=>{
 const Link=({children,...props})=>React.createElement('a',props,children);
 const {default:Page,metadata}=await loadContactModule('app'+path+'/page.js',{'next/link':Link,'next/image':({priority,sizes,...props})=>React.createElement('img',props),'@vercel/analytics':{track(){}}});
 const html=renderToStaticMarkup(await Page({searchParams:Promise.resolve({})})),dom=parse(html);
 assert.equal(Object.keys(metadata.alternates.languages).length,3);
 assert.equal(dom.querySelectorAll('.language-switcher a').length,3);
 assert.equal(JSON.parse(dom.querySelector('#page-schema').textContent).inLanguage,'nl-BE');
});
test('release history removes only exact new rows and source/HTML additions; extra or unknown drift survives',async()=>{
 assert.equal(beforeLocalizationRegistry(pageRegistry).length,82);
 for(const page of history.pages){const changed={...page,unknown:'drift'};assert.deepEqual(beforeLocalizationRegistry([changed]),[changed]);assert.deepEqual(beforeLocalizationRegistry([{...page,path:'/fr/unknown'}]),[{...page,path:'/fr/unknown'}]);}
 for(const row of history.sources){const source=await readFile(new URL('../'+resolveRouteSourcePath(row.path),import.meta.url),'utf8');const restored=beforeLocalizationReleaseSource(source,row.path);assert.equal(createHash('sha256').update(restored).digest('hex'),row.beforeSha256);assert.equal(beforeLocalizationReleaseSource(source,'unknown'),source);assert(beforeLocalizationReleaseSource(source+'// drift',row.path).endsWith('// drift'));}
 for(const row of history.html){const html=row.additions.join('')+'<p>untouched</p>';assert.equal(beforeLocalizationReleaseHtml(html,row.path),'<p>untouched</p>');assert.equal(beforeLocalizationReleaseHtml(html,'unknown'),html);assert(beforeLocalizationReleaseHtml(html.replace('Nederlands','drift'),row.path).includes('drift'));}
});
test('localized inline-flex phone action renders one continuous spaced label in hydratable HTML',async()=>{
 const Link=({children,...props})=>React.createElement('a',props,children);
 const {LocalizedPageHero}=await loadContactModule('components/localized-page.js',{'next/link':Link,'@vercel/analytics':{track(){}}});
 const html=renderToString(React.createElement(LocalizedPageHero,{locale:'en-BE',eyebrow:'Contact',title:'Contact',intro:'Enquiry'}));
 assert(html.includes('class="button button-secondary">Call 0484 90 69 66</a>'));
});
