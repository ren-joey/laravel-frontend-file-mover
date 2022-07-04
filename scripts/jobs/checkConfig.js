const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const sampleConfigPath = path.join(__dirname, '../../', 'config', 'file-mover.sample.js');
let config = require(sampleConfigPath);

const checkConfigConsole = chalk.white(
    chalk.gray('You can check the sample configuration at:\n'),
    chalk.underline(sampleConfigPath)
);

const warningConsole = (chalk) => {
    console.log(
        chalk,
        '\n',
        checkConfigConsole,
    );
    console.log('Use default configuration.');
};

module.exports = function checkConfig() {
    const customConfigPath = path.join(process.cwd(), 'file-mover.config.js');

    if (fs.existsSync(customConfigPath)) {
        console.log('\n🔍 file-mover.config.js was found.');


        try {
            let _config = require(customConfigPath);

            if (!_config || typeof config !== 'object') {
                warningConsole(
                    chalk.yellow('⚠️ ', 'Incorrect configuration format.')
                );
            } else {
                config = {
                    ...config,
                    ..._config
                };
                console.log(chalk.green('✅ file-mover.config.js loaded successfully.'));
            }
        } catch(e) {
            warningConsole(
                chalk.yellow('⚠️ ', 'Incorrect configuration format.')
            );
        }
    } else {
        warningConsole(
            chalk.yellow('\nfile-mover.config.js wasn\'t exist.')
        );
    }

    config.build_root = path.join(process.cwd(), config.build_root);
    config.laravel_server_root = path.join(process.cwd(), config.laravel_server_root);

    return config;
};