/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const chalk = require('chalk');

module.exports = function folderMaker(path) {
    if (!fs.existsSync(path)) {
        console.log(
            chalk.yellow(
                'Folder does not exist: %s'
            ),
            path
        );

        return false;
    }

    return true;
};