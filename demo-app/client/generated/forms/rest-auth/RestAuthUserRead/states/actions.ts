/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Action} from '@ngrx/store';
import * as model from '../../../../model';

export const LOAD_RESTAUTH_RESTAUTHUSERREAD_START = '[RestAuth] Load RestAuth';
export const LOAD_RESTAUTH_RESTAUTHUSERREAD_SUCCESS = '[RestAuth] Load RestAuth Success';
export const LOAD_RESTAUTH_RESTAUTHUSERREAD_ERROR = '[RestAuth] Load RestAuth Error';

export class LoadRestAuthRestAuthUserReadStart implements Action {
  readonly type = LOAD_RESTAUTH_RESTAUTHUSERREAD_START;
  constructor(public payload: RestAuthUserReadParams) {
  }
}

export class LoadRestAuthRestAuthUserReadSuccess implements Action {
  readonly type = LOAD_RESTAUTH_RESTAUTHUSERREAD_SUCCESS;
  constructor(public payload: model.UserDetails) {
  }
}

export class LoadRestAuthRestAuthUserReadError implements Action {
  readonly type = LOAD_RESTAUTH_RESTAUTHUSERREAD_ERROR;
  constructor(public payload: string) {
  }
}

export type AllLoadRestAuthRestAuthUserReadActions
  = LoadRestAuthRestAuthUserReadStart
  | LoadRestAuthRestAuthUserReadSuccess
  | LoadRestAuthRestAuthUserReadError;
