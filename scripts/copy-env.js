const execSync = require('child_process').execSync;

const fileName = process.argv[process.argv.length - 1];

execSync(`cp ${ fileName }.example ${ fileName }`);

