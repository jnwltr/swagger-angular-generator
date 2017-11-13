"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Processing of custom types from `paths` section
 * in the schema
 */
const _ = require("lodash");
const path = require("path");
const conf = require("../conf");
const utils_1 = require("../utils");
const process_controller_1 = require("./process-controller");
/**
 * Entry point, processes all possible api requests and exports them
 * to files devided ty controllers (same as swagger web app sections)
 * @param paths paths from the schema
 * @param swaggerPath swagger base url
 */
function processPaths(paths, swaggerPath, config) {
    utils_1.emptyDir(path.join(config.dest, conf.apiDir));
    const controllers = _.flatMap(paths, (methods, url) => (_.map(methods, (method, methodName) => ({
        url,
        name: getName(method),
        methodName,
        simpleName: getSimpleName(method),
        summary: method.summary,
        operationId: method.operationId,
        swaggerUrl: `${swaggerPath}${method.tags[0]}/${method.operationId}`,
        description: method.description,
        paramDef: method.parameters,
        responses: method.responses,
        responseDef: null,
    }))));
    const controllerFiles = _.groupBy(controllers, 'name');
    conf.controllerIgnores.forEach(key => delete controllerFiles[key]);
    _.forEach(controllerFiles, (methods, name) => process_controller_1.processController(methods, name, config));
}
exports.processPaths = processPaths;
function getName(method) {
    const name = _.upperFirst(_.camelCase(method.tags[0].replace(/(-rest)?-controller/, '')));
    return name;
}
function getSimpleName(method) {
    // e.g. api-token-refresh_create gets turned into ApiTokenRefreshCreate
    const nameArray = method.operationId.split(new RegExp('[-_ ]', 'g'));
    const nameArrayUpperFirst = nameArray.map(x => _.upperFirst(x));
    return nameArrayUpperFirst.join('');
}
//# sourceMappingURL=process-paths.js.map