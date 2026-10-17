import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { CONTACT_SERVICES } from '../libs/contact-validation.mjs';

// Execute the real module's initialization with one deliberately incomplete
// dictionary. No renderer, validator or copy guard is substituted.
let sequence = 0;
async function loadCopy(path, change = '') {
  const url = new URL('../content/' + path, import.meta.url);
  let source = await readFile(url, 'utf8');
  source = source.replace(/from (['"])(\.\.?\/[^'"]+)\1/g,
    (_, quote, specifier) => `from ${quote}${new URL(specifier, url).href}${quote}`);
  const validationBoundary = '\nfor (const entry of Object.values(copy)) {';
  const boundary = source.includes(validationBoundary) ? validationBoundary : '\nexport const ';
  assert.equal(source.split(boundary).length, 2, 'one real initialization boundary');
  source = source.replace(boundary, '\n' + change + boundary);
  try {
    return await import('data:text/javascript;base64,' +
      Buffer.from(source + '\n// case ' + sequence++).toString('base64'));
  } catch (error) {
    // Avoid printing the full base64 module URL in assertion diagnostics.
    error.stack = `${error.name}: ${error.message}`;
    throw error;
  }
}

const schemas = [
  ['contact-localization.mjs', 'getContactCopy', ['nl-BE', 'fr-BE', 'en-BE'],
    'note name phone email service chooseService address city postalCode brand boilerType message consentBefore privacy consentAfter submit submitting pending success nativeError summary transport invalid server recipient'.split(' '),
    '38e6f7859da58a3ad5f75a20bd8ccdfd06b1c224490254c3b213944d52e02da3'],
  ['contact-page-localization.mjs', 'getContactPageCopy', ['fr-BE', 'en-BE'],
    'home breadcrumbs contact title intro cta form formHeading imageAlt direct company conversation warning danger call heroAsideLabel heroAsideHeading heroAside tariffs defaultCta'.split(' '),
    'd16c7ad6c1d85aef24766f6430e2d7cbf54eb94e4217845799a64cd0926fbed2'],
  ['privacy-localization.mjs', 'getPrivacyCopy', ['fr-BE', 'en-BE'],
    'name eyebrow title intro controller contact mailgun analytics googleBefore googleLink googleAfter technical rights maintenance water updated date changes'.split(' '),
    'fdf268075f9dbf1d4f2a475605ed6044f46005ba855989a9d84e2bfe496f70b6'],
];

for (const [path, getter, locales, fields, beforeHash] of schemas) {
  for (const locale of locales) {
    test(`${path} rejects missing, blank and non-string required text for ${locale}`, async () => {
      for (const field of fields) {
        for (const value of ['undefined', '""', '"  "', '42']) {
          await assert.rejects(loadCopy(path, `copy[${JSON.stringify(locale)}][${JSON.stringify(field)}] = ${value};`),
            /copy:/, `${locale}.${field} = ${value}`);
        }
      }
    });
  }
  test(`${path} leaves every current dictionary value unchanged`, async () => {
    const current = await loadCopy(path);
    // Captured independently from the deployed b48f8c9 dictionaries before this
    // fix; do not derive the expected value from another current-code import.
    assert.equal(createHash('sha256').update(JSON.stringify(locales.map(locale => current[getter](locale)))).digest('hex'), beforeHash);
  });
}

for (const locale of ['fr-BE', 'en-BE']) {
  test(`${locale} rejects incomplete, blank, sparse or non-string service labels`, async () => {
    const path = 'contact-localization.mjs';
    const target = `copy[${JSON.stringify(locale)}].services`;
    for (const change of [`${target} = undefined`, `${target} = {length:12}`, `${target}.pop()`, `${target}.push('Extra')`]) {
      await assert.rejects(loadCopy(path, change + ';'), /copy:/);
    }
    for (let index = 0; index < 12; index++) {
      for (const value of ['undefined', '""', '"  "', '42']) {
        await assert.rejects(loadCopy(path, `${target}[${index}] = ${value};`), /copy:/);
      }
      await assert.rejects(loadCopy(path, `delete ${target}[${index}];`), /copy:/);
    }
    const loaded = await loadCopy(path);
    assert.equal(loaded.getContactCopy(locale).services.length, CONTACT_SERVICES.length);
  });
  test(`${locale} rejects incomplete, blank, sparse or non-string privacy headings`, async () => {
    const path = 'privacy-localization.mjs';
    const target = `copy[${JSON.stringify(locale)}].headings`;
    for (const change of [`${target} = undefined`, `${target} = {length:8}`, `${target}.pop()`, `${target}.push('Extra')`]) {
      await assert.rejects(loadCopy(path, change + ';'), /copy:/);
    }
    for (let index = 0; index < 8; index++) {
      for (const value of ['undefined', '""', '"  "', '42']) {
        await assert.rejects(loadCopy(path, `${target}[${index}] = ${value};`), /copy:/);
      }
      await assert.rejects(loadCopy(path, `delete ${target}[${index}];`), /copy:/);
    }
  });
}

for (const locale of ['nl-BE', 'fr-BE', 'en-BE']) {
  test(`${locale} rejects missing, blank or non-string validation messages`, async () => {
    for (const field of 'nameRequired nameLength phoneRequired phoneInvalid emailLength emailInvalid address city postalCode service brand boilerType message consent'.split(' ')) {
      for (const value of ['undefined', '""', '"  "', '42']) {
        await assert.rejects(loadCopy('contact-localization.mjs', `copy[${JSON.stringify(locale)}].errors.${field} = ${value};`), /copy:/);
      }
    }
  });
}
