/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {LoginParams} from '../../../../controllers/Login';

export enum Actions {
  START = '[Login login] Start',
  SUCCESS = '[Login login] Success',
  ERROR = '[Login login] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: LoginParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: HttpResponse<object>) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type LoginAction = Start | Success | Error;
