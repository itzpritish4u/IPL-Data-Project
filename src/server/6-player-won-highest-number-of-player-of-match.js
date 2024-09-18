import { writeFileSync } from 'fs';
import matches from '../data/matches.json' assert { type: 'json' };

const outputPath = './src/public/output/playerWonHighestPOM.json';

function getPlayerWonHighestPOM(matches) {
    const playerWhoWonPOM = matches.reduce((acc, match) => {
        const season = match.season;
        const POM = match.player_of_match;

        if (season && !acc[season]) {
            acc[season] = {};
        }

        if (POM) {
            if (!acc[season][POM]) {
                acc[season][POM] = 0;
            }
            acc[season][POM]++;
        }
        return acc;
    }, {});

    const mostPOM = Object.entries(playerWhoWonPOM).reduce((acc, [season, players]) => {
        let maxAwards = 0;
        let PlayerOfMatch = '';

        Object.entries(players).forEach(([player, awards]) => {
            if (awards > maxAwards) {
                maxAwards = awards;
                PlayerOfMatch = player;
            }
        });

        acc[season] = { PlayerOfMatch, awards: maxAwards };
        return acc;
    }, {});

    return mostPOM;
}

function main() {
    const playerWonHighestPOM = getPlayerWonHighestPOM(matches);
    writeFileSync(outputPath, JSON.stringify(playerWonHighestPOM, null, 2), 'utf-8');
    console.log('PlayerWonHighestPOM.json has been created successfully.');
}

main();