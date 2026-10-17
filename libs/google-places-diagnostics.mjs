const providerStatuses = new Set([
  "INVALID_ARGUMENT", "UNAUTHENTICATED", "PERMISSION_DENIED", "NOT_FOUND",
  "RESOURCE_EXHAUSTED", "FAILED_PRECONDITION", "INTERNAL", "UNAVAILABLE",
  "DEADLINE_EXCEEDED", "UNKNOWN",
]);
const providerReasons = new Set([
  "API_KEY_INVALID", "API_KEY_SERVICE_BLOCKED", "API_KEY_HTTP_REFERRER_BLOCKED",
  "API_KEY_IP_ADDRESS_BLOCKED", "SERVICE_DISABLED", "BILLING_DISABLED",
  "CONSUMER_INVALID", "RATE_LIMIT_EXCEEDED", "QUOTA_EXCEEDED",
  "IAM_PERMISSION_DENIED", "ACCESS_TOKEN_EXPIRED",
]);

// Keep provider messages, URLs, metadata and credentials out of server logs.
export async function describeGooglePlacesFailure(response) {
  const result = {httpStatus:Number.isInteger(response.status) && response.status >= 100 && response.status <= 599 ? response.status : 0};
  try {
    const error = (await response.json())?.error;
    if (providerStatuses.has(error?.status)) result.providerStatus = error.status;
    const details = Array.isArray(error?.details) ? error.details : [];
    const reason = details.find(detail => detail?.["@type"] === "type.googleapis.com/google.rpc.ErrorInfo" && providerReasons.has(detail.reason))?.reason;
    if (reason) result.providerReason = reason;
  } catch { /* HTTP status remains useful even if the error body is not JSON. */ }
  return result;
}
