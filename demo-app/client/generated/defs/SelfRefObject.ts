/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import * as __model from '../model';

export interface SelfRefObject {
  prop1?: string;
  parent?: __model.SelfRefObject;
  children?: __model.SelfRefObject[];
}
