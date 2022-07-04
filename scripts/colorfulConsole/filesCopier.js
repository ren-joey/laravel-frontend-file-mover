/* eslint-disable @typescript-eslint/no-var-requires */

const fse = require('fs-extra');

module.exports = function filesCopier (from, to) {
    console.log(from + '/*', ' → ', to + '/*');
    fse.copySync(from, to );
};