/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {DashedParams} from '../../../../controllers/Params';

export enum Actions {
  START = '[Params dashed] Start',
  SUCCESS = '[Params dashed] Success',
  ERROR = '[Params dashed] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: DashedParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: HttpResponse<void>) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type DashedAction = Start | Success | Error;
