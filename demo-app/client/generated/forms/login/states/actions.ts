/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * example.com/swagger
 */

import {Action} from '@ngrx/store';
import {LoginParams} from '../../../controllers/Login';

export const CREATE_LOGIN_LOGIN_START = '[Login] Load Login';
export const CREATE_LOGIN_LOGIN_SUCCESS = '[Login] Load Login Success';
export const CREATE_LOGIN_LOGIN_ERROR = '[Login] Load Login Error';

export class CreateLoginLoginStart implements Action {
  readonly type = CREATE_LOGIN_LOGIN_START;
  constructor(public payload: LoginParams) {
  }
}

export class CreateLoginLoginSuccess implements Action {
  readonly type = CREATE_LOGIN_LOGIN_SUCCESS;
  constructor(public payload: object) {
  }
}

export class CreateLoginLoginError implements Action {
  readonly type = CREATE_LOGIN_LOGIN_ERROR;
  constructor(public payload: string) {
  }
}

export type AllCreateLoginLoginActions
  = CreateLoginLoginStart
  | CreateLoginLoginSuccess
  | CreateLoginLoginError;
