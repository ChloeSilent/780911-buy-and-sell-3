'use strict';

const version = require('./version');
const help = require('./help');
const generate = require('./generate');
const readline = require(`readline`);

const readLineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});



readLineInterface.question('Enter the command ', (answer) => {

  if (answer === '--version') {
    version.version();
  }
  if (answer === '--help') {
    help.help()
  }
  if (answer.startsWith('--generate')) {
    generate.generate(answer.slice(2, answer.length));
  } else {
    help.help();
  }

  readLineInterface.close();
});

