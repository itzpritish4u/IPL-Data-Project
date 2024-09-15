import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const matchesPath = join(__dirname, '../data/matches.csv');
const deliveriesPath = join(__dirname, '../data/deliveries.csv');
const outputPath = join(__dirname, '../public/output/economicalBowlers2015.json');

function get2015matchesIDs(matches) {
    const matchIDs2015 = [];
    for (let i = 1; i < matches.length; ++i) {
        const match = matches[i].split(',');
        if (match[1] === '2015') {
            matchIDs2015.push(match[0]);
        }
    }
    return matchIDs2015;
}

function getEconomicalBowlers(matchIDs2015, deliveries) {
    const bowlersEconomy = {};
    for (let i = 1; i < deliveries.length; ++i) {
        const delivery = deliveries[i].split(',');
        const matchID = delivery[0];
        const bowler = delivery[8];
        const runsConceded = parseInt(delivery[17], 10);
        
        if (matchIDs2015.includes(matchID)) {
            if (!bowlersEconomy[bowler]) {
                bowlersEconomy[bowler] = {totalRuns : 0, totalBalls : 0};
            }

            bowlersEconomy[bowler].totalRuns += runsConceded;
            if (delivery[10] === '0' && delivery[13] === '0') {
                bowlersEconomy[bowler].totalBalls++;
            }
        }
    }
    
    const bowlerEconomyRates = [];
    for (const bowler in bowlersEconomy) {
        const totalBalls = bowlersEconomy[bowler].totalBalls;
        const totalRuns = bowlersEconomy[bowler].totalRuns;
        const economyRate = totalRuns / (totalBalls / 6);
        
        bowlerEconomyRates.push({bowler, economy : parseFloat(economyRate.toFixed(2))});
    }

    return bowlerEconomyRates.sort((a, b) => a.economy - b.economy).slice(0, 10);
}

function main() {
    const matches = readFileSync(matchesPath, 'utf-8').split('\n');
    const deliveries = readFileSync(deliveriesPath, 'utf-8').split('\n');

    const matchIDs2015 = get2015matchesIDs(matches);
    const top10EconomicalBowlers = getEconomicalBowlers(matchIDs2015, deliveries).slice(0, 10);

    writeFileSync(outputPath, JSON.stringify(top10EconomicalBowlers, null, 2), 'utf-8');
    console.log('economicalBowlers2015.json has been created successfully.');
}

main();