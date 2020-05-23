/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {CareerParams} from '../../../../controllers/Career';

export enum Actions {
  START = '[Career Career] Start',
  SUCCESS = '[Career Career] Success',
  ERROR = '[Career Career] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: CareerParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: object) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type CareerAction = Start | Success | Error;
