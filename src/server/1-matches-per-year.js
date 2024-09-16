import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const matchesJSONPath = join(__dirname, '../data/matches.json');
const outputPath = join(__dirname, '../public/output/matchesPerYear.json');

function getMatchesPerYear(matches) {
  const matchesPerYear = {};

  matches.forEach(match => {
    const season = match.season;
    if (matchesPerYear[season]) {
      matchesPerYear[season]++;
    } else {
      matchesPerYear[season] = 1;
    }
  });

  return matchesPerYear;
}

function main() {
  const matches = JSON.parse(readFileSync(matchesJSONPath, 'utf-8'));
  const matchesPerYear = getMatchesPerYear(matches);
  writeFileSync(outputPath, JSON.stringify(matchesPerYear, null, 2), 'utf-8');
  console.log('matchesPerYear.json has been created successfully.');
}

main();