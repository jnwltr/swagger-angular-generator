"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Generator of API models (interfaces) from BE API json */
const fs = require("fs");
const conf = require("./conf");
const definitions_1 = require("./definitions");
const requests_1 = require("./requests");
const utils_1 = require("./utils");
function generate(src = conf.apiFile, dest = conf.outDir) {
    let schema;
    try {
        const content = fs.readFileSync(src);
        schema = JSON.parse(content.toString());
    }
    catch (e) {
        if (e instanceof SyntaxError)
            utils_1.out(`${src} is not a valid JSON scheme`, 'red');
        else
            utils_1.out(`JSON scheme file '${src}' does not exist`, 'red');
        utils_1.out(`${e}`);
        return;
    }
    const header = utils_1.processHeader(schema);
    const config = { header, dest };
    if (!fs.existsSync(dest))
        fs.mkdirSync(dest);
    requests_1.processPaths(schema.paths, `http://${schema.host}${schema.basePath}${conf.swaggerFile}`, config);
    definitions_1.processDefinitions(schema.definitions, config);
    utils_1.copyDir(conf.servicesDir, dest);
}
exports.generate = generate;
//# sourceMappingURL=generate.js.map