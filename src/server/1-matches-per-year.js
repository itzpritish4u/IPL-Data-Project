import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const matchesPath = join(__dirname, '../data/matches.csv');
const outputPath = join(__dirname, '../public/output/matchesPerYear.json');

function countMatchesPerYear(matches) {
  const matchesPerYear = {};
  for (let i = 1; i < matches.length; i++) {
    const matchDetails = matches[i].split(',');
    const year = matchDetails[1];
    if (year && year !== '') {
      if (matchesPerYear[year]) {
        matchesPerYear[year]++;
      } else {
        matchesPerYear[year] = 1;
      }
    }
  }
  return matchesPerYear;
}

function main() {
  const matches = readFileSync(matchesPath, 'utf-8').split('\n');
  const matchesPerYear = countMatchesPerYear(matches);
  writeFileSync(outputPath, JSON.stringify(matchesPerYear, null, 2), 'utf-8');
  console.log('matchesPerYear.json has been created successfully.');
}

main();