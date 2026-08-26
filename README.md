# @ramalingesha/shared-contracts

[![npm version](https://img.shields.io/github/package-json/v/ramalingesha/agb-shared-contracts)](https://github.com/ramalingesha/agb-shared-contracts/packages)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Shared contracts and language-agnostic data structures for the AGB microservices ecosystem.

## Overview

This package contains centralized contracts that ensure consistency across Python and Node.js services:

- **Error Code Registry**: Standardized error codes with HTTP status mappings across 5 categories (AUTH, VAL, DB, SYS, BIZ)
- **API Response Schema**: Standard success/error response envelopes
- **Knowledge API Contract**: Read-surface JSON Schema (plus generated TypeScript types) for the Gnanora Knowledge Platform
- **Data Contracts**: Shared type definitions and validation schemas

## Installation

### For Node.js/TypeScript Services

```bash
npm install @ramalingesha/shared-contracts
```

### GitHub Packages Authentication

Since this package is published to GitHub Packages, you need to authenticate:

1. Create a Personal Access Token (PAT) with `read:packages` scope
2. Add to your `~/.npmrc`:

```
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
@ramalingesha:registry=https://npm.pkg.github.com
```

Or use `.npmrc` in your project:

```
@ramalingesha:registry=https://npm.pkg.github.com
```

### For Python Services

```bash
# Download the JSON files directly
curl -O https://raw.githubusercontent.com/ramalingesha/agb-shared-contracts/main/error-codes.json
curl -O https://raw.githubusercontent.com/ramalingesha/agb-shared-contracts/main/api-response-schema.json
```

## Usage

### Node.js/TypeScript

```typescript
import errorCodes from '@ramalingesha/shared-contracts/error-codes.json';
import apiSchema from '@ramalingesha/shared-contracts/api-response-schema.json';

// Access error codes
const authError = errorCodes.errorCodes.AUTH_001;
console.log(authError.message); // "Authentication token is missing"
console.log(authError.httpStatus); // 401

// Use in error handling
throw new ApiError(
  errorCodes.errorCodes.VAL_001.code,
  errorCodes.errorCodes.VAL_001.message,
  errorCodes.errorCodes.VAL_001.httpStatus
);
```

### Python

```python
import json

# Load error codes
with open('error-codes.json') as f:
    error_codes = json.load(f)['errorCodes']

# Access error codes
auth_error = error_codes['AUTH_001']
print(auth_error['message'])  # "Authentication token is missing"
print(auth_error['httpStatus'])  # 401

# Use in error handling
raise ApiError(
    code=error_codes['VAL_001']['code'],
    message=error_codes['VAL_001']['message'],
    http_status=error_codes['VAL_001']['httpStatus']
)
```

## Contents

### error-codes.json

Centralized error code registry used by both Python (`agb-shared-utils-py`) and Node.js (`@agb/shared-utils-js`) shared utilities.

**Error Code Format:** `PREFIX_XXX` where PREFIX indicates category
- **AUTH**: Authentication and authorization errors (AUTH_001 - AUTH_005)
- **VAL**: Validation and input errors (VAL_001 - VAL_004)
- **DB**: Database and data persistence errors (DB_001 - DB_005)
- **SYS**: System and infrastructure errors (SYS_001 - SYS_005)
- **BIZ**: Business logic and rule violations (BIZ_001 - BIZ_003)

**Structure:**
```json
{
  "AUTH_001": {
    "code": "AUTH_001",
    "message": "Authentication token is missing",
    "httpStatus": 401,
    "severity": "error",
    "category": "AUTH",
    "description": "The request does not contain a required authentication token"
  }
}
```

**Severity Levels:**
- `info`: Informational message, no action required
- `warning`: Warning condition, may require attention
- `error`: Error condition, requires immediate attention
- `critical`: Critical failure, system integrity at risk

**Versioning Strategy:**
- Follows semantic versioning (MAJOR.MINOR.PATCH)
- Error codes are **never removed**, only marked as deprecated
- Deprecated codes include `deprecatedAt` timestamp and `replacedBy` field
- MAJOR: Breaking changes in error structure
- MINOR: New error codes added
- PATCH: Message or documentation updates

### api-response-schema.json

JSON Schema defining standard API response format for all services.

**Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2026-01-19T10:30:00Z",
    "requestId": "uuid",
    "pagination": { ... }
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "VAL_001",
    "message": "Request validation failed",
    "details": { ... },
    "timestamp": "2026-01-19T10:30:00Z",
    "requestId": "uuid",
    "path": "/api/v1/endpoint"
  }
}
```

### knowledge-api.schema.json

Read surface for the Gnanora Knowledge Platform — JSON Schema (draft-07), the
contract behind the mock adapter, the static-file adapter, and the eventual live
service. All three MUST satisfy this schema; responses are wrapped in the standard
envelope above (the schema's definitions describe the `data` payload only). Source of
truth: Confluence UPDS → Knowledge Platform → K3.

**Covers:** `DiscoverIndex`, `Knowledge`, `ExplanationSummary`, `ExplanationContent`,
`Block`, `Slide`, `Narration`, `MediaRef`, and their supporting types
(`LanguageCode`, `StyleId`, `ExplanationForm`, `VariantStatus`, etc.).

**Variant status** (`VariantStatus`) is part of the contract, not an implementation
detail — every adapter must be able to return all three:
- `ready` — content present
- `generating` — content absent, `retryAfterSeconds` present; client polls
- `unavailable` — content absent, `fallback` present (nearest available combination)

**Consuming the raw schema** (e.g. for runtime `ajv` validation of fixtures/responses):

```javascript
const knowledgeApiSchema = require('@ramalingesha/shared-contracts/knowledge-api.schema.json');
```

**Consuming the generated TypeScript types**:

```typescript
import type { Knowledge, ExplanationContent, DiscoverIndex } from '@ramalingesha/shared-contracts/types/knowledge-api';
```

The types are generated from the schema via `npm run generate:types`
(`json-schema-to-typescript`) and committed to `types/knowledge-api.d.ts` — CI fails
the build if the committed file drifts from what the schema currently generates, so
there is no separate build step for a consumer that only wants types.

## Version

Current version: **1.2.0** (Updated 2026-08-26)

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

## CI/CD Pipeline

This repository includes automated validation and publishing:

### Validation (on PR)
- JSON syntax validation
- Error code uniqueness check
- Required fields validation
- Version consistency verification
- CHANGELOG update enforcement
- Breaking changes detection

### Publishing (on tag push)
- Automated validation tests
- Version consistency checks
- Publish to GitHub Packages
- GitHub Release creation with CHANGELOG

## Development

### Running Validation Locally

```bash
npm install  # Install dependencies (if any)
npm run validate
```

### Publishing a New Version

1. Update version in `package.json`, `error-codes.json`, and `api-response-schema.json`
2. Document changes in `CHANGELOG.md`
3. Commit changes: `git commit -am "Release v1.1.0"`
4. Create and push tag: `git tag v1.1.0 && git push origin v1.1.0`
5. GitHub Actions will automatically publish to GitHub Packages

## Integration

This package is referenced by:
- `agb-shared-utils-py` (Python shared utilities)
- `@agb/shared-utils-js` (Node.js shared utilities)

Changes to contracts in this package affect all consuming services. Ensure backward compatibility when making modifications.

## Contributing

When adding new error codes:
1. Choose appropriate category (AUTH, VAL, DB, SYS, BIZ)
2. Assign correct HTTP status code
3. Set appropriate severity level
4. Provide clear, actionable error message
5. Include detailed description
6. Update version number following semver
7. Document changes in CHANGELOG.md

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Links

- **Repository**: https://github.com/ramalingesha/agb-shared-contracts
- **Registry**: https://npm.pkg.github.com/@ramalingesha
- **Issues**: https://github.com/ramalingesha/agb-shared-contracts/issues
- **Packages**: https://github.com/ramalingesha?tab=packages

## Related Documentation

- [Shared Libraries Confluence](https://jslipi.atlassian.net/wiki/spaces/UPDS/pages/7536890)
- [User Management Shared Utils Strategy](https://github.com/ramalingesha/ai_gnan_bandar/blob/master/docs/architecture/user_management_shared_utils_strategy.md)

