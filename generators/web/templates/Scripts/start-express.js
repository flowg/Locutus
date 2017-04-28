#!/usr/bin/env node
'use strict';

/**
 * Third-party requires
 */
const child_pty = require('child_pty').spawn;
const chalk     = require("chalk");

// Retrieving options from CLI
let env = process.argv.filter(el => el.indexOf("--env=") > -1).pop();
env     = env ? env.split("=").pop().toUpperCase() : 'development';

let debug = process.argv.filter(el => el.indexOf("--debug=") > -1).pop();
debug     = debug ? debug.split("=").pop() : '*,-express:*';

// Setting up a fake TTY to get debug module display properly
let shell = process.platform === 'win32' ? 'cmd.exe' : '/bin/sh';

// Launching Express app as requested
let express = child_pty(shell, []);
express.stdout.pipe(process.stdout);
let commandExpress = `DEBUG=${debug} node ./www --env=${env}\n`;
express.stdin.write(commandExpress);

// Launching tslint, tsc and node-sass in watch mode if in development environment
if (env === 'development') {
    let watch = child_pty(shell, []);
    watch.stdout.pipe(process.stdout);
    let commandWatch = "npm run watch\n";
    watch.stdin.write(commandWatch);
}
