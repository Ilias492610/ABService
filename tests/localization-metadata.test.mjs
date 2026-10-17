import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {buildPageMetadata} from '../libs/seo-data.mjs';
import * as schema from '../libs/schema-data.mjs';
const moduleURL=new URL('../content/localization.mjs',import.meta.url);
const locale=existsSync(moduleURL)?await import(moduleURL):{getLanguageAlternates:()=>undefined};
const contact={'nl-BE':'https://www.abservice24.be/contact','fr-BE':'https://www.abservice24.be/fr/contact','en-BE':'https://www.abservice24.be/en/contact'};
const privacy={'nl-BE':'https://www.abservice24.be/privacy-policy','fr-BE':'https://www.abservice24.be/fr/confidentialite','en-BE':'https://www.abservice24.be/en/privacy'};
for(const [path,want] of [['/contact',contact],['/fr/contact',contact],['/en/contact',contact],['/privacy-policy',privacy],['/fr/confidentialite',privacy],['/en/privacy',privacy]])test('language equivalents remain self-inclusive and reciprocal for '+path,()=>{
 assert.deepEqual(locale.getLanguageAlternates(path),want);
});
test('untranslated pages never borrow a home or draft equivalent',()=>{
 assert.equal(typeof locale.getLocaleCopy,'function');
 for(const path of ['/herstelling','/','/fr','/en','/fr/herstelling','/contact?x=1'])assert.equal(locale.getLanguageAlternates(path),undefined);
 assert.throws(()=>locale.getLocaleCopy('de-DE'),/locale/i);
});
test('French metadata and page schema use their own URL language and actual equivalent group',()=>{
 const page={path:'/fr/contact',locale:'fr-BE',title:'Contacter AB Service',description:'Présentez votre demande.',status:'published'};
 const meta=buildPageMetadata(page);assert.equal(meta.alternates.canonical,'https://www.abservice24.be/fr/contact');assert.deepEqual(meta.alternates.languages,contact);assert.equal(meta.openGraph.locale,'fr_BE');
 assert.equal(typeof schema.buildPageSchema,'function');const graph=schema.buildPageSchema(page);assert.equal(graph.inLanguage,'fr-BE');assert.equal(graph.url,'https://www.abservice24.be/fr/contact');assert.equal(graph.isPartOf['@id'],'https://www.abservice24.be/#website');
});
test('shared translations and equivalent paths cannot be mutated into a later visitor response',()=>{
 const words=locale.getLocaleCopy('fr-BE');
 assert.throws(()=>{words.skip=undefined;},TypeError);
 assert.throws(()=>{words.nav.menu='wrong';},TypeError);
 assert.throws(()=>{locale.getLanguagePaths('/contact')['fr-BE']='/wrong';},TypeError);
 for(const code of ['nl-BE','fr-BE','en-BE'])for(const key of ['skip','language','otherContacts','contactFR','contactEN','availability','hours','phone','email','vat','area','topline','brand','homeLabel','call','services','advice','knowledge','serviceArea','seatLabel','seatGuidance','footer','whatsapp','greeting','googleFallback','googleClose'])assert.equal(typeof locale.getLocaleCopy(code)[key],'string',code+' '+key);
});
