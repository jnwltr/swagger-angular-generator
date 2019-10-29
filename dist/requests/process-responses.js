"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Processing of custom types from `paths` section
 * in the schema
 */
const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const common_1 = require("../common");
const conf = require("../conf");
const definitions_1 = require("../definitions");
/**
 * Process all responses of one method
 * @param httpResponse response object
 * @param name of the context for type name uniqueness
 * @param config global config
 */
function processResponses(httpResponse, name, config) {
    const responses = _.filter(httpResponse, (r, status) => (r.schema && Math.floor(Number(status) / 100) === 2));
    let properties = [];
    for (const response of responses) {
        if (response.schema && response.schema.properties) {
            const processedDefinition = processNestedSchemaDefinition(response.schema, name, config);
            const propertyOutput = {
                property: `__model.${processedDefinition.name}`,
                propertyAsMethodParameter: '',
                enumDeclaration: undefined,
                native: false,
                isRequired: false,
            };
            properties.push(propertyOutput);
        }
        else {
            properties = properties.concat(common_1.processProperty(response.schema, undefined, name));
        }
    }
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
exports.processResponses = processResponses;
function processNestedSchemaDefinition(schema, name, config) {
    const processedDef = definitions_1.processDefinition(schema, `${name}GeneratedInlineModel`, config);
    const filename = path.join(config.dest, `${conf.modelFile}.ts`);
    const exportDefiniton = definitions_1.createExport(processedDef.name);
    fs.appendFileSync(filename, `${exportDefiniton}\n`);
    return processedDef;
}
//# sourceMappingURL=process-responses.js.map