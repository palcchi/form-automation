import { chromium } from 'playwright';

const FORM_URL = process.env.FORM_URL || 'https://forms.gle/r3qLz8RUCh4bjHUd8';
const args = new Set(process.argv.slice(2));
const SUBMIT = args.has('--submit');
const INSPECT = args.has('--inspect');

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

console.log(`Opening: ${FORM_URL}`);
await page.goto(FORM_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(1500);

async function inspectPage(section) {
  const questions = await page.locator('[role="listitem"]').evaluateAll((items) =>
    items.map((item) => ({
      text: (item.innerText || '').trim().replace(/\n+/g, ' | '),
      radios: [...item.querySelectorAll('[role="radio"]')].map((x) => x.getAttribute('data-value') || x.getAttribute('aria-label')).filter(Boolean),
      checks: [...item.querySelectorAll('[role="checkbox"]')].map((x) => x.getAttribute('data-answer-value') || x.getAttribute('aria-label')).filter(Boolean),
      hasInput: !!item.querySelector('input:not([type="hidden"]), textarea')
    })).filter(x => x.text)
  );
  console.log(`\nSECTION ${section}`);
  questions.forEach((q, i) => console.log(`${i + 1}. ${q.text}`));
  return questions;
}

async function fillVisibleQuestions() {
  const items = page.locator('[role="listitem"]');
  const count = await items.count();

  for (let i = 0; i < count; i++) {
    const item = items.nth(i);

    const radios = item.locator('[role="radio"]');
    if (await radios.count()) {
      // QA default: select the first available option. Customize this mapping
      // for your own test form if specific answers are required.
      await radios.first().click();
      continue;
    }

    const checks = item.locator('[role="checkbox"]');
    if (await checks.count()) {
      await checks.first().click();
      continue;
    }

    const textareas = item.locator('textarea');
    if (await textareas.count()) {
      await textareas.first().fill('Test response');
      continue;
    }

    const inputs = item.locator('input:not([type="hidden"]):not([type="radio"]):not([type="checkbox"])');
    if (await inputs.count()) {
      const input = inputs.first();
      const type = (await input.getAttribute('type')) || 'text';
      if (type === 'email') await input.fill('test@example.com');
      else if (type === 'number') await input.fill('1');
      else await input.fill('Test');
    }
  }
}

let section = 1;
while (true) {
  await inspectPage(section);
  if (!INSPECT) await fillVisibleQuestions();

  const submit = page.getByRole('button', { name: /^(submit|kirim)$/i });
  if (await submit.count()) {
    if (SUBMIT) {
      console.log('\nSubmitting exactly once...');
      await submit.first().click();
      await page.waitForTimeout(2000);
      console.log('Submission attempted.');
    } else {
      console.log('\nReached final section. Dry-run mode: NOT submitted.');
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
