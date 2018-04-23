/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Action} from '@ngrx/store';
import {RestAuthUserPartialUpdateParams} from '../../../../controllers/RestAuth';

export enum Actions {
  START = '[restAuthUserPartialUpdate] Start',
  SUCCESS = '[restAuthUserPartialUpdate] Success',
  ERROR = '[restAuthUserPartialUpdate] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: RestAuthUserPartialUpdateParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: __model.UserDetails) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: string) {}
}

export type RestAuthUserPartialUpdateAction = Start | Success | Error;
