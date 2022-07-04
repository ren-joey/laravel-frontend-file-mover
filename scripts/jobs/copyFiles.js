const chalk = require("chalk");
const path = require("path");
const fileCopier = require("../colorfulConsole/fileCopier");
const filesCopier = require("../colorfulConsole/filesCopier");

module.exports = function copyFiles(config) {
    const {
        build_root,
        build_index_filename,
        index_file_dest,
        index_filename,
        resources_dest,
        laravel_server_root,
        laravel_server_resources,
        laravel_server_public
    } = config;

    console.log(chalk.bold('📝 Copying:'));

    fileCopier(
        path.join(build_root, build_index_filename),
        path.join(
            laravel_server_root,
            laravel_server_resources,
            index_file_dest,
            index_filename
        )
    );

    filesCopier(
        build_root,
        path.join(
            laravel_server_root,
            laravel_server_public,
            resources_dest
        )
    );

    console.log('\n');
};