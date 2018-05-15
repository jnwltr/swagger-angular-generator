"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Processing of custom types from `paths` section
 * in the schema
 */
const _ = require("lodash");
const conf = require("../conf");
const process_controller_1 = require("./process-controller");
/**
 * Entry point, processes all possible api requests and exports them
 * to files devided ty controllers (same as swagger web app sections)
 * @param pathsWithParameters paths from the schema
 * @param swaggerPath swagger base url
 * @param config global configs
 * @param definitions
 * @param basePath base URL path
 */
function processPaths(pathsWithParameters, swaggerPath, config, definitions, basePath) {
    const paths = preProcessPaths(pathsWithParameters);
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
        basePath,
    }))));
    const controllerFiles = _.groupBy(controllers, 'name');
    conf.controllerIgnores.forEach(key => delete controllerFiles[key]);
    _.forEach(controllerFiles, (methods, name) => process_controller_1.processController(methods, name, config, definitions));
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
/**
 * Returns name of the method
 * @param method
 */
function getName(method) {
    return _.upperFirst(_.camelCase(method.tags[0].replace(/(-rest)?-controller/, '')));
}
/**
 * One of the allowed swagger formats is that under given url, there can be methods like get, post, put etc., but also
 * parameters that often defines a path parameter common for the HTTP methods.
 * This method extends HTTP method (get, post ...) parameters with the above mentioned parameters
 * @param paths
 */
function preProcessPaths(paths) {
    Object.values(paths).forEach(pathValue => {
        if (pathValue.parameters) {
            Object.keys(pathValue).forEach(key => {
                if (key === 'parameters')
                    return;
                const method = pathValue[key];
                method.parameters = method.parameters.concat(pathValue.parameters);
            });
        }
        delete pathValue.parameters;
    });
    return paths;
}
//# sourceMappingURL=process-paths.js.map