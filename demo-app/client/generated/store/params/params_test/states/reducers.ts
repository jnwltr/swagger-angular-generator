/* tslint:disable:max-line-length no-empty-interface */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {createFeatureSelector} from '@ngrx/store';

import {HttpErrorResponse} from '@angular/common/http';
import * as actions from './actions';

export interface Params_testState {
  data: void | null;
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialParams_testState: Params_testState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'Params_Params_test';
export const getParams_testStateSelector = createFeatureSelector<Params_testState>(selectorName);

export function Params_testReducer(
  state: Params_testState = initialParams_testState,
  action: actions.Params_testAction): Params_testState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
