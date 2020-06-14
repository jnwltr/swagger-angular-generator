"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Processing of custom types from `paths` section
 * in the schema
 */
const lodash_1 = require("lodash");
const common_1 = require("../common");
const conf = require("../conf");
const utils_1 = require("../utils");
const process_params_1 = require("./process-params");
/**
 * Transforms method definition to typescript method
 * with single typed param object that is separated into several objects
 * and passed to api service
 * @param method data needed for method processing
 * @param unwrapSingleParamMethods boolean
 */
function processMethod(method, unwrapSingleParamMethods) {
    let methodDef = '';
    let interfaceDef = '';
    const url = method.url.replace(/{([^}]+)}/g, (_, key) => `\${${common_1.getAccessor(key, 'pathParams')}}`);
    const allowed = conf.allowedParams[method.methodName];
    let paramSeparation = [];
    let paramsSignature = '';
    let params;
    let usesGlobalType = false;
    let paramTypes = [];
    let paramGroups = {};
    let splitParamsMethod = '';
    const simpleName = method.simpleName;
    const methodName = method.methodName;
    if (method.paramDef) {
        const paramDef = method.paramDef.filter(df => allowed.includes(df.in));
        paramGroups = lodash_1.groupBy(paramDef, 'in');
        const paramsType = lodash_1.upperFirst(`${method.simpleName}Params`);
        const processedParams = process_params_1.processParams(paramDef, paramsType);
        paramTypes = Object.keys(paramGroups);
        paramSeparation = getParamSeparation(paramGroups);
        paramsSignature = getParamsSignature(processedParams, paramsType);
        usesGlobalType = processedParams.usesGlobalType;
        interfaceDef = getInterfaceDef(processedParams);
        if (unwrapSingleParamMethods && processedParams.typesOnly.length > 0 && paramDef.length === 1) {
            splitParamsMethod = getSplitParamsMethod(method, processedParams);
        }
    }
    params = getRequestParams(paramTypes, method.methodName);
    methodDef += '\n';
    methodDef += utils_1.makeComment([method.summary, method.description, method.swaggerUrl].filter(Boolean));
    methodDef += `${method.simpleName}(${paramsSignature}): Observable<${method.responseDef.type}> {\n`;
    // apply the param definitions, e.g. bodyParams
    methodDef += utils_1.indent(paramSeparation);
    if (paramSeparation.length)
        methodDef += '\n';
    const body = `return this.http.${method.methodName}<${method.responseDef.type}>` +
        `(\`${conf.apiUrlPrefix}${method.basePath}${url}\`${params});`;
    methodDef += utils_1.indent(body);
    methodDef += `\n`;
    methodDef += `}`;
    methodDef += splitParamsMethod;
    if (method.responseDef.enumDeclaration) {
        if (interfaceDef)
            interfaceDef += '\n';
        interfaceDef += `${method.responseDef.enumDeclaration}\n`;
    }
    const responseDef = method.responseDef;
    return { methodDef, interfaceDef, usesGlobalType, paramGroups, responseDef, simpleName, methodName };
}
exports.processMethod = processMethod;
function getSplitParamsMethod(method, processedParams) {
    let splitParamsMethod = '';
    const splitParamsSignature = getSplitParamsSignature(processedParams);
    splitParamsMethod += `\n${method.simpleName}_(${splitParamsSignature}): Observable<${method.responseDef.type}> {\n`;
    const propAssignments = getPropertyAssignments(method.paramDef);
    splitParamsMethod += utils_1.indent(`return this.${method.simpleName}(${propAssignments});\n`);
    splitParamsMethod += '}\n';
    return splitParamsMethod;
}
/**
 * Creates a definition of paramsSignature, which serves as input to http methods
 * @param processedParams
 * @param paramsType
 */
function getParamsSignature(processedParams, paramsType) {
    return !processedParams.isInterfaceEmpty ? `params: ${paramsType}` : '';
}
function getSplitParamsSignature(paramsOutput) {
    return paramsOutput.typesOnly;
}
function getPropertyAssignments(params) {
    return '{' + params.map(p => p.name).join(', ') + '}';
}
/**
 * Creates a definition of interfaceDef, which defines interface for the http method input
 * @param processedParams
 */
function getInterfaceDef(processedParams) {
    return !processedParams.isInterfaceEmpty ? processedParams.paramDef : '';
}
/**
 * Creates a definition of pathParams, bodyParams, queryParms or formDataParams
 * @param paramGroups
 */
function getParamSeparation(paramGroups) {
    return lodash_1.map(paramGroups, (group, groupName) => {
        let baseDef;
        let def;
        const list = lodash_1.map(group, p => {
            // header params values need to be strings
            let suffix;
            if (groupName === 'header' && p.type !== 'string')
                suffix = '.toString()';
            else if (groupName === 'query' && p.type === 'array') {
                let separator;
                if (p.collectionFormat === 'ssv')
                    separator = ' ';
                else if (p.collectionFormat === 'tsv')
                    separator = '\\t';
                else if (p.collectionFormat === 'pipes')
                    separator = '|';
                else if (['csv', undefined].includes(p.collectionFormat))
                    separator = ',';
                if (separator)
                    suffix = `.join('${separator}')`;
            }
            else
                suffix = '';
            return common_1.getObjectPropSetter(p.name, 'params', suffix);
        });
        if (groupName === 'query') {
            baseDef = '{\n' + utils_1.indent(list) + '\n};';
            def = `const queryParamBase = ${baseDef}\n\n`;
            def += 'let queryParams = new HttpParams();\n';
            def += 'Object.entries(queryParamBase).forEach(([key, value]: [string, any]) => {\n';
            def += '  if (value !== undefined) {\n';
            def += '    if (typeof value === \'string\') queryParams = queryParams.set(key, value);\n';
            // `collectionFormat` set to multi viz. https://swagger.io/docs/specification/2-0/describing-parameters/
            def += '    else if (Array.isArray(value)) value.forEach(v => queryParams = queryParams.append(key, v));\n';
            def += '    else queryParams = queryParams.set(key, JSON.stringify(value));\n';
            def += '  }\n';
            def += '});\n';
            return def;
        }
        if (groupName === 'formData') {
            def = `const ${groupName}Params = new FormData();\n`;
            group.forEach(g => {
                def += `${groupName}Params.append('${g.name}', params.${g.name});\n`;
            });
            return def;
        }
        if (groupName === 'body') {
            // when the schema: { '$ref': '#/definitions/exampleDto' } construct is used
            if ('schema' in group[0]) {
                def = `params.${group[0].name};`;
            }
            else {
                def = '{\n' + utils_1.indent(list) + '\n};';
            }
            return `const ${groupName}Params = ${def}\n`;
        }
        def = '{\n' + utils_1.indent(list) + '\n}';
        if (groupName === 'header') {
            def = `new HttpHeaders(${def})`;
        }
        def += ';';
        return `const ${groupName}Params = ${def}`;
    });
}
/**
 * Returns a list of additional params for http client call invocation
 * @param paramTypes list of params types
 * @param methodName name of http method to invoke
 */
function getRequestParams(paramTypes, methodName) {
    let res = '';
    if (['post', 'put', 'patch'].includes(methodName)) {
        if (paramTypes.includes('body')) {
            res += ', bodyParams || {}';
        }
        else if (paramTypes.includes('formData')) {
            res += ', formDataParams';
        }
        else {
            res += ', {}';
        }
    }
    const optionParams = [];
    if (paramTypes.includes('query')) {
        optionParams.push('params: queryParams');
    }
    if (paramTypes.includes('header')) {
        optionParams.push('headers: headerParams');
    }
    if (optionParams.length)
        res += `, {${optionParams.join(', ')}}`;
    return res;
}
//# sourceMappingURL=process-method.js.map