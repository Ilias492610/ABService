import rows from './localization-shell-history.json' with {type:'json'};
export const beforeLocalizationShellSource=(source,path)=>{
  const row=rows.find(row=>row.path===path);
  if(!row)return source;
  for(const {after,before} of row.changes)source=source.replace(after,before);
  return source;
};
export const beforeLocalizationShellBytes=(bytes,path)=>rows.some(row=>row.path===path)
  ? Buffer.from(beforeLocalizationShellSource(bytes.toString('utf8'),path)):bytes;
