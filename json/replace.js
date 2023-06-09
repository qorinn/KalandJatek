const fs = require('fs');

// Read the content from 'cards.txt' file
fs.readFile('cards.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Define the pattern using regex
  const pattern = /lapozz (.*?)\./gi;

  // Perform the find and replace operation
  const outputString = data.replace(pattern, '<strong>Lapozz $1</strong>');

  // Write the results to a new file
  fs.writeFile('output.txt', outputString, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    
    console.log('Replacement complete. Results saved in output.txt');
  });
});
