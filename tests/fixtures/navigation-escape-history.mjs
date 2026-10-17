const escapeHandler = `  const dismissDisclosure = (event) => {
    if (event.key !== "Escape" || event.defaultPrevented || !root.current?.contains(event.target)) return;
    const details = event.target.closest("details[open]");
    if (!details || !root.current.contains(details)) return;
    const summary = Array.from(details.children).find(child => child.tagName === "SUMMARY");
    if (!summary) return;
    event.preventDefault();
    closeDisclosures(details);
    summary.focus();
  };
`;

export function beforeNavigationEscapeSource(source) {
  return source.replace(escapeHandler, "").replaceAll(" onKeyDown={dismissDisclosure}", "");
}
