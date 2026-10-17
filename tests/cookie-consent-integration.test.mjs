import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import {renderToStaticMarkup} from "react-dom/server";
import {createRequire} from "node:module";
import {loadContactModule} from "./helpers/contact-runtime.mjs";
const {parse}=createRequire(import.meta.url)("next/dist/compiled/node-html-parser");
const deps={"next/link":({children,...props})=>React.createElement("a",props),"@vercel/analytics":{track(){}}};

for(const [locale,path] of [["nl-BE","privacy-policy"],["fr-BE","fr/confidentialite"],["en-BE","en/privacy"]]){
  test(locale+" privacy explains both optional purposes and keeps eight main sections",async()=>{
    const {default:Page}=await loadContactModule("app/"+path+"/page.js",deps);
    const dom=parse(renderToStaticMarkup(React.createElement(Page)));
    const policy=dom.querySelector("#cookievoorkeuren");
    assert.ok(policy);assert.equal(dom.querySelectorAll(".legal-copy h2").length,8);
    assert.equal(policy.querySelectorAll("h3").length,1);
    for(const literal of ["ab_service_consent","180","Vercel","Google","__va_attribution"])assert.ok(policy.textContent.includes(literal));
    assert.equal(policy.querySelector("a").getAttribute("href"),"/"+path+"#cookievoorkeuren");
    assert.equal(dom.querySelector("time").getAttribute("dateTime"),"2026-10-17");
  });
}
test("review fixture keeps score, text, name, sources and Google attribution without requesting photos",async()=>{
  const place={googleMapsUri:"https://maps.google.com/?cid=123",rating:4.5,userRatingCount:7,reviews:[{
    name:"fixture",author:{displayName:"Fixture author",uri:"https://maps.google.com/contrib/123",photoUri:"https://lh3.googleusercontent.com/test-only"},rating:4,text:"Synthetic review fixture, not a real customer.",googleMapsUri:"https://maps.google.com/review/123",flagContentUri:"https://maps.google.com/report/123",
  }]};
  const {default:Reviews}=await loadContactModule("components/sections/google-reviews.js",{...deps,"@/libs/google-reviews.server.js":{getGoogleReviews:async()=>place}});
  const dom=parse(renderToStaticMarkup(await Reviews()));
  for(const literal of ["Google Maps","Fixture author","Synthetic review fixture","7 Google-beoordelingen","4,5"])assert.ok(dom.textContent.includes(literal));
  for(const url of [place.reviews[0].author.uri,place.reviews[0].googleMapsUri,place.reviews[0].flagContentUri])assert.ok(dom.querySelector(`a[href="${url}"]`));
  assert.equal(dom.querySelector("img"),null);assert.equal(dom.querySelector("a button"),null);
  assert.equal(dom.querySelector(".review-author-fallback").textContent,"F");
});
