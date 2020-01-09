const fs = require('fs-extra');
const concat = require('concat');

(async function build(){
    const files = [
        './dist/ng-product-demo/runtime.js',
        './dist/ng-product-demo/es2015-polyfills.js',
        './dist/ng-product-demo/polyfills.js',
        './dist/ng-product-demo/scripts.js',
        './dist/ng-product-demo/main.js'
    ]

    await fs.ensureDir('nystix-ui')
    await concat(files,'nystix-ui/ninep-quick-customizer.js')
})();