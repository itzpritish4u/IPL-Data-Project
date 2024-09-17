import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const matchesPath = join(__dirname, '../data/matches.json');
const deliveriesPath = join(__dirname, '../data/deliveries.json');
const outputPath = join(__dirname, '../public/output/extraRunsConceded2016.json');

function get2016MatchesIDs(matches, year) {
    const matchIDs = [];
    matches.forEach(match => {
        if (match.season === year) {
            matchIDs.push(match.id);
        }
    });
    return matchIDs;
}

function getExtraRunsConceded(deliveries, matchIDs) {
    const extraRunsConceded = {};
    deliveries.forEach(delivery => {
        if (matchIDs.includes(delivery.match_id)) {
            const ballingTeam = delivery.bowling_team;

            if (!extraRunsConceded[ballingTeam]) {
                extraRunsConceded[ballingTeam] = 0;
            }
            extraRunsConceded[ballingTeam] += parseInt(delivery.extra_runs, 10);
        }
    });

    return extraRunsConceded;
}

function main() {
    const matches = JSON.parse(readFileSync(matchesPath, 'utf-8'));
    const deliveries = JSON.parse(readFileSync(deliveriesPath, 'utf-8'));
    const matchIDs = get2016MatchesIDs(matches, '2016');
    const extraRunsConceded = getExtraRunsConceded(deliveries, matchIDs);
    writeFileSync(outputPath, JSON.stringify(extraRunsConceded, null, 4), 'utf-8');
    console.log('extraRunsConceded2016.json has been created successfully.');
}

main();