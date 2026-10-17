import fixture from './localization-release-history.json' with {type:'json'};
import {isDeepStrictEqual} from 'node:util';
// Remove only the complete, captured four-row addition at historical boundaries.
export const beforeLocalizationRegistry = entries => entries.filter(entry=>!fixture.pages.some(page=>isDeepStrictEqual(entry,page)));
export const beforeLocalizationReleaseSource = (source,path) => {
  for(const change of fixture.sources.find(row=>row.path===path)?.changes || [])source=source.replace(change.after,change.before);
  return source;
};
export const beforeLocalizationReleaseBytes = (bytes,path) => fixture.sources.some(row=>row.path===path) ? Buffer.from(beforeLocalizationReleaseSource(bytes.toString('utf8'),path)) : bytes;
export const beforeLocalizationReleaseHtml = (html,path) => {
  for(const addition of fixture.html.find(row=>row.path===path)?.additions || [])html=html.replace(addition,'');
  return html;
};
export const beforeLocalizationReleaseMetadata = (metadata,path) => {
  const row=fixture.html.find(row=>row.path===path);
  if(!row || !isDeepStrictEqual(metadata.alternates?.languages,row.languages))return metadata;
  const {languages,...alternates}=metadata.alternates;
  return {...metadata,alternates};
};
