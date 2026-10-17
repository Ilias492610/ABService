import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {createRequire} from 'node:module';
import {ImageResponse} from 'next/og.js';
import {loadContactModule} from './helpers/contact-runtime.mjs';
import {resolveRouteSourcePath} from './helpers/route-source-path.mjs';
const require=createRequire(import.meta.url);
const {resolveOpenGraph}=require('next/dist/lib/metadata/resolvers/resolve-opengraph.js');

// The old file route resolved above all root layouts. Root metadata now owns its
// shared fallback explicitly. Exercise complete real exports and Next's resolver.
test('all root layouts and global 404 resolve the shared fallback on the canonical host in self-hosted builds',async()=>{
 const keys=['NODE_ENV','VERCEL','VERCEL_ENV','VERCEL_URL','VERCEL_BRANCH_URL','VERCEL_PROJECT_PRODUCTION_URL'];
 const saved=Object.fromEntries(keys.map(key=>[key,process.env[key]]));
 try{
  for(const key of keys)delete process.env[key];
  process.env.NODE_ENV='production';
  const root=await loadContactModule('app/(nl)/layout.js',{'next/font/google':{Inter:()=>({className:'unused-font-adapter'})},'../globals.css':{}});
  const notFound=await loadContactModule('app/(nl)/not-found.js');
  const roots=[root];
  for(const locale of ['fr','en'])roots.push(await loadContactModule('app/'+locale+'/layout.js',{'../(nl)/layout':root,'next/font/google':{Inter:()=>({className:'unused-font-adapter'})},'../app/globals.css':{}}));
  roots.push(await loadContactModule('app/global-not-found.js',{'./(nl)/layout':root,'./(nl)/not-found':notFound}));
  for(const {metadata}of roots){
   const resolved=await resolveOpenGraph(metadata.openGraph,metadata.metadataBase,'/',{isStaticMetadataRouteFile:false},null);
   assert.ok(resolved?.images?.length,'root and global404 retain the real shared fallback');
   assert.equal(resolved.images[0].url.href,'https://www.abservice24.be/opengraph-image');
   assert.equal(resolved.images[0].width,1200);
   assert.equal(resolved.images[0].height,630);
   assert.equal(resolved.images[0].type,'image/png');
   assert.equal(resolved.images[0].alt,'AB Service — loodgieter, verwarming en sanitair in Antwerpen');
  }
 }finally{
  for(const [key,value]of Object.entries(saved)){if(value===undefined)delete process.env[key];else process.env[key]=value;}
 }
});

test('unchanged shared image producer still returns the actual bounded 1200 by 630 PNG',async()=>{
 const image=await loadContactModule('app/opengraph-image.js',{'next/og':{ImageResponse}});
 const response=image.default();
 assert.equal(response.headers.get('content-type'),'image/png');
 const png=Buffer.from(await response.arrayBuffer());
 assert.equal(png.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
 assert.equal(png.readUInt32BE(16),1200);
 assert.equal(png.readUInt32BE(20),630);
 assert.ok(png.length<150000);
});

test('the existing public image URL is registered by a real GET handler and serves the original PNG',async()=>{
 assert.ok(existsSync(new URL('../app/opengraph-image/route.js',import.meta.url)),'the old /opengraph-image URL must remain registered');
 const route=await loadContactModule('app/opengraph-image/route.js',{'next/og':{ImageResponse}});
 const response=await route.GET();
 assert.equal(response.status,200);
 assert.equal(response.headers.get('content-type'),'image/png');
 const png=Buffer.from(await response.arrayBuffer());
 assert.equal(png.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
 assert.equal(png.readUInt32BE(16),1200);
 assert.equal(png.readUInt32BE(20),630);
 assert.ok(png.length<150000);
});

test('shared-image source alias remains exact without moving other metadata endpoints or unknown paths',()=>{
 assert.equal(resolveRouteSourcePath('app/opengraph-image.js'),'components/default-social-image.js');
 for(const path of ['app/opengraph-image-extra.js','app/fr/opengraph-image.js','app/social/[...slug]/route.js','app/sitemap.js','app/robots.js','app/manifest.js','app/global-not-found.js','app/apple-icon.png'])assert.equal(resolveRouteSourcePath(path),path);
});
