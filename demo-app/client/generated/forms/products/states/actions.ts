/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {Action} from '@ngrx/store';
import {ProductsParams} from '../../../controllers/Products';

export const LOAD_PRODUCTS_PRODUCTS_START = '[Products] Load Products';
export const LOAD_PRODUCTS_PRODUCTS_SUCCESS = '[Products] Load Products Success';
export const LOAD_PRODUCTS_PRODUCTS_ERROR = '[Products] Load Products Error';

export class LoadProductsProductsStart implements Action {
  readonly type = LOAD_PRODUCTS_PRODUCTS_START;
  constructor(public payload: ProductsParams) {
  }
}

export class LoadProductsProductsSuccess implements Action {
  readonly type = LOAD_PRODUCTS_PRODUCTS_SUCCESS;
  constructor(public payload: model.Products) {
  }
}

export class LoadProductsProductsError implements Action {
  readonly type = LOAD_PRODUCTS_PRODUCTS_ERROR;
  constructor(public payload: string) {
  }
}

export type AllLoadProductsProductsActions
  = LoadProductsProductsStart
  | LoadProductsProductsSuccess
  | LoadProductsProductsError;
