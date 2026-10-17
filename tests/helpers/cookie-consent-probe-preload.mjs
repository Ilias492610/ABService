import {consentProbePlace} from "../fixtures/cookie-consent-places.mjs";
if(process.env.GOOGLE_PLACES_API_KEY!=="consent-probe-not-a-real-key")throw Error("Consent probe requires its explicit fake key");
const originalFetch=globalThis.fetch;
globalThis.fetch=(input,options)=>{
  const url=String(typeof input==="object"&&input?.url?input.url:input);
  if(url.startsWith("https://places.googleapis.com/v1/places/"))return Promise.resolve(Response.json(consentProbePlace));
  return originalFetch(input,options);
};
