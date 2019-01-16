/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {MapParams} from '../../../../controllers/Structures';

export enum Actions {
  START = '[Structures map] Start',
  SUCCESS = '[Structures map] Success',
  ERROR = '[Structures map] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: MapParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: HttpResponse<void>) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type MapAction = Start | Success | Error;
