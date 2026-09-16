import { business } from "../content/business.mjs";

export const buildAuditTargets = (
  fetchOrigin,
  path,
  canonicalOrigin = business.canonicalOrigin
) => ({
  fetchUrl: new URL(path, `${fetchOrigin.replace(/\/$/, "")}/`).toString(),
  canonicalUrl: new URL(path, `${canonicalOrigin.replace(/\/$/, "")}/`).toString(),
});
