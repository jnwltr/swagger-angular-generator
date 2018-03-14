/**
 * Processing of custom types from `paths` section
 * in the schema
 */
import * as _ from 'lodash';

import {processProperty} from '../common';
import {Parameter} from '../types';
import {indent} from '../utils';

export interface ProcessParamsOutput {
  paramDef: string;
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
  paramDef += `export interface ${paramsType} {\n`;

  const params = _.map(def, p => processProperty({
      // TODO(janwalter) might be unnecessary for v3.0+ of OpenAPI spec
      // https://swagger.io/specification/#parameterObject
      ...{
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
      },
      ...p.schema, // move level up so inside $ref is present if defined
    },
    p.name, paramsType, p.required),
  );

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

  return {paramDef, usesGlobalType, isInterfaceEmpty};
}
