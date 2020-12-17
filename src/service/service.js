'use strict';

const {Cli} = require(`./cli`);
const {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode
} = require(`../constants`);
console.log('hohoho', console.log(process.argv));

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;

if (userArguments.length === 0 || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}

Cli[userCommand].run(userArguments.slice(1));


// 'use strict';
//
// const version = require('./version');
// const help = require('./help');
// const generate = require('./generate');
// const readline = require(`readline`);
//
// const readLineInterface = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
//
//
//
// readLineInterface.question('Enter the command ', (answer) => {
//
//   if (answer === '--version') {
//     version.version();
//   }
//   if (answer === '--help') {
//     help.help()
//   }
//   if (answer.startsWith('--generate')) {
//     generate.generate(answer.slice(2, answer.length));
//   } else {
//     help.help();
//   }
//
//   readLineInterface.close();
// });

