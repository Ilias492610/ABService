import React from "react";
import { access } from "node:fs/promises";
import { loadContactModule } from "./contact-runtime.mjs";
import { navigation } from "../../content/site-content.mjs";
import * as business from "../../content/business.mjs";
import * as ratings from "../../libs/google-reviews.mjs";
import * as analytics from "../../libs/analytics.mjs";

// Complete production modules execute. Doubles cover only hooks, the host DOM
// and browser observation/network boundaries; effects and handlers really run.
class Element {
  constructor(tagName = "div", props = {}, document) {
    this.tagName = tagName.toUpperCase(); this.nodeType = 1; this.props = props;
    this.ownerDocument = document; this.children = []; this.open = false; this.isConnected = true;
    this.rect = { top: 1600, bottom: 1700, left: 0, right: 200, width: 200, height: 100 };
  }
  matches(selector) {
    return selector.split(",").some((part) => {
      const s = part.trim();
      const ancestorEnd = s.lastIndexOf(" ");
      if (ancestorEnd !== -1) {
        return this.matches(s.slice(ancestorEnd + 1)) && !!this.parentElement?.closest(s.slice(0, ancestorEnd));
      }
      if (s === "a[href]") return this.tagName === "A" && !!this.props.href;
      if (s === "details[open]") return this.tagName === "DETAILS" && this.open;
      if (s.startsWith(".")) return (this.props.className || "").split(" ").includes(s.slice(1));
      return this.tagName.toLowerCase() === s;
    });
  }
  contains(node) { return this === node || this.children.some((child) => child.contains(node)); }
  closest(selector) { return this.matches(selector) ? this : this.parentElement?.closest(selector) || null; }
  querySelectorAll(selector) { return this.children.flatMap((child) => [...(child.matches(selector) ? [child] : []), ...child.querySelectorAll(selector)]); }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
  getAttribute(name) { return this.props[name] ?? null; }
  getBoundingClientRect() { return this.rect; }
  getClientRects() { return this.isConnected ? [this.rect] : []; }
  focus(options) { this.ownerDocument.activeElement = this; this.focusOptions = options; }
  append(node) { this.children.push(node); node.parentElement = this; node.isConnected = true; }
}

export async function createHarness(kind, { mobile = false, zones = [], fetchResponse, deferEffects = false } = {}) {
  const document = { activeElement: null, documentElement: { clientWidth: 390, clientHeight: 844, style: { setProperty() {} } } };
  const body = new Element("body", {}, document);
  document.body = body; document.activeElement = body;
  document.querySelectorAll = (selector) => body.querySelectorAll(selector);
  document.querySelector = (selector) => selector === ".site-header .brand" ? brand : body.querySelector(selector);
  const header = new Element("header", { className: "site-header" }, document);
  header.rect = { top: 0, bottom: 126, left: 0, right: 390, width: 390, height: 126 };
  const brand = new Element("a", { className: "brand", href: "/", "aria-label": "AB Service home" }, document);
  brand.rect = { top: 42, bottom: 100, left: 16, right: 180, width: 164, height: 58 };
  header.append(brand); body.append(header);
  const main = new Element("main", {}, document); body.append(main);
  const footer = new Element("footer", { className: "site-footer" }, document); body.append(footer);
  const host = new Element("div", {}, document); body.append(host);
  const observers = [], mutations = [], resizeObservers = [], idle = [], requests = [], events = [];
  class IntersectionObserver {
    constructor(callback) { this.callback = callback; this.targets = new Set(); observers.push(this); }
    observe(target) { this.targets.add(target); }
    unobserve(target) { this.targets.delete(target); }
    disconnect() { this.disconnected = true; this.targets.clear(); }
    emit(target, isIntersecting) { this.callback([{ target, isIntersecting }]); }
  }
  class MutationObserver {
    constructor(callback) { this.callback = callback; this.targets = []; mutations.push(this); }
    observe(target, options) { this.targets.push({ target, options }); }
    disconnect() { this.disconnected = true; }
    emit(addedNodes = [], removedNodes = []) { this.callback([{ type: "childList", addedNodes, removedNodes }]); }
  }
  class ResizeObserver { constructor(callback) { this.callback = callback; resizeObservers.push(this); } observe() {} disconnect() { this.disconnected = true; } }
  let pathname = "/", index = 0, dirty = false;
  const slots = [], pending = [];
  const hooks = {
    ...React,
    useState(initial) {
      const i = index++; if (!(i in slots)) slots[i] = typeof initial === "function" ? initial() : initial;
      return [slots[i], (next) => { const value = typeof next === "function" ? next(slots[i]) : next; if (!Object.is(value, slots[i])) { slots[i] = value; dirty = true; } }];
    },
    useRef(initial) { const i = index++; return slots[i] ||= { current: initial }; },
    useEffect(callback, deps) {
      const i = index++, previous = slots[i];
      if (!previous || deps.some((dep, j) => !Object.is(dep, previous.deps[j]))) pending.push(() => { previous?.cleanup?.(); slots[i] = { deps, cleanup: callback() }; });
    },
  };
  const link = ({ children, ...props }) => React.createElement("a", props, children);
  const dependencies = { react: hooks, "next/link": link, "next/navigation": { usePathname: () => pathname },
    "@/content/business.mjs": business, "@/libs/google-reviews.mjs": ratings,
    "@/libs/analytics.mjs": analytics, "@vercel/analytics": { track: (name, props) => events.push({ name, props }) },
    "@/content/site-content.mjs": { navigation }, "next/image": ({ priority: _priority, ...props }) => React.createElement("img", props) };
  const globals = { document, window: { innerWidth: 390, innerHeight: 844, requestIdleCallback: (cb) => { idle.push(cb); return idle.length; }, cancelIdleCallback() {} },
    IntersectionObserver, MutationObserver, ResizeObserver, AbortController, setTimeout, clearTimeout,
    fetch: async (...args) => { requests.push(args); return fetchResponse ? fetchResponse(...args) : { ok: false }; } };
  const tracked = await loadContactModule("components/tracked-link.js", dependencies, globals);
  dependencies["@/components/tracked-link"] = tracked.default;
  let moduleName = "components/floating-trust-signals.js";
  if (kind === "navigation") {
    const extracted = await access(new URL("../../components/header-navigation.js", import.meta.url)).then(() => true, () => false);
    moduleName = extracted ? "components/header-navigation.js" : "components/site-header.js";
  }
  const { default: Component } = await loadContactModule(moduleName, dependencies, globals);
  const elements = new Map(); let tree;
  const mount = (value, path = "root") => {
    if (!value || typeof value !== "object") return [];
    if (Array.isArray(value)) return value.flatMap((child, i) => mount(child, `${path}.${i}`));
    if (value.type === React.Fragment) return mount(value.props.children, path);
    if (typeof value.type === "function") return mount(value.type(value.props), path);
    if (typeof value.type !== "string") return [];
    const node = elements.get(path) || new Element(value.type, value.props, document);
    elements.set(path, node); node.props = value.props; node.isConnected = true;
    node.children = mount(value.props.children, `${path}.children`); node.children.forEach((child) => { child.parentElement = node; });
    if (value.props.ref) value.props.ref.current = node;
    return [node];
  };
  let flushEffects = !deferEffects;
  const render = () => {
    let turns = 0;
    do {
      dirty = false; index = 0;
      tree = Component({ navigation, mobile });
      for (const node of elements.values()) node.isConnected = false;
      host.children = mount(tree); host.children.forEach((node) => { node.parentElement = host; });
      if (flushEffects) while (pending.length) pending.shift()();
      if (++turns > 10) throw new Error("Effect render loop");
    } while (dirty);
    return tree;
  };
  const addZone = (selector, visible = false, parent = main) => {
    const descendantStart = selector.indexOf(" ");
    if (descendantStart !== -1) {
      return addZone(selector.slice(descendantStart + 1), visible, addZone(selector.slice(0, descendantStart), false, parent));
    }
    const node = new Element(selector.startsWith(".") ? "div" : selector, { className: selector.startsWith(".") ? selector.slice(1) : undefined }, document);
    if (visible) node.rect = { top: 500, bottom: 700, left: 16, right: 374, width: 358, height: 200 };
    parent.append(node); return node;
  };
  const zoneNodes = zones.map(({ selector, visible }) => {
    if (selector !== ".site-footer") return addZone(selector, visible);
    if (visible) footer.rect = { top: 700, bottom: 1800, left: 0, right: 390, width: 390, height: 1100 };
    return footer;
  });
  render();
  return { document, body, main, footer, brand, observers, mutations, resizeObservers, requests, events, zoneNodes, addZone, render,
    // Inspect the actual initial tree before mount effects, then execute the
    // queued effects once before rendering their resulting state.
    flushEffects() { flushEffects = true; while (pending.length) pending.shift()(); return render(); },
    query: (selector) => host.querySelector(selector), all: (selector) => host.querySelectorAll(selector),
    navigate: (path) => { pathname = path; return render(); },
    click(node, target = node) { const event = { target, currentTarget: node, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } }; let parent = target; while (parent && parent !== host) { event.currentTarget = parent; parent.props.onClick?.(event); parent = parent.parentElement; } render(); return event; },
    keydown(target, key, { defaultPrevented = false } = {}) { const event = { key, target, currentTarget: target, defaultPrevented, preventDefault() { this.defaultPrevented = true; } }; let parent = target; while (parent && parent !== host) { event.currentTarget = parent; parent.props.onKeyDown?.(event); parent = parent.parentElement; } render(); return event; },
    async loadRating() { await idle[0]?.(); render(); },
    dispose() { for (const slot of slots) slot?.cleanup?.(); },
  };
}
