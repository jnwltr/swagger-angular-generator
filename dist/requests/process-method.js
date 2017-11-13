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
    let paramGroupNameArray = [];
    if (method.paramDef) {
        const paramDef = method.paramDef.filter(df => allowed.indexOf(df.in) >= 0);
        const paramGroups = _.groupBy(paramDef, 'in');
        const paramSeparationResult = getParamSeparation(paramGroups);
        paramSeparation = paramSeparationResult[0];
        paramGroupNameArray = paramSeparationResult[1];
        const paramsType = _.upperFirst(`${method.simpleName}Params`);
        paramsSignature = `params: ${paramsType}`;
        const processedParams = process_params_1.processParams(paramDef, paramsType);
        usesGlobalType = processedParams.usesGlobalType;
        interfaceDef = processedParams.paramDef;
        params += getRequestParams(paramGroupNameArray, method, params);
    }
    methodDef += '\n';
    methodDef += utils_1.makeComment([method.summary, method.description, method.swaggerUrl].filter(Boolean));
    interfaceDef = getIntefaceObjectDeclaration(interfaceDef, method);
    // define method name
    methodDef += `${method.simpleName}(${paramsSignature}): Observable<` + `any> {\n`;
    // apply the param definitions, e.g. bodyParams
    methodDef += utils_1.indent(paramSeparation);
    if (paramSeparation.length) {
        methodDef += '\n';
    }
    if (paramGroupNameArray.indexOf('query') !== -1) {
        methodDef += utils_1.indent(assignQueryParamsObject());
        methodDef += `\n`;
    }
    const body = `return this.http.${method.methodName}(\`${url}\`${params});`;
    methodDef += utils_1.indent(body);
    methodDef += `\n`;
    methodDef += `}`;
    return { methodDef, interfaceDef, usesGlobalType };
}
exports.processMethod = processMethod;
// creates a definition of pathParams, bodyParams, queryParms or formDataParams
function getParamSeparation(paramGroups) {
    /* groupName is e.g. 'body'
       group is e.g. [ { in: 'body',
                         name: 'pointDto',
                         description: 'pointDto',
                         required: true,
                         schema: { '$ref': '#/definitions/PointDto' } } ]
    */
    const paramGroupNameArray = [];
    const paramSeaparation = _.map(paramGroups, (group, groupName) => {
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
        paramGroupNameArray.push(groupName);
        return `const ${groupName}Params = ${def}`;
    });
    return [paramSeaparation, paramGroupNameArray];
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
    assignQueryParamsDef += `\n`;
    assignQueryParamsDef += `const httpQueryParams = new HttpParams();`;
    assignQueryParamsDef += `\n`;
    assignQueryParamsDef += `Object.keys(queryParams).forEach(key => httpQueryParams.append(key, queryParams[key]));`;
    assignQueryParamsDef += `\n`;
    return assignQueryParamsDef;
}
function getRequestParams(paramGroupNameArray, method, params) {
    if (['post', 'put', 'patch'].indexOf(method.methodName) !== -1) {
        if (paramGroupNameArray.indexOf('body') !== -1) {
            params += `, JSON.stringify(bodyParams)`;
        }
        else if (paramGroupNameArray.indexOf('formData') !== -1) {
            params += `, JSON.stringify(formDataParams)`;
        }
        else {
            params += `, JSON.stringify({})`;
        }
    }
    if (paramGroupNameArray.indexOf('query') !== -1) {
        params += `, {params: httpQueryParams}`;
    }
    return params;
}
//# sourceMappingURL=process-method.js.map