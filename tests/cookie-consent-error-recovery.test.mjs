import test from "node:test";
import assert from "node:assert/strict";
import {renderToStaticMarkup} from "react-dom/server";
import {consentUi,nodes} from "./helpers/consent-ui-runtime.mjs";

const props={photoUri:"https://lh3.googleusercontent.com/test-only",displayName:"Fixture"};
const alerts=tree=>nodes(tree).filter(node=>node.props.role==="alert");
const photoButton=tree=>nodes(tree).find(node=>node.type==="button");
const expire=h=>{h.setCookie(`ab_service_consent=1.${Date.now()-15552000001}.1.1`);h.window.dispatchEvent(new Event("focus"));};

test("settings success invalidates failures in every photo control, including after later expiry",async()=>{
  const h=await consentUi();
  try{
    h.blockWrite(true);
    for(const key of ["first","second"]){
      photoButton(h.photo(key,props)).props.onClick();
      assert.equal(alerts(h.photo(key,props)).length,1);
    }
    h.blockWrite(false);
    h.api.requestConsentSettings();
    h.option("analytics").props.onChange({target:{checked:true}});
    h.option("googlePhotos").props.onChange({target:{checked:true}});
    h.button("Keuzes opslaan").props.onClick();
    assert.equal(h.api.getConsentSnapshot(),"both");
    for(const key of ["first","second"]){
      const tree=h.photo(key,props);
      assert.equal(alerts(tree).length,0);
      assert.match(renderToStaticMarkup(tree),/<img\b/);
    }
    expire(h);assert.equal(h.api.getConsentSnapshot(),"unknown");
    for(const key of ["first","second"])assert.equal(alerts(h.photo(key,props)).length,0);
  }finally{h.dispose();}
});

test("photo success invalidates a failed settings save rather than hiding it until expiry",async()=>{
  const h=await consentUi(`ab_service_consent=1.${Date.now()}.1.0`);
  try{
    h.api.requestConsentSettings();h.blockWrite(true);h.button("Alles intrekken").props.onClick();
    assert.equal(h.api.getConsentSnapshot(),"unknown");assert.ok(alerts(h.render()).length);
    h.button("Sluiten").props.onClick();h.blockWrite(false);
    photoButton(h.photo("first",props)).props.onClick();
    assert.equal(h.api.getConsentSnapshot(),"googlePhotos");
    h.api.requestConsentSettings();assert.equal(alerts(h.render()).length,0);
    h.button("Sluiten").props.onClick();expire(h);
    assert.equal(h.api.getConsentSnapshot(),"unknown");
    assert.equal(alerts(h.render()).length,0);
    h.api.requestConsentSettings();assert.equal(alerts(h.render()).length,0);
  }finally{h.dispose();}
});
