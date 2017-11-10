"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Processing of custom types from `paths` section
 * in the schema
 */
const _ = require("lodash");
const conf = require("../conf");
const utils_1 = require("../utils");
const process_params_1 = require("./process-params");
/**
 * Transforms method definition to typescript method
 * with single typed param object that is separated into several objects
 * and passed to api service
 * @param controller
 */
function processMethod(method) {
    let methodDef = '';
    let interfaceDef = '';
    const url = method.url.replace(/\/{([^}]+})/g, '/$${pathParams.$1');
    const allowed = conf.allowedParams[method.methodName];
    let paramSeparation = [];
    let paramsSignature = '';
    let params = '';
    let usesGlobalType = false;
    let paramTypes = [];
    if (method.paramDef) {
        const paramDef = method.paramDef.filter(df => allowed.includes(df.in));
        const paramGroups = _.groupBy(paramDef, 'in');
        const paramsType = _.upperFirst(`${method.simpleName}Params`);
        const processedParams = process_params_1.processParams(paramDef, paramsType);
        paramTypes = Object.keys(paramGroups);
        paramSeparation = getParamSeparation(paramGroups);
        paramsSignature = `params: ${paramsType}`;
        usesGlobalType = processedParams.usesGlobalType;
        interfaceDef = processedParams.paramDef;
        params += getRequestParams(paramTypes, method.methodName);
    }
    methodDef += '\n';
    methodDef += utils_1.makeComment([method.summary, method.description, method.swaggerUrl].filter(Boolean));
    interfaceDef = getIntefaceObjectDeclaration(interfaceDef, method);
    // define method name
    methodDef += `${method.simpleName}(${paramsSignature}): Observable<${method.responseDef.type}> {\n`;
    // apply the param definitions, e.g. bodyParams
    methodDef += utils_1.indent(paramSeparation);
    if (paramSeparation.length) {
        methodDef += '\n';
    }
    if (paramTypes.includes('query')) {
        methodDef += `\n`;
        methodDef += utils_1.indent(assignQueryParamsObject());
        methodDef += `\n`;
    }
    const body = `return this.http.${method.methodName}<${method.responseDef.type}>(\`${url}\`${params});`;
    methodDef += utils_1.indent(body);
    methodDef += `\n`;
    methodDef += `}`;
    return { methodDef, interfaceDef, usesGlobalType };
}
exports.processMethod = processMethod;
/**
 * Creates a definition of pathParams, bodyParams, queryParms or formDataParams
 * @param paramGroups
 */
function getParamSeparation(paramGroups) {
    return _.map(paramGroups, (group, groupName) => {
        let def;
        // only one direct body parameter is allowed
        // 1st one taken if more of them present
        if (groupName === 'body') {
            def = `params.${group[0].name};`;
        }
        else {
            const list = _.map(group, p => `${p.name}: params.${p.name},`);
            def = '{\n' + utils_1.indent(list) + '\n};';
        }
        return `const ${groupName}Params = ${def}`;
    });
}
// return the definition of intefrace objects
function getIntefaceObjectDeclaration(interfaceDef, method) {
    if (method.responseDef.enumDeclaration) {
        if (interfaceDef) {
            interfaceDef += '\n';
        }
        interfaceDef += method.responseDef.enumDeclaration + '\n';
    }
    return interfaceDef;
}
function assignQueryParamsObject() {
    let assignQueryParamsDef = '';
    assignQueryParamsDef += `const httpQueryParams = new HttpParams();\n`;
    assignQueryParamsDef += `Object.keys(queryParams).forEach(key => httpQueryParams.append(key, queryParams[key]));\n`;
    return assignQueryParamsDef;
}
// TODO! recheck with original code, allowed params logic lost???
function getRequestParams(paramTypes, methodName) {
    let res = '';
    if (['post', 'put', 'patch'].includes(methodName)) {
        if (paramTypes.includes('body')) {
            res += `, bodyParams`;
        }
        else if (paramTypes.includes('formData')) {
            res += `, formDataParams`;
        }
        else {
            res += `, {}`;
        }
    }
    if (paramTypes.includes('query')) {
        res += `, {params: httpQueryParams}`;
    }
    return res;
}
//# sourceMappingURL=process-method.js.map