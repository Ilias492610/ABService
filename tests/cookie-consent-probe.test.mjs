import test from "node:test";
import assert from "node:assert/strict";
import {spawnSync} from "node:child_process";
import http from "node:http";
import {mkdtemp,readFile} from "node:fs/promises";
import {tmpdir} from "node:os";
import {join} from "node:path";

test("probe refuses external upstream before file reads or outbound requests",()=>{
  const result=spawnSync(process.execPath,["tests/helpers/cookie-consent-probe-server.mjs","--upstream","https://external.invalid","--port","0","--evidence",".superpowers/sdd/2026-10-17-cookie-consent/probe"]);
  assert.equal(result.status,1);assert.match(result.stderr.toString(),/loopback/);
});
test("loopback probe instruments only its own HTML and captures nondefault intake locally without values",async t=>{
  const {startProbe}=await import("./helpers/cookie-consent-probe-server.mjs");
  const seen=[];
  const upstream=http.createServer((request,response)=>{seen.push(request.url);response.setHeader("content-type","text/html");response.end('<html><head></head><body><main id="main-content">Controlled upstream</main></body></html>');});
  await new Promise(resolve=>upstream.listen(0,"127.0.0.1",resolve));t.after(()=>new Promise(resolve=>upstream.close(resolve)));
  const evidence=await mkdtemp(join(tmpdir(),"ab-consent-probe-"));
  const probe=await startProbe({upstream:`http://127.0.0.1:${upstream.address().port}`,port:0,evidence,script:"/* controlled SDK fixture */"});
  t.after(()=>probe.close());
  const html=await(await fetch(probe.origin+"/contact?secret=not-logged")).text();
  assert.ok(html.indexOf("consent-probe-instrumentation")<html.indexOf("</head>"));
  assert.match(html,/Controlled upstream/);assert.match(html,/Storage\.prototype/);
  const sdk=await(await fetch(probe.origin+"/__consent_probe/sdk.js")).text();assert.equal(sdk,"/* controlled SDK fixture */");
  const intake=await fetch(probe.origin+"/__consent_probe/events",{method:"POST",body:'{"private":"not-logged"}'});assert.equal(intake.status,204);
  const mail=await fetch(probe.origin+"/api/contact",{method:"POST",body:"not-logged"});assert.equal(mail.status,409);
  await fetch(probe.origin+"/__consent_probe/observe",{method:"POST",body:JSON.stringify({kind:"storage",operation:"getItem",key:"__va_attribution",sdk:true,value:"not-logged",unknown:"not-logged"})});
  const log=await readFile(probe.logPath,"utf8");assert.doesNotMatch(log,/not-logged|secret|private|unknown/);
  assert.match(log,/__va_attribution/);assert.match(log,/events/);assert.match(log,/getItem/);
  assert.deepEqual(seen,["/contact?secret=not-logged"]);
});
