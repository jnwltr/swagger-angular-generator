"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// relative to project root
exports.outDir = 'src/api';
exports.commonDir = 'common';
exports.defsDir = 'defs';
exports.apiDir = 'controllers';
exports.storeDir = 'store';
exports.stateDir = 'states';
exports.apiFile = 'conf/api/api-docs.json';
exports.modelFile = 'model';
exports.indentation = 2;
exports.swaggerUrlPath = '/swagger';
exports.omitVersion = false;
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
    object: 'object',
    password: 'string',
    string: 'string',
};
// list of parameter types accepted by methods
// ordered as they are passed to api service methods
// The 'parameters: []' type is only technical and serves for situations when common parameters are defined
// on the same level as HTTP methods
exports.allowedParams = {
    get: ['path', 'query', 'header'],
    patch: ['path', 'body', 'query', 'formData', 'header'],
    post: ['path', 'body', 'query', 'formData', 'header'],
    put: ['path', 'body', 'query', 'header'],
    delete: ['path', 'header'],
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