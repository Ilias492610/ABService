import { readFile, writeFile } from "node:fs/promises";
import { buildGscAnalysis } from "../libs/gsc-analysis.mjs";

const usage = "Usage: node scripts/gsc-analysis.mjs --queries FILE --pages FILE [--pairs FILE] [--output FILE]";
try {
  const args = process.argv.slice(2);
  if (args.length === 1 && args[0] === "--help") {
    console.log(usage);
  } else {
    const options = {};
    for (let index = 0; index < args.length; index += 2) {
      const flag = args[index];
      const value = args[index + 1];
      if (!["--queries", "--pages", "--pairs", "--output"].includes(flag) || !value || value.startsWith("--") || options[flag]) {
        throw new Error(`Invalid or repeated argument ${flag || ""}. ${usage}`);
      }
      options[flag] = value;
    }
    if (!options["--queries"] || !options["--pages"]) throw new Error(usage);
    const [queriesCsv, pagesCsv, pairsCsv] = await Promise.all([
      readFile(options["--queries"], "utf8"),
      readFile(options["--pages"], "utf8"),
      options["--pairs"] ? readFile(options["--pairs"], "utf8") : undefined,
    ]);
    const report = {
      generatedAt: new Date().toISOString(),
      inputFiles: { queries: options["--queries"], pages: options["--pages"], pairs: options["--pairs"] || null },
      ...buildGscAnalysis({ queriesCsv, pagesCsv, pairsCsv }),
    };
    const json = `${JSON.stringify(report, null, 2)}\n`;
    if (options["--output"]) await writeFile(options["--output"], json, { flag: "wx" });
    else process.stdout.write(json);
  }
} catch (error) {
  console.error(`GSC analysis failed: ${error.message}`);
  process.exitCode = 1;
}
