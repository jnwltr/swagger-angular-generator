/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {createFeatureSelector} from '@ngrx/store';
import * as actions from './actions';

export interface LoadCareerPositionsState {
  data: object;
  loading: boolean;
  error: string;
}

export const initialLoadCareerPositionsState: LoadCareerPositionsState = {
  data: {},
  loading: false,
  error: '',
};

export const getLoadCareerPositionsStateSelector = createFeatureSelector<LoadCareerPositionsState>('LoadCareerPositions');

export function LoadCareerPositionsReducer(
  state: LoadCareerPositionsState = initialLoadCareerPositionsState,
  action: actions.AllLoadCareerPositionsActions): LoadCareerPositionsState {

  switch (action.type) {
  case actions.LOAD_CAREER_POSITIONS_START:
  return {...state, loading: true, error: null};

  case actions.LOAD_CAREER_POSITIONS_SUCCESS:
  return {...state, data: action.payload, loading: false};

  case actions.LOAD_CAREER_POSITIONS_ERROR:
  return {...state, error: action.payload, loading: false};

  default:
    return state;
  }
}
