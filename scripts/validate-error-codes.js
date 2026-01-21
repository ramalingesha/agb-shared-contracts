#!/usr/bin/env node

/**
 * Validation script for error-codes.json
 * 
 * Checks:
 * - JSON syntax validity
 * - Error code uniqueness
 * - Required fields presence
 * - Valid HTTP status codes
 * - Valid severity levels
 * - Valid categories
 * - Category prefix consistency
 * - Version consistency with package.json
 */

const fs = require('fs');
const path = require('path');

const VALID_HTTP_STATUSES = [400, 401, 402, 403, 404, 409, 429, 500, 502, 503, 504];
const VALID_SEVERITIES = ['info', 'warning', 'error', 'critical'];
const VALID_CATEGORIES = ['AUTH', 'VAL', 'DB', 'SYS', 'BIZ'];
const REQUIRED_FIELDS = ['code', 'message', 'httpStatus', 'severity', 'category', 'description'];

let hasErrors = false;

function logError(message) {
  console.error(`❌ ERROR: ${message}`);
  hasErrors = true;
}

function logWarning(message) {
  console.warn(`⚠️  WARNING: ${message}`);
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

function validateErrorCodes() {
  const errorCodesPath = path.join(__dirname, '..', 'error-codes.json');
  const packageJsonPath = path.join(__dirname, '..', 'package.json');

  console.log('🔍 Validating error-codes.json...\n');

  // Load files
  const errorCodesData = loadJSON(errorCodesPath);
  const packageJson = loadJSON(packageJsonPath);

  logSuccess('JSON syntax is valid');

  // Check version consistency
  if (errorCodesData.version !== packageJson.version) {
    logError(`Version mismatch: error-codes.json (${errorCodesData.version}) != package.json (${packageJson.version})`);
  } else {
    logSuccess(`Version consistency: ${errorCodesData.version}`);
  }

  // Validate error codes
  const errorCodes = errorCodesData.errorCodes;
  const seenCodes = new Set();
  let totalErrors = 0;

  for (const [key, errorData] of Object.entries(errorCodes)) {
    totalErrors++;

    // Check if key matches code field
    if (key !== errorData.code) {
      logError(`Key "${key}" does not match code field "${errorData.code}"`);
    }

    // Check for duplicates
    if (seenCodes.has(errorData.code)) {
      logError(`Duplicate error code: ${errorData.code}`);
    }
    seenCodes.add(errorData.code);

    // Check required fields
    for (const field of REQUIRED_FIELDS) {
      if (!errorData[field]) {
        logError(`${errorData.code}: Missing required field "${field}"`);
      }
    }

    // Validate HTTP status
    if (!VALID_HTTP_STATUSES.includes(errorData.httpStatus)) {
      logError(`${errorData.code}: Invalid HTTP status ${errorData.httpStatus}. Must be one of: ${VALID_HTTP_STATUSES.join(', ')}`);
    }

    // Validate severity
    if (!VALID_SEVERITIES.includes(errorData.severity)) {
      logError(`${errorData.code}: Invalid severity "${errorData.severity}". Must be one of: ${VALID_SEVERITIES.join(', ')}`);
    }

    // Validate category
    if (!VALID_CATEGORIES.includes(errorData.category)) {
      logError(`${errorData.code}: Invalid category "${errorData.category}". Must be one of: ${VALID_CATEGORIES.join(', ')}`);
    }

    // Check category prefix consistency
    const prefix = errorData.code.split('_')[0];
    if (prefix !== errorData.category) {
      logError(`${errorData.code}: Category prefix mismatch. Code starts with "${prefix}" but category is "${errorData.category}"`);
    }

    // Validate deprecated codes
    if (errorData.deprecated === true) {
      if (!errorData.deprecatedAt) {
        logWarning(`${errorData.code}: Deprecated but missing "deprecatedAt" timestamp`);
      }
      if (!errorData.replacedBy) {
        logWarning(`${errorData.code}: Deprecated but missing "replacedBy" field`);
      }
    }
  }

  logSuccess(`Found ${totalErrors} error codes`);

  // Category distribution
  const categoryCount = {};
  for (const category of VALID_CATEGORIES) {
    categoryCount[category] = 0;
  }
  for (const errorData of Object.values(errorCodes)) {
    if (errorData.category) {
      categoryCount[errorData.category]++;
    }
  }

  console.log('\n📊 Category Distribution:');
  for (const [category, count] of Object.entries(categoryCount)) {
    console.log(`   ${category}: ${count} codes`);
  }

  if (hasErrors) {
    console.log('\n❌ Validation FAILED\n');
    process.exit(1);
  } else {
    console.log('\n✅ All validations PASSED\n');
    process.exit(0);
  }
}

// Run validation
validateErrorCodes();
