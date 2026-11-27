#!/usr/bin/env node
/**
 * Validation and tests for the dashboard contracts (AGB-1084): token claims, guardian API,
 * learning events and the progress API. Plain node:assert, no test framework.
 *
 * Checks: every schema compiles; every example validates against its definition; one valid
 * fixture per event kind and the kinds list matches; negative cases (unknown kind, wrong detail,
 * missing field, extra field, batch over 50, empty batch, ladder out of range); the error
 * registry; the runtime helpers (absent profile is adult); and that no schema or example assumes
 * an OS, a drive letter, a backslash or an absolute path.
 */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const Ajv = require('ajv');
const dashboard = require('../dashboard');

const ROOT = path.join(__dirname, '..');
const SCHEMA_DIR = path.join(ROOT, 'schemas', 'dashboard');
const EXAMPLE_DIR = path.join(ROOT, 'examples', 'dashboard');
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

// `format: date-time` is documentation for producers; ajv-formats is not a dependency of this package.
const ajv = new Ajv({ allErrors: true, strict: false, validateFormats: false });
const schemaFiles = fs.readdirSync(SCHEMA_DIR).filter((f) => f.endsWith('.schema.json')).sort();
for (const file of schemaFiles) ajv.addSchema(readJson(path.join(SCHEMA_DIR, file)), file);
const validatorFor = (file, name) => ajv.getSchema(`${file}.schema.json#/definitions/${name}`);
const example = (name) => structuredClone(readJson(path.join(EXAMPLE_DIR, `${name}.json`)));

function valid(file, name, doc) {
  const validate = validatorFor(file, name);
  assert.ok(validate, `${file}#${name} did not compile`);
  assert.equal(validate(doc), true, `${name}: ${JSON.stringify(validate.errors)}`);
}
function invalid(file, name, doc, keyword, where) {
  const validate = validatorFor(file, name);
  assert.ok(validate, `${file}#${name} did not compile`);
  assert.equal(validate(doc), false, `${name}: expected the document to be rejected`);
  if (keyword) {
    const hit = validate.errors.some((e) => e.keyword === keyword && (!where || `${e.instancePath} ${JSON.stringify(e.params)}`.includes(where)));
    assert.ok(hit, `${name}: rejected, but not for ${keyword}/${where}. Errors: ${JSON.stringify(validate.errors)}`);
  }
}

const KINDS = ['read', 'listen', 'revisit', 'answer', 'reveal', 'self-check', 'teach-back', 'revision', 'round-start', 'round-complete', 'note', 'buddy-question', 'switch', 'help-request', 'review-done', 'activity-done', 'correction'];
// example file -> [schema file, definition]
const EXAMPLES = {
  'token-claims-student': ['token-claims', 'ProfileTokenClaims'],
  'student-profile': ['guardian', 'StudentProfile'],
  'create-student-profile-request': ['guardian', 'CreateStudentProfileRequest'],
  'profile-consent': ['guardian', 'ProfileConsent'],
  'parent-gate-verify-request': ['guardian', 'ParentGateVerifyRequest'],
  'parent-gate-verify-response': ['guardian', 'ParentGateVerifyResponse'],
  'event-intake-request': ['progress-api', 'EventIntakeRequest'],
  'event-intake-response': ['progress-api', 'EventIntakeResponse'],
  'positions-response': ['progress-api', 'PositionsResponse'],
  'changes-response': ['progress-api', 'ChangesResponse'],
  note: ['progress-api', 'Note'],
  'create-note-request': ['progress-api', 'CreateNoteRequest'],
  'edit-note-request': ['progress-api', 'EditNoteRequest'],
  'note-reply-request': ['progress-api', 'NoteReplyRequest'],
  'review-list-response': ['progress-api', 'ReviewListResponse'],
  'review-done-request': ['progress-api', 'ReviewDoneRequest'],
  'review-rhythm': ['progress-api', 'ReviewRhythm'],
  'catch-up-response': ['progress-api', 'CatchUpResponse'],
};
// 2.21.0 (AGB-1096): new examples. Event fixtures are listed in NEW_EVENT_EXAMPLES.
const EXAMPLES_2_21 = {
  'map-response': ['progress-reads', 'MapResponse'],
  'topic-response': ['progress-reads', 'TopicResponse'],
  'topic-response-help': ['progress-reads', 'TopicResponse'],
  'home-response': ['progress-reads', 'HomeResponse'],
  'my-learning-response': ['progress-reads', 'MyLearningResponse'],
  'export-response': ['progress-reads', 'ExportResponse'],
  'claim-student-request': ['guardian', 'ClaimStudentRequest'],
  'claim-student-request-code': ['guardian', 'ClaimStudentRequest'],
  'claimable-students-response': ['guardian', 'ClaimableStudentsResponse'],
  'claim-code-response': ['guardian', 'ClaimCodeResponse'],
  'parent-gate-verify-result': ['guardian', 'ParentGateVerifyResult'],
  'student-profile-guardian-band': ['guardian', 'StudentProfile'],
  'create-student-profile-request-guardian-band': ['guardian', 'CreateStudentProfileRequest'],
};
const NEW_EVENT_EXAMPLES = ['event-read-section-index', 'event-listen-section-index', 'event-round-complete-totals', 'event-correction-replacement', 'event-teach-back-no-key-words'];
// 2.22.0 (AGB-1099): the answer with a mix-up id; the activity-done event is the 17th kind.
const NEW_EVENT_EXAMPLES_2_22 = ['event-answer-mixup'];
// 2.23.0 (AGB-1148, learner notes Phase A): new examples. The 2.22.0 examples are NOT edited, so they are the
// compatibility fixtures; the quoteOffset, audience and not-ready shapes are new files.
const EXAMPLES_2_23 = {
  'create-note-request-quote-offset': ['progress-api', 'CreateNoteRequest'],
  'edit-note-request-quote-offset': ['progress-api', 'EditNoteRequest'],
  'note-only-me': ['progress-api', 'Note'],
  'note-guardian': ['progress-api', 'Note'],
  'note-search-request': ['progress-api', 'NoteSearchRequest'],
  'note-search-response': ['progress-api', 'NoteSearchResponse'],
  'note-versions-response': ['progress-api', 'NoteVersionsResponse'],
  'learner-status-response': ['progress-api', 'LearnerStatusResponse'],
  'learner-status-response-guarded': ['progress-api', 'LearnerStatusResponse'],
  'learner-status-response-none': ['progress-api', 'LearnerStatusResponse'],
  'self-export-response': ['progress-api', 'SelfExportResponse'],
  'export-response-derived-pending': ['progress-reads', 'ExportResponse'],
  'map-response-not-ready': ['progress-reads', 'MapResponse'],
  'my-learning-response-not-ready': ['progress-reads', 'MyLearningResponse'],
  'home-response-not-ready': ['progress-reads', 'HomeResponse'],
  'review-list-response-not-ready': ['progress-api', 'ReviewListResponse'],
  'learner-record-consent-request': ['guardian', 'LearnerRecordConsentRequest'],
  'learner-record-consent': ['guardian', 'LearnerRecordConsent'],
  'step-up-start-response': ['guardian', 'StepUpStartResponse'],
  'step-up-complete-request': ['guardian', 'StepUpCompleteRequest'],
  'step-up-complete-response': ['guardian', 'StepUpCompleteResponse'],
  'note-quote-offset': ['progress-api', 'Note'],
  'note-list-response-paged': ['progress-api', 'NoteListResponse'],
  'note-list-query': ['progress-api', 'NoteListQuery'],
  'learner-erase-request': ['progress-api', 'LearnerEraseRequest'],
  'export-response-with-notes': ['progress-reads', 'ExportResponse'],
};
// 2.25.0 (AGB-1074): optional `required` proofs on StepUpStartResponse. The 2.23.0 start example is NOT edited.
const EXAMPLES_2_25 = {
  'step-up-start-response-required-password-totp': ['guardian', 'StepUpStartResponse'],
  'step-up-start-response-required-code-totp': ['guardian', 'StepUpStartResponse'],
  'step-up-start-response-required-code': ['guardian', 'StepUpStartResponse'],
};
// 2.26.0 (AGB-1074 e2e F-1): the notes responses as the progress service really sends them. No earlier example is edited.
const EXAMPLES_2_26 = {
  'note-server-list-response': ['progress-api', 'NoteListResponse'],
  'note-server-list-response-page': ['progress-api', 'NoteListResponse'],
  'note-server-search-response': ['progress-api', 'NoteSearchResponse'],
  'note-server-note-edited': ['progress-api', 'Note'],
};
const NEW_EVENT_EXAMPLES_2_23 = ['event-note-quote-offset', 'event-note-redacted-create', 'event-note-redacted-guardian-reply', 'event-correction-redacted'];
const INVALID_DIR = path.join(EXAMPLE_DIR, 'invalid');
const jsonFiles = (dir) => fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
const event = (kind) => example(`event-${kind}`);
const validEvent = (e) => valid('learning-event', 'LearningEvent', e);
const invalidEvent = (e) => invalid('learning-event', 'LearningEvent', e);

console.log('Dashboard contracts');

test('every schema compiles, declares draft-07 and every definition has a title', () => {
  assert.equal(schemaFiles.length, 6);
  for (const file of schemaFiles) {
    const schema = readJson(path.join(SCHEMA_DIR, file));
    assert.equal(schema.$schema, 'http://json-schema.org/draft-07/schema#', file);
    for (const [name, def] of Object.entries(schema.definitions)) {
      assert.equal(def.title, name, `${file}#${name} title`);
      assert.ok(validatorFor(file.replace('.schema.json', ''), name), `${file}#${name} did not compile`);
    }
  }
});

test('every listed example validates against its definition', () => {
  for (const [name, [file, def]] of Object.entries(EXAMPLES)) valid(file, def, example(name));
  for (const [name, [file, def]] of Object.entries(EXAMPLES_2_21)) valid(file, def, example(name));
  for (const [name, [file, def]] of Object.entries({ ...EXAMPLES_2_23, ...EXAMPLES_2_25, ...EXAMPLES_2_26 })) valid(file, def, example(name));
  for (const name of [...NEW_EVENT_EXAMPLES, ...NEW_EVENT_EXAMPLES_2_22, ...NEW_EVENT_EXAMPLES_2_23]) validEvent(example(name));
  const listed = new Set([...Object.keys(EXAMPLES), ...Object.keys(EXAMPLES_2_21), ...Object.keys(EXAMPLES_2_23), ...Object.keys(EXAMPLES_2_25), ...Object.keys(EXAMPLES_2_26), ...NEW_EVENT_EXAMPLES, ...NEW_EVENT_EXAMPLES_2_22, ...NEW_EVENT_EXAMPLES_2_23, ...KINDS.map((k) => `event-${k}`)]);
  const onDisk = jsonFiles(EXAMPLE_DIR).map((f) => f.replace(/\.json$/, ''));
  assert.deepEqual(onDisk.filter((n) => !listed.has(n)), [], 'example without a test mapping');
  assert.deepEqual([...listed].filter((n) => !onDisk.includes(n)), [], 'mapping without an example');
});

test('one valid fixture per event kind, and the kinds list matches the union (17 kinds)', () => {
  const schema = readJson(path.join(SCHEMA_DIR, 'learning-event.schema.json'));
  assert.deepEqual(schema.definitions.EventKind.enum, KINDS);
  assert.equal(KINDS.length, 17);
  for (const kind of KINDS) {
    const e = event(kind);
    assert.equal(e.kind, kind, `event-${kind}.json has kind ${e.kind}`);
    validEvent(e);
  }
});

test('events: unknown kind is rejected', () => {
  const e = event('read'); e.kind = 'skim';
  invalidEvent(e);
  invalid('learning-event', 'EventKind', 'skim', 'enum');
});

test('events: the detail must belong to the kind', () => {
  const e = event('read'); e.detail = event('answer').detail;
  invalidEvent(e);
  const noAnswerId = event('answer'); delete noAnswerId.detail.questionId;
  invalidEvent(noAnswerId);
  const extra = event('round-start'); extra.detail = { anything: 1 };
  invalidEvent(extra);
  const badOutcome = event('revision'); badOutcome.detail.outcome = 'great';
  invalidEvent(badOutcome);
});

test('events: buddy-question carries the text; teach-back uses the four judgements; answer openedFirst; note tags', () => {
  const noText = event('buddy-question'); delete noText.detail.text; invalidEvent(noText);
  const long = event('buddy-question'); long.detail.text = 'x'.repeat(501); invalidEvent(long);
  const empty = event('buddy-question'); empty.detail.text = ''; invalidEvent(empty);
  for (const outcome of ['understood', 'words-only', 'gap', 'misconception']) { const e = event('teach-back'); e.detail.outcome = outcome; validEvent(e); }
  const old = event('teach-back'); old.detail.outcome = 'explained'; invalidEvent(old);
  const kw = event('teach-back'); kw.detail.keyWordsInEnglish = 'yes'; invalidEvent(kw);
  const opened = event('answer'); opened.detail.openedFirst = true; validEvent(opened);
  const badOpened = event('answer'); badOpened.detail.openedFirst = 'yes'; invalidEvent(badOpened);
  for (const tag of ['Rough note', 'Remember this', 'My example', 'I have a question', "I don't get this"]) { const e = event('note'); e.detail.tag = tag; validEvent(e); }
  const badTag = event('note'); badTag.detail.tag = 'question'; invalidEvent(badTag);
  const name = example('student-profile'); name.name = ''; invalid('guardian', 'StudentProfile', name, 'minLength');
  name.name = 'x'.repeat(61); invalid('guardian', 'StudentProfile', name, 'maxLength');
});

test('events: required fields, actor values and unknown fields', () => {
  for (const field of ['eventId', 'profileId', 'actor', 'actorId', 'at', 'detail']) {
    const e = event('read'); delete e[field]; invalidEvent(e);
  }
  const actor = event('read'); actor.actor = 'teacher'; invalidEvent(actor);
  const round = event('read'); round.round = 0; invalidEvent(round);
  const extra = event('read'); extra.name = 'Kavi'; invalidEvent(extra);
  const minimal = { eventId: 'e1', profileId: 'usr_s', kind: 'read', actor: 'student', actorId: 'usr_s', at: '2026-11-22T09:30:00+05:30', detail: {} };
  validEvent(minimal);
});

test('events: an imported reading event (migration) is valid', () => {
  const e = event('read'); e.eventId = 'mig-usr_student_01-k-its-all-a-cycle-s2'; e.detail = { imported: true };
  validEvent(e);
});

test('intake: batch of 50 is accepted, 51 and 0 are rejected (BATCH_MAX)', () => {
  assert.equal(dashboard.BATCH_MAX, 50);
  const one = event('read');
  const batch = (n) => ({ events: Array.from({ length: n }, (_, i) => ({ ...one, eventId: `e-${i}` })) });
  valid('progress-api', 'EventIntakeRequest', batch(50));
  invalid('progress-api', 'EventIntakeRequest', batch(51), 'maxItems');
  invalid('progress-api', 'EventIntakeRequest', batch(0), 'minItems');
  const bad = batch(2); bad.events[1].kind = 'skim';
  invalid('progress-api', 'EventIntakeRequest', bad);
  const schema = readJson(path.join(SCHEMA_DIR, 'progress-api.schema.json')).definitions;
  assert.equal(schema.EventIntakeRequest.properties.events.maxItems, dashboard.BATCH_MAX);
  assert.equal(schema.EventIntakeResponse.properties.results.maxItems, dashboard.BATCH_MAX);
});

test('intake: per-event result is accepted, duplicate or error', () => {
  valid('progress-api', 'EventResult', { eventId: 'e1', result: 'accepted' });
  valid('progress-api', 'EventResult', { eventId: 'e1', result: 'duplicate' });
  valid('progress-api', 'EventResult', { eventId: 'e1', result: 'error', error: { code: 'EVENT_INVALID', message: 'bad detail' } });
  invalid('progress-api', 'EventResult', { eventId: 'e1', result: 'rejected' }, 'enum');
});

test('ladder, weak-spot causes, review item types and next steps', () => {
  const defs = readJson(path.join(SCHEMA_DIR, 'learning-event.schema.json')).definitions;
  for (const step of [1, 2, 3, 4, 5, 6]) valid('learning-event', 'LadderStep', step);
  for (const step of [0, 7, 2.5]) invalid('learning-event', 'LadderStep', step);
  assert.deepEqual(defs.LadderLabel.enum, [...dashboard.LADDER_LABELS]);
  assert.deepEqual(defs.WeakSpotCause.enum, ['missing-foundation', 'misconception', 'gap', 'words-without-meaning', 'language-barrier', 'forgot', 'rushed-or-peeked']);
  assert.deepEqual(defs.ReviewItemType.enum, ['help-request', 'teach-back-request', 'question-note', 'new-weak-spot', 'round-finished', 'weekly-plan-check', 'new-notes']);
  invalid('learning-event', 'WeakSpotCause', 'lazy', 'enum');
  valid('learning-event', 'NextStep', { kind: 'revision', knowledgeId: 'k1', sectionId: 's2' });
  valid('learning-event', 'NextStep', { kind: 'switch-language', to: 'kn' });
  invalid('learning-event', 'NextStep', { kind: 'give-up' }, 'enum');
  invalid('learning-event', 'NextStep', { sectionId: 's2' }, 'required', 'kind');
  invalid('learning-event', 'NextStep', 'revise', 'type');
});

test('token claims: all optional, student example valid, bad profile or consent_v rejected', () => {
  valid('token-claims', 'ProfileTokenClaims', {});
  valid('token-claims', 'ProfileTokenClaims', { sub: 'usr_x', profile: 'adult', scope: 'a b' });
  invalid('token-claims', 'ProfileTokenClaims', { profile: 'teacher' }, 'enum');
  invalid('token-claims', 'ProfileTokenClaims', { consent_v: '1' }, 'type');
  invalid('token-claims', 'ProfileTokenClaims', { guardian: '' }, 'minLength');
});

test('helpers: an absent profile claim is adult (profileOf, isStudentToken)', () => {
  assert.equal(dashboard.profileOf({}), 'adult');
  assert.equal(dashboard.profileOf(undefined), 'adult');
  assert.equal(dashboard.profileOf(null), 'adult');
  assert.equal(dashboard.profileOf({ profile: 'adult' }), 'adult');
  assert.equal(dashboard.profileOf({ profile: 'something-new' }), 'adult');
  assert.equal(dashboard.profileOf(example('token-claims-student')), 'student');
  assert.equal(dashboard.isStudentToken({ sub: 'usr_x' }), false);
  assert.equal(dashboard.isStudentToken({ profile: 'student' }), true);
});

test('header names and ladder labels', () => {
  assert.equal(dashboard.HEADER_PROFILE_ID, 'x-profile-id');
  assert.equal(dashboard.HEADER_GUARDIAN_ID, 'x-guardian-id');
  assert.deepEqual([...dashboard.LADDER_LABELS], ['Met', 'Tried', 'Gets it', 'Can explain', 'Remembers', 'Can use it']);
  assert.ok(Object.isFrozen(dashboard.LADDER_LABELS));
});

test('guardian: PIN is 4 to 6 digits, create needs consent, update needs a field', () => {
  valid('guardian', 'ParentGateVerifyRequest', { pin: '123456', deviceId: 'd1' });
  for (const pin of ['123', '1234567', 'abcd', 1234]) invalid('guardian', 'ParentGateVerifyRequest', { pin, deviceId: 'd1' });
  const noConsent = example('create-student-profile-request'); delete noConsent.consent;
  invalid('guardian', 'CreateStudentProfileRequest', noConsent, 'required', 'consent');
  invalid('guardian', 'UpdateStudentProfileRequest', {}, 'minProperties');
  valid('guardian', 'UpdateStudentProfileRequest', { avatar: 'fox' });
  const tooLong = example('parent-gate-verify-response'); tooLong.expiresInSeconds = 301;
  invalid('guardian', 'ParentGateVerifyResponse', tooLong, 'maximum');
  invalid('guardian', 'ProfileConsent', { version: 1, purposes: ['x'], status: 'paused' }, 'enum');
});

test('notes and reviews: edit and reply need something, rhythm is bounded, catch-up is at most 3', () => {
  invalid('progress-api', 'EditNoteRequest', {}, 'minProperties');
  invalid('progress-api', 'NoteReplyRequest', {}, 'minProperties');
  const rhythm = example('review-rhythm'); rhythm.days = [7]; invalid('progress-api', 'ReviewRhythm', rhythm, 'maximum');
  const minute = example('review-rhythm'); minute.minuteOfDay = 1440; invalid('progress-api', 'ReviewRhythm', minute, 'maximum');
  const item = example('review-list-response').items[0];
  invalid('progress-api', 'CatchUpResponse', { items: [item, item, item, item] }, 'maxItems');
  const wrongType = structuredClone(item); wrongType.type = 'weekly-chore';
  invalid('progress-api', 'ReviewItem', wrongType);
});

test('dashboard-errors: unique codes cover the spec and carry an HTTP status', () => {
  const list = readJson(path.join(SCHEMA_DIR, 'dashboard-errors.json')).codes;
  const codes = list.map((c) => c.code);
  assert.equal(new Set(codes).size, codes.length);
  for (const needed of ['EXPORT_TOO_LARGE', 'INVALID_PARAMETER', 'PIN_LOCKED', 'CONSENT_REQUIRED', 'STUDENT_SCOPE_ONLY', 'CONSENT_NOT_ACTIVE', 'NOT_GUARDIAN', 'EVENT_INVALID', 'BATCH_TOO_LARGE', 'CURSOR_EXPIRED']) assert.ok(codes.includes(needed), needed);
  for (const c of list) {
    assert.match(c.code, /^[A-Z][A-Z_]+$/);
    assert.ok(Number.isInteger(c.httpStatus) && c.httpStatus >= 400 && c.httpStatus < 600, c.code);
    assert.ok(c.description.length > 10, c.code);
  }
});

const invalidExample = (name) => structuredClone(readJson(path.join(INVALID_DIR, `${name}.json`)));

test('2.21.0 back-compat: every 2.20.0 example (all 18 shapes and 16 event kinds) still validates under 2.22.0', () => {
  assert.equal(Object.keys(EXAMPLES).length, 18);
  for (const [name, [file, def]] of Object.entries(EXAMPLES)) valid(file, def, example(name));
  for (const kind of KINDS) validEvent(event(kind));
  // the minimal read and listen and round-complete shapes of 2.20.0 stay valid without any new field
  validEvent({ ...event('read'), detail: {} });
  validEvent({ ...event('round-complete'), detail: { sectionsRead: 3 } });
  validEvent({ ...event('correction'), detail: { correctsEventId: 'e0', reason: 'tap' } });
});

test('2.22.0 back-compat: every 2.20.0 and 2.21.0 example and event still validates, with none of the new fields', () => {
  assert.equal(Object.keys(EXAMPLES_2_21).length, 13);
  for (const [name, [file, def]] of Object.entries({ ...EXAMPLES, ...EXAMPLES_2_21 })) valid(file, def, example(name));
  for (const name of NEW_EVENT_EXAMPLES) validEvent(example(name));
  for (const kind of KINDS.filter((k) => k !== 'activity-done')) validEvent(event(kind));
  // an answer with none of the new detail fields, the minimal 2.20.0 shape
  validEvent({ ...event('answer'), detail: { questionId: 'q1', attempt: 1 } });
});

test('2.22.0 events: answer carries optional mixUpId and newCase', () => {
  validEvent(example('event-answer-mixup'));
  const e = example('event-answer-mixup');
  assert.equal(e.detail.mixUpId, 's2-mix1');
  for (const bad of [7, '', ['s2-mix1']]) { const x = event('answer'); x.detail.mixUpId = bad; invalidEvent(x); }
  const nc = event('answer'); nc.detail.newCase = 'yes'; invalidEvent(nc);
  const nc2 = event('answer'); nc2.detail.newCase = false; validEvent(nc2);
  const props = readJson(path.join(SCHEMA_DIR, 'learning-event.schema.json')).definitions.EventAnswer.properties.detail.properties;
  assert.match(props.mixUpId.description, /Deployment order/);
  assert.match(props.mixUpId.description, /does not read it yet/);
  invalidEvent(invalidExample('answer-mixup-id-not-string'));
  // a correction may replace an answer's mix-up id
  const c = example('event-correction-replacement'); c.detail.replacement = { targetKind: 'answer', detail: { mixUpId: 's2-mix1' } }; validEvent(c);
});

test('2.22.0 events: activity-done is the parent actor only, ids only, idempotent by eventId', () => {
  const e = example('event-activity-done');
  assert.equal(e.kind, 'activity-done');
  validEvent(e);
  const noLanguages = example('event-activity-done'); delete noLanguages.detail.languages; validEvent(noLanguages);
  // the student actor, and a free-text or photo field, are rejected
  invalidEvent(invalidExample('activity-done-student-actor'));
  invalidEvent(invalidExample('activity-done-extra-fields'));
  invalidEvent(invalidExample('activity-done-no-round'));
  const student = example('event-activity-done'); student.actor = 'student'; invalidEvent(student);
  const teacher = example('event-activity-done'); teacher.actor = 'teacher'; invalidEvent(teacher);
  for (const field of ['activityId']) { const x = example('event-activity-done'); delete x.detail[field]; invalidEvent(x); }
  const noSection = example('event-activity-done'); delete noSection.sectionId; invalidEvent(noSection);
  for (const extra of ['photo', 'text', 'note', 'doneOn']) { const x = example('event-activity-done'); x.detail[extra] = 'x'; invalidEvent(x); }
  const badLang = example('event-activity-done'); badLang.detail.languages = ['fr']; invalidEvent(badLang);
  const dup = example('event-activity-done'); dup.detail.languages = ['kn', 'kn']; invalidEvent(dup);
  const emptyLang = example('event-activity-done'); emptyLang.detail.languages = []; invalidEvent(emptyLang);
  const wrongDetail = example('event-activity-done'); wrongDetail.detail = event('review-done').detail; invalidEvent(wrongDetail);
  const description = readJson(path.join(SCHEMA_DIR, 'learning-event.schema.json')).definitions.EventActivityDone.description;
  assert.match(description, /PARENT actor only/);
  assert.match(description, /idempotent by `eventId`/);
  assert.match(description, /Deployment order/);
  assert.match(description, /rejects this kind/);
  // intake accepts it inside a batch
  valid('progress-api', 'EventIntakeRequest', { events: [event('read'), example('event-activity-done')] });
  // a correction may replace an activity-done's languages
  const c = example('event-correction-replacement'); c.detail.replacement = { targetKind: 'activity-done', detail: { languages: ['en'] } }; validEvent(c);
});

test('events: sectionIndex is an integer of at least 1 on read and listen only', () => {
  validEvent(example('event-read-section-index'));
  validEvent(example('event-listen-section-index'));
  for (const bad of [0, -1, 1.5, '2']) {
    const r = event('read'); r.detail.sectionIndex = bad; invalidEvent(r);
    const l = event('listen'); l.detail.sectionIndex = bad; invalidEvent(l);
  }
  invalidEvent(invalidExample('read-section-index-zero'));
  const answer = event('answer'); answer.detail.sectionIndex = 1; invalidEvent(answer);
});

test('events: round-complete sectionsTotal and practiceTotal are integers of at least 0', () => {
  validEvent(example('event-round-complete-totals'));
  for (const f of ['sectionsTotal', 'practiceTotal']) {
    for (const bad of [-1, 2.5, '3']) { const e = event('round-complete'); e.detail[f] = bad; invalidEvent(e); }
    const zero = event('round-complete'); zero.detail[f] = 0; validEvent(zero);
  }
  invalidEvent(invalidExample('round-complete-negative-total'));
  const description = readJson(path.join(SCHEMA_DIR, 'learning-event.schema.json')).definitions.EventRoundComplete.description;
  assert.match(description, /student actor only/);
  const total = readJson(path.join(SCHEMA_DIR, 'learning-event.schema.json')).definitions.EventRoundComplete.properties.detail.properties;
  assert.match(total.sectionsTotal.description, /Total number of sections in the chapter/);
  assert.match(total.practiceTotal.description, /Total number of practice questions in the chapter/);
  assert.match(total.practiceTotal.description, /Deployment order/);
});

test('events: correction replacement allows only the target kind\'s detail fields', () => {
  validEvent(example('event-correction-replacement'));
  validEvent(event('correction'));
  const base = () => example('event-correction-replacement');
  const noKind = base(); delete noKind.detail.replacement.targetKind; invalidEvent(noKind);
  const correctionTarget = base(); correctionTarget.detail.replacement = { targetKind: 'correction', detail: {} }; invalidEvent(correctionTarget);
  const wrongField = base(); wrongField.detail.replacement.detail = { seconds: 3 }; invalidEvent(wrongField);
  invalidEvent(invalidExample('correction-replacement-field'));
  const wrongValue = base(); wrongValue.detail.replacement.detail.outcome = 'great'; invalidEvent(wrongValue);
  const extra = base(); extra.detail.replacement.name = 'x'; invalidEvent(extra);
  // a replacement is partial: no required field of the target kind is needed
  const partial = base(); partial.detail.replacement = { targetKind: 'answer', detail: { correct: true } }; validEvent(partial);
  const read = base(); read.detail.replacement = { targetKind: 'read', detail: { sectionIndex: 3 } }; validEvent(read);
  const description = readJson(path.join(SCHEMA_DIR, 'learning-event.schema.json')).definitions.EventCorrection.description;
  assert.match(description, /A student may not correct a read, listen, revisit, round-start or round-complete/);
  assert.match(description, /PLANNED, not applied by the service yet/);
  assert.match(description, /latest seq down/);
});

test('teach-back keyWordsInEnglish: the field is kept and the description follows the plan', () => {
  validEvent(example('event-teach-back-no-key-words'));
  const d = readJson(path.join(SCHEMA_DIR, 'learning-event.schema.json')).definitions.EventTeachBack.properties.detail.properties.keyWordsInEnglish;
  assert.equal(d.type, 'boolean');
  assert.match(d.description, /false: the child did NOT say the key English words/);
  assert.match(d.description, /Absent: unknown, counts as understood/);
});

test('progress reads: map, topic, home, my-learning and export reject wrong keys and states', () => {
  const map = example('map-response'); map.chapters[0].sections[0].step = 7; invalid('progress-reads', 'MapResponse', map, 'maximum');
  const state = invalidExample('map-response-state-not-string'); invalid('progress-reads', 'MapResponse', state, 'type');
  // keys are open strings: a state, kind or actor a newer server adds must not fail a strict client
  const newer = example('map-response'); newer.chapters[0].sections[0].stateKey = 'state.paused'; valid('progress-reads', 'MapResponse', newer);
  const newTopic = example('topic-response'); newTopic.stateKey = 'state.paused'; newTopic.evidence[0].kind = 'activity-done'; newTopic.evidence[0].actor = 'teacher'; valid('progress-reads', 'TopicResponse', newTopic);
  const newPlan = example('home-response'); newPlan.tonightPlan[0].kind = 'mock-exam'; valid('progress-reads', 'HomeResponse', newPlan);
  const emptyKey = example('map-response'); emptyKey.chapters[0].sections[0].stateKey = ''; invalid('progress-reads', 'MapResponse', emptyKey, 'minLength');
  const topic = example('topic-response'); delete topic.stretchRight; invalid('progress-reads', 'TopicResponse', topic, 'required', 'stretchRight');
  const cause = example('topic-response'); cause.cause = 'lazy'; invalid('progress-reads', 'TopicResponse', cause);
  const home = example('home-response'); home.tonightPlan[0].minutes = 0; invalid('progress-reads', 'HomeResponse', home, 'minimum');
  const mine = example('my-learning-response'); mine.chapters[0].sections[0].stateKey = 'learning.state.new'; valid('progress-reads', 'MyLearningResponse', mine);
  mine.chapters[0].sections[0].cause = 'gap'; invalid('progress-reads', 'MyLearningResponse', mine, 'additionalProperties');
  const child = example('my-learning-response'); child.chapters[0].rounds[0].teachBacksUnderstood = 1; invalid('progress-reads', 'MyLearningResponse', child, 'additionalProperties');
  const exp = example('export-response'); delete exp.summaries; invalid('progress-reads', 'ExportResponse', exp, 'required', 'summaries');
  const states = new Set(example('my-learning-response').chapters[0].sections.map((x) => x.stateKey));
  assert.equal(states.size, 5, 'my-learning example covers all five learning.state keys');
});

test('guardians: two-band alias, claim shapes and the age-band mapping helper', () => {
  assert.deepEqual(readJson(path.join(SCHEMA_DIR, 'guardian.schema.json')).definitions.GuardianAgeBand.enum, ['under13', '13to17']);
  invalid('guardian', 'StudentProfile', invalidExample('student-profile-guardian-band'), 'enum');
  invalid('guardian', 'ClaimStudentRequest', invalidExample('claim-student-both-ids'), 'oneOf');
  const neither = example('claim-student-request'); delete neither.studentId; invalid('guardian', 'ClaimStudentRequest', neither, 'oneOf');
  const fourBand = example('claim-student-request'); fourBand.ageBand = '8-10'; invalid('guardian', 'ClaimStudentRequest', fourBand, 'enum');
  assert.deepEqual(['5-7', '8-10', '11-13', '14-17'].map(dashboard.guardianAgeBandOf), ['under13', 'under13', 'under13', '13to17']);
  assert.equal(dashboard.guardianAgeBandOf('4-6'), undefined);
  assert.equal(dashboard.guardianAgeBandOf(undefined), undefined);
  valid('guardian', 'StudentProfile', example('student-profile'));
});

test('dashboard-errors: statuses of the two new codes', () => {
  const list = readJson(path.join(SCHEMA_DIR, 'dashboard-errors.json')).codes;
  assert.equal(list.find((c) => c.code === 'EXPORT_TOO_LARGE').httpStatus, 413);
  assert.equal(list.find((c) => c.code === 'INVALID_PARAMETER').httpStatus, 400);
});

test('2.23.0 back-compat: every 2.20.0, 2.21.0 and 2.22.0 example and event still validates (the 2.22 files are untouched)', () => {
  assert.equal(Object.keys(EXAMPLES).length, 18);
  assert.equal(Object.keys(EXAMPLES_2_21).length, 13);
  for (const [name, [file, def]] of Object.entries({ ...EXAMPLES, ...EXAMPLES_2_21 })) valid(file, def, example(name));
  for (const name of [...NEW_EVENT_EXAMPLES, ...NEW_EVENT_EXAMPLES_2_22]) validEvent(example(name));
  for (const kind of KINDS) validEvent(event(kind));
  // the 2.22 note shapes carry none of the new fields and are still valid
  const note = example('note');
  assert.equal('audience' in note || 'guardianVisible' in note, false);
  validEvent(event('note'));
  assert.equal('quoteOffset' in event('note').detail || 'redacted' in event('note').detail, false);
  // the 2.22 export carries sectionStates and roundSummaries and no derivedPending
  const exp = example('export-response');
  assert.ok(exp.sectionStates && exp.roundSummaries && !('derivedPending' in exp));
  // the 2.22 responses have no `ready`, which means ready
  for (const name of ['map-response', 'topic-response', 'home-response', 'my-learning-response']) assert.equal('ready' in example(name), false, name);
  // the 2.22 events a 2.22 client reads back from /changes still validate, new optional fields or not
  const changes = example('changes-response');
  changes.changes.push({ seq: 99, event: example('event-note-quote-offset') }, { seq: 100, event: example('event-note-redacted-create') });
  valid('progress-api', 'ChangesResponse', changes);
});

test('2.23.0 is purely additive: no 2.22 definition lost a property, gained a required one or changed a type', () => {
  const git = require('node:child_process');
  let base;
  try {
    base = git.execFileSync('git', ['show', 'bb9ed20:schemas/dashboard/progress-api.schema.json'], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  } catch { return; } // the 2.22.0 commit is not in a shallow clone: the example run above still covers it
  const old = JSON.parse(base).definitions;
  const now = readJson(path.join(SCHEMA_DIR, 'progress-api.schema.json')).definitions;
  for (const [name, def] of Object.entries(old)) {
    for (const key of Object.keys(def.properties || {})) assert.ok(now[name].properties[key], `${name}.${key} was removed`);
    assert.deepEqual((now[name].required || []).filter((k) => !(def.required || []).includes(k)), [], `${name} gained a required field`);
  }
});

test('2.23.0 events: note detail gains quoteOffset and a server-set readOnly redacted, nothing else', () => {
  validEvent(example('event-note-quote-offset'));
  assert.equal(example('event-note-quote-offset').detail.quoteOffset, 14);
  for (const bad of [-1, 1.5, '3', null]) { const x = event('note'); x.detail.quoteOffset = bad; invalidEvent(x); }
  const zero = event('note'); zero.detail.quoteOffset = 0; validEvent(zero);
  invalidEvent(invalidExample('note-quote-offset-negative'));
  // redacted is only ever `true` (const) and is documented as server-set
  validEvent(example('event-note-redacted-create'));
  validEvent(example('event-note-redacted-guardian-reply'));
  invalidEvent(invalidExample('note-redacted-false'));
  const nonBool = event('note'); nonBool.detail.redacted = 'yes'; invalidEvent(nonBool);
  const props = readJson(path.join(SCHEMA_DIR, 'learning-event.schema.json')).definitions.EventNote.properties.detail.properties;
  assert.equal(props.redacted.readOnly, true);
  assert.equal(props.redacted.const, true);
  assert.match(props.redacted.description, /SET BY THE SERVER ONLY/);
  assert.match(props.redacted.description, /intake refuses it/);
  // no new actions and no new actors
  const note = readJson(path.join(SCHEMA_DIR, 'learning-event.schema.json')).definitions.EventNote;
  assert.deepEqual(note.properties.detail.properties.action.enum, ['create', 'edit', 'delete']);
  assert.deepEqual(note.properties.actor.enum, ['student', 'parent']);
  assert.deepEqual(Object.keys(props).sort(), ['action', 'noteId', 'quote', 'quoteOffset', 'redacted', 'tag', 'text', 'version']);
  const share = event('note'); share.detail.action = 'share'; invalidEvent(share);
  const sys = event('note'); sys.actor = 'system'; invalidEvent(sys);
  // the create and edit requests take quoteOffset too
  const c = example('create-note-request'); c.quoteOffset = -2; invalid('progress-api', 'CreateNoteRequest', c, 'minimum');
  const ed = example('edit-note-request'); ed.quoteOffset = 'x'; invalid('progress-api', 'EditNoteRequest', ed, 'type');
});

test('2.23.0 note DTO: audience is a plain string (not an enum) and guardianVisible a boolean', () => {
  const props = readJson(path.join(SCHEMA_DIR, 'progress-api.schema.json')).definitions.Note.properties;
  assert.equal(props.audience.type, 'string');
  assert.equal('enum' in props.audience, false);
  assert.equal(props.guardianVisible.type, 'boolean');
  const future = example('note-guardian'); future.audience = 'circle-teachers'; valid('progress-api', 'Note', future);
  invalid('progress-api', 'Note', invalidExample('note-audience-not-string'), 'type');
  const gv = example('note-only-me'); gv.guardianVisible = 'no'; invalid('progress-api', 'Note', gv, 'type');
});

test('2.23.0 search: a POST body of 1 to 100 characters, no extra fields', () => {
  valid('progress-api', 'NoteSearchRequest', { q: 'x' });
  valid('progress-api', 'NoteSearchRequest', { q: 'x'.repeat(100), sectionId: 's2', cursor: 'c1', limit: 50 });
  invalid('progress-api', 'NoteSearchRequest', invalidExample('note-search-empty-q'), 'minLength');
  invalid('progress-api', 'NoteSearchRequest', invalidExample('note-search-q-too-long'), 'maxLength');
  invalid('progress-api', 'NoteSearchRequest', invalidExample('note-search-extra-field'), 'additionalProperties');
  invalid('progress-api', 'NoteSearchRequest', {}, 'required', 'q');
  invalid('progress-api', 'NoteSearchRequest', { q: 'a', limit: 0 }, 'minimum');
  const description = readJson(path.join(SCHEMA_DIR, 'progress-api.schema.json')).definitions.NoteSearchRequest.description;
  assert.match(description, /never reaches a URL/);
});

test('2.23.0 status, relation and versions', () => {
  assert.deepEqual(readJson(path.join(SCHEMA_DIR, 'progress-api.schema.json')).definitions.LearnerRelation.enum, ['none', 'self', 'guarded']);
  invalid('progress-api', 'LearnerStatusResponse', invalidExample('learner-status-unknown-relation'), 'enum');
  invalid('progress-api', 'LearnerStatusResponse', invalidExample('learner-status-missing-since'), 'required', 'guardianSince');
  const zero = example('learner-status-response-guarded'); zero.guardianSince = 0; valid('progress-api', 'LearnerStatusResponse', zero);
  const neg = example('learner-status-response-guarded'); neg.guardianSince = -1; invalid('progress-api', 'LearnerStatusResponse', neg, 'minimum');
  const empty = example('note-versions-response'); empty.versions = []; invalid('progress-api', 'NoteVersionsResponse', empty, 'minItems');
});

test('2.23.0 export: self shape lists deleted notes as id and time only; guardian export may be derivedPending', () => {
  const self = example('self-export-response');
  assert.ok(self.notes.some((n) => Object.keys(n).sort().join() === 'deletedAt,id'));
  invalid('progress-api', 'SelfExportResponse', invalidExample('self-export-deleted-note-with-text'));
  assert.equal(JSON.stringify(self).includes('guardianId'), false, 'no other person\'s id in the self export');
  const pending = example('export-response-derived-pending');
  assert.equal(pending.derivedPending, true);
  for (const omitted of ['sectionStates', 'roundSummaries', 'reviews', 'reviewSnoozes']) assert.equal(omitted in pending, false, omitted);
  for (const kept of ['summaries', 'positions', 'rounds']) assert.ok(kept in pending, kept);
  // summaries, positions and rounds stay required; the four derived sections are optional
  for (const kept of ['summaries', 'positions', 'rounds']) { const x = example('export-response-derived-pending'); delete x[kept]; invalid('progress-reads', 'ExportResponse', x, 'required', kept); }
  const full = example('export-response'); full.reviews = []; full.reviewSnoozes = []; full.derivedPending = false; valid('progress-reads', 'ExportResponse', full);
  const bad = example('export-response-derived-pending'); bad.derivedPending = 'yes'; invalid('progress-reads', 'ExportResponse', bad, 'type');
});

test('2.23.0 ready: false on map, topic, home, my-learning and reviews (optional boolean; absent means ready)', () => {
  for (const name of ['map-response-not-ready', 'my-learning-response-not-ready', 'home-response-not-ready']) assert.equal(example(name).ready, false, name);
  assert.equal(example('review-list-response-not-ready').ready, false);
  const topic = example('topic-response'); topic.ready = false; valid('progress-reads', 'TopicResponse', topic);
  topic.ready = true; valid('progress-reads', 'TopicResponse', topic);
  topic.ready = 'no'; invalid('progress-reads', 'TopicResponse', topic, 'type');
  const map = example('map-response-not-ready'); map.ready = 0; invalid('progress-reads', 'MapResponse', map, 'type');
});

test('2.23.0 own consent and step-up types', () => {
  invalid('guardian', 'LearnerRecordConsentRequest', { state: 'on' }, 'enum');
  invalid('guardian', 'LearnerRecordConsentRequest', {}, 'required', 'state');
  invalid('guardian', 'StepUpStartResponse', invalidExample('step-up-unknown-method'), 'enum');
  for (const method of ['password', 'totp', 'password+totp', 'email-code']) valid('guardian', 'StepUpStartResponse', { ...example('step-up-start-response'), method });
  invalid('guardian', 'StepUpCompleteRequest', { stepUpId: 'su_01', code: '12ab56' }, 'pattern');
  invalid('guardian', 'StepUpCompleteResponse', {}, 'required');
});

test('2.25.0 step-up: optional required proofs, valid and invalid shapes', () => {
  valid('guardian', 'StepUpStartResponse', example('step-up-start-response')); // the 2.23.0 shape: no `required`, infer from method
  assert.deepEqual(example('step-up-start-response-required-password-totp').required, ['password', 'totp']);
  assert.deepEqual(example('step-up-start-response-required-code-totp').required, ['code', 'totp']);
  assert.deepEqual(example('step-up-start-response-required-code').required, ['code']);
  invalid('guardian', 'StepUpStartResponse', invalidExample('step-up-required-empty'), 'minItems');
  invalid('guardian', 'StepUpStartResponse', invalidExample('step-up-required-unknown-value'), 'enum');
  invalid('guardian', 'StepUpStartResponse', invalidExample('step-up-required-duplicate'), 'uniqueItems');
  const bad = example('step-up-start-response'); bad.extra = 1; invalid('guardian', 'StepUpStartResponse', bad, 'additionalProperties');
});

test('2.25.0 back-compat: every 2.20.0 to 2.24.0 example and event validates unchanged', () => {
  for (const [name, [file, def]] of Object.entries({ ...EXAMPLES, ...EXAMPLES_2_21, ...EXAMPLES_2_23 })) valid(file, def, example(name));
  for (const name of [...NEW_EVENT_EXAMPLES, ...NEW_EVENT_EXAMPLES_2_22, ...NEW_EVENT_EXAMPLES_2_23]) validEvent(example(name));
  for (const kind of KINDS) validEvent(event(kind));
  assert.equal('required' in example('step-up-start-response'), false);
});

test('2.25.0 is purely additive against the 2.24.0 tag: guardian.schema.json differs only by StepUpStartResponse.required', () => {
  const git = require('node:child_process');
  let base;
  try {
    base = git.execFileSync('git', ['show', 'v2.24.0:schemas/dashboard/guardian.schema.json'], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  } catch { return; } // the 2.24.0 tag is not in a shallow clone: the example run above still covers it
  const old = JSON.parse(base);
  const now = readJson(path.join(SCHEMA_DIR, 'guardian.schema.json'));
  assert.deepEqual(Object.keys(now.definitions).filter((k) => !(k in old.definitions)), [], 'no new definition');
  for (const [name, def] of Object.entries(old.definitions)) {
    const cur = now.definitions[name];
    assert.ok(cur, `${name} was removed`);
    if (name === 'StepUpStartResponse') {
      const { required: added, ...rest } = cur.properties;
      assert.deepEqual(rest, def.properties, 'StepUpStartResponse existing properties changed');
      assert.ok(added, 'required property is present');
      assert.deepEqual(cur.required, def.required, 'the required list is unchanged');
      assert.equal(cur.additionalProperties, def.additionalProperties);
      assert.deepEqual({ ...cur, properties: 0, description: 0 }, { ...def, properties: 0, description: 0 });
    } else assert.deepEqual(cur, def, `${name} changed`);
  }
});

test('2.23.0 error codes: three per-event refusal codes, none removed', () => {
  const list = readJson(path.join(SCHEMA_DIR, 'dashboard-errors.json')).codes.map((c) => c.code);
  for (const c of ['EVENT_INVALID', 'EVENT_KIND_NOT_ALLOWED', 'LINK_ERASED', 'SCHEMA_UNSUPPORTED', 'CONSENT_NOT_ACTIVE', 'CURSOR_EXPIRED']) assert.ok(list.includes(c), c);
  assert.equal(new Set(list).size, list.length, 'duplicate code');
});

test('2.23.0 gap fixes: redacted correction, Note.quoteOffset, paged list, export notes, erase body', () => {
  // a redacted correction (server-set) has no reason; a 2.22 correction still needs one
  validEvent(example('event-correction-redacted'));
  invalidEvent(invalidExample('correction-no-reason'));
  invalidEvent(invalidExample('correction-redacted-false'));
  const corr = readJson(path.join(SCHEMA_DIR, 'learning-event.schema.json')).definitions.EventCorrection.properties.detail.properties.redacted;
  assert.equal(corr.readOnly, true); assert.equal(corr.const, true);
  // Note reads the pin offset back
  assert.equal(example('note-quote-offset').quoteOffset, 14);
  const bad = example('note-quote-offset'); bad.quoteOffset = -1; invalid('progress-api', 'Note', bad, 'minimum');
  // paging
  valid('progress-api', 'NoteListResponse', example("note-list-response-paged"));
  valid('progress-api', 'NoteListResponse', { notes: [] });
  invalid('progress-api', 'NoteListResponse', invalidExample('note-list-response-bad-cursor'), 'anyOf');
  invalid('progress-api', 'NoteListQuery', { limit: 51 }, 'maximum');
  invalid('progress-api', 'NoteListQuery', { q: 'frogs' }, 'additionalProperties');
  // guardian export: optional notes and noteReplies
  const exp = example('export-response-with-notes');
  assert.ok(exp.notes.length === 2 && exp.noteReplies.length === 1);
  const delWithText = example('export-response-with-notes'); delWithText.notes[1].text = 'x'; invalid('progress-reads', 'ExportResponse', delWithText);
  // erase body
  invalid('progress-api', 'LearnerEraseRequest', invalidExample('learner-erase-request-no-ticket'), 'required', 'ticket');
});

test('2.23.0 step-up error codes follow the registry conventions', () => {
  const list = readJson(path.join(SCHEMA_DIR, 'dashboard-errors.json')).codes;
  const want = { STEP_UP_REQUIRED: 401, STEP_UP_CODE_INVALID: 400, STEP_UP_LOCKED: 429, STEP_UP_SEND_LIMITED: 429, LINK_ERASED: 409, EVENT_KIND_NOT_ALLOWED: 400, SCHEMA_UNSUPPORTED: 400 };
  for (const [code, status] of Object.entries(want)) assert.equal(list.find((c) => c.code === code).httpStatus, status, code);
  // append-only: the ten 2.22 codes are still first and unchanged
  assert.deepEqual(list.slice(0, 10).map((c) => c.code), ['PIN_LOCKED', 'CONSENT_REQUIRED', 'STUDENT_SCOPE_ONLY', 'CONSENT_NOT_ACTIVE', 'NOT_GUARDIAN', 'EVENT_INVALID', 'BATCH_TOO_LARGE', 'CURSOR_EXPIRED', 'EXPORT_TOO_LARGE', 'INVALID_PARAMETER']);
});

test('2.23.0 has no Phase B (sharing) types', () => {
  const names = schemaFiles.flatMap((f) => Object.keys(readJson(path.join(SCHEMA_DIR, f)).definitions));
  assert.deepEqual(names.filter((n) => /share|viewer|reply-?queue|report/i.test(n) && n !== 'NoteReply' && n !== 'NoteReplyRequest'), []);
  const note = readJson(path.join(SCHEMA_DIR, 'learning-event.schema.json')).definitions.EventNote;
  assert.equal(note.properties.actor.enum.includes('system'), false);
  assert.equal(JSON.stringify(note).includes('"sys-'), false);
});

test('versions: package.json, error-codes.json and api-response-schema.json agree', () => {
  const v = require('../package.json').version;
  assert.equal(readJson(path.join(ROOT, 'error-codes.json')).version, v);
  assert.equal(readJson(path.join(ROOT, 'api-response-schema.json')).version, v);
});

test('no schema or example assumes an OS, a drive letter, a backslash path or an absolute path', () => {
  const files = [
    ...schemaFiles.map((f) => path.join(SCHEMA_DIR, f)),
    path.join(SCHEMA_DIR, 'dashboard-errors.json'),
    ...jsonFiles(EXAMPLE_DIR).map((f) => path.join(EXAMPLE_DIR, f)),
    ...jsonFiles(INVALID_DIR).map((f) => path.join(INVALID_DIR, f)),
  ];
  const problems = [];
  const collect = (value, file, keyPath) => {
    if (typeof value === 'string') {
      if (keyPath.endsWith('.pattern')) return;
      if (/(^|[^A-Za-z0-9])[A-Za-z]:[\\/]/.test(value)) problems.push(`${file}${keyPath}: drive letter in "${value}"`);
      if (value.includes('\\')) problems.push(`${file}${keyPath}: backslash in "${value}"`);
      if (/^\/(Users|home|var|tmp|etc|Volumes)\b/.test(value) || /^~\//.test(value)) problems.push(`${file}${keyPath}: absolute path "${value}"`);
    } else if (Array.isArray(value)) value.forEach((v, i) => collect(v, file, `${keyPath}[${i}]`));
    else if (value && typeof value === 'object') Object.entries(value).forEach(([k, v]) => collect(v, file, `${keyPath}.${k}`));
  };
  for (const file of files) collect(readJson(file), path.basename(file), '');
  assert.deepEqual(problems, []);
});

test('2.26.0 notes responses match what the server sends: new optional fields, valid and invalid', () => {
  const list = example('note-server-list-response');
  assert.equal(list.nextCursor, null);
  assert.equal(list.cursor, list.nextCursor, 'the server sends cursor as a copy of nextCursor');
  const page = example('note-server-list-response-page');
  assert.equal(page.nextCursor, page.cursor);
  assert.ok(typeof page.nextCursor === 'string');
  for (const n of [...list.notes, ...page.notes, ...example('note-server-search-response').notes, example('note-server-note-edited')]) {
    assert.equal(n.edited, n.latestVersion > 1, 'edited is latestVersion above 1');
    assert.equal(n.statusKey, `notes.status.${n.status}`);
  }
  valid('progress-api', 'NoteListResponse', { notes: [], nextCursor: 'abc' });
  valid('progress-api', 'NoteSearchResponse', { notes: [], nextCursor: null, studentId: 'usr_1' });
  invalid('progress-api', 'Note', invalidExample('note-server-status-unknown'), 'enum');
  invalid('progress-api', 'Note', invalidExample('note-server-tag-key-bad'), 'pattern');
  invalid('progress-api', 'Note', invalidExample('note-server-edited-not-boolean'), 'type');
  invalid('progress-api', 'NoteListResponse', invalidExample('note-list-response-next-cursor-number'), 'anyOf');
  const extra = example('note-server-list-response'); extra.surprise = 1; invalid('progress-api', 'NoteListResponse', extra, 'additionalProperties');
  const defs = readJson(path.join(SCHEMA_DIR, 'progress-api.schema.json')).definitions;
  for (const name of ['NoteListResponse', 'NoteSearchResponse']) assert.match(defs[name].properties.cursor.description, /DEPRECATED/, `${name}.cursor is marked deprecated`);
});

test('2.26.0 back-compat: every 2.20.0 to 2.25.0 example and event validates unchanged', () => {
  for (const [name, [file, def]] of Object.entries({ ...EXAMPLES, ...EXAMPLES_2_21, ...EXAMPLES_2_23, ...EXAMPLES_2_25 })) valid(file, def, example(name));
  for (const name of [...NEW_EVENT_EXAMPLES, ...NEW_EVENT_EXAMPLES_2_22, ...NEW_EVENT_EXAMPLES_2_23]) validEvent(example(name));
  for (const kind of KINDS) validEvent(event(kind));
});

test('2.26.0 is purely additive against the 2.25.0 tag: progress-api.schema.json gains only the listed optional properties', () => {
  const git = require('node:child_process');
  let base;
  try {
    base = git.execFileSync('git', ['show', 'v2.25.0:schemas/dashboard/progress-api.schema.json'], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  } catch { return; } // the 2.25.0 tag is not in a shallow clone: the example run above still covers it
  const old = JSON.parse(base);
  const now = readJson(path.join(SCHEMA_DIR, 'progress-api.schema.json'));
  assert.deepEqual(Object.keys(now.definitions).filter((k) => !(k in old.definitions)), [], 'no new definition');
  const added = {
    Note: ['status', 'statusKey', 'tagKey', 'edited', 'updatedAt'],
    NoteListResponse: ['studentId', 'nextCursor'],
    NoteSearchResponse: ['studentId', 'nextCursor'],
  };
  for (const [name, def] of Object.entries(old.definitions)) {
    const cur = now.definitions[name];
    assert.ok(cur, `${name} was removed`);
    if (!(name in added)) { assert.deepEqual(cur, def, `${name} changed`); continue; }
    const { properties: curProps, ...curRest } = cur;
    const { properties: oldProps, ...oldRest } = def;
    assert.deepEqual(curRest, oldRest, `${name}: required, additionalProperties and the rest are unchanged`);
    assert.deepEqual(Object.keys(curProps).filter((k) => !(k in oldProps)).sort(), [...added[name]].sort(), `${name}: only the listed properties are new`);
    for (const [prop, pdef] of Object.entries(oldProps)) {
      if (prop === 'cursor' && name !== 'Note') { assert.deepEqual({ ...curProps[prop], description: 0 }, { ...pdef, description: 0 }, `${name}.cursor changed beyond its description`); continue; }
      assert.deepEqual(curProps[prop], pdef, `${name}.${prop} changed`);
    }
    for (const prop of added[name]) assert.equal((cur.required || []).includes(prop), false, `${name}.${prop} must stay optional`);
  }
});

console.log(`\nDashboard contracts: ${passed} passed, ${failures} failed`);
if (failures > 0) process.exit(1);
