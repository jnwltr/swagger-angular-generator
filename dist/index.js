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
    .option('-w, --unwrap-single-param-methods', 'Controller methods with a single parameter get a method_() where the parameter object is unwrapped')
    .option('-u, --swagger-URL-path', `swagger URL path, where the swagger ui documentation can be found; default: ${conf.swaggerURLPath}, i.e. the resulting address would be http://example/${conf.swaggerURLPath}`)
    .parse(process.argv);
generate_1.generate(commander.src, commander.dest, commander.store, commander.unwrapSingleParamMethods, commander.swaggerURLPath);
//# sourceMappingURL=index.js.map