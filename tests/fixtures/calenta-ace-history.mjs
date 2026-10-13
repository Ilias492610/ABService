import {readFileSync} from "node:fs";
import {beforeCustomerLocationRegistry} from "./customer-location-history.mjs";
// Named Task87 inverse: remove only this frozen addition, retain old/unknown drift.
const f=JSON.parse(readFileSync(new URL("./calenta-ace-source-facts.json",import.meta.url),"utf8"));
const ids=new Set(f.catalogs.map(c=>c.id));
const snapshots=new Set(["remeha-calenta-ace-installer-pdf","remeha-calenta-ace-user-pdf"]);
const restore=(value,current,old)=>value===current?old:value;
const esc=v=>v.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#x27;");
export function beforeCalentaAceGuide(g){
 if(g.slug!=="remeha"||!g.catalogs.some(c=>ids.has(c.id)))return g;
 return {...g,modelWarning:g.modelWarning.replace(f.warning,f.before.warning),
  catalogs:g.catalogs.filter(c=>!ids.has(c.id)),codeEntryCount:g.codeEntryCount-71,codes:g.codes.slice(0,-71)};
}
export function beforeCalentaAceRegistry(p){
 p=beforeCustomerLocationRegistry(p);
 if(p.path!==f.page.path)return p;
 return {...p,description:restore(p.description,f.page.description,f.before.page.description)};
}
export function beforeCalentaAceMetadata(m,slug){
 if(slug!=="remeha")return m;
 const text=value=>({...value,description:restore(value.description,f.page.description,f.before.page.description)});
 return {...text(m),openGraph:text(m.openGraph),twitter:text(m.twitter)};
}
export function beforeCalentaAceHtml(html,slug){
 if(slug!=="remeha")return html;
 let old=html.replace(esc(f.warning),esc(f.before.warning))
  .replace('<p class="eyebrow">887 brongebonden codeverklaringen</p>','<p class="eyebrow">816 brongebonden codeverklaringen</p>')
  .replace('<p class="fault-result-count" aria-live="polite">887 codeverklaringen zichtbaar</p>','<p class="fault-result-count" aria-live="polite">816 codeverklaringen zichtbaar</p>');
 for(const c of f.catalogs)old=old.replace('<option value="'+c.id+'">'+c.title+'</option>',"")
  .replace(new RegExp('<section class="fault-group" aria-labelledby="'+c.id+'-title">[\\s\\S]*?</section>'),"");
 return old;
}
export function beforeCalentaAceManifest(m){
 if(!m.entries.some(e=>ids.has(e.id)))return m;
 const increments={catalogAssignments:3,distinctCatalogs:3,displayedExplanationRows:71,distinctCatalogExplanationRows:71,distinctCatalogSourceURLs:1};
 return {...m,purpose:m.purpose.replace(f.manifestPurposeSuffix,""),countBoundary:m.countBoundary.replace(f.manifestCountSuffix,""),
  // Actual pre-edit manifest said12October despite the Remeha page's13October date.
  incrementalUpdateDate:restore(m.incrementalUpdateDate,"2026-10-13","2026-10-12"),
  counts:Object.fromEntries(Object.entries(m.counts).map(([k,v])=>[k,v-(increments[k]||0)])),
  guides:m.guides.map(g=>g.slug!=="remeha"?g:{...g,modelWarning:g.modelWarning.replace(f.warning,f.before.warning),explanationRowCount:g.explanationRowCount-71,catalogIds:g.catalogIds.filter(id=>!ids.has(id))}),
  entries:m.entries.filter(e=>!ids.has(e.id)),snapshots:m.snapshots.filter(s=>!snapshots.has(s.id))};
}
