import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const helperURL=new URL('./helpers/route-source-path.mjs',import.meta.url);
const {resolveRouteSourcePath}=existsSync(helperURL)?await import(helperURL):{resolveRouteSourcePath:p=>p};

test('route source mapping reaches the moved contact page without moving API or metadata',()=>{
  assert.equal(resolveRouteSourcePath('app/contact/page.js'),'app/(nl)/contact/page.js');
  for(const path of ['app/api/contact/route.js','app/social/[...slug]/route.js','app/sitemap.js','app/robots.js','app/manifest.js','app/globals.css','app/apple-icon.png','app/fr/contact/page.js','app/unknown/page.js'])assert.equal(resolveRouteSourcePath(path),path);
});
test('every captured Dutch source resolves to its original complete body after URL-neutral moves',()=>{
  assert(existsSync(helperURL),'explicit route source map must exist');
  const manifest=JSON.parse(readFileSync(new URL('./fixtures/dutch-route-source-manifest.json',import.meta.url)));
  for(const {from,to,sha256} of manifest){
    assert.equal(resolveRouteSourcePath(from),to);
    const actual=readFileSync(new URL('../'+to,import.meta.url),'utf8');
    const restored=from==='app/layout.js'?actual.replace('import "../globals.css";','import "./globals.css";'):actual;
    assert.equal(createHash('sha256').update(restored).digest('hex'),sha256,from);
    assert.equal(existsSync(new URL('../'+from,import.meta.url)),false,'no duplicate old route '+from);
  }
});
