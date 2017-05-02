#!/usr/bin/env node

const package = require('./../package.json');

const argv = require('yargs')
             .usage('Usage: $0 -f [files] -i [iteration]')
             .command('files', 'Files list to bench').alias('f', 'files').array('files')
             .command('iteration', 'Number of times each file will be executed').alias('i', 'iteration').default('i', 100)
             .demandOption(['files'])

             .help('h')
             .alias('h', 'help')
             .argv;