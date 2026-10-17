import {createRequire} from 'node:module';
import {getLanguageAlternates, getLanguagePaths} from '../content/localization.mjs';
import {business} from '../content/business.mjs';
const {parse}=createRequire(import.meta.url)('next/dist/compiled/node-html-parser');

export const auditLocalizedHtml = ({html,path,locale}) => {
  const dom=parse(html),issues=[],record=(condition,message)=>{if(!condition)issues.push(message);};
  const paths=getLanguagePaths(path),languages=getLanguageAlternates(path);
  if(!paths || paths[locale]!==path)return ['Geen exact taalequivalent voor deze pagina'];
  record(dom.querySelector('html')?.getAttribute('lang')===locale,'verkeerde initiële documenttaal');
  record(dom.querySelectorAll('h1').length===1,'niet exact één H1');
  record(dom.querySelector('link[rel="canonical"]')?.getAttribute('href')===business.canonicalOrigin+path,'verkeerde selfcanonical');
  const alternates=dom.querySelectorAll('link[rel="alternate"][hreflang]');
  record(alternates.length===3 && Object.entries(languages).every(([language,href])=>alternates.filter(a=>a.getAttribute('hreflang')===language && a.getAttribute('href')===href).length===1),'geen exacte wederkerige hreflanggroep');
  const links=dom.querySelectorAll('.language-switcher a');
  record(links.length===3 && Object.values(paths).every(path=>links.filter(a=>a.getAttribute('href')===path).length===1),'onjuiste zichtbare taalwissels');
  const active=links.filter(a=>a.getAttribute('aria-current')==='page');
  record(active.length===1 && active[0].getAttribute('href')===path,'onjuiste actieve taal');
  record(dom.querySelector('meta[property="og:locale"]')?.getAttribute('content')===locale.replace('-','_'),'verkeerde Open Graph-taal');
  try {const schema=JSON.parse(dom.querySelector('#page-schema')?.textContent || 'null');record(schema?.['@type']==='WebPage' && schema.inLanguage===locale && schema.url===business.canonicalOrigin+path,'verkeerde pagina-schema-taal of URL');}catch{issues.push('ongeldig pagina-schema');}
  return issues;
};
