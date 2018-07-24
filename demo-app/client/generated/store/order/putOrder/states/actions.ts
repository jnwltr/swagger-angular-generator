/* tslint:disable:max-line-length max-classes-per-file */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {Action} from '@ngrx/store';
import {PutOrderParams} from '../../../../controllers/Order';

export enum Actions {
  START = '[putOrder] Start',
  SUCCESS = '[putOrder] Success',
  ERROR = '[putOrder] Error',
}

export class Start implements Action {
  readonly type = Actions.START;
  constructor(public payload: PutOrderParams) {}
}

export class Success implements Action {
  readonly type = Actions.SUCCESS;
  constructor(public payload: object) {}
}

export class Error implements Action {
  readonly type = Actions.ERROR;
  constructor(public payload: string) {}
}

export type PutOrderAction = Start | Success | Error;
