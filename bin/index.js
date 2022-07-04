#!/usr/bin/env node

require('v8-compile-cache');
const chalk = require('chalk');
const checkFolders = require('../scripts/jobs/checkFolders');
const checkAndCreateFolders = require('../scripts/jobs/checkAndCreateFolders');
const copyFiles = require('../scripts/jobs/copyFiles');
const deleteFiles = require('../scripts/jobs/deleteFiles');
const checkConfig = require('../scripts/jobs/checkConfig');

(() => {
    const config = checkConfig();
    const isPassed = checkFolders(config);

    if (isPassed) {
        console.log(
            chalk.green('🙂 Configuration seems fine.\n')
        );

        checkAndCreateFolders(config);
        copyFiles(config);
        deleteFiles(config);

        console.log(
            chalk.green('✅ File mover has been finished successfully.\n')
        );
    }
})();
