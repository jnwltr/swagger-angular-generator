"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const conf = require("./conf");
const utils_1 = require("./utils");
/**
 * Processes one property of the type
 * @param prop property definition
 * @param name property name
 * @param namespace usage context for type name uniqueness
 */
function processProperty(prop, name = '', namespace = '', required = false, exportEnums = true) {
    let type;
    let enumDeclaration;
    let native = true;
    if (prop.enum || (prop.items && prop.items.enum)) {
        type = _.upperFirst(name);
        // file added to make the enum globally unique
        type += _.upperFirst(namespace);
        if (!type.match(/Enum/))
            type += 'Enum';
        const list = prop.enum || prop.items.enum;
        const exp = exportEnums ? 'export ' : '';
        enumDeclaration = `${exp}type ${type} =\n` + utils_1.indent('\'' + list.join('\' |\n\'')) + '\';';
        if (prop.type === 'array')
            type += '[]';
    }
    else {
        let defType;
        switch (prop.type) {
            case undefined:
                defType = translateType(prop.$ref);
                type = defType.type;
                break;
            case 'array':
                defType = translateType(prop.items.type || prop.items.$ref);
                if (defType.arraySimple)
                    type = `${defType.type}[]`;
                else
                    type = `Array<${defType.type}>`;
                break;
            default:
                if (prop.additionalProperties) {
                    const ap = prop.additionalProperties;
                    let additionalType;
                    utils_1.out('name: ' + name);
                    if (ap.type === 'array') {
                        defType = translateType(ap.items.type || ap.items.$ref);
                        additionalType = `${defType.type}[]`;
                    }
                    else {
                        defType = translateType(prop.additionalProperties.type ||
                            prop.additionalProperties.$ref);
                        additionalType = defType.type;
                    }
                    type = `{[key: string]: ${additionalType}}`;
                }
                else {
                    defType = translateType(prop.type);
                    type = defType.type;
                }
        }
        native = defType.native;
    }
    let optional = '';
    if (required === false)
        optional = '?';
    else if (Array.isArray(required) && !required.includes(name)) {
        optional = '?';
    }
    let readOnly = '';
    if (prop.readOnly)
        readOnly = 'readonly ';
    const comments = [];
    if (prop.description)
        comments.push(prop.description);
    if (prop.example)
        comments.push(`example: ${prop.example}`);
    if (prop.format)
        comments.push(`format: ${prop.format}`);
    if (prop.default)
        comments.push(`default: ${prop.default}`);
    const comment = utils_1.makeComment(comments);
    let property;
    let propertyAsMethodParameter;
    // pure type is returned if no name is specified
    if (name) {
        if (name.match(/-/))
            name = `'${name}'`;
        property = `${comment}${readOnly}${name}${optional}: ${type};`;
        propertyAsMethodParameter = `${name}${optional}: ${type}`;
    }
    else {
        property = `${type}`;
        propertyAsMethodParameter = property;
    }
    return { property, propertyAsMethodParameter, enumDeclaration, native, isRequired: optional !== '?' };
}
exports.processProperty = processProperty;
/**
 * - recursive inside-out unwrapping of generics
 * - space removal e.g.
 *   getFilename('PagedResources«Page«ItemCategoryDto»»') =>
 *               'ItemCategoryDtoPagePagedResources'
 * @param type original type name
 * @return normalized type name
 */
function normalizeDef(type) {
    let res = '';
    while (true) {
        const generic = type.match(/([^«]+)«(.+)»/);
        if (!generic) {
            break;
        }
        res = generic[1] + res;
        type = generic[2];
    }
    res = type + res;
    res = res.trim();
    res = res.replace(/\./g, ' ');
    if (res.match(/ /)) {
        res = _.camelCase(res);
    }
    res = _.upperFirst(res);
    return res;
}
exports.normalizeDef = normalizeDef;
/**
 * Translates schema type into native/defined type for typescript
 * @param type definition
 */
function translateType(type) {
    if (type in conf.nativeTypes) {
        const typeType = type;
        return {
            type: conf.nativeTypes[typeType],
            native: true,
            arraySimple: true,
        };
    }
    const subtype = type.match(/^#\/definitions\/(.*)/);
    if (subtype) {
        const generic = subtype[1].match(/([^«]+)«(.+)»/);
        // collection translates to array
        if (generic && generic[1] === 'Collection') {
            const resolvedType = resolveDefType(generic[2]);
            resolvedType.type += '[]';
            return resolvedType;
        }
        else if (generic && generic[1] === 'Map') {
            const map = generic[2].split(',');
            const record = `Record<${map[0]}, ${map[1]}>`;
            return { type: record, native: true, arraySimple: false };
        }
        return resolveDefType(subtype[1]);
    }
    return { type, native: true, arraySimple: true };
}
exports.translateType = translateType;
/**
 * Checks whether the type should reference internally defined type
 * and returns its reference to globally exported interfaces
 * @param type
 */
function resolveDefType(type) {
    // check direct native types for definitions and generics
    // does not seem to happen but the function is ready for that
    if (type in conf.nativeTypes) {
        const typedType = type;
        return {
            type: conf.nativeTypes[typedType],
            native: true,
            arraySimple: true,
        };
    }
    type = normalizeDef(type);
    return {
        type: `__${conf.modelFile}.${type}`,
        native: false,
        arraySimple: true,
    };
}
//# sourceMappingURL=common.js.map