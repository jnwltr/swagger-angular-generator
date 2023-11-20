#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const conf = require("./conf");
const generate_1 = require("./generate");
commander_1.program
    .option('-s, --src <source>', `Source directory, default: ${conf.apiFile}`)
    .option('-d, --dest <destination>', `Destination directory, default: ${conf.outDir}`)
    .option('--no-store', 'Do not generate store')
    .option('-w, --unwrap-single-param-methods', 'Controller methods with a single parameter get a method_() where the parameter object is unwrapped')
    /* tslint:disable-next-line:max-line-length */
    .option('-u, --swagger-url-path <path>', `swagger URL path, where the swagger ui documentation can be found; default: ${conf.swaggerUrlPath}, i.e. the resulting address would be http://example${conf.swaggerUrlPath}`)
    .option('-o, --omit-version', `Write version info, default: ${conf.omitVersion}`)
    .parse(process.argv);
commander_1.program.parse();
const options = commander_1.program.opts();
(0, generate_1.generate)(options.src, options.dest, options.store, options.unwrapSingleParamMethods, options.swaggerUrlPath, options.omitVersion);
//# sourceMappingURL=index.js.map