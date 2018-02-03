/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Action} from '@ngrx/store';
import * as model from '../../../../model';

export const CREATE_LOGOUT_LOGOUT_START = '[Logout] Load Logout';
export const CREATE_LOGOUT_LOGOUT_SUCCESS = '[Logout] Load Logout Success';
export const CREATE_LOGOUT_LOGOUT_ERROR = '[Logout] Load Logout Error';

export class CreateLogoutLogoutStart implements Action {
  readonly type = CREATE_LOGOUT_LOGOUT_START;
  constructor(public payload: LogoutParams) {
  }
}

export class CreateLogoutLogoutSuccess implements Action {
  readonly type = CREATE_LOGOUT_LOGOUT_SUCCESS;
  constructor(public payload: object) {
  }
}

export class CreateLogoutLogoutError implements Action {
  readonly type = CREATE_LOGOUT_LOGOUT_ERROR;
  constructor(public payload: string) {
  }
}

export type AllCreateLogoutLogoutActions
  = CreateLogoutLogoutStart
  | CreateLogoutLogoutSuccess
  | CreateLogoutLogoutError;
