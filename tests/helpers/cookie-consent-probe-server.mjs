import http from "node:http";
import fs from "node:fs";
import {resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {createHash} from "node:crypto";
import {instrumentationSource} from "./cookie-consent-probe-instrumentation.mjs";

const loopback = value => {
  const url=new URL(value);
  if(url.protocol!=="http:"||!["localhost","127.0.0.1","[::1]"].includes(url.hostname)||url.username||url.password||url.pathname!=="/"||url.search||url.hash)throw Error("Only a loopback HTTP upstream origin is allowed");
  return url.origin;
};
const cleanPath=value=>typeof value==="string"?value.split(/[?#]/)[0].slice(0,250):"";
const body=async request=>{let value="";for await(const chunk of request){value+=chunk;if(value.length>100000)throw Error("request too large");}return value;};
function observation(input) {
  if(!input||typeof input!=="object")return null;
  if(input.kind==="storage"&&["getItem","setItem","removeItem"].includes(input.operation)&&input.key==="__va_attribution")return{kind:"storage",operation:input.operation,key:input.key,sdk:input.sdk===true};
  if(["sdk-request","resource","navigation","layout-shift","host-action","unsupported"].includes(input.kind))return{
    kind:input.kind,path:cleanPath(input.path),
    ...(["GET","POST"].includes(input.method)?{method:input.method}:{}),
    ...(typeof input.external==="boolean"?{external:input.external}:{}),
    ...(typeof input.photo==="boolean"?{photo:input.photo}:{}),
    ...Object.fromEntries(["duration","bytes","shift"].filter(key=>Number.isFinite(input[key])&&input[key]>=0).map(key=>[key,input[key]])),
  };
  return null;
}

export async function startProbe({upstream,port=0,evidence,script}) {
  const origin=loopback(upstream);
  if(!Number.isInteger(port)||port<0||port>65535)throw Error("Invalid loopback port");
  if(typeof script!=="string"||!script.trim())throw Error("A captured SDK script is required");
  fs.mkdirSync(evidence,{recursive:true});
  const logPath=resolve(evidence,"observations.jsonl");
  const log=fs.openSync(logPath,"wx");
  const record=row=>fs.writeSync(log,JSON.stringify({at:Date.now(),...row})+"\n");
  fs.writeFileSync(resolve(evidence,"script-manifest.json"),JSON.stringify({source:"https://va.vercel-scripts.com/v1/script.js",sha256:createHash("sha256").update(script).digest("hex"),capturedAt:new Date().toISOString()},null,2),{flag:"wx"});
  const server=http.createServer(async(request,response)=>{
    try {
      const url=new URL(request.url,"http://127.0.0.1");
      if(url.pathname==="/__consent_probe/observe"){
        const row=observation(JSON.parse(await body(request)));if(row)record(row);response.writeHead(204);response.end();return;
      }
      if(url.pathname==="/__consent_probe/sdk.js"){
        record({kind:"sdk-script",path:url.pathname,method:request.method});response.setHeader("content-type","application/javascript");response.setHeader("cache-control","no-store");response.end(script);return;
      }
      if(url.pathname.startsWith("/__consent_probe/")){
        record({kind:"intake",path:url.pathname,method:request.method});await body(request);response.writeHead(204);response.end();return;
      }
      if(url.pathname==="/api/contact"){
        record({kind:"mail-blocked",path:url.pathname,method:request.method});await body(request);response.writeHead(409,{"content-type":"text/plain"});response.end("Test proxy never sends contact mail");return;
      }
      record({kind:"upstream",path:url.pathname,method:request.method});
      const target=new URL(url.pathname+url.search,origin);
      const headers={...request.headers};delete headers.host;delete headers.connection;delete headers["accept-encoding"];
      const result=await fetch(target,{method:request.method,headers,redirect:"manual",...(request.method!=="GET"&&request.method!=="HEAD"?{body:await body(request)}:{})});
      response.statusCode=result.status;
      for(const [key,value]of result.headers)if(!["content-length","content-encoding","transfer-encoding","connection"].includes(key))response.setHeader(key,value);
      const bytes=Buffer.from(await result.arrayBuffer());
      if(result.headers.get("content-type")?.includes("text/html")){
        const instrumentation='<script id="consent-probe-instrumentation">'+instrumentationSource().replaceAll("</script","<\\/script")+"</script>";
        response.end(bytes.toString("utf8").replace("<head>","<head>"+instrumentation));
      }else response.end(bytes);
    }catch(error){response.writeHead(500,{"content-type":"text/plain"});response.end("Test proxy request failed");record({kind:"probe-error",path:cleanPath(request.url),error:error.name});}
  });
  await new Promise((resolve,reject)=>{server.once("error",reject);server.listen(port,"127.0.0.1",resolve);});
  const address=`http://127.0.0.1:${server.address().port}`;
  return{origin:address,logPath,close:()=>new Promise(resolve=>server.close(()=>{fs.closeSync(log);resolve();}))};
}

if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{
    const args=Object.fromEntries(Array.from({length:Math.floor((process.argv.length-2)/2)},(_,index)=>process.argv.slice(2+index*2,4+index*2)));
    const upstream=loopback(args["--upstream"]);
    const script=args["--script-file"]?fs.readFileSync(args["--script-file"],"utf8"):await(await fetch("https://va.vercel-scripts.com/v1/script.js",{signal:AbortSignal.timeout(10000)})).text();
    const probe=await startProbe({upstream,port:Number(args["--port"]||0),evidence:args["--evidence"],script});
    console.log(JSON.stringify({origin:probe.origin,logPath:probe.logPath}));
    for(const signal of["SIGINT","SIGTERM"])process.once(signal,async()=>{await probe.close();process.exit(0);});
  }catch(error){console.error(error.message);process.exitCode=1;}
}
