export function consentBrowser(initial = "") {
  let cookie = initial;
  let readError = false;
  let writeError = false;
  const removed = [];
  const document = new EventTarget();
  document.visibilityState = "visible";
  Object.defineProperty(document, "cookie", {
    get() { if (readError) throw Error("blocked read"); return cookie; },
    set(value) { if (writeError) throw Error("blocked write"); cookie = value.split(";")[0]; },
  });
  const window = new EventTarget();
  window.localStorage = {removeItem: key => removed.push(key)};
  return {document, window, removed, globals:{document,window,Event,setTimeout,clearTimeout},
    setCookie: value => {cookie = value;},
    blockRead: value => {readError = value;}, blockWrite: value => {writeError = value;},
  };
}
export const analyticsCookie = () => `ab_service_consent=1.${Date.now()}.1.0`;
