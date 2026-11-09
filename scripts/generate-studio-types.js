#!/usr/bin/env node
/**
 * TypeScript type generator for the Content Studio contracts (AGB-889).
 *
 * The JSON Schemas in schemas/studio/ are the source of truth. This script compiles one wrapper
 * schema that references every contract, so json-schema-to-typescript de-duplicates shared
 * definitions, and writes a single types/studio/index.d.ts. Run `npm run generate:studio-types`
 * after any schema change and commit the result; scripts/check-types-fresh.sh fails if it drifts.
 */
const fs = require('fs');
const path = require('path');
const { compile } = require('json-schema-to-typescript');

const SCHEMA_DIR = path.join(__dirname, '..', 'schemas', 'studio');
const OUTPUT_DIR = path.join(__dirname, '..', 'types', 'studio');

const BANNER = [
  '/**',
  ' * AUTO-GENERATED — do not edit by hand.',
  ' * Generated from schemas/studio/*.schema.json by scripts/generate-studio-types.js.',
  ' * Run `npm run generate:studio-types` after changing a schema, then commit the result.',
  ' */',
].join('\n');

function contractFiles() {
  return fs
    .readdirSync(SCHEMA_DIR)
    .filter((f) => f.endsWith('.schema.json') && f !== 'common.schema.json')
    .sort();
}

async function generate() {
  const properties = {};
  for (const file of contractFiles()) {
    properties[file.replace('.schema.json', '')] = { $ref: file };
  }
  const wrapper = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'StudioContracts',
    type: 'object',
    additionalProperties: false,
    properties,
  };
  const text = await compile(wrapper, 'StudioContracts', {
    cwd: SCHEMA_DIR + path.sep,
    style: { singleQuote: true },
    bannerComment: '',
    additionalProperties: false,
  });
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const out = path.join(OUTPUT_DIR, 'index.d.ts');
  fs.writeFileSync(out, `${BANNER}\n\n${text.replace(/\r\n/g, '\n')}`, 'utf8');
  console.log(`Wrote ${path.relative(process.cwd(), out)}`);
}

generate().catch((error) => {
  console.error(`ERROR: ${error.message}`);
  process.exit(1);
});
