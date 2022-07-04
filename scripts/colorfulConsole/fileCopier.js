/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const chalk = require('chalk');

module.exports = function fileCopier (from, to) {
    console.log(chalk.white(from, ' → ', to ));
    fs.copyFileSync(from, to);
};