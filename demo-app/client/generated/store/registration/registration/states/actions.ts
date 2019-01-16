/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {RegistrationParams} from '../../../../controllers/Registration';

export enum Actions {
  START = '[Registration registration] Start',
  SUCCESS = '[Registration registration] Success',
  ERROR = '[Registration registration] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: RegistrationParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: HttpResponse<object>) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type RegistrationAction = Start | Success | Error;
