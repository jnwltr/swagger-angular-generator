/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Action} from '@ngrx/store';
import {OrderParams} from '../../../../controllers/PutOrder';
import * as model from '../../../../model';

export const UPDATE_PUTORDER_ORDER_START = '[PutOrder] Load PutOrder';
export const UPDATE_PUTORDER_ORDER_SUCCESS = '[PutOrder] Load PutOrder Success';
export const UPDATE_PUTORDER_ORDER_ERROR = '[PutOrder] Load PutOrder Error';

export class UpdatePutOrderOrderStart implements Action {
  readonly type = UPDATE_PUTORDER_ORDER_START;
  constructor(public payload: OrderParams) {}
}

export class UpdatePutOrderOrderSuccess implements Action {
  readonly type = UPDATE_PUTORDER_ORDER_SUCCESS;
  constructor(public payload: object) {}
}

export class UpdatePutOrderOrderError implements Action {
  readonly type = UPDATE_PUTORDER_ORDER_ERROR;
  constructor(public payload: string) {}
}

export type AllUpdatePutOrderOrderActions
  = UpdatePutOrderOrderStart
  | UpdatePutOrderOrderSuccess
  | UpdatePutOrderOrderError;
