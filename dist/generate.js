"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Generator of API models (interfaces) from BE API json */
const fs = require("fs");
const path = require("path");
const conf = require("./conf");
const generate_1 = require("./common/generate");
const definitions_1 = require("./definitions");
const process_paths_1 = require("./requests/process-paths");
const utils_1 = require("./utils");
/**
 * Generates API layer for the project based on src to dest
 * @param src source swagger json schema
 * @param dest destination directory
 * @param generateStore decides if redux workflow should be generated
 * @param unwrapSingleParamMethods controls if the single param methods should be generated
 * @param swaggerUrlPath the path where the swagger ui definition can be found
 * @param omitVersion shouldn't generate API version info to generated files
 */
function generate(src = conf.apiFile, dest = conf.outDir, generateStore = true, unwrapSingleParamMethods = false, swaggerUrlPath = conf.swaggerUrlPath, omitVersion = false) {
    let schema;
    try {
        const content = fs.readFileSync(src);
        schema = JSON.parse(content.toString());
    }
    catch (e) {
        if (e instanceof SyntaxError) {
            utils_1.out(`${src} is either not a valid JSON scheme or contains non-printable characters`, utils_1.TermColors.red);
        }
        else
            utils_1.out(`JSON scheme file '${src}' does not exist`, utils_1.TermColors.red);
        utils_1.out(`${e}`);
        return;
    }
    // normalize basePath, strip trailing '/'s
    const basePath = schema.basePath;
    if (typeof basePath === 'string') {
        schema.basePath = basePath.replace(/\/+$/, '');
    }
    else
        schema.basePath = '';
    recreateDirectories(dest, generateStore);
    const header = utils_1.processHeader(schema, omitVersion);
    const config = { header, dest, generateStore, unwrapSingleParamMethods };
    generateCommon(path.join(dest, conf.commonDir), generateStore);
    if (!fs.existsSync(dest))
        fs.mkdirSync(dest);
    const definitions = definitions_1.processDefinitions(schema.definitions, config);
    process_paths_1.processPaths(schema.paths, `http://${schema.host}${swaggerUrlPath}${conf.swaggerFile}`, config, definitions, schema.basePath);
}
exports.generate = generate;
function recreateDirectories(dest, generateStore) {
    utils_1.emptyDir(path.join(dest, conf.commonDir), true);
    utils_1.emptyDir(path.join(dest, conf.defsDir), true);
    utils_1.emptyDir(path.join(dest, conf.apiDir), true);
    utils_1.emptyDir(path.join(dest, conf.storeDir), true);
    utils_1.createDir(path.join(dest, conf.commonDir));
    utils_1.createDir(path.join(dest, conf.defsDir));
    utils_1.createDir(path.join(dest, conf.apiDir));
    if (generateStore)
        utils_1.createDir(path.join(dest, conf.storeDir));
}
/** Generates common classes, methods, utils */
function generateCommon(dest, generateStore) {
    generate_1.addUtils(dest);
    if (generateStore)
        generate_1.addFormExtensions(dest);
}
//# sourceMappingURL=generate.js.map