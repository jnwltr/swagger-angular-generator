"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Processing of custom types from `paths` section
 * in the schema
 */
const _ = require("lodash");
const common_1 = require("../common");
const utils_1 = require("../utils");
/**
 * Transforms input parameters to interfaces definition
 * @param def definition
 * @param paramsType name of the type
 */
function processParams(def, paramsType) {
    let paramDef = '';
    let typesOnly = '';
    paramDef += `export interface ${paramsType} {\n`;
    const params = _.map(def, p => common_1.processProperty(parameterToSchema(p), p.name, paramsType, p.required)[0]);
    const isInterfaceEmpty = !params.length;
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
    params.sort((p1, p2) => (p1.isRequired ? 0 : 1) - (p2.isRequired ? 0 : 1));
    typesOnly = params.map(p => p.propertyAsMethodParameter).join(', ');
    return { paramDef, typesOnly, usesGlobalType, isInterfaceEmpty };
}
exports.processParams = processParams;
// TODO! use required array to set the variable
// TODO might be unnecessary for v3.0+ of OpenAPI spec
// https://swagger.io/specification/#parameterObject
function parameterToSchema(param) {
    return Object.assign({
        allowEmptyValue: param.allowEmptyValue,
        default: param.default,
        description: param.description,
        enum: param.enum,
        format: param.format,
        items: param.items,
        maximum: param.maximum,
        maxLength: param.maxLength,
        minimum: param.minimum,
        minLength: param.minLength,
        pattern: param.pattern,
        type: param.type,
        uniqueItems: param.uniqueItems,
    }, param.schema);
}
exports.parameterToSchema = parameterToSchema;
//# sourceMappingURL=process-params.js.map