/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Action} from '@ngrx/store';
import {PositionsParams} from '../../../../controllers/Career';

export enum Actions {
  START = '[positions] Start',
  SUCCESS = '[positions] Success',
  ERROR = '[positions] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: PositionsParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: object) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: string) {}
}

export type PositionsAction = Start | Success | Error;
