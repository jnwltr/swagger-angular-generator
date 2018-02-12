/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Action} from '@ngrx/store';
import * as model from '../../../../model';

export const CREATE_RESTAUTH_RESTAUTHLOGOUTCREATE_START = '[RestAuth] Load RestAuth';
export const CREATE_RESTAUTH_RESTAUTHLOGOUTCREATE_SUCCESS = '[RestAuth] Load RestAuth Success';
export const CREATE_RESTAUTH_RESTAUTHLOGOUTCREATE_ERROR = '[RestAuth] Load RestAuth Error';

export class CreateRestAuthRestAuthLogoutCreateStart implements Action {
  readonly type = CREATE_RESTAUTH_RESTAUTHLOGOUTCREATE_START;
  constructor(public payload: RestAuthLogoutCreateParams) {}
}

export class CreateRestAuthRestAuthLogoutCreateSuccess implements Action {
  readonly type = CREATE_RESTAUTH_RESTAUTHLOGOUTCREATE_SUCCESS;
  constructor(public payload: void) {}
}

export class CreateRestAuthRestAuthLogoutCreateError implements Action {
  readonly type = CREATE_RESTAUTH_RESTAUTHLOGOUTCREATE_ERROR;
  constructor(public payload: string) {}
}

export type AllCreateRestAuthRestAuthLogoutCreateActions
  = CreateRestAuthRestAuthLogoutCreateStart
  | CreateRestAuthRestAuthLogoutCreateSuccess
  | CreateRestAuthRestAuthLogoutCreateError;
