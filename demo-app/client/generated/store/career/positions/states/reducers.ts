/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {createFeatureSelector} from '@ngrx/store';

import * as actions from './actions';

export interface PositionsState {
  data: object;
  loading: boolean;
  error: string;
}

export const initialPositionsState: PositionsState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'Positions';
export const getPositionsStateSelector = createFeatureSelector<PositionsState>(selectorName);

export function PositionsReducer(
  state: PositionsState = initialPositionsState,
  action: actions.PositionsAction): PositionsState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
