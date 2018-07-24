/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Action} from '@ngrx/store';
import {LoginParams} from '../../../../controllers/Login';

export enum Actions {
  START = '[login] Start',
  SUCCESS = '[login] Success',
  ERROR = '[login] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: LoginParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: object) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: string) {}
}

export type LoginAction = Start | Success | Error;
