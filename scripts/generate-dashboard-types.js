#!/usr/bin/env node
/**
 * TypeScript type generator for the dashboard contracts (AGB-1084).
 *
 * The JSON Schemas in schemas/dashboard/ are the source of truth. One wrapper schema references
 * every definition, so json-schema-to-typescript de-duplicates shared ones, and a single
 * types/dashboard/index.d.ts is written. Run `npm run generate:dashboard-types` after any schema
 * change and commit the result; scripts/check-types-fresh.sh fails if it drifts.
 */
const fs = require('fs');
const path = require('path');
const { compile } = require('json-schema-to-typescript');

const SCHEMA_DIR = path.join(__dirname, '..', 'schemas', 'dashboard');
const OUTPUT_DIR = path.join(__dirname, '..', 'types', 'dashboard');

const BANNER = [
  '/**',
  ' * AUTO-GENERATED — do not edit by hand.',
  ' * Generated from schemas/dashboard/*.schema.json by scripts/generate-dashboard-types.js.',
  ' * Run `npm run generate:dashboard-types` after changing a schema, then commit the result.',
  ' */',
].join('\n');

async function generate() {
  const properties = {};
  const files = fs.readdirSync(SCHEMA_DIR).filter((f) => f.endsWith('.schema.json') && f !== 'common.schema.json').sort();
  for (const file of files) {
    const schema = JSON.parse(fs.readFileSync(path.join(SCHEMA_DIR, file), 'utf8'));
    for (const name of Object.keys(schema.definitions).sort()) {
      properties[name] = { $ref: `${file}#/definitions/${name}` };
    }
  }
  const wrapper = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'DashboardContracts',
    type: 'object',
    additionalProperties: false,
    properties,
  };
  const text = await compile(wrapper, 'DashboardContracts', {
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
