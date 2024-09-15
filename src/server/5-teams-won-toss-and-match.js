import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const matchesPath = join(__dirname, '../data/matches.csv');
const outputPath = join(__dirname, '../public/output/TeamsWonTossAndMatch.json');

function getTeamsWonTossAndMatch(matches) {
    const tossAndMatchWins = {};
    for (let i = 1; i < matches.length; ++i) {
        const match = matches[i].split(',');
        const tossWinner = match[6];
        const matchWinner = match[10];

        if (tossWinner && matchWinner && tossWinner === matchWinner) {
            if (!tossAndMatchWins[tossWinner]) {
                tossAndMatchWins[tossWinner] = 1;
            } else {
                tossAndMatchWins[tossWinner]++;
            }
        }
    }
    return tossAndMatchWins;
}

function main() {
    const matches = readFileSync(matchesPath, 'utf-8').split('\n');
    const TeamsWonTossAndMatch = getTeamsWonTossAndMatch(matches);
    writeFileSync(outputPath, JSON.stringify(TeamsWonTossAndMatch, null, 2), 'utf-8');
    console.log('TeamsWonTossAndMatch.json has been created successfully.');
}

main();