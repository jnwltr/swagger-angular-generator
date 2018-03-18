"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Generator of API models (interfaces) from BE API json */
const fs = require("fs");
const conf = require("./conf");
const definitions_1 = require("./definitions");
const process_paths_1 = require("./requests/process-paths");
const utils_1 = require("./utils");
/**
 * Generates API layer for the project based on src to dest
 * @param src source swagger json schema
 * @param dest destination directory
 */
function generate(src = conf.apiFile, dest = conf.outDir) {
    let schema;
    try {
        const content = fs.readFileSync(src);
        schema = JSON.parse(content.toString());
    }
    catch (e) {
        if (e instanceof SyntaxError) {
            utils_1.out(`${src} is either not a valid JSON scheme or contains non-printable characters`, 'red');
        }
        else
            utils_1.out(`JSON scheme file '${src}' does not exist`, 'red');
        utils_1.out(`${e}`);
        return;
    }
    const header = utils_1.processHeader(schema);
    const config = {
        header,
        dest,
        baseUrl: `${(schema.schemes || [])[0] || 'http'}://${schema.host}${schema.basePath}`,
    };
    if (!fs.existsSync(dest))
        fs.mkdirSync(dest);
    process_paths_1.processPaths(schema.paths, `http://${schema.host}${schema.basePath}${conf.swaggerFile}`, config);
    definitions_1.processDefinitions(schema.definitions, config);
}
exports.generate = generate;
//# sourceMappingURL=generate.js.map