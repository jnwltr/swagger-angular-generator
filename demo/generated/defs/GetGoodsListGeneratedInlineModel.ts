/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import * as __model from '../model';

export interface GetGoodsListGeneratedInlineModel {
  count: number;
  /** format: uri */
  next?: string;
  /** format: uri */
  previous?: string;
  results: __model.Goods[];
}
