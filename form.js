import { chromium } from 'playwright';
import { makeQaResponse } from './qa-data.js';

const FORM_URL = process.env.FORM_URL || 'https://forms.gle/r3qLz8RUCh4bjHUd8';
const args = new Set(process.argv.slice(2));
const SUBMIT = args.has('--submit');
const INSPECT = args.has('--inspect');

const qaArg = [...args].find((x) => x.startsWith('--qa='));
const qaIndex = Number(process.env.QA_INDEX || (qaArg ? qaArg.split('=')[1] : 1)) || 1;
const qa = makeQaResponse(qaIndex);

console.log(`QA profile: ${qa.runId} [${qa.profile}]`);
console.log(`Opening: ${FORM_URL}`);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(FORM_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(1500);

let scaleCursor = 0;
let essayCursor = 0;

async function inspectPage(section) {
  const questions = await page.locator('[role="listitem"]').evaluateAll((items) =>
    items.map((item) => ({
      text: (item.innerText || '').trim().replace(/\n+/g, ' | '),
      radios: [...item.querySelectorAll('[role="radio"]')]
        .map((x) => x.getAttribute('data-value') || x.getAttribute('aria-label'))
        .filter(Boolean),
      checks: [...item.querySelectorAll('[role="checkbox"]')]
        .map((x) => x.getAttribute('data-answer-value') || x.getAttribute('aria-label'))
        .filter(Boolean),
      hasInput: !!item.querySelector('input:not([type="hidden"]), textarea')
    })).filter((x) => x.text)
  );

  console.log(`\nSECTION ${section}`);
  questions.forEach((q, i) => console.log(`${i + 1}. ${q.text}`));
  return questions;
}

async function fillVisibleQuestions(section) {
  const items = page.locator('[role="listitem"]');
  const count = await items.count();

  for (let i = 0; i < count; i++) {
    const item = items.nth(i);

    const radios = item.locator('[role="radio"]');
    const radioCount = await radios.count();
    if (radioCount) {
      const wanted = qa.scales[scaleCursor] ?? 4;
      const index = Math.max(0, Math.min(radioCount - 1, wanted - 1));
      await radios.nth(index).click();
      console.log(`  -> scale ${scaleCursor + 1}: ${wanted}`);
      scaleCursor++;
      continue;
    }

    const checks = item.locator('[role="checkbox"]');
    if (await checks.count()) {
      await checks.first().click();
      console.log('  -> checkbox: first QA option');
      continue;
    }

    const textareas = item.locator('textarea');
    if (await textareas.count()) {
      const answer = qa.essays[essayCursor] || `${qa.runId} | Test response ${essayCursor + 1}`;
      await textareas.first().fill(answer);
      console.log(`  -> essay ${essayCursor + 1}: ${answer}`);
      essayCursor++;
      continue;
    }

    const inputs = item.locator('input:not([type="hidden"]):not([type="radio"]):not([type="checkbox"])');
    if (await inputs.count()) {
      const input = inputs.first();
      const type = (await input.getAttribute('type')) || 'text';

      if (section >= 5 || type === 'text') {
        const answer = qa.essays[essayCursor] || `${qa.runId} | Test response ${essayCursor + 1}`;
        await input.fill(answer);
        console.log(`  -> text ${essayCursor + 1}: ${answer}`);
        essayCursor++;
      } else if (type === 'email') {
        await input.fill(`test.qa.${qa.index}@example.com`);
      } else if (type === 'number') {
        await input.fill(String((qa.index % 5) + 1));
      } else {
        await input.fill(`${qa.runId} | Test`);
      }
    }
  }
}

let section = 1;
while (true) {
  await inspectPage(section);
  if (!INSPECT) await fillVisibleQuestions(section);

  const submit = page.getByRole('button', { name: /^(submit|kirim)$/i });
  if (await submit.count()) {
    console.log(`\nCompleted profile ${qa.runId}: ${scaleCursor} scale answers, ${essayCursor} text answers.`);

    if (SUBMIT) {
      console.log('Submitting exactly once...');
      await submit.first().click();
      await page.waitForTimeout(2000);
      console.log(`Submission attempted for ${qa.runId}.`);
    } else {
      console.log('Reached final section. Dry-run mode: NOT submitted.');
    }
    break;
  }

  const next = page.getByRole('button', { name: /^(next|berikutnya)$/i });
  if (!(await next.count())) {
    console.log('\nNo Next/Submit button found. Stopping safely.');
    break;
  }

  if (INSPECT) {
    console.log('\nInspection stops here because required fields may prevent navigation without answers.');
    break;
  }

  await next.first().click();
  await page.waitForTimeout(1000);
  section++;

  if (section > 30) throw new Error('Safety stop: more than 30 sections.');
}

await browser.close();
