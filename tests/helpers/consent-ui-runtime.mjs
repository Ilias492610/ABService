import React from "react";
import {loadContactModule} from "./contact-runtime.mjs";
import {consentBrowser} from "./consent-browser.mjs";

export const nodes = tree => Array.isArray(tree) ? tree.flatMap(nodes) : !React.isValidElement(tree) ? [] : [tree,...nodes(tree.props.children)];
export const text = tree => Array.isArray(tree) ? tree.map(text).join("") : React.isValidElement(tree) ? text(tree.props.children) : tree == null ? "" : String(tree);

export async function consentUi(cookie = "", locale = "nl-BE") {
  const b=consentBrowser(cookie), slots=[], effects=[];
  let index=0;
  const hooks={...React,
    useSyncExternalStore:(_subscribe,snapshot)=>snapshot(),
    useState(initial){const i=index++;if(!(i in slots))slots[i]=typeof initial==="function"?initial():initial;return[slots[i],next=>{slots[i]=typeof next==="function"?next(slots[i]):next;}];},
    useRef(initial){const i=index++;return slots[i]||={current:initial};},
    useEffect(callback,deps){const i=index++,old=slots[i];if(!old||deps.some((value,j)=>!Object.is(value,old.deps[j])))effects.push(()=>{old?.cleanup?.();slots[i]={deps,cleanup:callback()};});},
  };
  const api=await loadContactModule("tests/helpers/consent-ui-entry.mjs",{react:hooks,"next/image":({unoptimized:_u,...props})=>React.createElement("img",props)},b.globals);
  const nativeDialog={open:false,showModal(){this.open=true;},close(){this.open=false;dialogProps.onClose?.();}};
  let dialogProps,tree;
  const render=()=>{index=0;tree=api.CookieConsent({locale});for(const node of nodes(tree))if(node.type==="dialog"){dialogProps=node.props;node.props.ref.current=nativeDialog;}while(effects.length)effects.shift()();return tree;};
  const button=label=>nodes(render()).find(node=>node.type==="button"&&text(node)===label);
  const option=name=>nodes(render()).find(node=>node.type==="input"&&node.props.name===name);
  const opener={focused:0,focus(){this.focused++;}};
  b.document.activeElement=opener;
  render();
  return{...b,api,render,button,option,opener,nativeDialog,dialog:()=>dialogProps,
    dispose(){for(const slot of slots)slot?.cleanup?.();},
  };
}
