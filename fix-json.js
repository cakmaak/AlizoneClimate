const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'ClimatePanelJson', 'products.json');
const outputFile = path.join(__dirname, 'ClimatePanelJson', 'products-fixed.json');

console.log('Reading JSON file...');
const jsonContent = fs.readFileSync(inputFile, 'utf8');

console.log('Validating JSON...');
try {
    // Try to parse the JSON to check for errors
    JSON.parse(jsonContent);
    console.log('JSON is valid! No issues found.');
    process.exit(0);
} catch (error) {
    console.error('Error parsing JSON:', error.message);

    // If there's an error, try to fix common issues
    console.log('Attempting to fix common JSON issues...');

    // Common fixes:
    // 1. Remove BOM if present
    let fixedContent = jsonContent.replace(/^\uFEFF/, '');

    // 2. Fix trailing commas in objects and arrays
    fixedContent = fixedContent.replace(/,(\s*[}\]])/g, '$1');

    // 3. Fix missing quotes around property names
    fixedContent = fixedContent.replace(/([{,])(\s*)([a-zA-Z0-9_]+)(\s*):/g, '$1"$3":');

    // 4. Fix single quotes to double quotes
    fixedContent = fixedContent.replace(/'/g, '"');

    // 5. Try to parse again to see if it's fixed
    try {
        const parsed = JSON.parse(fixedContent);
        console.log('Successfully fixed JSON! Writing to file...');
        fs.writeFileSync(outputFile, JSON.stringify(parsed, null, 2));
        console.log(`Fixed JSON written to ${outputFile}`);
    } catch (fixError) {
        console.error('Failed to fix JSON automatically. Manual inspection required.');
        console.error('Error details:', fixError.message);

        // Write the problematic part to a file for inspection
        const errorPosition = parseInt(error.message.match(/position (\d+)/)[1]);
        const start = Math.max(0, errorPosition - 100);
        const end = Math.min(fixedContent.length, errorPosition + 100);
        const context = fixedContent.substring(start, end);

        fs.writeFileSync('json-error-context.txt', `Error at position ${errorPosition}:\n\n${context}`);
        console.log('Problematic JSON context saved to json-error-context.txt');
    }
}
