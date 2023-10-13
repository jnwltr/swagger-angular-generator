/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {ArrayParams} from '../../../../controllers/Structures';
import * as __model from '../../../../model';

export enum Actions {
  START = '[Structures array] Start',
  SUCCESS = '[Structures array] Success',
  ERROR = '[Structures array] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: ArrayParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: __model.ArrayGeneratedInlineModel) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type ArrayAction = Start | Success | Error;
