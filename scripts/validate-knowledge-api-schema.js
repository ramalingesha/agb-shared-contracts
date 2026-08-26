#!/usr/bin/env node

/**
 * Validation script for knowledge-api.schema.json
 *
 * Checks:
 * - JSON syntax validity
 * - $schema is draft-07
 * - All AC-required definitions are present (K3 read surface)
 * - VariantStatus enum matches the contract exactly (ready/generating/unavailable)
 * - Schema compiles under ajv with no dangling $refs
 * - package.json "files" ships both the schema and the generated types (regression
 *   guard for the packaging gap this script's sibling story, AGB-586, fixed)
 * - types/knowledge-api.d.ts exists and is non-empty
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const REQUIRED_DEFINITIONS = [
  'DiscoverIndex',
  'Knowledge',
  'ExplanationSummary',
  'ExplanationContent',
  'Block',
  'Slide',
  'Narration',
  'MediaRef',
];

const REQUIRED_VARIANT_STATUSES = ['ready', 'generating', 'unavailable'];
const DRAFT_07_SCHEMA_URI = 'http://json-schema.org/draft-07/schema#';

let hasErrors = false;

function logError(message) {
  console.error(`❌ ERROR: ${message}`);
  hasErrors = true;
}

function logSuccess(message) {
  console.log(`✅ ${message}`);
}

function loadJSON(filepath) {
  try {
    const content = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    logError(`Failed to parse ${filepath}: ${error.message}`);
    process.exit(1);
  }
}

function validateDefinitionsPresent(schema) {
  const definitions = schema.definitions || {};
  for (const name of REQUIRED_DEFINITIONS) {
    if (definitions[name]) {
      logSuccess(`Definition present: ${name}`);
    } else {
      logError(`Missing required definition: ${name}`);
    }
  }
}

function validateVariantStatusEnum(schema) {
  const variantStatus = (schema.definitions || {}).VariantStatus;
  if (!variantStatus || !Array.isArray(variantStatus.enum)) {
    logError('VariantStatus definition or its enum is missing');
    return;
  }

  const actual = [...variantStatus.enum].sort();
  const expected = [...REQUIRED_VARIANT_STATUSES].sort();
  const matches =
    actual.length === expected.length && actual.every((value, i) => value === expected[i]);

  if (matches) {
    logSuccess(`VariantStatus enum matches contract: ${REQUIRED_VARIANT_STATUSES.join(', ')}`);
  } else {
    logError(
      `VariantStatus enum mismatch. Expected [${expected.join(', ')}], got [${actual.join(', ')}]`
    );
  }
}

function validateAjvCompiles(schema) {
  // logger: false — the schema uses "format": "uri" for documentation purposes only;
  // we deliberately don't add ajv-formats (no runtime format validation is needed
  // here, only $ref-resolution correctness), so silence its "unknown format" notices.
  const ajv = new Ajv({ strict: false, logger: false });
  try {
    ajv.addSchema(schema, 'knowledge-api');
  } catch (error) {
    logError(`Schema failed to load into ajv: ${error.message}`);
    return;
  }

  const definitions = schema.definitions || {};
  for (const name of Object.keys(definitions)) {
    try {
      const resolved = ajv.getSchema(`knowledge-api#/definitions/${name}`);
      if (!resolved) {
        logError(`ajv could not resolve definition: ${name}`);
      }
    } catch (error) {
      logError(`ajv failed to compile definition "${name}": ${error.message}`);
    }
  }
  logSuccess(`ajv compiled all ${Object.keys(definitions).length} definitions with no dangling $refs`);
}

function validatePackageFilesAllowlist(packageJson) {
  const files = packageJson.files || [];
  const required = ['knowledge-api.schema.json', 'types/knowledge-api.d.ts'];

  for (const entry of required) {
    if (files.includes(entry)) {
      logSuccess(`package.json "files" includes ${entry}`);
    } else {
      logError(
        `package.json "files" is missing "${entry}" — the published npm tarball will silently omit it (this is the exact regression AGB-586 fixed)`
      );
    }
  }
}

function validateGeneratedTypesExist(typesPath) {
  if (!fs.existsSync(typesPath)) {
    logError(`Generated types file not found: ${typesPath}. Run "npm run generate:types".`);
    return;
  }
  const stats = fs.statSync(typesPath);
  if (stats.size === 0) {
    logError(`Generated types file is empty: ${typesPath}`);
  } else {
    logSuccess(`Generated types file present and non-empty (${stats.size} bytes)`);
  }
}

function validateKnowledgeApiSchema() {
  const schemaPath = path.join(__dirname, '..', 'knowledge-api.schema.json');
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const typesPath = path.join(__dirname, '..', 'types', 'knowledge-api.d.ts');

  console.log('🔍 Validating knowledge-api.schema.json...\n');

  const schema = loadJSON(schemaPath);
  const packageJson = loadJSON(packageJsonPath);

  logSuccess('JSON syntax is valid');

  if (schema.$schema === DRAFT_07_SCHEMA_URI) {
    logSuccess('$schema is draft-07');
  } else {
    logError(`$schema must be "${DRAFT_07_SCHEMA_URI}", got "${schema.$schema}"`);
  }

  validateDefinitionsPresent(schema);
  validateVariantStatusEnum(schema);
  validateAjvCompiles(schema);
  validatePackageFilesAllowlist(packageJson);
  validateGeneratedTypesExist(typesPath);

  if (hasErrors) {
    console.log('\n❌ Validation FAILED\n');
    process.exit(1);
  } else {
    console.log('\n✅ All validations PASSED\n');
    process.exit(0);
  }
}

validateKnowledgeApiSchema();
