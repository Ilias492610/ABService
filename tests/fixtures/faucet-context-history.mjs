// Exact Task124 additions; do not broaden into date/HTML/URL filtering.
export const faucetQuestion = "Wat is het verschil tussen nadruppelen en lekken bij een aansluiting?";
export const faucetAnswer = "De Belgische FAQ’s van hansgrohe behandelen kort nadruppelen uit de uitloop apart van lekkage bij de aansluitingen van een opbouwmengkraan en water aan het draaibare deel van een keukenmengkraan na het openen. Dat zijn verschillende meldingen, geen diagnose voor uw kraan. Beschrijf alleen wat u al hebt gezien: de lekplaats, wanneer het gebeurt en of het doorgaat nadat de kraan dicht is. Weet u dat niet, vermeld dan onbekend; ga niet extra testen of demonteren. Vermeld het merk en het type of artikelnummer als u die al kent. Een foto en deze observaties bewijzen niet welk onderdeel defect is; modelgebonden controle blijft nodig.";
export const faucetSourceProps = `      faq={[[\n        "${faucetQuestion}",\n        "${faucetAnswer}",\n      ]]}\n`;
export const faucetHtml = `<section class="section"><div class="shell narrow"><h2>Veelgestelde vragen</h2><div class="faq-list"><details><summary>${faucetQuestion}</summary><p>${faucetAnswer}</p></details></div></div></section>`;
export const faucetRecords = Object.freeze({
  faucetBathroomHansgrohe: {label:"hansgrohe België: nadruppelen en aansluitingen van badkamerkranen",href:"https://www.hansgrohe.be/nl/service/faq/badkamerkranen"},
  faucetKitchenHansgrohe: {label:"hansgrohe België: lekkage bij de draaibare keukenuitloop",href:"https://www.hansgrohe.be/nl/service/faq/keukenmengkranen"},
});
const sourceAdditions = Object.entries(faucetRecords).map(([key,{label,href}])=>`  ${key}: {\n    label: "${label}",\n    href: "${href}",\n  },\n`);
const oldSourceLinks = '      sourceLinks={[coreSources.sanitaryOdourAquafin, coreSources.sewerOperatorFlanders]}';
const newSourceLinks = '      sourceLinks={[coreSources.sanitaryOdourAquafin, coreSources.sewerOperatorFlanders, coreSources.faucetBathroomHansgrohe, coreSources.faucetKitchenHansgrohe]}';
const addedLinks = Object.values(faucetRecords).map(({label,href})=>`<li><a href="${href}" target="_blank" rel="noreferrer">${label} ↗</a></li>`).join('');
export const beforeFaucetHtml = html=>html.replace(faucetHtml,'').replace(addedLinks,'');
export function beforeFaucetSource(source,path){
  if(path==='app/installaties/sanitair/page.js')return source.replace(faucetSourceProps,'').replace(newSourceLinks,oldSourceLinks);
  if(path==='content/core-sources.mjs')for(const addition of sourceAdditions)source=source.replace(addition,'');
  return source;
}
export const beforeFaucetProtectedBytes=(bytes,path)=>['app/installaties/sanitair/page.js','content/core-sources.mjs'].includes(path)?beforeFaucetSource(bytes.toString('utf8'),path):bytes;
export function beforeFaucetCoreSources(sources){const restored={...sources};for(const [key,value]of Object.entries(faucetRecords))if(JSON.stringify(restored[key])===JSON.stringify(value))delete restored[key];return restored;}
export const beforeFaucetCitations=citations=>citations.filter(value=>!Object.values(faucetRecords).some(expected=>JSON.stringify(value)===JSON.stringify(expected)));
export const beforeFaucetRegistry=page=>page.path==='/installaties/sanitair'&&page.lastModified==='2026-10-15'?{...page,lastModified:'2026-10-14'}:page;
export const beforeFaucetSitemapEntry=entry=>entry.url==='https://www.abservice24.be/installaties/sanitair'&&entry.lastModified==='2026-10-15'?{...entry,lastModified:'2026-10-14'}:entry;
