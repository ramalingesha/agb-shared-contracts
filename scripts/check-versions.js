#!/usr/bin/env node
// package.json, error-codes.json and api-response-schema.json must carry the same version
// (same rule CI enforces on push to main). AGB-837.
const pkg = require("../package.json").version;
const codes = require("../error-codes.json").version;
const api = require("../api-response-schema.json").version;
if (pkg !== codes || pkg !== api) {
  console.error(`Version mismatch: package.json=${pkg} error-codes.json=${codes} api-response-schema.json=${api}`);
  process.exit(1);
}
console.log(`all versions are consistent: ${pkg}`);
