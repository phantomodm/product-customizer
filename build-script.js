const fs = require('fs-extra');
const concat = require('concat');

(async function build(){
    const files = [
        './dist/nystixs-glove-customizer/runtime.js',
        './dist/nystixs-glove-customizer/es2015-polyfills.js',
        './dist/nystixs-glove-customizer/polyfills.js',
        './dist/nystixs-glove-customizer/scripts.js',
        './dist/nystixs-glove-customizer/main.js'
    ]

    await fs.ensureDir('nystix-ui')
    await concat(files,'nystix-ui/nystix-customizer.js')
})();