import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const matchesPath = join(__dirname, '../data/matches.csv');
const deliveriesPath = join(__dirname, '../data/deliveries.csv');
const outputPath = join(__dirname, '../public/output/extraRunsConceded2016.json');

function get2016MatchesIDs(matches) {
    const matchIDs = [];
    for (let i = 1; i < matches.length; ++i) {
        const match = matches[i].split(',');
        if (match[1] === '2016') {   // match[1] - year
            matchIDs.push(match[0]); // match[0] - ID
        }
    }
    return matchIDs;
}

function getExtraRunsConceded(deliveries, matchIDs) {
    const extraRunsConceded = {};
    for (let i = 1; i < deliveries.length; ++i) {
        const delivery = deliveries[i].split(',');
        
        if (matchIDs.includes(delivery[0])) { // delivery[0] is matchID
            const ballingTeam = delivery[3];
            if (extraRunsConceded[ballingTeam]) {
                extraRunsConceded[ballingTeam] += parseInt(delivery[16], 10);
            } else {
                extraRunsConceded[ballingTeam] = parseInt(delivery[16], 10);
            }
        }
    }

    return extraRunsConceded;
}

function main() {
    const matches = readFileSync(matchesPath, 'utf-8').split('\n');
    const deliveries = readFileSync(deliveriesPath, 'utf-8').split('\n');
    const matchIDs = get2016MatchesIDs(matches);
    const extraRunsConceded = getExtraRunsConceded(deliveries, matchIDs);
    writeFileSync(outputPath, JSON.stringify(extraRunsConceded, null, 4), 'utf-8');
    console.log('extraRunsConceded2016.json has been created successfully.');
}

main();