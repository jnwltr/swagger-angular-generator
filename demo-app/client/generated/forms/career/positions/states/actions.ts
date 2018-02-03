/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Action} from '@ngrx/store';
import * as model from '../../../../model';

export const LOAD_CAREER_POSITIONS_START = '[Career] Load Career';
export const LOAD_CAREER_POSITIONS_SUCCESS = '[Career] Load Career Success';
export const LOAD_CAREER_POSITIONS_ERROR = '[Career] Load Career Error';

export class LoadCareerPositionsStart implements Action {
  readonly type = LOAD_CAREER_POSITIONS_START;
  constructor(public payload: PositionsParams) {
  }
}

export class LoadCareerPositionsSuccess implements Action {
  readonly type = LOAD_CAREER_POSITIONS_SUCCESS;
  constructor(public payload: object) {
  }
}

export class LoadCareerPositionsError implements Action {
  readonly type = LOAD_CAREER_POSITIONS_ERROR;
  constructor(public payload: string) {
  }
}

export type AllLoadCareerPositionsActions
  = LoadCareerPositionsStart
  | LoadCareerPositionsSuccess
  | LoadCareerPositionsError;
