import { writeFileSync } from 'fs';
import matches from '../data/matches.json' assert { type: 'json' };
import deliveries from '../data/deliveries.json' assert { type: 'json' };

const outputPath = './src/public/output/extraRunsConceded2016.json';

function get2016MatchesIDs(matches, year) {
    return matches
        .filter(match => match.season === year)
        .map(match => match.id);
}

function getExtraRunsConceded(deliveries, matchIDs) {
    return deliveries.reduce((extraRunsConceded, delivery) => {
        if (matchIDs.includes(delivery.match_id)) {
            const ballingTeam = delivery.bowling_team;

            if (!extraRunsConceded[ballingTeam]) {
                extraRunsConceded[ballingTeam] = 0;
            }
            extraRunsConceded[ballingTeam] += parseInt(delivery.extra_runs, 10);
        }
        return extraRunsConceded;
    }, {});
}

function main() {
    const matchIDs = get2016MatchesIDs(matches, '2016');
    const extraRunsConceded = getExtraRunsConceded(deliveries, matchIDs);
    writeFileSync(outputPath, JSON.stringify(extraRunsConceded, null, 4), 'utf-8');
    console.log('extraRunsConceded2016.json has been created successfully.');
}

main();