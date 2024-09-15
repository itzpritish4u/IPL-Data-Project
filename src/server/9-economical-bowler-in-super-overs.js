import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const deliveriesPath = join(__dirname, '../data/deliveries.csv');
const outputPath = join(__dirname, '../public/output/economicalBowlerInSuperOvers.json');

function getEconomicalBowlerInSuperOvers(deliveries) {
    const bowlersEconomy = {};

    for (let i = 1; i < deliveries.length; ++i) {
        const delivery = deliveries[i].split(',');
        if (delivery[9] === '1') {
            const bowler = delivery[8];
            const runs = parseInt(delivery[17], 10);
            if (!bowlersEconomy[bowler]) {
                bowlersEconomy[bowler] = {totalRuns: 0, totalBalls: 0};
            }

            bowlersEconomy[bowler].totalRuns += runs;
            if (delivery[10] === '0' && delivery[13] === '0') {
                bowlersEconomy[bowler].totalBalls++;
            }
        }
    }

    let mostEconomicalBowler = '';
    let minEconomy = Infinity;

    for (let bowler in bowlersEconomy) {
        const economy = (bowlersEconomy[bowler].totalRuns / (bowlersEconomy[bowler].totalBalls / 6));
        if (economy < minEconomy) {
            minEconomy = economy;
            mostEconomicalBowler = bowler;
        }
    }
    return { mostEconomicalBowler : mostEconomicalBowler, minEconomy: minEconomy.toFixed(2) };
}

function main() {
    const deliveries = readFileSync(deliveriesPath, 'utf-8').split('\n');
    const economicalBowlerInSuperOvers = getEconomicalBowlerInSuperOvers(deliveries);
    writeFileSync(outputPath, JSON.stringify(economicalBowlerInSuperOvers, null, 4), 'utf-8');
    console.log('economicalBowlerInSuperOvers.json has been created successfully.');
}

main();