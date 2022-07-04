/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');

module.exports = function fileRemover (file) {
    console.log(file, ' → 🗑');
    fs.unlinkSync(file);
};