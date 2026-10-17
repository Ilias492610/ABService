import test from 'node:test';
import assert from 'node:assert/strict';
import {auditHtml} from '../libs/html-audit.mjs';
import {auditLocalizedHtml} from '../libs/localization-audit.mjs';
import {SocialPreviewCard} from '../components/social-preview-card.mjs';
import {renderToStaticMarkup} from 'react-dom/server';
import {localizedPageCandidates} from '../content/localization.mjs';
import {readFile} from 'node:fs/promises';
const html='<html lang="en-BE"><head><title>Contact</title><meta name="description" content="English contact"/><link rel="canonical" href="https://www.abservice24.be/en/contact"/><meta property="og:locale" content="en_BE"/>'+[['nl-BE','/contact'],['fr-BE','/fr/contact'],['en-BE','/en/contact']].map(([lang,path])=>`<link rel="alternate" hrefLang="${lang}" href="https://www.abservice24.be${path}"/>`).join('')+'</head><body><h1>Contact</h1><nav class="language-switcher"><a href="/contact">Nederlands</a><a href="/fr/contact">Français</a><a href="/en/contact" aria-current="page">English</a></nav><script type="application/ld+json" id="page-schema">'+JSON.stringify({'@type':'WebPage',url:'https://www.abservice24.be/en/contact',inLanguage:'en-BE'})+'</script></body></html>';
test('generic technical audit accepts only the explicitly expected document language, NL by default',()=>{
 assert.equal(auditHtml({html,url:'https://www.abservice24.be/en/contact',indexable:true,expectedLanguage:'en-BE'}).issues.length,0);
 assert(auditHtml({html,url:'https://www.abservice24.be/en/contact',indexable:true}).issues.includes('html lang ontbreekt of is niet nl-BE'));
});
test('language audit requires selfinclusive exact true equivalents, schema, active switch and initial language',()=>{
 assert.deepEqual(auditLocalizedHtml({html,path:'/en/contact',locale:'en-BE'}),[]);
 for(const changed of [html.replace('lang="en-BE"','lang="nl-BE"'),html.replace('href="/fr/contact"','href="/fr"'),html.replace('hrefLang="fr-BE"','hrefLang="fr-FR"'),html.replace('aria-current="page"',''),html.replace('"inLanguage":"en-BE"','"inLanguage":"nl-BE"'),html.replace('content="en_BE"','content="nl_BE"')])assert(auditLocalizedHtml({html:changed,path:'/en/contact',locale:'en-BE'}).length>0);
});
test('new locale social cards have translated service topic while Dutch cards remain unchanged',()=>{
 for(const page of localizedPageCandidates){const html=renderToStaticMarkup(SocialPreviewCard({page}));assert(!html.includes('Loodgieter'));assert(html.includes(page.locale==='fr-BE'?'Plomberie · chauffage · sanitaires':'Plumbing · heating · sanitary installations'));}
 assert(renderToStaticMarkup(SocialPreviewCard({page:{path:'/contact',title:'Contact'}})).includes('Loodgieter · verwarming · sanitair'));
});
test('hosted quality workflow also checks the actual built language routes',async()=>{
 const source=await readFile(new URL('../.github/workflows/seo-quality.yml',import.meta.url),'utf8');
 assert(source.includes('node scripts/localization-audit.mjs http://localhost:3100'));
});
