/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {ProductDetailParams} from '../../../../controllers/ProductDetail';
import * as __model from '../../../../model';

export enum Actions {
  START = '[ProductDetail productDetail] Start',
  SUCCESS = '[ProductDetail productDetail] Success',
  ERROR = '[ProductDetail productDetail] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: ProductDetailParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: HttpResponse<__model.ProductDetail>) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type ProductDetailAction = Start | Success | Error;
