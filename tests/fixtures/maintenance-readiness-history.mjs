// Only the approved Task102 literals are inverted. Old inputs are identities;
// unknown attributes, callback bodies, handlers and unrelated copy survive.
const callbacks = 'const subscribe = () => () => {};\nconst clientReady = () => true;\nconst serverReady = () => false;\n';
const hook = '  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);\n';
const fallback = 'JavaScript is nodig voor de lokale berekening in uw browser. De invoer en beide knoppen zijn uitgeschakeld. Lees hieronder de onderhoudsregels, voorbereiding en officiële bronnen.';
const sourceFallback = '        <noscript><p className="warning-box">' + fallback + '</p></noscript>\n';
const sourceOpening = '        <fieldset disabled={!ready} aria-label="Gegevens van de onderhoudscheck">\n        <div className="form-grid">';
const sourceRow = '<div className="button-row"><button type="submit" className="button">Bekijk mijn onderhoudsregel</button><button type="button" className="button button-secondary" onClick={reset}>Wis mijn invoer</button></div>';
const sourceReadyRow = '<div className="button-row"><button type="submit" className="button" disabled={!ready}>Bekijk mijn onderhoudsregel</button><button type="button" className="button button-secondary" onClick={reset} disabled={!ready}>Wis mijn invoer</button></div>';

export function beforeMaintenanceReadinessSource(source) {
  return source
    .replace('import { useRef, useState, useSyncExternalStore } from "react";', 'import { useRef, useState } from "react";')
    .replace(callbacks, "")
    .replace(hook, "")
    .replace(sourceFallback, "")
    .replace(sourceOpening, '        <div className="form-grid">')
    .replace(sourceReadyRow, sourceRow)
    .replace(sourceRow + '\n        </fieldset>\n      </form>', sourceRow + '\n      </form>');
}

const htmlFallback = '<noscript><p class="warning-box">' + fallback + '</p></noscript>';
const htmlRow = '<div class="button-row"><button type="submit" class="button">Bekijk mijn onderhoudsregel</button><button type="button" class="button button-secondary">Wis mijn invoer</button></div>';
const htmlDisabledRow = '<div class="button-row"><button type="submit" class="button" disabled="">Bekijk mijn onderhoudsregel</button><button type="button" class="button button-secondary" disabled="">Wis mijn invoer</button></div>';

export function beforeMaintenanceReadinessHtml(html) {
  return html
    .replace(htmlFallback, "")
    .replace('<fieldset disabled="" aria-label="Gegevens van de onderhoudscheck"><div class="form-grid">', '<div class="form-grid">')
    .replace('<fieldset aria-label="Gegevens van de onderhoudscheck"><div class="form-grid">', '<div class="form-grid">')
    .replace(htmlDisabledRow, htmlRow)
    .replace(htmlRow + '</fieldset></form>', htmlRow + '</form>');
}
