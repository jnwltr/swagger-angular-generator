/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Action} from '@ngrx/store';
import * as model from '../../../../model';

export const LOAD_RESTAUTH_RESTAUTHLOGOUTLIST_START = '[RestAuth] Load RestAuth';
export const LOAD_RESTAUTH_RESTAUTHLOGOUTLIST_SUCCESS = '[RestAuth] Load RestAuth Success';
export const LOAD_RESTAUTH_RESTAUTHLOGOUTLIST_ERROR = '[RestAuth] Load RestAuth Error';

export class LoadRestAuthRestAuthLogoutListStart implements Action {
  readonly type = LOAD_RESTAUTH_RESTAUTHLOGOUTLIST_START;
  constructor(public payload: RestAuthLogoutListParams) {}
}

export class LoadRestAuthRestAuthLogoutListSuccess implements Action {
  readonly type = LOAD_RESTAUTH_RESTAUTHLOGOUTLIST_SUCCESS;
  constructor(public payload: void) {}
}

export class LoadRestAuthRestAuthLogoutListError implements Action {
  readonly type = LOAD_RESTAUTH_RESTAUTHLOGOUTLIST_ERROR;
  constructor(public payload: string) {}
}

export type AllLoadRestAuthRestAuthLogoutListActions
  = LoadRestAuthRestAuthLogoutListStart
  | LoadRestAuthRestAuthLogoutListSuccess
  | LoadRestAuthRestAuthLogoutListError;
