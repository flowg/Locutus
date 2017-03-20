'use strict';
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import uglify from "rollup-plugin-uglify";
//paths are relative to the execution path
export default {
    entry:         'Angular/aot/main-aot.js',
    dest:          'Angular/aot/dist/build.js', // output a single application bundle
    sourceMap:     true,
    sourceMapFile: 'Angular/aot/dist/build.js.map',
    format:        'iife',
    plugins:       [
        nodeResolve({ jsnext: true, module: true }),
        commonjs({
            include: [ 'node_modules/rxjs/**' ]
        }),
        uglify()
    ]
}
