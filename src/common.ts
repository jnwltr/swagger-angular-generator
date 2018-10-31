import * as _ from 'lodash';
import {isValidPropertyName} from 'tsutils';

import * as conf from './conf';
import {NativeNames, Schema} from './types';
import {indent, makeComment} from './utils';

export interface PropertyOutput {
  property: string;
  propertyAsMethodParameter: string;
  enumDeclaration: string;
  native: boolean;
  isRequired: boolean;
}

/**
 * Processes one property of the type
 * @param prop property definition
 * @param name property name
 * @param namespace usage context for type name uniqueness
 */
export function processProperty(prop: Schema, name = '', namespace = '',
                                required: (string[] | boolean) = false,
                                exportEnums = true): PropertyOutput[] {
  let type: string;
  let enumDeclaration: string;
  let native = true;
  let isMap = false;

  if (prop.properties) {
    return _.flatMap(prop.properties, (v, k) => processProperty(v, k, namespace, prop.required));
  }

  if (prop.enum || (prop.items && prop.items.enum)) {
    type = _.upperFirst(name);
    // file added to make the enum globally unique
    type += _.upperFirst(namespace);
    if (!type.match(/Enum/)) type += 'Enum';

    const list = prop.enum || prop.items.enum;
    const exp = exportEnums ? 'export ' : '';

    let enumValues;
    if (typeof list[0] === 'number') {
      enumValues = indent(list.join(' |\n'));
    } else {
      enumValues = indent('\'' + list.join('\' |\n\'')) + '\'';
    }

    enumDeclaration = `${exp}type ${type} =\n${enumValues};`;

    if (prop.type === 'array') type += '[]';
  } else {
    let defType: DefType;
    switch (prop.type) {
      case undefined:
        defType = translateType(prop.$ref);
        type = defType.type;
        break;
      case 'array':
        defType = translateType(prop.items.type || prop.items.$ref);
        if (defType.arraySimple) type = `${defType.type}[]`;
        else type = `Array<${defType.type}>`;
        break;
      default:
        if (prop.additionalProperties) {
          const ap = prop.additionalProperties;
          let additionalType: string;
          if (ap.type === 'array') {
            defType = translateType(ap.items.type || ap.items.$ref);
            additionalType = `${defType.type}[]`;
          } else {
            defType = translateType(
              prop.additionalProperties.type ||
              prop.additionalProperties.$ref);
            additionalType = defType.type;
          }
          if (name) {
            type = `{[key: string]: ${additionalType}}`;
          } else {
            name = '[key: string]';
            type = additionalType;
            isMap = true;
          }
        } else {
          defType = translateType(prop.type);
          type = defType.type;
        }
    }

    native = defType.native;
  }

  let optional = '';
  if (required === false && !isMap) optional = '?';
  else if (Array.isArray(required) && !required.includes(name)) {
    optional = '?';
  }

  let readOnly = '';
  if (prop.readOnly) readOnly = 'readonly ';

  const comments = [];
  if (prop.description) comments.push(prop.description);
  if (prop.example) comments.push(`example: ${prop.example}`);
  if (prop.format) comments.push(`format: ${prop.format}`);
  if (prop.default) comments.push(`default: ${prop.default}`);

  const comment = makeComment(comments);
  let property;
  let propertyAsMethodParameter;

  // pure type is returned if no name is specified
  if (name) {
    if (!isMap) name = getAccessor(name);
    property = `${comment}${readOnly}${name}${optional}: ${type};`;
    propertyAsMethodParameter = `${name}${optional}: ${type}`;
  } else {
    property = `${type}`;
    propertyAsMethodParameter = property;
  }

  return [{property, propertyAsMethodParameter, enumDeclaration, native, isRequired: optional !== '?'}];
}

/**
 * - recursive inside-out unwrapping of generics
 * - space removal e.g.
 *   getFilename('PagedResources«Page«ItemCategoryDto»»') =>
 *               'ItemCategoryDtoPagePagedResources'
 * @param type original type name
 * @return normalized type name
 */
export function normalizeDef(type: string): string {
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

interface DefType {
  type: string;
  native: boolean;
  arraySimple: boolean;
}

/**
 * Translates schema type into native/defined type for typescript
 * @param type definition
 */
export function translateType(type: string): DefType {
  if (type in conf.nativeTypes) {
    const typeType = type as NativeNames;
    return {
      type: conf.nativeTypes[typeType],
      native: true,
      arraySimple: true,
    };
  }

  const subtype = type.match(/^#\/definitions\/(.*)/);
  if (subtype) return resolveDefType(subtype[1]);

  return {type, native: true, arraySimple: true};
}

/**
 * Checks whether the type should reference internally defined type
 * and returns its reference to globally exported interfaces
 * @param type
 */
function resolveDefType(type: string): DefType {
  // check direct native types for definitions and generics
  // does not seem to happen but the function is ready for that
  if (type in conf.nativeTypes) {
    const typedType = type as NativeNames;
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

export function getAccessor(key: string, propName = '') {
  let res = key;

  if (isValidPropertyName(key)) {
    if (propName) return `${propName}.${res}`;
    return res;
  }

  res = `'${res}'`;
  if (propName) return `${propName}[${res}]`;
  return res;
}

export function getObjectPropSetter(key: string, propName: string, suffix = '') {
  return `${getAccessor(key)}: ${getAccessor(key, propName)}${suffix},`;
}
