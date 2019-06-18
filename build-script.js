const fs = require('fs-extra');
const concat = require('concat');

(async function build(){
    const files = [
        './dist/ng-product-beta/inline.js',
        './dist/ng-product-beta/polyfills.js',
        './dist/ng-product-beta/main.js'
    ]

    await fs.ensureDir('ng-product-beta')
    await concat(files,'quick-order-beta.js')
})