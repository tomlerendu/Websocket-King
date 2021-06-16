const fs = require('fs');
const execSync = require('child_process').execSync;

const workingDir = process.cwd();
const buildDir = `${ workingDir }/build`;

const removeFiles = ['service-worker.js', 'robots.txt', 'manifest.json'];

removeFiles.forEach(
  file => fs.unlinkSync(`${ buildDir }/${ file }`)
);

execSync('cp -r public-electron/. build');
execSync('cd build && yarn');

