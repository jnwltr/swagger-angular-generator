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
exports.processParams = processParams;
//# sourceMappingURL=process-params.js.map