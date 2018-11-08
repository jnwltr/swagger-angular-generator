/**
 * Processing of custom types from `paths` section
 * in the schema
 */
import * as _ from 'lodash';

import * as fs from 'fs';
import * as path from 'path';
import {processProperty, PropertyOutput} from '../common';
import * as conf from '../conf';
import {createExport, processDefinition, ProcessedDefinition} from '../definitions';
import {Config} from '../generate';
import {HttpCode, HttpResponse, Schema} from '../types';

/**
 * Process all responses of one method
 * @param httpResponse response object
 * @param name of the context for type name uniqueness
 * @param config global config
 */
export function processResponses(httpResponse: HttpResponse, name: string, config: Config) {
  const responses = _.filter(httpResponse, (r, status: HttpCode) => (
    r.schema && Math.floor(Number(status) / 100) === 2));
  let properties: PropertyOutput[] = [];

  for (const response of responses) {
    if (response.schema && response.schema.properties) {
      const processedDefinition = processNestedSchemaDefinition(response.schema, name, config);
      const propertyOutput: PropertyOutput = {
        property: `__model.${processedDefinition.name}`,
        propertyAsMethodParameter: '',
        enumDeclaration: undefined,
        native: false,
        isRequired: false,
      };
      properties.push(propertyOutput);
    } else {
      properties = properties.concat(processProperty(response.schema, undefined, name));
    }
  }

  const property = _.map(properties, 'property');
  const enumDeclaration = _.map(properties, 'enumDeclaration').filter(Boolean).join('\n\n');
  const usesGlobalType = properties.some(p => !p.native);

  let type: string;
  if (property.length) {
    type = _.uniqWith(property, _.isEqual).join(' | ');
  } else {
    type = 'void';
  }

  return {type, enumDeclaration, usesGlobalType};
}

function processNestedSchemaDefinition(schema: Schema, name: string, config: Config): ProcessedDefinition {
  const processedDef = processDefinition(schema, `${name}GeneratedInlineModel`, config);
  const filename = path.join(config.dest, `${conf.modelFile}.ts`);
  const exportDefiniton = createExport(processedDef.name);
  fs.appendFileSync(filename, `${exportDefiniton}\n`);

  return processedDef;
}
