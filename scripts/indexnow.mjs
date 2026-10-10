import { buildIndexNowPayload, submitIndexNow } from "../libs/indexnow.mjs";

try {
  const args = process.argv.slice(2);
  const send = args.includes("--send");
  if (args.some((arg) => arg.startsWith("--") && arg !== "--send")) {
    throw new Error("Onbekende optie. Gebruik alleen --send voor een echte melding.");
  }
  const paths = args.filter((arg) => arg !== "--send");
  const payload = buildIndexNowPayload(paths);
  const result = send
    ? { mode: "notification", ...(await submitIndexNow(paths)), sent: true, indexed: "not-confirmed" }
    : { mode: "preview", urlCount: payload.urlList.length, urlList: payload.urlList, sent: false };
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
