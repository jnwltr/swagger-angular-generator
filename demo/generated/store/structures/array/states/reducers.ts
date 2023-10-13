/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/api-base-path
 */

import {createFeatureSelector} from '@ngrx/store';

import {HttpErrorResponse} from '@angular/common/http';
import * as __model from '../../../../model';
import * as actions from './actions';

export interface ArrayState {
  data: __model.ArrayGeneratedInlineModel | null;
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialArrayState: ArrayState = {
  data: null,
  loading: false,
  error: null,
};

export const selectorName = 'Structures_Array';
export const getArrayStateSelector = createFeatureSelector<ArrayState>(selectorName);

export function ArrayReducer(
  state: ArrayState = initialArrayState,
  action: actions.ArrayAction): ArrayState {
  switch (action.type) {
    case actions.Actions.START: return {...state, loading: true, error: null};
    case actions.Actions.SUCCESS: return {...state, data: action.payload, loading: false};
    case actions.Actions.ERROR: return {...state, error: action.payload, loading: false};
    default: return state;
  }
}
