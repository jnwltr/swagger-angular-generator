/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {Action} from '@ngrx/store';
import {DeleteOrderParams} from '../../../controllers/DeleteOrder';

export const LOAD_DELETEORDER_ORDER_START = '[DeleteOrder] Load DeleteOrder';
export const LOAD_DELETEORDER_ORDER_SUCCESS = '[DeleteOrder] Load DeleteOrder Success';
export const LOAD_DELETEORDER_ORDER_ERROR = '[DeleteOrder] Load DeleteOrder Error';

export class LoadDeleteOrderOrderStart implements Action {
  readonly type = LOAD_DELETEORDER_ORDER_START;
  constructor(public payload: DeleteOrderParams) {
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
