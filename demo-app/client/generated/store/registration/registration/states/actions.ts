/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Action} from '@ngrx/store';
import {RegistrationParams} from '../../../../controllers/Registration';

export enum Actions {
  START = '[registration] Start',
  SUCCESS = '[registration] Success',
  ERROR = '[registration] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: RegistrationParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: object) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: string) {}
}

export type RegistrationAction = Start | Success | Error;
