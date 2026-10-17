import rows from "./cookie-consent-history.json" with {type:"json"};

export function beforeCookieConsentSource(source, path) {
  for (const row of [...rows].reverse().filter(row => (!row.kind || row.kind === "source") && row.path === path)) {
    for (const {after,before} of row.changes) {
      if (source.split(after).length === 2) source = source.replace(after,before);
    }
  }
  return source;
}

export const beforeCookieConsentBytes = (bytes, path) =>
  rows.some(row => (!row.kind || row.kind === "source") && row.path === path) ? Buffer.from(beforeCookieConsentSource(bytes.toString("utf8"), path)) : bytes;

export function beforeCookieConsentHtml(html, path) {
  for (const row of rows.filter(row => row.kind === "html" && row.path === path)) {
    for (const {after,before} of row.changes) if (html.split(after).length === 2) html = html.replace(after,before);
  }
  return html;
}

export function beforeCookieConsentRegistry(registry) {
  return registry.map(page => {
    const row = rows.find(row => row.kind === "registry" && JSON.stringify(row.after) === JSON.stringify(page));
    return row ? {...row.before} : page;
  });
}

export function beforeCookieConsentCopy(copy, locale) {
  const restored = {...copy};
  for (const row of rows.filter(row => row.kind === "copy" && row.locale === locale)) {
    for (const {key,after,before} of row.changes) if (restored[key] === after) restored[key] = before;
  }
  return restored;
}
