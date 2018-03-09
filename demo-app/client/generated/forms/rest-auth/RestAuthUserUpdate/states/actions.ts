/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Action} from '@ngrx/store';
import {RestAuthUserUpdateParams} from '../../../../controllers/RestAuth';
import * as model from '../../../../model';

export enum Actions {
  START = '[RestAuthUserUpdate] Start',
  SUCCESS = '[RestAuthUserUpdate] Success',
  ERROR = '[RestAuthUserUpdate] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: RestAuthUserUpdateParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: model.UserDetails) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: string) {}
}

export type RestAuthUserUpdateAction = Start | Success | Error;
