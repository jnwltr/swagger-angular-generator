/**
 * Processing of custom types from `paths` section
 * in the schema
 */
import * as _ from 'lodash';

import {processProperty} from '../common';
import {Parameter, Schema} from '../types';
import {indent} from '../utils';

export interface ProcessParamsOutput {
  paramDef: string;
  typesOnly: string;
  usesGlobalType: boolean;
  isInterfaceEmpty: boolean;
}

/**
 * Transforms input parameters to interfaces definition
 * @param def definition
 * @param paramsType name of the type
 */
export function processParams(def: Parameter[], paramsType: string): ProcessParamsOutput {
  let paramDef = '';
  let typesOnly = '';

  paramDef += `export interface ${paramsType} {\n`;

  const params = _.map(def, p => processProperty(
    parameterToSchema(p), p.name, paramsType, p.required)[0]);
  const isInterfaceEmpty = !params.length;
  const usesGlobalType = params.some(p => !p.native);

  paramDef += indent(_.map(params, 'property') as string[]);
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

  return {paramDef, typesOnly, usesGlobalType, isInterfaceEmpty};
}

// TODO! use required array to set the variable
// TODO might be unnecessary for v3.0+ of OpenAPI spec
// https://swagger.io/specification/#parameterObject
export function parameterToSchema(param: Parameter): Schema {
  return {
    ...{
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
    },
    ...param.schema, // move level up
  };
}
