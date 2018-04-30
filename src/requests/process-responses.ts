/**
 * Processing of custom types from `paths` section
 * in the schema
 */
import * as _ from 'lodash';

import {processProperty} from '../common';
import {HttpCode, HttpResponse} from '../types';

/**
 * Process all responses of one method
 * @param httpResponse response object
 * @param name of the context for type name uniqueness
 */
export function processResponses(httpResponse: HttpResponse, name: string) {
  const responses = _.filter(httpResponse, (r, status: HttpCode) => (
    r.schema && Math.floor(Number(status) / 100) === 2));
  const properties = _.map(responses, response => (
    processProperty(response.schema, undefined, name)
  ));

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
