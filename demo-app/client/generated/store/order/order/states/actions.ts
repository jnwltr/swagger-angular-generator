/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {OrderParams} from '../../../../controllers/Order';

export enum Actions {
  START = '[Order Order] Start',
  SUCCESS = '[Order Order] Success',
  ERROR = '[Order Order] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: OrderParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: object) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type OrderAction = Start | Success | Error;
