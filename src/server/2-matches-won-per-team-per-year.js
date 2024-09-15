import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const matchesPath = join(__dirname, '../data/matches.csv');
const outputPath = join(__dirname, '../public/output/matchesWonPerTeamPerYear.json');

function getMatchesWonPerTeamPerYear(matches) {
  const matchesWonPerTeamPerYear = {};
    
  for (let i = 1; i < matches.length; ++i) {
    const match = matches[i].split(',');
    const matchYear = match[1];
    const winner = match[10];

    if (winner && winner !== '') {
            if (!matchesWonPerTeamPerYear[matchYear]) {
                matchesWonPerTeamPerYear[matchYear] = {};
            }
            if (matchesWonPerTeamPerYear[matchYear][winner]) {
                matchesWonPerTeamPerYear[matchYear][winner]++;
            } else {
                matchesWonPerTeamPerYear[matchYear][winner] = 1;
            }
        }
    }

    return matchesWonPerTeamPerYear;
}

function main() {
    const matches = readFileSync(matchesPath, 'utf-8').split('\n');
    const matchesWonPerTeamPerYear = getMatchesWonPerTeamPerYear(matches);
    writeFileSync(outputPath, JSON.stringify(matchesWonPerTeamPerYear, null, 2), 'utf-8');
}

main();