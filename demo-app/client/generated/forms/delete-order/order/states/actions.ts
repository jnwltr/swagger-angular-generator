/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Action} from '@ngrx/store';
import * as model from '../../../../model';

export const LOAD_DELETEORDER_ORDER_START = '[DeleteOrder] Load DeleteOrder';
export const LOAD_DELETEORDER_ORDER_SUCCESS = '[DeleteOrder] Load DeleteOrder Success';
export const LOAD_DELETEORDER_ORDER_ERROR = '[DeleteOrder] Load DeleteOrder Error';

export class LoadDeleteOrderOrderStart implements Action {
  readonly type = LOAD_DELETEORDER_ORDER_START;
  constructor(public payload: OrderParams) {
  }
}

export class LoadDeleteOrderOrderSuccess implements Action {
  readonly type = LOAD_DELETEORDER_ORDER_SUCCESS;
  constructor(public payload: object) {
  }
}

export class LoadDeleteOrderOrderError implements Action {
  readonly type = LOAD_DELETEORDER_ORDER_ERROR;
  constructor(public payload: string) {
  }
}

export type AllLoadDeleteOrderOrderActions
  = LoadDeleteOrderOrderStart
  | LoadDeleteOrderOrderSuccess
  | LoadDeleteOrderOrderError;
