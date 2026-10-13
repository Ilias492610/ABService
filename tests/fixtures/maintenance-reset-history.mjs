// Exact approved reset delta only. This is historical preservation, not a
// replacement for tests exercising the complete real component and handlers.
const firstRef = '  const firstField = useRef(null);\n';
const resetHandler = '  const reset = () => {\n    setInput(initialInput);\n    setResult(null);\n    requestAnimationFrame(() => {\n      const field = firstField.current;\n      field?.focus({ preventScroll: true });\n      field?.scrollIntoView({ block: "center", behavior: "instant" });\n    });\n  };\n\n';
const oldSelect = '<select id={`check-${name}`} name={name} value={input[name]} onChange={update}>';
const newSelect = '<select id={`check-${name}`} name={name} value={input[name]} onChange={update} ref={name === "region" ? firstField : undefined}>';
const oldButton = '<button type="submit" className="button">Bekijk mijn onderhoudsregel</button>';
const newButtons = '<div className="button-row"><button type="submit" className="button">Bekijk mijn onderhoudsregel</button><button type="button" className="button button-secondary" onClick={reset}>Wis mijn invoer</button></div>';

export function beforeMaintenanceResetSource(source) {
  return source.replace(firstRef, "").replace(resetHandler, "").replace(newSelect, oldSelect).replace(newButtons, oldButton);
}

const oldHtmlButton = '<button type="submit" class="button">Bekijk mijn onderhoudsregel</button>';
const newHtmlButtons = '<div class="button-row"><button type="submit" class="button">Bekijk mijn onderhoudsregel</button><button type="button" class="button button-secondary">Wis mijn invoer</button></div>';

export function beforeMaintenanceResetHtml(html) {
  return html.replace(newHtmlButtons, oldHtmlButton);
}
