/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {HttpErrorResponse} from '@angular/common/http';
import {Action} from '@ngrx/store';
import {Structures_mapParams} from '../../../../controllers/Structures';

export enum Actions {
  START = '[Structures structures_map] Start',
  SUCCESS = '[Structures structures_map] Success',
  ERROR = '[Structures structures_map] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: Structures_mapParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: void) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: HttpErrorResponse) {}
}

export type Structures_mapAction = Start | Success | Error;
