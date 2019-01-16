/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';

export enum Actions {
  START = '[RestAuth restAuthLogoutList] Start',
  SUCCESS = '[RestAuth restAuthLogoutList] Success',
  ERROR = '[RestAuth restAuthLogoutList] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor() {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: HttpResponse<void>) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type RestAuthLogoutListAction = Start | Success | Error;
