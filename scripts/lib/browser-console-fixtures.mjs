import assert from "node:assert/strict";

// This exception belongs only to the deliberately intercepted browser fixture,
// never to an actual production error or a general console-status allowlist.
export function assertRatingFixtureConsole(messages, fixtureUrl) {
  assert.ok(Array.isArray(messages), "Console diagnostic list must be an array");
  for (const message of messages) {
    assert.ok(
      message?.type === "error" && message.source === fixtureUrl &&
      message.text === "Failed to load resource: the server responded with a status of 503 (Service Unavailable)",
      `Unexpected browser console diagnostic: ${JSON.stringify(message)}`,
    );
  }
}
