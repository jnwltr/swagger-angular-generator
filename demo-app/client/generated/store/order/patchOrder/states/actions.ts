/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {PatchOrderParams} from '../../../../controllers/Order';

export enum Actions {
  START = '[Order patchOrder] Start',
  SUCCESS = '[Order patchOrder] Success',
  ERROR = '[Order patchOrder] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: PatchOrderParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: HttpResponse<object>) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type PatchOrderAction = Start | Success | Error;
