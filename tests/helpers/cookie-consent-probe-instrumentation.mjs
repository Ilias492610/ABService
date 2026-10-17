// Served only by the loopback test proxy, never imported by application code.
function install() {
  const originalFetch = window.fetch.bind(window);
  const report = row => { originalFetch("/__consent_probe/observe", {method:"POST",body:JSON.stringify(row),keepalive:true}).catch(() => {}); };
  const path = value => { try { return new URL(value,location.href).pathname; } catch { return "invalid"; } };
  const sdkStack = () => new Error().stack?.includes("/__consent_probe/sdk.js") === true;
  for (const operation of ["getItem","setItem","removeItem"]) {
    const original = Storage.prototype[operation];
    Storage.prototype[operation] = function(key,...args) {
      if (key === "__va_attribution") report({kind:"storage",operation,key,sdk:sdkStack()});
      return original.call(this,key,...args);
    };
  }
  window.fetch = (input,options) => {
    const url = new URL(typeof input === "string" ? input : input.url,location.href);
    const sdk = sdkStack();
    if (sdk) report({kind:"sdk-request",path:url.pathname,method:options?.method || "GET",external:url.origin !== location.origin});
    if (sdk && url.origin !== location.origin) return Promise.resolve(new Response(null,{status:204}));
    return originalFetch(input,options);
  };
  const originalBeacon = navigator.sendBeacon.bind(navigator);
  navigator.sendBeacon = (url,data) => {
    const target = new URL(url,location.href),sdk=sdkStack();
    if(sdk)report({kind:"sdk-request",path:target.pathname,method:"POST",external:target.origin!==location.origin});
    if(sdk&&target.origin!==location.origin)return true;
    return originalBeacon(url,data);
  };
  for (const type of ["resource","navigation","layout-shift"]) {
    try {
      new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if(type==="resource"&&path(entry.name).startsWith("/__consent_probe/observe"))continue;
          report({kind:type,path:path(entry.name || location.href),photo:type==="resource"&&entry.name.includes("consent-probe-photo=1"),duration:entry.duration || 0,bytes:entry.transferSize || 0,shift:entry.hadRecentInput ? 0 : entry.value || 0});
        }
      }).observe({type,buffered:true});
    } catch { report({kind:"unsupported",path:type}); }
  }
  const cookie = Object.getOwnPropertyDescriptor(Document.prototype,"cookie");
  let blockRead=false,blockWrite=false;
  Object.defineProperty(document,"cookie",{
    configurable:true,
    get(){if(blockRead)throw new Error("Test-only blocked cookie read");return cookie.get.call(document);},
    set(value){if(blockWrite)throw new Error("Test-only blocked cookie write");cookie.set.call(document,value);},
  });
  const setChoice = (analytics,photos,at=Date.now()) => cookie.set.call(document,`ab_service_consent=1.${at}.${Number(analytics)}.${Number(photos)}; Max-Age=15552000; Path=/; SameSite=Lax; Secure`);
  const actions={
    reset(){blockRead=false;blockWrite=false;cookie.set.call(document,"ab_service_consent=; Max-Age=0; Path=/; SameSite=Lax; Secure");window.dispatchEvent(new Event("focus"));},
    "block-writes"(){blockWrite=true;},
    "block-reads"(){blockRead=true;window.dispatchEvent(new Event("focus"));},
    "restore-access"(){blockRead=false;blockWrite=false;window.dispatchEvent(new Event("focus"));},
    "expire-soon"(){setChoice(true,false,Date.now()-15552000000+1500);window.dispatchEvent(new Event("focus"));},
    "tab-return-deny"(){setChoice(false,false);window.dispatchEvent(new Event("focus"));},
  };
  function controls() {
    const panel=document.createElement("section");panel.id="consent-probe-controls";
    panel.style.cssText="padding:1rem;border:2px dashed #555;background:white;color:black";
    const heading=document.createElement("h2");heading.textContent="Test-only consent host controls";panel.append(heading);
    for(const [name,action] of Object.entries(actions)){
      const button=document.createElement("button");button.type="button";button.textContent="Test: "+name;button.style.cssText="margin:.25rem;padding:.5rem";
      button.addEventListener("click",()=>{action();report({kind:"host-action",path:name});});panel.append(button);
    }
    document.body.append(panel);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",controls,{once:true});else controls();
}

export const instrumentationSource = () => `(${install.toString()})();`;
