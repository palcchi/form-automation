import { spawnSync } from 'node:child_process';

const ORIGINAL_FORM = 'https://forms.gle/r3qLz8RUCh4bjHUd8';
const args = new Set(process.argv.slice(2));
const countArg = [...args].find((x) => x.startsWith('--count='));
const startArg = [...args].find((x) => x.startsWith('--start='));
const SUBMIT = args.has('--submit');

const requestedCount = Number(countArg ? countArg.split('=')[1] : 20) || 20;
const requestedStart = Number(startArg ? startArg.split('=')[1] : 1) || 1;

const count = Math.max(1, Math.min(100, requestedCount));
const start = Math.max(1, Math.min(100, requestedStart));
const end = Math.min(100, start + count - 1);
const testFormUrl = process.env.TEST_FORM_URL || process.env.FORM_URL;

if (!testFormUrl) {
  console.error('Missing TEST_FORM_URL or FORM_URL.');
  console.error('Example: export TEST_FORM_URL="https://forms.gle/..."');
  process.exit(1);
}

if (!/^https:\/\/(forms\.gle|docs\.google\.com)\//i.test(testFormUrl)) {
  console.error('TEST_FORM_URL / FORM_URL must be a Google Forms URL.');
  process.exit(1);
}

const isOriginal = testFormUrl.trim() === ORIGINAL_FORM;

if (SUBMIT && isOriginal) {
  console.error('Refusing bulk submit to the original live evaluation form.');
  console.error('Use a dedicated QA copy of the form for bulk submission testing.');
  process.exit(1);
}

if (isOriginal) {
  console.warn('WARNING: using the original form URL. This batch is forced to DRY RUN and will NOT press Submit.');
}

const mode = SUBMIT ? 'SUBMIT TO QA COPY' : 'DRY RUN';
console.log(`Target form: ${testFormUrl}`);
console.log(`Profiles: ${start}..${end}`);
console.log(`Mode: ${mode}`);

let succeeded = 0;
let failed = 0;
const started = Date.now();

for (let i = start; i <= end; i++) {
  console.log(`\n========== QA ${i} (${i - start + 1}/${end - start + 1}) ==========`);

  const childArgs = ['form.js', SUBMIT ? '--submit' : '--dry-run'];
  const result = spawnSync(process.execPath, childArgs, {
    stdio: 'inherit',
    env: {
      ...process.env,
      FORM_URL: testFormUrl,
      QA_INDEX: String(i)
    }
  });

  if (result.status === 0) succeeded++;
  else {
    failed++;
    console.error(`QA profile ${i} failed with exit code ${result.status ?? 'unknown'}.`);
  }
}

const seconds = ((Date.now() - started) / 1000).toFixed(1);
console.log('\n========== SUMMARY ==========');
console.log(`Range: ${start}-${end}`);
console.log(`Mode: ${mode}`);
console.log(`Succeeded: ${succeeded}`);
console.log(`Failed: ${failed}`);
console.log(`Duration: ${seconds}s`);
process.exitCode = failed ? 1 : 0;
