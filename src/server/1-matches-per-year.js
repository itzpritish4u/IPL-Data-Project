import { writeFileSync } from 'fs';
import matches from '../data/matches.json' assert { type: 'json' };

const outputPath = './src/public/output/matchesPerYear.json';

function getMatchesPerYear(matches) {
  const matchesPerYear = {};

  matches.forEach(match => {
    const season = match.season;
    if (!matchesPerYear[season]) {
      matchesPerYear[season] = 0;
    }
    matchesPerYear[season]++;
  });

  return matchesPerYear;
}

function main() {
  const matchesPerYear = getMatchesPerYear(matches);
  writeFileSync(outputPath, JSON.stringify(matchesPerYear, null, 2), 'utf-8');
  console.log('matchesPerYear.json has been created successfully.');
}

main();