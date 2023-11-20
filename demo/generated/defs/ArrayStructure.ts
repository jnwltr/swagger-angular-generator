/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import * as __model from '../model';

/** Array testing structure */
export interface ArrayStructure {
  arrayObjectRef: __model.OrderDto[];
  arrayStringInline: string[];
  arrayArrayStringsRef: __model.ArrayOfStrings[];
  arrayArrayObjectRef: __model.ArrayOfObjects[];
  nestedArray: string[][];
  nestedRefsArray: __model.ArrayOfObjects[][];
}
