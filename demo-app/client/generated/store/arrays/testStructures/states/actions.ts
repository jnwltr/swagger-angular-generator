/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Action} from '@ngrx/store';
import {HttpErrorResponse} from '@angular/common/http';
import {TestStructuresParams} from '../../../../controllers/Arrays';
import * as __model from '../../../../model';

export enum Actions {
  START = '[Arrays testStructures] Start',
  SUCCESS = '[Arrays testStructures] Success',
  ERROR = '[Arrays testStructures] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: TestStructuresParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: __model.TestStructuresGeneratedInlineModel) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type TestStructuresAction = Start | Success | Error;
