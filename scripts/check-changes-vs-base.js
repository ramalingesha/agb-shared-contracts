#!/usr/bin/env node
// Local replacement for the two PR-only CI checks (AGB-837): CI now runs only on push to main,
// so the "CHANGELOG updated" and "no error code removed" checks run here, in the pre-push hook,
// against the local origin/main ref (no network). Skipped when the ref is not available.
const { execFileSync } = require("node:child_process");

const base = process.argv[2] || "origin/main";
const git = (...args) => execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });

try {
  git("rev-parse", "--verify", "--quiet", base);
} catch {
  console.log(`${base} not found locally; skipping base comparison`);
  process.exit(0);
}

const changed = git("diff", "--name-only", `${base}...HEAD`).split("\n").filter(Boolean);
const schemaChanged = changed.some((f) => /^(error-codes|api-response-schema|knowledge-api\.schema)\.json$/.test(f));
if (schemaChanged && !changed.includes("CHANGELOG.md")) {
  console.error("Schema files were modified but CHANGELOG.md was not updated. Document the change in CHANGELOG.md.");
  process.exit(1);
}

let baseCodes = [];
try {
  baseCodes = Object.keys(JSON.parse(git("show", `${base}:error-codes.json`)).errorCodes || {});
} catch {
  /* no base file: nothing to compare */
}
const current = Object.keys(require("../error-codes.json").errorCodes);
const removed = baseCodes.filter((c) => !current.includes(c));
if (removed.length) {
  console.error(`Breaking change: error code(s) removed: ${removed.join(", ")}. Deprecate instead of removing.`);
  process.exit(1);
}
console.log(`no CHANGELOG or error-code problems against ${base}`);
