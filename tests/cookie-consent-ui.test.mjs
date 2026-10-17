import test from "node:test";
import assert from "node:assert/strict";
import React from "react";
import {renderToStaticMarkup} from "react-dom/server";
import {loadContactModule} from "./helpers/contact-runtime.mjs";
import {consentUi,nodes,text} from "./helpers/consent-ui-runtime.mjs";

const labels=[
  ["nl-BE","Statistieken toestaan","Alleen noodzakelijk","Cookie-instellingen","Keuzes opslaan","Alles intrekken","Sluiten","/privacy-policy"],
  ["fr-BE","Autoriser les statistiques","Nécessaire uniquement","Préférences de cookies","Enregistrer les choix","Tout retirer","Fermer","/fr/confidentialite"],
  ["en-BE","Allow statistics","Necessary only","Cookie settings","Save choices","Withdraw all","Close","/en/privacy"],
];
for(const [locale,allow,deny,settings,save,withdraw,close,path] of labels){
  test(locale+" gives equal explicit choices and no prechecked optional purpose",async()=>{
    const h=await consentUi("",locale);
    assert.ok(h.button(allow));assert.ok(h.button(deny));
    assert.equal(h.button(allow).props.className,h.button(deny).props.className);
    assert.equal(h.option("analytics").props.checked,false);assert.equal(h.option("googlePhotos").props.checked,false);
    assert.equal(h.opener.focused,0);
    h.button(allow).props.onClick();
    assert.equal(h.api.hasConsent("analytics"),true);assert.equal(h.api.hasConsent("googlePhotos"),false);
    assert.equal(h.button(allow),undefined);
    h.dispose();
  });
  test(locale+" footer opens native settings without navigation, cancel preserves choice and returns focus",async()=>{
    const h=await consentUi("",locale);let prevented=0;
    const link=h.api.CookiePreferencesLink({locale});
    assert.equal(link.props.href,path+"#cookievoorkeuren");
    assert.equal(text(link),settings);
    link.props.onClick({preventDefault(){prevented++;}});
    assert.equal(prevented,1);assert.equal(h.nativeDialog.open,true);
    h.option("analytics").props.onChange({target:{checked:true}});
    h.dialog().onCancel({preventDefault(){}});
    assert.equal(h.api.hasConsent("analytics"),false);assert.equal(h.nativeDialog.open,false);assert.equal(h.opener.focused,1);
    link.props.onClick({preventDefault(){}});
    assert.equal(h.option("analytics").props.checked,false);
    h.option("googlePhotos").props.onChange({target:{checked:true}});
    h.button(save).props.onClick();
    assert.equal(h.api.hasConsent("googlePhotos"),true);assert.equal(h.api.hasConsent("analytics"),false);
    link.props.onClick({preventDefault(){}});h.option("analytics").props.onChange({target:{checked:true}});h.button(save).props.onClick();
    assert.equal(h.api.getConsentSnapshot(),"both");
    link.props.onClick({preventDefault(){}});h.button(withdraw).props.onClick();assert.equal(h.api.getConsentSnapshot(),"necessary");
    link.props.onClick({preventDefault(){}});h.button(close).props.onClick();assert.equal(h.nativeDialog.open,false);
    h.dispose();
  });
  test(locale+" failed write leaves optional processing off and an honest visible error",async()=>{
    const h=await consentUi(`ab_service_consent=1.${Date.now()}.1.0`,locale);
    h.api.requestConsentSettings();h.blockWrite(true);h.button(withdraw).props.onClick();
    assert.equal(h.api.getConsentSnapshot(),"unknown");assert.equal(h.nativeDialog.open,true);
    const alerts=nodes(h.render()).filter(node=>node.props.role==="alert");assert.ok(alerts.length);
    assert.match(text(alerts),locale==="nl-BE"?/niet bewaren/:locale==="fr-BE"?/pas pu enregistrer/:/could not save/);
    h.dispose();
  });
}

test("SSR offers a no-script privacy fallback without an interactive banner or SDK",async()=>{
  const {default:Consent}=await loadContactModule("components/cookie-consent.js");
  const html=renderToStaticMarkup(React.createElement(Consent));
  assert.match(html,/<noscript>/);assert.match(html,/href="\/privacy-policy#cookievoorkeuren"/);
  assert.doesNotMatch(html,/data-consent-banner|<script|<iframe/);
});
test("footer falls back to the privacy anchor when no dialog handler exists",async()=>{
  const {default:Link}=await loadContactModule("components/cookie-preferences-link.js");
  let prevented=false;const link=Link({locale:"en-BE"});link.props.onClick({preventDefault(){prevented=true;}});
  assert.equal(prevented,false);assert.equal(link.props.href,"/en/privacy#cookievoorkeuren");
});
