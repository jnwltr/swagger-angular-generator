/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Action} from '@ngrx/store';
import * as model from '../../../../model';

export enum Actions {
  START = '[RestAuthUserRead] Start',
  SUCCESS = '[RestAuthUserRead] Success',
  ERROR = '[RestAuthUserRead] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: RestAuthUserReadParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: model.UserDetails) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: string) {}
}

export type RestAuthUserReadAction = Start | Success | Error;
