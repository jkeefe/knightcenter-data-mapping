const fs = require('fs');

// Read the JSON file
const jsonString = fs.readFileSync('./tmp/inflation.json');
const data = JSON.parse(jsonString);

// Extract the required data
const values = data.values.PCPIPCH;;
const keys = Object.keys(values);
const csvData = keys.map(key => [key, values[key]['2023']]);

// Read the countries file
const countryJson = fs.readFileSync('./tmp/countries.json');
const country_data = JSON.parse(countryJson);

// Loop through the inflation data to join the country name to the country code
for (row in csvData) {

    // on each loop, grab the three-letter country code from the data, from the first [0] position
    const country_code = csvData[row][0]

    // establish a country_name variable
    var country_name

    if (!country_data.countries[country_code]) {
        // if there's no matching country code (some IMF codes are regions), use a blank

        country_name = ""

    } else {
        // otherwise, look up the country name (label) in the country_data based on the country_code

        country_name = country_data.countries[country_code].label
    }

    // add the name to the front of the row data, surrounded by quotes
    csvData[row].unshift(`"${country_name}"`)

    // loop again until we're done
}

// Convert data to CSV format
const csv = csvData.map(row => row.join(',')).join('\n');

// Add headers
const csv_with_headers = "country,code,inflation_rate\n" + csv

// Write the CSV data to a file
fs.writeFileSync('./data/inflation.csv', csv_with_headers);

console.log('CSV file generated successfully.');