/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {Params_testParams} from '../../../../controllers/Params';

export enum Actions {
  START = '[Params params_test] Start',
  SUCCESS = '[Params params_test] Success',
  ERROR = '[Params params_test] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: Params_testParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: void) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type Params_testAction = Start | Success | Error;
