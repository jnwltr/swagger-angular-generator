#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander = require("commander");
const conf = require("./conf");
const generate_1 = require("./generate");
commander
    .option('-s, --src <source>', `Source directory, default: ${conf.apiFile}`)
    .option('-d, --dest <destination>', `Destination directory, default: ${conf.outDir}`)
    .option('--no-store', 'Do not generate store')
    .parse(process.argv);
generate_1.generate(commander.src, commander.dest, commander.store);
//# sourceMappingURL=index.js.map