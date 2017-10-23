"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Configuration constants */
const path_1 = require("path");
// relative to project root
exports.outDir = 'src/api';
exports.servicesDir = path_1.join(__dirname, '..', 'services');
exports.defsDir = 'defs';
exports.apiDir = 'controllers';
exports.apiFile = 'conf/api/api-docs.json';
exports.modelFile = 'model';
exports.indentation = 2;
// part of path in url
exports.swaggerFile = '/swagger-ui.html#!/';
// mapping from swagger native types to javascript types
exports.nativeTypes = {
    binary: 'number',
    boolean: 'boolean',
    byte: 'number',
    date: 'string',
    dateTime: 'string',
    double: 'number',
    file: 'File',
    float: 'number',
    integer: 'number',
    long: 'number',
    number: 'number',
    object: 'Object',
    password: 'string',
    string: 'string',
};
// list of parameter types accepted by methods
// ordered as they are passed to api service methods
exports.allowedParams = {
    get: ['path', 'query'],
    post: ['path', 'body', 'query', 'formData'],
    put: ['path', 'body', 'query'],
    delete: ['path'],
};
// list of simplified names of controllers
// that do not to generate api layer
exports.controllerIgnores = ['BackOffice'];
// implemented only for api
// once other one is needed, make it file-based
exports.adHocExceptions = {
    api: {
        Help: [/^  itemNumbers\?: ref;$/m, '  itemNumbers?: number[]'],
    },
};
//# sourceMappingURL=conf.js.map