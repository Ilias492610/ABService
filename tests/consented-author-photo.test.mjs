import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import {renderToStaticMarkup} from "react-dom/server";
import {loadContactModule} from "./helpers/contact-runtime.mjs";
import {consentUi,nodes} from "./helpers/consent-ui-runtime.mjs";

const props={photoUri:"https://lh3.googleusercontent.com/test-only",displayName:"Fixture"};
test("server author keeps fallback initial without photo src, srcset or preload",async()=>{
  const {default:Photo}=await loadContactModule("components/consented-author-photo.js");
  const html=renderToStaticMarkup(React.createElement(Photo,props));
  assert.match(html,/class="review-author-fallback"[^>]*>F<\/span>/);
  assert.doesNotMatch(html,/<img\b|rel="preload"|srcset=/);
});
test("photo-only action retains analytics choice and revoke restores non-requesting fallback",async()=>{
  const h=await consentUi(`ab_service_consent=1.${Date.now()}.1.0`);
  let tree=h.api.ConsentedAuthorPhoto(props);
  assert.equal(nodes(tree).some(node=>node.type==="img"),false);
  nodes(tree).find(node=>node.type==="button").props.onClick();
  assert.equal(h.api.getConsentSnapshot(),"both");
  tree=h.api.ConsentedAuthorPhoto(props);
  const html=renderToStaticMarkup(tree);
  assert.match(html,/src="https:\/\/lh3.googleusercontent.com\/test-only"/);assert.match(html,/width="44" height="44"/);
  h.api.saveConsent({analytics:false,googlePhotos:false});
  assert.doesNotMatch(renderToStaticMarkup(h.api.ConsentedAuthorPhoto(props)),/<img\b|srcset=/);
  h.dispose();
});

test("author photo action alone never enables statistics and a blocked write stays off",async()=>{
  const h=await consentUi();
  const tree=h.api.ConsentedAuthorPhoto(props);
  nodes(tree).find(node=>node.type==="button").props.onClick();
  assert.equal(h.api.hasConsent("googlePhotos"),true);assert.equal(h.api.hasConsent("analytics"),false);
  h.api.saveConsent({analytics:false,googlePhotos:false});
  h.blockWrite(true);
  nodes(h.api.ConsentedAuthorPhoto(props)).find(node=>node.type==="button").props.onClick();
  assert.equal(h.api.hasConsent("googlePhotos"),false);assert.equal(h.api.hasConsent("analytics"),false);
  h.dispose();
});
