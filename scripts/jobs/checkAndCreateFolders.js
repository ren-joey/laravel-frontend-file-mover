const chalk = require("chalk");
const path = require("path");
const folderMaker = require("../colorfulConsole/folderMaker");

module.exports = function checkAndCreateFolders(config) {
    const {
        index_file_dest,
        resources_dest,
        laravel_server_root,
        laravel_server_resources,
        laravel_server_public
    } = config;

    console.log(chalk.bold('🗃 Checking laravel repository setting:'));

    folderMaker(
        path.join(
            laravel_server_root,
            laravel_server_public,
            index_file_dest
        )
    );
    folderMaker(
        path.join(
            laravel_server_root,
            laravel_server_resources,
            resources_dest
        )
    );

    console.log(chalk.grey('Folders initialization were done.'));
    console.log('\n');
};