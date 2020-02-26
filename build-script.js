const fs = require('fs-extra');
const concat = require('concat');

(async function build(){
    const files = [
        './dist/ninep-glove-customizer/runtime.js',
        './dist/ninep-glove-customizer/es2015-polyfills.js',
        './dist/ninep-glove-customizer/polyfills.js',
        './dist/ninep-glove-customizer/scripts.js',
        './dist/ninep-glove-customizer/main.js',
    ]

    await fs.ensureDir('ninep-ui-new')
    await concat(files,'./ninep-ui-new/nystix-customizer.js')
})()