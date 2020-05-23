/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {Rest-auth_user_partial_updateParams} from '../../../../controllers/RestAuth';
import * as __model from '../../../../model';

export enum Actions {
  START = '[RestAuth rest-auth_user_partial_update] Start',
  SUCCESS = '[RestAuth rest-auth_user_partial_update] Success',
  ERROR = '[RestAuth rest-auth_user_partial_update] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: Rest-auth_user_partial_updateParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: __model.UserDetails) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type Rest-auth_user_partial_updateAction = Start | Success | Error;
