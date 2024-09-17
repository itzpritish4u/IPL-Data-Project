import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const matchesPath = join(__dirname, '../data/matches.json');
const outputPath = join(__dirname, '../public/output/matchesWonPerTeamPerYear.json');

function getMatchesWonPerTeamPerYear(matches) {
    const matchesWonPerTeamPerYear = {};
    matches.forEach(match => {
        const season = match.season;
        const winner = match.winner;

        if (winner && winner !== '') {
            if (!matchesWonPerTeamPerYear[season]) {
                matchesWonPerTeamPerYear[season] = {};
            }
            if (!matchesWonPerTeamPerYear[season][winner]) {
                matchesWonPerTeamPerYear[season][winner] = 0;
            }
            matchesWonPerTeamPerYear[season][winner]++;
        }
    });
    return matchesWonPerTeamPerYear;
}

function main() {
    const matches = JSON.parse(readFileSync(matchesPath, 'utf-8'));
    const matchesWonPerTeamPerYear = getMatchesWonPerTeamPerYear(matches);
    writeFileSync(outputPath, JSON.stringify(matchesWonPerTeamPerYear, null, 2), 'utf-8');
    console.log('matchesWonPerTeamPerYear.json has been created successfully.');
}

main();