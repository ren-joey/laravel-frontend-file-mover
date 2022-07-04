const path = require("path");
const chalk = require("chalk");
const fileRemover = require("../colorfulConsole/fileRemover");

module.exports = function deleteFiles(config) {
    const {
        build_index_filename,
        resources_dest,
        laravel_server_root,
        laravel_server_public
    } = config;

    console.log(chalk.bold('🗑 Deleting:'));

    const file = path.join(
        laravel_server_root,
        laravel_server_public,
        resources_dest,
        build_index_filename
    );
    fileRemover(file);

    console.log('\n');
};