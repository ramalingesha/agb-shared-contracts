#!/usr/bin/env node

/**
 * TypeScript type generator for knowledge-api.schema.json
 *
 * Compiles the JSON Schema definitions in knowledge-api.schema.json into a single
 * committed .d.ts file so TypeScript/Node consumers get compile-time types without
 * needing their own build step. Re-run (`npm run generate:types`) after any edit to
 * the schema; CI's "types are up to date" check in validate.yml fails the build if the
 * committed output drifts from what the schema actually generates.
 */

const fs = require('fs');
const path = require('path');
const { compileFromFile } = require('json-schema-to-typescript');

const SCHEMA_PATH = path.join(__dirname, '..', 'knowledge-api.schema.json');
const OUTPUT_PATH = path.join(__dirname, '..', 'types', 'knowledge-api.d.ts');

const BANNER = [
  '/**',
  ' * AUTO-GENERATED — do not edit by hand.',
  ' * Generated from knowledge-api.schema.json by scripts/generate-knowledge-types.js.',
  ' * Run `npm run generate:types` after changing the schema, then commit the result.',
  ' * Source of truth: Confluence UPDS -> Knowledge Platform -> K3.',
  ' */',
].join('\n');

async function generate() {
  console.log('🔧 Generating TypeScript types from knowledge-api.schema.json...\n');

  const compiled = await compileFromFile(SCHEMA_PATH, {
    bannerComment: BANNER,
    style: { singleQuote: true },
    unreachableDefinitions: true,
  });

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, compiled, 'utf8');

  console.log(`✅ Wrote ${path.relative(process.cwd(), OUTPUT_PATH)}`);
}

generate().catch((error) => {
  console.error(`❌ ERROR: ${error.message}`);
  process.exit(1);
});
