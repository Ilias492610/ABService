// Invert only the entire approved Task98 callback. Unknown options, statements
// or branch changes survive, so complete-source preservation still rejects them.
const oldCallback = '    requestAnimationFrame(() => next.kind === "invalid" ? document.getElementById("check-lastDate")?.focus() : resultPanel.current?.focus());';
const approvedCallback = '    requestAnimationFrame(() => {\n      if (next.kind === "invalid") {\n        document.getElementById("check-lastDate")?.focus();\n      } else {\n        const panel = resultPanel.current;\n        panel?.focus({ preventScroll: true });\n        panel?.scrollIntoView({ block: "start", behavior: "instant" });\n      }\n    });';

export function beforeMaintenanceSubmitFocusSource(source) {
  return source.replace(approvedCallback, oldCallback);
}
