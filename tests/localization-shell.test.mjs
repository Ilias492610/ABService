import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {loadContactModule} from './helpers/contact-runtime.mjs';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import history from './fixtures/localization-shell-history.json' with {type:'json'};
import {beforeLocalizationShellSource} from './fixtures/localization-shell-history.mjs';
const rootURL=new URL('../components/localized-root.js',import.meta.url);
const Link=({children,...props})=>React.createElement('a',props,children);
const Image=({priority:_priority,unoptimized:_unoptimized,...props})=>React.createElement('img',props);
const hooks={...React,useEffect(){},useRef:()=>({current:null})};
const dependencies={'react':hooks,'next/link':Link,'next/image':Image,'next/navigation':{usePathname:()=>'/fr/contact'},'next/font/google':{Inter:()=>({className:'test-font'})},'../app/globals.css':{},'@vercel/analytics':{track(){}},'@/components/privacy-analytics':{default:()=>null}};
test('named shell transitions retain complete old sources and expose extra unrelated drift',()=>{
 const hash=s=>createHash('sha256').update(s).digest('hex');
 for(const row of history){const source=readFileSync(new URL('../'+row.path,import.meta.url),'utf8');assert.equal(hash(beforeLocalizationShellSource(source,row.path)),row.beforeSha256,row.path);assert.notEqual(hash(beforeLocalizationShellSource(source+'\n/* unrelated drift */\n',row.path)),row.beforeSha256);assert.equal(beforeLocalizationShellSource(source,'unknown/path'),source);}
});
for(const [locale,skip,seat] of [['nl-BE','Ga naar de inhoud','Maatschappelijke zetel'],['fr-BE','Aller au contenu','Siège social'],['en-BE','Skip to content','Registered office']])test('server root renders real document and complete contact shell in '+locale,async()=>{
 assert(existsSync(rootURL),'localized server root exists');
 const {default:Root}=await loadContactModule('components/localized-root.js',dependencies);
 const html=renderToStaticMarkup(React.createElement(Root,{locale},React.createElement('h1',null,'Synthetic page')));
 assert.match(html,new RegExp('<html lang="'+locale+'"'));assert(html.includes(skip));assert(html.includes(seat));assert(html.includes('Voorzorgstraat 12A bus 1, 2660 Antwerpen'));
 assert(html.includes('tel:+32484906966'));assert(html.includes('info@abservice24.be'));assert(html.includes('Français'));assert(html.includes('English'));
 if(locale==='fr-BE'){assert(html.includes('Aucun accueil de la clientèle'));assert(html.includes('en néerlandais'));assert(html.includes('Bonjour'));}
 if(locale==='en-BE'){assert(html.includes('Customers are not received'));assert(html.includes('in Dutch'));assert(html.includes('Hello'));}
});
test('privacy language switch keeps its function rather than switching to contact',async()=>{
 assert(existsSync(new URL('../components/language-switcher.js',import.meta.url)),'real language control exists');
 const {default:Switcher}=await loadContactModule('components/language-switcher.js',dependencies);
 const html=renderToStaticMarkup(React.createElement(Switcher,{path:'/fr/confidentialite',locale:'fr-BE'}));
 assert(html.includes('href="/privacy-policy"'));assert(html.includes('href="/en/privacy"'));assert(!html.includes('href="/en/contact"'));assert(html.includes('aria-current="page"'));
});
