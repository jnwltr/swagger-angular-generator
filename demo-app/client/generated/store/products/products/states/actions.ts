/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Action} from '@ngrx/store';
import {ProductsParams} from '../../../../controllers/Products';

export enum Actions {
  START = '[products] Start',
  SUCCESS = '[products] Success',
  ERROR = '[products] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: ProductsParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: __model.Products) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: string) {}
}

export type ProductsAction = Start | Success | Error;
