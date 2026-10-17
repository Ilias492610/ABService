import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import vm from "node:vm";
import { loadBindings, transformSync } from "next/dist/build/swc/index.js";
import * as validation from "../../libs/contact-validation.mjs";
import * as context from "../../libs/contact-context.mjs";
import * as analytics from "../../libs/analytics.mjs";
import { resolveRouteSourcePath } from "./route-source-path.mjs";

const require = createRequire(import.meta.url);
await loadBindings();

// Compile the complete production module; replace only dependencies supplied by a test.
export async function loadContactModule(relativePath, dependencies = {}, globals = {}) {
  const filename = new URL(`../../${resolveRouteSourcePath(relativePath)}`, import.meta.url);
  const source = await readFile(filename, "utf8");
  const { code } = transformSync(source, {
    filename: filename.pathname,
    jsc: { parser: { syntax: "ecmascript", jsx: true }, transform: { react: { runtime: "automatic" } }, target: "es2022" },
    module: { type: "commonjs" },
  });
  const compiledModule = { exports: {} };
  const known = {
    "@/libs/contact-validation.mjs": validation,
    "@/libs/contact-context.mjs": context,
    "@/libs/analytics.mjs": analytics,
    ...dependencies,
  };
  vm.runInNewContext(code, {
    module: compiledModule, exports: compiledModule.exports,
    require: (specifier) => Object.hasOwn(known, specifier) ? known[specifier] : require(specifier),
    console, process, URL, Request, Response, queueMicrotask, ...globals,
  }, { filename: filename.pathname });
  return compiledModule.exports;
}

export async function createFormHarness(fetch) {
  const react = require("react");
  const states = [];
  const refs = [];
  const frames = [];
  const events = [];
  let stateIndex = 0;
  let refIndex = 0;
  const hooks = {
    ...react,
    useEffect() {},
    useState(initial) {
      const index = stateIndex++;
      if (!(index in states)) states[index] = typeof initial === "function" ? initial() : initial;
      return [states[index], (next) => { states[index] = typeof next === "function" ? next(states[index]) : next; }];
    },
    useRef(initial) {
      const index = refIndex++;
      return refs[index] ||= { current: initial };
    },
  };
  const { default: ContactForm } = await loadContactModule("components/sections/contact-form.js", {
    react: hooks,
    "next/link": ({ children }) => children,
    "@vercel/analytics": { track: (name, props) => events.push({ name, props }) },
  }, { fetch, requestAnimationFrame: (callback) => frames.push(callback) });
  const render = (props) => {
    stateIndex = 0; refIndex = 0;
    return ContactForm(props);
  };
  const fill = (values) => {
    states[0] = { ...states[0], ...values };
    return render();
  };
  render();
  return { render, fill, states, refs, events, frames };
}

export const syntheticInput = {
  name: "WP01 synthetic", phone: "0000000000", email: "wp01@example.invalid",
  consent: true, service: "Andere vraag", message: "Synthetic test; no real mail.",
};
