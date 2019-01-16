/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {PositionsParams} from '../../../../controllers/Career';

export enum Actions {
  START = '[Career positions] Start',
  SUCCESS = '[Career positions] Success',
  ERROR = '[Career positions] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: PositionsParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: HttpResponse<object>) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type PositionsAction = Start | Success | Error;
