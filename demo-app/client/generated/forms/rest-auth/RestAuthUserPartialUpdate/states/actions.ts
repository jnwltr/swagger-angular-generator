/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Action} from '@ngrx/store';
import {RestAuthUserPartialUpdateParams} from '../../../../controllers/RestAuth';
import * as model from '../../../../model';

export const UPDATE_RESTAUTH_RESTAUTHUSERPARTIALUPDATE_START = '[RestAuth] Load RestAuth';
export const UPDATE_RESTAUTH_RESTAUTHUSERPARTIALUPDATE_SUCCESS = '[RestAuth] Load RestAuth Success';
export const UPDATE_RESTAUTH_RESTAUTHUSERPARTIALUPDATE_ERROR = '[RestAuth] Load RestAuth Error';

export class UpdateRestAuthRestAuthUserPartialUpdateStart implements Action {
  readonly type = UPDATE_RESTAUTH_RESTAUTHUSERPARTIALUPDATE_START;
  constructor(public payload: RestAuthUserPartialUpdateParams) {
  }
}

export class UpdateRestAuthRestAuthUserPartialUpdateSuccess implements Action {
  readonly type = UPDATE_RESTAUTH_RESTAUTHUSERPARTIALUPDATE_SUCCESS;
  constructor(public payload: model.UserDetails) {
  }
}

export class UpdateRestAuthRestAuthUserPartialUpdateError implements Action {
  readonly type = UPDATE_RESTAUTH_RESTAUTHUSERPARTIALUPDATE_ERROR;
  constructor(public payload: string) {
  }
}

export type AllUpdateRestAuthRestAuthUserPartialUpdateActions
  = UpdateRestAuthRestAuthUserPartialUpdateStart
  | UpdateRestAuthRestAuthUserPartialUpdateSuccess
  | UpdateRestAuthRestAuthUserPartialUpdateError;
