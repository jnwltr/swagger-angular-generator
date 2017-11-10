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
        simpleName: getSimpleName(url),
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
/**
 * Returns simple name from last static URL segment
 * example: `/accounts/${accountId}/updateMothersName` => `updateMothersName`
 * @param url
 */
function getSimpleName(url) {
    // remove url params
    let method = url.replace(/\/{[^}]+}/g, '');
    // remove trailing `/` if present
    method = method.replace(/\/$/, '');
    // take trailing url folder
    method = method.replace(/(.*\/)*/, '');
    // subst spaces and underscores
    method = _.camelCase(method);
    method = method.replace(/[^\w]/g, '');
    return method;
}
function getName(method) {
    return _.upperFirst(_.camelCase(method.tags[0].replace(/(-rest)?-controller/, '')));
}
//# sourceMappingURL=process-paths.js.map