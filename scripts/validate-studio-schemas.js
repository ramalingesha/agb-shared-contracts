#!/usr/bin/env node
/**
 * Validation and tests for the Content Studio contracts (AGB-889).
 * Plain node:assert, no test framework, so it runs the same on macOS, Linux and Windows.
 *
 * Checks: every schema compiles; every example validates; invalid fixtures fail for the right
 * reason; the review state machine (every illegal jump rejected, 'locked' has no exit); the
 * config-only extension tests (fake provider, circle-teacher role); and a scan proving no schema
 * or example assumes an OS, a drive letter, a backslash or an absolute path.
 * Optional: STUDIO_TEMPLATES_DIR=<folder> also validates every template file in that folder
 * (gnanora-content/templates, AGB-890).
 */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const Ajv = require('ajv');

const ROOT = path.join(__dirname, '..');
const SCHEMA_DIR = path.join(ROOT, 'schemas', 'studio');
const EXAMPLE_DIR = path.join(ROOT, 'examples', 'studio');
const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

let failures = 0;
let passed = 0;
function test(name, fn) {
  try {
    fn();
    passed += 1;
    console.log(`  ok   ${name}`);
  } catch (error) {
    failures += 1;
    console.error(`  FAIL ${name}\n       ${String(error.message).split('\n').join('\n       ')}`);
  }
}

const ajv = new Ajv({ allErrors: true, strict: false });
const schemaFiles = fs.readdirSync(SCHEMA_DIR).filter((f) => f.endsWith('.schema.json')).sort();
for (const file of schemaFiles) ajv.addSchema(readJson(path.join(SCHEMA_DIR, file)), file);
const validatorFor = (name) => ajv.getSchema(`${name}.schema.json`);

function expectInvalid(name, doc, keyword, where) {
  const validate = validatorFor(name);
  assert.equal(validate(doc), false, `${name}: expected the document to be rejected`);
  const hit = validate.errors.some(
    (e) => (!keyword || e.keyword === keyword) && (!where || `${e.instancePath} ${JSON.stringify(e.params)}`.includes(where))
  );
  assert.ok(hit, `${name}: rejected, but not for ${keyword}/${where}. Errors: ${JSON.stringify(validate.errors)}`);
}
function expectValid(name, doc) {
  const validate = validatorFor(name);
  assert.equal(validate(doc), true, `${name}: ${JSON.stringify(validate.errors)}`);
}
const example = (name) => structuredClone(readJson(path.join(EXAMPLE_DIR, `${name}.json`)));

console.log('Studio contracts');

test('every schema file compiles and declares draft-07', () => {
  assert.ok(schemaFiles.length >= 11);
  for (const file of schemaFiles) {
    const schema = readJson(path.join(SCHEMA_DIR, file));
    assert.equal(schema.$schema, 'http://json-schema.org/draft-07/schema#', file);
    assert.ok(ajv.getSchema(file), `${file} did not compile`);
  }
});

test('every contract has an example and every example validates', () => {
  const contracts = schemaFiles.map((f) => f.replace('.schema.json', '')).filter((n) => n !== 'common');
  for (const name of contracts) {
    assert.ok(fs.existsSync(path.join(EXAMPLE_DIR, `${name}.json`)), `missing examples/studio/${name}.json`);
    expectValid(name, example(name));
  }
});

test('job: bad inputs fail for the right reason', () => {
  const missing = example('job'); delete missing.template;
  expectInvalid('job', missing, 'required', 'template');
  const mode = example('job'); mode.rebuildMode = 'rewrite';
  expectInvalid('job', mode, 'enum', '/rebuildMode');
  const noLang = example('job'); noLang.languages = [];
  expectInvalid('job', noLang, 'minItems', '/languages');
  const tpl = example('job'); tpl.template.version = 0;
  expectInvalid('job', tpl, 'minimum', '/template/version');
});

test('job: optional catalog reference (2.8.0)', () => {
  const ok = example('job'); assert.ok(ok.catalog);
  const none = example('job'); delete none.catalog; expectValid('job', none);
  const partial = example('job'); delete partial.catalog.bookId;
  expectInvalid('job', partial, 'required', 'bookId');
});

test('stage: checks list and previousCommit (2.8.0)', () => {
  const s = example('stage');
  s.status = 'failed'; s.checks = [{ id: 'recap', message: 'Section s3 has no recap line' }]; s.previousCommit = 'abc1234';
  expectValid('stage', s);
  const bad = example('stage'); bad.checks = [{ id: 'x' }];
  expectInvalid('stage', bad, 'required', 'message');
  const sha = example('stage'); sha.previousCommit = 'not a sha';
  expectInvalid('stage', sha, 'pattern', '/previousCommit');
});

test('page-map: pages are positive integers (2.8.0)', () => {
  expectValid('page-map', example('page-map'));
  const zero = example('page-map'); zero.blocks['s1-p1'] = [0];
  expectInvalid('page-map', zero, 'minimum', '/blocks/s1-p1/0');
  const empty = example('page-map'); empty.blocks['s1-p1'] = [];
  expectInvalid('page-map', empty, 'minItems', '/blocks/s1-p1');
});

test('job: as-is can be set per source item', () => {
  const job = example('job'); job.sources[0].rebuildMode = 'as-is';
  expectValid('job', job);
});

test('stage: unknown stage rejected; generate needs an item', () => {
  const bad = example('stage'); bad.stage = 'dubbing';
  expectInvalid('stage', bad, 'enum', '/stage');
  const noItem = example('stage'); delete noItem.item;
  expectInvalid('stage', noItem, 'required', 'item');
  const slides = example('stage'); slides.stage = 'slides'; delete slides.item;
  expectValid('stage', slides);
});

test('stage-io lists exactly the stage ids, with generate per item', () => {
  const io = readJson(path.join(SCHEMA_DIR, 'stage-io.json')).stages;
  const ids = ajv.getSchema('common.schema.json').schema.definitions.StageId.enum;
  assert.deepEqual(Object.keys(io).sort(), [...ids].sort());
  assert.equal(io.generate.perItem, true);
  for (const [id, def] of Object.entries(io)) {
    assert.ok(def.inputs.length > 0 && def.outputs.length > 0, id);
  }
});

test('store keys: relative, forward-slash only', () => {
  const key = (k) => { const j = example('stage'); j.inputs = [k]; return j; };
  expectValid('stage', key('jobs/c4/inventory.json'));
  for (const bad of ['/jobs/x', 'C:/jobs/x', 'jobs\\x', '../x', 'jobs/../x', 'jobs//x', './x', 'jobs/x/', '']) {
    expectInvalid('stage', key(bad), 'pattern', '/inputs/0');
  }
});

// ---- review state machine
const table = readJson(path.join(SCHEMA_DIR, 'review-transitions.json'));
const canMove = (from, to) => (table.transitions[from] || []).includes(to);

test('review states in the table equal the schema enum', () => {
  const enumStates = ajv.getSchema('common.schema.json').schema.definitions.ReviewState.enum;
  assert.deepEqual([...table.states].sort(), [...enumStates].sort());
  assert.deepEqual(Object.keys(table.transitions).sort(), [...enumStates].sort());
});

test('state machine: legal path draft -> in-review -> approved -> locked', () => {
  assert.ok(canMove('draft', 'in-review'));
  assert.ok(canMove('in-review', 'approved'));
  assert.ok(canMove('in-review', 'changes-requested'));
  assert.ok(canMove('changes-requested', 'in-review'));
  assert.ok(canMove('approved', 'locked'));
});

test('state machine: every move not in the table is rejected', () => {
  let illegal = 0;
  for (const from of table.states) {
    for (const to of table.states) {
      if (table.transitions[from].includes(to)) continue;
      assert.equal(canMove(from, to), false, `${from} -> ${to}`);
      illegal += 1;
    }
  }
  assert.ok(illegal >= 15);
});

test("state machine: 'locked' is terminal (no exit, and nothing returns to draft)", () => {
  assert.deepEqual(table.transitions.locked, []);
  for (const from of table.states) assert.equal(canMove(from, 'draft'), false, `${from} -> draft`);
});

test('review: unknown state rejected', () => {
  const bad = example('review'); bad.state = 'published';
  expectInvalid('review', bad, 'enum', '/state');
});

// ---- review records
test('review-record: global and circle scope', () => {
  expectValid('review-record', example('review-record'));
  const circle = example('review-record'); circle.scope = { kind: 'circle', circleId: 'class-4-science' };
  expectValid('review-record', circle);
  const noId = example('review-record'); noId.scope = { kind: 'circle' };
  expectInvalid('review-record', noId, 'required', 'circleId');
  const stray = example('review-record'); stray.scope = { kind: 'global', circleId: 'x' };
  expectInvalid('review-record', stray, null, '');
  const noText = example('review-record'); delete noText.comment;
  expectInvalid('review-record', noText, 'required', 'comment');
  const approve = example('review-record'); approve.kind = 'approve'; delete approve.comment;
  expectValid('review-record', approve);
});

// the role list is configuration, not a schema enum
const roleAllowed = (record, config) => config.reviewRoles.includes(record.reviewer.role);

test("config-only: adding 'circle-teacher' to the role list needs no schema change", () => {
  const config = example('studio-config');
  expectValid('studio-config', config);
  const record = example('review-record');
  record.scope = { kind: 'circle', circleId: 'class-4-science' };
  record.reviewer.role = 'circle-teacher';
  expectValid('review-record', record); // the schema accepts the role string as is
  assert.equal(roleAllowed(record, config), false, 'rejected while the role is not configured');
  config.reviewRoles.push('circle-teacher');
  expectValid('studio-config', config);
  assert.equal(roleAllowed(record, config), true, 'accepted once configured');
});

// ---- producers and provider profiles
test('producer kinds: built-ins and api:/voice:/parse: patterns; junk rejected', () => {
  for (const kind of ['manual', 'claude-session', 'rules', 'fake', 'api:translation-service', 'voice:shruto', 'parse:tesseract']) {
    const p = example('producer'); p.kind = kind; expectValid('producer', p);
  }
  for (const kind of ['', 'api:', 'api:Bad Name', 'magic', 'voice']) {
    const p = example('producer'); p.kind = kind; expectInvalid('producer', p, 'pattern', '/kind');
  }
});

test('producer: provenance is mandatory on output', () => {
  const p = example('producer'); delete p.output.provenance.person;
  expectInvalid('producer', p, 'required', 'person');
});

test('provider profile: Free validates; other tiers are valid placeholders', () => {
  expectValid('provider-profile', example('provider-profile'));
  for (const tier of ['Standard', 'Premium', 'Enterprise']) {
    expectValid('provider-profile', { tier, stages: {} });
  }
  expectInvalid('provider-profile', { tier: 'Gold', stages: {} }, 'enum', '/tier');
});

test("config-only: a 'fake' provider is a profile entry plus an adapter, no schema change", () => {
  const profile = example('provider-profile');
  profile.stages.generate = { producer: 'api:fake', settings: { latencyMs: 0 } };
  profile.stages.audio = { producer: 'voice:fake' };
  expectValid('provider-profile', profile);
  const bad = example('provider-profile'); bad.stages.dubbing = { producer: 'rules' };
  expectInvalid('provider-profile', bad, 'propertyNames', '');
});

// ---- templates
test('template: each kind validates with its required body part; versions are integers >= 1', () => {
  const bodies = { lesson: 'sections', 'narration-style': 'rules', slide: 'layouts', 'voice-emotion': 'emotions', 'picture-kit': 'kit' };
  for (const [kind, key] of Object.entries(bodies)) {
    expectValid('template', { id: `x-${kind}`, version: 1, kind, body: { [key]: [] } });
    expectInvalid('template', { id: `x-${kind}`, version: 1, kind, body: {} }, 'required', key);
  }
  const t = example('template'); t.version = 1.5;
  expectInvalid('template', t, 'type', '/version');
  t.version = 0; expectInvalid('template', t, 'minimum', '/version');
  const k = example('template'); k.kind = 'poem';
  expectInvalid('template', k, 'enum', '/kind');
});

test('templates folder (STUDIO_TEMPLATES_DIR): every file validates; id@version matches the name', () => {
  const dir = process.env.STUDIO_TEMPLATES_DIR;
  if (!dir) return;
  const files = [];
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
    const full = path.join(d, e.name);
    if (e.isDirectory()) walk(full); else if (e.name.endsWith('.json')) files.push(full);
  });
  walk(dir);
  assert.ok(files.length > 0, 'no template files found');
  for (const file of files) {
    const doc = readJson(file);
    expectValid('template', doc);
    assert.equal(path.basename(file, '.json'), `${doc.id}@${doc.version}`, file);
  }
});

// ---- media store and runner settings
test('media-store: local-disk needs a root; other kinds rejected', () => {
  expectValid('media-store', example('media-store'));
  expectInvalid('media-store', { kind: 'local-disk' }, 'required', 'root');
  expectInvalid('media-store', { kind: 's3', root: 'x' }, 'enum', '/kind');
});

test('runner-settings: validates; bad worker URL and parallelism rejected', () => {
  expectValid('runner-settings', example('runner-settings'));
  const url = example('runner-settings'); url.workerUrl = 'ftp://x';
  expectInvalid('runner-settings', url, 'pattern', '/workerUrl');
  const par = example('runner-settings'); par.maxParallelJobs = 0;
  expectInvalid('runner-settings', par, 'minimum', '/maxParallelJobs');
});

// ---- no OS or path assumptions
test('no schema or example assumes an OS, a drive letter, a backslash path or an absolute path', () => {
  const files = [
    ...schemaFiles.map((f) => path.join(SCHEMA_DIR, f)),
    ...fs.readdirSync(SCHEMA_DIR).filter((f) => f.endsWith('.json') && !f.endsWith('.schema.json')).map((f) => path.join(SCHEMA_DIR, f)),
    ...fs.readdirSync(EXAMPLE_DIR).map((f) => path.join(EXAMPLE_DIR, f)),
  ];
  const problems = [];
  const strings = [];
  const collect = (value, file, keyPath) => {
    if (typeof value === 'string') strings.push([file, keyPath, value]);
    else if (Array.isArray(value)) value.forEach((v, i) => collect(v, file, `${keyPath}[${i}]`));
    else if (value && typeof value === 'object') Object.entries(value).forEach(([k, v]) => collect(v, file, `${keyPath}.${k}`));
  };
  for (const file of files) collect(readJson(file), path.basename(file), '');
  for (const [file, keyPath, s] of strings) {
    if (keyPath.endsWith('.pattern')) continue; // regular expressions may contain a backslash
    if (/(^|[^A-Za-z0-9])[A-Za-z]:[\\/]/.test(s)) problems.push(`${file}${keyPath}: drive letter in "${s}"`);
    if (s.includes('\\')) problems.push(`${file}${keyPath}: backslash in "${s}"`);
    if (/^\/(Users|home|var|tmp|etc|Volumes)\b/.test(s) || /^~\//.test(s)) problems.push(`${file}${keyPath}: absolute path "${s}"`);
    if (/\b(win32|darwin|macos|windows)\b/i.test(s) && !keyPath.endsWith('description')) problems.push(`${file}${keyPath}: OS name in "${s}"`);
  }
  assert.deepEqual(problems, []);
});

console.log(`\nStudio contracts: ${passed} passed, ${failures} failed`);
if (failures > 0) process.exit(1);
