import {readFileSync} from "node:fs";
// Named Task80 inverse only. Old snapshots/hashes are never replaced.
// Independent source tests cover removed additions; these adapters retain drift.
const f=JSON.parse(readFileSync(new URL("./atag-manuals-source-facts.json",import.meta.url),"utf8"));
const ids=new Set(f.catalogs.map(c=>c.id));
const snapshotIds=new Set(f.catalogs.map(c=>c.snapshotId));
const restore=(value,current,previous)=>value===current?previous:value;
const escape=value=>value.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#x27;");
export function beforeAtagManualsGuide(guide){
 if(guide.slug!=="atag"||!guide.catalogs.some(c=>ids.has(c.id)))return guide;
 return {...guide,modelWarning:guide.modelWarning.replace(f.warning,f.before.warning),
  catalogs:guide.catalogs.filter(c=>!ids.has(c.id)),codeEntryCount:guide.codeEntryCount-36,codes:guide.codes.slice(0,-36)};
}
export function beforeAtagManualsRegistry(page){
 if(page.path!==f.page.path)return page;
 return {...page,title:restore(page.title,f.page.title,f.before.page.title),
  description:restore(page.description,f.page.description,f.before.page.description),
  lastModified:restore(page.lastModified,f.page.lastModified,f.before.page.lastModified)};
}
export function beforeAtagManualsMetadata(metadata,slug){
 if(slug!=="atag")return metadata;
 const text=value=>({...value,title:restore(value.title,f.page.title,f.before.page.title),
  description:restore(value.description,f.page.description,f.before.page.description)});
 const alt=f.page.title.replace(/\s*\|\s*AB Service$/,"")+" — AB Service";
 return {...text(metadata),openGraph:{...text(metadata.openGraph),
  images:metadata.openGraph.images.map(image=>({...image,alt:restore(image.alt,alt,f.before.metadata.openGraph.images[0].alt)}))},
  twitter:text(metadata.twitter)};
}
export function beforeAtagManualsHtml(html,slug){
 if(slug!=="atag")return html;
 let restored=html.replace(escape(f.warning),escape(f.before.warning))
  .replace('<p class="eyebrow">50 brongebonden codeverklaringen</p>','<p class="eyebrow">14 brongebonden codeverklaringen</p>')
  .replace('<p class="fault-result-count" aria-live="polite">50 codeverklaringen zichtbaar</p>','<p class="fault-result-count" aria-live="polite">14 codeverklaringen zichtbaar</p>');
 for(const c of f.catalogs)restored=restored.replace('<option value="'+c.id+'">'+c.title+'</option>',"")
  .replace(new RegExp('<section class="fault-group" aria-labelledby="'+c.id+'-title">[\\s\\S]*?</section>'),"");
 return restored;
}
export function beforeAtagManualsManifest(manifest){
 if(!manifest.entries.some(e=>ids.has(e.id)))return manifest;
 const increments={catalogAssignments:2,distinctCatalogs:2,displayedExplanationRows:36,distinctCatalogExplanationRows:36,distinctCatalogSourceURLs:2};
 return {...manifest,purpose:manifest.purpose.replace(f.manifestPurposeSuffix,""),
  countBoundary:manifest.countBoundary.replace(f.manifestCountSuffix,""),
  counts:Object.fromEntries(Object.entries(manifest.counts).map(([key,value])=>[key,value-(increments[key]||0)])),
  guides:manifest.guides.map(g=>g.slug!=="atag"?g:{...g,modelWarning:g.modelWarning.replace(f.warning,f.before.warning),
   explanationRowCount:g.explanationRowCount-36,catalogIds:g.catalogIds.filter(id=>!ids.has(id))}),
  entries:manifest.entries.filter(e=>!ids.has(e.id)),snapshots:manifest.snapshots.filter(s=>!snapshotIds.has(s.id))};
}
