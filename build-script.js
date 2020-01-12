const fs = require('fs-extra');
const concat = require('concat');

(async function build(){
    const files = [
        '../product-customizer/dist/ng-product-demo/runtime.js',
        '../product-customizer/dist/ng-product-demo/polyfills.js',
        '../product-customizer/dist/ng-product-demo/es2015-polyfills.js',
        '../product-customizer/dist/ng-product-demo/scripts.js',
        '../product-customizer/dist/ng-product-demo/main.js'
    ]

    await fs.ensureDir('nystix-ui')
    await concat(files,'nystix-ui/ninep-quick-customizer.js')
})();