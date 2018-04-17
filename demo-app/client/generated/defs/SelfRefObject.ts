/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import * as model from '../model';

export interface SelfRefObject {
  prop1?: string;
  parent?: model.SelfRefObject;
}
