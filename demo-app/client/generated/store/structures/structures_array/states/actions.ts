/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {Structures_arrayParams} from '../../../../controllers/Structures';
import * as __model from '../../../../model';

export enum Actions {
  START = '[Structures structures_array] Start',
  SUCCESS = '[Structures structures_array] Success',
  ERROR = '[Structures structures_array] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: Structures_arrayParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: __model.Structures_arrayGeneratedInlineModel) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type Structures_arrayAction = Start | Success | Error;
