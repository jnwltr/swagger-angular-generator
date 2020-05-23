/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import * as __model from '../../../../model';

export enum Actions {
  START = '[RestAuth rest-auth_user_read] Start',
  SUCCESS = '[RestAuth rest-auth_user_read] Success',
  ERROR = '[RestAuth rest-auth_user_read] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor() {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: __model.UserDetails) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type Rest-auth_user_readAction = Start | Success | Error;
