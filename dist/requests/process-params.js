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
    paramDef += `export interface ${paramsType} {\n`;
    const params = _.map(def, p => common_1.processProperty(Object.assign({
        allowEmptyValue: p.allowEmptyValue,
        default: p.default,
        description: p.description,
        enum: p.enum,
        format: p.format,
        items: p.items,
        maximum: p.maximum,
        maxLength: p.maxLength,
        minimum: p.minimum,
        minLength: p.minLength,
        pattern: p.pattern,
        type: p.type,
        uniqueItems: p.uniqueItems,
    }, p.schema), p.name, paramsType, p.required));
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
    return { paramDef, usesGlobalType, isInterfaceEmpty };
}
exports.processParams = processParams;
//# sourceMappingURL=process-params.js.map