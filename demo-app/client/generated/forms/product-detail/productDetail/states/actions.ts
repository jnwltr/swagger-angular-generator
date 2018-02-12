/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Action} from '@ngrx/store';
import * as model from '../../../../model';

export const LOAD_PRODUCTDETAIL_PRODUCTDETAIL_START = '[ProductDetail] Load ProductDetail';
export const LOAD_PRODUCTDETAIL_PRODUCTDETAIL_SUCCESS = '[ProductDetail] Load ProductDetail Success';
export const LOAD_PRODUCTDETAIL_PRODUCTDETAIL_ERROR = '[ProductDetail] Load ProductDetail Error';

export class LoadProductDetailProductDetailStart implements Action {
  readonly type = LOAD_PRODUCTDETAIL_PRODUCTDETAIL_START;
  constructor(public payload: ProductDetailParams) {}
}

export class LoadProductDetailProductDetailSuccess implements Action {
  readonly type = LOAD_PRODUCTDETAIL_PRODUCTDETAIL_SUCCESS;
  constructor(public payload: model.ProductDetail) {}
}

export class LoadProductDetailProductDetailError implements Action {
  readonly type = LOAD_PRODUCTDETAIL_PRODUCTDETAIL_ERROR;
  constructor(public payload: string) {}
}

export type AllLoadProductDetailProductDetailActions
  = LoadProductDetailProductDetailStart
  | LoadProductDetailProductDetailSuccess
  | LoadProductDetailProductDetailError;
