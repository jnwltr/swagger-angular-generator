/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import * as __model from '../model';

export interface MapContent {
  control?: number;
  group?: __model.OrderDto;
  arrayOfObjects?: __model.ArrayOfObjects;
  mapRef?: __model.MapObject;
  mapInlinePrimitive?: {[key: string]: number};
  mapInlineRef?: {[key: string]: __model.OrderDto};
  arrayOfMaps?: __model.MapObject[];
}
