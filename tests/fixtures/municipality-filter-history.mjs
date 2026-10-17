// Restore only Task128's exact lookup-normalization addition for older byte guards.
// Official names, markup, links and every other source byte remain protected.
export function beforeMunicipalitySearchSource(source) {
  return source.replace(
    '    .toLowerCase()\n    .replace(/[-\\s\\u2010-\\u2015]+/g, " ")\n    .trim();',
    '    .toLowerCase();'
  );
}
