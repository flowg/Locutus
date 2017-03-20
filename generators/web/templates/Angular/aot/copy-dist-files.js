'use strict';
let fs = require('fs-extra');

/*
 * Copying single files
 */
let resources = [
    'node_modules/core-js/client/shim.min.js',
    'node_modules/zone.js/dist/zone.min.js',
    'Angular/styles.css'
];
resources.map(function (f) {
    let path = f.split('/');
    let t    = 'Angular/aot/' + path[ path.length - 1 ];
    fs.createReadStream(f).pipe(fs.createWriteStream(t));
});

/*
 * Copying Angular modules
 * TODO: remove it when Angular AOT compiler works better (makes right import paths in ngFactories)
 */
fs.copy('Angular/RootModule', 'Angular/aot/RootModule');