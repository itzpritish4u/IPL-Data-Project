import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const deliveriesPath = join(__dirname, '../data/deliveries.csv');
const outputPath = join(__dirname, '../public/output/mostDismissedPlayerByAnother.json');

function getMostDismissedPlayerByAnother(deliveries) {
    const bowlersWithDismissedBatsmen = {};
    for (let i = 1; i < deliveries.length; ++i) {
        const delivery = deliveries[i].split(',');
        const bowler = delivery[8];
        const dismissedPlayer = delivery[18];
        const dismissedType = delivery[19];

        if (dismissedPlayer && dismissedType !== 'run out') {
            if (!bowlersWithDismissedBatsmen[bowler]) {
                bowlersWithDismissedBatsmen[bowler] = {};
            }
            if (!bowlersWithDismissedBatsmen[bowler][dismissedPlayer]) {
                bowlersWithDismissedBatsmen[bowler][dismissedPlayer] = 0;
            }
            bowlersWithDismissedBatsmen[bowler][dismissedPlayer]++;
        }
    }
    console.log(bowlersWithDismissedBatsmen);
    
    let mostWicketBowler = '';
    let mostDismissedBatsman = '';
    let  mostWicketCount = 0;

    for (const bowler in bowlersWithDismissedBatsmen) {
        for (const dismissed in bowlersWithDismissedBatsmen[bowler]) {
            if (mostWicketCount < bowlersWithDismissedBatsmen[bowler][dismissed]) {
                mostWicketCount = bowlersWithDismissedBatsmen[bowler][dismissed];
                mostDismissedBatsman = dismissed;
                mostWicketBowler = bowler;
            }
        }
    }
    return { bowler: mostWicketBowler, batsman: mostDismissedBatsman, wicketCount: mostWicketCount };
}

function main() {
    const deliveries = readFileSync(deliveriesPath, 'utf-8').split('\n');
    const mostDismissedPlayerByAnother = getMostDismissedPlayerByAnother(deliveries);
    writeFileSync(outputPath, JSON.stringify(mostDismissedPlayerByAnother, null, 2),  'utf-8');
    console.log('mostDismissedPlayerByAnother.json has been created successfully.');
}

main();