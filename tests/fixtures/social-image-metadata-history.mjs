import row from './social-image-metadata-history.json' with {type:'json'};

export function beforeSocialImageMetadataSource(source,path) {
 if(path!==row.path)return source;
 for(const {before,after}of row.changes)if(source.split(after).length===2)source=source.replace(after,before);
 return source;
}

export function beforeSocialImageMetadataBytes(bytes,path) {
 if(path!==row.path)return bytes;
 return Buffer.from(beforeSocialImageMetadataSource(bytes.toString('utf8'),path));
}
