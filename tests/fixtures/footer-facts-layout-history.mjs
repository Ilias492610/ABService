// Historical byte preservation only; this utility does not model CSS layout.
const rules = new Map([
  [".business-facts div { display: grid; grid-template-columns: max-content minmax(0, 1fr); column-gap: .75rem; }", ".business-facts div { display: grid; grid-template-columns: 6rem 1fr; }"],
  [".business-facts dd { margin: 0; overflow-wrap: anywhere; }", ".business-facts dd { margin: 0; }"],
]);

// Match whole lines exactly so wrong values, additional declarations, unknown
// selectors and every other byte survive for the immutable historical guards.
export function beforeFooterFactsCss(css) {
  return css.split("\n").map(line => rules.get(line) ?? line).join("\n");
}
