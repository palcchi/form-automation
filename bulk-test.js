import { spawnSync } from 'node:child_process';

const ORIGINAL_FORM = 'https://forms.gle/r3qLz8RUCh4bjHUd8';
const args = new Set(process.argv.slice(2));
const countArg = [...args].find((x) => x.startsWith('--count='));
const requestedCount = Number(countArg ? countArg.split('=')[1] : 100) || 100;
const count = Math.max(1, Math.min(100, requestedCount));
const testFormUrl = process.env.TEST_FORM_URL;

if (!testFormUrl) {
  console.error('Missing TEST_FORM_URL. Use a dedicated copy of the form for QA.');
  process.exit(1);
}

if (testFormUrl.trim() === ORIGINAL_FORM) {
  console.error('Refusing to run the batch against the original live evaluation form. Use a QA copy.');
  process.exit(1);
}

if (!/^https:\/\/(forms\.gle|docs\.google\.com)\//i.test(testFormUrl)) {
  console.error('TEST_FORM_URL must be a Google Forms URL.');
  process.exit(1);
}

console.log(`Target QA form: ${testFormUrl}`);
console.log(`Profiles: 1..${count}`);
console.log('Mode: DRY RUN only. This script never presses Submit.');

let succeeded = 0;
let failed = 0;
const started = Date.now();

for (let i = 1; i <= count; i++) {
  console.log(`\n========== QA ${i}/${count} ==========`);
  const result = spawnSync(process.execPath, ['form.js', '--dry-run'], {
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
console.log(`Succeeded: ${succeeded}`);
console.log(`Failed: ${failed}`);
console.log(`Duration: ${seconds}s`);
process.exitCode = failed ? 1 : 0;
