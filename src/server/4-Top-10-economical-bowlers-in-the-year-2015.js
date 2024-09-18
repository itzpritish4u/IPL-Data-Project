import { writeFileSync } from 'fs';
import matches from '../data/matches.json' assert { type: 'json' };
import deliveries from '../data/deliveries.json' assert { type: 'json' };

const outputPath = './src/public/output/economicalBowlers2015.json';

function get2015matchesIDs(matches, year) {
    return matches
        .filter(match => match.season === year)
        .map(match => match.id);
}

function getEconomicalBowlers(matchIDs2015, deliveries) {
    const bowlersEconomy = deliveries
        .reduce((acc, delivery) => {
            const matchID = delivery.match_id;
            const bowler = delivery.bowler;
            const runsConceded = parseInt(delivery.total_runs, 10);
            
            if (matchIDs2015.includes(matchID)) {
                if (!acc[bowler]) {
                    acc[bowler] = {totalRuns : 0, totalBalls : 0};
                }

                acc[bowler].totalRuns += runsConceded;
                if (delivery.wide_runs === '0' && delivery.noball_runs === '0') {
                    acc[bowler].totalBalls++;
                }
            }
            return acc;
    }, {});

    return Object.entries(bowlersEconomy)
        .map(([bowler, stats]) => {
            const economyRate = stats.totalRuns / (stats.totalBalls / 6);
            return {bowler, economy : parseFloat(economyRate.toFixed(2))};
        })
        .sort((a, b) => a.economy - b.economy)
        .slice(0, 10);
}

function main() {
    const matchIDs2015 = get2015matchesIDs(matches, '2015');
    const top10EconomicalBowlers = getEconomicalBowlers(matchIDs2015, deliveries);

    writeFileSync(outputPath, JSON.stringify(top10EconomicalBowlers, null, 2), 'utf-8');
    console.log('economicalBowlers2015.json has been created successfully.');
}

main();