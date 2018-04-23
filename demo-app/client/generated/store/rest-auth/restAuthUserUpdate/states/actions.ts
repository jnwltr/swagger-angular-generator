/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Action} from '@ngrx/store';
import {RestAuthUserUpdateParams} from '../../../../controllers/RestAuth';

export enum Actions {
  START = '[restAuthUserUpdate] Start',
  SUCCESS = '[restAuthUserUpdate] Success',
  ERROR = '[restAuthUserUpdate] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: RestAuthUserUpdateParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: __model.UserDetails) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: string) {}
}

export type RestAuthUserUpdateAction = Start | Success | Error;
