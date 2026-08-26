#!/usr/bin/env node

/**
 * TypeScript type generator for knowledge-api.schema.json
 *
 * Compiles the JSON Schema definitions in knowledge-api.schema.json into a set of
 * small, topic-grouped .d.ts files under types/knowledge-api/ (plus a barrel
 * index.d.ts) so TypeScript/Node consumers get compile-time types with no build
 * step of their own, without any single generated file growing unmaintainably
 * large. Re-run (`npm run generate:types`) after any edit to the schema; CI's
 * "types are up to date" check in validate.yml fails the build if the committed
 * output drifts from what the schema currently generates.
 *
 * How the split works: json-schema-to-typescript still compiles the *whole*
 * schema in one pass (single source of truth, no hand-copied/forked types), then
 * this script parses the compiled output with the TypeScript compiler API and
 * distributes each top-level type/interface into the file named by GROUPS below,
 * inserting `import type` statements for any cross-group reference it finds. The
 * result is fully regenerated every run — nothing here is hand-split or editable
 * without re-running the schema through the compiler, so it cannot drift from the
 * schema the way a manually partitioned copy could.
 *
 * Adding a new schema definition: add its name to the appropriate group below (or
 * a new group + GROUP_ORDER entry). generate() throws if a compiled type isn't
 * covered by the manifest, or if the manifest references a type the schema no
 * longer produces — either way, a stale manifest fails loudly instead of silently
 * dropping or misplacing a type.
 */

const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const { compile } = require('json-schema-to-typescript');

const SCHEMA_PATH = path.join(__dirname, '..', 'knowledge-api.schema.json');
const OUTPUT_DIR = path.join(__dirname, '..', 'types', 'knowledge-api');
const LEGACY_SINGLE_FILE = path.join(__dirname, '..', 'types', 'knowledge-api.d.ts');
const ROOT_TYPE_NAME = 'GnanoraKnowledgeAPIContract';

const FILE_BANNER = [
  '/**',
  ' * AUTO-GENERATED — do not edit by hand.',
  ' * Generated from knowledge-api.schema.json by scripts/generate-knowledge-types.js.',
  ' * Run `npm run generate:types` after changing the schema, then commit the result.',
  ' * Source of truth: Confluence UPDS -> Knowledge Platform -> K3.',
  ' *',
  ' * One file of the types/knowledge-api/ split — import from the package root',
  ' * (`@ramalingesha/shared-contracts/types/knowledge-api`, i.e. this directory\'s',
  ' * index.d.ts barrel) rather than from an individual file.',
  ' */',
].join('\n');

// Every top-level type/interface the schema compiles to MUST appear in exactly
// one group. Keep each group's total well under ~200 lines for maintainability.
const GROUPS = {
  primitives: [
    'LanguageCode',
    'StyleId',
    'ExplanationForm',
    'ExplanationOrigin',
    'Anchoring',
    'VariantStatus',
    'Visibility',
    'BlockType',
  ],
  media: ['MediaRef', 'Author', 'VoiceSummary'],
  'content-blocks': ['Block', 'Slide'],
  explanation: ['ExplanationSummary', 'ExplanationContent'],
  knowledge: ['GnanoraKnowledgeAPIContract', 'Knowledge', 'KnowledgeSummary', 'CollectionSummary', 'DiscoverIndex'],
  narration: ['Narration'],
};
const GROUP_ORDER = Object.keys(GROUPS);

function buildNameToGroup() {
  const map = new Map();
  for (const [group, names] of Object.entries(GROUPS)) {
    for (const name of names) map.set(name, group);
  }
  return map;
}

async function compileSchema() {
  const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf8'));
  return compile(schema, ROOT_TYPE_NAME, {
    style: { singleQuote: true },
    unreachableDefinitions: true,
    bannerComment: '',
  });
}

function parseDeclarations(compiledText) {
  const sourceFile = ts.createSourceFile('generated.d.ts', compiledText, ts.ScriptTarget.Latest, true);
  const declarations = new Map();
  sourceFile.forEachChild((node) => {
    if (!ts.isTypeAliasDeclaration(node) && !ts.isInterfaceDeclaration(node)) return;
    const name = node.name.text;
    declarations.set(name, {
      fullText: node.getFullText(sourceFile).replace(/^\n+/, '').trimEnd(),
      codeText: node.getText(sourceFile),
    });
  });
  return declarations;
}

function validateManifestCoverage(declarations, nameToGroup) {
  const missing = [...declarations.keys()].filter((n) => !nameToGroup.has(n));
  if (missing.length) {
    throw new Error(
      `GROUPS manifest in generate-knowledge-types.js is missing: ${missing.join(', ')}. ` +
        'Assign each to a group before regenerating.'
    );
  }
  const stale = [...nameToGroup.keys()].filter((n) => !declarations.has(n));
  if (stale.length) {
    throw new Error(
      `GROUPS manifest references types the schema no longer produces: ${stale.join(', ')}. ` +
        'Remove them from the manifest.'
    );
  }
}

function importsFor(groupKey, codeAll, nameToGroup) {
  const byGroup = new Map();
  for (const [name, group] of nameToGroup) {
    if (group === groupKey) continue;
    if (!new RegExp(`\\b${name}\\b`).test(codeAll)) continue;
    if (!byGroup.has(group)) byGroup.set(group, []);
    byGroup.get(group).push(name);
  }
  return GROUP_ORDER.filter((g) => byGroup.has(g)).map(
    (g) => `import type { ${byGroup.get(g).sort().join(', ')} } from './${g}';`
  );
}

function renderGroupFile(groupKey, declarations, nameToGroup) {
  const blocks = GROUPS[groupKey].map((name) => declarations.get(name));
  const codeAll = blocks.map((b) => b.codeText).join('\n');
  const importLines = importsFor(groupKey, codeAll, nameToGroup);
  const body = blocks.map((b) => b.fullText).join('\n');
  const parts = [FILE_BANNER, ...(importLines.length ? [importLines.join('\n')] : []), body];
  return parts.join('\n\n') + '\n';
}

function renderIndexBarrel() {
  const lines = GROUP_ORDER.map((g) => `export * from './${g}';`);
  return [FILE_BANNER, lines.join('\n')].join('\n\n') + '\n';
}

function resetOutputDir() {
  if (fs.existsSync(LEGACY_SINGLE_FILE)) fs.rmSync(LEGACY_SINGLE_FILE);
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generate() {
  console.log('🔧 Generating TypeScript types from knowledge-api.schema.json...\n');

  const compiledText = await compileSchema();
  const declarations = parseDeclarations(compiledText);
  const nameToGroup = buildNameToGroup();
  validateManifestCoverage(declarations, nameToGroup);

  resetOutputDir();

  for (const groupKey of GROUP_ORDER) {
    const outputPath = path.join(OUTPUT_DIR, `${groupKey}.d.ts`);
    fs.writeFileSync(outputPath, renderGroupFile(groupKey, declarations, nameToGroup), 'utf8');
    console.log(`✅ Wrote ${path.relative(process.cwd(), outputPath)}`);
  }

  const indexPath = path.join(OUTPUT_DIR, 'index.d.ts');
  fs.writeFileSync(indexPath, renderIndexBarrel(), 'utf8');
  console.log(`✅ Wrote ${path.relative(process.cwd(), indexPath)} (barrel)`);
}

generate().catch((error) => {
  console.error(`❌ ERROR: ${error.message}`);
  process.exit(1);
});
