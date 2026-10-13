import {readFileSync} from "node:fs";
import {beforeCalentaAceGuide,beforeCalentaAceRegistry,beforeCalentaAceMetadata,beforeCalentaAceHtml,beforeCalentaAceManifest} from "./calenta-ace-history.mjs";

// Named Task84 inverse. Remove only the independently frozen Quinta addition;
// keep unknown fields, old content and wrong numeric/text changes visible.
const f=JSON.parse(readFileSync(new URL("./quinta-ace-source-facts.json",import.meta.url),"utf8"));
const ids=new Set(f.catalogs.map(c=>c.id));
const restore=(value,current,old)=>value===current?old:value;
const esc=v=>v.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#x27;");
export function beforeQuintaGuide(g){
 g=beforeCalentaAceGuide(g);
 if(g.slug!=="remeha"||!g.catalogs.some(c=>ids.has(c.id)))return g;
 return {...g,modelWarning:g.modelWarning.replace(f.warning,f.before.warning),
  catalogs:g.catalogs.filter(c=>!ids.has(c.id)),codeEntryCount:g.codeEntryCount-60,codes:g.codes.slice(0,-60)};
}
export function beforeQuintaRegistry(p){
 p=beforeCalentaAceRegistry(p);
 if(p.path!==f.page.path)return p;
 return {...p,title:restore(p.title,f.page.title,f.before.page.title),description:restore(p.description,f.page.description,f.before.page.description),lastModified:restore(p.lastModified,f.page.lastModified,f.before.page.lastModified)};
}
export function beforeQuintaMetadata(m,slug){
 m=beforeCalentaAceMetadata(m,slug);
 if(slug!=="remeha")return m;
 const text=value=>({...value,title:restore(value.title,f.page.title,f.before.page.title),description:restore(value.description,f.page.description,f.before.page.description)});
 const alt=f.page.title.replace(/\s*\|\s*AB Service$/,"")+" — AB Service";
 return {...text(m),openGraph:{...text(m.openGraph),images:m.openGraph.images.map(i=>({...i,alt:restore(i.alt,alt,f.before.metadata.openGraph.images[0].alt)}))},twitter:text(m.twitter)};
}
export function beforeQuintaHtml(html,slug){
 html=beforeCalentaAceHtml(html,slug);
 if(slug!=="remeha")return html;
 let old=html.replace(f.reading.entranceHtml,"").replace(f.reading.safetyMarker,f.reading.beforeSafetyMarker)
  .replace(esc(f.warning),esc(f.before.warning))
  .replace('<p class="eyebrow">816 brongebonden codeverklaringen</p>','<p class="eyebrow">756 brongebonden codeverklaringen</p>')
  .replace('<p class="fault-result-count" aria-live="polite">816 codeverklaringen zichtbaar</p>','<p class="fault-result-count" aria-live="polite">756 codeverklaringen zichtbaar</p>');
 for(const c of f.catalogs)old=old.replace('<option value="'+c.id+'">'+c.title+'</option>',"")
  .replace(new RegExp('<section class="fault-group" aria-labelledby="'+c.id+'-title">[\\s\\S]*?</section>'),"");
 return old;
}
export function beforeQuintaManifest(m){
 m=beforeCalentaAceManifest(m);
 if(!m.entries.some(e=>ids.has(e.id)))return m;
 const increments={catalogAssignments:3,distinctCatalogs:3,displayedExplanationRows:60,distinctCatalogExplanationRows:60,distinctCatalogSourceURLs:1};
 return {...m,purpose:m.purpose.replace(f.manifestPurposeSuffix,""),countBoundary:m.countBoundary.replace(f.manifestCountSuffix,""),
  counts:Object.fromEntries(Object.entries(m.counts).map(([k,v])=>[k,v-(increments[k]||0)])),
  guides:m.guides.map(g=>g.slug!=="remeha"?g:{...g,modelWarning:g.modelWarning.replace(f.warning,f.before.warning),explanationRowCount:g.explanationRowCount-60,catalogIds:g.catalogIds.filter(id=>!ids.has(id))}),
  entries:m.entries.filter(e=>!ids.has(e.id)),snapshots:m.snapshots.filter(s=>s.id!=="remeha-quinta-ace-combined-pdf")};
}
