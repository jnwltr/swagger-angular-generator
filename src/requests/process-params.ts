/**
 * Processing of custom types from `paths` section
 * in the schema
 */
import * as _ from 'lodash';

import {processProperty} from '../common';
import {Parameter} from '../types';
import {indent} from '../utils';

/**
 * Transforms input parameters to interfaces definition
 * @param def definition
 * @param paramsType name of the type
 */
export function processParams(def: Parameter[], paramsType: string) {
  let paramDef = '';
  paramDef += `export interface ${paramsType} {\n`;

  const params = _.map(def, p => processProperty({
    // TODO(janwalter) might be unnecessary for v3.0+ of OpenAPI spec
    // https://swagger.io/specification/#parameterObject
    ...{
      enum: p.enum,
      items: p.items,
      type: p.type,
      description: p.description,
      format: p.format,
    },
    ...p.schema, // move level up
    }, p.name, paramsType, p.required),
  );

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

  return {paramDef, usesGlobalType};
}
