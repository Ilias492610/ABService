import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import row from './fixtures/social-image-metadata-history.json' with {type:'json'};
import {resolveRouteSourcePath} from './helpers/route-source-path.mjs';
const historyURL=new URL('./fixtures/social-image-metadata-history.mjs',import.meta.url);
const {beforeSocialImageMetadataBytes}=existsSync(historyURL)?await import(historyURL):{beforeSocialImageMetadataBytes:b=>b};
const hash=b=>createHash('sha256').update(b).digest('hex');

test('social fallback history restores only two exact layout hunks and never masks other source or binary drift',()=>{
 const bytes=readFileSync(new URL('../'+resolveRouteSourcePath(row.path),import.meta.url));
 assert.equal(hash(bytes),row.afterSha256);
 assert.equal(hash(beforeSocialImageMetadataBytes(bytes,row.path)),row.beforeSha256);
 assert.equal(beforeSocialImageMetadataBytes(bytes,'unrelated'),bytes);
 const binary=Buffer.from([0xff,0x89,0x00]);
 assert.equal(beforeSocialImageMetadataBytes(binary,'app/icon.png'),binary);
 assert.notEqual(hash(beforeSocialImageMetadataBytes(Buffer.concat([bytes,Buffer.from('\n// unrelated drift')]),row.path)),row.beforeSha256);
 for(const {after}of row.changes){
  assert.notEqual(hash(beforeSocialImageMetadataBytes(Buffer.from(bytes.toString()+after),row.path)),row.beforeSha256);
  assert.notEqual(hash(beforeSocialImageMetadataBytes(Buffer.from(bytes.toString().replace(after,after+'// wrong')),row.path)),row.beforeSha256);
 }
});
