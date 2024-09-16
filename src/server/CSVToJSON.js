import { writeFileSync } from 'fs';
import csvtojson from 'csvtojson';

const matchesCSVPath = './src/data/matches.csv';
const matchesJSONPath = './src/data/matches.json';
const deliveriesCSVPath = './src/data/deliveries.csv';
const deliveriesJSONPath = './src/data/deliveries.json';

function convertCSVToJSON(csvPath, jsonPath) {
    csvtojson()
        .fromFile(csvPath)
        .then((data) => {
            writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8');
            console.log(`${csvPath} successfully converted to JSON!`);
        })
        .catch((error) => {
            console.error(`Error converting ${csvPath} to JSON:`, error);
        });
}

convertCSVToJSON(matchesCSVPath, matchesJSONPath);
convertCSVToJSON(deliveriesCSVPath, deliveriesJSONPath);