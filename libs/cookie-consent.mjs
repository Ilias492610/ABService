export const CONSENT_MAX_AGE = 15552000;
const cookieName = "ab_service_consent";
const validTime = time => Number.isSafeInteger(time) && time >= 0;

export function parseConsentCookie(cookieHeader, now = Date.now()) {
  if (typeof cookieHeader !== "string" || !validTime(now)) return null;
  const values = cookieHeader.split(";").map(part => part.trim()).filter(part => part.startsWith(cookieName + "="));
  if (values.length !== 1) return null;
  const match = /^ab_service_consent=1\.(0|[1-9]\d*)\.([01])\.([01])$/.exec(values[0]);
  if (!match) return null;
  const decidedAt = Number(match[1]);
  if (!validTime(decidedAt) || decidedAt > now || now - decidedAt >= CONSENT_MAX_AGE * 1000) return null;
  return {version:1, decidedAt, analytics:match[2] === "1", googlePhotos:match[3] === "1"};
}

export function serializeConsentCookie(preference, now = Date.now()) {
  if (!validTime(now) || typeof preference?.analytics !== "boolean" || typeof preference?.googlePhotos !== "boolean") {
    throw new TypeError("Invalid cookie preference");
  }
  return `${cookieName}=1.${now}.${Number(preference.analytics)}.${Number(preference.googlePhotos)}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax; Secure`;
}
