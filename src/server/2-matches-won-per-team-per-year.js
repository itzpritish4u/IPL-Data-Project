import { writeFileSync } from 'fs';
import matches from '../data/matches.json' assert { type: 'json' };

const outputPath = './src/public/output/matchesWonPerTeamPerYear.json';

function getMatchesWonPerTeamPerYear(matches) {
    return matches.reduce((matchesWonPerTeamPerYear, match) => {
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
        return matchesWonPerTeamPerYear;
    }, {});
}

function main() {
    const matchesWonPerTeamPerYear = getMatchesWonPerTeamPerYear(matches);
    writeFileSync(outputPath, JSON.stringify(matchesWonPerTeamPerYear, null, 2), 'utf-8');
    console.log('matchesWonPerTeamPerYear.json has been created successfully.');
}

main();