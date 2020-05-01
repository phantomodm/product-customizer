const fs = require('fs-extra');
const concat = require('concat');

(async function build(){
    const files = [
        '../product-customizer/dist/nystix-quick-customs/runtime.js',
        '../product-customizer/dist/nystix-quick-customs/runtime.js.map',
        '../product-customizer/dist/nystix-quick-customs/polyfills.js',
        '../product-customizer/dist/nystix-quick-customs/polyfills.js.map',
        '../product-customizer/dist/nystix-quick-customs/es2015-polyfills.js',
        '../product-customizer/dist/nystix-quick-customs/es2015-polyfills.js.map',
        '../product-customizer/dist/nystix-quick-customs/scripts.js',
        '../product-customizer/dist/nystix-quick-customs/scripts.js.map',
        '../product-customizer/dist/nystix-quick-customs/main.js',
        '../product-customizer/dist/nystix-quick-customs/main.js.map'
    ]

    await fs.ensureDir('nystix-qo-ui')
    await concat(files,'nystix-qo-ui/nystix-quick-customs.js')
})();