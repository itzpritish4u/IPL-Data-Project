import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const matchesPath = join(__dirname, '../data/matches.csv');
const outputPath = join(__dirname, '../public/output/PlayerWonHighestPOM.json');

function getPlayerWonHighestPOM(matches) {
    const playerWhoWonPOM = {};
    for (let i = 1; i < matches.length; ++i) {
        const match = matches[i].split(',');
        const season = match[1];
        const POM = match[13];

        if (season && !playerWhoWonPOM[season]) {
            playerWhoWonPOM[season] = {};
        }

        if (POM) {
            if (playerWhoWonPOM[season][POM]) {
                playerWhoWonPOM[season][POM]++;
            } else {
                playerWhoWonPOM[season][POM] = 1;
            }
        }
    }

    const playerWonHighestPOM = {};
    for (let season in playerWhoWonPOM) {
        let maxAwards = 0;
        let PlayerOfMatch = '';
        for (let player in playerWhoWonPOM[season]) {
            if (playerWhoWonPOM[season][player] > maxAwards) {
                maxAwards = playerWhoWonPOM[season][player];
                PlayerOfMatch = player;
            }
        }
        playerWonHighestPOM[season] = {PlayerOfMatch :  PlayerOfMatch, awards : maxAwards};
    }
    return playerWonHighestPOM;
}

function main() {
    const matches = readFileSync(matchesPath, 'utf-8').split('\n');
    const playerWonHighestPOM = getPlayerWonHighestPOM(matches);
    writeFileSync(outputPath, JSON.stringify(playerWonHighestPOM, null, 2), 'utf-8');
    console.log('PlayerWonHighestPOM.json has been created successfully.');
}

main();