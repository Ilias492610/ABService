import rows from './localization-contact-history.json' with {type:'json'};
export const beforeLocalizationContactSource=(source,path)=>{
  const row=rows.find(row=>row.path===path);
  if(!row)return source;
  for(const {after,before} of row.changes)source=source.replace(after,before);
  return source;
};
export const beforeLocalizationContactBytes=(bytes,path)=>rows.some(row=>row.path===path)
  ? Buffer.from(beforeLocalizationContactSource(bytes.toString('utf8'),path)):bytes;
