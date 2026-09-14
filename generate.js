import { writeFile } from 'node:fs/promises';
import { makeQaBatch } from './qa-data.js';

const countArg = process.argv.find((x) => x.startsWith('--count='));
const count = countArg ? Number(countArg.split('=')[1]) : 100;
const batch = makeQaBatch(count);

await writeFile('qa-responses.json', JSON.stringify(batch, null, 2), 'utf8');

console.log(`Generated ${batch.length} labeled QA response profiles.`);
console.log('Saved to qa-responses.json');
console.log('These are preview/test profiles only. This command does not open or submit the Google Form.');

for (const row of batch.slice(0, 5)) {
  console.log(`\n${row.runId} [${row.profile}]`);
  console.log(`Scales: ${row.scales.join(', ')}`);
  row.essays.forEach((answer, i) => console.log(`Essay ${i + 1}: ${answer}`));
}

if (batch.length > 5) console.log(`\n...and ${batch.length - 5} more profiles in qa-responses.json`);
