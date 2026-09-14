# form-automation

Playwright QA helper for the Google Form flow in this project.

## Setup in Codespaces

```bash
npm install
sudo npx playwright install --with-deps chromium
```

## One profile

Dry run, fills the form but never presses Submit:

```bash
npm test
```

Choose a QA profile from 1 to 100:

```bash
QA_INDEX=42 npm test
```

Submit one QA profile:

```bash
QA_INDEX=42 FORM_URL="https://forms.gle/YOUR_TEST_COPY" npm run submit
```

## 100-profile batch check

`bulk-test.js` is intentionally dry-run only. It requires a separate QA copy and refuses the original evaluation URL.

```bash
TEST_FORM_URL="https://forms.gle/YOUR_TEST_COPY" npm run bulk:test
```

It runs QA profiles 1 through 100, fills every section, reaches the final page, and stops before Submit. A summary of succeeded/failed runs is printed at the end.

## Generate 100 response fixtures

```bash
node generate.js --count=100
```

The generated essay answers are marked `TEST-QA-###` so QA data can be identified easily.
