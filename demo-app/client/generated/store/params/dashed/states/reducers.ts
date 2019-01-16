/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {createFeatureSelector} from '@ngrx/store';

import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import * as actions from './actions';

export interface DashedState {
  data: void | null;
  loading: boolean;
  error: HttpErrorResponse | null;
  res: HttpResponse<void> | null;
}

export const initialDashedState: DashedState = {
  data: null,
  loading: false,
  error: null,
  res: null,
};

export const selectorName = 'Params_Dashed';
export const getDashedStateSelector = createFeatureSelector<DashedState>(selectorName);

export function DashedReducer(
  state: DashedState = initialDashedState,
  action: actions.DashedAction): DashedState {
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
