/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Action} from '@ngrx/store';
import {RestAuthUserUpdateParams} from '../../../../controllers/RestAuth';
import * as model from '../../../../model';

export const UPDATE_RESTAUTH_RESTAUTHUSERUPDATE_START = '[RestAuth] Load RestAuth';
export const UPDATE_RESTAUTH_RESTAUTHUSERUPDATE_SUCCESS = '[RestAuth] Load RestAuth Success';
export const UPDATE_RESTAUTH_RESTAUTHUSERUPDATE_ERROR = '[RestAuth] Load RestAuth Error';

export class UpdateRestAuthRestAuthUserUpdateStart implements Action {
  readonly type = UPDATE_RESTAUTH_RESTAUTHUSERUPDATE_START;
  constructor(public payload: RestAuthUserUpdateParams) {
  }
}

export class UpdateRestAuthRestAuthUserUpdateSuccess implements Action {
  readonly type = UPDATE_RESTAUTH_RESTAUTHUSERUPDATE_SUCCESS;
  constructor(public payload: model.UserDetails) {
  }
}

export class UpdateRestAuthRestAuthUserUpdateError implements Action {
  readonly type = UPDATE_RESTAUTH_RESTAUTHUSERUPDATE_ERROR;
  constructor(public payload: string) {
  }
}

export type AllUpdateRestAuthRestAuthUserUpdateActions
  = UpdateRestAuthRestAuthUserUpdateStart
  | UpdateRestAuthRestAuthUserUpdateSuccess
  | UpdateRestAuthRestAuthUserUpdateError;
