const expandCodeRange = (value) => {
  const numeric = value.match(/^(\d+)-(\d+)$/);
  if (numeric) {
    const start = Number(numeric[1]);
    const end = Number(numeric[2]);
    if (end >= start && end - start <= 50) {
      return Array.from({ length: end - start + 1 }, (_, index) => String(start + index));
    }
  }

  const prefixed = value.match(/^([A-Za-z]+)(\d+)-(?:([A-Za-z]+))?(\d+)$/i);
  if (prefixed && (!prefixed[3] || prefixed[1].toLowerCase() === prefixed[3].toLowerCase())) {
    const [, prefix, startText, , endText] = prefixed;
    const start = Number(startText);
    const end = Number(endText);
    if (end >= start && end - start <= 50) {
      return Array.from({ length: end - start + 1 }, (_, index) => `${prefix}${start + index}`);
    }
  }

  return [value];
};

export const buildFaultCodeAliases = (code) => {
  const aliases = new Set([code]);
  let activePrefix = "";

  for (const part of code.split("/").map((item) => item.trim())) {
    const prefixed = part.match(/^([A-Za-z0-9]+)\s+(.+)$/);
    if (prefixed) {
      activePrefix = prefixed[1];
      for (const value of expandCodeRange(prefixed[2])) aliases.add(`${activePrefix} ${value}`);
      continue;
    }

    if (activePrefix && /^\d+(?:-\d+)?$/.test(part)) {
      for (const value of expandCodeRange(part)) aliases.add(`${activePrefix} ${value}`);
      continue;
    }

    for (const value of expandCodeRange(part)) aliases.add(value);
  }

  return [...aliases];
};
