#!/bin/sh
# Regenerates types/knowledge-api and fails if that changes anything (same check as CI). AGB-837.
set -e
npm run --silent generate:types
if ! git diff --exit-code --quiet -- types/knowledge-api/; then
  echo "types/knowledge-api/ is stale: run 'npm run generate:types' and commit the result" >&2; exit 1
fi
if git status --porcelain -- types/knowledge-api/ | grep -q '^??'; then
  echo "types/knowledge-api/ has untracked files after regeneration: commit them" >&2; exit 1
fi
