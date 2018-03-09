/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Action} from '@ngrx/store';
import * as model from '../../../../model';

export enum Actions {
  START = '[logout] Start',
  SUCCESS = '[logout] Success',
  ERROR = '[logout] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: LogoutParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: object) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: string) {}
}

export type LogoutAction = Start | Success | Error;
