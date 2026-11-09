#!/bin/sh
# Regenerates types/knowledge-api and fails if that changes anything (same check as CI). AGB-837.
set -e
npm run --silent generate:types
npm run --silent generate:studio-types >/dev/null
if ! git diff --exit-code --quiet -- types/knowledge-api/ types/studio/; then
  echo "types/ is stale: run 'npm run generate:types' and commit the result" >&2; exit 1
fi
if git status --porcelain -- types/knowledge-api/ types/studio/ | grep -q '^??'; then
  echo "types/ has untracked files after regeneration: commit them" >&2; exit 1
fi
