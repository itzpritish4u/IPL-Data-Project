import { writeFileSync } from 'fs';
import matches from '../data/matches.json' assert { type: 'json' };

const outputPath = './src/public/output/teamsWonTossAndMatch.json';

function getTeamsWonTossAndMatch(matches) {
    return matches.reduce((tossAndMatchWins, match) => {
        const tossWinner = match.toss_winner;
        const matchWinner = match.winner;

        if (tossWinner && matchWinner && tossWinner === matchWinner) {
            if (!tossAndMatchWins[tossWinner]) {
                tossAndMatchWins[tossWinner] = 0;
            }
            tossAndMatchWins[tossWinner]++;
        }
        return tossAndMatchWins;
    }, {});
}

function main() {
    const TeamsWonTossAndMatch = getTeamsWonTossAndMatch(matches);
    writeFileSync(outputPath, JSON.stringify(TeamsWonTossAndMatch, null, 2), 'utf-8');
    console.log('TeamsWonTossAndMatch.json has been created successfully.');
}

main();