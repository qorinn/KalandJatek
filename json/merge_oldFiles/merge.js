const fs = require('fs');

// Read the contents of cardscopy_modified.txt
const cardscopyFilePath = 'json/merge_oldFiles/original_cards.txt';
const cardscopyContent = fs.readFileSync(cardscopyFilePath, 'utf8');

// Read the contents of modified_output.txt
const modifiedOutputFilePath = 'json/merge_oldFiles/modified_output.txt';
const modifiedOutputContent = fs.readFileSync(modifiedOutputFilePath, 'utf8');

// Split the modified output content into lines
const modifiedOutputLines = modifiedOutputContent.split('\n');

// Initialize an array to store the merged lines
const mergedLines = [];

// Iterate through each line of cardscopy_modified.txt
cardscopyContent.split('\n').forEach((line) => {
  if (line.trim() === '---') {
    // Replace the '---' line with a line from modified_output.txt, adding 4 spaces
    const modifiedLine = modifiedOutputLines.shift();
    mergedLines.push(`    ${modifiedLine}`);
  } else {
    mergedLines.push(line);
  }
});

// Join the merged lines back into a single string
const mergedText = mergedLines.join('\n');

// Write the merged output to a new file
const mergedFilePath = 'json/merge_oldFiles/output.txt';
fs.writeFileSync(mergedFilePath, mergedText, 'utf8');

console.log(`Merged output has been written to ${mergedFilePath}`);
