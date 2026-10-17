import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {validateContactInput,CONTACT_SERVICES} from '../libs/contact-validation.mjs';
import {loadContactModule,syntheticInput,createFormHarness} from './helpers/contact-runtime.mjs';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import transitions from './fixtures/localization-contact-history.json' with {type:'json'};
import {beforeLocalizationContactSource} from './fixtures/localization-contact-history.mjs';
import {beforeCookieConsentSource} from './fixtures/cookie-consent-history.mjs';
const request=(data,native=false)=>new Request('https://qa.example.invalid/api/contact',{method:'POST',headers:{'content-type':native?'application/x-www-form-urlencoded':'application/json',...(native?{'sec-fetch-mode':'navigate'}:{})},body:native?new URLSearchParams(data):JSON.stringify(data)});
const route=sendEmail=>loadContactModule('app/api/contact/route.js',{'@/config':{mailgun:{supportEmail:'recipient@example.invalid'}},'@/libs/mailgun':{sendEmail}},{process:{env:{}},console:{info(){},error(){}}});
for(const [locale,name,email,consent] of [['fr-BE','Indiquez votre nom.','Indiquez une adresse e-mail valide.','Confirmez que vous avez lu la politique de confidentialité.'],['en-BE','Enter your name.','Enter a valid email address.','Confirm that you have read the privacy policy.']]){
 test(locale+' validator gives native-language errors without changing cleaned service data',()=>{
  const invalid=validateContactInput({},{locale});assert.equal(invalid.errors.name,name);assert.equal(invalid.errors.email,email);assert.equal(invalid.errors.consent,consent);
  const clean=validateContactInput({...syntheticInput,locale,returnTo:'https://wrong.invalid'},{locale});assert.equal(clean.ok,true);assert.equal(clean.data.service,'Andere vraag');assert.equal(Object.hasOwn(clean.data,'locale'),false);assert.equal(Object.hasOwn(clean.data,'returnTo'),false);
 });
 for(const [field,input] of [['name','n'.repeat(121)],['phone','invalid'],['email','e'.repeat(201)],['address','a'.repeat(201)],['city','c'.repeat(101)],['postalCode','p'.repeat(21)],['brand','b'.repeat(121)],['boilerType','t'.repeat(121)],['message','m'.repeat(3001)],['service','Invented service']])test(locale+' keeps '+field+' validation boundary',()=>{
  const result=validateContactInput({...syntheticInput,[field]:input},{locale});assert.equal(result.ok,false);assert.equal(typeof result.errors[field],'string');assert.notEqual(result.errors[field],validateContactInput({...syntheticInput,[field]:input}).errors[field]);
 });
 test(locale+' native success chooses only its fixed local route and carries language separately to staff',async()=>{
  const sent=[];const {POST}=await route(async message=>{sent.push(message);return{id:'synthetic'};});
  const response=await POST(request({...syntheticInput,locale,returnTo:'https://wrong.invalid/private'},true));assert.equal(response.status,303);assert.equal(response.headers.get('location'),`https://qa.example.invalid/${locale==='fr-BE'?'fr':'en'}/contact?contact=success#aanvraagformulier`);assert.equal(sent.length,1);assert.match(sent[0].text,/Voorkeurstaal: (Français|English)/);assert.doesNotMatch(sent[0].text,/wrong.invalid/);
 });
 test(locale+' native invalid request stays in language and cannot send mail',async()=>{
  let sends=0;const {POST}=await route(async()=>{sends++;});const response=await POST(request({locale,consent:'',returnTo:'https://wrong.invalid'},true));assert.equal(response.status,303);assert.equal(response.headers.get('location'),`https://qa.example.invalid/${locale==='fr-BE'?'fr':'en'}/contact?contact=error#aanvraagformulier`);assert.equal(sends,0);
 });
 test(locale+' form exposes translated labels and privacy while submitted service values remain Dutch',async()=>{
  const Link=({children,...props})=>React.createElement('a',props,children);
  const {default:Form}=await loadContactModule('components/sections/contact-form.js',{'next/link':Link,'@vercel/analytics':{track(){}}});
  const html=renderToStaticMarkup(React.createElement(Form,{locale}));assert(html.includes(`href="/${locale==='fr-BE'?'fr/confidentialite':'en/privacy'}"`));assert(html.includes(locale==='fr-BE'?'Envoyer la demande':'Send enquiry'));assert(!html.includes('Naam *'));assert(html.includes(`name="locale" value="${locale}"`));
  for(const service of CONTACT_SERVICES)assert(html.includes(`value="${service}"`));
 });
}
test('unsupported locale cannot select an external native return path',async()=>{
 const {POST}=await route(async()=>({id:'synthetic'}));const response=await POST(request({...syntheticInput,locale:'https://wrong.invalid'},true));assert.equal(response.headers.get('location'),'https://qa.example.invalid/contact?contact=success#aanvraagformulier');
});

for(const [locale,path,title] of [['fr-BE','fr/contact','Présentez votre demande à AB Service'],['en-BE','en/contact','Tell AB Service what you need']])test(locale+' complete contact page renders real form, one translated heading and language links',async()=>{
 const Link=({children,...props})=>React.createElement('a',props,children);
 const {default:Page,metadata}=await loadContactModule(`app/${path}/page.js`,{'next/link':Link,'next/image':({priority,sizes,...props})=>React.createElement('img',props),'@vercel/analytics':{track(){}}});
 const html=renderToStaticMarkup(await Page({searchParams:Promise.resolve({contact:'error',dienst:'Andere vraag'})}));
 assert.equal((html.match(/<h1/g)||[]).length,1);assert(html.includes(title));assert(html.includes('name="locale" value="'+locale+'"'));assert(html.includes('aria-current="page"'));assert(html.includes('href="/contact"'));assert.equal(metadata.alternates.canonical,'https://www.abservice24.be/'+path);assert(!html.includes('Geen noodkanaal'));assert(html.includes(locale==='fr-BE'?'La demande n’a pas pu être envoyée.':'Your enquiry could not be sent.'));
});
test('English JSON client carries locale without changing cleaned data or sending it to analytics',async()=>{
 const sent=[];const h=await createFormHarness(async(url,options)=>{sent.push(JSON.parse(options.body));return{ok:true,json:async()=>({ok:true})};},{locale:'en-BE'});
 const tree=h.fill(syntheticInput);await tree.props.onSubmit({preventDefault(){}});assert.equal(sent.length,1);assert.equal(sent[0].locale,'en-BE');assert.equal(sent[0].service,'Andere vraag');assert.equal(h.states[2].message,'Your enquiry has been sent. An appointment or timeframe is only confirmed after direct contact.');for(const event of h.events)assert.equal(Object.hasOwn(event.props,'locale'),false);
});
test('contact source history restores only the exact named transitions, leaving extra drift visible',async()=>{
 const hash=source=>createHash('sha256').update(source).digest('hex');
 for(const row of transitions){const source=beforeCookieConsentSource(await readFile(new URL('../'+row.path,import.meta.url),'utf8'),row.path);assert.equal(hash(beforeLocalizationContactSource(source,row.path)),row.beforeSha256);assert.notEqual(hash(beforeLocalizationContactSource(source+'// extra drift\n',row.path)),row.beforeSha256);assert.equal(beforeLocalizationContactSource(source,'unrelated'),source);}
});
