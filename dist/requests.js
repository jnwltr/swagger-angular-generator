"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Processing of custom types from `paths` section
 * in the schema
 */
const _ = require("lodash");
const path = require("path");
const common_1 = require("./common");
const conf = require("./conf");
const utils_1 = require("./utils");
/**
 * Entry point, processes all possible api requests and exports them
 * to files devided ty controllers (same as swagger web app sections)
 * @param paths paths from the schema
 * @param swaggerPath swagger base url
 */
function processPaths(paths, swaggerPath, header) {
    utils_1.emptyDir(path.join(conf.outDir, conf.apiDir));
    const controllers = _.flatMap(paths, (methods, url) => (_.map(methods, (method, methodName) => ({
        url,
        name: _.upperFirst(_.camelCase(method.tags[0].replace(/(-rest)?-controller/, ''))),
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
    _.forEach(controllerFiles, (methods, name) => processController(methods, name, header));
}
exports.processPaths = processPaths;
/**
 * Creates and serializes class for api communication for controller
 * @param controllers list of methods of the controller
 * @param name
 */
function processController(methods, name, header) {
    const filename = path.join(conf.outDir, conf.apiDir, `${name}.ts`);
    let usesGlobalType = false;
    // make simpleNames unique and process responses
    const simpleNames = _.map(methods, 'simpleName');
    methods.forEach(controller => {
        if (simpleNames.filter(n => n === controller.simpleName).length > 1) {
            controller.simpleName = controller.operationId;
        }
        controller.responseDef = processResponses(controller.responses, controller.simpleName);
        usesGlobalType = usesGlobalType || controller.responseDef.usesGlobalType;
    });
    const processedMethods = methods.map(processMethod);
    usesGlobalType = usesGlobalType || processedMethods.some(c => c.usesGlobalType);
    let content = '';
    content += 'import { Injectable } from \'@angular/core\';\n';
    content += 'import { Observable } from \'rxjs/Observable\';\n';
    content += '\n';
    if (usesGlobalType) {
        content += `import * as ${conf.modelFile} from \'../${conf.modelFile}\';\n`;
    }
    content += 'import { ApiService } from \'../services/api\';\n';
    content += '\n';
    const interfaceDef = _.map(processedMethods, 'interfaceDef').filter(Boolean).join('\n');
    if (interfaceDef) {
        content += interfaceDef;
        content += '\n';
    }
    content += `@Injectable()\n`;
    content += `export class ${name}Service {\n`;
    content += utils_1.indent('constructor(private apiService: ApiService) {}');
    content += '\n';
    content += utils_1.indent(_.map(processedMethods, 'methodDef').join('\n\n'));
    content += '\n}\n';
    if (conf.adHocExceptions.api[name]) {
        content = content.replace(conf.adHocExceptions.api[name][0], conf.adHocExceptions.api[name][1]);
    }
    utils_1.writeFile(filename, content, header);
}
/**
 * Process all responses of one method
 * @param input response object
 * @param name of the context for type name uniqueness
 */
function processResponses(input, name) {
    const responses = _.filter(input, 'schema');
    const properties = _.map(responses, response => (common_1.processProperty(response.schema, undefined, `${name}`)));
    const property = _.map(properties, 'property');
    const enumDeclaration = _.map(properties, 'enumDeclaration').filter(Boolean).join('\n\n');
    const usesGlobalType = properties.some(p => !p.native);
    let type;
    if (property.length) {
        type = _.uniqWith(property, _.isEqual).join(' | ');
    }
    else {
        type = 'void';
    }
    return { type, enumDeclaration, usesGlobalType };
}
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
    if (method.paramDef) {
        const paramDef = method.paramDef.filter(df => allowed.indexOf(df.in) >= 0);
        const paramGroups = _.groupBy(paramDef, 'in');
        paramSeparation = _.map(paramGroups, (group, groupName) => {
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
        const paramsType = _.upperFirst(`${method.simpleName}Params`);
        paramsSignature = `params: ${paramsType}`;
        const processedParams = processParams(paramDef, paramsType);
        usesGlobalType = processedParams.usesGlobalType;
        interfaceDef = processedParams.paramDef;
        allowed.forEach((ap) => {
            // empty declaration
            if (!paramGroups[ap] && (ap !== 'path' || url !== method.url)) {
                paramSeparation.push(`const ${ap}Params: object = undefined;`);
            }
            // path params are interpolated directly in url
            if (ap !== 'path') {
                params += `, ${ap}Params`;
            }
        });
    }
    methodDef += '\n';
    methodDef += utils_1.makeComment([
        method.summary, method.description, method.swaggerUrl,
    ].filter(Boolean));
    if (method.responseDef.enumDeclaration) {
        if (interfaceDef) {
            interfaceDef += '\n';
        }
        interfaceDef += method.responseDef.enumDeclaration + '\n';
    }
    methodDef += `${method.simpleName}(${paramsSignature}): Observable<` +
        `${method.responseDef.type}> {\n`;
    methodDef += utils_1.indent(paramSeparation);
    if (paramSeparation.length) {
        methodDef += '\n';
    }
    const body = `return this.apiService.${method.methodName}(\`${url}\`${params});`;
    methodDef += utils_1.indent(body);
    methodDef += `\n`;
    methodDef += `}`;
    return { methodDef, interfaceDef, usesGlobalType };
}
/**
 * Transforms input parameters to interfaces definition
 * @param def definition
 * @param paramsType name of the type
 */
function processParams(def, paramsType) {
    let paramDef = '';
    paramDef += `export interface ${paramsType} {\n`;
    const params = _.map(def, p => common_1.processProperty(Object.assign({
        enum: p.enum,
        items: p.items,
        type: p.type,
        description: p.description,
        format: p.format,
    }, p.schema), p.name, paramsType, p.required));
    const usesGlobalType = params.some(p => !p.native);
    paramDef += utils_1.indent(_.map(params, 'property'));
    paramDef += `\n`;
    paramDef += `}\n`;
    const enums = _.map(params, 'enumDeclaration').filter(Boolean);
    if (enums.length) {
        paramDef += `\n`;
        paramDef += enums.join('\n\n');
        paramDef += `\n`;
    }
    return { paramDef, usesGlobalType };
}
/**
 * Returns simple name from last static URL segment
 * example: `/accounts/${accountId}/updateMothersName` => `updateMothersName`
 * @param url
 */
function getSimpleName(url) {
    // remove url params
    let method = url.replace(/\/{[^}]+}/g, '');
    // take trailing url folder
    method = method.replace(/(.*\/)*/, '');
    return method;
}
//# sourceMappingURL=requests.js.map