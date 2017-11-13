"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Processing of custom types from `paths` section
 * in the schema
 */
const _ = require("lodash");
const common_1 = require("../common");
/**
 * Process all responses of one method
 * @param httpResponse response object
 * @param name of the context for type name uniqueness
 */
function processResponses(httpResponse, name) {
    const responses = _.filter(httpResponse, (r, status) => (r.schema && Math.floor(Number(status) / 100) === 2));
    const properties = _.map(responses, response => (common_1.processProperty(response.schema, undefined, `${name}`)));
    const property = _.map(properties, 'property');
    const enumDeclaration = _.map(properties, 'enumDeclaration').filter(Boolean).join('\n\n');
    const usesGlobalType = properties.some(p => !p.native);
    let type;
    if (property.length) {
        type = _.uniqWith(property, _.isEqual).join(' | ');
    }
    else {
        type = 'object';
    }
    return { type, enumDeclaration, usesGlobalType };
}
exports.processResponses = processResponses;
//# sourceMappingURL=process-responses.js.map