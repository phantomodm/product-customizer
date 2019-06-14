const fs = require('fs-extra');
const concat = require('concat');

(async function build(){
    const files = [
        './dist/inline.bundle.js',
        './dist/polyfills.bundle.js',
        './dist/main.bundle.js'
    ]

    await fs.ensureDir('nystix-ui')
    await concat(files,'nystix-ui/nystix-customizer.js')
})