import {business} from '../content/business.mjs';
import {getLanguagePaths} from '../content/localization.mjs';
import {pageRegistry} from '../content/site-content.mjs';
import {auditLocalizedHtml} from '../libs/localization-audit.mjs';
const base=(process.argv[2] || business.canonicalOrigin).replace(/\/$/,''),issues=[];
const groups=[getLanguagePaths('/contact'),getLanguagePaths('/privacy-policy')];
for(const paths of groups)for(const [locale,path] of Object.entries(paths)){
  if(!pageRegistry.some(page=>page.path===path && page.status==='published'))issues.push(path+': ontbreekt in published-registry');
  const response=await fetch(base+path,{redirect:'manual',signal:AbortSignal.timeout(15000)}),html=await response.text();
  if(response.status!==200)issues.push(path+': HTTP '+response.status);
  for(const issue of auditLocalizedHtml({html,path,locale}))issues.push(path+': '+issue);
}
for(const path of ['/fr','/en','/fr/missing','/en/missing','/de/contact']){
  const response=await fetch(base+path,{redirect:'manual',signal:AbortSignal.timeout(15000)}),html=await response.text();
  if(response.status!==404 || !/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/.test(html))issues.push(path+': geen echte noindex404');
}
const other=await fetch(base+'/herstelling'),otherHtml=await other.text();
if(/<link[^>]+hrefLang=/i.test(otherHtml))issues.push('/herstelling: onterechte taalequivalenten');
if(issues.length){console.error(issues.join('\n'));process.exitCode=1;}else console.log('Taal-audit geslaagd: 6 echte equivalenten, 2 volledige groepen, 5 noindex404s; geen homepagevervanging.');
