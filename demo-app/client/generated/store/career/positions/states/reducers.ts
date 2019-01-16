/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {createFeatureSelector} from '@ngrx/store';

import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import * as actions from './actions';

export interface PositionsState {
  data: object | null;
  loading: boolean;
  error: HttpErrorResponse | null;
  res: HttpResponse<object> | null;
}

export const initialPositionsState: PositionsState = {
  data: null,
  loading: false,
  error: null,
  res: null,
};

export const selectorName = 'Career_Positions';
export const getPositionsStateSelector = createFeatureSelector<PositionsState>(selectorName);

export function PositionsReducer(
  state: PositionsState = initialPositionsState,
  action: actions.PositionsAction): PositionsState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {
      ...state,
      data: action.payload.body,
      res: action.payload,
      loading: false,
    };
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
