import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import {loadContactModule, createFormHarness, syntheticInput} from "./helpers/contact-runtime.mjs";
import {consentBrowser, analyticsCookie} from "./helpers/consent-browser.mjs";

async function entry(cookie = "") {
  const b = consentBrowser(cookie);
  const calls = [];
  const sdk = () => null;
  const api = await loadContactModule("tests/helpers/consent-runtime-entry.mjs", {
    react:{...React,useSyncExternalStore:(_subscribe,getSnapshot) => getSnapshot()},
    "@vercel/analytics":{track:(...args) => calls.push(args)},
    "@vercel/analytics/next":{Analytics:sdk},
  }, b.globals);
  return {...b,api,calls,sdk};
}

test("analytics component does not mount the SDK before any choice", async () => {
  const b = consentBrowser();
  const {default:Analytics} = await loadContactModule("components/privacy-analytics.js", {
    react:{...React,useSyncExternalStore:(_subscribe,getSnapshot) => getSnapshot()},
    "@vercel/analytics/next":{Analytics:() => null},
  }, b.globals);
  assert.equal(Analytics(), null);
});

for (const [label, cookie] of [["absent",""],["necessary",`ab_service_consent=1.${Date.now()}.0.0`],
  ["photos-only",`ab_service_consent=1.${Date.now()}.0.1`],["expired","ab_service_consent=1.1.1.1"]]) {
  test(label + " discards interaction and page events without reaching SDK", async () => {
    const {api,calls} = await entry(cookie);
    assert.equal(api.trackWithConsent("phone_click",{location:"footer"}),false);
    assert.equal(api.beforeSendWithConsent({type:"pageview",url:"https://example.invalid/contact?private=value#secret"}),null);
    assert.equal(api.PrivacyAnalytics(),null);
    assert.deepEqual(calls,[]);
  });
}

test("allowed analytics preserves filtered event properties and query-free URLs", async () => {
  const {api,calls,sdk} = await entry(analyticsCookie());
  assert.equal(api.trackWithConsent("phone_click",{location:"footer",message:"private",locale:"en-BE"}),true);
  assert.deepEqual(JSON.parse(JSON.stringify(calls)),[["phone_click",{location:"footer"}]]);
  assert.deepEqual(JSON.parse(JSON.stringify(api.beforeSendWithConsent({type:"pageview",url:"https://example.invalid/contact?private=value#secret"}))),{type:"pageview",url:"https://example.invalid/contact"});
  assert.equal(api.PrivacyAnalytics().type,sdk);
  assert.equal(api.PrivacyAnalytics().props.beforeSend,api.beforeSendWithConsent);
  assert.equal(api.beforeSendWithConsent({url:"javascript:alert(1)"}),null);
});

test("same module graph shares failed-save deny with gate and callback; no delayed replay", async () => {
  const {api,calls,blockWrite} = await entry(analyticsCookie());
  const loadedCallback = api.PrivacyAnalytics().props.beforeSend;
  assert.equal(api.hasConsent("analytics"),true);
  blockWrite(true);
  assert.equal(api.saveConsent({analytics:false,googlePhotos:false}),false);
  for (const event of ["phone_click","contact_form_start","maintenance_check_complete","water_meter_check_complete"]) {
    assert.equal(api.trackWithConsent(event,{location:"footer"}),false);
  }
  assert.equal(loadedCallback({type:"pageview",url:"https://example.invalid/"}),null);
  assert.equal(api.PrivacyAnalytics(),null);
  assert.deepEqual(calls,[]);
  blockWrite(false);
  assert.equal(api.saveConsent({analytics:true,googlePhotos:false}),true);
  assert.deepEqual(calls,[]);
  assert.equal(api.trackWithConsent("email_click",{location:"footer"}),true);
  assert.equal(calls.length,1);
});

test("unreadable live cookie denies even if component was previously mounted", async () => {
  const b = await entry(analyticsCookie());
  const callback = b.api.PrivacyAnalytics().props.beforeSend;
  b.blockRead(true);
  assert.equal(callback({type:"pageview",url:"https://example.invalid/"}),null);
  assert.equal(b.api.trackWithConsent("phone_click"),false);
  assert.deepEqual(b.calls,[]);
});

test("denied real link keeps its business href and emits nothing", async () => {
  const b = consentBrowser();
  const calls = [];
  const {default:Link} = await loadContactModule("components/tracked-link.js",{"@vercel/analytics":{track:(...args) => calls.push(args)}},b.globals);
  const tree = Link({href:"tel:+32492488927",eventName:"phone_click",eventProperties:{location:"footer"},children:"Bel"});
  assert.equal(tree.props.href,"tel:+32492488927");
  tree.props.onClick();
  assert.deepEqual(calls,[]);
});

test("denied form still validates and submits the same synthetic payload without analytics", async () => {
  const sent=[];
  const h=await createFormHarness(async(url,options)=>{sent.push(JSON.parse(options.body));return{ok:true,json:async()=>({ok:true})};},{},{cookie:""});
  const tree=h.fill(syntheticInput);
  await tree.props.onSubmit({preventDefault(){}});
  assert.equal(sent.length,1);
  assert.equal(sent[0].message,syntheticInput.message);
  assert.equal(h.states[2].type,"success");
  assert.deepEqual(h.events,[]);
});
