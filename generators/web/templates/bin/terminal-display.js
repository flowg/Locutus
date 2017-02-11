#!/usr/bin/env node
'use strict';

let chalk = require("chalk");

let stdin = process.openStdin();

// Get back options from CLI
let prefix = process.argv.filter(el => el.indexOf("--prefix=") > -1).pop();
if (prefix) {
    prefix = prefix.split("=").pop().toUpperCase();
}

let color = process.argv.filter(el => el.indexOf("--color=") > -1).pop();
if (color) {
    color = color.split("=").pop();
}

// Intercepting outputs from previous command's stdout and rewriting it with style ;)
stdin.on('data', chunk => {
    chunk = chunk.toString();
    for (let line of chunk.split('\n')) {
        if (line !== '') {
            console.log(chalk[color](chalk.bold('[' + prefix + ']'), line));
        }
    }
});
