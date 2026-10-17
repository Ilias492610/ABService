import test from "node:test";
import assert from "node:assert/strict";
import {loadContactModule} from "./helpers/contact-runtime.mjs";

const placeId="ChIJ38_PKjPxw0cRMfEVYieHZDg";
const place={id:placeId,displayName:{text:"Synthetic official payload"},rating:4.7,userRatingCount:2,googleMapsUri:"https://maps.google.com/?cid=4063521367014109489",reviews:[]};
async function producer(fetcher,{key="secret-key-never-log",id=placeId}={}){
  const logs=[],requests=[];let connections=0;
  const api=await loadContactModule("libs/google-reviews.server.js",{
    "server-only":{},"next/server":{connection:async()=>{connections++;}},
  },{AbortSignal,process:{env:{GOOGLE_PLACES_API_KEY:key,GOOGLE_PLACE_ID:id}},console:{warn:(...args)=>logs.push(structuredClone(args))},
    fetch:async(url,options)=>{requests.push({url,options});return fetcher(url,options);},
  });
  return{load:api.getGoogleReviews,logs,requests,connections:()=>connections};
}

test("official HTTP failure logs only allowlisted provider codes, never its key message metadata or URL",async()=>{
  const h=await producer(async()=>Response.json({error:{code:403,status:"PERMISSION_DENIED",message:"secret-key-never-log / private customer",details:[{"@type":"type.googleapis.com/google.rpc.ErrorInfo",reason:"API_KEY_SERVICE_BLOCKED",domain:"googleapis.com",metadata:{apiKey:"secret-key-never-log",consumer:"private-project"}}]}},{status:403}));
  assert.equal(await h.load(),null);
  assert.deepEqual(h.logs,[["[google-places]",{operation:"reviews",category:"http_error",httpStatus:403,providerStatus:"PERMISSION_DENIED",providerReason:"API_KEY_SERVICE_BLOCKED"}]]);
  assert.equal(h.requests.length,1);assert.equal(h.connections(),1);
  assert.doesNotMatch(JSON.stringify(h.logs),/secret-key|private|googleapis|ChIJ|https:/);
});

test("unknown or malformed provider failure cannot inject arbitrary log text",async()=>{
  for(const response of [Response.json({error:{status:"private-status",details:[{"@type":"type.googleapis.com/google.rpc.ErrorInfo",reason:"private-reason"}]}},{status:429}),new Response("private-not-json",{status:502})]){
    const h=await producer(async()=>response);assert.equal(await h.load(),null);
    assert.deepEqual(h.logs,[["[google-places]",{operation:"reviews",category:"http_error",httpStatus:response.status}]]);
  }
});

test("successful official payload returns normalized data without failure diagnostics or extra requests",async()=>{
  const h=await producer(async(url,options)=>{
    assert.equal(url,"https://places.googleapis.com/v1/places/"+placeId+"?languageCode=nl&regionCode=BE");
    assert.equal(options.headers["X-Goog-Api-Key"],"secret-key-never-log");
    assert.equal(options.headers["X-Goog-FieldMask"],"id,displayName,rating,userRatingCount,googleMapsUri,reviews");
    assert.equal(options.cache,"no-store");assert.ok(options.signal instanceof AbortSignal);
    return Response.json(place);
  });
  const result=await h.load();assert.equal(result.rating,4.7);assert.equal(result.reviews.length,0);
  assert.equal(h.requests.length,1);assert.equal(h.connections(),1);assert.deepEqual(h.logs,[]);
});

test("invalid successful payload is distinguishable without dumping review or customer content",async()=>{
  const h=await producer(async()=>Response.json({...place,id:"wrong",reviews:[{text:{text:"private-review"}}]}));
  assert.equal(await h.load(),null);
  assert.deepEqual(h.logs,[["[google-places]",{operation:"reviews",category:"invalid_payload"}]]);
});

test("thrown requests and malformed success JSON remain safe fallbacks with bounded diagnostics",async()=>{
  for(const [fetcher,category] of [
    [async()=>{throw new DOMException("private-timeout","TimeoutError");},"timeout"],
    [async()=>{throw Error("private-network https://secret.invalid");},"request_or_json_failed"],
    [async()=>new Response("private-success-body"),"request_or_json_failed"],
  ]){
    const h=await producer(fetcher);assert.equal(await h.load(),null);
    assert.deepEqual(h.logs,[["[google-places]",{operation:"reviews",category}]]);assert.equal(h.requests.length,1);
  }
});

test("missing server key is visible as configuration presence only and never triggers an upstream call",async()=>{
  const h=await producer(async()=>{throw Error("must not call");},{key:""});assert.equal(await h.load(),null);
  assert.equal(h.requests.length,0);
  assert.deepEqual(h.logs,[["[google-places]",{operation:"reviews",category:"missing_configuration",apiKeyPresent:false,placeIdPresent:true}]]);
});
