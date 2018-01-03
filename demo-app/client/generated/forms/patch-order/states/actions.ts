/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {Action} from '@ngrx/store';
import {PatchOrderParams} from '../../../controllers/PatchOrder';

export const UPDATE_PATCHORDER_ORDER_START = '[PatchOrder] Load PatchOrder';
export const UPDATE_PATCHORDER_ORDER_SUCCESS = '[PatchOrder] Load PatchOrder Success';
export const UPDATE_PATCHORDER_ORDER_ERROR = '[PatchOrder] Load PatchOrder Error';

export class UpdatePatchOrderOrderStart implements Action {
  readonly type = UPDATE_PATCHORDER_ORDER_START;
  constructor(public payload: PatchOrderParams) {
  }
}

export class UpdatePatchOrderOrderSuccess implements Action {
  readonly type = UPDATE_PATCHORDER_ORDER_SUCCESS;
  constructor(public payload: object) {
  }
}

export class UpdatePatchOrderOrderError implements Action {
  readonly type = UPDATE_PATCHORDER_ORDER_ERROR;
  constructor(public payload: string) {
  }
}

export type AllUpdatePatchOrderOrderActions
  = UpdatePatchOrderOrderStart
  | UpdatePatchOrderOrderSuccess
  | UpdatePatchOrderOrderError;
