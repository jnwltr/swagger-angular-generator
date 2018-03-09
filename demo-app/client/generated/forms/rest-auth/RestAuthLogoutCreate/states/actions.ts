/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Action} from '@ngrx/store';
import * as model from '../../../../model';

export enum Actions {
  START = '[RestAuthLogoutCreate] Start',
  SUCCESS = '[RestAuthLogoutCreate] Success',
  ERROR = '[RestAuthLogoutCreate] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: RestAuthLogoutCreateParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: void) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: string) {}
}

export type RestAuthLogoutCreateAction = Start | Success | Error;
