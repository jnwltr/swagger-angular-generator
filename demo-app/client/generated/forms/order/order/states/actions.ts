/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Action} from '@ngrx/store';
import {OrderParams} from '../../../../controllers/Order';
import * as model from '../../../../model';

export const CREATE_ORDER_ORDER_START = '[Order] Load Order';
export const CREATE_ORDER_ORDER_SUCCESS = '[Order] Load Order Success';
export const CREATE_ORDER_ORDER_ERROR = '[Order] Load Order Error';

export class CreateOrderOrderStart implements Action {
  readonly type = CREATE_ORDER_ORDER_START;
  constructor(public payload: OrderParams) {
  }
}

export class CreateOrderOrderSuccess implements Action {
  readonly type = CREATE_ORDER_ORDER_SUCCESS;
  constructor(public payload: object) {
  }
}

export class CreateOrderOrderError implements Action {
  readonly type = CREATE_ORDER_ORDER_ERROR;
  constructor(public payload: string) {
  }
}

export type AllCreateOrderOrderActions
  = CreateOrderOrderStart
  | CreateOrderOrderSuccess
  | CreateOrderOrderError;
