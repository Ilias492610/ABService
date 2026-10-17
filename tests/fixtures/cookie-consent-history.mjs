import rows from "./cookie-consent-history.json" with {type:"json"};

export function beforeCookieConsentSource(source, path) {
  for (const row of [...rows].reverse().filter(row => row.path === path)) {
    for (const {after,before} of row.changes) {
      if (source.split(after).length === 2) source = source.replace(after,before);
    }
  }
  return source;
}

export const beforeCookieConsentBytes = (bytes, path) =>
  rows.some(row => row.path === path) ? Buffer.from(beforeCookieConsentSource(bytes.toString("utf8"), path)) : bytes;
