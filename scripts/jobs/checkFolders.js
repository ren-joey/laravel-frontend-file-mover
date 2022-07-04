const chalk = require("chalk");
const path = require("path");
const folderChecker = require("../colorfulConsole/folderChecker");

module.exports = function checkFolders(config) {
    const {
        laravel_server_root,
        laravel_server_resources,
        laravel_server_public,
        build_root,
        build_index_filename
    } = config;

    console.log(chalk.bold('\n🔎 Checking folders:'));

    try {
        const resourcesPathValid = folderChecker(
            path.join(laravel_server_root, laravel_server_resources)
        );
        if (!resourcesPathValid) {
            console.log(
                chalk.red.bold('\n❌ FATAL ERROR \n'),
                chalk.red('Checking Laravel resources folder failed.\n'),
                chalk.gray(
                    'These following configurations might be wrong:\n',
                    chalk.white.bold('laravel_server_root: \'', laravel_server_root, '\'\n'),
                    chalk.white.bold('laravel_server_resources: \'', laravel_server_resources, '\'\n'),
                    'Please check them and try again.\n'
                )
            );
            throw new Error('Procedure stopped.');
        }

        const publicPathValid = folderChecker(
            path.join(laravel_server_root, laravel_server_public)
        );
        if (!publicPathValid) {
            console.log(
                chalk.red.bold('\n❌ FATAL ERROR \n'),
                chalk.red('Checking Laravel resources folder failed.\n'),
                chalk.gray(
                    'These following configurations might be wrong:\n',
                    chalk.white.bold('laravel_server_root: \'', laravel_server_root, '\'\n'),
                    chalk.white.bold('laravel_server_public: \'', laravel_server_public, '\'\n'),
                    'Please check them and try again.\n'
                )
            );
            throw new Error('Procedure stopped.');
        }

        const buildPathValid = folderChecker(build_root);
        if (!buildPathValid) {
            console.log(
                chalk.red.bold('\n❌ FATAL ERROR \n'),
                chalk.red('Checking build folder failed.\n'),
                chalk.gray(
                    'These following configurations might be wrong:\n',
                    chalk.white.bold('build_root: \'', build_root, '\'\n'),
                    'Please check them and try again.\n'
                )
            );
            throw new Error('Procedure stopped.');
        }

        const buildIndexValid = folderChecker(
            path.join(build_root, build_index_filename)
        );
        if (!buildIndexValid) {
            console.log(
                chalk.red.bold('\n❌ FATAL ERROR \n'),
                chalk.red('Checking index.html file failed.\n'),
                chalk.gray(
                    'These following configurations might be wrong:\n',
                    chalk.white.bold('build_index_filename: \'', build_index_filename, '\'\n'),
                    'Please check them and try again.\n'
                )
            );
            throw new Error('Procedure stopped.');
        }

        return true;
    } catch(e) {
        console.log(e.message);
        return false;
    }
};