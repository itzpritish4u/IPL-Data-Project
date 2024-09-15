import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const matchesPath = join(__dirname, '../data/matches.csv');
const deliveriesPath = join(__dirname, '../data/deliveries.csv');
const outputPath = join(__dirname, '../public/output/strikeRateOfBatsmen.json');

function getIDsOfEachSeasons(matches) {
    const seasonsOfIDs = {};

    for (let i = 1; i < matches.length; ++i) {
        const match = matches[i].split(',');
        const season = match[1];
        const matchID = match[0];
        seasonsOfIDs[matchID] = season;
    }
    return seasonsOfIDs;
}

function getStrikeRateOfBatsmen(deliveries, seasonsOfIDs) {
    const stats = {};
    for (let i = 1; i < deliveries.length; ++i) {
        const delivery = deliveries[i].split(',');
        const matchID = delivery[0];
        const season = seasonsOfIDs[matchID];
        const batsman = delivery[6];
        const batsmanRun = parseInt(delivery[15], 10);
        
        if (!stats[season]) {
            stats[season] = {};
        }
        if (!stats[season][batsman]) {
            stats[season][batsman] = {runsScored: 0, ballsPlayed: 0};
        }

        stats[season][batsman].runsScored += batsmanRun;
        if (delivery[13] === '0') {
            stats[season][batsman].ballsPlayed++;
        }
    }
    
    const strikeRates = {};
    for (const season in stats) {
        strikeRates[season] = {};
        for (const batsman in stats[season]) {
            let strikeRate = (stats[season][batsman].runsScored / stats[season][batsman].ballsPlayed) * 100;
            strikeRates[season][batsman] = strikeRate.toFixed(2);
        }
    }
    return strikeRates;
}

function main() {
    const matches = readFileSync(matchesPath, 'utf-8').split('\n');
    const deliveries = readFileSync(deliveriesPath, 'utf-8').split('\n');
    const seasonsOfIDs = getIDsOfEachSeasons(matches);
    const strikeRateOfBatsmen = getStrikeRateOfBatsmen(deliveries, seasonsOfIDs);
    writeFileSync(outputPath, JSON.stringify(strikeRateOfBatsmen, null, 2), 'utf-8');
    console.log('strikeRateOfBatsmen.json has been created successfully.');
}

main();