const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

const csvFilePath = path.join(__dirname, 'escalas.csv');
const jsonFilePath = path.join(__dirname, 'escalas.json');

csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    // Remove 'Tel', 'Telefone Capitao', and 'Telefone Capitão' from each row
    const cleaned = jsonObj.map(row => {
      delete row['Tel'];
      delete row['Telefone Capitao'];
      delete row['Telefone Capitão'];
      return row;
    });
    fs.writeFileSync(jsonFilePath, JSON.stringify(cleaned, null, 2), 'utf8');
    console.log('Conversion complete. Saved to escalas.json (without Tel/Telefone Capitao)');
  })
  .catch((err) => {
    console.error('Error converting CSV to JSON:', err);
  });
