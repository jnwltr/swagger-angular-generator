/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Action} from '@ngrx/store';

export enum Actions {
  START = '[RestAuth restAuthLogoutCreate] Start',
  SUCCESS = '[RestAuth restAuthLogoutCreate] Success',
  ERROR = '[RestAuth restAuthLogoutCreate] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor() {}
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
