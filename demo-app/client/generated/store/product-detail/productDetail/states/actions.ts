/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Action} from '@ngrx/store';
import {ProductDetailParams} from '../../../../controllers/ProductDetail';

export enum Actions {
  START = '[productDetail] Start',
  SUCCESS = '[productDetail] Success',
  ERROR = '[productDetail] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: ProductDetailParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: __model.ProductDetail) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: string) {}
}

export type ProductDetailAction = Start | Success | Error;
